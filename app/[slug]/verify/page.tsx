'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getSupabaseBrowserClient } from '@/lib/supabase-client';
import { formatCurrency } from '@/lib/increments';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function VerifyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const supabase = getSupabaseBrowserClient();

  const [token, setToken] = useState<string | null>(null);
  const [auctionId, setAuctionId] = useState<string | null>(null);
  const [holdAmount, setHoldAmount] = useState(500);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [alreadyVerified, setAlreadyVerified] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = `/${slug}/register`;
        return;
      }
      setToken(session.access_token);
    });
  }, [supabase, slug]);

  useEffect(() => {
    if (!token) return;

    // Load auction
    fetch(`/api/auctions/${slug}`)
      .then((r) => r.json())
      .then(async (d) => {
        const auction = d.auction;
        if (!auction) return;
        setAuctionId(auction.id);
        setHoldAmount(auction.verification_hold_cents / 100);

        // Check if already verified
        const meRes = await fetch(`/api/me?auction_id=${auction.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const me = await meRes.json();

        if (me.verification?.status === 'authorized') {
          setAlreadyVerified(true);
          setLoading(false);
          return;
        }

        if (!me.profile) {
          window.location.href = `/${slug}/register`;
          return;
        }

        // Create setup intent
        const res = await fetch('/api/stripe/setup-intent', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? 'Could not initialize payment setup.');
        } else {
          setClientSecret(data.clientSecret);
        }
        setLoading(false);
      });
  }, [token, slug]);

  return (
    <div className="min-h-screen bg-game-bg">
      <nav className="bg-brand-navy h-14 flex items-center px-4">
        <a href={`/${slug}`} className="font-display text-xl tracking-wider text-brand-cream">SNAGGED</a>
        <span className="ml-3 text-white/30">/</span>
        <span className="ml-3 text-white/60 text-sm font-medium">Verify Payment Method</span>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Verify Payment Method</h1>
          <p className="text-brand-navy/60">
            A refundable authorization hold of{' '}
            <strong className="text-brand-navy">{formatCurrency(holdAmount)}</strong> will be
            placed on your card to confirm your bidder eligibility. This is not a charge.
          </p>
        </div>

        <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-xl p-4 mb-6 text-sm text-brand-navy/70">
          <strong className="text-brand-navy">How it works:</strong> We place a temporary hold on
          your card — not a charge. The hold is automatically released after the auction closes if
          you don&apos;t win. Winners complete payment through Escrow.com.
        </div>

        {loading && (
          <div className="bg-white rounded-2xl border border-game-border p-8 text-center">
            <div className="w-8 h-8 border-2 border-brand-navy/20 border-t-brand-teal rounded-full animate-spin mx-auto" />
          </div>
        )}

        {!loading && alreadyVerified && (
          <VerifiedState slug={slug} />
        )}

        {!loading && !alreadyVerified && error && (
          <div className="bg-white rounded-2xl border border-game-border p-8">
            <p className="text-brand-coral text-sm">{error}</p>
          </div>
        )}

        {!loading && !alreadyVerified && !error && clientSecret && stripePromise && token && auctionId && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#2E7FA5',
                  colorBackground: '#ffffff',
                  colorText: '#1B3553',
                  borderRadius: '12px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                },
              },
            }}
          >
            <CardForm token={token} auctionId={auctionId} slug={slug} holdAmount={holdAmount} />
          </Elements>
        )}
      </div>
    </div>
  );
}

function CardForm({
  token, auctionId, slug, holdAmount,
}: {
  token: string; auctionId: string; slug: string; holdAmount: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setError('');
    setSubmitting(true);

    // Confirm the setup intent
    const { setupIntent, error: stripeErr } = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
    });

    if (stripeErr) {
      setError(stripeErr.message ?? 'Card setup failed.');
      setSubmitting(false);
      return;
    }

    const paymentMethodId = setupIntent?.payment_method as string | undefined;
    if (!paymentMethodId) {
      setError('No payment method returned. Please try again.');
      setSubmitting(false);
      return;
    }

    // Create authorization hold server-side
    const res = await fetch('/api/stripe/verify-hold', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentMethodId, auctionId }),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error ?? 'Authorization failed. Please try a different card.');
    } else {
      router.push(`/${slug}?verified=1`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-game-border p-8 space-y-6">
      <h2 className="text-lg font-bold text-brand-navy">Card Details</h2>
      <PaymentElement />
      {error && <p className="text-sm text-brand-coral">{error}</p>}
      <button
        type="submit"
        disabled={submitting || !stripe}
        className="btn-coral w-full"
      >
        {submitting
          ? 'Processing…'
          : `Authorize ${formatCurrency(holdAmount)} Hold & Activate Account`}
      </button>
      <p className="text-xs text-brand-navy/40 text-center">
        This is a refundable authorization hold, not a charge. SSL encrypted via Stripe.
      </p>
    </form>
  );
}

function VerifiedState({ slug }: { slug: string }) {
  return (
    <div className="bg-white rounded-2xl border border-game-border p-8 text-center">
      <div className="w-14 h-14 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-brand-navy mb-2">Card Verified</h2>
      <p className="text-brand-navy/60 text-sm mb-6">
        Your payment method is verified. Your bidder application is under review — we&apos;ll email you when approved.
      </p>
      <a href={`/${slug}`} className="btn-coral inline-flex">
        Return to Auction
      </a>
    </div>
  );
}
