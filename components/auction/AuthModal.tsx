'use client';

import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase-client';

interface Props {
  mode: 'login' | 'signup';
  onClose: () => void;
  redirectTo?: string;
}

export default function AuthModal({ mode: initialMode, onClose, redirectTo }: Props) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const supabase = getSupabaseBrowserClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo ?? window.location.pathname)}`;

    const { error: authErr } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: callbackUrl },
    });

    setSubmitting(false);
    if (authErr) {
      setError(authErr.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div className="text-center">
            <div className="w-14 h-14 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-brand-navy mb-2">Check your email</h2>
            <p className="text-brand-navy/60 text-sm">
              We sent a magic link to <strong>{email}</strong>. Click it to sign in.
            </p>
            <button onClick={onClose} className="mt-6 text-sm text-brand-navy/40 hover:text-brand-navy">
              Close
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-brand-navy/30 hover:text-brand-navy/60 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-brand-navy">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-brand-navy/50 text-sm mt-1">
                {mode === 'login'
                  ? 'Enter your email and we\'ll send a sign-in link'
                  : 'Enter your email to get started'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-navy/50 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border-2 border-game-border rounded-xl text-brand-navy focus:outline-none focus:border-brand-teal transition-colors"
                />
              </div>

              {error && (
                <p className="text-sm text-brand-coral">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-coral w-full"
              >
                {submitting ? 'Sending…' : 'Continue with Email'}
              </button>
            </form>

            <p className="text-center text-sm text-brand-navy/40 mt-5">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-brand-teal font-medium hover:underline"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
