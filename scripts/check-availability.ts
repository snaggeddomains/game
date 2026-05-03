/**
 * check-availability.ts
 *
 * Pulls all "available" domains from Supabase, verifies each one via the
 * GoDaddy API, and writes the real status back to the database.
 *
 * Usage:
 *   npm run check-availability
 *   npx tsx scripts/check-availability.ts --mode founder
 *   npx tsx scripts/check-availability.ts --limit 100   # test run
 *   npx tsx scripts/check-availability.ts --dry-run
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL in .env.local
 *   - SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   - GODADDY_API_KEY in .env.local
 *   - GODADDY_API_SECRET in .env.local
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

    const body = await res.text();

    if (res.status === 429) {
      console.warn(`[check] Rate limited — waiting 2s before retry`);
      await new Promise((r) => setTimeout(r, 2000));
      return checkDomain(domain);
    }

    if (!res.ok) {
      console.warn(`[check] GoDaddy ${res.status} for ${domain} — body: ${body || '(empty)'}`);
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
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const modeIdx = args.indexOf('--mode');
  const modeArg = modeIdx !== -1 ? args[modeIdx + 1] : undefined;
  const limitIdx = args.indexOf('--limit');
  const limitArg = limitIdx !== -1 ? parseInt(args[limitIdx + 1] ?? '0', 10) : 0;
  const dryRun = args.includes('--dry-run');
  const concurrency = 5;
  const batchDelay = 250; // ms between batches

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[check] Missing Supabase env vars. Check .env.local.');
    process.exit(1);
  }

  // Fetch domains marked available (the ones we generated but haven't verified)
  let query = supabase
    .from('domains')
    .select('id, domain, mode')
    .eq('availability_status', 'available');

  if (modeArg) query = query.eq('mode', modeArg);
  if (limitArg > 0) query = query.limit(limitArg);

  const { data: domains, error } = await query;

  if (error) {
    console.error('[check] Failed to fetch domains:', error.message);
    process.exit(1);
  }

  console.log(`[check] ${domains.length} domains to verify${modeArg ? ` (mode: ${modeArg})` : ''}${dryRun ? ' [DRY RUN]' : ''}`);

  let available = 0;
  let taken = 0;
  let unknown = 0;
  let updated = 0;
  const now = new Date().toISOString();

  for (let i = 0; i < domains.length; i += concurrency) {
    const batch = domains.slice(i, i + concurrency);

    await Promise.all(
      batch.map(async (row) => {
        const status = await checkDomain(row.domain);

        if (status === 'available') available++;
        else if (status === 'taken') taken++;
        else unknown++;

        if (!dryRun) {
          const { error: updateError } = await supabase
            .from('domains')
            .update({ availability_status: status, last_checked_at: now })
            .eq('id', row.id);

          if (updateError) {
            console.warn(`[check] Failed to update ${row.domain}:`, updateError.message);
          } else {
            updated++;
          }
        }
      })
    );

    const done = Math.min(i + concurrency, domains.length);
    console.log(`[check] ${done} / ${domains.length} — available: ${available}, taken: ${taken}, unknown: ${unknown}`);
    await new Promise((r) => setTimeout(r, batchDelay));
  }

  console.log(`\n[check] Done. Available: ${available}, Taken: ${taken}, Unknown: ${unknown}`);
  if (!dryRun) console.log(`[check] Updated ${updated} records in Supabase.`);
}

main().catch((err) => {
  console.error('[check] Fatal error:', err);
  process.exit(1);
});
