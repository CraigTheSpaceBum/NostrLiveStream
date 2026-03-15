# Event Kind and Tag Mapping

## Channel messages
- Kind: `42` (public channel messaging style)
- Tags:
  - `h`: community identifier (`n72:*` or `n29:*`)
  - `t`: channel scope (`channel:<id>`)
  - `e`: reply/root references (NIP-10 conventions)
  - `alt`: fallback human-readable context

## Reactions
- Kind: `7`
- Tags:
  - `e`: target message id
  - `h`: community id
  - `t`: channel scope
- Content: reaction key (`+`, emoji shortcode, or custom emoji key)

## Moderation/reporting (planned mapping)
- Kind: NIP-56 report-compatible events
- Tags:
  - `p`: reported pubkey
  - `e`: reported event
  - reason/category tags

## Content warning / sensitive labels
- Tag: `content-warning` on message event (NIP-36 intent)

## Community and group metadata (hybrid)
- Public communities: NIP-72-oriented metadata and discovery indexing
- Private groups: NIP-29-oriented metadata and membership policy
- Channel abstraction:
  - category and permission state carried in app metadata and channel tags
  - interoperability preserved by tagging `h` + `t` even if clients ignore channel UI

## Attachments
- Attachment metadata can be carried in tags and/or referenced via URL metadata.
- NIP-94-style metadata support is intended for file descriptors.
