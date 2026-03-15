import { DEFAULT_ROLE_DEFS } from './permissions.js';

const now = Date.now();
const min = 60 * 1000;

export const MOCK_PROFILES = {
  'pub_alice': {
    pubkey: 'pub_alice',
    name: 'alice',
    displayName: 'Alice Nostr',
    nip05: 'alice@sifaka.live',
    verifiedNip05: true,
    avatar: '',
    bio: 'Building Nostr-native communities.'
  },
  'pub_craig': {
    pubkey: 'pub_craig',
    name: 'craig',
    displayName: 'Craig',
    nip05: 'craig@bitcoin-cats.ca',
    verifiedNip05: true,
    avatar: '',
    bio: 'Streamer + community builder'
  },
  'pub_mod': {
    pubkey: 'pub_mod',
    name: 'relayrunner',
    displayName: 'Relay Runner',
    nip05: 'relayrunner@nostr.run',
    verifiedNip05: true,
    avatar: '',
    bio: 'Moderator and relay operator'
  },
  'pub_guest': {
    pubkey: 'pub_guest',
    name: 'newcomer',
    displayName: 'Newcomer',
    nip05: '',
    verifiedNip05: false,
    avatar: '',
    bio: 'Learning Nostr'
  }
};

export const MOCK_COMMUNITIES = [
  {
    id: 'n72:sifaka-builders',
    type: 'public',
    title: 'Sifaka Builders',
    icon: 'SB',
    description: 'Public NIP-72 builder community',
    banner: '',
    rules: ['Be respectful', 'No spam'],
    topics: ['nostr', 'livestream', 'dev'],
    ownerPubkey: 'pub_alice',
    joinMode: 'open',
    discoverable: true,
    defaultChannelId: 'ch:builders:general',
    allowedRelays: ['wss://relay.damus.io', 'wss://nos.lol'],
    roleDefs: DEFAULT_ROLE_DEFS,
    serverDefaultAllow: ['view_channels'],
    serverDefaultDeny: []
  },
  {
    id: 'n29:ops-room',
    type: 'private',
    title: 'Ops Room',
    icon: 'OR',
    description: 'Private NIP-29 style moderation and incident room',
    banner: '',
    rules: ['Confidential', 'Security-first'],
    topics: ['security', 'mod'],
    ownerPubkey: 'pub_craig',
    joinMode: 'approval',
    discoverable: false,
    defaultChannelId: 'ch:ops:incident',
    allowedRelays: ['wss://relay.snort.social'],
    roleDefs: DEFAULT_ROLE_DEFS,
    serverDefaultAllow: [],
    serverDefaultDeny: ['view_channels']
  }
];

export const MOCK_CHANNELS = {
  'n72:sifaka-builders': [
    {
      id: 'ch:builders:general',
      communityId: 'n72:sifaka-builders',
      category: 'Start Here',
      name: 'general',
      topic: 'Introductions and broad discussion',
      channelType: 'public',
      privacyLevel: 'public',
      slowModeSec: 0,
      archived: false,
      pinned: true,
      roleOverrides: []
    },
    {
      id: 'ch:builders:announcements',
      communityId: 'n72:sifaka-builders',
      category: 'Start Here',
      name: 'announcements',
      topic: 'Important updates',
      channelType: 'announcement',
      privacyLevel: 'public',
      slowModeSec: 30,
      archived: false,
      pinned: true,
      roleOverrides: [
        { roleId: 'member', allow: ['view_channels', 'react'], deny: ['post_messages'] }
      ]
    },
    {
      id: 'ch:builders:forum',
      communityId: 'n72:sifaka-builders',
      category: 'Development',
      name: 'feature-requests',
      topic: 'Forum-like channel for RFC threads',
      channelType: 'forum',
      privacyLevel: 'public',
      slowModeSec: 5,
      archived: false,
      pinned: false,
      roleOverrides: []
    }
  ],
  'n29:ops-room': [
    {
      id: 'ch:ops:incident',
      communityId: 'n29:ops-room',
      category: 'Security',
      name: 'incident-room',
      topic: 'Active incidents and response',
      channelType: 'private',
      privacyLevel: 'invite_only',
      slowModeSec: 3,
      archived: false,
      pinned: true,
      roleOverrides: [
        { roleId: 'guest', allow: [], deny: ['view_channels'] },
        { roleId: 'member', allow: [], deny: ['view_channels'] },
        { roleId: 'moderator', allow: ['view_channels', 'post_messages', 'react'], deny: [] },
        { roleId: 'admin', allow: ['view_channels', 'post_messages', 'react'], deny: [] }
      ]
    }
  ]
};

