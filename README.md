# Is it Snagged? — Domain Name Game

A Next.js game for [Snagged.com](https://www.snagged.com) that lives at `/game`. Players are shown domain names and must guess whether they're already registered ("Snagged") or still available.

## Features

- **4 game modes**: Regular, Kid Friendly, Founder Mode, Adult Mode
- **10 rounds per game** with score, streak, and accuracy tracking
- **Supabase-backed domain pool** with per-domain analytics
- **Optional email capture** at game end
- **Mobile-first** responsive layout using Snagged brand colors and typography
- **Keyboard shortcuts** (S = Snagged, A = Available, Enter = Next)
- **Backend scripts** for batch-generating and seeding domains

---

## Quick Start

### 1. Clone & install

```bash
git clone <repo>
cd game
npm install
```

### 2. Connect to Supabase

Copy the example env file and fill in your project credentials:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and set:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these in your Supabase dashboard under **Project Settings → API**.

> **Important**: `SUPABASE_SERVICE_ROLE_KEY` is only used in server-side scripts (`npm run seed`, etc.) and is never exposed to the browser.

### 3. Run the database migration

In the [Supabase SQL editor](https://app.supabase.com) for your project, paste and run:

```
supabase/migrations/001_create_domains.sql
```

This creates the `domains`, `game_results`, and `game_email_captures` tables with RLS enabled.

Alternatively, if you have the [Supabase CLI](https://supabase.com/docs/guides/cli) installed:

```bash
supabase db push
```

### 4. Seed the domain pool

```bash
npm run seed
```

This loads the built-in 100-domain seed set (25 per mode, mix of taken + available) into your Supabase project.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000/game](http://localhost:3000/game).

---

## Environment Variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your project URL from Supabase settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Safe to expose; used in browser |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ for scripts | Keep secret; server/scripts only |
| `NEXT_PUBLIC_BASE_PATH` | Optional | Defaults to `/game` |

---

## Adding More Domains

Three scripts handle the full pipeline:

### Step 1 — Generate ideas

```bash
npm run generate-domains
# or for a specific mode:
npx tsx scripts/generate-domains.ts --mode founder --count 50
```

This writes `generated-domains.json`. In production, replace the placeholder logic in `generateForMode()` with a real LLM call (Claude, GPT-4, etc.).

### Step 2 — Check availability

```bash
npm run check-availability
```

Reads `generated-domains.json` and writes `checked-domains.json` with `availability_status` set. Replace the placeholder `checkDomain()` function with a real API (Domainr, GoDaddy, WhoisXML, etc.) and set `DOMAIN_CHECK_API_KEY` in your environment.

### Step 3 — Seed to Supabase

```bash
npm run seed --input checked-domains.json
# Dry run to preview without writing:
npm run seed -- --dry-run
```

---

## Deploying to snagged.com/game

The app is pre-configured with `basePath: '/game'` in `next.config.ts`.

### Vercel (recommended)

1. Push the repo to GitHub
2. Import into Vercel
3. Set environment variables in Vercel project settings
4. Set **Root Directory** to this folder if it's a monorepo sub-directory
5. The app will build and serve at your domain + `/game`

### Custom server / reverse proxy

If deploying to a VPS or behind nginx, proxy `/game` → the Next.js server. The `basePath` configuration ensures all internal Next.js routes, API calls, and static assets are correctly prefixed.

---

## Project Structure

```
app/
  game/page.tsx          Main game client component (all game state)
  api/
    domains/route.ts     GET — fetch 10 random domains for a session
    game-result/route.ts POST — record anonymised game analytics
    email/route.ts       POST — capture optional end-of-game email

components/
  SnaggedLogo.tsx        Brand logo (wave icon + wordmark)
  ModeSelector.tsx       Mode selection landing screen
  GameBoard.tsx          Core game loop (guess + reveal)
  ResultsScreen.tsx      Final results + email capture
  EmailCapture.tsx       Newsletter sign-up form

lib/
  types.ts               Shared TypeScript types & constants
  supabase.ts            Server-side Supabase client
  supabase-client.ts     Browser-side Supabase singleton

scripts/
  generate-domains.ts    Batch generate domain ideas (plug in your LLM)
  check-availability.ts  Batch check availability (plug in your API)
  seed-domains.ts        Upsert records into Supabase

supabase/migrations/
  001_create_domains.sql Table schema, RLS policies, indexes
```

---

## Database Schema

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `domain` | text | Full domain (e.g. `launchpad.io`) |
| `tld` | text | Extension only (e.g. `io`) |
| `mode` | text | `regular` / `kid_friendly` / `founder` / `adult` |
| `category` | text | e.g. `saas`, `dating`, `food` |
| `difficulty` | text | `easy` / `medium` / `hard` |
| `availability_status` | text | `available` / `taken` / `unknown` |
| `last_checked_at` | timestamptz | When availability was last verified |
| `source` | text | `seed`, `generated`, etc. |
| `times_shown` | integer | How many times shown in game |
| `correct_guess_rate` | numeric | Rolling % of correct guesses |
| `created_at` | timestamptz | Auto-set |
| `updated_at` | timestamptz | Auto-updated by trigger |
