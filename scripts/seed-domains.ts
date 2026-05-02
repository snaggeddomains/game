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
// Word banks — 45 × 45 = 2,025 available combos per mode
// ---------------------------------------------------------------------------

// ── REGULAR ─────────────────────────────────────────────────────────────────
const REGULAR_A = [
  'swift', 'bright', 'dark', 'frost', 'glow', 'drift', 'spark', 'amber',
  'jade', 'crimson', 'silver', 'golden', 'iron', 'velvet', 'cobalt', 'lunar',
  'solar', 'thunder', 'shadow', 'wild', 'calm', 'brave', 'sharp', 'keen',
  'cool', 'warm', 'deep', 'wide', 'fast', 'round', 'pure', 'clear', 'clean',
  'smart', 'tough', 'soft', 'grand', 'prime', 'open', 'fresh', 'crisp',
  'lush', 'grey', 'bold', 'bare',
];
const REGULAR_B = [
  'loop', 'path', 'lab', 'nest', 'den', 'bay', 'run', 'port', 'hub', 'hive',
  'forge', 'vault', 'ridge', 'peak', 'grove', 'creek', 'cove', 'field',
  'yard', 'bridge', 'base', 'post', 'mark', 'line', 'wave', 'beam', 'core',
  'edge', 'gate', 'helm', 'keep', 'lake', 'node', 'pier', 'reef', 'shed',
  'tide', 'turn', 'wall', 'well', 'wire', 'wood', 'zone', 'trail', 'bench',
];

// ── KID FRIENDLY ─────────────────────────────────────────────────────────────
const KID_A = [
  'giggle', 'wobble', 'snuggle', 'rainbow', 'funny', 'jelly', 'sparkle',
  'silly', 'fluffy', 'candy', 'banana', 'wiggle', 'doodle', 'bouncy',
  'tickle', 'fizzy', 'happy', 'bumble', 'glitter', 'squiggle', 'noodle',
  'puddle', 'twinkle', 'fuzzy', 'jumpy', 'zippy', 'bubbly', 'cuddly',
  'wacky', 'goofy', 'grumpy', 'sunny', 'breezy', 'chilly', 'cozy', 'dreamy',
  'fairy', 'fancy', 'floppy', 'frosty', 'jazzy', 'leafy', 'lucky', 'merry',
  'peppy',
];
const KID_B = [
  'paws', 'world', 'bug', 'slime', 'farm', 'castle', 'quest', 'bucket',
  'dino', 'cloud', 'jump', 'toes', 'beast', 'cats', 'frogs', 'storm',
  'monster', 'pops', 'snorts', 'boo', 'slug', 'dance', 'land', 'town',
  'cub', 'dream', 'drop', 'fort', 'glen', 'grove', 'hill', 'hive', 'hood',
  'jam', 'jungle', 'lake', 'leaf', 'moon', 'petal', 'pond', 'rock', 'trail',
  'bark', 'nest', 'camp',
];

// ── FOUNDER ───────────────────────────────────────────────────────────────────
const FOUNDER_A = [
  'nexus', 'vertex', 'apex', 'prism', 'pulse', 'vault', 'stack', 'flow',
  'sync', 'launch', 'build', 'scale', 'ship', 'track', 'merge', 'index',
  'deploy', 'query', 'parse', 'render', 'stream', 'cache', 'fetch', 'relay',
  'route', 'scope', 'shift', 'spin', 'split', 'store', 'trace', 'trigger',
  'batch', 'clone', 'commit', 'crawl', 'draft', 'embed', 'encode', 'extend',
  'filter', 'graph', 'hash', 'inject', 'forge',
];
const FOUNDER_B = [
  'labs', 'metrics', 'hub', 'base', 'bridge', 'cloud', 'dash', 'data',
  'deck', 'desk', 'dock', 'gate', 'grid', 'guide', 'kit', 'layer', 'ledger',
  'lens', 'log', 'loop', 'map', 'mark', 'matrix', 'mesh', 'mind', 'mint',
  'mix', 'model', 'module', 'node', 'orbit', 'pad', 'panel', 'park', 'pipe',
  'port', 'rail', 'ring', 'root', 'scan', 'seed', 'wire', 'zone', 'hq',
  'works',
];

