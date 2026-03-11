# NostrLiveStream
https://craigthespacebum.github.io/NostrLiveStream/

NostrLiveStream is an experimental **decentralized livestreaming platform built on Nostr**.

It allows creators to stream content while leveraging the **Nostr protocol for identity, chat, discovery, and social interaction**, removing the need for centralized accounts.

The goal of the project is to build a **Twitch-style experience powered entirely by Nostr identities (npub/nsec)**.

---

# Current Working Features

## Core Nostr Integration
- Login using **Nostr keys (nsec / browser extensions)**.
- Profile loading from **Nostr metadata events**.
- Basic **relay connectivity**.
- Viewing Nostr profiles.

## Profiles
- Profile page displaying:
  - Bio
  - Followers
  - Following
  - Post count
  - Stream count
- Video and photo content tabs.
- Ability to view posts from a user.

## Streaming / Theater Mode
- Stream viewing interface.
- Chat window integrated with Nostr events.
- Basic livestream UI layout.

## Social Features
- Follow button (currently unstable).
- Share button (UI present but incomplete).
- Basic chat functionality in livestream chat.

---

# Known Issues/Bugs/Coming Soon Features:

- Search Bar expanded to hash tags
- More relays connected like damus, zap.stream 
- Remove Past Streams from menu.
- Add Groups
- Add Lists
- Add Feed 
- If has nip-05, instead of purple curcle, glowing purple square. 
- Fix Settings UI so it looks better. nostr profile settings should one box, relays in another well website settings like to change theme, etc. 

Profile;
- If person has badges, split the bio box up into 2 and show badges. When you click on badge, pop up all badge details
- If you are own your own profile, put a spot above post to let you post your own post. 
- Add feature to expand on comments of post new a window.
- Remove the 'emoji' count 
- Fix post images so they aren't massive.  
- Fix follow button.
- When you click share button, it will pop up a window asking how you will want to share for example url link to the profile, share on nostr as a post, send to someone via facebook, twitter, etc. 
- Fix report button to function

Theader Mode.
- Fix zap button, fix +Follow, Like and report.


# Status

⚠️ **Project is currently in active development and experimental.**

Expect bugs, missing features, and UI changes as development continues.

Contributions and testing feedback are welcome.
