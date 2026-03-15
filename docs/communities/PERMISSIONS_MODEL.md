# Permissions Model

## Role hierarchy
- owner
- admin
- moderator
- member
- guest

## Resolution order
1. Server defaults
2. Role grants/denies (stacked)
3. Channel role overrides
4. Channel user overrides
5. Explicit deny overrides allow
6. Owner bypass

## Supported permission keys
- view_channels
- post_messages
- reply_threads
- react
- attach_files
- edit_own_messages
- delete_own_messages
- delete_any_messages
- pin_messages
- invite_members
- approve_join_requests
- mute_timeout_ban
- manage_roles
- manage_channels
- manage_server
- manage_emoji
- create_live_rooms
- zap

## Implementation
- Core evaluator: `communities/permissions.js`
- Matrix helper for settings UI and audits: `buildPermissionMatrix()`

## Discord parity notes
- Channel-level explicit deny wins.
- Role stacking is additive with deny precedence.
- Owner role bypasses deny checks.
