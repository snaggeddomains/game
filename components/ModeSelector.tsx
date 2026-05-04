'use client';

import { useState } from 'react';
import type { GameMode } from '@/lib/types';
import { MODE_CONFIG } from '@/lib/types';
import SnaggedLogo from './SnaggedLogo';

interface Props {
  onStart: (mode: GameMode) => void;
}

export default function ModeSelector({ onStart }: Props) {
  const [selected, setSelected] = useState<GameMode | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero header — salmon background with wave bottom */}
      <header className="relative bg-brand-salmon pb-16 pt-10 text-center">
        <SnaggedLogo size="md" className="mb-6 justify-center" />

        <h1
          className="font-display px-4 text-5xl uppercase leading-none tracking-tight text-brand-navy sm:text-7xl"
          style={{ fontFamily: "'Anton', Impact, sans-serif" }}
        >
          Is it Snagged?
        </h1>
        <p className="mx-auto mt-4 max-w-sm px-4 text-base font-medium text-brand-navy/70 sm:text-lg">
          10 domains. Guess which ones are registered.
          <br />
          How well do you know the internet?
        </p>

        {/* Teal wave divider */}
        <div className="wave-divider">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', height: 60 }}>
            <path d="M0 30 Q180 0 360 30 Q540 60 720 30 Q900 0 1080 30 Q1260 60 1440 30 L1440 60 L0 60 Z" fill="#7EC8D8" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full" style={{ height: 24, background: '#FAF3EC' }}>
          <svg viewBox="0 0 1440 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', height: 24 }}>
            <path d="M0 12 Q180 0 360 12 Q540 24 720 12 Q900 0 1080 12 Q1260 24 1440 12 L1440 24 L0 24 Z" fill="#2E7FA5" />
          </svg>
        </div>
      </header>

      {/* Mode selection */}
      <main className="flex flex-1 flex-col items-center px-4 py-10">
        <div className="w-full max-w-2xl">
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
                        <path
                          d="M2.5 6l2.5 2.5 4.5-5"
                          stroke="#fff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-2xl ${cfg.color}`}
                  >
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
        </div>
      </main>
    </div>
  );
}
