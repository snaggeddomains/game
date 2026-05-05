'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Domain, AvailabilityStatus, RoundResult, GameMode } from '@/lib/types';
import { MODE_CONFIG, TOTAL_ROUNDS, POINTS_PER_CORRECT, namecheapUrl } from '@/lib/types';
import SnaggedLogo from './SnaggedLogo';

interface Props {
  domains: Domain[];
  mode: GameMode;
  onComplete: (rounds: RoundResult[], score: number, maxStreak: number) => void;
}

type Phase = 'guessing' | 'reveal';

export default function GameBoard({ domains, mode, onComplete }: Props) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('guessing');
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [playerGuess, setPlayerGuess] = useState<AvailabilityStatus | null>(null);
  const [cardKey, setCardKey] = useState(0);

  const domain = domains[roundIndex];
  const isLastRound = roundIndex === TOTAL_ROUNDS - 1;
  const correct = phase === 'reveal' && playerGuess === domain.availability_status;

  useEffect(() => {
    setCardKey((k) => k + 1);
  }, [roundIndex]);

  const handleGuess = useCallback(
    (guess: AvailabilityStatus) => {
      if (phase !== 'guessing') return;
      const isCorrect = guess === domain.availability_status;
      const points = isCorrect ? POINTS_PER_CORRECT : 0;
      const newStreak = isCorrect ? streak + 1 : 0;
      const newMax = Math.max(maxStreak, newStreak);

      setPlayerGuess(guess);
      setPhase('reveal');
      setStreak(newStreak);
      setMaxStreak(newMax);
      setScore((s) => s + points);
      setRounds((prev) => [
        ...prev,
        { domain, player_guess: guess, correct: isCorrect, points },
      ]);
    },
    [phase, domain, streak, maxStreak]
  );

  const handleNext = useCallback(() => {
    if (isLastRound) {
      setRounds((latest) => {
        onComplete(latest, score, maxStreak);
        return latest;
      });
      return;
    }
    setRoundIndex((i) => i + 1);
    setPhase('guessing');
    setPlayerGuess(null);
  }, [isLastRound, score, maxStreak, onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase === 'guessing') {
        if (e.key === 's' || e.key === 'S' || e.key === '1') handleGuess('taken');
        if (e.key === 'a' || e.key === 'A' || e.key === '2') handleGuess('available');
      } else if (phase === 'reveal') {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') handleNext();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, handleGuess, handleNext]);

  const progress = ((roundIndex + (phase === 'reveal' ? 1 : 0)) / TOTAL_ROUNDS) * 100;
  const streakFires = streak >= 2 ? '🔥'.repeat(Math.min(streak, 5)) : '';

  const whoisDate = domain.registered_at
    ? new Date(domain.registered_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-game-bg">
      {/* Topbar */}
      <header className="flex items-center justify-between border-b border-game-border bg-white px-4 py-3 sm:px-6">
        <SnaggedLogo size="sm" />
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-navy/40">Mode</span>
            <span className="text-sm font-bold text-brand-navy">
              {MODE_CONFIG[mode].emoji} {MODE_CONFIG[mode].label}
            </span>
          </div>
          <div className="h-4 w-px bg-game-border" />
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-navy/40">Score</span>
            <span className="text-xl font-black tabular-nums text-brand-coral">{score}</span>
          </div>
          {streakFires && (
            <div className="hidden items-center gap-1 sm:flex">
              <span className="text-xs font-semibold text-brand-navy/40">Streak</span>
              <span className="text-sm">{streakFires}</span>
            </div>
          )}
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1.5 bg-game-border">
        <div
          className="h-full bg-brand-teal transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Game area */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Round & streak row */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-brand-navy/50">
              Round{' '}
              <span className="font-black text-brand-navy">{roundIndex + 1}</span>
              <span className="text-brand-navy/30"> / {TOTAL_ROUNDS}</span>
            </span>
            <div className="flex items-center gap-2">
              {streakFires && (
                <span className="flex items-center gap-1 text-sm sm:hidden">
                  <span className="text-brand-navy/40 text-xs">Streak</span>
                  <span>{streakFires}</span>
                </span>
              )}
            </div>
          </div>

          {/* Domain card */}
          <div
            key={cardKey}
            className={`relative overflow-hidden rounded-3xl border-2 bg-white shadow-lg transition-all duration-300 animate-scale-in ${
              phase === 'reveal'
                ? correct
                  ? 'border-brand-teal card-glow-correct'
                  : 'border-red-400 card-glow-wrong'
                : 'border-game-border'
            }`}
          >
            {/* Reveal overlay */}
            {phase === 'reveal' && (
              <div
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl animate-fade-in ${
                  correct ? 'bg-brand-teal/10' : 'bg-red-500/10'
                }`}
              >
                <div className={`text-7xl ${correct ? 'animate-bounce-in' : 'animate-shake'}`}>
                  {correct ? '✓' : '✗'}
                </div>
                <div
                  className={`mt-2 text-2xl font-black ${
                    correct ? 'text-brand-teal' : 'text-red-600'
                  }`}
                >
                  {correct ? `+${POINTS_PER_CORRECT} pts!` : 'Not quite!'}
                </div>
                <div className="mt-1 text-sm font-medium text-brand-navy/60">
                  {domain.availability_status === 'available' ? 'It is' : 'It was'}{' '}
                  <span
                    className={
                      domain.availability_status === 'taken'
                        ? 'font-bold text-brand-coral'
                        : 'font-bold text-brand-teal'
                    }
                  >
                    {domain.availability_status === 'taken' ? '🔒 Snagged' : '✅ Available'}
                  </span>
                </div>
                {domain.availability_status === 'taken' && (
                  <div className="mt-2 text-xs font-semibold text-brand-navy/60">
                    {whoisDate ? `Registered ${whoisDate}` : 'Registration date unknown'}
                  </div>
                )}
              </div>
            )}

            {/* Domain display */}
            <div
              className={`flex flex-col items-center justify-center px-6 py-14 text-center transition-opacity duration-300 ${
                phase === 'reveal' ? 'opacity-15' : 'opacity-100'
              }`}
            >
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-brand-navy/40">
                Is this domain...
              </p>
              <p
                className="break-all font-display uppercase leading-none tracking-tight text-brand-navy"
                style={{
                  fontFamily: "'Anton', Impact, sans-serif",
                  fontSize:
                    domain.domain.length > 22
                      ? '1.6rem'
                      : domain.domain.length > 16
                      ? '2.2rem'
                      : domain.domain.length > 12
                      ? '2.8rem'
                      : '3.5rem',
                }}
              >
                {domain.domain}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {phase === 'guessing' ? (
              <>
                <button
                  onClick={() => handleGuess('taken')}
                  className="btn-guess hover:bg-brand-salmon/20 hover:border-brand-coral"
                  aria-label="Snagged — domain is taken"
                >
                  <span className="text-3xl">🔒</span>
                  <span className="text-base font-black text-brand-navy">Snagged</span>
                  <span className="text-xs text-brand-navy/40">Already taken</span>
                  <kbd className="absolute bottom-2 right-2 hidden text-[10px] text-brand-navy/25 sm:block">S</kbd>
                </button>
                <button
                  onClick={() => handleGuess('available')}
                  className="btn-guess hover:bg-brand-teal/10 hover:border-brand-teal"
                  aria-label="Available — domain is free"
                >
                  <span className="text-3xl">✅</span>
                  <span className="text-base font-black text-brand-navy">Available</span>
                  <span className="text-xs text-brand-navy/40">Still up for grabs</span>
                  <kbd className="absolute bottom-2 right-2 hidden text-[10px] text-brand-navy/25 sm:block">A</kbd>
                </button>
              </>
            ) : (
              <div className="col-span-2 flex flex-col gap-2">
                <button
                  onClick={handleNext}
                  className="btn-coral w-full py-4 text-base"
                  autoFocus
                >
                  {isLastRound ? 'See Results →' : 'Next Domain →'}
                </button>
                {domain.availability_status === 'available' && (
                  <a
                    href={namecheapUrl(domain.domain)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-xl border border-brand-teal/40 py-2.5 text-center text-sm font-semibold text-brand-teal transition-colors hover:border-brand-teal hover:bg-brand-teal/5"
                  >
                    Register It →
                  </a>
                )}
              </div>
            )}
          </div>

          {phase === 'guessing' && (
            <p className="mt-3 text-center text-xs text-brand-navy/30">
              Press <kbd className="font-mono font-bold">S</kbd> for Snagged ·{' '}
              <kbd className="font-mono font-bold">A</kbd> for Available
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
