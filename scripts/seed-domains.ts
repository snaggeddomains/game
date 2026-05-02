/**
 * seed-domains.ts
 *
 * Reads checked-domains.json (or a file you specify) and upserts all records
 * into the Supabase `domains` table using the service-role key.
 *
 * Usage:
 *   npm run seed
 *   npx tsx scripts/seed-domains.ts --input checked-domains.json --dry-run
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL in .env.local
 *   - SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   - Run the SQL migration (supabase/migrations/001_create_domains.sql) first.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load .env.local before importing supabase helpers
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';
import type { AvailabilityStatus, Difficulty, GameMode } from '../lib/types';

interface SeedRecord {
  domain: string;
  tld: string;
  mode: GameMode;
  category: string | null;
  difficulty: Difficulty;
  availability_status: AvailabilityStatus;
  last_checked_at: string | null;
  source: string;
}

// ---------------------------------------------------------------------------
// Built-in seed data (used when no JSON file is provided)
// This is the canonical starting set — covers all 4 modes with a mix of
// taken (well-known brands) and available (invented, likely-free names).
// ---------------------------------------------------------------------------
const BUILT_IN_SEEDS: SeedRecord[] = [
  // ── REGULAR ──────────────────────────────────────────────────────────────
  // Taken (well-known brands — high confidence)
  { domain: 'google.com', tld: 'com', mode: 'regular', category: 'search', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'amazon.com', tld: 'com', mode: 'regular', category: 'ecommerce', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'netflix.com', tld: 'com', mode: 'regular', category: 'streaming', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'spotify.com', tld: 'com', mode: 'regular', category: 'music', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'reddit.com', tld: 'com', mode: 'regular', category: 'social', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'twitch.tv', tld: 'tv', mode: 'regular', category: 'gaming', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'discord.com', tld: 'com', mode: 'regular', category: 'social', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'dropbox.com', tld: 'com', mode: 'regular', category: 'storage', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'shopify.com', tld: 'com', mode: 'regular', category: 'ecommerce', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'zoom.us', tld: 'us', mode: 'regular', category: 'video', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'squarespace.com', tld: 'com', mode: 'regular', category: 'website', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'airbnb.com', tld: 'com', mode: 'regular', category: 'travel', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'pinterest.com', tld: 'com', mode: 'regular', category: 'social', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'uber.com', tld: 'com', mode: 'regular', category: 'transport', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'snapchat.com', tld: 'com', mode: 'regular', category: 'social', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  // Available (invented brandable names)
  { domain: 'breezeloop.com', tld: 'com', mode: 'regular', category: 'lifestyle', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'foxpaw.io', tld: 'io', mode: 'regular', category: 'tech', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'lunarbrew.co', tld: 'co', mode: 'regular', category: 'food', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'driftlab.io', tld: 'io', mode: 'regular', category: 'tech', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'pebblepath.com', tld: 'com', mode: 'regular', category: 'lifestyle', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'velvetjar.io', tld: 'io', mode: 'regular', category: 'lifestyle', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'noodlecraft.com', tld: 'com', mode: 'regular', category: 'food', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'frostwave.co', tld: 'co', mode: 'regular', category: 'lifestyle', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'sparkroot.io', tld: 'io', mode: 'regular', category: 'tech', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'tumbleberry.io', tld: 'io', mode: 'regular', category: 'lifestyle', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'sizzleworks.com', tld: 'com', mode: 'regular', category: 'food', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'cobaltden.com', tld: 'com', mode: 'regular', category: 'lifestyle', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'emberpath.io', tld: 'io', mode: 'regular', category: 'lifestyle', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'glowcraft.co', tld: 'co', mode: 'regular', category: 'beauty', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'hazelbrook.io', tld: 'io', mode: 'regular', category: 'lifestyle', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },

  // ── KID FRIENDLY ─────────────────────────────────────────────────────────
  { domain: 'roblox.com', tld: 'com', mode: 'kid_friendly', category: 'gaming', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'minecraft.net', tld: 'net', mode: 'kid_friendly', category: 'gaming', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'pokemon.com', tld: 'com', mode: 'kid_friendly', category: 'gaming', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'pbskids.org', tld: 'org', mode: 'kid_friendly', category: 'education', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'coolmathgames.com', tld: 'com', mode: 'kid_friendly', category: 'education', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'abcmouse.com', tld: 'com', mode: 'kid_friendly', category: 'education', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'funbrain.com', tld: 'com', mode: 'kid_friendly', category: 'education', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'nickjr.com', tld: 'com', mode: 'kid_friendly', category: 'entertainment', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'poptropica.com', tld: 'com', mode: 'kid_friendly', category: 'gaming', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'starfall.com', tld: 'com', mode: 'kid_friendly', category: 'education', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  // Available
  { domain: 'gigglepaws.com', tld: 'com', mode: 'kid_friendly', category: 'animals', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'wobbleworld.co', tld: 'co', mode: 'kid_friendly', category: 'play', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'snugglebug.io', tld: 'io', mode: 'kid_friendly', category: 'animals', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'rainbowslime.com', tld: 'com', mode: 'kid_friendly', category: 'play', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'jellycastle.net', tld: 'net', mode: 'kid_friendly', category: 'play', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'sparklequest.com', tld: 'com', mode: 'kid_friendly', category: 'adventure', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'fluffydino.io', tld: 'io', mode: 'kid_friendly', category: 'animals', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'candycloud.net', tld: 'net', mode: 'kid_friendly', category: 'food', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'bananajump.com', tld: 'com', mode: 'kid_friendly', category: 'play', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'doodlebeast.io', tld: 'io', mode: 'kid_friendly', category: 'animals', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'bouncyfrogs.co', tld: 'co', mode: 'kid_friendly', category: 'animals', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'puddlejump.com', tld: 'com', mode: 'kid_friendly', category: 'play', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'ticklemonster.co', tld: 'co', mode: 'kid_friendly', category: 'play', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'fizzypops.io', tld: 'io', mode: 'kid_friendly', category: 'food', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'noodledance.co', tld: 'co', mode: 'kid_friendly', category: 'play', difficulty: 'easy', availability_status: 'available', last_checked_at: null, source: 'seed' },

  // ── FOUNDER MODE ─────────────────────────────────────────────────────────
  { domain: 'stripe.com', tld: 'com', mode: 'founder', category: 'fintech', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'notion.com', tld: 'com', mode: 'founder', category: 'productivity', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'figma.com', tld: 'com', mode: 'founder', category: 'design', difficulty: 'hard', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'vercel.com', tld: 'com', mode: 'founder', category: 'devtools', difficulty: 'hard', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'openai.com', tld: 'com', mode: 'founder', category: 'ai', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'anthropic.com', tld: 'com', mode: 'founder', category: 'ai', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'airtable.com', tld: 'com', mode: 'founder', category: 'productivity', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'webflow.com', tld: 'com', mode: 'founder', category: 'website', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'segment.com', tld: 'com', mode: 'founder', category: 'analytics', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'amplitude.com', tld: 'com', mode: 'founder', category: 'analytics', difficulty: 'hard', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'intercom.com', tld: 'com', mode: 'founder', category: 'crm', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'mixpanel.com', tld: 'com', mode: 'founder', category: 'analytics', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'datadog.com', tld: 'com', mode: 'founder', category: 'infra', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'pagerduty.com', tld: 'com', mode: 'founder', category: 'infra', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'postman.com', tld: 'com', mode: 'founder', category: 'devtools', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  // Available
  { domain: 'nexara.io', tld: 'io', mode: 'founder', category: 'ai', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'vantix.co', tld: 'co', mode: 'founder', category: 'saas', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'klaaro.com', tld: 'com', mode: 'founder', category: 'saas', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'synaptiq.ai', tld: 'ai', mode: 'founder', category: 'ai', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'floware.co', tld: 'co', mode: 'founder', category: 'productivity', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'cruxai.com', tld: 'com', mode: 'founder', category: 'ai', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'nexflow.ai', tld: 'ai', mode: 'founder', category: 'ai', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'datasync.co', tld: 'co', mode: 'founder', category: 'saas', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'lumenos.io', tld: 'io', mode: 'founder', category: 'ai', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'stackvault.com', tld: 'com', mode: 'founder', category: 'saas', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'buildfast.co', tld: 'co', mode: 'founder', category: 'productivity', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'codewarp.io', tld: 'io', mode: 'founder', category: 'devtools', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'pulsemetric.com', tld: 'com', mode: 'founder', category: 'analytics', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'indexly.ai', tld: 'ai', mode: 'founder', category: 'ai', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'mergeflow.io', tld: 'io', mode: 'founder', category: 'devtools', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'cloudmint.io', tld: 'io', mode: 'founder', category: 'infra', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },

  // ── ADULT MODE ────────────────────────────────────────────────────────────
  { domain: 'tinder.com', tld: 'com', mode: 'adult', category: 'dating', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'bumble.com', tld: 'com', mode: 'adult', category: 'dating', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'grindr.com', tld: 'com', mode: 'adult', category: 'dating', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'onlyfans.com', tld: 'com', mode: 'adult', category: 'adult', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'playboy.com', tld: 'com', mode: 'adult', category: 'adult', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'match.com', tld: 'com', mode: 'adult', category: 'dating', difficulty: 'easy', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'okcupid.com', tld: 'com', mode: 'adult', category: 'dating', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'zoosk.com', tld: 'com', mode: 'adult', category: 'dating', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'hinge.co', tld: 'co', mode: 'adult', category: 'dating', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  { domain: 'pof.com', tld: 'com', mode: 'adult', category: 'dating', difficulty: 'medium', availability_status: 'taken', last_checked_at: null, source: 'seed' },
  // Available
  { domain: 'bawdybanter.co', tld: 'co', mode: 'adult', category: 'humor', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'wickedwordplay.com', tld: 'com', mode: 'adult', category: 'humor', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'saucyquiz.io', tld: 'io', mode: 'adult', category: 'games', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'naughtyknowledge.co', tld: 'co', mode: 'adult', category: 'humor', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'riskybiz.fun', tld: 'fun', mode: 'adult', category: 'humor', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'cheekymatches.io', tld: 'io', mode: 'adult', category: 'dating', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'racyriddles.com', tld: 'com', mode: 'adult', category: 'games', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'spicyswipes.co', tld: 'co', mode: 'adult', category: 'dating', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'hotshots.io', tld: 'io', mode: 'adult', category: 'nightlife', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'friskyfinds.com', tld: 'com', mode: 'adult', category: 'dating', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'edgyemoji.co', tld: 'co', mode: 'adult', category: 'humor', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'nightowl.fun', tld: 'fun', mode: 'adult', category: 'nightlife', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'barscene.co', tld: 'co', mode: 'adult', category: 'nightlife', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'naughtynerd.io', tld: 'io', mode: 'adult', category: 'humor', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
  { domain: 'adultquiz.io', tld: 'io', mode: 'adult', category: 'games', difficulty: 'medium', availability_status: 'available', last_checked_at: null, source: 'seed' },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const inputArg = args[args.indexOf('--input') + 1];
  const dryRun = args.includes('--dry-run');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('[seed] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
    console.error('[seed] Make sure .env.local is populated correctly.');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  let records: SeedRecord[];

  if (inputArg) {
    const inputPath = path.join(process.cwd(), inputArg);
    if (!fs.existsSync(inputPath)) {
      console.error(`[seed] Input file not found: ${inputPath}`);
      process.exit(1);
    }
    records = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
    console.log(`[seed] Loaded ${records.length} records from ${inputArg}`);
  } else {
    records = BUILT_IN_SEEDS;
    console.log(`[seed] Using built-in seed data (${records.length} records)`);
  }

  // Filter out unknown availability unless explicitly seeding them
  const toInsert = records.filter((r) => r.availability_status !== 'unknown');
  console.log(`[seed] Inserting ${toInsert.length} records (${records.length - toInsert.length} unknown skipped)`);

  if (dryRun) {
    console.log('[seed] DRY RUN — no changes written to Supabase.');
    console.log('[seed] Sample:', JSON.stringify(toInsert[0], null, 2));
    return;
  }

  const BATCH = 50;
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < toInsert.length; i += BATCH) {
    const batch = toInsert.slice(i, i + BATCH);
    const { error } = await supabase
      .from('domains')
      .upsert(batch, { onConflict: 'domain,mode', ignoreDuplicates: false });

    if (error) {
      console.error(`[seed] Error upserting batch ${i}–${i + BATCH}:`, error.message);
      skipped += batch.length;
    } else {
      inserted += batch.length;
    }
  }

  console.log(`\n[seed] Done. Upserted: ${inserted}, Errors: ${skipped}`);
  console.log('[seed] Your domain pool is ready for the game. 🎣');
}

main().catch((err) => {
  console.error('[seed] Fatal error:', err);
  process.exit(1);
});
