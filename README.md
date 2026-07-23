# FolkelyMobile

A concept application for a 3 day festival in Hundested, Denmark. iOS and Android only, no accounts/login — everyone sees the same public lineup, map, and announcements.

## Structure

This is an npm workspaces monorepo:

- `app/` — Expo + expo-router (TypeScript) mobile app, using `@expo/ui` for native controls and `react-native-maps` for the venue map.
- `backend/` — Express (TypeScript) API backed by PostgreSQL via Prisma.
- `packages/shared/` — TypeScript types shared between the app and the backend.
- `docker-compose.yml` — Postgres only. The backend runs directly on your machine for fast local dev.

## Prerequisites

- Node.js 20+
- Docker (for Postgres)
- Xcode / Android Studio if you want to run on a simulator or emulator (or use the Expo Go app on a physical device)

## First-time setup

```bash
npm install                      # installs all workspaces
cp backend/.env.example backend/.env
cp app/.env.example app/.env     # set EXPO_PUBLIC_API_URL to your machine's LAN IP for physical devices

npm run db:up                    # starts Postgres in Docker
npm run --workspace backend prisma:migrate
npm run --workspace backend prisma:seed
```

## Day-to-day

```bash
npm run backend   # starts the Express API on http://localhost:3000
npm run app       # starts the Expo dev server
```

Then press `i` for iOS simulator or `a` for Android emulator, or scan the QR code with Expo Go on a physical device.

> On a physical device, `localhost` in `app/.env` won't reach your dev machine — set `EXPO_PUBLIC_API_URL` to your machine's LAN IP instead (e.g. `http://192.168.1.42:3000`).

## Data model

Four resources, all public/read-only from the app's perspective:

- **Artists / Stages / Performances** — the lineup (`GET /api/artists`, `/api/stages`, `/api/performances`)
- **Points of interest** — map pins for stages, food, bars, toilets, entrances, medical, etc. (`GET /api/map/pois`)
- **Announcements** — organizer news (`GET /api/news`)

There's no admin UI or write API by design (no login, short-lived event). Manage content directly via `npm run --workspace backend prisma:studio` or by editing `backend/prisma/seed.ts` and re-seeding.

## Useful commands

| Command | Description |
| --- | --- |
| `npm run db:up` / `npm run db:down` | Start/stop the Postgres container |
| `npm run --workspace backend prisma:migrate` | Create/apply a migration |
| `npm run --workspace backend prisma:studio` | Browse/edit data in Prisma Studio |
| `npm run --workspace backend prisma:seed` | Re-run the seed script |
