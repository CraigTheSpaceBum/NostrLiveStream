import { cloneMockState } from './mock-data.js';
import { computeEffectivePermissions, DEFAULT_ROLE_DEFS } from './permissions.js';

const JOINED_STORAGE_PREFIX = 'sifaka_communities_joined_v2';

function createEmitter() {
  const listeners = new Set();
  return {
    emit(payload) {
      listeners.forEach((fn) => {
        try { fn(payload); } catch (_) {}
      });
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}

function nowIso() {
  return new Date().toISOString();
}

function nowMs() {
  return Date.now();
}

function byCreatedAt(a, b) {
  return Number(a.createdAt || 0) - Number(b.createdAt || 0);
}

function nextId(prefix) {
  return `${prefix}:${Math.random().toString(36).slice(2, 10)}:${Date.now().toString(36)}`;
}

function unique(values) {
  return Array.from(new Set((values || []).filter(Boolean)));
}

function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || `community-${Date.now().toString(36)}`;
}

function parseLines(input) {
  return String(input || '')
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
}

function parseCsv(input) {
  return String(input || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function profileFallback(pubkey = '') {
  const short = String(pubkey || '').slice(0, 12);
  return {
    pubkey,
    name: short ? `${short}...` : 'nostr-user',
    displayName: short ? `${short}...` : 'Nostr User',
    nip05: '',
    verifiedNip05: false,
    avatar: '',
    bio: ''
  };
}

function joinedStorageKey(pubkey) {
  return `${JOINED_STORAGE_PREFIX}:${String(pubkey || 'anon').slice(0, 128)}`;
}

function readJoinedFromStorage(pubkey) {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(joinedStorageKey(pubkey));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return unique(parsed.map((id) => String(id || '').trim()));
  } catch (_) {
    return [];
  }
}

function writeJoinedToStorage(pubkey, ids) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(joinedStorageKey(pubkey), JSON.stringify(unique(ids)));
  } catch (_) {}
}

function ensureArrayMap(store, key) {
  if (!store[key]) store[key] = [];
  return store[key];
}

