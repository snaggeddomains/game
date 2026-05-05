'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { GameMode } from '@/lib/types';
import { MODE_CONFIG } from '@/lib/types';
import SnaggedLogo from './SnaggedLogo';
import LeaderboardProgress from './LeaderboardProgress';

interface Props {
  onStart: (mode: GameMode) => void;
}

const FLOATING_DOMAINS = [
  'BlueRocket.io', 'NeonPulse.co', 'FrostByte.ai', 'VaultKey.com',
  'PixelDrift.net', 'LunarBase.io', 'SwiftEdge.co', 'GoldRun.ai',
  'CrimsonLab.com', 'IronPath.net',
];

interface LeaderboardPlayer {
  rank: number;
  display_name: string;
  avg_accuracy: string;
}

export default function ModeSelector({ onStart }: Props) {
  const [selected, setSelected] = useState<GameMode | null>(null);
  const [topPlayers, setTopPlayers] = useState<LeaderboardPlayer[]>([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((data) => setTopPlayers((data.players ?? []).slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <header className="relative overflow-hidden bg-brand-salmon pb-0 pt-10 text-center">
        {/* Clouds */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-around opacity-80">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="mt-4 rounded-full bg-white/90"
              style={{
                width: `${90 + i * 20}px`,
                height: `${36 + i * 8}px`,
                marginTop: `${8 + (i % 3) * 16}px`,
                filter: 'blur(2px)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 px-4">
          <SnaggedLogo size="md" className="mb-4 justify-center" />
          <h1
            className="px-4 text-5xl uppercase leading-none tracking-tight text-brand-navy sm:text-7xl"
            style={{ fontFamily: "'Anton', Impact, sans-serif" }}
          >
            Is it Snagged?
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-base font-medium text-brand-navy/70 sm:text-lg">
            10 domains. Which ones are taken?
            <br />
            How well do you know the internet?
          </p>
        </div>

        {/* Fisherman character */}
        <div className="pointer-events-none absolute bottom-0 right-0 z-20 hidden sm:block" style={{ width: 180 }}>
          <Image
            src="/fisherman.png"
            alt="Snagged fisherman mascot"
            width={180}
            height={220}
            className="object-contain object-bottom"
            priority
          />
        </div>

        {/* Water section */}
        <div className="relative mt-10" style={{ background: '#0F3D5C' }}>
          {/* Wave cap */}
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', marginTop: -1 }}>
            <path d="M0 30 Q180 0 360 30 Q540 60 720 30 Q900 0 1080 30 Q1260 60 1440 30 L1440 60 L0 60 Z" fill="#0F3D5C" />
          </svg>

          {/* Floating domain pills */}
          <div className="flex flex-wrap justify-center gap-3 px-6 py-6">
            {FLOATING_DOMAINS.map((d) => (
              <span
                key={d}
                className="rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{ background: '#1A5276', color: '#7EC8D8' }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Mode selection */}
      <main className="flex flex-1 flex-col items-center bg-game-bg px-4 py-10">
        <div className="w-full max-w-md">
          {/* Progress nudge for returning registered players */}
          <LeaderboardProgress />

          <h2 className="mb-5 text-center text-sm font-bold uppercase tracking-widest text-brand-navy/50">
            Choose a Mode
          </h2>

          <div className="mb-8 grid grid-cols-1 gap-3">
            {(Object.keys(MODE_CONFIG) as GameMode[]).map((mode) => {
              const cfg = MODE_CONFIG[mode];
              const isSelected = selected === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setSelected(mode)}
                  className={`group relative flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-brand-navy bg-brand-navy text-white shadow-lg'
                      : 'border-game-border bg-white text-brand-navy hover:border-brand-navy/40 hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-brand-coral">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-2xl ${cfg.color}`}>
                    {cfg.emoji}
                  </div>
                  <div>
                    <div className={`mb-1 font-bold ${isSelected ? 'text-brand-cream' : 'text-brand-navy'}`}>
                      {cfg.label}
                    </div>
                    <div className={`text-sm leading-snug ${isSelected ? 'text-white/70' : 'text-brand-navy/60'}`}>
                      {cfg.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => selected && onStart(selected)}
              disabled={!selected}
              className="btn-coral w-full max-w-sm py-4 text-lg sm:w-auto sm:px-14"
            >
              Start Game
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-brand-navy/40">
            Adult mode contains mature language and themes. 18+ only.
          </p>

          {/* Leaderboard preview */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-brand-navy/50">
                🏆 Leaderboard
              </h2>
              <Link
                href="/leaderboard"
                className="text-xs font-semibold text-brand-teal hover:underline"
              >
                View all →
              </Link>
            </div>

            {topPlayers.length === 0 ? (
              <div className="rounded-2xl border-2 border-game-border bg-white px-5 py-4 text-center text-sm text-brand-navy/40">
                No players yet — be the first on the board!
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border-2 border-game-border bg-white">
                {topPlayers.map((p, i) => (
                  <div
                    key={p.rank}
                    className={`flex items-center justify-between px-4 py-3 text-sm ${
                      i < topPlayers.length - 1 ? 'border-b border-game-border' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center font-black text-brand-navy/30">
                        {p.rank <= 3 ? ['🥇', '🥈', '🥉'][p.rank - 1] : p.rank}
                      </span>
                      <span className="font-bold text-brand-navy">{p.display_name}</span>
                    </div>
                    <span className="font-black tabular-nums text-brand-teal">{p.avg_accuracy}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
