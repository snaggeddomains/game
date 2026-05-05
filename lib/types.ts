export type GameMode = 'regular' | 'kid_friendly' | 'adult';
export type AvailabilityStatus = 'available' | 'taken' | 'unknown';
export type GamePhase = 'mode-select' | 'loading' | 'playing' | 'reveal' | 'complete';

export interface Domain {
  id: string;
  domain: string;
  tld: string;
  mode: GameMode;
  category: string | null;
  availability_status: AvailabilityStatus;
  registered_at: string | null;
  last_checked_at: string | null;
  source: string | null;
  times_shown: number;
  correct_guess_rate: number | null;
  created_at: string;
  updated_at: string;
}

export interface RoundResult {
  domain: Domain;
  player_guess: AvailabilityStatus;
  correct: boolean;
  points: number;
}

export interface GameState {
  phase: GamePhase;
  mode: GameMode | null;
  domains: Domain[];
  currentIndex: number;
  rounds: RoundResult[];
  score: number;
  streak: number;
  maxStreak: number;
  lastCorrect: boolean | null;
}

export const TOTAL_ROUNDS = 10;
export const POINTS_PER_CORRECT = 10;

export const MODE_CONFIG: Record<
  GameMode,
  { label: string; emoji: string; description: string; color: string }
> = {
  regular: {
    label: 'Regular',
    emoji: '🌐',
    description: 'Broad, fun, generally safe domains anyone would recognize.',
    color: 'from-blue-600 to-blue-800',
  },
  kid_friendly: {
    label: 'Kid Friendly',
    emoji: '🦄',
    description: 'Silly, safe, family-friendly names. Perfect for all ages.',
    color: 'from-purple-600 to-pink-700',
  },
  adult: {
    label: 'Adult Mode',
    emoji: '🔞',
    description: 'Edgy humor, dating, nightlife, and spicy language. 18+ only.',
    color: 'from-rose-700 to-red-900',
  },
};

export function namecheapUrl(domain: string): string {
  const dest = `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(domain)}`;
  return `https://namecheap.pxf.io/c/7258761/1632743/5618?u=${encodeURIComponent(dest)}`;
}
