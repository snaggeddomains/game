/**
 * check-availability.ts
 *
 * Reads generated-domains.json (or a file you specify), checks availability
 * of each domain via a placeholder DNS/WHOIS API, and writes the results to
 * checked-domains.json.
 *
 * Usage:
 *   npm run check-availability
 *   npx tsx scripts/check-availability.ts --input generated-domains.json
 *
 * In production, replace the `checkDomain` function with a real API call.
 * Recommended services:
 *   - Domainr API  (https://domainr.com/docs/api)
 *   - GoDaddy Domains API
 *   - Namecheap API
 *   - WhoisXML API
 *
 * Keep your API key in DOMAIN_CHECK_API_KEY env var (server-side only).
 */

import * as fs from 'fs';
import * as path from 'path';
import type { AvailabilityStatus } from '../lib/types';

interface DomainRecord {
  domain: string;
  tld: string;
  mode: string;
  category: string;
  difficulty: string;
  source: string;
  availability_status?: AvailabilityStatus;
  last_checked_at?: string;
}

// ---------------------------------------------------------------------------
// Placeholder availability checker
// Replace this function with a real API call in production.
// ---------------------------------------------------------------------------
async function checkDomain(domain: string): Promise<AvailabilityStatus> {
  // TODO: Replace with real domain availability check, e.g.:
  //
  // const apiKey = process.env.DOMAIN_CHECK_API_KEY;
  // const res = await fetch(
  //   `https://api.domainr.com/v2/status?domain=${domain}&client_id=${apiKey}`
  // );
  // const data = await res.json();
  // const status = data.status?.[0]?.summary;
  // if (status === 'inactive') return 'available';
  // if (status === 'active') return 'taken';
  // return 'unknown';

  // Placeholder: simulate a realistic check result based on well-known heuristics
  await new Promise((r) => setTimeout(r, 50)); // simulate network latency

  // Well-known brands → taken
  const knownTaken = new Set([
    'google.com', 'amazon.com', 'facebook.com', 'netflix.com', 'spotify.com',
    'twitter.com', 'youtube.com', 'reddit.com', 'instagram.com', 'tiktok.com',
    'uber.com', 'airbnb.com', 'snapchat.com', 'linkedin.com', 'pinterest.com',
    'twitch.tv', 'dropbox.com', 'zoom.us', 'slack.com', 'discord.com',
    'stripe.com', 'notion.com', 'figma.com', 'vercel.com', 'openai.com',
    'anthropic.com', 'github.com', 'gitlab.com', 'heroku.com', 'cloudflare.com',
    'roblox.com', 'minecraft.net', 'pokemon.com', 'pbskids.org', 'coolmathgames.com',
    'tinder.com', 'bumble.com', 'grindr.com', 'onlyfans.com', 'playboy.com',
    'match.com', 'okcupid.com', 'pof.com', 'zoosk.com', 'hinge.co',
    'airtable.com', 'webflow.com', 'segment.com', 'mixpanel.com', 'amplitude.com',
  ]);

  if (knownTaken.has(domain)) return 'taken';

  // Everything else from the generated banks is likely available
  // In production this should be a real API check
  return 'available';
}

// ---------------------------------------------------------------------------
// Rate-limited batch runner
// ---------------------------------------------------------------------------
async function checkBatch(
  domains: DomainRecord[],
  concurrency = 5
): Promise<DomainRecord[]> {
  const results: DomainRecord[] = [];
  const now = new Date().toISOString();

  for (let i = 0; i < domains.length; i += concurrency) {
    const batch = domains.slice(i, i + concurrency);
    const checked = await Promise.all(
      batch.map(async (d) => {
        const status = await checkDomain(d.domain);
        return {
          ...d,
          availability_status: status,
          last_checked_at: now,
        };
      })
    );
    results.push(...checked);
    console.log(`[check] ${Math.min(i + concurrency, domains.length)} / ${domains.length} checked`);
  }

  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const inputArg = args[args.indexOf('--input') + 1] ?? 'generated-domains.json';
  const inputPath = path.join(process.cwd(), inputArg);

  if (!fs.existsSync(inputPath)) {
    console.error(`[check] Input file not found: ${inputPath}`);
    console.error('[check] Run "npm run generate-domains" first.');
    process.exit(1);
  }

  const domains: DomainRecord[] = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  console.log(`[check] Checking availability for ${domains.length} domains…`);

  const checked = await checkBatch(domains);

  const available = checked.filter((d) => d.availability_status === 'available').length;
  const taken = checked.filter((d) => d.availability_status === 'taken').length;

  const outPath = path.join(process.cwd(), 'checked-domains.json');
  fs.writeFileSync(outPath, JSON.stringify(checked, null, 2));

  console.log(`\n[check] Results: ${available} available, ${taken} taken, ${checked.length - available - taken} unknown`);
  console.log(`[check] Wrote to checked-domains.json`);
  console.log('[check] Next step: npm run seed');
}

main().catch((err) => {
  console.error('[check] Fatal error:', err);
  process.exit(1);
});
