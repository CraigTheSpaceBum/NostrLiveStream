import { createCommunityStore } from './store.js';
import { createNostrBridge } from './nostr.js';
import { createCommunitiesUI } from './ui.js';

let app = null;

function getContext() {
  const ctx = window.__SIFAKA_CONTEXT || {};
  const relays = typeof ctx.getRelays === 'function' ? (ctx.getRelays() || []) : [
    'wss://relay.damus.io',
    'wss://nos.lol',
    'wss://relay.snort.social'
  ];

  const user = typeof ctx.getUser === 'function' ? ctx.getUser() : null;

  return {
    relays,
    userPubkey: user && user.pubkey ? user.pubkey : 'pub_craig',
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
  const ui = createCommunitiesUI({ root, store, nostrBridge, appContext: context.ctx });

  nostrBridge.connectAll();

  app = {
    mount() {
      try {
        ui.mount();
      } catch (err) {
        console.error('Sifaka Communities mount error', err);
        root.innerHTML = '<div class="live-grid-loading" style="padding:1rem;">Unable to load Communities right now.</div>';
      }
    },
    unmount() {
      ui.unmount();
    },
    refreshContext() {
      // For now this is a no-op because store is local.
      // Kept so auth/session transitions can rebind in future.
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
