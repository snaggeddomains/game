'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SnaggedLogo from '@/components/SnaggedLogo';

interface Player {
  rank: number;
  display_name: string;
  avg_accuracy: string;
  games_played: number;
  total_answers: number;
  best_score: number;
  best_streak: number;
}

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setPlayers(data.players);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-game-bg">
      {/* Header */}
      <div className="bg-brand-salmon px-4 pb-10 pt-8 text-center">
        <SnaggedLogo size="sm" className="mb-4 justify-center" />
        <h1
          className="text-5xl uppercase leading-none tracking-tight text-brand-navy"
          style={{ fontFamily: "'Anton', Impact, sans-serif" }}
        >
          Leaderboard
        </h1>
        <p className="mt-2 text-sm font-medium text-brand-navy/60">
          Top players ranked by accuracy &mdash; 100 answers minimum to qualify
        </p>

        {/* Wave */}
        <div className="relative mt-8 -mb-px">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block h-10 w-full">
            <path d="M0 20 Q180 0 360 20 Q540 40 720 20 Q900 0 1080 20 Q1260 40 1440 20 L1440 40 L0 40 Z" fill="#FAF3EC" />
          </svg>
        </div>
      </div>

      <main className="mx-auto w-full max-w-2xl px-4 py-8">
        {loading && (
          <div className="py-16 text-center text-brand-navy/40 font-medium">Loading…</div>
        )}

        {error && (
          <div className="py-16 text-center text-red-500 font-medium">{error}</div>
        )}

        {!loading && !error && players.length === 0 && (
          <div className="rounded-2xl border-2 border-game-border bg-white px-6 py-12 text-center">
            <div className="mb-3 text-5xl">🎣</div>
            <p className="font-bold text-brand-navy">No one on the board yet.</p>
            <p className="mt-1 text-sm text-brand-navy/60">
              Play 10 sessions and join the leaderboard to be first!
            </p>
          </div>
        )}

        {!loading && !error && players.length > 0 && (
          <div className="overflow-hidden rounded-2xl border-2 border-game-border bg-white">
            {/* Table header */}
            <div className="grid grid-cols-[40px_1fr_80px_70px_70px] gap-2 border-b-2 border-game-border bg-brand-navy px-4 py-3 text-xs font-bold uppercase tracking-wider text-white/70">
              <div>#</div>
              <div>Player</div>
              <div className="text-right">Accuracy</div>
              <div className="text-right">Games</div>
              <div className="text-right">Answers</div>
            </div>

            {players.map((p, i) => (
              <div
                key={p.rank}
                className={`grid grid-cols-[40px_1fr_80px_70px_70px] gap-2 px-4 py-3 text-sm ${
                  i < players.length - 1 ? 'border-b border-game-border' : ''
                } ${i === 0 ? 'bg-brand-coral/5' : ''}`}
              >
                <div className="font-black tabular-nums text-brand-navy/40">
                  {p.rank <= 3 ? ['🥇', '🥈', '🥉'][p.rank - 1] : p.rank}
                </div>
                <div className="font-bold text-brand-navy truncate">{p.display_name}</div>
                <div className="text-right font-black tabular-nums text-brand-teal">
                  {p.avg_accuracy}%
                </div>
                <div className="text-right tabular-nums text-brand-navy/60">{p.games_played}</div>
                <div className="text-right tabular-nums text-brand-navy/60">{p.total_answers}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/game"
            className="btn-coral px-8 py-3 text-base"
          >
            Play Now →
          </Link>
        </div>
      </main>
    </div>
  );
}
