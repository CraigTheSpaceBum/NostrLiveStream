import test from 'node:test';
import assert from 'node:assert/strict';
import { computeEffectivePermissions, hasPermission } from '../permissions.js';

test('owner bypass grants all', () => {
  const effective = computeEffectivePermissions({ isOwner: true, roleIds: ['guest'] });
  assert.equal(effective.allow.has('manage_server'), true);
  assert.equal(effective.allow.has('delete_any_messages'), true);
});

test('explicit deny beats allow', () => {
  const allowed = hasPermission({
    roleIds: ['member'],
    channelRoleOverrides: [
      { roleId: 'member', allow: ['post_messages'], deny: ['post_messages'] }
    ]
  }, 'post_messages');
  assert.equal(allowed, false);
});

test('role stacking allows moderator controls', () => {
  const canModerate = hasPermission({ roleIds: ['member', 'moderator'] }, 'mute_timeout_ban');
  assert.equal(canModerate, true);
});
