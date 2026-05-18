'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase-client';

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'PT', name: 'Portugal' },
  { code: 'IE', name: 'Ireland' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'JP', name: 'Japan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'KR', name: 'South Korea' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'IL', name: 'Israel' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'EG', name: 'Egypt' },
  { code: 'Other', name: 'Other' },
];

export default function RegisterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [session, setSession] = useState<{ access_token: string; user: { email?: string } } | null>(null);
  const [auctionId, setAuctionId] = useState<string | null>(null);
  const [step, setStep] = useState<'auth' | 'profile' | 'done'>('auth');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    company: '',
    phone: '',
    country: 'US',
    termsAgreed: false,
    bindingAgreed: false,
  });

  // Load session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (s) {
        setSession(s);
        setForm((f) => ({ ...f, email: s.user.email ?? '' }));
        setStep('profile');
      }
    });
  }, [supabase]);

  // Load auction id
  useEffect(() => {
    fetch(`/api/auctions/${slug}`)
      .then((r) => r.json())
      .then((d) => setAuctionId(d.auction?.id ?? null));
  }, [slug]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: authErr } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/${slug}/register`,
      },
    });
    setSubmitting(false);
    if (authErr) {
      setError(authErr.message);
    } else {
      setEmailSent(true);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.termsAgreed || !form.bindingAgreed) {
      setError('Please agree to all required terms.');
      return;
    }
    if (!session || !auctionId) return;

    setError('');
    setSubmitting(true);
    const res = await fetch('/api/bidders/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        full_name: form.full_name,
        email: form.email,
        company: form.company || undefined,
        phone: form.phone || undefined,
        country: form.country,
        auction_id: auctionId,
      }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      setError(data.error ?? 'Registration failed.');
    } else {
      setStep('done');
    }
  };

  const field = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));
  };

  return (
    <div className="min-h-screen bg-game-bg">
      <nav className="bg-brand-navy h-14 flex items-center px-4">
        <a href={`/${slug}`} className="font-display text-xl tracking-wider text-brand-cream">SNAGGED</a>
        <span className="ml-3 text-white/30">/</span>
        <span className="ml-3 text-white/60 text-sm font-medium">Register to Bid</span>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Register to Bid</h1>
          <p className="text-brand-navy/60">
            Create your bidder account for the <span className="font-semibold text-brand-navy">{slug.charAt(0).toUpperCase() + slug.slice(1)}.com</span> auction.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {(['auth', 'profile', 'verify'] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                (step === 'auth' && i === 0) ||
                (step === 'profile' && i === 1) ||
                (step === 'done' && i === 2)
                  ? 'bg-brand-navy text-white'
                  : i < ['auth', 'profile', 'done'].indexOf(step)
                    ? 'bg-brand-teal text-white'
                    : 'bg-game-border text-brand-navy/40'
              }`}>
                {i < ['auth', 'profile', 'done'].indexOf(step) ? '✓' : i + 1}
              </div>
              <span className="text-xs text-brand-navy/40 hidden sm:block">
                {['Email', 'Profile', 'Verify Card'][i]}
              </span>
              {i < 2 && <div className="w-8 h-px bg-game-border" />}
            </div>
          ))}
        </div>

        {/* ── Step 1: Email auth ─────────────────────────────────────── */}
        {step === 'auth' && (
          <div className="bg-white rounded-2xl border border-game-border p-8">
            {emailSent ? (
              <div className="text-center">
                <div className="w-14 h-14 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-brand-navy mb-2">Check your email</h2>
                <p className="text-brand-navy/60 text-sm">
                  We sent a magic link to <strong>{form.email}</strong>. Click it to continue your registration.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-brand-navy mb-5">Verify your email</h2>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <Field
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={field('email')}
                    placeholder="you@example.com"
                    required
                  />
                  {error && <p className="text-sm text-brand-coral">{error}</p>}
                  <button type="submit" disabled={submitting} className="btn-coral w-full">
                    {submitting ? 'Sending…' : 'Continue with Email'}
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {/* ── Step 2: Profile ────────────────────────────────────────── */}
        {step === 'profile' && (
          <div className="bg-white rounded-2xl border border-game-border p-8">
            <h2 className="text-xl font-bold text-brand-navy mb-5">Your details</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <Field label="Full Name *" type="text" value={form.full_name} onChange={field('full_name')} placeholder="Jane Smith" required />
              <Field label="Email Address *" type="email" value={form.email} onChange={field('email')} placeholder="jane@example.com" required />
              <Field label="Company (optional)" type="text" value={form.company} onChange={field('company')} placeholder="Acme Corp" />
              <Field label="Phone (optional)" type="tel" value={form.phone} onChange={field('phone')} placeholder="+1 555 000 0000" />

              <div>
                <label className="block text-xs font-semibold text-brand-navy/50 uppercase tracking-wider mb-2">Country *</label>
                <select
                  value={form.country}
                  onChange={field('country')}
                  className="w-full px-4 py-3 border-2 border-game-border rounded-xl text-brand-navy focus:outline-none focus:border-brand-teal transition-colors bg-white"
                  required
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 pt-2">
                <CheckboxField
                  id="terms"
                  checked={form.termsAgreed}
                  onChange={(v) => setForm((f) => ({ ...f, termsAgreed: v }))}
                  label="I agree to the Snagged Auctions Terms & Conditions and Privacy Policy"
                />
                <CheckboxField
                  id="binding"
                  checked={form.bindingAgreed}
                  onChange={(v) => setForm((f) => ({ ...f, bindingAgreed: v }))}
                  label="I understand that all bids are legally binding commitments to purchase"
                />
              </div>

              {error && <p className="text-sm text-brand-coral">{error}</p>}

              <button type="submit" disabled={submitting || !form.termsAgreed || !form.bindingAgreed} className="btn-coral w-full">
                {submitting ? 'Saving…' : 'Continue to Card Verification'}
              </button>
            </form>
          </div>
        )}

        {/* ── Step 3: Done — redirect to verify ─────────────────────── */}
        {step === 'done' && (
          <div className="bg-white rounded-2xl border border-game-border p-8 text-center">
            <div className="w-14 h-14 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-brand-navy mb-2">Profile saved!</h2>
            <p className="text-brand-navy/60 text-sm mb-6">
              One more step — verify your payment method to activate your bidder account.
            </p>
            <button
              onClick={() => router.push(`/${slug}/verify`)}
              className="btn-coral w-full"
            >
              Verify Payment Method
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label, type, value, onChange, placeholder, required,
}: {
  label: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-brand-navy/50 uppercase tracking-wider mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border-2 border-game-border rounded-xl text-brand-navy focus:outline-none focus:border-brand-teal transition-colors"
      />
    </div>
  );
}

function CheckboxField({ id, checked, onChange, label }: { id: string; checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 rounded border-game-border text-brand-teal accent-brand-teal"
      />
      <span className="text-sm text-brand-navy/70 leading-relaxed">{label}</span>
    </label>
  );
}
