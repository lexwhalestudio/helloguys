# Mystic Companion

A zodiac/tarot/moon-cycle companion app. Hooks people in with their sign, keeps them coming back
with daily words, tarot draws, and a collectible mineral system, and monetizes through a tiered
subscription (compatibility readings, deeper content, rare collectibles gated behind premium).

This is the early product scaffold: real moon-phase math and sign calculation, mock content for
daily/weekly/yearly words and tarot/mineral data, and a working (but backend-less) subscription
flow persisted to `localStorage`. No real payments or accounts yet.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- React Router

## Getting started

```bash
npm install
npm run dev
```

## Structure

- `src/lib/` — zodiac sign lookup, moon-phase math, compatibility scoring, app state (`store.tsx`)
- `src/data/` — mock content: tarot deck, minerals, daily/weekly/yearly words
- `src/pages/` — one file per screen (Onboarding, Home, Moon Calendar, Tarot, Minerals,
  Compatibility, Profile/Dossier, Upgrade)
- `src/components/` — shared UI (`Layout`, `Card`, `PremiumLock`)

## Not built yet (next milestones)

- Real backend (Supabase/Firebase) for auth + persistence instead of `localStorage`
- Real payments (Stripe) instead of the mock plan selector on `/upgrade`
- Real daily/weekly/yearly content pipeline (CMS or admin panel) instead of static mock copy
- Companion character art/personality, mineral illustrations, brand identity
