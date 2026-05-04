/**
 * check-availability.ts
 *
 * Reads generated-domains.json (or a file you specify), checks availability
 * of each domain via RDAP (free, no API key required), and writes results to
 * checked-domains.json.
 *
 * RDAP: 404 = available, 200 = taken. Registration date comes from the
 * "registration" event in the response body.
 *
 * Usage:
 *   npm run check-availability
 *   npx tsx scripts/check-availability.ts --input generated-domains.json
 */

import * as fs from 'fs';
import * as path from 'path';
import type { AvailabilityStatus } from '../lib/types';

const RDAP_BASE = 'https://rdap.org/domain';
// Pause between requests to stay polite to the RDAP servers
const DELAY_MS = 300;

interface DomainRecord {
  domain: string;
  tld: string;
  mode: string;
  category: string;
  difficulty: string;
  source: string;
  availability_status?: AvailabilityStatus;
  last_checked_at?: string;
  registered_at?: string | null;
}

interface RdapResult {
  status: AvailabilityStatus;
  registeredAt: string | null;
}

async function checkDomain(domain: string): Promise<RdapResult> {
  try {
    const res = await fetch(`${RDAP_BASE}/${domain}`, {
      headers: { Accept: 'application/rdap+json' },
    });

    if (res.status === 404) {
      return { status: 'available', registeredAt: null };
    }

    if (!res.ok) {
      // Non-404 errors (5xx, rate limit, etc.) — treat as unknown
      console.warn(`[check] ${domain} → HTTP ${res.status}, marking unknown`);
      return { status: 'unknown', registeredAt: null };
    }

    const data = await res.json();
    const events: Array<{ eventAction: string; eventDate: string }> = data.events ?? [];
    const regEvent = events.find((e) => e.eventAction === 'registration');
    const registeredAt = regEvent?.eventDate ?? null;

    return { status: 'taken', registeredAt };
  } catch (err) {
    console.warn(`[check] ${domain} → network error: ${(err as Error).message}`);
    return { status: 'unknown', registeredAt: null };
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function checkBatch(
  domains: DomainRecord[],
  concurrency = 5
): Promise<DomainRecord[]> {
  const results: DomainRecord[] = [];

  for (let i = 0; i < domains.length; i += concurrency) {
    const batch = domains.slice(i, i + concurrency);
    const now = new Date().toISOString();

    const checked = await Promise.all(
      batch.map(async (d) => {
        const { status, registeredAt } = await checkDomain(d.domain);
        return {
          ...d,
          availability_status: status,
          last_checked_at: now,
          registered_at: registeredAt,
        };
      })
    );

    results.push(...checked);
    console.log(`[check] ${Math.min(i + concurrency, domains.length)} / ${domains.length} checked`);

    if (i + concurrency < domains.length) {
      await sleep(DELAY_MS);
    }
  }

  return results;
}

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
  console.log(`[check] Checking ${domains.length} domains via RDAP…`);

  const checked = await checkBatch(domains);

  const available = checked.filter((d) => d.availability_status === 'available').length;
  const taken = checked.filter((d) => d.availability_status === 'taken').length;
  const unknown = checked.filter((d) => d.availability_status === 'unknown').length;

  const outPath = path.join(process.cwd(), 'checked-domains.json');
  fs.writeFileSync(outPath, JSON.stringify(checked, null, 2));

  console.log(`\n[check] Results: ${available} available, ${taken} taken, ${unknown} unknown`);
  console.log(`[check] Wrote to checked-domains.json`);
  console.log('[check] Next step: npm run seed');
}

main().catch((err) => {
  console.error('[check] Fatal error:', err);
  process.exit(1);
});
