/**
 * check-availability.ts
 *
 * Pulls all domains with status 'unknown' (or 'available') from Supabase,
 * verifies each via GoDaddy, fetches RDAP registration date for taken domains,
 * and writes results back to the database.
 *
 * Usage:
 *   npm run check-availability
 *   npx tsx scripts/check-availability.ts --mode regular
 *   npx tsx scripts/check-availability.ts --limit 50
 *   npx tsx scripts/check-availability.ts --dry-run
 */

import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

// ---------------------------------------------------------------------------
// GoDaddy availability check
// ---------------------------------------------------------------------------
async function checkDomain(domain: string): Promise<'available' | 'taken' | 'unknown'> {
  const apiKey = process.env.GODADDY_API_KEY;
  const apiSecret = process.env.GODADDY_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('Missing GODADDY_API_KEY or GODADDY_API_SECRET in .env.local');
  }

  const url = `https://api.godaddy.com/v1/domains/available?domain=${encodeURIComponent(domain)}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `sso-key ${apiKey}:${apiSecret}`,
        Accept: 'application/json',
      },
    });

    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 2000));
      return checkDomain(domain);
    }

    const body = await res.text();
    if (!res.ok) {
      console.warn(`[check] GoDaddy ${res.status} for ${domain}: ${body}`);
      return 'unknown';
    }

    const data = JSON.parse(body);
    return data.available === true ? 'available' : 'taken';
  } catch (err) {
    console.warn(`[check] Network error for ${domain}:`, err);
    return 'unknown';
  }
}

// ---------------------------------------------------------------------------
// RDAP registration date lookup (for taken domains)
// ---------------------------------------------------------------------------
async function fetchWhoisCreated(domain: string): Promise<string | null> {
  try {
    const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const events: Array<{ eventAction: string; eventDate: string }> = data.events ?? [];
    const reg = events.find((e) => e.eventAction === 'registration');
    if (!reg?.eventDate) return null;
    return reg.eventDate.slice(0, 10);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const modeIdx = args.indexOf('--mode');
  const modeArg = modeIdx !== -1 ? args[modeIdx + 1] : undefined;
  const limitIdx = args.indexOf('--limit');
  const limitArg = limitIdx !== -1 ? parseInt(args[limitIdx + 1] ?? '0', 10) : 0;
  const dryRun = args.includes('--dry-run');
  const fillDates = args.includes('--fill-dates'); // backfill registered_at for taken domains missing it
  const concurrency = 5;
  const batchDelay = 300;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[check] Missing Supabase env vars.');
    process.exit(1);
  }

  let query = supabase
    .from('game_domains')
    .select('id, domain, mode');

  if (fillDates) {
    // Only re-check taken domains that are missing a registration date
    query = query.eq('availability_status', 'taken').is('registered_at', null);
  } else {
    // Default: check unknown + available
    query = query.in('availability_status', ['unknown', 'available']);
  }

  if (modeArg) query = query.eq('mode', modeArg);
  if (limitArg > 0) query = query.limit(limitArg);

  const { data: domains, error } = await query;

  if (error) {
    console.error('[check] Failed to fetch domains:', error.message);
    process.exit(1);
  }

  console.log(
    `[check] ${domains.length} domains to verify` +
    (modeArg ? ` (mode: ${modeArg})` : '') +
    (dryRun ? ' [DRY RUN]' : '')
  );

  let available = 0;
  let taken = 0;
  let unknown = 0;
  let updated = 0;
  const now = new Date().toISOString();

  for (let i = 0; i < domains.length; i += concurrency) {
    const batch = domains.slice(i, i + concurrency);

    await Promise.all(
      batch.map(async (row) => {
        const tld = row.domain.split('.').pop() ?? '';

        let status: 'available' | 'taken' | 'unknown';
        let whoisCreated: string | null = null;

        if (fillDates) {
          // Domain is already confirmed taken — just fetch the missing date
          status = 'taken';
          whoisCreated = await fetchWhoisCreated(row.domain);
          taken++;
        } else {
          status = await checkDomain(row.domain);
          if (status === 'taken') whoisCreated = await fetchWhoisCreated(row.domain);
          if (status === 'available') available++;
          else if (status === 'taken') taken++;
          else unknown++;
        }

        if (!dryRun) {
          const update: Record<string, unknown> = {
            tld,
            availability_status: status,
            last_checked_at: now,
          };
          if (status === 'taken') {
            update.registered_at = whoisCreated;
          }

          const { error: updateError } = await supabase
            .from('game_domains')
            .update(update)
            .eq('id', row.id);

          if (updateError) {
            console.warn(`[check] Failed to update ${row.domain}:`, updateError.message);
          } else {
            updated++;
            if (status === 'taken' && whoisCreated) {
              console.log(`  ✓ ${row.domain} — taken (registered ${whoisCreated})`);
            }
          }
        }
      })
    );

    const done = Math.min(i + concurrency, domains.length);
    process.stdout.write(
      `\r[check] ${done} / ${domains.length} — available: ${available}, taken: ${taken}, unknown: ${unknown}   `
    );
    await new Promise((r) => setTimeout(r, batchDelay));
  }

  console.log(`\n[check] Done. Available: ${available}, Taken: ${taken}, Unknown: ${unknown}`);
  if (!dryRun) console.log(`[check] Updated ${updated} records in Supabase.`);
}

main().catch((err) => {
  console.error('[check] Fatal error:', err);
  process.exit(1);
});
