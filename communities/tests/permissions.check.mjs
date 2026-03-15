import assert from 'node:assert/strict';
import { computeEffectivePermissions, hasPermission } from '../permissions.js';

const effective = computeEffectivePermissions({ isOwner: true, roleIds: ['guest'] });
assert.equal(effective.allow.has('manage_server'), true);
assert.equal(effective.allow.has('delete_any_messages'), true);

const allowed = hasPermission({
  roleIds: ['member'],
  channelRoleOverrides: [
    { roleId: 'member', allow: ['post_messages'], deny: ['post_messages'] }
  ]
}, 'post_messages');
assert.equal(allowed, false);

const canModerate = hasPermission({ roleIds: ['member', 'moderator'] }, 'mute_timeout_ban');
assert.equal(canModerate, true);

console.log('permissions checks passed');