export function createCommunityStore(options = {}) {
  const { currentUserPubkey = '', featureFlags = {} } = options;
  const data = cloneMockState();
  const emitter = createEmitter();

  const state = {
    data,
    currentUserPubkey: String(currentUserPubkey || ''),
    activeCommunityId: '',
    activeChannelId: '',
    joinedCommunityIds: new Set(),
    unreadByChannel: new Map(),
    draftsByChannel: new Map(),
    searchTerm: '',
    notificationsOpen: false,
    memberPanelOpen: true,
    featureFlags: {
      nip17Dm: true,
      nip29PrivateGroups: true,
      nip72PublicCommunities: true,
      nip53LiveRooms: false,
      nip46RemoteSigner: false,
      nip50SearchRelay: true,
      ...featureFlags
    },
    inviteCodesByCommunity: new Map(),
    pinnedByChannel: new Map(),
    relayStatusByUrl: new Map(),
    messageChannelById: new Map(),
    reactionByEventId: new Map(),
    lastActiveByCommunity: new Map()
  };

  function ensureCommunityContainers(communityId) {
    ensureArrayMap(state.data.channelsByCommunity, communityId);
    ensureArrayMap(state.data.membersByCommunity, communityId);
  }

  function ensureProfile(pubkey, patch = {}) {
    if (!pubkey) return;
    if (!state.data.profiles[pubkey]) state.data.profiles[pubkey] = profileFallback(pubkey);
    state.data.profiles[pubkey] = {
      ...state.data.profiles[pubkey],
      ...patch
    };
  }

  function getCommunity(id = state.activeCommunityId) {
    return state.data.communities.find((c) => c.id === id) || null;
  }

  function getChannels(communityId = state.activeCommunityId) {
    return (state.data.channelsByCommunity[communityId] || []).slice();
  }

  function getCommunityForChannel(channelId = state.activeChannelId) {
    if (!channelId) return getCommunity();
    return state.data.communities.find((community) =>
      (state.data.channelsByCommunity[community.id] || []).some((c) => c.id === channelId)
    ) || null;
  }

  function getChannel(channelId = state.activeChannelId) {
    if (!channelId) return null;
    const activeChannels = state.data.channelsByCommunity[state.activeCommunityId] || [];
    const inActive = activeChannels.find((ch) => ch.id === channelId);
    if (inActive) return inActive;

    const communityIds = Object.keys(state.data.channelsByCommunity);
    for (let i = 0; i < communityIds.length; i += 1) {
      const communityId = communityIds[i];
      const found = (state.data.channelsByCommunity[communityId] || []).find((ch) => ch.id === channelId);
      if (found) return found;
    }
    return null;
  }

  function getMember(communityId = state.activeCommunityId, pubkey = state.currentUserPubkey) {
    const list = state.data.membersByCommunity[communityId] || [];
    return list.find((m) => m.pubkey === pubkey) || null;
  }

  function ensureMember(communityId, pubkey, roles = ['member']) {
    if (!communityId || !pubkey) return null;
    ensureCommunityContainers(communityId);
    const list = state.data.membersByCommunity[communityId] || [];
    let member = list.find((m) => m.pubkey === pubkey);
    if (!member) {
      member = {
        pubkey,
        roles: unique(roles),
        joinedAt: nowMs(),
        muted: false,
        banned: false,
        timeoutUntil: 0
      };
      list.push(member);
    } else {
      member.roles = unique([...(member.roles || []), ...roles]);
    }
    state.data.membersByCommunity[communityId] = list;
    return member;
  }

  function syncRoleAssignments(communityId, roleId, pubkeys = []) {
    if (!communityId || !roleId) return;
    ensureCommunityContainers(communityId);
    const desired = new Set(unique(pubkeys));
    const list = state.data.membersByCommunity[communityId] || [];

    list.forEach((member) => {
      if (!member || !member.pubkey) return;
      if (!Array.isArray(member.roles)) member.roles = ['member'];
      const hasRole = member.roles.includes(roleId);
      if (hasRole && !desired.has(member.pubkey)) {
        member.roles = member.roles.filter((role) => role !== roleId);
        if (!member.roles.length) member.roles = ['member'];
      }
    });

    desired.forEach((pubkey) => {
      ensureProfile(pubkey);
      ensureMember(communityId, pubkey, [roleId]);
    });
  }

  function refreshLeadershipLists(communityId) {
    const community = getCommunity(communityId);
    if (!community) return;
    const members = state.data.membersByCommunity[communityId] || [];
    community.moderatorPubkeys = unique(members
      .filter((member) => Array.isArray(member.roles) && member.roles.includes('moderator'))
      .map((member) => member.pubkey));
    community.adminPubkeys = unique(members
      .filter((member) => Array.isArray(member.roles) && member.roles.includes('admin'))
      .map((member) => member.pubkey));
  }

  function getMemberRoles(communityId = state.activeCommunityId, pubkey = state.currentUserPubkey) {
    const member = getMember(communityId, pubkey);
    if (member) return member.roles || ['member'];
    if (state.joinedCommunityIds.has(communityId)) return ['member'];
    return ['guest'];
  }

  function getRoleOverridesForChannel(channel, roleIds) {
    const overrides = Array.isArray(channel && channel.roleOverrides) ? channel.roleOverrides : [];
    return overrides.filter((ovr) => roleIds.includes(ovr.roleId));
  }

  function getPermissionContext(channel = getChannel(), community = getCommunity()) {
    const roleDefs = (community && community.roleDefs) || DEFAULT_ROLE_DEFS;
    const roleIds = getMemberRoles(community && community.id, state.currentUserPubkey);
    const isOwner = roleIds.includes('owner') || (community && community.ownerPubkey === state.currentUserPubkey);
    const channelRoleOverrides = getRoleOverridesForChannel(channel, roleIds);

    return {
      roleDefs,
      roleIds,
      isOwner,
      serverDefaultAllow: (community && community.serverDefaultAllow) || [],
      serverDefaultDeny: (community && community.serverDefaultDeny) || [],
      channelRoleOverrides,
      channelUserOverride: null
    };
  }

  function can(permission, channel = getChannel(), community = getCommunity()) {
    if (!community) return false;
    return computeEffectivePermissions(getPermissionContext(channel, community)).allow.has(permission);
  }

  function getMessages(channelId = state.activeChannelId) {
    return (state.data.messagesByChannel[channelId] || []).slice().sort(byCreatedAt);
  }

  function getPinnedMessages(channelId = state.activeChannelId) {
    const pinIds = new Set(state.pinnedByChannel.get(channelId) || []);
    return getMessages(channelId).filter((m) => pinIds.has(m.id));
  }

  function getProfiles() {
    return state.data.profiles;
  }

  function profile(pubkey) {
    return state.data.profiles[pubkey] || profileFallback(pubkey);
  }

  function touchCommunity(communityId, ts = nowMs()) {
    if (!communityId) return;
    state.lastActiveByCommunity.set(communityId, Number(ts || nowMs()));
  }

  function indexMessage(channelId, message) {
    if (!channelId || !message || !message.id) return;
    state.messageChannelById.set(message.id, channelId);
  }

  function markRead(channelId = state.activeChannelId) {
    if (!channelId) return;
    state.unreadByChannel.set(channelId, 0);
    emitter.emit({ type: 'read', channelId });
  }

  function incrementUnread(channelId) {
    if (!channelId) return;
    const current = Number(state.unreadByChannel.get(channelId) || 0);
    state.unreadByChannel.set(channelId, current + 1);
  }

  function appendMessage(channelId, message, eventType = 'message_ingested') {
    if (!channelId || !message) return;
    if (!state.data.messagesByChannel[channelId]) state.data.messagesByChannel[channelId] = [];
    const list = state.data.messagesByChannel[channelId];
    const existing = list.find((m) => m.id === message.id);
    if (existing) {
      Object.assign(existing, message);
    } else {
      list.push(message);
    }
    list.sort(byCreatedAt);
    indexMessage(channelId, message);

    const community = getCommunityForChannel(channelId);
    if (community) touchCommunity(community.id, message.createdAt);
    if (channelId !== state.activeChannelId) incrementUnread(channelId);

    emitter.emit({ type: eventType, message, channelId });
  }

  function findMessage(messageId, channelId = '') {
    const resolvedChannelId = channelId || state.messageChannelById.get(messageId) || '';
    if (!resolvedChannelId) return { message: null, channelId: '' };
    const list = state.data.messagesByChannel[resolvedChannelId] || [];
    return {
      message: list.find((m) => m.id === messageId) || null,
      channelId: resolvedChannelId
    };
  }

  function resolveDefaultChannelId(communityId) {
    const community = getCommunity(communityId);
    const channels = getChannels(communityId);
    if (!channels.length) return '';
    if (community && community.defaultChannelId && channels.some((ch) => ch.id === community.defaultChannelId)) {
      return community.defaultChannelId;
    }
    return channels[0].id;
  }

  function getVisibleCommunities() {
    if (state.joinedCommunityIds.size) {
      return state.data.communities.filter((community) => state.joinedCommunityIds.has(community.id));
    }
    return state.data.communities.slice();
  }

  function ensureActiveSelection() {
    const activeCommunityExists = !!getCommunity(state.activeCommunityId);
    if (!activeCommunityExists) {
      const visible = getVisibleCommunities();
      state.activeCommunityId = visible[0] ? visible[0].id : '';
    }
    const activeChannel = getChannel(state.activeChannelId);
    if (!activeChannel) {
      state.activeChannelId = resolveDefaultChannelId(state.activeCommunityId);
    }
  }

  function persistJoined() {
    writeJoinedToStorage(state.currentUserPubkey, Array.from(state.joinedCommunityIds));
  }

  function sendMessage(payload) {
    const {
      channelId = state.activeChannelId,
      content = '',
      attachments = [],
      replyTo = ''
    } = payload || {};

    const channel = getChannel(channelId);
    const community = getCommunityForChannel(channelId);
    if (!channel || !community) return { ok: false, reason: 'missing_channel' };
    if (!can('post_messages', channel, community)) return { ok: false, reason: 'permission_denied' };

    const text = String(content || '').trim();
    if (!text && (!attachments || !attachments.length)) return { ok: false, reason: 'empty' };

    const message = {
      id: nextId('m'),
      channelId,
      communityId: community.id,
      authorPubkey: state.currentUserPubkey,
      content: text,
      createdAt: nowMs(),
      createdAtIso: nowIso(),
      replyTo: replyTo || '',
      threadRoot: replyTo || '',
      pinned: false,
      pending: true,
      reactions: {},
      attachments: (attachments || []).map((file) => ({
        id: nextId('a'),
        name: file.name || 'attachment',
        kind: file.kind || 'file',
        url: file.url || '#'
      }))
    };

    ensureProfile(state.currentUserPubkey);
    appendMessage(channelId, message, 'message_sent');
    markRead(channelId);
    return { ok: true, message };
  }

  function toggleReaction(channelId, messageId, key, actorPubkey = state.currentUserPubkey) {
    const channel = getChannel(channelId);
    const community = getCommunityForChannel(channelId);
    if (!channel || !community) return { ok: false, reason: 'missing_channel' };
    if (!can('react', channel, community)) return { ok: false, reason: 'permission_denied' };

    const found = findMessage(messageId, channelId);
    if (!found.message) return { ok: false, reason: 'missing_message' };

    const reactionKey = String(key || '+').trim() || '+';
    const msg = found.message;
    if (!msg.reactions) msg.reactions = {};
    if (!msg.reactions[reactionKey]) msg.reactions[reactionKey] = [];

    const list = msg.reactions[reactionKey];
    const idx = list.indexOf(actorPubkey);
    let added = false;

    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(actorPubkey);
      added = true;
    }

    if (!list.length) delete msg.reactions[reactionKey];
    emitter.emit({ type: 'reaction_toggled', channelId: found.channelId, messageId, key: reactionKey, added, pubkey: actorPubkey });
    return { ok: true, added, key: reactionKey, channelId: found.channelId };
  }

  function ingestReaction(payload = {}) {
    const messageId = String(payload.messageId || '').trim();
    const pubkey = String(payload.pubkey || '').trim();
    const key = String(payload.key || payload.reaction || '+').trim() || '+';
    const eventId = String(payload.eventId || '').trim();
    const deleted = !!payload.deleted;
    if (!messageId || !pubkey) return false;

    const found = findMessage(messageId, payload.channelId || '');
    if (!found.message) return false;
    const msg = found.message;

    if (!msg.reactions) msg.reactions = {};
    if (!msg.reactions[key]) msg.reactions[key] = [];

    const list = msg.reactions[key];
    const idx = list.indexOf(pubkey);
    if (deleted) {
      if (idx >= 0) list.splice(idx, 1);
      if (!list.length) delete msg.reactions[key];
    } else if (idx < 0) {
      list.push(pubkey);
    }

    if (eventId) {
      state.reactionByEventId.set(eventId, {
        channelId: found.channelId,
        messageId,
        key,
        pubkey
      });
    }

    emitter.emit({ type: 'reaction_ingested', channelId: found.channelId, messageId, key, deleted, pubkey });
    return true;
  }

  function ingestDeletion(payload = {}) {
    const eventIds = unique(payload.eventIds || []);
    let changed = false;

    eventIds.forEach((eventId) => {
      const reaction = state.reactionByEventId.get(eventId);
      if (reaction) {
        ingestReaction({ ...reaction, deleted: true });
        state.reactionByEventId.delete(eventId);
        changed = true;
      }

      const channelId = state.messageChannelById.get(eventId);
      if (channelId) {
        const list = state.data.messagesByChannel[channelId] || [];
        const next = list.filter((m) => m.id !== eventId);
        if (next.length !== list.length) {
          state.data.messagesByChannel[channelId] = next;
          state.messageChannelById.delete(eventId);
          changed = true;
        }
      }
    });

    if (changed) emitter.emit({ type: 'deletion_ingested', eventIds });
    return changed;
  }

  function togglePin(channelId, messageId) {
    const channel = getChannel(channelId);
    const community = getCommunityForChannel(channelId);
    if (!channel || !community) return { ok: false, reason: 'missing_channel' };
    if (!can('pin_messages', channel, community)) return { ok: false, reason: 'permission_denied' };

    const pinIds = new Set(state.pinnedByChannel.get(channelId) || []);
    if (pinIds.has(messageId)) pinIds.delete(messageId);
    else pinIds.add(messageId);
    state.pinnedByChannel.set(channelId, Array.from(pinIds));

    const list = state.data.messagesByChannel[channelId] || [];
    const message = list.find((m) => m.id === messageId);
    if (message) message.pinned = pinIds.has(messageId);

    emitter.emit({ type: 'pin_toggled', channelId, messageId });
    return { ok: true };
  }

  function setDraft(channelId, value) {
    state.draftsByChannel.set(channelId, String(value || ''));
    emitter.emit({ type: 'draft_changed', channelId });
  }

  function setSearch(term) {
    state.searchTerm = String(term || '').trim().toLowerCase();
    emitter.emit({ type: 'search_changed', term: state.searchTerm });
  }

  function setActiveCommunity(communityId) {
    const community = getCommunity(communityId);
    if (!community) return;
    state.activeCommunityId = communityId;
    state.activeChannelId = resolveDefaultChannelId(communityId);
    markRead(state.activeChannelId);
    emitter.emit({ type: 'community_selected', communityId });
  }

  function setActiveChannel(channelId) {
    const channel = getChannel(channelId);
    if (!channel) return;
    state.activeChannelId = channelId;
    const community = getCommunityForChannel(channelId);
    if (community) state.activeCommunityId = community.id;
    markRead(channelId);
    emitter.emit({ type: 'channel_selected', channelId });
  }

  function joinCommunity(communityId, options = {}) {
    if (!communityId) return;
    const already = state.joinedCommunityIds.has(communityId);
    state.joinedCommunityIds.add(communityId);
    if (state.currentUserPubkey) ensureMember(communityId, state.currentUserPubkey, ['member']);
    ensureActiveSelection();
    persistJoined();
    if (!already || !options.silent) {
      emitter.emit({ type: 'community_joined', communityId, source: options.source || 'local' });
    }
  }

  function leaveCommunity(communityId, options = {}) {
    if (!communityId) return;
    const had = state.joinedCommunityIds.has(communityId);
    state.joinedCommunityIds.delete(communityId);
    persistJoined();
    if (had || !options.silent) {
      emitter.emit({ type: 'community_left', communityId, source: options.source || 'local' });
    }
    if (state.activeCommunityId === communityId) ensureActiveSelection();
  }

  function setJoinedCommunities(communityIds, options = {}) {
    state.joinedCommunityIds = new Set(unique((communityIds || []).map((id) => String(id || '').trim()).filter(Boolean)));
    persistJoined();
    ensureActiveSelection();
    emitter.emit({ type: 'joined_set', ids: Array.from(state.joinedCommunityIds), source: options.source || 'nostr' });
  }

  function createInvite(communityId = state.activeCommunityId) {
    if (!communityId) return '';
    const slug = (communityId.split(':')[1] || 'community').slice(0, 20);
    const code = `${slug}-${Math.random().toString(36).slice(2, 8)}`;
    state.inviteCodesByCommunity.set(communityId, code);
    emitter.emit({ type: 'invite_created', communityId, code });
    return code;
  }

  function setMemberRole(communityId, pubkey, roleIds) {
    const community = getCommunity(communityId);
    if (!community) return { ok: false, reason: 'missing_community' };
    if (!can('manage_roles', null, community)) return { ok: false, reason: 'permission_denied' };
    const member = ensureMember(communityId, pubkey, ['member']);
    member.roles = unique(roleIds || ['member']);
    refreshLeadershipLists(communityId);
    emitter.emit({ type: 'member_role_changed', communityId, pubkey });
    return { ok: true };
  }

  function moderateMember(communityId, pubkey, action) {
    const community = getCommunity(communityId);
    if (!community) return { ok: false, reason: 'missing_community' };
    if (!can('mute_timeout_ban', null, community)) return { ok: false, reason: 'permission_denied' };

    const list = state.data.membersByCommunity[communityId] || [];
    const member = list.find((m) => m.pubkey === pubkey);
    if (!member) return { ok: false, reason: 'missing_member' };

    if (action === 'mute') member.muted = true;
    if (action === 'unmute') member.muted = false;
    if (action === 'timeout_5m') member.timeoutUntil = nowMs() + (5 * 60 * 1000);
    if (action === 'ban') member.banned = true;
    if (action === 'kick') state.data.membersByCommunity[communityId] = list.filter((m) => m.pubkey !== pubkey);

    emitter.emit({ type: 'moderation_applied', communityId, pubkey, action });
    return { ok: true };
  }

  function createChannel(payload = {}, options = {}) {
    const communityId = String(payload.communityId || state.activeCommunityId || '').trim();
    const community = getCommunity(communityId);
    if (!community) return { ok: false, reason: 'missing_community' };
    if (!options.bypassPermission && !can('manage_channels', null, community)) {
      return { ok: false, reason: 'permission_denied' };
    }

    const name = String(payload.name || '').trim();
    if (!name) return { ok: false, reason: 'missing_name' };

    const communitySlug = (communityId.split(':')[1] || 'community').slice(0, 24);
    const base = String(payload.id || `ch:${communitySlug}:${slugify(name)}`);
    let channelId = base;
    let i = 1;
    while ((state.data.channelsByCommunity[communityId] || []).some((channel) => channel.id === channelId)) {
      channelId = `${base}-${i}`;
      i += 1;
    }

    const channel = {
      id: channelId,
      communityId,
      category: String(payload.category || 'Channels').trim() || 'Channels',
      name,
      topic: String(payload.topic || '').trim(),
      channelType: String(payload.channelType || 'public').trim() || 'public',
      privacyLevel: String(payload.privacyLevel || 'public').trim() || 'public',
      slowModeSec: Math.max(0, Number(payload.slowModeSec || 0)),
      archived: !!payload.archived,
      pinned: !!payload.pinned,
      roleOverrides: Array.isArray(payload.roleOverrides) ? clone(payload.roleOverrides) : [],
      source: payload.source || 'local',
      createdAt: nowMs()
    };

    ensureCommunityContainers(communityId);
    state.data.channelsByCommunity[communityId].push(channel);
    if (!state.data.messagesByChannel[channel.id]) state.data.messagesByChannel[channel.id] = [];
    if (!community.defaultChannelId) community.defaultChannelId = channel.id;

    emitter.emit({ type: 'channel_created', channel });
    return { ok: true, channel };
  }

  function updateChannel(channelId, patch = {}) {
    const channel = getChannel(channelId);
    const community = getCommunityForChannel(channelId);
    if (!channel || !community) return { ok: false, reason: 'missing_channel' };
    if (!can('manage_channels', channel, community)) return { ok: false, reason: 'permission_denied' };

    Object.assign(channel, {
      name: patch.name != null ? String(patch.name).trim() : channel.name,
      topic: patch.topic != null ? String(patch.topic).trim() : channel.topic,
      category: patch.category != null ? String(patch.category).trim() : channel.category,
      privacyLevel: patch.privacyLevel != null ? String(patch.privacyLevel).trim() : channel.privacyLevel,
      channelType: patch.channelType != null ? String(patch.channelType).trim() : channel.channelType,
      slowModeSec: patch.slowModeSec != null ? Math.max(0, Number(patch.slowModeSec || 0)) : channel.slowModeSec,
      archived: patch.archived != null ? !!patch.archived : channel.archived,
      pinned: patch.pinned != null ? !!patch.pinned : channel.pinned
    });

    emitter.emit({ type: 'channel_updated', channelId, patch });
    return { ok: true, channel };
  }

  function createCommunity(payload = {}) {
    if (!state.currentUserPubkey) return { ok: false, reason: 'auth_required' };

    const type = String(payload.type || 'public').trim() === 'private' ? 'private' : 'public';
    const title = String(payload.name || payload.title || '').trim();
    if (!title) return { ok: false, reason: 'missing_name' };

    const slug = slugify(payload.slug || title);
    const id = `${type === 'private' ? 'n29' : 'n72'}:${slug}`;
    if (getCommunity(id)) return { ok: false, reason: 'duplicate', communityId: id };

    const rules = Array.isArray(payload.rules) ? unique(payload.rules) : parseLines(payload.rules);
    const topics = Array.isArray(payload.topics) ? unique(payload.topics) : parseCsv(payload.topics);
    const moderators = Array.isArray(payload.moderators) ? unique(payload.moderators) : parseCsv(payload.moderators);
    const admins = Array.isArray(payload.admins) ? unique(payload.admins) : parseCsv(payload.admins);
    const relays = Array.isArray(payload.allowedRelays) ? unique(payload.allowedRelays) : parseCsv(payload.allowedRelays);
    const joinMode = String(payload.joinMode || payload.membershipMode || (type === 'private' ? 'approval' : 'open')).trim();

    const community = {
      id,
      type,
      title,
      icon: String(payload.icon || '').trim(),
      image: String(payload.image || '').trim(),
      banner: String(payload.banner || '').trim(),
      description: String(payload.description || '').trim(),
      rules,
      topics,
      ownerPubkey: state.currentUserPubkey,
      moderatorPubkeys: moderators,
      adminPubkeys: admins,
      joinMode,
      discoverable: type === 'public' ? (payload.discoverable !== false) : false,
      defaultChannelId: '',
      allowedRelays: relays,
      roleDefs: clone(DEFAULT_ROLE_DEFS),
      serverDefaultAllow: type === 'public' ? ['view_channels'] : [],
      serverDefaultDeny: type === 'private' ? ['view_channels'] : [],
      postingPolicy: String(payload.postingPolicy || 'members').trim() || 'members',
      createdAt: nowMs(),
      updatedAt: nowMs(),
      source: 'local'
    };

    state.data.communities.push(community);
    ensureCommunityContainers(id);
    ensureProfile(state.currentUserPubkey);
    ensureMember(id, state.currentUserPubkey, ['owner']);
    moderators.forEach((pubkey) => {
      ensureProfile(pubkey);
      ensureMember(id, pubkey, ['moderator']);
    });
    admins.forEach((pubkey) => {
      ensureProfile(pubkey);
      ensureMember(id, pubkey, ['admin']);
    });
    refreshLeadershipLists(id);

    const seedChannels = [];
    seedChannels.push({
      name: String(payload.defaultChannelName || 'general').trim() || 'general',
      category: 'Start Here',
      topic: 'General discussion',
      channelType: 'public',
      privacyLevel: 'public'
    });
    if (payload.includeAnnouncements) {
      seedChannels.push({ name: 'announcements', category: 'Start Here', topic: 'Important updates', channelType: 'announcement', privacyLevel: 'public' });
    }
    if (payload.includeForum) {
      seedChannels.push({ name: 'forum', category: 'Discussion', topic: 'Threaded conversations', channelType: 'forum', privacyLevel: 'public' });
    }
    if (payload.includeStaff || type === 'private') {
      seedChannels.push({
        name: 'staff',
        category: 'Moderation',
        topic: 'Moderator room',
        channelType: 'private',
        privacyLevel: 'invite_only',
        roleOverrides: [
          { roleId: 'guest', allow: [], deny: ['view_channels'] },
          { roleId: 'member', allow: [], deny: ['view_channels'] },
          { roleId: 'moderator', allow: ['view_channels', 'post_messages', 'react'], deny: [] },
          { roleId: 'admin', allow: ['view_channels', 'post_messages', 'react'], deny: [] }
        ]
      });
    }

    const createdChannels = [];
    seedChannels.forEach((entry, index) => {
      const res = createChannel({
        communityId: id,
        ...entry,
        slowModeSec: Number(payload.defaultSlowModeSec || 0),
        source: 'local'
      }, { bypassPermission: true });
      if (res.ok && res.channel) {
        createdChannels.push(res.channel);
        if (index === 0) community.defaultChannelId = res.channel.id;
      }
    });

    joinCommunity(id, { source: 'local' });
    setActiveCommunity(id);
    emitter.emit({ type: 'community_created', community, channels: createdChannels });
    return { ok: true, community, channels: createdChannels };
  }

  function updateCommunity(communityId, patch = {}) {
    const community = getCommunity(communityId);
    if (!community) return { ok: false, reason: 'missing_community' };
    if (!can('manage_server', null, community)) return { ok: false, reason: 'permission_denied' };

    if (patch.name != null) community.title = String(patch.name).trim() || community.title;
    if (patch.description != null) community.description = String(patch.description).trim();
    if (patch.icon != null) community.icon = String(patch.icon).trim();
    if (patch.image != null) community.image = String(patch.image).trim();
    if (patch.banner != null) community.banner = String(patch.banner).trim();
    if (patch.joinMode != null) community.joinMode = String(patch.joinMode).trim();
    if (patch.postingPolicy != null) community.postingPolicy = String(patch.postingPolicy).trim();
    if (patch.discoverable != null) community.discoverable = !!patch.discoverable;
    if (patch.rules != null) community.rules = Array.isArray(patch.rules) ? unique(patch.rules) : parseLines(patch.rules);
    if (patch.topics != null) community.topics = Array.isArray(patch.topics) ? unique(patch.topics) : parseCsv(patch.topics);
    if (patch.allowedRelays != null) community.allowedRelays = Array.isArray(patch.allowedRelays) ? unique(patch.allowedRelays) : parseCsv(patch.allowedRelays);
    if (patch.moderatorPubkeys != null) {
      community.moderatorPubkeys = Array.isArray(patch.moderatorPubkeys) ? unique(patch.moderatorPubkeys) : parseCsv(patch.moderatorPubkeys);
      syncRoleAssignments(communityId, 'moderator', community.moderatorPubkeys);
    }
    if (patch.adminPubkeys != null) {
      community.adminPubkeys = Array.isArray(patch.adminPubkeys) ? unique(patch.adminPubkeys) : parseCsv(patch.adminPubkeys);
      syncRoleAssignments(communityId, 'admin', community.adminPubkeys);
    }
    refreshLeadershipLists(communityId);
    community.updatedAt = nowMs();

    emitter.emit({ type: 'community_updated', communityId, patch });
    return { ok: true, community };
  }

  function ingestProfile(payload = {}) {
    const pubkey = String(payload.pubkey || '').trim();
    if (!pubkey) return false;
    ensureProfile(pubkey, {
      name: payload.name != null ? String(payload.name) : undefined,
      displayName: payload.displayName != null ? String(payload.displayName) : undefined,
      nip05: payload.nip05 != null ? String(payload.nip05) : undefined,
      verifiedNip05: payload.verifiedNip05 != null ? !!payload.verifiedNip05 : undefined,
      avatar: payload.avatar != null ? String(payload.avatar) : undefined,
      bio: payload.bio != null ? String(payload.bio) : undefined
    });
    emitter.emit({ type: 'profile_ingested', pubkey });
    return true;
  }

  function ingestCommunity(payload = {}) {
    const id = String(payload.id || '').trim();
    if (!id) return false;

    let community = getCommunity(id);
    if (!community) {
      community = {
        id,
        type: String(payload.type || (id.startsWith('n29:') ? 'private' : 'public')),
        title: String(payload.title || payload.name || id),
        icon: String(payload.icon || ''),
        image: String(payload.image || ''),
        banner: String(payload.banner || ''),
        description: String(payload.description || ''),
        rules: Array.isArray(payload.rules) ? unique(payload.rules) : [],
        topics: Array.isArray(payload.topics) ? unique(payload.topics) : [],
        ownerPubkey: String(payload.ownerPubkey || ''),
        moderatorPubkeys: Array.isArray(payload.moderatorPubkeys) ? unique(payload.moderatorPubkeys) : [],
        adminPubkeys: Array.isArray(payload.adminPubkeys) ? unique(payload.adminPubkeys) : [],
        joinMode: String(payload.joinMode || 'open'),
        discoverable: payload.discoverable !== false,
        defaultChannelId: String(payload.defaultChannelId || ''),
        allowedRelays: Array.isArray(payload.allowedRelays) ? unique(payload.allowedRelays) : [],
        roleDefs: clone(DEFAULT_ROLE_DEFS),
        serverDefaultAllow: payload.serverDefaultAllow || [],
        serverDefaultDeny: payload.serverDefaultDeny || [],
        postingPolicy: String(payload.postingPolicy || 'members'),
        createdAt: Number(payload.createdAt || nowMs()),
        updatedAt: Number(payload.updatedAt || nowMs()),
        source: payload.source || 'nostr'
      };
      state.data.communities.push(community);
    } else {
      Object.assign(community, {
        type: payload.type != null ? String(payload.type) : community.type,
        title: payload.title != null ? String(payload.title) : community.title,
        icon: payload.icon != null ? String(payload.icon) : community.icon,
        image: payload.image != null ? String(payload.image) : community.image,
        banner: payload.banner != null ? String(payload.banner) : community.banner,
        description: payload.description != null ? String(payload.description) : community.description,
        joinMode: payload.joinMode != null ? String(payload.joinMode) : community.joinMode,
        discoverable: payload.discoverable != null ? !!payload.discoverable : community.discoverable,
        defaultChannelId: payload.defaultChannelId != null ? String(payload.defaultChannelId) : community.defaultChannelId,
        postingPolicy: payload.postingPolicy != null ? String(payload.postingPolicy) : community.postingPolicy,
        updatedAt: Number(payload.updatedAt || nowMs())
      });
      if (payload.rules != null) community.rules = Array.isArray(payload.rules) ? unique(payload.rules) : parseLines(payload.rules);
      if (payload.topics != null) community.topics = Array.isArray(payload.topics) ? unique(payload.topics) : parseCsv(payload.topics);
      if (payload.allowedRelays != null) community.allowedRelays = Array.isArray(payload.allowedRelays) ? unique(payload.allowedRelays) : parseCsv(payload.allowedRelays);
      if (payload.moderatorPubkeys != null) community.moderatorPubkeys = Array.isArray(payload.moderatorPubkeys) ? unique(payload.moderatorPubkeys) : parseCsv(payload.moderatorPubkeys);
      if (payload.adminPubkeys != null) community.adminPubkeys = Array.isArray(payload.adminPubkeys) ? unique(payload.adminPubkeys) : parseCsv(payload.adminPubkeys);
    }

    ensureCommunityContainers(id);
    if (community.ownerPubkey) ensureMember(id, community.ownerPubkey, ['owner']);
    (community.moderatorPubkeys || []).forEach((pubkey) => ensureMember(id, pubkey, ['moderator']));
    (community.adminPubkeys || []).forEach((pubkey) => ensureMember(id, pubkey, ['admin']));
    refreshLeadershipLists(id);
    touchCommunity(id, community.updatedAt || nowMs());
    ensureActiveSelection();
    emitter.emit({ type: 'community_ingested', communityId: id });
    return true;
  }

  function ingestChannel(payload = {}) {
    const communityId = String(payload.communityId || '').trim();
    const id = String(payload.id || '').trim();
    if (!communityId || !id) return false;
    if (!getCommunity(communityId)) {
      ingestCommunity({
        id: communityId,
        type: communityId.startsWith('n29:') ? 'private' : 'public',
        title: communityId.split(':')[1] || 'Community',
        discoverable: !communityId.startsWith('n29:'),
        source: 'nostr'
      });
    }

    ensureCommunityContainers(communityId);
    const list = state.data.channelsByCommunity[communityId] || [];
    const existing = list.find((channel) => channel.id === id);

    if (existing) {
      Object.assign(existing, {
        name: payload.name != null ? String(payload.name) : existing.name,
        topic: payload.topic != null ? String(payload.topic) : existing.topic,
        category: payload.category != null ? String(payload.category) : existing.category,
        channelType: payload.channelType != null ? String(payload.channelType) : existing.channelType,
        privacyLevel: payload.privacyLevel != null ? String(payload.privacyLevel) : existing.privacyLevel,
        slowModeSec: payload.slowModeSec != null ? Math.max(0, Number(payload.slowModeSec || 0)) : existing.slowModeSec,
        archived: payload.archived != null ? !!payload.archived : existing.archived,
        pinned: payload.pinned != null ? !!payload.pinned : existing.pinned,
        source: payload.source || existing.source || 'nostr'
      });
    } else {
      list.push({
        id,
        communityId,
        category: String(payload.category || 'Channels'),
        name: String(payload.name || id),
        topic: String(payload.topic || ''),
        channelType: String(payload.channelType || 'public'),
        privacyLevel: String(payload.privacyLevel || 'public'),
        slowModeSec: Math.max(0, Number(payload.slowModeSec || 0)),
        archived: !!payload.archived,
        pinned: !!payload.pinned,
        roleOverrides: Array.isArray(payload.roleOverrides) ? clone(payload.roleOverrides) : [],
        source: payload.source || 'nostr',
        createdAt: Number(payload.createdAt || nowMs())
      });
    }

    state.data.channelsByCommunity[communityId] = list;
    if (!state.data.messagesByChannel[id]) state.data.messagesByChannel[id] = [];
    const community = getCommunity(communityId);
    if (community && !community.defaultChannelId) community.defaultChannelId = id;

    ensureActiveSelection();
    emitter.emit({ type: 'channel_ingested', communityId, channelId: id });
    return true;
  }

  function ingestMessage(payload = {}) {
    const channelId = String(payload.channelId || '').trim();
    const id = String(payload.id || '').trim();
    if (!channelId || !id) return false;

    if (!getChannel(channelId) && payload.communityId) {
      ingestChannel({
        id: channelId,
        communityId: payload.communityId,
        name: payload.channelName || channelId.split(':').slice(-1)[0] || 'channel',
        category: 'Imported',
        topic: '',
        channelType: 'public',
        privacyLevel: 'public',
        source: 'nostr'
      });
    }

    ensureProfile(payload.authorPubkey || '');
    appendMessage(channelId, {
      id,
      channelId,
      communityId: payload.communityId || (getCommunityForChannel(channelId) && getCommunityForChannel(channelId).id) || '',
      authorPubkey: payload.authorPubkey || '',
      content: String(payload.content || ''),
      createdAt: Number(payload.createdAt || nowMs()),
      createdAtIso: nowIso(),
      replyTo: String(payload.replyTo || ''),
      threadRoot: String(payload.threadRoot || ''),
      pinned: !!payload.pinned,
      pending: false,
      reactions: payload.reactions || {},
      attachments: Array.isArray(payload.attachments) ? clone(payload.attachments) : [],
      source: payload.source || 'nostr'
    }, 'message_ingested');

    return true;
  }

  function ingestCommunityMembers(payload = {}) {
    const communityId = String(payload.communityId || '').trim();
    const members = unique(payload.members || []);
    if (!communityId || !members.length) return false;

    ensureCommunityContainers(communityId);
    members.forEach((pubkey) => ensureMember(communityId, pubkey, ['member']));

    if (payload.replace === true) {
      state.data.membersByCommunity[communityId] = members.map((pubkey) => ({
        pubkey,
        roles: unique((payload.rolesByPubkey && payload.rolesByPubkey[pubkey]) || ['member']),
        joinedAt: nowMs(),
        muted: false,
        banned: false,
        timeoutUntil: 0
      }));
    }

    refreshLeadershipLists(communityId);
    if (members.includes(state.currentUserPubkey)) joinCommunity(communityId, { source: 'nostr', silent: true });
    emitter.emit({ type: 'community_members_ingested', communityId, count: members.length });
    return true;
  }

  function ingestCommunityModerators(payload = {}) {
    const communityId = String(payload.communityId || '').trim();
    const moderators = unique(payload.moderators || []);
    const admins = unique(payload.admins || []);
    if (!communityId) return false;

    const community = getCommunity(communityId);
    if (!community) return false;

    if (payload.moderators != null) {
      community.moderatorPubkeys = moderators;
      syncRoleAssignments(communityId, 'moderator', moderators);
    }
    if (payload.admins != null) {
      community.adminPubkeys = admins;
      syncRoleAssignments(communityId, 'admin', admins);
    }

    refreshLeadershipLists(communityId);
    emitter.emit({ type: 'community_moderators_ingested', communityId, count: (community.moderatorPubkeys || []).length, adminCount: (community.adminPubkeys || []).length });
    return true;
  }

  function ingestMembershipList(payload = {}) {
    const pubkey = String(payload.pubkey || '').trim();
    if (!pubkey || pubkey !== state.currentUserPubkey) return false;

    const ids = unique(payload.communityIds || []);
    ids.forEach((id) => {
      if (!getCommunity(id)) {
        ingestCommunity({
          id,
          title: id.split(':')[1] || id,
          type: id.startsWith('n29:') ? 'private' : 'public',
          discoverable: !id.startsWith('n29:')
        });
      }
    });

    setJoinedCommunities(ids, { source: 'nostr_membership' });
    return true;
  }

  function setRelayStatus(relay, relayState) {
    if (!relay) return;
    state.relayStatusByUrl.set(relay, String(relayState || 'unknown'));
    emitter.emit({ type: 'relay_status', relay, state: relayState });
  }

  function setCurrentUser(pubkey) {
    const next = String(pubkey || '').trim();
    if (!next || next === state.currentUserPubkey) return;
    state.currentUserPubkey = next;

    const fromStorage = readJoinedFromStorage(next);
    if (fromStorage.length) {
      state.joinedCommunityIds = new Set(fromStorage);
    }

    ensureActiveSelection();
    emitter.emit({ type: 'user_changed', pubkey: next });
  }

  function getJoinedCommunities() {
    return state.data.communities.filter((community) => state.joinedCommunityIds.has(community.id));
  }

  function getDiscoverySuggestions(limit = 8) {
    const max = Math.max(1, Number(limit || 8));
    const suggestions = state.data.communities
      .filter((community) => community.discoverable !== false)
      .filter((community) => !state.joinedCommunityIds.has(community.id))
      .map((community) => {
        const members = (state.data.membersByCommunity[community.id] || []).length;
        const channels = state.data.channelsByCommunity[community.id] || [];
        const messages = channels.reduce((sum, channel) => sum + (state.data.messagesByChannel[channel.id] || []).length, 0);
        const lastActive = Number(state.lastActiveByCommunity.get(community.id) || 0);
        return {
          community,
          score: (members * 4) + messages + Math.floor(lastActive / 10000000)
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, max)
      .map((row) => row.community);

    if (suggestions.length) return suggestions;
    if (!state.joinedCommunityIds.size) {
      return state.data.communities.filter((community) => community.discoverable !== false).slice(0, max);
    }
    return [];
  }

  function snapshot() {
    return {
      ...state,
      joinedCommunityIds: Array.from(state.joinedCommunityIds),
      unreadByChannel: new Map(state.unreadByChannel),
      draftsByChannel: new Map(state.draftsByChannel),
      inviteCodesByCommunity: new Map(state.inviteCodesByCommunity),
      pinnedByChannel: new Map(state.pinnedByChannel),
      relayStatusByUrl: new Map(state.relayStatusByUrl)
    };
  }

  function filteredMessages(channelId = state.activeChannelId) {
    const term = state.searchTerm;
    const list = getMessages(channelId);
    if (!term) return list;
    return list.filter((m) => String(m.content || '').toLowerCase().includes(term));
  }

  Object.keys(state.data.messagesByChannel).forEach((channelId) => {
    const channelMessages = state.data.messagesByChannel[channelId] || [];
    const pins = channelMessages.filter((m) => m.pinned).map((m) => m.id);
    state.pinnedByChannel.set(channelId, pins);
    channelMessages.forEach((message) => {
      indexMessage(channelId, message);
      const community = getCommunityForChannel(channelId);
      if (community) touchCommunity(community.id, message.createdAt);
    });
  });

  const joinedFromStorage = readJoinedFromStorage(state.currentUserPubkey);
  if (joinedFromStorage.length) {
    state.joinedCommunityIds = new Set(joinedFromStorage);
  } else {
    const inferred = state.data.communities
      .filter((community) => (state.data.membersByCommunity[community.id] || []).some((member) => member.pubkey === state.currentUserPubkey))
      .map((community) => community.id);
    state.joinedCommunityIds = new Set(inferred);
  }

  ensureActiveSelection();

  return {
    subscribe: emitter.subscribe,
    getState: snapshot,
    getCommunity,
    getChannels,
    getChannel,
    getMessages,
    getPinnedMessages,
    filteredMessages,
    getProfiles,
    profile,
    getMember,
    getMemberRoles,
    getPermissionContext,
    can,
    markRead,
    setDraft,
    setSearch,
    sendMessage,
    toggleReaction,
    togglePin,
    setActiveCommunity,
    setActiveChannel,
    joinCommunity,
    leaveCommunity,
    setJoinedCommunities,
    createInvite,
    setMemberRole,
    moderateMember,
    createCommunity,
    updateCommunity,
    createChannel,
    updateChannel,
    ingestProfile,
    ingestCommunity,
    ingestChannel,
    ingestMessage,
    ingestReaction,
    ingestDeletion,
    ingestCommunityMembers,
    ingestCommunityModerators,
    ingestMembershipList,
    setRelayStatus,
    setCurrentUser,
    getJoinedCommunities,
    getDiscoverySuggestions
  };
}

