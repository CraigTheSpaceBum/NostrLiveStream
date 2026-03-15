// Permission model used by Sifaka Community.
// Discord-like behavior:
// - Server defaults
// - Role stacking
// - Channel overrides
// - Explicit deny beats allow
// - Owner bypass

export const PERMISSIONS = [
  'view_channels',
  'post_messages',
  'reply_threads',
  'react',
  'attach_files',
  'edit_own_messages',
  'delete_own_messages',
  'delete_any_messages',
  'pin_messages',
  'invite_members',
  'approve_join_requests',
  'mute_timeout_ban',
  'manage_roles',
  'manage_channels',
  'manage_server',
  'manage_emoji',
  'create_live_rooms',
  'zap'
];

export const DEFAULT_ROLE_DEFS = {
  owner: {
    id: 'owner',
    name: 'Owner',
    color: '#f7b731',
    rank: 100,
    grants: [...PERMISSIONS]
  },
  admin: {
    id: 'admin',
    name: 'Admin',
    color: '#e8460a',
    rank: 80,
    grants: PERMISSIONS.filter((p) => p !== 'manage_server')
  },
  moderator: {
    id: 'moderator',
    name: 'Moderator',
    color: '#9b72ff',
    rank: 60,
    grants: [
      'view_channels',
      'post_messages',
      'reply_threads',
      'react',
      'attach_files',
      'edit_own_messages',
      'delete_own_messages',
      'delete_any_messages',
      'pin_messages',
      'invite_members',
      'mute_timeout_ban',
      'manage_channels'
    ]
  },
  member: {
    id: 'member',
    name: 'Member',
    color: '#00d48a',
    rank: 30,
    grants: [
      'view_channels',
      'post_messages',
      'reply_threads',
      'react',
      'attach_files',
      'edit_own_messages',
      'delete_own_messages',
      'invite_members',
      'zap'
    ]
  },
  guest: {
    id: 'guest',
    name: 'Guest',
    color: '#8fa3b5',
    rank: 10,
    grants: ['view_channels', 'react']
  }
};

function toSet(values) {
  return new Set(Array.isArray(values) ? values : []);
}

function resolveRole(roleDefs, roleId) {
  return roleDefs[roleId] || null;
}

export function roleStackSummary(roleDefs, roleIds) {
  return (roleIds || [])
    .map((id) => resolveRole(roleDefs, id))
    .filter(Boolean)
    .sort((a, b) => Number(b.rank || 0) - Number(a.rank || 0));
}

function collectServerGrants(roleDefs, roleIds, serverDefaultAllow = [], serverDefaultDeny = []) {
  const grants = new Set(serverDefaultAllow);
  const denies = new Set(serverDefaultDeny);
  roleStackSummary(roleDefs, roleIds).forEach((role) => {
    toSet(role.grants).forEach((perm) => grants.add(perm));
    toSet(role.denies).forEach((perm) => denies.add(perm));
  });
  return { grants, denies };
}

function mergeChannelOverrides(base, overridesForRoles = [], overridesForUser = null) {
  const grants = new Set(base.grants);
  const denies = new Set(base.denies);

  overridesForRoles.forEach((ovr) => {
    toSet(ovr && ovr.allow).forEach((p) => grants.add(p));
    toSet(ovr && ovr.deny).forEach((p) => denies.add(p));
  });

  if (overridesForUser) {
    toSet(overridesForUser.allow).forEach((p) => grants.add(p));
    toSet(overridesForUser.deny).forEach((p) => denies.add(p));
  }

  return { grants, denies };
}

export function computeEffectivePermissions(input) {
  const {
    roleDefs = DEFAULT_ROLE_DEFS,
    roleIds = ['guest'],
    serverDefaultAllow = [],
    serverDefaultDeny = [],
    channelRoleOverrides = [],
    channelUserOverride = null,
    isOwner = false
  } = input || {};

  if (isOwner) {
    return {
      allow: new Set(PERMISSIONS),
      deny: new Set()
    };
  }

  const base = collectServerGrants(roleDefs, roleIds, serverDefaultAllow, serverDefaultDeny);
  const merged = mergeChannelOverrides(base, channelRoleOverrides, channelUserOverride);
  const allow = merged.grants;
  const deny = merged.denies;

  // Explicit deny wins.
  deny.forEach((perm) => allow.delete(perm));

  return {
    allow,
    deny
  };
}

export function hasPermission(input, permission) {
  const effective = computeEffectivePermissions(input);
  return effective.allow.has(permission);
}

export function buildPermissionMatrix(roleDefs = DEFAULT_ROLE_DEFS) {
  const matrix = {};
  Object.values(roleDefs).forEach((role) => {
    matrix[role.id] = {};
    PERMISSIONS.forEach((perm) => {
      matrix[role.id][perm] = toSet(role.grants).has(perm);
    });
  });
  return matrix;
}
