// Client-side bid increment logic — mirrors the DB function get_bid_increment().
// Used for UI display (showing the minimum next bid) before server validation.

export interface IncrementBand {
  minPrice: number;
  maxPrice: number | null;
  increment: number;
}

export const DEFAULT_INCREMENT_SCHEDULE: IncrementBand[] = [
  { minPrice: 0,       maxPrice: 999.99,   increment: 50    },
  { minPrice: 1000,    maxPrice: 4999.99,  increment: 100   },
  { minPrice: 5000,    maxPrice: 9999.99,  increment: 250   },
  { minPrice: 10000,   maxPrice: 24999.99, increment: 500   },
  { minPrice: 25000,   maxPrice: 49999.99, increment: 1000  },
  { minPrice: 50000,   maxPrice: 99999.99, increment: 2500  },
  { minPrice: 100000,  maxPrice: null,     increment: 5000  },
];

export function getBidIncrement(
  currentPrice: number,
  schedule: IncrementBand[] = DEFAULT_INCREMENT_SCHEDULE
): number {
  const band = schedule.find(
    (b) => currentPrice >= b.minPrice && (b.maxPrice === null || currentPrice <= b.maxPrice)
  );
  return band?.increment ?? 100;
}

export function getMinNextBid(
  currentBid: number | null,
  startingBid: number,
  schedule?: IncrementBand[]
): number {
  if (currentBid === null) return startingBid;
  return currentBid + getBidIncrement(currentBid, schedule);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseCurrency(value: string): number | null {
  const cleaned = value.replace(/[$,\s]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}