// ── ADULT ─────────────────────────────────────────────────────────────────────
const ADULT_A = [
  'dirty', 'naughty', 'kinky', 'horny', 'sexy', 'filthy', 'lusty', 'frisky',
  'spicy', 'nasty', 'saucy', 'wicked', 'raunchy', 'steamy', 'naked', 'nude',
  'bare', 'hot', 'wild', 'wet', 'hung', 'thick', 'tight', 'rough', 'deep',
  'juicy', 'banging', 'pounding', 'licking', 'sucking', 'stroking', 'spanking',
  'fucking', 'slutty', 'busty', 'throbbing', 'dripping', 'sloppy', 'sweaty',
  'sticky', 'creamy', 'cheeky', 'risky', 'taboo', 'lewd',
];
const ADULT_B = [
  'cock', 'dick', 'balls', 'ass', 'tits', 'boobs', 'pussy', 'butt', 'booty',
  'shaft', 'rod', 'boner', 'sack', 'nuts', 'hole', 'lips', 'curves', 'hips',
  'thighs', 'nipples', 'package', 'bulge', 'groin', 'meat', 'pole', 'tool',
  'junk', 'rear', 'backdoor', 'glory', 'loins', 'flesh', 'parts', 'goods',
  'buns', 'cheeks', 'pipe', 'wand', 'stick', 'club', 'bone', 'zone', 'den',
  'lair', 'pit',
];

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function crossJoin(
  wordsA: string[],
  wordsB: string[],
  tlds: string[],
  mode: GameMode,
  categories: string[],
  difficulty: Difficulty,
  status: AvailabilityStatus,
): SeedRecord[] {
  const records: SeedRecord[] = [];
  let i = 0;
  for (const a of wordsA) {
    for (const b of wordsB) {
      const tld = tlds[i % tlds.length];
      records.push({
        domain: `${a}${b}.${tld}`,
        tld,
        mode,
        category: categories[i % categories.length],
        difficulty,
        availability_status: status,
        last_checked_at: null,
        source: 'seed',
      });
      i++;
    }
  }
  return records;
}

// ---------------------------------------------------------------------------
// Taken domains — real well-known brands per mode
// ---------------------------------------------------------------------------

function taken(
  domain: string,
  tld: string,
  mode: GameMode,
  category: string,
  difficulty: Difficulty,
): SeedRecord {
  return { domain, tld, mode, category, difficulty, availability_status: 'taken', last_checked_at: null, source: 'seed' };
}

