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
import type { GameMode } from '../lib/types';

interface GeneratedDomain {
  domain: string;
  tld: string;
  mode: GameMode;
  category: string;
  source: 'generated';
}

// ---------------------------------------------------------------------------
// Sample domain banks per mode — two-word combos, prefixes, and suffixes
// Replace generateForMode() with a real LLM call for production use.
// ---------------------------------------------------------------------------

const DOMAIN_BANKS: Record<GameMode, Array<Omit<GeneratedDomain, 'mode' | 'source'>>> = {
  regular: [
  ],
  kid_friendly: [
  ],
  founder: [
  ],
  adult: [
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