export const MOCK_MEMBERS = {
  'n72:sifaka-builders': [
    { pubkey: 'pub_alice', roles: ['owner'], joinedAt: now - 100 * min, muted: false, banned: false, timeoutUntil: 0 },
    { pubkey: 'pub_craig', roles: ['admin'], joinedAt: now - 80 * min, muted: false, banned: false, timeoutUntil: 0 },
    { pubkey: 'pub_mod', roles: ['moderator'], joinedAt: now - 60 * min, muted: false, banned: false, timeoutUntil: 0 },
    { pubkey: 'pub_guest', roles: ['member'], joinedAt: now - 20 * min, muted: false, banned: false, timeoutUntil: 0 }
  ],
  'n29:ops-room': [
    { pubkey: 'pub_craig', roles: ['owner'], joinedAt: now - 90 * min, muted: false, banned: false, timeoutUntil: 0 },
    { pubkey: 'pub_mod', roles: ['moderator'], joinedAt: now - 50 * min, muted: false, banned: false, timeoutUntil: 0 }
  ]
};

export const MOCK_MESSAGES = {
  'ch:builders:general': [
    {
      id: 'm:1',
      channelId: 'ch:builders:general',
      authorPubkey: 'pub_alice',
      content: 'Welcome to Sifaka Community. This channel maps to public Nostr spaces.',
      createdAt: now - 40 * min,
      replyTo: '',
      threadRoot: '',
      pinned: true,
      reactions: { '+': ['pub_craig', 'pub_mod'], ':rocket:': ['pub_guest'] },
      attachments: []
    },
    {
      id: 'm:2',
      channelId: 'ch:builders:general',
      authorPubkey: 'pub_craig',
      content: 'Use #feature-requests for RFC-style threads. Also test nostr:nevent links.',
      createdAt: now - 28 * min,
      replyTo: 'm:1',
      threadRoot: 'm:1',
      pinned: false,
      reactions: { '+': ['pub_alice'] },
      attachments: [{ id: 'a:1', name: 'relay-notes.md', kind: 'file', url: '#' }]
    },
    {
      id: 'm:3',
      channelId: 'ch:builders:general',
      authorPubkey: 'pub_guest',
      content: 'Can someone explain role overrides? I only see read in announcements.',
      createdAt: now - 8 * min,
      replyTo: '',
      threadRoot: '',
      pinned: false,
      reactions: {},
      attachments: []
    }
  ],
  'ch:builders:announcements': [
    {
      id: 'm:4',
      channelId: 'ch:builders:announcements',
      authorPubkey: 'pub_alice',
      content: 'Release 0.1: Communities alpha integrated into Sifaka Live.',
      createdAt: now - 14 * min,
      replyTo: '',
      threadRoot: '',
      pinned: true,
      reactions: { '+': ['pub_craig', 'pub_mod', 'pub_guest'] },
      attachments: []
    }
  ],
  'ch:builders:forum': [
    {
      id: 'm:5',
      channelId: 'ch:builders:forum',
      authorPubkey: 'pub_mod',
      content: 'RFC: channel-scoped tags for NIP-72 posts. Thread here.',
      createdAt: now - 21 * min,
      replyTo: '',
      threadRoot: '',
      pinned: false,
      reactions: { ':fire:': ['pub_alice'] },
      attachments: []
    }
  ],
  'ch:ops:incident': [
    {
      id: 'm:6',
      channelId: 'ch:ops:incident',
      authorPubkey: 'pub_mod',
      content: 'Blocked spam wave from relay X. Added temporary slow mode.',
      createdAt: now - 17 * min,
      replyTo: '',
      threadRoot: '',
      pinned: true,
      reactions: { '+': ['pub_craig'] },
      attachments: []
    }
  ]
};

export const MOCK_NOTIFICATIONS = [
  { id: 'n:1', kind: 'mention', title: 'You were mentioned in #general', createdAt: now - 3 * min, unread: true },
  { id: 'n:2', kind: 'reaction', title: 'Alice reacted to your message', createdAt: now - 11 * min, unread: true },
  { id: 'n:3', kind: 'invite', title: 'Invite accepted: Ops Room', createdAt: now - 42 * min, unread: false }
];

export function cloneMockState() {
  return {
    profiles: JSON.parse(JSON.stringify(MOCK_PROFILES)),
    communities: JSON.parse(JSON.stringify(MOCK_COMMUNITIES)),
    channelsByCommunity: JSON.parse(JSON.stringify(MOCK_CHANNELS)),
    membersByCommunity: JSON.parse(JSON.stringify(MOCK_MEMBERS)),
    messagesByChannel: JSON.parse(JSON.stringify(MOCK_MESSAGES)),
    notifications: JSON.parse(JSON.stringify(MOCK_NOTIFICATIONS))
  };
}
