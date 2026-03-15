import { createCommunityStore } from './store.js';
import { createNostrBridge } from './nostr.js';
import { createCommunitiesUI } from './ui.js';

let app = null;

function getContext() {
  const ctx = window.__SIFAKA_CONTEXT || {};
  const relays = typeof ctx.getRelays === 'function'
    ? (ctx.getRelays() || [])
    : ['wss://relay.damus.io', 'wss://nos.lol', 'wss://relay.snort.social'];

  const user = typeof ctx.getUser === 'function' ? ctx.getUser() : null;
  const userPubkey = user && user.pubkey ? String(user.pubkey) : '';

  return {
    relays,
    user,
    userPubkey,
    isAuthenticated: !!userPubkey,
    ctx
  };
}

function ensureApp() {
  if (app) return app;

  const root = document.getElementById('communitiesRoot');
  if (!root) return null;

  const context = getContext();
  const store = createCommunityStore({
    currentUserPubkey: context.userPubkey
  });
  const nostrBridge = createNostrBridge({ relays: context.relays });
  const ui = createCommunitiesUI({
    root,
    store,
    nostrBridge,
    appContext: context.ctx,
    session: {
      user: context.user,
      isAuthenticated: context.isAuthenticated
    }
  });

  let graphSub = null;
  let offStatus = null;

  function stopBridgeSubscriptions() {
    if (graphSub && typeof graphSub.close === 'function') {
      try { graphSub.close(); } catch (_) {}
    }
    graphSub = null;

    if (offStatus) {
      try { offStatus(); } catch (_) {}
    }
    offStatus = null;
  }

  function startBridgeSubscriptions() {
    if (graphSub) return;

    offStatus = nostrBridge.on('status', (payload) => {
      store.setRelayStatus(payload.relay, payload.state);
    });

    graphSub = nostrBridge.subscribeCommunityGraph({
      onProfile(profile) {
        store.ingestProfile(profile);
      },
      onCommunity(community) {
        store.ingestCommunity(community);
      },
      onCommunityMembers39002(data39002) {
        store.ingestCommunityMembers(data39002);
      },
      onCommunityModerators39003(data39003) {
        store.ingestCommunityModerators(data39003);
      },
      onChannel(channel) {
        store.ingestChannel(channel);
      },
      onMessage(message) {
        store.ingestMessage(message);
      },
      onReaction(reaction) {
        store.ingestReaction(reaction);
      },
      onDeletion(deletion) {
        store.ingestDeletion(deletion);
      },
      onMembershipList(membership) {
        store.ingestMembershipList(membership);
      }
    }, {
      id: 'sifaka_communities_graph',
      limit: 700
    });

    nostrBridge.connectAll();
  }

  app = {
    mount() {
      const next = getContext();
      store.setCurrentUser(next.userPubkey || '');
      ui.setSession({ user: next.user, isAuthenticated: next.isAuthenticated });

      if (next.isAuthenticated) {
        startBridgeSubscriptions();
      } else {
        stopBridgeSubscriptions();
      }

      try {
        ui.mount();
      } catch (err) {
        console.error('Sifaka Communities mount error', err);
        root.innerHTML = '<div class="live-grid-loading" style="padding:1rem;">Unable to load Communities right now.</div>';
      }
    },
    unmount() {
      ui.unmount();
      stopBridgeSubscriptions();
    },
    refreshContext() {
      const next = getContext();
      store.setCurrentUser(next.userPubkey || '');
      ui.setSession({ user: next.user, isAuthenticated: next.isAuthenticated });
      if (next.isAuthenticated) {
        startBridgeSubscriptions();
      } else {
        stopBridgeSubscriptions();
      }
      ui.rerender();
    },
    capabilities() {
      return nostrBridge.capabilities();
    }
  };

  return app;
}

window.SifakaCommunities = {
  mount() {
    const instance = ensureApp();
    if (instance) instance.mount();
  },
  unmount() {
    if (app) app.unmount();
  },
  refreshContext() {
    if (app) app.refreshContext();
  },
  capabilities() {
    return app ? app.capabilities() : null;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  ensureApp();
});
