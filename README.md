# StreakForge

A daily habit tracker with GitHub-style contribution heatmaps and streak
counters. Client-only prototype — all data lives in the browser's
`localStorage`; nothing is sent to a server.

## Features

- Create habits with a name and color
- One-tap "mark done today" toggle, undoable
- Current streak and longest streak, computed from the raw log dates
- An 18-week contribution heatmap per habit
- Persists across reloads via `localStorage`

## Concepts demonstrated

| Area | Where |
|---|---|
| Pure date/streak logic, fully unit tested | `src/lib/dates.ts`, `src/lib/streaks.ts` |
| Streak semantics (a streak stays alive until a full day is skipped, not just until midnight) | `currentStreak` in `src/lib/streaks.ts` |
| Calendar-grid generation (week-aligned columns, out-of-range padding) | `buildHeatmap` in `src/lib/streaks.ts` |
| SSR-safe localStorage hydration (avoiding hydration mismatches) | `src/app/page.tsx` |
| Next.js 16 App Router + Tailwind v4 | `src/app/` |
| Vitest + Testing Library setup | `vitest.config.mts`, `src/lib/__tests__/` |
| CI (lint, test, build on every push) | `.github/workflows/ci.yml` |

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Vitest

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # unit tests
npm run lint
npm run build    # production build
```

## Limitations / roadmap

This is a **prototype**: single-device, single-user, no accounts. There's no
backend yet, so habits don't sync across devices or browsers. A natural next
step would be swapping the `src/lib/storage.ts` localStorage layer for a
Supabase-backed API with real auth, without touching the pure streak/heatmap
logic at all — that logic is already storage-agnostic.

## License

MIT
