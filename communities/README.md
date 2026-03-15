# Sifaka Community

Sifaka Community is the Discord-style Communities feature integrated into Sifaka Live.

## Goals
- Keep Sifaka Live navigation and design language.
- Add a modern community UI with server rail, channels, message feed, members, moderation controls, and settings.
- Use Nostr-native flows where possible with documented hybrid behavior for gaps.

## Folder structure
- `communities/boot.js` - entry point mounted by the main app.
- `communities/communities.css` - styles.
- `communities/store.js` - state and app actions.
- `communities/permissions.js` - Discord-like role/permission resolution.
- `communities/nostr.js` - Nostr protocol bridge.
- `communities/mock-data.js` - dev-mode local data.

## Run mode
This project currently runs as static HTML/JS. Communities supports:
- **Dev mode**: local mock data (works without relays).
- **Relay mode**: attempts Nostr relay publish via WebSocket and NIP-07 signer.

## Integration points
- Existing nav Communities button now calls `showCommunities()`.
- Main router (`showPage`) now supports `communities` view.
- Communities app mounts inside `#communitiesRoot`.

## Notes
- Private group and encrypted DM paths are structured for NIP-29/NIP-17/NIP-44, with hybrid fallback where relays do not support full flows yet.
- See docs in `docs/communities` for detailed protocol mapping.
