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
  const apiKey = process.env.GODADDY_API_KEY;
  const apiSecret = process.env.GODADDY_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('GODADDY_API_KEY and GODADDY_API_SECRET must be set in .env.local');
  }

  const res = await fetch(
    `https://api.godaddy.com/v1/domains/available?domain=${encodeURIComponent(domain)}`,
    {
      headers: {
        Authorization: `sso-key ${apiKey}:${apiSecret}`,
        Accept: 'application/json',
      },
    }
  );

  if (!res.ok) {
    console.warn(`[check] GoDaddy API error for ${domain}: ${res.status} ${res.statusText}`);
    return 'unknown';
  }

  const data = await res.json();
  return data.available === true ? 'available' : 'taken';
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
