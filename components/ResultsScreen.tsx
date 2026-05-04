'use client';

import type { RoundResult, GameMode } from '@/lib/types';
import { TOTAL_ROUNDS, POINTS_PER_CORRECT, MODE_CONFIG, namecheapUrl } from '@/lib/types';
import SnaggedLogo from './SnaggedLogo';
import EmailCapture from './EmailCapture';

interface Props {
  rounds: RoundResult[];
  score: number;
  maxStreak: number;
  mode: GameMode;
  onPlayAgain: () => void;
}

function getRating(score: number): { label: string; emoji: string; message: string } {
  const pct = score / (TOTAL_ROUNDS * POINTS_PER_CORRECT);
  if (pct === 1) return { label: 'Perfect!', emoji: '🏆', message: 'You know domains cold. Legendary.' };
  if (pct >= 0.8) return { label: 'Domain Expert', emoji: '🎯', message: "That's a seriously good score." };
  if (pct >= 0.6) return { label: 'Solid Play', emoji: '🌊', message: 'Better than most. Keep at it.' };
  if (pct >= 0.4) return { label: 'Getting There', emoji: '🎣', message: 'The internet is trickier than it looks.' };
  return { label: 'Keep Fishing', emoji: '🐟', message: "The good news: domains are still out there." };
}

export default function ResultsScreen({ rounds, score, maxStreak, mode, onPlayAgain }: Props) {
  const rating = getRating(score);
  const correctCount = rounds.filter((r) => r.correct).length;
  const accuracy = rounds.length > 0 ? Math.round((correctCount / rounds.length) * 100) : 0;
  const maxScore = TOTAL_ROUNDS * POINTS_PER_CORRECT;

  return (
    <div className="flex min-h-screen flex-col bg-game-bg">
      {/* Result hero — salmon header */}
      <div className="relative bg-brand-salmon pb-16 pt-10 text-center">
        <SnaggedLogo size="sm" className="mb-6 justify-center" />

        <div className="mb-2 text-6xl">{rating.emoji}</div>
        <h1
          className="font-display px-4 text-5xl uppercase leading-none tracking-tight text-brand-navy sm:text-6xl"
          style={{ fontFamily: "'Anton', Impact, sans-serif" }}
        >
          {rating.label}
        </h1>
        <p className="mt-2 text-base font-medium text-brand-navy/70">{rating.message}</p>

        {/* Score pill */}
        <div className="mt-6 inline-flex items-baseline gap-1 rounded-full bg-brand-navy px-8 py-3">
          <span className="text-4xl font-black tabular-nums text-brand-coral">{score}</span>
          <span className="text-lg font-bold text-white/50">/ {maxScore}</span>
        </div>

        {/* Wave divider */}
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
      </div>

      <main className="mx-auto w-full max-w-lg px-4 py-8">
        {/* Stats row */}
        <div className="mb-6 grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Correct', value: `${correctCount}/${TOTAL_ROUNDS}`, color: 'text-brand-teal' },
            { label: 'Accuracy', value: `${accuracy}%`, color: 'text-brand-navy' },
            { label: 'Best Streak', value: maxStreak > 0 ? `${maxStreak} 🔥` : '0', color: 'text-brand-coral' },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl border-2 border-game-border bg-white p-4">
              <div className={`text-2xl font-black tabular-nums ${color}`}>{value}</div>
              <div className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-brand-navy/40">{label}</div>
            </div>
          ))}
        </div>

        {/* Round breakdown */}
        <div className="mb-6 rounded-2xl border-2 border-game-border bg-white p-4">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-navy/40">Round by Round</h2>
          <div className="space-y-2">
            {rounds.map((r, i) => (
              <div
                key={r.domain.id}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                  r.correct ? 'bg-brand-teal/10' : 'bg-red-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 text-xs font-semibold text-brand-navy/40">{i + 1}.</span>
                  <span className="font-bold text-brand-navy">{r.domain.domain}</span>
                  <span
                    className={`hidden rounded-full px-2 py-0.5 text-xs font-semibold sm:inline ${
                      r.domain.availability_status === 'taken'
                        ? 'bg-brand-coral/20 text-brand-coral'
                        : 'bg-brand-teal/20 text-brand-teal'
                    }`}
                  >
                    {r.domain.availability_status === 'taken' ? '🔒 Snagged' : '✅ Available'}
                  </span>
                  {r.domain.availability_status === 'available' && (
                    <a
                      href={namecheapUrl(r.domain.domain)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden rounded-full bg-brand-navy px-2 py-0.5 text-xs font-semibold text-white hover:bg-brand-teal transition-colors sm:inline"
                    >
                      Register →
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {r.correct ? (
                    <span className="text-xs font-bold text-brand-teal">+{r.points}</span>
                  ) : (
                    <span className="text-xs font-bold text-red-500">0</span>
                  )}
                  <span className={`text-base font-bold ${r.correct ? 'text-brand-teal' : 'text-red-500'}`}>
                    {r.correct ? '✓' : '✗'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email capture */}
        <div className="mb-6">
          <EmailCapture mode={mode} score={score} />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button onClick={onPlayAgain} className="btn-coral flex-1 py-4 text-base">
            Play Again
          </button>
          <a
            href="https://www.snagged.com/marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navy flex-1 py-4 text-base text-center"
          >
            Browse Marketplace →
          </a>
        </div>

        <p className="mt-6 text-center text-xs text-brand-navy/30">
          Playing in <span className="font-semibold">{MODE_CONFIG[mode].label}</span> mode
        </p>
      </main>
    </div>
  );
}
