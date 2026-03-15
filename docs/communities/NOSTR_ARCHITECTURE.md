# Sifaka Community Nostr Architecture

## Layering
- UI Layer: `communities/ui.js`
- State Layer: `communities/store.js`
- Permission Layer: `communities/permissions.js`
- Protocol Layer: `communities/nostr.js`
- Data Layer: relay events + local cache/mock data

## Nostr principles
- NIP-01 event model and relay transport are used for publish/subscribe.
- NIP-19 encode/decode helpers are provided via `window.NostrTools` when available.
- NIP-07 signer path is used when browser extension signer is present.
- NIP-05 identity display appears in profile popouts and message headers.

## Public vs Private spaces
- Public/discovery communities are modeled as NIP-72-like spaces (community-id tags and public channels).
- Private/closed groups are modeled as NIP-29-oriented groups with explicit permission policy and relay constraints.
- If relay support is partial, app falls back to hybrid tag conventions while preserving interoperability intent.

## Messaging
- Public channels use NIP-28 style kind 42 messages.
- Replies use NIP-10 style root/reply `e` tags.
- Reactions use kind 7 (NIP-25).
- Mentions and `nostr:` references are treated as URI-first text references (NIP-21/NIP-27 intent).

## Private messaging and encryption
- Product direction assumes NIP-17 + NIP-44 + NIP-59 gift-wrap style for private flows.
- Current implementation keeps this behind capability and fallback boundaries; deprecated NIP-04 is not used for new writes.

## Settings and lists
- User-level app behavior maps toward NIP-78 for app settings data.
- Saved community/channel/mute/favorites concepts map toward NIP-51 lists.

## Moderation and safety
- Report actions map toward NIP-56 flow.
- Sensitive content labels map toward NIP-36-style content-warning tags.

## Experimental features
- Feature flags exist for:
  - NIP-17 DM write path
  - NIP-29 private-group strict mode
  - NIP-53 live-room metadata
  - NIP-46 remote signer
  - NIP-50 search relay usage
