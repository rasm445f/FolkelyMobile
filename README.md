# FolkelyMobile

A concept application for a 3 day festival in Hundested, Denmark. iOS and Android only, no accounts/login — everyone sees the same public lineup, map, and announcements.

## Structure

This is an npm workspaces monorepo:

- `app/` — Expo + expo-router (TypeScript) mobile app, styled with NativeWind (Tailwind), using `@expo/ui` for native controls.
- `backend/` — Express (TypeScript) API backed by PostgreSQL via Prisma.
- `packages/shared/` — TypeScript types shared between the app and the backend.
- `docker-compose.yml` — Postgres only. The backend runs directly on your machine for fast local dev.

This app uses a custom **dev client**, not the plain Expo Go app — `@expo/ui` and the dev-client tooling itself need a native build.

## Prerequisites

- Node.js 20+
- Docker (for Postgres)
- Xcode (iOS) and/or Android Studio (Android) — required for the native dev-client build, not optional

## First-time setup

```bash
npm install                      # installs all workspaces
cp backend/.env.example backend/.env
cp app/.env.example app/.env

npm run db:up                    # starts Postgres in Docker
npm run --workspace backend prisma:migrate
npm run --workspace backend prisma:seed
```

Then build and install the dev client on a simulator/emulator (only needed once, or again after adding a native dependency):

```bash
npm run --workspace app ios       # builds and installs on the iOS Simulator
npm run --workspace app android   # builds and installs on the Android emulator
```

## Day-to-day

```bash
npm run backend   # starts the Express API on http://localhost:3000
npm run app       # starts the Expo dev server and connects to the already-installed dev client
```

`app/.env`'s `EXPO_PUBLIC_API_URL` only needs to be set when testing on a **physical device** — point it at your machine's LAN IP (e.g. `http://192.168.1.42:3000`). The iOS Simulator and Android emulator both get a working default automatically (see `app/src/api/client.ts`).

## Data model

Four resources, all public/read-only from the app's perspective:

- **Artists / Stages / Performances** — the lineup (`GET /api/artists`, `/api/stages`, `/api/performances`)
- **Points of interest** — map pins for stages, food, bars, toilets, entrances, medical, etc. (`GET /api/map/pois`)
- **Announcements** — organizer news (`GET /api/news`)

There's no admin UI or write API by design (no login, short-lived event). Manage content directly via `npm run --workspace backend prisma:studio` or by editing `backend/prisma/seed.ts` and re-seeding.

## Map

The Map tab overlays POI pins on a static venue map image rather than a real geographic map — `PointOfInterest.x`/`y` are percentages (0-100) of that image's width/height, not GPS coordinates. There's currently just a placeholder background in `app/app/(tabs)/map.tsx`; drop the real venue map graphic into `app/assets/` and swap it in (see the comment at the top of that file).

## Useful commands

| Command | Description |
| --- | --- |
| `npm run db:up` / `npm run db:down` | Start/stop the Postgres container |
| `npm run --workspace backend prisma:migrate` | Create/apply a migration |
| `npm run --workspace backend prisma:studio` | Browse/edit data in Prisma Studio |
| `npm run --workspace backend prisma:seed` | Re-run the seed script |

## Known workarounds

- `patches/expo-modules-jsi+57.0.4.patch` (via patch-package, auto-applied on `npm install`) fixes an upstream Swift compiler ambiguity in Expo's own `expo-modules-jsi` package that otherwise breaks the iOS native build on newer Xcode toolchains.
