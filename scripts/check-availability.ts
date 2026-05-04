/**
 * check-availability.ts
 *
 * Queries Supabase for domains with availability_status = 'unknown', checks
 * each via RDAP (free, no API key), then updates the records in place.
 *
 * RDAP: 404 = available, 200 = taken. Registration date comes from the
 * "registration" event in the response body.
 *
 * Usage:
 *   npm run check-availability
 *   npm run check-availability -- --all        # re-check every domain
 *   npm run check-availability -- --mode founder
 */

import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';

const RDAP_BASE = 'https://rdap.org/domain';
const DELAY_MS = 200;
const CONCURRENCY = 10;
const PAGE_SIZE = 1000;

interface DomainRow {
  id: string;
  domain: string;
}

interface RdapResult {
  status: 'available' | 'taken' | 'unknown';
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
      console.warn(`  ${domain} → HTTP ${res.status}, marking unknown`);
      return { status: 'unknown', registeredAt: null };
    }

    const data = await res.json();
    const events: Array<{ eventAction: string; eventDate: string }> = data.events ?? [];
    const regEvent = events.find((e) => e.eventAction === 'registration');

    return { status: 'taken', registeredAt: regEvent?.eventDate ?? null };
  } catch (err) {
    console.warn(`  ${domain} → network error: ${(err as Error).message}`);
    return { status: 'unknown', registeredAt: null };
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = process.argv.slice(2);
  const checkAll = args.includes('--all');
  const modeIndex = args.indexOf('--mode');
  const modeArg = modeIndex !== -1 ? args[modeIndex + 1] : null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('[check] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  // Paginate through all rows — Supabase caps each response at 1000
  const rows: DomainRow[] = [];
  let from = 0;
  while (true) {
    let query = supabase.from('domains').select('id, domain').range(from, from + PAGE_SIZE - 1);
    if (!checkAll) query = query.eq('availability_status', 'unknown');
    if (modeArg) query = query.eq('mode', modeArg);

    const { data, error } = await query;
    if (error) {
      console.error('[check] Failed to fetch domains:', error.message);
      process.exit(1);
    }
    rows.push(...((data ?? []) as DomainRow[]));
    if (!data || data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  console.log(`[check] ${rows.length} domains to verify${checkAll ? ' (--all)' : ''}${modeArg ? ` in mode "${modeArg}"` : ''}`);

  if (rows.length === 0) {
    console.log('[check] Nothing to do. Use --all to re-check already-checked domains.');
    return;
  }

  let available = 0, taken = 0, unknown = 0;

  for (let i = 0; i < rows.length; i += CONCURRENCY) {
    const batch = rows.slice(i, i + CONCURRENCY);
    const now = new Date().toISOString();

    await Promise.all(
      batch.map(async (row) => {
        const { status, registeredAt } = await checkDomain(row.domain);

        const { error: updateError } = await supabase
          .from('domains')
          .update({
            availability_status: status,
            last_checked_at: now,
            registered_at: registeredAt,
          })
          .eq('id', row.id);

        if (updateError) {
          console.warn(`  ${row.domain} → update failed: ${updateError.message}`);
        } else {
          if (status === 'available') available++;
          else if (status === 'taken') taken++;
          else unknown++;
          console.log(`  ${row.domain} → ${status}${registeredAt ? ` (registered ${registeredAt.slice(0, 10)})` : ''}`);
        }
      })
    );

    if (i + CONCURRENCY < rows.length) await sleep(DELAY_MS);
  }

  console.log(`\n[check] Done. Available: ${available}, Taken: ${taken}, Unknown: ${unknown}`);
  console.log('[check] Updated', available + taken, 'records in Supabase.');
}

main().catch((err) => {
  console.error('[check] Fatal error:', err);
  process.exit(1);
});