const TAKEN_REGULAR: SeedRecord[] = [
  taken('google.com',       'com', 'regular', 'search',    'easy'),
  taken('amazon.com',       'com', 'regular', 'ecommerce', 'easy'),
  taken('netflix.com',      'com', 'regular', 'streaming', 'easy'),
  taken('spotify.com',      'com', 'regular', 'music',     'easy'),
  taken('reddit.com',       'com', 'regular', 'social',    'easy'),
  taken('discord.com',      'com', 'regular', 'social',    'easy'),
  taken('dropbox.com',      'com', 'regular', 'storage',   'easy'),
  taken('shopify.com',      'com', 'regular', 'ecommerce', 'medium'),
  taken('squarespace.com',  'com', 'regular', 'website',   'medium'),
  taken('airbnb.com',       'com', 'regular', 'travel',    'medium'),
  taken('pinterest.com',    'com', 'regular', 'social',    'easy'),
  taken('uber.com',         'com', 'regular', 'transport', 'easy'),
  taken('snapchat.com',     'com', 'regular', 'social',    'easy'),
  taken('youtube.com',      'com', 'regular', 'video',     'easy'),
  taken('tiktok.com',       'com', 'regular', 'social',    'easy'),
  taken('instagram.com',    'com', 'regular', 'social',    'easy'),
  taken('facebook.com',     'com', 'regular', 'social',    'easy'),
  taken('twitter.com',      'com', 'regular', 'social',    'easy'),
  taken('linkedin.com',     'com', 'regular', 'social',    'medium'),
  taken('whatsapp.com',     'com', 'regular', 'messaging', 'easy'),
  taken('slack.com',        'com', 'regular', 'messaging', 'medium'),
  taken('zoom.us',          'us',  'regular', 'video',     'medium'),
  taken('hubspot.com',      'com', 'regular', 'marketing', 'medium'),
  taken('mailchimp.com',    'com', 'regular', 'marketing', 'medium'),
  taken('salesforce.com',   'com', 'regular', 'crm',       'medium'),
  taken('zendesk.com',      'com', 'regular', 'crm',       'medium'),
  taken('hootsuite.com',    'com', 'regular', 'marketing', 'hard'),
  taken('canva.com',        'com', 'regular', 'design',    'medium'),
  taken('trello.com',       'com', 'regular', 'productivity','medium'),
  taken('asana.com',        'com', 'regular', 'productivity','medium'),
  taken('basecamp.com',     'com', 'regular', 'productivity','medium'),
  taken('paypal.com',       'com', 'regular', 'finance',   'easy'),
  taken('venmo.com',        'com', 'regular', 'finance',   'medium'),
  taken('robinhood.com',    'com', 'regular', 'finance',   'medium'),
  taken('wix.com',          'com', 'regular', 'website',   'medium'),
  taken('wordpress.com',    'com', 'regular', 'website',   'easy'),
  taken('medium.com',       'com', 'regular', 'blogging',  'medium'),
  taken('substack.com',     'com', 'regular', 'blogging',  'medium'),
  taken('twitch.tv',        'tv',  'regular', 'gaming',    'medium'),
  taken('etsy.com',         'com', 'regular', 'ecommerce', 'medium'),
];

const TAKEN_KID: SeedRecord[] = [
  taken('roblox.com',          'com', 'kid_friendly', 'gaming',      'easy'),
  taken('minecraft.net',       'net', 'kid_friendly', 'gaming',      'easy'),
  taken('pokemon.com',         'com', 'kid_friendly', 'gaming',      'easy'),
  taken('pbskids.org',         'org', 'kid_friendly', 'education',   'medium'),
  taken('coolmathgames.com',   'com', 'kid_friendly', 'education',   'easy'),
  taken('abcmouse.com',        'com', 'kid_friendly', 'education',   'medium'),
  taken('funbrain.com',        'com', 'kid_friendly', 'education',   'medium'),
  taken('nickjr.com',          'com', 'kid_friendly', 'entertainment','easy'),
  taken('poptropica.com',      'com', 'kid_friendly', 'gaming',      'medium'),
  taken('starfall.com',        'com', 'kid_friendly', 'education',   'medium'),
  taken('khanacademy.org',     'org', 'kid_friendly', 'education',   'medium'),
  taken('duolingo.com',        'com', 'kid_friendly', 'education',   'medium'),
  taken('brainpop.com',        'com', 'kid_friendly', 'education',   'hard'),
  taken('noggin.com',          'com', 'kid_friendly', 'entertainment','hard'),
  taken('nickelodeon.com',     'com', 'kid_friendly', 'entertainment','easy'),
  taken('cartoonnetwork.com',  'com', 'kid_friendly', 'entertainment','medium'),
  taken('disneyjr.com',        'com', 'kid_friendly', 'entertainment','medium'),
  taken('sesamestreet.org',    'org', 'kid_friendly', 'education',   'medium'),
  taken('scratch.mit.edu',     'edu', 'kid_friendly', 'education',   'hard'),
  taken('prodigygame.com',     'com', 'kid_friendly', 'education',   'hard'),
  taken('classdojo.com',       'com', 'kid_friendly', 'education',   'hard'),
  taken('storylineonline.net', 'net', 'kid_friendly', 'education',   'hard'),
  taken('zearn.org',           'org', 'kid_friendly', 'education',   'hard'),
  taken('tynker.com',          'com', 'kid_friendly', 'education',   'hard'),
  taken('kodable.com',         'com', 'kid_friendly', 'education',   'hard'),
];

