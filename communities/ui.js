import { PERMISSIONS, buildPermissionMatrix } from './permissions.js';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fmtTime(ts) {
  const d = new Date(Number(ts || 0));
  if (!Number.isFinite(d.getTime())) return '--:--';
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function initials(name) {
  const raw = String(name || '?').trim();
  if (!raw) return '?';
  return raw.slice(0, 2).toUpperCase();
}

function groupedChannels(channels) {
  const map = new Map();
  (channels || []).forEach((ch) => {
    const key = ch.category || 'Channels';
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(ch);
  });
  return Array.from(map.entries());
}

function roleLabel(profile, member) {
  const role = (member && member.roles && member.roles[0]) || 'guest';
  return `${profile.displayName || profile.name} - ${role}`;
}

export function createCommunitiesUI(input) {
  const { root, store, nostrBridge, appContext } = input;

  let mounted = false;
  let dispose = null;
  let ui = {
    openModal: '',
    selectedMember: '',
    composerAttachments: [],
    emojiOpen: false,
    contextMessageId: '',
    contextX: 0,
    contextY: 0,
    roleEditorMember: '',
    threadViewRoot: '',
    settingsTab: 'server',
    memberPanelOpen: true
  };

  function closeTransient() {
    ui.selectedMember = '';
    ui.openModal = '';
    ui.emojiOpen = false;
    ui.contextMessageId = '';
  }

  function permissionsSummary() {
    const matrix = buildPermissionMatrix();
    const keys = ['owner', 'admin', 'moderator', 'member', 'guest'];
    return `
      <div class="sc-table-wrap">
        <table class="sc-table">
          <thead>
            <tr><th>Permission</th>${keys.map((k) => `<th>${esc(k)}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${PERMISSIONS.map((perm) => `
              <tr>
                <td>${esc(perm)}</td>
                ${keys.map((k) => `<td>${matrix[k] && matrix[k][perm] ? 'Y' : '-'}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function render() {
    const state = store.getState();
    const community = store.getCommunity();
    const channel = store.getChannel();
    const channels = store.getChannels();
    const members = (state.data.membersByCommunity[community.id] || []);
    const profiles = store.getProfiles();
    const messages = store.filteredMessages();
    const pins = store.getPinnedMessages();
    const draft = state.draftsByChannel.get(channel.id) || '';
    const currentProfile = store.profile(state.currentUserPubkey);

    const joinedCommunityIds = new Set(state.joinedCommunityIds);

    const railHtml = state.data.communities.map((c) => {
      const active = c.id === state.activeCommunityId;
      const joined = joinedCommunityIds.has(c.id);
      return `
        <button class="sc-server-pill${active ? ' active' : ''}" data-community="${esc(c.id)}" title="${esc(c.title)}">
          <span>${esc(c.icon || initials(c.title))}</span>
          ${joined ? '' : '<i class="sc-unjoined-dot"></i>'}
        </button>
      `;
    }).join('');

    const channelHtml = groupedChannels(channels).map(([category, items]) => `
      <section class="sc-category">
        <header>${esc(category)}</header>
        ${items.map((ch) => {
          const unread = Number(state.unreadByChannel.get(ch.id) || 0);
          const locked = ch.privacyLevel !== 'public';
          return `
            <button class="sc-channel-btn${ch.id === channel.id ? ' active' : ''}" data-channel="${esc(ch.id)}" title="${esc(ch.topic || '')}">
              <span class="sc-channel-name"># ${esc(ch.name)}</span>
              <span class="sc-channel-meta">${locked ? 'private' : ''}${unread ? `<b>${unread}</b>` : ''}</span>
            </button>
          `;
        }).join('')}
      </section>
    `).join('');

    const memberHtml = members.map((m) => {
      const p = profiles[m.pubkey] || store.profile(m.pubkey);
      const timedOut = m.timeoutUntil && Number(m.timeoutUntil) > Date.now();
      return `
        <button class="sc-member-row" data-member="${esc(m.pubkey)}">
          <span class="sc-avatar">${esc(initials(p.displayName || p.name))}</span>
          <span class="sc-member-main">
            <strong>${esc(p.displayName || p.name)}</strong>
            <small>${esc((m.roles || ['guest']).join(', '))}${m.muted ? ' | muted' : ''}${timedOut ? ' | timeout' : ''}${m.banned ? ' | banned' : ''}</small>
          </span>
        </button>
      `;
    }).join('');

    const msgHtml = messages.map((m) => {
      const p = profiles[m.authorPubkey] || store.profile(m.authorPubkey);
      const reacts = Object.entries(m.reactions || {}).map(([key, who]) => {
        const active = (who || []).includes(state.currentUserPubkey);
        return `<button class="sc-react-chip${active ? ' active' : ''}" data-react-key="${esc(key)}" data-message="${esc(m.id)}">${esc(key)} ${Number((who || []).length)}</button>`;
      }).join('');

      return `
        <article class="sc-message" data-message-id="${esc(m.id)}">
          <button class="sc-avatar" data-member="${esc(m.authorPubkey)}">${esc(initials(p.displayName || p.name))}</button>
          <div class="sc-message-main">
            <header>
              <button class="sc-author" data-member="${esc(m.authorPubkey)}">${esc(p.displayName || p.name)}</button>
              <time>${esc(fmtTime(m.createdAt))}</time>
              ${(p.nip05 && p.verifiedNip05) ? `<span class="sc-nip05">${esc(p.nip05)}</span>` : ''}
            </header>
            ${m.replyTo ? `<div class="sc-reply-tag">Replying to ${esc(m.replyTo)}</div>` : ''}
            <div class="sc-content">${esc(m.content)}</div>
            ${(m.attachments || []).length ? `<div class="sc-attachments">${(m.attachments || []).map((a) => `<span>${esc(a.name)}</span>`).join('')}</div>` : ''}
            <footer>
              <div class="sc-reactions">${reacts}</div>
              <div class="sc-actions">
                <button data-action="reply" data-message="${esc(m.id)}">Reply</button>
                <button data-action="thread" data-message="${esc(m.id)}">Thread</button>
                <button data-action="pin" data-message="${esc(m.id)}">${m.pinned ? 'Unpin' : 'Pin'}</button>
                <button data-action="menu" data-message="${esc(m.id)}">...</button>
              </div>
            </footer>
          </div>
        </article>
      `;
    }).join('');

    const notificationUnread = state.data.notifications.filter((n) => n.unread).length;

    root.innerHTML = `
      <div class="sc-wrap" id="scWrap">
        <aside class="sc-server-rail">
          <div class="sc-rail-top">SC</div>
          <div class="sc-server-list">${railHtml}</div>
          <button class="sc-server-add" id="scDiscoverBtn">+</button>
        </aside>

        <aside class="sc-channel-col">
          <header class="sc-channel-head">
            <div>
              <h2>${esc(community.title)}</h2>
              <p>${esc(community.type === 'private' ? 'Private / NIP-29' : 'Public / NIP-72')}</p>
            </div>
            <button id="scServerSettingsBtn">?</button>
          </header>

          <div class="sc-channel-search">
            <input id="scSearchInput" value="${esc(state.searchTerm)}" placeholder="Search messages or channels" />
          </div>

          <div class="sc-channel-list">${channelHtml}</div>

          <footer class="sc-channel-footer">
            <button id="scInviteBtn">Invite</button>
            <button id="scJoinLeaveBtn">${joinedCommunityIds.has(community.id) ? 'Leave' : 'Join'}</button>
          </footer>
        </aside>

        <main class="sc-main">
          <header class="sc-main-head">
            <div>
              <h3># ${esc(channel.name)}</h3>
              <p>${esc(channel.topic || '')}</p>
            </div>
            <div class="sc-main-actions">
              <button id="scPinnedBtn">Pinned (${pins.length})</button>
              <button id="scChannelSettingsBtn">Channel Settings</button>
              <button id="scNotifBtn">Notifications${notificationUnread ? ` (${notificationUnread})` : ''}</button>
            </div>
          </header>

          <section class="sc-feed" id="scFeed">${msgHtml || '<div class="sc-empty">No messages yet.</div>'}</section>

          <section class="sc-composer">
            <div class="sc-draft-tools">
              <button id="scEmojiBtn">Emoji</button>
              <label class="sc-attach-label">Attach<input type="file" id="scAttachInput" multiple hidden></label>
              <button id="scDmHintBtn">DM</button>
            </div>
            ${(ui.composerAttachments || []).length ? `<div class="sc-attachment-preview">${ui.composerAttachments.map((f) => `<span>${esc(f.name)}</span>`).join('')}</div>` : ''}
            <textarea id="scComposer" placeholder="Message #${esc(channel.name)}">${esc(draft)}</textarea>
            <div class="sc-compose-foot">
              <small>${store.can('post_messages') ? 'Ready to publish via Nostr' : 'You do not have permission to post in this channel'}</small>
              <button id="scSendBtn" ${store.can('post_messages') ? '' : 'disabled'}>Send</button>
            </div>
            ${ui.emojiOpen ? `<div class="sc-emoji-pop" id="scEmojiPop">${[':)', ':D', '<3', ':fire:', ':zap:', ':rocket:', ':sifaka:'].map((e) => `<button data-emoji="${esc(e)}">${esc(e)}</button>`).join('')}</div>` : ''}
          </section>
        </main>

        <aside class="sc-member-col${ui.memberPanelOpen ? '' : ' collapsed'}">
          <header>
            <h4>Members (${members.length})</h4>
            <button id="scToggleMembersBtn">${ui.memberPanelOpen ? 'Hide' : 'Show'}</button>
          </header>
          <div class="sc-member-list">${memberHtml}</div>
        </aside>

        ${ui.selectedMember ? renderProfilePopout(ui.selectedMember, profiles, members, community, store) : ''}
        ${ui.openModal ? renderModal(ui.openModal, state, community, channel, members, profiles, store) : ''}
        ${ui.contextMessageId ? renderContextMenu(ui.contextMessageId, ui.contextX, ui.contextY) : ''}
      </div>
    `;

    bindHandlers();
  }

  function renderProfilePopout(pubkey, profiles, members, community, storeRef) {
    const p = profiles[pubkey] || storeRef.profile(pubkey);
    const m = (members || []).find((x) => x.pubkey === pubkey) || { roles: ['guest'] };

    return `
      <div class="sc-popout" id="scProfilePopout">
        <button class="sc-popout-close" data-close="member">x</button>
        <div class="sc-pop-head">
          <span class="sc-avatar big">${esc(initials(p.displayName || p.name))}</span>
          <div>
            <h5>${esc(p.displayName || p.name)}</h5>
            <small>${esc(roleLabel(p, m))}</small>
          </div>
        </div>
        <p>${esc(p.bio || '')}</p>
        <div class="sc-pop-meta">
          <span>${p.verifiedNip05 ? '[verified]' : '[unverified]'} ${esc(p.nip05 || 'No NIP-05')}</span>
          <span>${esc(community.id)}</span>
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

  function renderModal(key, state, community, channel, members, profiles, storeRef) {
    if (key === 'serverSettings') {
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Server Settings</h4>
            <p>Edit metadata and moderation controls for ${esc(community.title)}.</p>
            <div class="sc-form-grid">
              <label>Name<input value="${esc(community.title)}"></label>
              <label>Description<textarea>${esc(community.description || '')}</textarea></label>
              <label>Join Mode<select><option>${esc(community.joinMode)}</option></select></label>
              <label>Default Channel<select><option>${esc(community.defaultChannelId || '')}</option></select></label>
            </div>
            <h5>Permission Matrix</h5>
            ${permissionsSummary()}
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    if (key === 'channelSettings') {
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Channel Settings</h4>
            <p>#${esc(channel.name)}</p>
            <div class="sc-form-grid">
              <label>Topic<textarea>${esc(channel.topic || '')}</textarea></label>
              <label>Privacy<select><option>${esc(channel.privacyLevel || 'public')}</option></select></label>
              <label>Slow mode (s)<input value="${esc(channel.slowModeSec || 0)}"></label>
            </div>
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    if (key === 'invites') {
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
      const list = state.data.communities
        .filter((c) => c.discoverable)
        .map((c) => `<button class="sc-discovery-item" data-community="${esc(c.id)}"><strong>${esc(c.title)}</strong><small>${esc(c.description)}</small></button>`)
        .join('');
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Community Discovery (NIP-72)</h4>
            <div class="sc-discovery-list">${list || '<div class="sc-empty">No discovery data.</div>'}</div>
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    if (key === 'notifications') {
      const rows = state.data.notifications
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

    if (key === 'roleEditor') {
      const member = members.find((m) => m.pubkey === ui.roleEditorMember);
      const p = profiles[ui.roleEditorMember] || storeRef.profile(ui.roleEditorMember);
      const roleOptions = ['owner', 'admin', 'moderator', 'member', 'guest'];
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Role Editor</h4>
            <p>${esc((p && (p.displayName || p.name)) || 'Member')}</p>
            <div class="sc-role-picker">
              ${roleOptions.map((r) => `<button class="sc-role-btn${member && member.roles.includes(r) ? ' active' : ''}" data-role="${esc(r)}">${esc(r)}</button>`).join('')}
            </div>
            <div class="sc-modal-foot">
              <button id="scSaveRolesBtn" ${!member ? 'disabled' : ''}>Save</button>
              <button data-close="modal">Close</button>
            </div>
          </div>
        </div>
      `;
    }

    if (key === 'pinned') {
      const rows = storeRef.getPinnedMessages().map((m) => `<div class="sc-pin-row"><strong>${esc(m.id)}</strong><span>${esc(m.content)}</span></div>`).join('');
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
        <button data-context-action="thread" data-message="${esc(messageId)}">Open Thread</button>
        <button data-context-action="pin" data-message="${esc(messageId)}">Toggle Pin</button>
        <button data-context-action="report" data-message="${esc(messageId)}">Report (NIP-56)</button>
        <button data-context-action="delete" data-message="${esc(messageId)}">Delete</button>
      </div>
    `;
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
      el.addEventListener('click', (e) => {
        e.stopPropagation();
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
      el.addEventListener('click', (e) => {
        if (e.target !== el && !el.classList.contains('sc-modal-foot')) return;
        ui.openModal = '';
        render();
      });
    });

    const search = root.querySelector('#scSearchInput');
    if (search) search.addEventListener('input', () => store.setSearch(search.value));

    const composer = root.querySelector('#scComposer');
    if (composer) {
      composer.addEventListener('input', () => store.setDraft(store.getState().activeChannelId, composer.value));
      composer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          const res = store.sendMessage({ content: composer.value, attachments: ui.composerAttachments });
          if (res.ok) {
            store.setDraft(store.getState().activeChannelId, '');
            ui.composerAttachments = [];
            if (nostrBridge) {
              const state = store.getState();
              const channel = store.getChannel();
              nostrBridge.publishChannelMessage({
                pubkey: state.currentUserPubkey,
                channel,
                communityId: state.activeCommunityId,
                channelId: state.activeChannelId,
                content: res.message.content,
                replyTo: res.message.replyTo,
                threadRoot: res.message.threadRoot
              }).catch(() => {});
            }
          }
        }
      });
    }

    const send = root.querySelector('#scSendBtn');
    if (send) {
      send.addEventListener('click', () => {
        const text = (composer && composer.value) || '';
        const res = store.sendMessage({ content: text, attachments: ui.composerAttachments });
        if (res.ok) {
          store.setDraft(store.getState().activeChannelId, '');
          ui.composerAttachments = [];
          if (nostrBridge) {
            const state = store.getState();
            const channel = store.getChannel();
            nostrBridge.publishChannelMessage({
              pubkey: state.currentUserPubkey,
              channel,
              communityId: state.activeCommunityId,
              channelId: state.activeChannelId,
              content: res.message.content,
              replyTo: res.message.replyTo,
              threadRoot: res.message.threadRoot
            }).catch(() => {});
          }
        }
      });
    }

    const attachInput = root.querySelector('#scAttachInput');
    if (attachInput) {
      attachInput.addEventListener('change', () => {
        ui.composerAttachments = Array.from(attachInput.files || []).map((f) => ({ name: f.name, kind: 'file', url: '#' }));
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
        const current = store.getState();
        const draft = current.draftsByChannel.get(current.activeChannelId) || '';
        store.setDraft(current.activeChannelId, `${draft}${value} `);
      });
    });

    root.querySelectorAll('.sc-react-chip').forEach((el) => {
      el.addEventListener('click', () => {
        const messageId = el.getAttribute('data-message');
        const key = el.getAttribute('data-react-key');
        const state = store.getState();
        store.toggleReaction(state.activeChannelId, messageId, key);
        if (nostrBridge) {
          nostrBridge.publishReaction({
            communityId: state.activeCommunityId,
            channelId: state.activeChannelId,
            messageId,
            reaction: key,
            pubkey: state.currentUserPubkey
          }).catch(() => {});
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
        const draft = store.getState().draftsByChannel.get(store.getState().activeChannelId) || '';
        store.setDraft(store.getState().activeChannelId, `? ${id} ${draft}`);
      });
    });

    root.querySelectorAll('[data-action="menu"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        ui.contextMessageId = el.getAttribute('data-message') || '';
        ui.contextX = e.clientX;
        ui.contextY = e.clientY;
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
          store.setDraft(channelId, `? ${messageId} ${draft}`);
        }
        if (action === 'report') alert('Report flow queued (NIP-56).');
        if (action === 'delete') alert('Delete moderation action queued.');
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
        const st = store.getState();
        store.setMemberRole(st.activeCommunityId, ui.roleEditorMember, [role]);
        ui.openModal = '';
        ui.roleEditorMember = '';
        render();
      });
    }

    const serverSettingsBtn = root.querySelector('#scServerSettingsBtn');
    if (serverSettingsBtn) serverSettingsBtn.addEventListener('click', () => { ui.openModal = 'serverSettings'; render(); });

    const channelSettingsBtn = root.querySelector('#scChannelSettingsBtn');
    if (channelSettingsBtn) channelSettingsBtn.addEventListener('click', () => { ui.openModal = 'channelSettings'; render(); });

    const pinnedBtn = root.querySelector('#scPinnedBtn');
    if (pinnedBtn) pinnedBtn.addEventListener('click', () => { ui.openModal = 'pinned'; render(); });

    const notifBtn = root.querySelector('#scNotifBtn');
    if (notifBtn) notifBtn.addEventListener('click', () => { ui.openModal = 'notifications'; render(); });

    const discoverBtn = root.querySelector('#scDiscoverBtn');
    if (discoverBtn) discoverBtn.addEventListener('click', () => { ui.openModal = 'discovery'; render(); });

    const inviteBtn = root.querySelector('#scInviteBtn');
    if (inviteBtn) inviteBtn.addEventListener('click', () => { ui.openModal = 'invites'; render(); });

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
      joinLeaveBtn.addEventListener('click', () => {
        const st = store.getState();
        const joined = new Set(st.joinedCommunityIds);
        if (joined.has(st.activeCommunityId)) store.leaveCommunity(st.activeCommunityId);
        else store.joinCommunity(st.activeCommunityId);
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

  function onOutsideClick(e) {
    const inMenu = e.target && e.target.closest && e.target.closest('[data-context-menu]');
    const inPop = e.target && e.target.closest && e.target.closest('#scProfilePopout');
    if (!inMenu) ui.contextMessageId = '';
    if (!inPop) ui.selectedMember = '';
    if (!inMenu || !inPop) render();
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
    rerender: render
  };
}
