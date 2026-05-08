'use client';

import { useState, useEffect } from 'react';

const LS_SEEN_KEY = 'lbPromptSeen';
const LS_PLAYER_KEY = 'lbPlayerId';

interface Props {
  onRegistered?: (playerId: string) => void;
}

export default function LeaderboardPrompt({ onRegistered }: Props) {
  const [seen, setSeen] = useState(true); // default true to avoid flash
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setSeen(!!localStorage.getItem(LS_SEEN_KEY));
  }, []);

  const dismiss = () => {
    localStorage.setItem(LS_SEEN_KEY, '1');
    setSeen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !email.trim()) return;
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ display_name: displayName.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      localStorage.setItem(LS_PLAYER_KEY, data.player_id);
      localStorage.setItem(LS_SEEN_KEY, '1');
      setStatus('success');
      onRegistered?.(data.player_id);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (seen) return null;

  if (status === 'success') {
    return (
      <div className="mb-6 flex items-center gap-3 rounded-2xl border-2 border-brand-teal bg-brand-teal/10 px-5 py-4">
        <span className="text-2xl">🏆</span>
        <div>
          <p className="font-bold text-brand-navy">You&rsquo;re on the leaderboard!</p>
          <p className="text-sm text-brand-navy/60">
            Complete 1 game (10 answers) to qualify for the rankings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-2xl border-2 border-brand-navy bg-white p-5">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xl">🏆</span>
        <p className="font-bold text-brand-navy">Want to track your stats?</p>
      </div>
      <p className="mb-4 text-sm text-brand-navy/60">
        Enter your name and email to qualify for the leaderboard. You need at least{' '}
        <span className="font-semibold text-brand-navy">10 answers</span> (1 game) to appear in the rankings.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display name"
          required
          maxLength={32}
          disabled={status === 'loading'}
          className="rounded-xl border-2 border-game-border bg-game-bg px-4 py-3 text-sm font-medium text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-teal focus:outline-none"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={status === 'loading'}
          className="rounded-xl border-2 border-game-border bg-game-bg px-4 py-3 text-sm font-medium text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-teal focus:outline-none"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={status === 'loading' || !displayName.trim() || !email.trim()}
            className="btn-coral flex-1 py-3 text-sm"
          >
            {status === 'loading' ? 'Joining…' : 'Join Leaderboard'}
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="shrink-0 rounded-xl px-4 py-3 text-sm font-semibold text-brand-navy/40 hover:text-brand-navy/60 transition-colors"
          >
            Skip
          </button>
        </div>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-600">{errorMsg}</p>
      )}
    </div>
  );
}
