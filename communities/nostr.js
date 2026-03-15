// Nostr protocol bridge for Communities.
// This layer keeps network/signing isolated from UI/state logic.

const NIP_FLAGS = {
  nip01: true,
  nip05: true,
  nip07: true,
  nip10: true,
  nip17: true,
  nip19: true,
  nip25: true,
  nip27: true,
  nip28: true,
  nip29: true,
  nip30: true,
  nip36: true,
  nip42: true,
  nip43: true,
  nip44: true,
  nip46: true,
  nip50: true,
  nip51: true,
  nip53: true,
  nip56: true,
  nip57: true,
  nip65: true,
  nip66: true,
  nip72: true,
  nip78: true
};

function nowSec() {
  return Math.floor(Date.now() / 1000);
}

function normalizeRelay(url) {
  const val = String(url || '').trim();
  return /^wss:\/\//i.test(val) ? val : '';
}

function computeEventIdFallback(ev) {
  const raw = JSON.stringify([0, ev.pubkey || '', ev.created_at || 0, ev.kind || 1, ev.tags || [], ev.content || '']);
  let h = 0;
  for (let i = 0; i < raw.length; i += 1) h = ((h << 5) - h) + raw.charCodeAt(i);
  return `local_${Math.abs(h).toString(16)}`;
}

function mapChannelToKind(channel) {
  const type = String(channel && channel.channelType || '').toLowerCase();
  if (type === 'public' || type === 'announcement' || type === 'forum') return 42; // NIP-28 channel message
  if (type === 'private' || type === 'invite_only') return 14; // placeholder for encrypted wrapper flow
  return 1;
}

function buildMessageTags(input) {
  const {
    communityId,
    channelId,
    channelName,
    replyTo = '',
    threadRoot = '',
    contentWarning = ''
  } = input || {};

  const tags = [];
  if (communityId) tags.push(['h', communityId]);
  if (channelId) tags.push(['t', `channel:${channelId}`]);
  if (channelName) tags.push(['alt', `Message in #${channelName}`]);
  if (replyTo) tags.push(['e', replyTo, '', 'reply']);
  if (threadRoot) tags.push(['e', threadRoot, '', 'root']);
  if (contentWarning) tags.push(['content-warning', contentWarning]); // NIP-36 style marker
  return tags;
}

export function createNostrBridge(options = {}) {
  const relays = (options.relays || []).map(normalizeRelay).filter(Boolean);
  const sockets = new Map();
  const publishQueue = [];

  const listeners = {
    event: new Set(),
    status: new Set()
  };

  function emit(type, payload) {
    const set = listeners[type];
    if (!set) return;
    set.forEach((fn) => {
      try { fn(payload); } catch (_) {}
    });
  }

  function on(type, fn) {
    const set = listeners[type];
    if (!set) return () => {};
    set.add(fn);
    return () => set.delete(fn);
  }

  function connectRelay(url) {
    if (!url || sockets.has(url)) return;
    let ws = null;
    try {
      ws = new WebSocket(url);
    } catch (_) {
      emit('status', { relay: url, state: 'error' });
      return;
    }

    ws.addEventListener('open', () => {
      emit('status', { relay: url, state: 'open' });
      while (publishQueue.length) {
        const ev = publishQueue.shift();
        try { ws.send(JSON.stringify(['EVENT', ev])); } catch (_) {}
      }
    });

    ws.addEventListener('close', () => emit('status', { relay: url, state: 'closed' }));
    ws.addEventListener('error', () => emit('status', { relay: url, state: 'error' }));
    ws.addEventListener('message', (msg) => {
      let data = null;
      try { data = JSON.parse(msg.data); } catch (_) { return; }
      if (!Array.isArray(data)) return;
      if (data[0] === 'EVENT') emit('event', data[2]);
    });

    sockets.set(url, ws);
  }

  function connectAll() {
    relays.forEach(connectRelay);
  }

  async function getPubkeyFromSigner() {
    if (!window.nostr || typeof window.nostr.getPublicKey !== 'function') return '';
    try {
      return await window.nostr.getPublicKey();
    } catch (_) {
      return '';
    }
  }

  async function signEvent(unsigned) {
    if (window.nostr && typeof window.nostr.signEvent === 'function') {
      return window.nostr.signEvent(unsigned);
    }

    const local = {
      ...unsigned,
      id: computeEventIdFallback(unsigned),
      sig: 'unsigned'
    };
    return local;
  }

  async function publish(event) {
    let sent = 0;
    sockets.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(JSON.stringify(['EVENT', event]));
          sent += 1;
        } catch (_) {}
      }
    });

    if (!sent) publishQueue.push(event);
    return sent;
  }

  async function publishChannelMessage(input) {
    const kind = mapChannelToKind(input.channel);
    const pubkey = input.pubkey || await getPubkeyFromSigner();
    const unsigned = {
      kind,
      created_at: nowSec(),
      pubkey,
      tags: buildMessageTags({
        communityId: input.communityId,
        channelId: input.channelId,
        channelName: input.channel && input.channel.name,
        replyTo: input.replyTo,
        threadRoot: input.threadRoot,
        contentWarning: input.contentWarning
      }),
      content: String(input.content || '')
    };

    const signed = await signEvent(unsigned);
    await publish(signed);
    return signed;
  }

  async function publishReaction(input) {
    const pubkey = input.pubkey || await getPubkeyFromSigner();
    const unsigned = {
      kind: 7,
      created_at: nowSec(),
      pubkey,
      tags: [
        ['e', input.messageId],
        ['h', input.communityId || ''],
        ['t', `channel:${input.channelId || ''}`]
      ],
      content: input.reaction || '+'
    };
    const signed = await signEvent(unsigned);
    await publish(signed);
    return signed;
  }

  function nip19Encode(type, payload) {
    if (!window.NostrTools || !window.NostrTools.nip19) return '';
    try {
      if (type === 'npub' && window.NostrTools.nip19.npubEncode) return window.NostrTools.nip19.npubEncode(payload);
      if (type === 'naddr' && window.NostrTools.nip19.naddrEncode) return window.NostrTools.nip19.naddrEncode(payload);
      if (type === 'note' && window.NostrTools.nip19.noteEncode) return window.NostrTools.nip19.noteEncode(payload);
    } catch (_) {
      return '';
    }
    return '';
  }

  function nip19Decode(value) {
    if (!window.NostrTools || !window.NostrTools.nip19 || !window.NostrTools.nip19.decode) return null;
    try {
      return window.NostrTools.nip19.decode(String(value || '').trim());
    } catch (_) {
      return null;
    }
  }

  function capabilities() {
    return {
      ...NIP_FLAGS,
      signerNip07: !!(window.nostr && typeof window.nostr.signEvent === 'function'),
      signerNip46: false,
      relays: relays.slice(),
      connectedRelays: Array.from(sockets.entries())
        .filter(([, ws]) => ws.readyState === WebSocket.OPEN)
        .map(([url]) => url)
    };
  }

  return {
    connectAll,
    on,
    publish,
    publishChannelMessage,
    publishReaction,
    getPubkeyFromSigner,
    nip19Encode,
    nip19Decode,
    capabilities
  };
}
