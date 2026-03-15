import { PERMISSIONS, buildPermissionMatrix } from './permissions.js';

function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fmtTime(ts) {
  const date = new Date(Number(ts || 0));
  if (!Number.isFinite(date.getTime())) return '--:--';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function initials(name) {
  const value = String(name || '?').trim();
  if (!value) return '?';
  return value.slice(0, 2).toUpperCase();
}

function groupedChannels(channels) {
  const map = new Map();
  (channels || []).forEach((channel) => {
    const key = channel.category || 'Channels';
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(channel);
  });
  return Array.from(map.entries());
}

function roleLabel(profile, member) {
  const role = (member && member.roles && member.roles[0]) || 'guest';
  return `${profile.displayName || profile.name} - ${role}`;
}

function parseLines(value) {
  return String(value || '')
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
}

function parseCsv(value) {
  return String(value || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

export function createCommunitiesUI(input) {
  const { root, store, nostrBridge, appContext } = input;

  let mounted = false;
  let dispose = null;

  const ui = {
    session: {
      user: (input.session && input.session.user) || null,
      isAuthenticated: !!(input.session && input.session.isAuthenticated)
    },
    openModal: '',
    selectedMember: '',
    composerAttachments: [],
    emojiOpen: false,
    contextMessageId: '',
    contextX: 0,
    contextY: 0,
    roleEditorMember: '',
    memberPanelOpen: true,
    createBusy: false,
    saveBusy: false,
    statusMsg: ''
  };

  function closeTransient() {
    ui.selectedMember = '';
    ui.contextMessageId = '';
    ui.emojiOpen = false;
  }

  function setSession(next = {}) {
    ui.session = {
      user: next.user || null,
      isAuthenticated: !!next.isAuthenticated
    };
  }

  function permissionsSummary() {
    const matrix = buildPermissionMatrix();
    const keys = ['owner', 'admin', 'moderator', 'member', 'guest'];
    return `
      <div class="sc-table-wrap">
        <table class="sc-table">
          <thead>
            <tr><th>Permission</th>${keys.map((key) => `<th>${esc(key)}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${PERMISSIONS.map((perm) => `
              <tr>
                <td>${esc(perm)}</td>
                ${keys.map((key) => `<td>${matrix[key] && matrix[key][perm] ? 'Y' : '-'}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderLoginGate() {
    root.innerHTML = `
      <section class="sc-auth-gate">
        <div class="sc-auth-card">
          <h2>Login Required</h2>
          <p>You need a Nostr account connected to access Communities.</p>
          <ul>
            <li>Real Nostr relay subscriptions</li>
            <li>Create and manage groups with roles and posting rules</li>
            <li>Private group metadata with kind 39000, 39002, and 39003</li>
          </ul>
          <button id="scLoginGateBtn">Login with Nostr</button>
        </div>
      </section>
    `;

    const btn = root.querySelector('#scLoginGateBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        if (appContext && typeof appContext.openLogin === 'function') {
          appContext.openLogin();
        }
      });
    }
  }

  function render() {
    if (!ui.session.isAuthenticated) {
      renderLoginGate();
      return;
    }

    const state = store.getState();
    const community = store.getCommunity();
    const channel = store.getChannel();
    const joinedCommunityIds = new Set(state.joinedCommunityIds);
    const suggestions = store.getDiscoverySuggestions(6);

    const communities = state.data.communities || [];
    const channels = community ? store.getChannels(community.id) : [];
    const messages = channel ? store.filteredMessages(channel.id) : [];
    const pins = channel ? store.getPinnedMessages(channel.id) : [];
    const draft = channel ? (state.draftsByChannel.get(channel.id) || '') : '';
    const profiles = store.getProfiles();
    const members = community ? (state.data.membersByCommunity[community.id] || []) : [];

    const relayStatuses = Array.from(state.relayStatusByUrl.values());
    const connectedRelays = relayStatuses.filter((value) => value === 'open').length;

    const railHtml = communities.map((entry) => {
      const active = community && entry.id === community.id;
      const joined = joinedCommunityIds.has(entry.id);
      return `
        <button class="sc-server-pill${active ? ' active' : ''}" data-community="${esc(entry.id)}" title="${esc(entry.title)}">
          <span>${esc(entry.icon || initials(entry.title))}</span>
          ${joined ? '' : '<i class="sc-unjoined-dot"></i>'}
        </button>
      `;
    }).join('');

    const channelHtml = groupedChannels(channels).map(([category, items]) => `
      <section class="sc-category">
        <header>${esc(category)}</header>
        ${items.map((entry) => {
          const unread = Number(state.unreadByChannel.get(entry.id) || 0);
          const locked = entry.privacyLevel !== 'public';
          return `
            <button class="sc-channel-btn${channel && entry.id === channel.id ? ' active' : ''}" data-channel="${esc(entry.id)}" title="${esc(entry.topic || '')}">
              <span class="sc-channel-name"># ${esc(entry.name)}</span>
              <span class="sc-channel-meta">${locked ? 'private' : ''}${unread ? `<b>${unread}</b>` : ''}</span>
            </button>
          `;
        }).join('')}
      </section>
    `).join('');

    const memberHtml = members.map((member) => {
      const profileData = profiles[member.pubkey] || store.profile(member.pubkey);
      const timedOut = member.timeoutUntil && Number(member.timeoutUntil) > Date.now();
      return `
        <button class="sc-member-row" data-member="${esc(member.pubkey)}">
          <span class="sc-avatar">${esc(initials(profileData.displayName || profileData.name))}</span>
          <span class="sc-member-main">
            <strong>${esc(profileData.displayName || profileData.name)}</strong>
            <small>${esc((member.roles || ['guest']).join(', '))}${member.muted ? ' | muted' : ''}${timedOut ? ' | timeout' : ''}${member.banned ? ' | banned' : ''}</small>
          </span>
        </button>
      `;
    }).join('');

    const messageHtml = messages.map((message) => {
      const author = profiles[message.authorPubkey] || store.profile(message.authorPubkey);
      const reactions = Object.entries(message.reactions || {}).map(([key, who]) => {
        const active = (who || []).includes(state.currentUserPubkey);
        return `<button class="sc-react-chip${active ? ' active' : ''}" data-react-key="${esc(key)}" data-message="${esc(message.id)}">${esc(key)} ${Number((who || []).length)}</button>`;
      }).join('');

      return `
        <article class="sc-message" data-message-id="${esc(message.id)}">
          <button class="sc-avatar" data-member="${esc(message.authorPubkey)}">${esc(initials(author.displayName || author.name))}</button>
          <div class="sc-message-main">
            <header>
              <button class="sc-author" data-member="${esc(message.authorPubkey)}">${esc(author.displayName || author.name)}</button>
              <time>${esc(fmtTime(message.createdAt))}</time>
              ${(author.nip05 && author.verifiedNip05) ? `<span class="sc-nip05">${esc(author.nip05)}</span>` : ''}
            </header>
            ${message.replyTo ? `<div class="sc-reply-tag">Replying to ${esc(message.replyTo)}</div>` : ''}
            <div class="sc-content">${esc(message.content)}</div>
            ${(message.attachments || []).length ? `<div class="sc-attachments">${(message.attachments || []).map((attachment) => `<span>${esc(attachment.name)}</span>`).join('')}</div>` : ''}
            <footer>
              <div class="sc-reactions">${reactions}</div>
              <div class="sc-actions">
                <button data-action="reply" data-message="${esc(message.id)}">Reply</button>
                <button data-action="pin" data-message="${esc(message.id)}">${message.pinned ? 'Unpin' : 'Pin'}</button>
                <button data-action="menu" data-message="${esc(message.id)}">Menu</button>
              </div>
            </footer>
          </div>
        </article>
      `;
    }).join('');

    const suggestionsHtml = suggestions.map((entry) => `
      <button class="sc-discovery-item" data-discovery-community="${esc(entry.id)}">
        <strong>${esc(entry.title)}</strong>
        <small>${esc(entry.description || '')}</small>
      </button>
    `).join('');

    const showSuggestionPanel = !joinedCommunityIds.size;
    const notificationUnread = (state.data.notifications || []).filter((n) => n.unread).length;

    root.innerHTML = `
      <div class="sc-wrap" id="scWrap">
        <aside class="sc-server-rail">
          <div class="sc-rail-top">SC</div>
          <div class="sc-server-list">${railHtml}</div>
          <button class="sc-server-add" id="scCreateCommunityBtn" title="Create community">+</button>
          <button class="sc-server-add" id="scDiscoverBtn" title="Discover communities">?</button>
        </aside>

        <aside class="sc-channel-col">
          <header class="sc-channel-head">
            <div>
              <h2>${esc(community ? community.title : 'Communities')}</h2>
              <p>${community ? esc(community.type === 'private' ? 'Private Group / NIP-29' : 'Public Community / NIP-72') : 'No active community selected'}</p>
              <p>${connectedRelays} relay${connectedRelays === 1 ? '' : 's'} connected</p>
            </div>
            <button id="scServerSettingsBtn" ${community ? '' : 'disabled'}>Settings</button>
          </header>

          <div class="sc-channel-search">
            <input id="scSearchInput" value="${esc(state.searchTerm)}" placeholder="Search messages or channels" />
          </div>

          <div class="sc-channel-list">${community ? (channelHtml || '<div class="sc-empty">No channels yet.</div>') : '<div class="sc-empty">Select a community.</div>'}</div>

          <footer class="sc-channel-footer">
            <button id="scInviteBtn" ${community ? '' : 'disabled'}>Invite</button>
            <button id="scJoinLeaveBtn" ${community ? '' : 'disabled'}>${community && joinedCommunityIds.has(community.id) ? 'Leave' : 'Join'}</button>
            <button id="scCreateChannelBtn" ${(community && joinedCommunityIds.has(community.id) && store.can('manage_channels', channel, community)) ? '' : 'disabled'}>New Channel</button>
          </footer>
        </aside>

        <main class="sc-main">
          <header class="sc-main-head">
            <div>
              <h3>${channel ? `# ${esc(channel.name)}` : (showSuggestionPanel ? 'Find communities' : 'No channel selected')}</h3>
              <p>${channel ? esc(channel.topic || '') : (showSuggestionPanel ? 'Join a public community or create your own.' : 'Choose a channel to start chatting.')}</p>
            </div>
            <div class="sc-main-actions">
              <button id="scPinnedBtn" ${channel ? '' : 'disabled'}>Pinned (${pins.length})</button>
              <button id="scChannelSettingsBtn" ${(channel && store.can('manage_channels', channel, community)) ? '' : 'disabled'}>Channel Settings</button>
              <button id="scNotifBtn">Notifications${notificationUnread ? ` (${notificationUnread})` : ''}</button>
            </div>
          </header>

          ${showSuggestionPanel ? `
            <section class="sc-feed">
              <div class="sc-empty">
                <strong>You are not in any communities yet.</strong>
                <div style="margin-top:.5rem">Join a public group suggestion or create your own Nostr-native community.</div>
                <div class="sc-discovery-list" style="margin-top:.7rem">${suggestionsHtml || '<div class="sc-empty">No suggestions yet. Try discovery.</div>'}</div>
                <div style="margin-top:.7rem;display:flex;gap:.4rem;flex-wrap:wrap;">
                  <button id="scCreateFirstCommunityBtn">Create Community</button>
                  <button id="scOpenDiscoveryBtn">Open Discovery</button>
                </div>
              </div>
            </section>
          ` : `<section class="sc-feed" id="scFeed">${messageHtml || '<div class="sc-empty">No messages yet.</div>'}</section>`}

          <section class="sc-composer">
            <div class="sc-draft-tools">
              <button id="scEmojiBtn">Emoji</button>
              <label class="sc-attach-label">Attach<input type="file" id="scAttachInput" multiple hidden></label>
              <button id="scDmHintBtn">Encrypted DM</button>
            </div>
            ${(ui.composerAttachments || []).length ? `<div class="sc-attachment-preview">${ui.composerAttachments.map((file) => `<span>${esc(file.name)}</span>`).join('')}</div>` : ''}
            <textarea id="scComposer" placeholder="${channel ? `Message #${esc(channel.name)}` : 'Select a channel'}" ${channel ? '' : 'disabled'}>${esc(draft)}</textarea>
            <div class="sc-compose-foot">
              <small>${channel ? (store.can('post_messages', channel, community) ? 'Ready to publish via Nostr relays' : 'You do not have permission to post in this channel') : 'Pick a channel to start typing'}</small>
              <button id="scSendBtn" ${(channel && store.can('post_messages', channel, community)) ? '' : 'disabled'}>Send</button>
            </div>
            ${ui.emojiOpen ? `<div class="sc-emoji-pop" id="scEmojiPop">${[':)', ':D', '<3', ':fire:', ':zap:', ':rocket:', ':sifaka:'].map((emoji) => `<button data-emoji="${esc(emoji)}">${esc(emoji)}</button>`).join('')}</div>` : ''}
          </section>
        </main>

        <aside class="sc-member-col${ui.memberPanelOpen ? '' : ' collapsed'}">
          <header>
            <h4>Members (${members.length})</h4>
            <button id="scToggleMembersBtn">${ui.memberPanelOpen ? 'Hide' : 'Show'}</button>
          </header>
          <div class="sc-member-list">${memberHtml}</div>
        </aside>

        ${ui.statusMsg ? `<div class="sc-toast">${esc(ui.statusMsg)}</div>` : ''}
        ${ui.selectedMember ? renderProfilePopout(ui.selectedMember, profiles, members, community, store) : ''}
        ${ui.openModal ? renderModal(ui.openModal, state, community, channel, members, profiles, store, suggestions) : ''}
        ${ui.contextMessageId ? renderContextMenu(ui.contextMessageId, ui.contextX, ui.contextY) : ''}
      </div>
    `;

    bindHandlers();
  }

  function renderProfilePopout(pubkey, profiles, members, community, storeRef) {
    const profile = profiles[pubkey] || storeRef.profile(pubkey);
    const member = (members || []).find((entry) => entry.pubkey === pubkey) || { roles: ['guest'] };

    return `
      <div class="sc-popout" id="scProfilePopout">
        <button class="sc-popout-close" data-close="member">x</button>
        <div class="sc-pop-head">
          <span class="sc-avatar big">${esc(initials(profile.displayName || profile.name))}</span>
          <div>
            <h5>${esc(profile.displayName || profile.name)}</h5>
            <small>${esc(roleLabel(profile, member))}</small>
          </div>
        </div>
        <p>${esc(profile.bio || '')}</p>
        <div class="sc-pop-meta">
          <span>${profile.verifiedNip05 ? '[verified]' : '[unverified]'} ${esc(profile.nip05 || 'No NIP-05')}</span>
          <span>${esc(community ? community.id : '')}</span>
        </div>
        <div class="sc-pop-actions">
          <button data-member-action="mute" data-member="${esc(pubkey)}">Mute</button>
          <button data-member-action="timeout_5m" data-member="${esc(pubkey)}">Timeout</button>
          <button data-member-action="ban" data-member="${esc(pubkey)}">Ban</button>
          <button data-member-action="roles" data-member="${esc(pubkey)}">Roles</button>
        </div>
      </div>
    `;
  }

  function renderCreateCommunityModal(state) {
    const relayValue = (state.relayStatusByUrl && Array.from(state.relayStatusByUrl.keys()).join(', ')) || '';
    return `
      <div class="sc-modal-ov" data-close="modal">
        <div class="sc-modal sc-modal-wide">
          <h4>Create Community</h4>
          <p>Build a Nostr-native server with membership, moderation, and posting rules.</p>
          <div class="sc-form-grid sc-form-grid-2">
            <label>Type
              <select id="scCreateType">
                <option value="public">Public Community (NIP-72 style)</option>
                <option value="private">Private Group (NIP-29 style)</option>
              </select>
            </label>
            <label>Name<input id="scCreateName" placeholder="Sifaka Builders"></label>
            <label>Slug / ID<input id="scCreateSlug" placeholder="sifaka-builders"></label>
            <label>Default Channel Name<input id="scCreateDefaultChannel" value="general"></label>
            <label class="full">Description<textarea id="scCreateDescription" placeholder="What is this community about?"></textarea></label>
            <label>Image URL<input id="scCreateImage" placeholder="https://.../group.jpg"></label>
            <label>Banner URL<input id="scCreateBanner" placeholder="https://.../banner.jpg"></label>
            <label>Moderators (comma pubkeys)<input id="scCreateModerators" placeholder="npub/hex pubkeys separated by commas"></label>
            <label>Topics (comma)
              <input id="scCreateTopics" placeholder="nostr, livestream, dev">
            </label>
            <label>Membership Mode
              <select id="scCreateJoinMode">
                <option value="open">Open join</option>
                <option value="approval">Approval required</option>
                <option value="invite_only">Invite only</option>
              </select>
            </label>
            <label>Posting Rules
              <select id="scCreatePostingPolicy">
                <option value="members">Members can post</option>
                <option value="moderators">Moderators only</option>
                <option value="admins">Admins only</option>
              </select>
            </label>
            <label class="full">Community Rules (one per line)
              <textarea id="scCreateRules" placeholder="Be respectful\nNo spam\nKeep discussion on-topic"></textarea>
            </label>
            <label class="full">Allowed Relays (comma)
              <input id="scCreateAllowedRelays" value="${esc(relayValue)}" placeholder="wss://relay.example.com, wss://relay2.example.com">
            </label>
          </div>
          <div class="sc-check-grid">
            <label><input type="checkbox" id="scCreateDiscoverable" checked> Public discovery</label>
            <label><input type="checkbox" id="scCreateIncludeAnnouncements" checked> Include #announcements</label>
            <label><input type="checkbox" id="scCreateIncludeForum" checked> Include #forum</label>
            <label><input type="checkbox" id="scCreateIncludeStaff" checked> Include private #staff channel</label>
          </div>
          <div class="sc-modal-foot">
            <button data-close="modal">Cancel</button>
            <button id="scCreateCommunitySubmit">Create Community</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderCommunitySettingsModal(community) {
    return `
      <div class="sc-modal-ov" data-close="modal">
        <div class="sc-modal sc-modal-wide">
          <h4>Community Settings</h4>
          <p>Edit metadata, moderators, posting policy, and discovery controls.</p>
          <div class="sc-form-grid sc-form-grid-2">
            <label>Name<input id="scSettingsName" value="${esc(community.title || '')}"></label>
            <label>Join Mode
              <select id="scSettingsJoinMode">
                <option value="open" ${community.joinMode === 'open' ? 'selected' : ''}>Open</option>
                <option value="approval" ${community.joinMode === 'approval' ? 'selected' : ''}>Approval</option>
                <option value="invite_only" ${community.joinMode === 'invite_only' ? 'selected' : ''}>Invite only</option>
              </select>
            </label>
            <label>Image URL<input id="scSettingsImage" value="${esc(community.image || '')}"></label>
            <label>Banner URL<input id="scSettingsBanner" value="${esc(community.banner || '')}"></label>
            <label>Moderators (comma pubkeys)
              <input id="scSettingsModerators" value="${esc((community.moderatorPubkeys || []).join(', '))}">
            </label>
            <label>Posting Rules
              <select id="scSettingsPostingPolicy">
                <option value="members" ${community.postingPolicy === 'members' ? 'selected' : ''}>Members</option>
                <option value="moderators" ${community.postingPolicy === 'moderators' ? 'selected' : ''}>Moderators</option>
                <option value="admins" ${community.postingPolicy === 'admins' ? 'selected' : ''}>Admins</option>
              </select>
            </label>
            <label class="full">Description<textarea id="scSettingsDescription">${esc(community.description || '')}</textarea></label>
            <label class="full">Rules (one per line)<textarea id="scSettingsRules">${esc((community.rules || []).join('\n'))}</textarea></label>
            <label class="full">Topics (comma)<input id="scSettingsTopics" value="${esc((community.topics || []).join(', '))}"></label>
            <label class="full">Allowed Relays (comma)<input id="scSettingsRelays" value="${esc((community.allowedRelays || []).join(', '))}"></label>
          </div>
          <div class="sc-check-grid">
            <label><input type="checkbox" id="scSettingsDiscoverable" ${community.discoverable ? 'checked' : ''}> Discoverable in public lists</label>
          </div>
          <h5>Permission Matrix</h5>
          ${permissionsSummary()}
          <div class="sc-modal-foot">
            <button data-close="modal">Cancel</button>
            <button id="scSaveCommunitySettingsBtn">Save Settings</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderCreateChannelModal(community) {
    return `
      <div class="sc-modal-ov" data-close="modal">
        <div class="sc-modal">
          <h4>Create Channel</h4>
          <p>${esc(community.title)}</p>
          <div class="sc-form-grid">
            <label>Name<input id="scCreateChannelName" placeholder="support"></label>
            <label>Category<input id="scCreateChannelCategory" value="Channels"></label>
            <label>Topic<textarea id="scCreateChannelTopic" placeholder="Channel purpose"></textarea></label>
            <label>Channel Type
              <select id="scCreateChannelType">
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="announcement">Announcement</option>
                <option value="forum">Forum</option>
              </select>
            </label>
            <label>Privacy
              <select id="scCreateChannelPrivacy">
                <option value="public">Public</option>
                <option value="invite_only">Invite only</option>
              </select>
            </label>
            <label>Slow Mode (seconds)<input id="scCreateChannelSlow" type="number" min="0" value="0"></label>
          </div>
          <div class="sc-modal-foot">
            <button data-close="modal">Cancel</button>
            <button id="scCreateChannelSubmit">Create Channel</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderModal(key, state, community, channel, members, profiles, storeRef, suggestions) {
    if (key === 'createCommunity') {
      return renderCreateCommunityModal(state);
    }

    if (key === 'communitySettings' && community) {
      return renderCommunitySettingsModal(community);
    }

    if (key === 'createChannel' && community) {
      return renderCreateChannelModal(community);
    }

    if (key === 'channelSettings' && channel) {
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Channel Settings</h4>
            <p>#${esc(channel.name)}</p>
            <div class="sc-form-grid">
              <label>Name<input id="scChannelName" value="${esc(channel.name)}"></label>
              <label>Category<input id="scChannelCategory" value="${esc(channel.category || 'Channels')}"></label>
              <label>Topic<textarea id="scChannelTopic">${esc(channel.topic || '')}</textarea></label>
              <label>Privacy
                <select id="scChannelPrivacy">
                  <option value="public" ${channel.privacyLevel === 'public' ? 'selected' : ''}>Public</option>
                  <option value="invite_only" ${channel.privacyLevel === 'invite_only' ? 'selected' : ''}>Invite only</option>
                </select>
              </label>
              <label>Type
                <select id="scChannelType">
                  <option value="public" ${channel.channelType === 'public' ? 'selected' : ''}>Public</option>
                  <option value="private" ${channel.channelType === 'private' ? 'selected' : ''}>Private</option>
                  <option value="announcement" ${channel.channelType === 'announcement' ? 'selected' : ''}>Announcement</option>
                  <option value="forum" ${channel.channelType === 'forum' ? 'selected' : ''}>Forum</option>
                </select>
              </label>
              <label>Slow mode (seconds)<input id="scChannelSlow" type="number" min="0" value="${esc(channel.slowModeSec || 0)}"></label>
            </div>
            <div class="sc-modal-foot">
              <button data-close="modal">Cancel</button>
              <button id="scSaveChannelSettingsBtn">Save Channel</button>
            </div>
          </div>
        </div>
      `;
    }

    if (key === 'invites' && community) {
      const inviteCode = state.inviteCodesByCommunity.get(community.id) || '';
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Invite Members</h4>
            <p>Create an invite link for ${esc(community.title)}.</p>
            <div class="sc-invite-row">
              <input id="scInviteCode" readonly value="${esc(inviteCode ? `${location.origin}/communities/invite/${inviteCode}` : '')}">
              <button id="scGenerateInviteBtn">Generate</button>
            </div>
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    if (key === 'discovery') {
      const list = (suggestions || [])
        .map((entry) => `<button class="sc-discovery-item" data-discovery-community="${esc(entry.id)}"><strong>${esc(entry.title)}</strong><small>${esc(entry.description || '')}</small></button>`)
        .join('');

      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Community Discovery</h4>
            <p>Public communities discovered from relays.</p>
            <div class="sc-discovery-list">${list || '<div class="sc-empty">No public suggestions yet.</div>'}</div>
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    if (key === 'notifications') {
      const rows = (state.data.notifications || [])
        .map((n) => `<div class="sc-notif-row${n.unread ? ' unread' : ''}"><strong>${esc(n.kind)}</strong><span>${esc(n.title)}</span><small>${esc(fmtTime(n.createdAt))}</small></div>`)
        .join('');
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Notifications</h4>
            <div class="sc-notif-list">${rows || '<div class="sc-empty">No notifications.</div>'}</div>
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    if (key === 'roleEditor' && community) {
      const member = members.find((entry) => entry.pubkey === ui.roleEditorMember);
      const profileData = profiles[ui.roleEditorMember] || storeRef.profile(ui.roleEditorMember);
      const roleOptions = ['owner', 'admin', 'moderator', 'member', 'guest'];
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Role Editor</h4>
            <p>${esc((profileData && (profileData.displayName || profileData.name)) || 'Member')}</p>
            <div class="sc-role-picker">
              ${roleOptions.map((role) => `<button class="sc-role-btn${member && member.roles.includes(role) ? ' active' : ''}" data-role="${esc(role)}">${esc(role)}</button>`).join('')}
            </div>
            <div class="sc-modal-foot">
              <button id="scSaveRolesBtn" ${!member ? 'disabled' : ''}>Save</button>
              <button data-close="modal">Close</button>
            </div>
          </div>
        </div>
      `;
    }

    if (key === 'pinned' && channel) {
      const rows = storeRef.getPinnedMessages(channel.id).map((message) => `<div class="sc-pin-row"><strong>${esc(message.id)}</strong><span>${esc(message.content)}</span></div>`).join('');
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Pinned Messages</h4>
            <div class="sc-pin-list">${rows || '<div class="sc-empty">No pins yet.</div>'}</div>
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    return '';
  }

  function renderContextMenu(messageId, x, y) {
    return `
      <div class="sc-context" style="left:${Number(x)}px;top:${Number(y)}px" data-context-menu>
        <button data-context-action="reply" data-message="${esc(messageId)}">Reply</button>
        <button data-context-action="pin" data-message="${esc(messageId)}">Toggle Pin</button>
        <button data-context-action="report" data-message="${esc(messageId)}">Report (NIP-56)</button>
      </div>
    `;
  }

  function setStatus(message) {
    ui.statusMsg = String(message || '');
    render();
    if (ui.statusMsg) {
      window.setTimeout(() => {
        ui.statusMsg = '';
        render();
      }, 2400);
    }
  }

  async function publishMembershipList() {
    if (!nostrBridge || !ui.session.isAuthenticated) return;
    const joined = store.getState().joinedCommunityIds || [];
    try {
      await nostrBridge.publishMembershipList({
        pubkey: store.getState().currentUserPubkey,
        communityIds: joined
      });
    } catch (_) {}
  }

  function closeModalAndRerender() {
    ui.openModal = '';
    render();
  }

  function bindHandlers() {
    root.querySelectorAll('[data-community]').forEach((el) => {
      el.addEventListener('click', () => {
        store.setActiveCommunity(el.getAttribute('data-community'));
        closeTransient();
      });
    });

    root.querySelectorAll('[data-channel]').forEach((el) => {
      el.addEventListener('click', () => {
        store.setActiveChannel(el.getAttribute('data-channel'));
        closeTransient();
      });
    });

    root.querySelectorAll('[data-member]').forEach((el) => {
      el.addEventListener('click', (event) => {
        event.stopPropagation();
        ui.selectedMember = el.getAttribute('data-member');
        render();
      });
    });

    root.querySelectorAll('[data-close="member"]').forEach((el) => {
      el.addEventListener('click', () => {
        ui.selectedMember = '';
        render();
      });
    });

    root.querySelectorAll('[data-close="modal"]').forEach((el) => {
      el.addEventListener('click', (event) => {
        if (event.target !== el) return;
        ui.openModal = '';
        render();
      });
    });

    const search = root.querySelector('#scSearchInput');
    if (search) search.addEventListener('input', () => store.setSearch(search.value));

    const composer = root.querySelector('#scComposer');
    if (composer) {
      composer.addEventListener('input', () => store.setDraft(store.getState().activeChannelId, composer.value));
      composer.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          const res = store.sendMessage({ content: composer.value, attachments: ui.composerAttachments });
          if (!res.ok) return;
          store.setDraft(store.getState().activeChannelId, '');
          ui.composerAttachments = [];

          if (nostrBridge) {
            const state = store.getState();
            const channel = store.getChannel();
            try {
              await nostrBridge.publishChannelMessage({
                pubkey: state.currentUserPubkey,
                channel,
                communityId: state.activeCommunityId,
                channelId: state.activeChannelId,
                content: res.message.content,
                replyTo: res.message.replyTo,
                threadRoot: res.message.threadRoot
              });
            } catch (_) {}
          }
        }
      });
    }

    const sendBtn = root.querySelector('#scSendBtn');
    if (sendBtn) {
      sendBtn.addEventListener('click', async () => {
        const text = (composer && composer.value) || '';
        const res = store.sendMessage({ content: text, attachments: ui.composerAttachments });
        if (!res.ok) return;

        store.setDraft(store.getState().activeChannelId, '');
        ui.composerAttachments = [];

        if (nostrBridge) {
          const state = store.getState();
          const channel = store.getChannel();
          try {
            await nostrBridge.publishChannelMessage({
              pubkey: state.currentUserPubkey,
              channel,
              communityId: state.activeCommunityId,
              channelId: state.activeChannelId,
              content: res.message.content,
              replyTo: res.message.replyTo,
              threadRoot: res.message.threadRoot
            });
          } catch (_) {}
        }
      });
    }

    const attachInput = root.querySelector('#scAttachInput');
    if (attachInput) {
      attachInput.addEventListener('change', () => {
        ui.composerAttachments = Array.from(attachInput.files || []).map((file) => ({ name: file.name, kind: 'file', url: '#' }));
        render();
      });
    }

    const emojiBtn = root.querySelector('#scEmojiBtn');
    if (emojiBtn) {
      emojiBtn.addEventListener('click', () => {
        ui.emojiOpen = !ui.emojiOpen;
        render();
      });
    }

    root.querySelectorAll('[data-emoji]').forEach((el) => {
      el.addEventListener('click', () => {
        const value = el.getAttribute('data-emoji') || '';
        const snapshot = store.getState();
        const draft = snapshot.draftsByChannel.get(snapshot.activeChannelId) || '';
        store.setDraft(snapshot.activeChannelId, `${draft}${value} `);
      });
    });

    root.querySelectorAll('.sc-react-chip').forEach((el) => {
      el.addEventListener('click', async () => {
        const messageId = el.getAttribute('data-message');
        const key = el.getAttribute('data-react-key');
        const state = store.getState();
        const res = store.toggleReaction(state.activeChannelId, messageId, key);

        if (res.ok && res.added && nostrBridge) {
          try {
            await nostrBridge.publishReaction({
              communityId: state.activeCommunityId,
              channelId: state.activeChannelId,
              messageId,
              reaction: key,
              pubkey: state.currentUserPubkey
            });
          } catch (_) {}
        }
      });
    });

    root.querySelectorAll('[data-action="pin"]').forEach((el) => {
      el.addEventListener('click', () => {
        store.togglePin(store.getState().activeChannelId, el.getAttribute('data-message'));
      });
    });

    root.querySelectorAll('[data-action="reply"]').forEach((el) => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-message');
        const state = store.getState();
        const draft = state.draftsByChannel.get(state.activeChannelId) || '';
        store.setDraft(state.activeChannelId, `> ${id}\n${draft}`);
      });
    });

    root.querySelectorAll('[data-action="menu"]').forEach((el) => {
      el.addEventListener('click', (event) => {
        ui.contextMessageId = el.getAttribute('data-message') || '';
        ui.contextX = event.clientX;
        ui.contextY = event.clientY;
        render();
      });
    });

    root.querySelectorAll('[data-context-action]').forEach((el) => {
      el.addEventListener('click', () => {
        const action = el.getAttribute('data-context-action');
        const messageId = el.getAttribute('data-message');
        const channelId = store.getState().activeChannelId;
        if (action === 'pin') store.togglePin(channelId, messageId);
        if (action === 'reply') {
          const draft = store.getState().draftsByChannel.get(channelId) || '';
          store.setDraft(channelId, `> ${messageId}\n${draft}`);
        }
        if (action === 'report') window.alert('Report flow queued (NIP-56).');
        ui.contextMessageId = '';
        render();
      });
    });

    root.querySelectorAll('[data-member-action]').forEach((el) => {
      el.addEventListener('click', () => {
        const action = el.getAttribute('data-member-action');
        const pubkey = el.getAttribute('data-member');
        const state = store.getState();
        if (action === 'roles') {
          ui.openModal = 'roleEditor';
          ui.roleEditorMember = pubkey;
          render();
          return;
        }
        store.moderateMember(state.activeCommunityId, pubkey, action);
        ui.selectedMember = '';
        render();
      });
    });

    root.querySelectorAll('.sc-role-btn').forEach((el) => {
      el.addEventListener('click', () => {
        root.querySelectorAll('.sc-role-btn').forEach((btn) => btn.classList.remove('active'));
        el.classList.add('active');
      });
    });

    const saveRolesBtn = root.querySelector('#scSaveRolesBtn');
    if (saveRolesBtn) {
      saveRolesBtn.addEventListener('click', () => {
        const activeRole = root.querySelector('.sc-role-btn.active');
        if (!activeRole) return;
        const role = activeRole.getAttribute('data-role');
        const state = store.getState();
        store.setMemberRole(state.activeCommunityId, ui.roleEditorMember, [role]);
        ui.openModal = '';
        ui.roleEditorMember = '';
        render();
      });
    }

    const createCommunityBtn = root.querySelector('#scCreateCommunityBtn');
    if (createCommunityBtn) createCommunityBtn.addEventListener('click', () => { ui.openModal = 'createCommunity'; render(); });

    const createFirstCommunityBtn = root.querySelector('#scCreateFirstCommunityBtn');
    if (createFirstCommunityBtn) createFirstCommunityBtn.addEventListener('click', () => { ui.openModal = 'createCommunity'; render(); });

    const serverSettingsBtn = root.querySelector('#scServerSettingsBtn');
    if (serverSettingsBtn) serverSettingsBtn.addEventListener('click', () => { ui.openModal = 'communitySettings'; render(); });

    const channelSettingsBtn = root.querySelector('#scChannelSettingsBtn');
    if (channelSettingsBtn) channelSettingsBtn.addEventListener('click', () => { ui.openModal = 'channelSettings'; render(); });

    const pinnedBtn = root.querySelector('#scPinnedBtn');
    if (pinnedBtn) pinnedBtn.addEventListener('click', () => { ui.openModal = 'pinned'; render(); });

    const notifBtn = root.querySelector('#scNotifBtn');
    if (notifBtn) notifBtn.addEventListener('click', () => { ui.openModal = 'notifications'; render(); });

    const discoverBtn = root.querySelector('#scDiscoverBtn');
    if (discoverBtn) discoverBtn.addEventListener('click', () => { ui.openModal = 'discovery'; render(); });

    const openDiscoveryBtn = root.querySelector('#scOpenDiscoveryBtn');
    if (openDiscoveryBtn) openDiscoveryBtn.addEventListener('click', () => { ui.openModal = 'discovery'; render(); });

    const inviteBtn = root.querySelector('#scInviteBtn');
    if (inviteBtn) inviteBtn.addEventListener('click', () => { ui.openModal = 'invites'; render(); });

    const createChannelBtn = root.querySelector('#scCreateChannelBtn');
    if (createChannelBtn) createChannelBtn.addEventListener('click', () => { ui.openModal = 'createChannel'; render(); });

    const generateInviteBtn = root.querySelector('#scGenerateInviteBtn');
    if (generateInviteBtn) {
      generateInviteBtn.addEventListener('click', () => {
        const code = store.createInvite();
        const field = root.querySelector('#scInviteCode');
        if (field) field.value = `${location.origin}/communities/invite/${code}`;
      });
    }

    const joinLeaveBtn = root.querySelector('#scJoinLeaveBtn');
    if (joinLeaveBtn) {
      joinLeaveBtn.addEventListener('click', async () => {
        const state = store.getState();
        const joined = new Set(state.joinedCommunityIds);
        if (joined.has(state.activeCommunityId)) store.leaveCommunity(state.activeCommunityId);
        else store.joinCommunity(state.activeCommunityId);
        await publishMembershipList();
      });
    }

    root.querySelectorAll('[data-discovery-community]').forEach((el) => {
      el.addEventListener('click', async () => {
        const communityId = el.getAttribute('data-discovery-community');
        store.setActiveCommunity(communityId);
        store.joinCommunity(communityId);
        await publishMembershipList();
        ui.openModal = '';
        render();
      });
    });

    const createCommunitySubmit = root.querySelector('#scCreateCommunitySubmit');
    if (createCommunitySubmit) {
      createCommunitySubmit.addEventListener('click', async () => {
        if (ui.createBusy) return;
        ui.createBusy = true;

        const payload = {
          type: (root.querySelector('#scCreateType') || {}).value || 'public',
          name: (root.querySelector('#scCreateName') || {}).value || '',
          slug: (root.querySelector('#scCreateSlug') || {}).value || '',
          defaultChannelName: (root.querySelector('#scCreateDefaultChannel') || {}).value || 'general',
          description: (root.querySelector('#scCreateDescription') || {}).value || '',
          image: (root.querySelector('#scCreateImage') || {}).value || '',
          banner: (root.querySelector('#scCreateBanner') || {}).value || '',
          moderators: parseCsv((root.querySelector('#scCreateModerators') || {}).value || ''),
          topics: parseCsv((root.querySelector('#scCreateTopics') || {}).value || ''),
          joinMode: (root.querySelector('#scCreateJoinMode') || {}).value || 'open',
          postingPolicy: (root.querySelector('#scCreatePostingPolicy') || {}).value || 'members',
          rules: parseLines((root.querySelector('#scCreateRules') || {}).value || ''),
          allowedRelays: parseCsv((root.querySelector('#scCreateAllowedRelays') || {}).value || ''),
          discoverable: !!((root.querySelector('#scCreateDiscoverable') || {}).checked),
          includeAnnouncements: !!((root.querySelector('#scCreateIncludeAnnouncements') || {}).checked),
          includeForum: !!((root.querySelector('#scCreateIncludeForum') || {}).checked),
          includeStaff: !!((root.querySelector('#scCreateIncludeStaff') || {}).checked)
        };

        const created = store.createCommunity(payload);
        if (!created.ok) {
          ui.createBusy = false;
          setStatus(created.reason === 'auth_required' ? 'Login required.' : 'Unable to create community.');
          return;
        }

        if (nostrBridge) {
          try {
            await nostrBridge.publishCommunityCreate({
              ...payload,
              communityId: created.community.id,
              defaultChannelId: created.community.defaultChannelId
            });

            if (created.community.type === 'private') {
              const members = (store.getState().data.membersByCommunity[created.community.id] || []).map((m) => m.pubkey);
              const rolesByPubkey = {};
              (store.getState().data.membersByCommunity[created.community.id] || []).forEach((m) => { rolesByPubkey[m.pubkey] = m.roles || ['member']; });
              await nostrBridge.publishCommunityMembers39002({
                communityId: created.community.id,
                members,
                rolesByPubkey,
                joinMode: created.community.joinMode
              });
              await nostrBridge.publishCommunityModerators39003({
                communityId: created.community.id,
                moderators: created.community.moderatorPubkeys || [],
                postingPolicy: created.community.postingPolicy
              });
            }

            for (let i = 0; i < created.channels.length; i += 1) {
              const channel = created.channels[i];
              await nostrBridge.publishChannelCreate({
                communityId: created.community.id,
                channelId: channel.id,
                name: channel.name,
                category: channel.category,
                topic: channel.topic,
                channelType: channel.channelType,
                privacyLevel: channel.privacyLevel,
                slowModeSec: channel.slowModeSec
              });
            }

            await publishMembershipList();
          } catch (_) {}
        }

        ui.createBusy = false;
        ui.openModal = '';
        setStatus('Community created.');
      });
    }

    const saveSettingsBtn = root.querySelector('#scSaveCommunitySettingsBtn');
    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener('click', async () => {
        const state = store.getState();
        const community = store.getCommunity(state.activeCommunityId);
        if (!community) return;

        const patch = {
          name: (root.querySelector('#scSettingsName') || {}).value || community.title,
          description: (root.querySelector('#scSettingsDescription') || {}).value || '',
          image: (root.querySelector('#scSettingsImage') || {}).value || '',
          banner: (root.querySelector('#scSettingsBanner') || {}).value || '',
          moderatorPubkeys: parseCsv((root.querySelector('#scSettingsModerators') || {}).value || ''),
          joinMode: (root.querySelector('#scSettingsJoinMode') || {}).value || community.joinMode,
          postingPolicy: (root.querySelector('#scSettingsPostingPolicy') || {}).value || community.postingPolicy,
          discoverable: !!((root.querySelector('#scSettingsDiscoverable') || {}).checked),
          rules: parseLines((root.querySelector('#scSettingsRules') || {}).value || ''),
          topics: parseCsv((root.querySelector('#scSettingsTopics') || {}).value || ''),
          allowedRelays: parseCsv((root.querySelector('#scSettingsRelays') || {}).value || '')
        };

        const updated = store.updateCommunity(community.id, patch);
        if (!updated.ok) {
          setStatus('Could not save settings.');
          return;
        }

        if (nostrBridge) {
          try {
            await nostrBridge.publishCommunityCreate({
              ...community,
              ...patch,
              communityId: community.id,
              slug: community.id.split(':')[1],
              name: patch.name,
              defaultChannelId: community.defaultChannelId,
              type: community.type
            });

            if (community.type === 'private') {
              const members = (store.getState().data.membersByCommunity[community.id] || []).map((m) => m.pubkey);
              const rolesByPubkey = {};
              (store.getState().data.membersByCommunity[community.id] || []).forEach((m) => { rolesByPubkey[m.pubkey] = m.roles || ['member']; });
              await nostrBridge.publishCommunityMembers39002({
                communityId: community.id,
                members,
                rolesByPubkey,
                joinMode: patch.joinMode
              });
              await nostrBridge.publishCommunityModerators39003({
                communityId: community.id,
                moderators: patch.moderatorPubkeys,
                postingPolicy: patch.postingPolicy
              });
            }
          } catch (_) {}
        }

        closeModalAndRerender();
        setStatus('Community settings updated.');
      });
    }

    const createChannelSubmit = root.querySelector('#scCreateChannelSubmit');
    if (createChannelSubmit) {
      createChannelSubmit.addEventListener('click', async () => {
        const state = store.getState();
        const payload = {
          communityId: state.activeCommunityId,
          name: (root.querySelector('#scCreateChannelName') || {}).value || '',
          category: (root.querySelector('#scCreateChannelCategory') || {}).value || 'Channels',
          topic: (root.querySelector('#scCreateChannelTopic') || {}).value || '',
          channelType: (root.querySelector('#scCreateChannelType') || {}).value || 'public',
          privacyLevel: (root.querySelector('#scCreateChannelPrivacy') || {}).value || 'public',
          slowModeSec: Number((root.querySelector('#scCreateChannelSlow') || {}).value || 0)
        };

        const created = store.createChannel(payload);
        if (!created.ok) {
          setStatus('Unable to create channel.');
          return;
        }

        if (nostrBridge) {
          try {
            await nostrBridge.publishChannelCreate({
              communityId: payload.communityId,
              channelId: created.channel.id,
              name: created.channel.name,
              category: created.channel.category,
              topic: created.channel.topic,
              channelType: created.channel.channelType,
              privacyLevel: created.channel.privacyLevel,
              slowModeSec: created.channel.slowModeSec
            });
          } catch (_) {}
        }

        ui.openModal = '';
        render();
        setStatus('Channel created.');
      });
    }

    const saveChannelBtn = root.querySelector('#scSaveChannelSettingsBtn');
    if (saveChannelBtn) {
      saveChannelBtn.addEventListener('click', async () => {
        const channel = store.getChannel();
        if (!channel) return;

        const patch = {
          name: (root.querySelector('#scChannelName') || {}).value || channel.name,
          category: (root.querySelector('#scChannelCategory') || {}).value || channel.category,
          topic: (root.querySelector('#scChannelTopic') || {}).value || channel.topic,
          privacyLevel: (root.querySelector('#scChannelPrivacy') || {}).value || channel.privacyLevel,
          channelType: (root.querySelector('#scChannelType') || {}).value || channel.channelType,
          slowModeSec: Number((root.querySelector('#scChannelSlow') || {}).value || channel.slowModeSec || 0)
        };

        const updated = store.updateChannel(channel.id, patch);
        if (!updated.ok) {
          setStatus('Could not save channel settings.');
          return;
        }

        if (nostrBridge) {
          try {
            await nostrBridge.publishChannelCreate({
              communityId: updated.channel.communityId,
              channelId: updated.channel.id,
              name: updated.channel.name,
              category: updated.channel.category,
              topic: updated.channel.topic,
              channelType: updated.channel.channelType,
              privacyLevel: updated.channel.privacyLevel,
              slowModeSec: updated.channel.slowModeSec
            });
          } catch (_) {}
        }

        ui.openModal = '';
        render();
        setStatus('Channel updated.');
      });
    }

    const memberToggle = root.querySelector('#scToggleMembersBtn');
    if (memberToggle) {
      memberToggle.addEventListener('click', () => {
        ui.memberPanelOpen = !ui.memberPanelOpen;
        render();
      });
    }

    document.addEventListener('click', onOutsideClick, { once: true });
  }

  function onOutsideClick(event) {
    const inMenu = event.target && event.target.closest && event.target.closest('[data-context-menu]');
    const inPopout = event.target && event.target.closest && event.target.closest('#scProfilePopout');
    if (!inMenu) ui.contextMessageId = '';
    if (!inPopout) ui.selectedMember = '';
    if (!inMenu || !inPopout) render();
  }

  function mount() {
    if (mounted) return;
    mounted = true;
    render();
    dispose = store.subscribe(() => render());
  }

  function unmount() {
    if (!mounted) return;
    mounted = false;
    if (dispose) dispose();
    dispose = null;
    root.innerHTML = '';
  }

  return {
    mount,
    unmount,
    rerender: render,
    setSession
  };
}

