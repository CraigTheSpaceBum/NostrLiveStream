# Communities Test Plan

## Unit tests
- Permission evaluator:
  - role stacking
  - deny precedence
  - owner bypass
  - channel overrides

## Integration tests
- Route and mount:
  - clicking Communities opens communities view
  - home/video/profile behavior remains intact
- Message send:
  - local optimistic append
  - reaction toggle
  - pin/unpin behavior
- Moderation actions:
  - mute/timeout/ban role checks
- Invite flow:
  - invite code generation and copy field update

## Protocol tests (manual + integration)
- NIP-07 signer available/unavailable
- Relay connected/disconnected publish behavior
- Tag shape for public channel message and reactions

## UX validation
- Desktop layout with all panes
- Mobile responsive behavior
- keyboard send (Enter) and multi-line (Shift+Enter)

## Regression checks
- Existing live stream, theater, profile navigation unaffected
- Existing settings/login flows unaffected
