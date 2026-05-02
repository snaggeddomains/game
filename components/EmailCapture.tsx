'use client';

import { useState } from 'react';
import type { GameMode } from '@/lib/types';

interface Props {
  mode: GameMode;
  score: number;
}

export default function EmailCapture({ mode, score }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), mode, score }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 rounded-2xl border-2 border-brand-teal bg-brand-teal/10 px-5 py-4">
        <span className="text-2xl">🎉</span>
        <div>
          <p className="font-bold text-brand-navy">You&rsquo;re on the list!</p>
          <p className="text-sm text-brand-navy/60">
            We&rsquo;ll send you the best domains and game updates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-game-border bg-white p-5">
      <p className="mb-1 font-bold text-brand-navy">Get fresh domains in your inbox</p>
      <p className="mb-4 text-sm text-brand-navy/60">
        Join the Snagged newsletter — premium domains, industry news, and game updates.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={status === 'loading'}
          className="flex-1 rounded-xl border-2 border-game-border bg-game-bg px-4 py-3 text-sm font-medium text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-teal focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email.trim()}
          className="btn-coral shrink-0 py-3 text-sm"
        >
          {status === 'loading' ? 'Submitting…' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-600">{errorMsg}</p>
      )}
      <p className="mt-2 text-xs text-brand-navy/30">No spam. Unsubscribe any time.</p>
    </div>
  );
}
