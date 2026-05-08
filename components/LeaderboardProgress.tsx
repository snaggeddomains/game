'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export const GAMES_TO_QUALIFY = 10;
export const LS_GAMES_KEY = 'lbGamesPlayed';
export const LS_PLAYER_KEY = 'lbPlayerId';

export default function LeaderboardProgress() {
  const [gamesPlayed, setGamesPlayed] = useState<number | null>(null);

  useEffect(() => {
    const playerId = localStorage.getItem(LS_PLAYER_KEY);
    if (!playerId) return;
    const count = parseInt(localStorage.getItem(LS_GAMES_KEY) ?? '0', 10);
    setGamesPlayed(count);
  }, []);

  if (gamesPlayed === null) return null;

  const remaining = Math.max(0, GAMES_TO_QUALIFY - gamesPlayed);
  const qualified = remaining === 0;

  if (qualified) {
    return (
      <div className="mb-6 flex items-center gap-3 rounded-2xl border-2 border-brand-teal bg-brand-teal/10 px-5 py-4">
        <span className="text-2xl">🏆</span>
        <div>
          <p className="font-bold text-brand-navy">You&rsquo;re on the leaderboard!</p>
          <p className="text-sm text-brand-navy/60">
            Your scores are counting toward the rankings.{' '}
            <Link href="/leaderboard" className="font-semibold text-brand-teal hover:underline">
              View leaderboard →
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const pct = Math.round((gamesPlayed / GAMES_TO_QUALIFY) * 100);

  return (
    <div className="mb-6 rounded-2xl border-2 border-game-border bg-white px-5 py-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-bold text-brand-navy">
          {remaining === 1
            ? '1 more game to qualify!'
            : `${remaining} more games to qualify for the leaderboard`}
        </p>
        <span className="text-xs font-semibold text-brand-navy/40">
          {gamesPlayed}/{GAMES_TO_QUALIFY}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-game-border">
        <div
          className="h-full rounded-full bg-brand-teal transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