const TAKEN_FOUNDER: SeedRecord[] = [
  taken('stripe.com',       'com', 'founder', 'fintech',      'medium'),
  taken('notion.com',       'com', 'founder', 'productivity', 'medium'),
  taken('figma.com',        'com', 'founder', 'design',       'hard'),
  taken('vercel.com',       'com', 'founder', 'devtools',     'hard'),
  taken('openai.com',       'com', 'founder', 'ai',           'easy'),
  taken('anthropic.com',    'com', 'founder', 'ai',           'medium'),
  taken('airtable.com',     'com', 'founder', 'productivity', 'medium'),
  taken('webflow.com',      'com', 'founder', 'website',      'medium'),
  taken('amplitude.com',    'com', 'founder', 'analytics',    'hard'),
  taken('intercom.com',     'com', 'founder', 'crm',          'medium'),
  taken('mixpanel.com',     'com', 'founder', 'analytics',    'medium'),
  taken('datadog.com',      'com', 'founder', 'infra',        'medium'),
  taken('pagerduty.com',    'com', 'founder', 'infra',        'medium'),
  taken('postman.com',      'com', 'founder', 'devtools',     'medium'),
  taken('hashicorp.com',    'com', 'founder', 'infra',        'hard'),
  taken('terraform.io',     'io',  'founder', 'infra',        'hard'),
  taken('circleci.com',     'com', 'founder', 'devtools',     'hard'),
  taken('gitpod.io',        'io',  'founder', 'devtools',     'hard'),
  taken('netlify.com',      'com', 'founder', 'devtools',     'medium'),
  taken('heroku.com',       'com', 'founder', 'infra',        'medium'),
  taken('digitalocean.com', 'com', 'founder', 'infra',        'medium'),
  taken('fly.io',           'io',  'founder', 'infra',        'hard'),
  taken('supabase.com',     'com', 'founder', 'devtools',     'hard'),
  taken('planetscale.com',  'com', 'founder', 'devtools',     'hard'),
  taken('clerk.com',        'com', 'founder', 'security',     'hard'),
  taken('auth0.com',        'com', 'founder', 'security',     'medium'),
  taken('okta.com',         'com', 'founder', 'security',     'medium'),
  taken('twilio.com',       'com', 'founder', 'saas',         'medium'),
  taken('sendgrid.com',     'com', 'founder', 'saas',         'medium'),
  taken('resend.com',       'com', 'founder', 'saas',         'hard'),
  taken('render.com',       'com', 'founder', 'infra',        'hard'),
  taken('railway.app',      'app', 'founder', 'infra',        'hard'),
  taken('linear.app',       'app', 'founder', 'productivity', 'hard'),
  taken('retool.com',       'com', 'founder', 'devtools',     'hard'),
  taken('segment.com',      'com', 'founder', 'analytics',    'hard'),
];

