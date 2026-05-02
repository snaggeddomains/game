'use client';

import { useState, useCallback } from 'react';
import type { GameMode, Domain, RoundResult, GamePhase } from '@/lib/types';
import ModeSelector from '@/components/ModeSelector';
import GameBoard from '@/components/GameBoard';
import ResultsScreen from '@/components/ResultsScreen';

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-game-bg">
      <div className="flex items-center gap-2">
        {/* Animated wave dots matching brand palette */}
        {['#7EC8D8', '#2E7FA5', '#1B3553'].map((color, i) => (
          <span
            key={i}
            className="inline-block h-3 w-3 rounded-full"
            style={{
              backgroundColor: color,
              animation: `bounce 0.9s ${i * 0.15}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <p
        className="font-display text-2xl uppercase tracking-tight text-brand-navy"
        style={{ fontFamily: "'Anton', Impact, sans-serif" }}
      >
        Loading Domains…
      </p>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

function ErrorScreen({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-game-bg px-4 text-center">
      <div className="text-5xl">🚧</div>
      <h2
        className="font-display text-3xl uppercase text-brand-navy"
        style={{ fontFamily: "'Anton', Impact, sans-serif" }}
      >
        Something went wrong
      </h2>
      <p className="max-w-sm text-brand-navy/60">{message}</p>
      <button onClick={onRetry} className="btn-coral mt-2 px-8 py-3">
        Try Again
      </button>
    </div>
  );
}

export default function GamePage() {
  const [phase, setPhase] = useState<GamePhase>('mode-select');
  const [mode, setMode] = useState<GameMode | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [score, setScore] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const startGame = useCallback(async (selectedMode: GameMode) => {
    setMode(selectedMode);
    setPhase('loading');
    setError(null);

    try {
      const res = await fetch(`/game/api/domains?mode=${selectedMode}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load domains.');
      setDomains(data.domains);
      setPhase('playing');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error loading domains.');
      setPhase('error' as GamePhase);
    }
  }, []);

  const handleComplete = useCallback(
    async (completedRounds: RoundResult[], finalScore: number, finalMaxStreak: number) => {
      setRounds(completedRounds);
      setScore(finalScore);
      setMaxStreak(finalMaxStreak);
      setPhase('complete');

      // Fire-and-forget analytics
      try {
        await fetch('/game/api/game-result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode,
            score: finalScore,
            max_streak: finalMaxStreak,
            rounds: completedRounds,
          }),
        });
      } catch {
        // analytics failure is non-blocking
      }
    },
    [mode]
  );

  const handlePlayAgain = useCallback(() => {
    setPhase('mode-select');
    setDomains([]);
    setRounds([]);
    setScore(0);
    setMaxStreak(0);
    setError(null);
  }, []);

  if (phase === 'mode-select') {
    return <ModeSelector onStart={startGame} />;
  }

  if (phase === 'loading') {
    return <LoadingScreen />;
  }

  if ((phase as string) === 'error') {
    return (
      <ErrorScreen
        message={error ?? 'Unknown error.'}
        onRetry={() => mode && startGame(mode)}
      />
    );
  }

  if (phase === 'playing' && domains.length > 0) {
    return (
      <GameBoard
        domains={domains}
        mode={mode!}
        onComplete={handleComplete}
      />
    );
  }

  if (phase === 'complete') {
    return (
      <ResultsScreen
        rounds={rounds}
        score={score}
        maxStreak={maxStreak}
        mode={mode!}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return <LoadingScreen />;
}
