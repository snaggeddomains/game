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
// Placeholder domain banks per mode
// Replace the arrays below with real LLM-generated output, or replace the
// generateForMode() function with an actual API call.
// ---------------------------------------------------------------------------

const DOMAIN_BANKS: Record<GameMode, Array<Omit<GeneratedDomain, 'mode' | 'source'>>> = {
  regular: [
    // Clearly invented / very likely available
    { domain: 'breezeloop.com', tld: 'com', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'foxpaw.io', tld: 'io', category: 'tech', difficulty: 'medium' },
    { domain: 'stacknest.co', tld: 'co', category: 'tech', difficulty: 'medium' },
    { domain: 'grumpychef.com', tld: 'com', category: 'food', difficulty: 'easy' },
    { domain: 'lunarbrew.co', tld: 'co', category: 'food', difficulty: 'medium' },
    { domain: 'driftlab.io', tld: 'io', category: 'tech', difficulty: 'medium' },
    { domain: 'pebblepath.com', tld: 'com', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'cloudcatch.co', tld: 'co', category: 'tech', difficulty: 'medium' },
    { domain: 'velvetjar.io', tld: 'io', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'noodlecraft.com', tld: 'com', category: 'food', difficulty: 'easy' },
    { domain: 'frostwave.co', tld: 'co', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'sparkroot.io', tld: 'io', category: 'tech', difficulty: 'medium' },
    { domain: 'groveside.com', tld: 'com', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'wispcloud.co', tld: 'co', category: 'tech', difficulty: 'medium' },
    { domain: 'tumbleberry.io', tld: 'io', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'sizzleworks.com', tld: 'com', category: 'food', difficulty: 'medium' },
    { domain: 'patchworkco.com', tld: 'com', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'dawncraft.io', tld: 'io', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'cobaltden.com', tld: 'com', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'windfall.co', tld: 'co', category: 'finance', difficulty: 'hard' },
    { domain: 'emberpath.io', tld: 'io', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'sproutlabs.com', tld: 'com', category: 'tech', difficulty: 'medium' },
    { domain: 'glowcraft.co', tld: 'co', category: 'beauty', difficulty: 'medium' },
    { domain: 'hazelbrook.io', tld: 'io', category: 'lifestyle', difficulty: 'medium' },
    { domain: 'maplegate.com', tld: 'com', category: 'lifestyle', difficulty: 'medium' },
  ],
  kid_friendly: [
    { domain: 'gigglepaws.com', tld: 'com', category: 'animals', difficulty: 'easy' },
    { domain: 'wobbleworld.co', tld: 'co', category: 'play', difficulty: 'easy' },
    { domain: 'snugglebug.io', tld: 'io', category: 'animals', difficulty: 'easy' },
    { domain: 'rainbowslime.com', tld: 'com', category: 'play', difficulty: 'easy' },
    { domain: 'funnyfarm.co', tld: 'co', category: 'animals', difficulty: 'easy' },
    { domain: 'jellycastle.net', tld: 'net', category: 'play', difficulty: 'easy' },
    { domain: 'sparklequest.com', tld: 'com', category: 'adventure', difficulty: 'easy' },
    { domain: 'sillybucket.co', tld: 'co', category: 'play', difficulty: 'easy' },
    { domain: 'fluffydino.io', tld: 'io', category: 'animals', difficulty: 'easy' },
    { domain: 'candycloud.net', tld: 'net', category: 'food', difficulty: 'easy' },
    { domain: 'bananajump.com', tld: 'com', category: 'play', difficulty: 'easy' },
    { domain: 'wiggletoes.co', tld: 'co', category: 'play', difficulty: 'easy' },
    { domain: 'doodlebeast.io', tld: 'io', category: 'animals', difficulty: 'easy' },
    { domain: 'sneezycat.com', tld: 'com', category: 'animals', difficulty: 'easy' },
    { domain: 'bouncyfrogs.co', tld: 'co', category: 'animals', difficulty: 'easy' },
    { domain: 'gigglestorm.io', tld: 'io', category: 'play', difficulty: 'medium' },
    { domain: 'wobblejelly.net', tld: 'net', category: 'food', difficulty: 'easy' },
    { domain: 'puddlejump.com', tld: 'com', category: 'play', difficulty: 'easy' },
    { domain: 'ticklemonster.co', tld: 'co', category: 'play', difficulty: 'easy' },
    { domain: 'fizzypops.io', tld: 'io', category: 'food', difficulty: 'easy' },
    { domain: 'happysnorts.com', tld: 'com', category: 'play', difficulty: 'easy' },
    { domain: 'bumbleboo.co', tld: 'co', category: 'animals', difficulty: 'easy' },
    { domain: 'glitterslug.io', tld: 'io', category: 'animals', difficulty: 'easy' },
    { domain: 'squigglebug.com', tld: 'com', category: 'animals', difficulty: 'easy' },
    { domain: 'noodledance.co', tld: 'co', category: 'play', difficulty: 'easy' },
  ],
  founder: [
    { domain: 'nexara.io', tld: 'io', category: 'ai', difficulty: 'medium' },
    { domain: 'luminar.ai', tld: 'ai', category: 'ai', difficulty: 'hard' },
    { domain: 'vantix.co', tld: 'co', category: 'saas', difficulty: 'medium' },
    { domain: 'klaaro.com', tld: 'com', category: 'saas', difficulty: 'medium' },
    { domain: 'synaptiq.ai', tld: 'ai', category: 'ai', difficulty: 'medium' },
    { domain: 'floware.co', tld: 'co', category: 'productivity', difficulty: 'medium' },
    { domain: 'orbitly.io', tld: 'io', category: 'saas', difficulty: 'medium' },
    { domain: 'cruxai.com', tld: 'com', category: 'ai', difficulty: 'medium' },
    { domain: 'sprintly.io', tld: 'io', category: 'productivity', difficulty: 'hard' },
    { domain: 'nexflow.ai', tld: 'ai', category: 'ai', difficulty: 'medium' },
    { domain: 'datasync.co', tld: 'co', category: 'saas', difficulty: 'medium' },
    { domain: 'lumenos.io', tld: 'io', category: 'ai', difficulty: 'medium' },
    { domain: 'stackvault.com', tld: 'com', category: 'saas', difficulty: 'medium' },
    { domain: 'buildfast.co', tld: 'co', category: 'productivity', difficulty: 'medium' },
    { domain: 'codewarp.io', tld: 'io', category: 'devtools', difficulty: 'medium' },
    { domain: 'pulsemetric.com', tld: 'com', category: 'analytics', difficulty: 'medium' },
    { domain: 'coreloop.co', tld: 'co', category: 'saas', difficulty: 'medium' },
    { domain: 'launchwave.io', tld: 'io', category: 'startup', difficulty: 'medium' },
    { domain: 'indexly.ai', tld: 'ai', category: 'ai', difficulty: 'medium' },
    { domain: 'trackvault.com', tld: 'com', category: 'analytics', difficulty: 'medium' },
    { domain: 'snapdash.co', tld: 'co', category: 'saas', difficulty: 'medium' },
    { domain: 'mergeflow.io', tld: 'io', category: 'devtools', difficulty: 'medium' },
    { domain: 'prismdata.com', tld: 'com', category: 'analytics', difficulty: 'medium' },
    { domain: 'autoscale.co', tld: 'co', category: 'infra', difficulty: 'hard' },
    { domain: 'cloudmint.io', tld: 'io', category: 'infra', difficulty: 'medium' },
  ],
  adult: [
    { domain: 'bawdybanter.co', tld: 'co', category: 'humor', difficulty: 'medium' },
    { domain: 'wickedwordplay.com', tld: 'com', category: 'humor', difficulty: 'medium' },
    { domain: 'dirtylaundryco.com', tld: 'com', category: 'humor', difficulty: 'easy' },
    { domain: 'saucyquiz.io', tld: 'io', category: 'games', difficulty: 'medium' },
    { domain: 'naughtyknowledge.co', tld: 'co', category: 'humor', difficulty: 'medium' },
    { domain: 'riskybiz.fun', tld: 'fun', category: 'humor', difficulty: 'medium' },
    { domain: 'cheekymatches.io', tld: 'io', category: 'dating', difficulty: 'medium' },
    { domain: 'racyriddles.com', tld: 'com', category: 'games', difficulty: 'medium' },
    { domain: 'spicyswipes.co', tld: 'co', category: 'dating', difficulty: 'medium' },
    { domain: 'hotshots.io', tld: 'io', category: 'nightlife', difficulty: 'medium' },
    { domain: 'tipsy.fun', tld: 'fun', category: 'nightlife', difficulty: 'hard' },
    { domain: 'friskyfinds.com', tld: 'com', category: 'dating', difficulty: 'medium' },
    { domain: 'edgyemoji.co', tld: 'co', category: 'humor', difficulty: 'medium' },
    { domain: 'afterhours.fun', tld: 'fun', category: 'nightlife', difficulty: 'hard' },
    { domain: 'adultquiz.io', tld: 'io', category: 'games', difficulty: 'medium' },
    { domain: 'nightowl.fun', tld: 'fun', category: 'nightlife', difficulty: 'medium' },
    { domain: 'barscene.co', tld: 'co', category: 'nightlife', difficulty: 'medium' },
    { domain: 'taboo.fun', tld: 'fun', category: 'humor', difficulty: 'hard' },
    { domain: 'kinkster.io', tld: 'io', category: 'dating', difficulty: 'medium' },
    { domain: 'naughtynerd.io', tld: 'io', category: 'humor', difficulty: 'medium' },
    { domain: 'wildcard.fun', tld: 'fun', category: 'humor', difficulty: 'hard' },
    { domain: 'dirtyjokes.co', tld: 'co', category: 'humor', difficulty: 'medium' },
    { domain: 'smuttysquiz.co', tld: 'co', category: 'games', difficulty: 'medium' },
    { domain: 'badinflunce.com', tld: 'com', category: 'humor', difficulty: 'medium' },
    { domain: 'hotpocket.fun', tld: 'fun', category: 'humor', difficulty: 'medium' },
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

  // TODO: Replace with a real LLM call, e.g.:
  // const response = await anthropic.messages.create({
  //   model: 'claude-opus-4-7',
  //   max_tokens: 1024,
  //   messages: [{ role: 'user', content: buildPrompt(mode, count) }],
  // });

  const bank = DOMAIN_BANKS[mode];
  const shuffled = bank.sort(() => Math.random() - 0.5);
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
