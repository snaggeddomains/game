/**
 * Syncs recent home sales for South Orange, NJ from NJ Treasury SR1A records.
 *
 * NJ Division of Taxation publishes deed transfer (SR1A) data as quarterly
 * Excel files per county. This script downloads the Essex County file,
 * filters for South Orange residential sales, and upserts into Supabase.
 *
 * Data URL pattern (verify/update at https://www.nj.gov/treasury/taxation/lpt/):
 *   https://www.nj.gov/treasury/taxation/lpt/Essex{YEAR}Q{1-4}.xlsx
 *
 * Required env vars:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   NJ_SR1A_URL  (optional override — uses current quarter by default)
 *
 * Usage:
 *   node scripts/sync-nj-sales.mjs
 *   NJ_SR1A_URL=https://... node scripts/sync-nj-sales.mjs
 */

import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// South Orange identifiers
const SO_ZIP = '07079';
const SO_CITY_VARIANTS = ['SOUTH ORANGE', 'S ORANGE', 'SO ORANGE', 'S. ORANGE'];

// NJ residential property class codes
const RESI_CLASSES = new Set(['2', '15C', '15D', '15F']);

// Property class → human label
const CLASS_LABEL = {
  '2': 'Single Family',
  '15C': 'Condo',
  '15D': 'Townhouse',
  '15F': 'Multi-Family',
};

function getPreviousQuarterUrl() {
  const now = new Date();
  let year = now.getFullYear();
  let quarter = Math.ceil((now.getMonth() + 1) / 3);
  // SR1A data lags ~60 days, so always use previous quarter
  if (quarter === 1) {
    quarter = 4;
    year -= 1;
  } else {
    quarter -= 1;
  }
  return `https://www.nj.gov/treasury/taxation/lpt/Essex${year}Q${quarter}.xlsx`;
}

function normalizeString(val) {
  return String(val ?? '').trim().toUpperCase();
}

function toDateString(val) {
  if (!val) return null;
  if (val instanceof Date) return val.toISOString().split('T')[0];
  const s = String(val).trim();
  // Handle MM/DD/YYYY
  const mmddyyyy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (mmddyyyy) {
    const [, m, d, y] = mmddyyyy;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  return s || null;
}

function parsePrice(val) {
  const n = Number(String(val ?? '').replace(/[^0-9.]/g, ''));
  return isNaN(n) ? 0 : Math.round(n);
}

// Try multiple column name variants (NJ Treasury has changed formats over time)
function getCol(row, ...keys) {
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== '') return row[k];
  }
  return '';
}

async function run() {
  const url = process.env.NJ_SR1A_URL || getPreviousQuarterUrl();

  console.log(`\nFetching NJ SR1A data: ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch SR1A data: HTTP ${res.status}\n` +
      `URL: ${url}\n` +
      `Check https://www.nj.gov/treasury/taxation/lpt/ for the current file name.`
    );
  }

  const buffer = await res.arrayBuffer();
  const wb = XLSX.read(new Uint8Array(buffer), { type: 'array', cellDates: true });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

  console.log(`  Total rows in file: ${rows.length}`);

  // Filter for South Orange residential sales above $50k
  const soSales = rows.filter(row => {
    const zip = String(getCol(row, 'ZIP CODE', 'Zip Code', 'ZIP', 'Zip')).replace(/\D/g, '').slice(0, 5);
    const city = normalizeString(getCol(row, 'CITY', 'City', 'MUNICIPALITY', 'Municipality'));
    const cls = normalizeString(getCol(row, 'PROPERTY CLASS', 'Class', 'PROP CLASS', 'PropClass'));
    const price = parsePrice(getCol(row, 'SALE PRICE', 'Sale Price', 'SALEPRICE', 'SalePrice'));

    const isSO = zip === SO_ZIP || SO_CITY_VARIANTS.some(v => city.includes(v));
    const isResi = RESI_CLASSES.has(cls);
    const isRealSale = price >= 50000;

    return isSO && isResi && isRealSale;
  });

  console.log(`  South Orange residential sales: ${soSales.length}`);

  const sales = soSales.map(row => {
    const locRaw = normalizeString(
      getCol(row, 'PROPERTY LOCATION', 'Property Location', 'ADDRESS', 'Address', 'LOCATION')
    );
    if (!locRaw) return null;

    const address = `${titleCase(locRaw)}, South Orange, NJ 07079`;
    const saleDate = toDateString(
      getCol(row, 'SALE DATE', 'Sale Date', 'SALEDATE', 'SaleDate', 'DATE OF SALE')
    );
    const cls = normalizeString(getCol(row, 'PROPERTY CLASS', 'Class', 'PROP CLASS'));
    const salePrice = parsePrice(
      getCol(row, 'SALE PRICE', 'Sale Price', 'SALEPRICE')
    );

    if (!saleDate || !salePrice) return null;

    const id = `nj-${address.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${saleDate}`;

    return {
      id,
      address,
      sale_price: salePrice,
      list_price: null,
      sale_date: saleDate,
      listed_date: null,
      beds: null,
      baths: null,
      sqft: null,
      description: null,
      property_type: CLASS_LABEL[cls] ?? 'Residential',
      property_class: cls,
      neighborhood: null,
      offers: null,
      source: 'nj-treasury',
    };
  }).filter(Boolean);

  console.log(`  Records to upsert: ${sales.length}`);

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Dev fallback: write to a local JSON file for inspection
    const out = join(__dirname, '..', 'app', 'guides', 'real-estate', 'auto-sales-data.json');
    writeFileSync(out, JSON.stringify(sales, null, 2));
    console.log(`  No Supabase env vars — wrote ${sales.length} records to ${out}`);
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase
    .from('so_recent_sales')
    .upsert(sales, { onConflict: 'id', ignoreDuplicates: false });

  if (error) throw new Error(`Supabase upsert failed: ${error.message}`);
  console.log(`  Upserted ${sales.length} records into so_recent_sales ✓\n`);
}

function titleCase(str) {
  return str
    .toLowerCase()
    .replace(/\b(\w)/g, (_, c) => c.toUpperCase())
    .replace(/\b(Ne|Nw|Se|Sw)\b/g, m => m.toUpperCase());
}

run().catch(err => {
  console.error('\n❌ sync-nj-sales failed:', err.message);
  process.exit(1);
});