const TAKEN_ADULT: SeedRecord[] = [
  taken('tinder.com',             'com', 'adult', 'dating',   'easy'),
  taken('bumble.com',             'com', 'adult', 'dating',   'easy'),
  taken('grindr.com',             'com', 'adult', 'dating',   'easy'),
  taken('onlyfans.com',           'com', 'adult', 'adult',    'easy'),
  taken('playboy.com',            'com', 'adult', 'adult',    'easy'),
  taken('match.com',              'com', 'adult', 'dating',   'easy'),
  taken('okcupid.com',            'com', 'adult', 'dating',   'medium'),
  taken('zoosk.com',              'com', 'adult', 'dating',   'medium'),
  taken('hinge.co',               'co',  'adult', 'dating',   'medium'),
  taken('pof.com',                'com', 'adult', 'dating',   'medium'),
  taken('chaturbate.com',         'com', 'adult', 'adult',    'medium'),
  taken('adultfriendfinder.com',  'com', 'adult', 'dating',   'medium'),
  taken('seeking.com',            'com', 'adult', 'dating',   'hard'),
  taken('ashleymadison.com',      'com', 'adult', 'dating',   'medium'),
  taken('fetlife.com',            'com', 'adult', 'dating',   'hard'),
  taken('pornhub.com',            'com', 'adult', 'adult',    'easy'),
  taken('xvideos.com',            'com', 'adult', 'adult',    'medium'),
  taken('xnxx.com',               'com', 'adult', 'adult',    'medium'),
  taken('redtube.com',            'com', 'adult', 'adult',    'medium'),
  taken('brazzers.com',           'com', 'adult', 'adult',    'hard'),
  taken('bangbros.com',           'com', 'adult', 'adult',    'hard'),
  taken('naughtyamerica.com',     'com', 'adult', 'adult',    'hard'),
  taken('livejasmin.com',         'com', 'adult', 'adult',    'hard'),
  taken('camsoda.com',            'com', 'adult', 'adult',    'hard'),
  taken('stripchat.com',          'com', 'adult', 'adult',    'hard'),
];

// ---------------------------------------------------------------------------
// Built-in seed data
// Each crossJoin produces 45 × 45 = 2,025 available domains per mode.
// ---------------------------------------------------------------------------
const BUILT_IN_SEEDS: SeedRecord[] = [
  // ── REGULAR ──────────────────────────────────────────────────────────────
  ...TAKEN_REGULAR,
  ...crossJoin(
    REGULAR_A, REGULAR_B,
    ['com', 'net', 'io', 'org', 'ai'],
    'regular',
    ['tech', 'lifestyle', 'food', 'finance', 'health', 'beauty', 'travel', 'sports', 'home', 'business'],
    'medium',
    'available',
  ),

  // ── KID FRIENDLY ─────────────────────────────────────────────────────────
  ...TAKEN_KID,
  ...crossJoin(
    KID_A, KID_B,
    ['com', 'net', 'io', 'org'],
    'kid_friendly',
    ['animals', 'play', 'food', 'adventure', 'education', 'nature'],
    'easy',
    'available',
  ),

  // ── FOUNDER ──────────────────────────────────────────────────────────────
  ...TAKEN_FOUNDER,
  ...crossJoin(
    FOUNDER_A, FOUNDER_B,
    ['com', 'io', 'ai', 'net', 'org'],
    'founder',
    ['ai', 'saas', 'devtools', 'analytics', 'infra', 'productivity', 'fintech', 'crm', 'security', 'startup'],
    'medium',
    'available',
  ),

  // ── ADULT ─────────────────────────────────────────────────────────────────
  ...TAKEN_ADULT,
  ...crossJoin(
    ADULT_A, ADULT_B,
    ['com', 'net', 'io', 'org'],
    'adult',
    ['adult', 'dating', 'humor', 'nightlife', 'games'],
    'medium',
    'available',
  ),
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

  const toInsert = records.filter((r) => r.availability_status !== 'unknown');
  console.log(`[seed] Inserting ${toInsert.length} records (${records.length - toInsert.length} unknown skipped)`);

  if (dryRun) {
    console.log('[seed] DRY RUN — no changes written to Supabase.');
    console.log('[seed] Sample:', JSON.stringify(toInsert[0], null, 2));
    const counts: Record<string, number> = {};
    for (const r of toInsert) {
      counts[r.mode] = (counts[r.mode] ?? 0) + 1;
    }
    console.log('[seed] Counts per mode:', counts);
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
  console.log('[seed] Your domain pool is ready for the game.');
}

main().catch((err) => {
  console.error('[seed] Fatal error:', err);
  process.exit(1);
});
