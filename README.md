# Craig The Space Bum's Nostr Live Stream App
https://craigthespacebum.github.io/NostrLiveStream/


# NostrFlux Development Roadmap

This document outlines the current **bugs, features, and development priorities** for the NostrFlux project.

The goal is to stabilize the application first, then expand it into a full **Nostr live streaming and social client**.

---

# 🚨 P0 – Critical Bugs (Fix First)

These issues break core functionality or make the app feel broken.

## Core Functionality

- Fix **Follow button**
- Fix **Report button**
- Fix **Like feature not working** (posts and comments)
- Fix **post video URLs not playing**
- Fix **post images being massive**
- Fix **chat posting duplicate messages**
- Fix **zap button**
- Fix **+Follow, Like, Report buttons in Theader Mode**
- Fix **Live Now page not working**

## Data / Counters

- Fix **Followers count**
- Fix **Sats received**
- Fix **How long stream has been live**

## Layout Breaks

- Fix **Ultra-wide screen layout**
- Fix **Profile stat box alignment**

### Goal

Users must be able to:

- Watch streams
- Follow people
- Post content
- Chat during streams

Without encountering major bugs.

---

# 🧩 P1 – Core Features (Needed for a Real Release)

These features make the platform feel like a complete product.

## Nostr Ecosystem

- Add more relays such as:
  - Damus
  - zap.stream
  - nostr.wine
  - snort
  - primal

- Improve **Settings UI structure**

### Settings should be separated into:

**Nostr Profile Settings**
- Name
- Bio
- Profile picture
- Banner
- NIP-05
- Lightning address

**Relay Settings**
- Add relay
- Remove relay
- Relay connection status

**Website Settings**
- Theme selection
- Autoplay streams
- Other app preferences

---

## Profile System

- Merge **Videos tab + Photos tab**
- Add **post box on your own profile**
- Add **expand comments window**

### Share Options

Clicking the **Share button** should open a popup allowing:

- Copy URL link
- Share as a Nostr post
- Share to social media:
  - Twitter
  - Facebook
  - Telegram
  - Discord

---

## Streaming Experience

- **Featured video autoplay**
- Show **stream thumbnail URL**
- If no thumbnail exists, show **LIVE indicator**

### Mini Player

When leaving **Theader Mode**:

- Video continues playing in a **mini player**
- Mini player appears in a corner of the screen
- Clicking the mini player returns to the stream

### Goal

The app should feel like a **complete Nostr streaming + social platform**.

---

# 🎨 P2 – UX Improvements

These improvements focus on polishing the user experience.

## UI Improvements

- Fix **Settings UI design**
- Fix **Profile stats layout**

### Profile Stats Layout

Suggested layout:

```
Followers | Following
Posts     | Streams
Time on Nostr
Sats Received
```

---

## Chat UI

- Remove **Viewer count tab**
- Remove **settings button from chatbox**

---

## Profile UI

- Remove **emoji reaction count**

### Badge System

If a user has badges:

- Split the **bio box into two sections**
- Display badges in the second section

Badge interactions:

- Clicking a badge opens a **popup**
- Popup shows full **badge details**

---

## Live Page

- Remove **category button row**

### Goal

Make the interface **clean, simple, and easier to navigate**.

---

# 🚀 P3 – Future Features (After Stable Release)

These features expand the platform and improve discoverability.

## Social Features

- Add **Groups**
- Add **Lists**
- Add **Feed**

### Groups

Users can join topic-based communities such as:

- Bitcoin
- Gaming
- Music
- Coding

Inside groups users can:

- Post
- Chat
- Stream

---

### Lists

Users can create lists of accounts:

Examples:

- Favorite streamers
- Friends
- News sources

Lists can be used to filter feeds.

---

## Identity Features

### NIP-05 Visual Indicator

If a user has **NIP-05 verification**:

Replace the **purple circle avatar border** with a:

**Glowing purple square**

This visually highlights verified identities.

---

## Search Improvements

Expand the search bar to support:

- **Hashtags**

Example searches:

```
#bitcoin
#nostr
#gaming
```

Future improvements may include:

- User search
- Stream search
- Post search

---

## Stream UI Improvements

- Remove **Past Streams menu**

(Streams should only show if currently live.)

---

### Goal

Improve **discoverability and social interaction** across the platform.

---

# 📊 Recommended Development Order

## Phase 1 – Stabilize App

Fix **ALL P0 bugs**.

Focus on:

- Live streaming
- Chat functionality
- Reactions
- Basic UI stability

---

## Phase 2 – Make It a Complete Product

Implement **P1 core features**:

- Relay improvements
- Profile functionality
- Streaming improvements

---

## Phase 3 – Polish the Experience

Improve **P2 UX features**:

- UI layout improvements
- Settings redesign
- Profile improvements

---

## Phase 4 – Platform Growth

Add **P3 social and discovery features**:

- Groups
- Lists
- Feed
- Hashtag search

---

# 🧠 Development Tracking Recommendation

Track development progress using a project management tool such as:

- Trello
- Notion
- GitHub Projects

Suggested board columns:

```
Critical Bugs
In Progress
Core Features
UX Improvements
Future Ideas
```

This keeps development organized and makes it easier to prioritize tasks.

---

# Project Vision

NostrFlux aims to become a:

**Decentralized live streaming and social platform powered by Nostr and Bitcoin zaps.**

The platform focuses on:

- Open protocols
- Creator monetization
- Decentralized identity
- Real-time live interaction
