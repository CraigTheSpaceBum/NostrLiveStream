# Relay Strategy

## Goals
- Fast startup
- Relay health visibility
- graceful failover
- dedup-ready architecture

## Relay sources
- Uses relay list from Sifaka app context when available.
- Fallback defaults are applied if context is unavailable.

## Connection behavior
- Maintains websocket connections per relay.
- Queue-based publish fallback if no relay is currently open.
- Relay status updates available for diagnostics/UI.

## Auth and access
- Supports future NIP-42/NIP-43 relay auth integration points.
- Private groups are expected to run on access-controlled relays.

## Compatibility
- If a relay lacks search capability, search remains local.
- If a relay lacks private-group support, app can continue with public-channel subset.

## Future enhancements
- NIP-65 relay list import and sync UX.
- NIP-66 relay health scoring and auto-routing.
- Batched subscriptions and explicit per-community relay pools.
- persisted relay telemetry for debugging.
