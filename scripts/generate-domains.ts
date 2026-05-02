/**
 * generate-domains.ts
 *
 * Batch-generates domain name ideas for each game mode using placeholder AI
 * generation logic. In production, swap the `generateForMode` function body
 * for a real call to your preferred LLM (Claude, GPT-4, etc.).
 *
 * Usage:
 *   npm run generate-domains
 *   # or with options:
 *   npx tsx scripts/generate-domains.ts --mode founder --count 50
 *
 * Output: writes generated-domains.json to the project root.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { GameMode, Difficulty } from '../lib/types';

interface GeneratedDomain {
  domain: string;
  tld: string;
  mode: GameMode;
  category: string;
  difficulty: Difficulty;
  source: 'generated';
}

// ---------------------------------------------------------------------------
// Sample domain banks per mode — two-word combos, prefixes, and suffixes
// Replace generateForMode() with a real LLM call for production use.
// ---------------------------------------------------------------------------

const DOMAIN_BANKS: Record<GameMode, Array<Omit<GeneratedDomain, 'mode' | 'source'>>> = {
  regular: [
    { domain: 'swiftloop.com',    tld: 'com', category: 'tech',      difficulty: 'medium' },
    { domain: 'boldpath.net',     tld: 'net', category: 'lifestyle',  difficulty: 'medium' },
    { domain: 'frostforge.io',    tld: 'io',  category: 'tech',      difficulty: 'medium' },
    { domain: 'amberhive.com',    tld: 'com', category: 'business',  difficulty: 'medium' },
    { domain: 'goldenvault.net',  tld: 'net', category: 'finance',   difficulty: 'medium' },
    { domain: 'cobaltridge.io',   tld: 'io',  category: 'lifestyle', difficulty: 'medium' },
    { domain: 'lunarpeak.com',    tld: 'com', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'thundergate.net',  tld: 'net', category: 'tech',      difficulty: 'medium' },
    { domain: 'shadowgrove.io',   tld: 'io',  category: 'lifestyle', difficulty: 'medium' },
    { domain: 'calmbay.com',      tld: 'com', category: 'travel',    difficulty: 'medium' },
    { domain: 'ironedge.net',     tld: 'net', category: 'sports',    difficulty: 'medium' },
    { domain: 'velvetcove.io',    tld: 'io',  category: 'lifestyle', difficulty: 'medium' },
    { domain: 'crimsontide.com',  tld: 'com', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'silvernode.ai',    tld: 'ai',  category: 'tech',      difficulty: 'medium' },
    { domain: 'grandwire.com',    tld: 'com', category: 'tech',      difficulty: 'medium' },
    { domain: 'primebench.net',   tld: 'net', category: 'business',  difficulty: 'medium' },
    { domain: 'freshcreek.io',    tld: 'io',  category: 'lifestyle', difficulty: 'medium' },
    { domain: 'deepwall.com',     tld: 'com', category: 'home',      difficulty: 'medium' },
    { domain: 'openlake.net',     tld: 'net', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'cleanturn.io',     tld: 'io',  category: 'health',    difficulty: 'medium' },
    { domain: 'lushtrail.com',    tld: 'com', category: 'travel',    difficulty: 'medium' },
    { domain: 'boldreef.net',     tld: 'net', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'sparkhelm.io',     tld: 'io',  category: 'tech',      difficulty: 'medium' },
    { domain: 'swiftwood.com',    tld: 'com', category: 'home',      difficulty: 'medium' },
    { domain: 'jadewell.net',     tld: 'net', category: 'beauty',    difficulty: 'medium' },
  ],
  kid_friendly: [
    { domain: 'gigglecats.com',    tld: 'com', category: 'animals',   difficulty: 'easy' },
    { domain: 'wobbleworld.net',   tld: 'net', category: 'play',      difficulty: 'easy' },
    { domain: 'rainbowdino.io',    tld: 'io',  category: 'animals',   difficulty: 'easy' },
    { domain: 'sillybug.com',      tld: 'com', category: 'animals',   difficulty: 'easy' },
    { domain: 'candycastle.net',   tld: 'net', category: 'food',      difficulty: 'easy' },
    { domain: 'frostyjungle.io',   tld: 'io',  category: 'adventure', difficulty: 'easy' },
    { domain: 'jazzydance.com',    tld: 'com', category: 'play',      difficulty: 'easy' },
    { domain: 'funnypond.net',     tld: 'net', category: 'nature',    difficulty: 'easy' },
    { domain: 'twinklecamp.io',    tld: 'io',  category: 'adventure', difficulty: 'easy' },
    { domain: 'squigglefrogs.com', tld: 'com', category: 'animals',   difficulty: 'easy' },
    { domain: 'bumblehive.net',    tld: 'net', category: 'animals',   difficulty: 'easy' },
    { domain: 'peppy petal.io',    tld: 'io',  category: 'nature',    difficulty: 'easy' },
    { domain: 'zippyhill.com',     tld: 'com', category: 'adventure', difficulty: 'easy' },
    { domain: 'cuddlybeast.net',   tld: 'net', category: 'animals',   difficulty: 'easy' },
    { domain: 'glittermoon.io',    tld: 'io',  category: 'play',      difficulty: 'easy' },
    { domain: 'noodlefort.com',    tld: 'com', category: 'play',      difficulty: 'easy' },
    { domain: 'sunnygrove.net',    tld: 'net', category: 'nature',    difficulty: 'easy' },
    { domain: 'bubblyfrogs.io',    tld: 'io',  category: 'animals',   difficulty: 'easy' },
    { domain: 'dreamland.com',     tld: 'com', category: 'adventure', difficulty: 'easy' },
    { domain: 'wobblejam.net',     tld: 'net', category: 'play',      difficulty: 'easy' },
    { domain: 'fancybark.io',      tld: 'io',  category: 'animals',   difficulty: 'easy' },
    { domain: 'merrycloud.com',    tld: 'com', category: 'nature',    difficulty: 'easy' },
    { domain: 'gigglecub.net',     tld: 'net', category: 'animals',   difficulty: 'easy' },
    { domain: 'leafymonster.io',   tld: 'io',  category: 'play',      difficulty: 'easy' },
    { domain: 'cozycamp.com',      tld: 'com', category: 'adventure', difficulty: 'easy' },
  ],
  founder: [
    { domain: 'nexuslabs.io',     tld: 'io',  category: 'ai',          difficulty: 'medium' },
    { domain: 'pulsemetrics.com', tld: 'com', category: 'analytics',   difficulty: 'medium' },
    { domain: 'stackhub.ai',      tld: 'ai',  category: 'saas',        difficulty: 'medium' },
    { domain: 'launchbase.io',    tld: 'io',  category: 'startup',     difficulty: 'medium' },
    { domain: 'synccoud.com',     tld: 'com', category: 'infra',       difficulty: 'medium' },
    { domain: 'mergenode.ai',     tld: 'ai',  category: 'devtools',    difficulty: 'medium' },
    { domain: 'scalekit.io',      tld: 'io',  category: 'saas',        difficulty: 'medium' },
    { domain: 'trackhq.com',      tld: 'com', category: 'analytics',   difficulty: 'medium' },
    { domain: 'forgeworks.net',   tld: 'net', category: 'devtools',    difficulty: 'medium' },
    { domain: 'indexgrid.ai',     tld: 'ai',  category: 'ai',          difficulty: 'medium' },
    { domain: 'parsedash.io',     tld: 'io',  category: 'analytics',   difficulty: 'medium' },
    { domain: 'rendercloud.com',  tld: 'com', category: 'infra',       difficulty: 'medium' },
    { domain: 'batchlog.net',     tld: 'net', category: 'devtools',    difficulty: 'medium' },
    { domain: 'vertexmind.ai',    tld: 'ai',  category: 'ai',          difficulty: 'medium' },
    { domain: 'prismdata.io',     tld: 'io',  category: 'analytics',   difficulty: 'medium' },
    { domain: 'shiftwire.com',    tld: 'com', category: 'infra',       difficulty: 'medium' },
    { domain: 'routeledger.net',  tld: 'net', category: 'fintech',     difficulty: 'medium' },
    { domain: 'clonemesh.ai',     tld: 'ai',  category: 'devtools',    difficulty: 'medium' },
    { domain: 'deploypad.io',     tld: 'io',  category: 'devtools',    difficulty: 'medium' },
    { domain: 'graphorbit.com',   tld: 'com', category: 'analytics',   difficulty: 'medium' },
    { domain: 'triggerseed.net',  tld: 'net', category: 'saas',        difficulty: 'medium' },
    { domain: 'filtergate.ai',    tld: 'ai',  category: 'security',    difficulty: 'medium' },
    { domain: 'storescope.io',    tld: 'io',  category: 'saas',        difficulty: 'medium' },
    { domain: 'crawlzone.com',    tld: 'com', category: 'devtools',    difficulty: 'medium' },
    { domain: 'apexworks.net',    tld: 'net', category: 'startup',     difficulty: 'medium' },
  ],
  adult: [
    { domain: 'dirtyhub.com',      tld: 'com', category: 'adult',    difficulty: 'medium' },
    { domain: 'naughtybits.net',   tld: 'net', category: 'humor',    difficulty: 'medium' },
    { domain: 'kinkyzone.io',      tld: 'io',  category: 'adult',    difficulty: 'medium' },
    { domain: 'hornylair.com',     tld: 'com', category: 'dating',   difficulty: 'medium' },
    { domain: 'sexygroin.net',     tld: 'net', category: 'adult',    difficulty: 'medium' },
    { domain: 'filthyden.io',      tld: 'io',  category: 'adult',    difficulty: 'medium' },
    { domain: 'naughtynipples.com',tld: 'com', category: 'adult',    difficulty: 'medium' },
    { domain: 'spicytits.net',     tld: 'net', category: 'humor',    difficulty: 'medium' },
    { domain: 'raunchyballs.io',   tld: 'io',  category: 'humor',    difficulty: 'medium' },
    { domain: 'steamycock.com',    tld: 'com', category: 'adult',    difficulty: 'medium' },
    { domain: 'nastyhole.net',     tld: 'net', category: 'adult',    difficulty: 'medium' },
    { domain: 'lewdloins.io',      tld: 'io',  category: 'adult',    difficulty: 'medium' },
    { domain: 'wetpussy.com',      tld: 'com', category: 'adult',    difficulty: 'medium' },
    { domain: 'roughrear.net',     tld: 'net', category: 'adult',    difficulty: 'medium' },
    { domain: 'juicyboobs.io',     tld: 'io',  category: 'adult',    difficulty: 'medium' },
    { domain: 'hungcock.com',      tld: 'com', category: 'adult',    difficulty: 'medium' },
    { domain: 'throbdick.net',     tld: 'net', category: 'adult',    difficulty: 'medium' },
    { domain: 'tightass.io',       tld: 'io',  category: 'adult',    difficulty: 'medium' },
    { domain: 'saucyhips.com',     tld: 'com', category: 'humor',    difficulty: 'medium' },
    { domain: 'wickedpole.net',    tld: 'net', category: 'adult',    difficulty: 'medium' },
    { domain: 'nakedpit.io',       tld: 'io',  category: 'adult',    difficulty: 'medium' },
    { domain: 'taboostick.com',    tld: 'com', category: 'adult',    difficulty: 'medium' },
    { domain: 'creambuns.net',     tld: 'net', category: 'humor',    difficulty: 'medium' },
    { domain: 'sloppy shaft.io',   tld: 'io',  category: 'adult',    difficulty: 'medium' },
    { domain: 'lustyclub.com',     tld: 'com', category: 'nightlife', difficulty: 'medium' },
  ],
};

// ---------------------------------------------------------------------------
// Placeholder generation function — replace with real LLM call in production
// ---------------------------------------------------------------------------
async function generateForMode(
  mode: GameMode,
  count: number
): Promise<GeneratedDomain[]> {
  console.log(`[generate] Generating ${count} domain ideas for mode: ${mode}`);

  const bank = DOMAIN_BANKS[mode];
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length)).map((d) => ({
    ...d,
    mode,
    source: 'generated' as const,
  }));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const modeArg = args[args.indexOf('--mode') + 1] as GameMode | undefined;
  const countArg = parseInt(args[args.indexOf('--count') + 1] ?? '25', 10);

  const modes: GameMode[] = modeArg
    ? [modeArg]
    : ['regular', 'kid_friendly', 'founder', 'adult'];

  const results: GeneratedDomain[] = [];

  for (const mode of modes) {
    const generated = await generateForMode(mode, countArg);
    results.push(...generated);
    console.log(`[generate] ✓ ${generated.length} domains for "${mode}"`);
  }

  const outPath = path.join(process.cwd(), 'generated-domains.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\n[generate] Wrote ${results.length} domains to generated-domains.json`);
  console.log('[generate] Next step: npm run check-availability');
}

main().catch((err) => {
  console.error('[generate] Fatal error:', err);
  process.exit(1);
});
