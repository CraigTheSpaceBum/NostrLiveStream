# Sifaka Live
www.Sifaka.Live

Sifaka Live is an experimental decentralized livestreaming platform built on Nostr.

It lets creators stream while using Nostr for identity, chat, discovery, and social interaction.

## Communities (Discord-style) integration

Sifaka Community is integrated into the existing app shell:

- Uses existing Sifaka Live navigation and routing.
- Opens from the existing Communities nav action.
- Mounts in-app as `#communitiesPage`.
- Source lives in `communities/`.
- Architecture/docs live in `docs/communities/`.

## UI split (Profile / Theater / Communities)

Page-specific routing helpers are now separated from index:

- `scripts/profile-view.js`
- `scripts/theater-view.js`
- `scripts/communities-view.js`

Main app glue remains in `nostrflux-app.js`, which now attaches these page modules at startup.

## CSS split + themes

Styling is now split into external CSS files:

- `styles/app.css` (main app styles extracted from index)
- `styles/themes.css` (theme variable overrides)

Theme helper script:

- `scripts/theme-manager.js`

Theme API in browser console:

- `setSifakaTheme('dark')`
- `setSifakaTheme('midnight')`
- `setSifakaTheme('light')`

## Status

Warning: Project is currently in active development and experimental.

Expect bugs, missing features, and UI changes as development continues.
Contributions and testing feedback are welcome.
