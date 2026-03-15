import { cloneMockState } from './mock-data.js';
import { computeEffectivePermissions, DEFAULT_ROLE_DEFS } from './permissions.js';

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

function byCreatedAt(a, b) {
  return Number(a.createdAt || 0) - Number(b.createdAt || 0);
}

function nextId(prefix) {
  return `${prefix}:${Math.random().toString(36).slice(2, 10)}:${Date.now().toString(36)}`;
}

export function createCommunityStore(options = {}) {
  const { currentUserPubkey = 'pub_craig', featureFlags = {} } = options;

  const data = cloneMockState();
  const emitter = createEmitter();

  const state = {
    data,
    currentUserPubkey,
    activeCommunityId: data.communities[0] ? data.communities[0].id : '',
    activeChannelId: data.communities[0] ? data.communities[0].defaultChannelId : '',
    joinedCommunityIds: new Set(data.communities.map((c) => c.id)),
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
    pinnedByChannel: new Map()
  };

  Object.keys(state.data.messagesByChannel).forEach((channelId) => {
    const channelMessages = state.data.messagesByChannel[channelId] || [];
    const pins = channelMessages.filter((m) => m.pinned).map((m) => m.id);
    state.pinnedByChannel.set(channelId, pins);
  });

  function getCommunity(id = state.activeCommunityId) {
    return state.data.communities.find((c) => c.id === id) || null;
  }

  function getChannels(communityId = state.activeCommunityId) {
    return (state.data.channelsByCommunity[communityId] || []).slice();
  }

  function getChannel(channelId = state.activeChannelId) {
    const channels = getChannels();
    return channels.find((c) => c.id === channelId) || null;
  }

  function getMember(communityId = state.activeCommunityId, pubkey = state.currentUserPubkey) {
    const list = state.data.membersByCommunity[communityId] || [];
    return list.find((m) => m.pubkey === pubkey) || null;
  }

  function getMemberRoles(communityId = state.activeCommunityId, pubkey = state.currentUserPubkey) {
    const member = getMember(communityId, pubkey);
    return member ? (member.roles || ['guest']) : ['guest'];
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
    return state.data.profiles[pubkey] || {
      pubkey,
      name: `${pubkey.slice(0, 8)}...`,
      displayName: `${pubkey.slice(0, 8)}...`,
      nip05: '',
      verifiedNip05: false,
      avatar: '',
      bio: ''
    };
  }

  function markRead(channelId = state.activeChannelId) {
    state.unreadByChannel.set(channelId, 0);
    emitter.emit({ type: 'read', channelId });
  }

  function incrementUnread(channelId) {
    const current = Number(state.unreadByChannel.get(channelId) || 0);
    state.unreadByChannel.set(channelId, current + 1);
  }

  function appendMessage(channelId, message) {
    if (!state.data.messagesByChannel[channelId]) state.data.messagesByChannel[channelId] = [];
    state.data.messagesByChannel[channelId].push(message);
    if (channelId !== state.activeChannelId) incrementUnread(channelId);
  }

  function sendMessage(payload) {
    const { channelId = state.activeChannelId, content = '', attachments = [], replyTo = '' } = payload || {};
    const channel = getChannels().find((c) => c.id === channelId) || getChannel(channelId);
    const community = getCommunity();

    if (!channel || !community) return { ok: false, reason: 'missing_channel' };
    if (!can('post_messages', channel, community)) return { ok: false, reason: 'permission_denied' };

    const text = String(content || '').trim();
    if (!text && (!attachments || !attachments.length)) return { ok: false, reason: 'empty' };

    const message = {
      id: nextId('m'),
      channelId,
      authorPubkey: state.currentUserPubkey,
      content: text,
      createdAt: Date.now(),
      createdAtIso: nowIso(),
      replyTo: replyTo || '',
      threadRoot: replyTo || '',
      pinned: false,
      reactions: {},
      attachments: (attachments || []).map((a) => ({
        id: nextId('a'),
        name: a.name || 'attachment',
        kind: a.kind || 'file',
        url: a.url || '#'
      }))
    };

    appendMessage(channelId, message);
    emitter.emit({ type: 'message_sent', message });
    markRead(channelId);

    return { ok: true, message };
  }

  function toggleReaction(channelId, messageId, key) {
    const list = state.data.messagesByChannel[channelId] || [];
    const msg = list.find((m) => m.id === messageId);
    if (!msg) return;
    if (!can('react')) return;

    if (!msg.reactions) msg.reactions = {};
    if (!msg.reactions[key]) msg.reactions[key] = [];

    const idx = msg.reactions[key].indexOf(state.currentUserPubkey);
    if (idx >= 0) msg.reactions[key].splice(idx, 1);
    else msg.reactions[key].push(state.currentUserPubkey);

    if (!msg.reactions[key].length) delete msg.reactions[key];

    emitter.emit({ type: 'reaction_toggled', channelId, messageId, key });
  }

  function togglePin(channelId, messageId) {
    if (!can('pin_messages')) return;
    const pinIds = new Set(state.pinnedByChannel.get(channelId) || []);
    if (pinIds.has(messageId)) pinIds.delete(messageId);
    else pinIds.add(messageId);
    state.pinnedByChannel.set(channelId, Array.from(pinIds));

    const list = state.data.messagesByChannel[channelId] || [];
    const msg = list.find((m) => m.id === messageId);
    if (msg) msg.pinned = pinIds.has(messageId);

    emitter.emit({ type: 'pin_toggled', channelId, messageId });
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
    const found = getCommunity(communityId);
    if (!found) return;
    state.activeCommunityId = communityId;
    const channels = getChannels(communityId);
    state.activeChannelId = channels[0] ? channels[0].id : '';
    markRead(state.activeChannelId);
    emitter.emit({ type: 'community_selected', communityId });
  }

  function setActiveChannel(channelId) {
    state.activeChannelId = channelId;
    markRead(channelId);
    emitter.emit({ type: 'channel_selected', channelId });
  }

  function joinCommunity(communityId) {
    state.joinedCommunityIds.add(communityId);
    emitter.emit({ type: 'community_joined', communityId });
  }

  function leaveCommunity(communityId) {
    state.joinedCommunityIds.delete(communityId);
    emitter.emit({ type: 'community_left', communityId });
    if (state.activeCommunityId === communityId) {
      const next = state.data.communities.find((c) => state.joinedCommunityIds.has(c.id));
      if (next) setActiveCommunity(next.id);
    }
  }

  function createInvite(communityId = state.activeCommunityId) {
    const code = `${communityId.split(':')[1]}-${Math.random().toString(36).slice(2, 8)}`;
    state.inviteCodesByCommunity.set(communityId, code);
    emitter.emit({ type: 'invite_created', communityId, code });
    return code;
  }

  function setMemberRole(communityId, pubkey, roleIds) {
    if (!can('manage_roles')) return;
    const list = state.data.membersByCommunity[communityId] || [];
    const member = list.find((m) => m.pubkey === pubkey);
    if (!member) return;
    member.roles = Array.from(new Set(roleIds || []));
    emitter.emit({ type: 'member_role_changed', communityId, pubkey });
  }

  function moderateMember(communityId, pubkey, action) {
    if (!can('mute_timeout_ban')) return;
    const list = state.data.membersByCommunity[communityId] || [];
    const member = list.find((m) => m.pubkey === pubkey);
    if (!member) return;

    if (action === 'mute') member.muted = true;
    if (action === 'unmute') member.muted = false;
    if (action === 'timeout_5m') member.timeoutUntil = Date.now() + (5 * 60 * 1000);
    if (action === 'ban') member.banned = true;
    if (action === 'kick') {
      state.data.membersByCommunity[communityId] = list.filter((m) => m.pubkey !== pubkey);
    }

    emitter.emit({ type: 'moderation_applied', communityId, pubkey, action });
  }

  function snapshot() {
    return {
      ...state,
      joinedCommunityIds: Array.from(state.joinedCommunityIds),
      unreadByChannel: new Map(state.unreadByChannel),
      draftsByChannel: new Map(state.draftsByChannel),
      inviteCodesByCommunity: new Map(state.inviteCodesByCommunity),
      pinnedByChannel: new Map(state.pinnedByChannel)
    };
  }

  function filteredMessages(channelId = state.activeChannelId) {
    const term = state.searchTerm;
    const list = getMessages(channelId);
    if (!term) return list;
    return list.filter((m) => String(m.content || '').toLowerCase().includes(term));
  }

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
    createInvite,
    setMemberRole,
    moderateMember
  };
}
