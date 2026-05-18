'use client';

import { useState, useCallback } from 'react';
import { getMinNextBid, formatCurrency, parseCurrency } from '@/lib/increments';
import type { Auction } from '@/lib/auction-types';

interface BidderState {
  isLoggedIn: boolean;
  emailVerified: boolean;
  hasProfile: boolean;
  profileStatus: string | null;
  cardVerified: boolean;
  isLeader: boolean;
  standingBid: number | null;
  token: string | null;
}

interface Props {
  auction: Auction;
  bidder: BidderState;
  onBidSuccess: (newStanding: number, isLeader: boolean) => void;
  onLoginRequest: () => void;
  onRegisterRequest: () => void;
  onVerifyRequest: () => void;
}

export default function BidBox({
  auction,
  bidder,
  onBidSuccess,
  onLoginRequest,
  onRegisterRequest,
  onVerifyRequest,
}: Props) {
  const [bidInput, setBidInput] = useState('');
  const [maxBidInput, setMaxBidInput] = useState('');
  const [showMaxBid, setShowMaxBid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const minNext = getMinNextBid(auction.current_bid, auction.starting_bid);
  const isOpen = auction.status === 'open';

  const handleSubmit = useCallback(async () => {
    if (!bidder.token) return;
    setMessage(null);

    const bidAmount = parseCurrency(bidInput);
    if (!bidAmount || bidAmount < minNext) {
      setMessage({ text: `Minimum bid is ${formatCurrency(minNext)}`, type: 'error' });
      return;
    }

    const maxBid = showMaxBid ? parseCurrency(maxBidInput) : undefined;
    if (showMaxBid && maxBid !== null && maxBid !== undefined && maxBid < bidAmount) {
      setMessage({ text: 'Maximum bid must be ≥ bid amount', type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bidder.token}`,
        },
        body: JSON.stringify({
          auction_id: auction.id,
          bid_amount: bidAmount,
          ...(showMaxBid && maxBid ? { max_bid: maxBid } : {}),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: data.message ?? 'You are the leading bidder!', type: 'success' });
        setBidInput('');
        setMaxBidInput('');
        onBidSuccess(data.standing_bid, data.is_leader);
      } else {
        setMessage({ text: data.error ?? 'Bid failed. Please try again.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }, [auction.id, bidInput, maxBidInput, showMaxBid, minNext, bidder.token, onBidSuccess]);

  // ─── Status badge ──────────────────────────────────────────────────────────
  const StatusBadge = () => {
    if (!isOpen) return null;
    if (!bidder.isLoggedIn) return null;
    if (bidder.isLeader) {
      return (
        <div className="flex items-center gap-2 px-3 py-2 bg-brand-teal/10 border border-brand-teal/30 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
          <span className="text-sm font-semibold text-brand-teal">You&apos;re the leading bidder</span>
        </div>
      );
    }
    if (bidder.standingBid !== null) {
      return (
        <div className="flex items-center gap-2 px-3 py-2 bg-brand-coral/10 border border-brand-coral/30 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-brand-coral" />
          <span className="text-sm font-semibold text-brand-coral">You&apos;ve been outbid — bid again to take the lead</span>
        </div>
      );
    }
    return null;
  };

  // ─── CTA for different states ──────────────────────────────────────────────
  if (!isOpen) {
    if (auction.status === 'preview') {
      return (
        <div className="space-y-4">
          <div className="bg-brand-navy/5 rounded-2xl p-6 text-center border border-brand-navy/10">
            <p className="text-brand-navy/50 text-sm font-medium uppercase tracking-widest mb-3">
              Bidding Opens Soon
            </p>
            <p className="text-brand-navy/70 text-sm mb-4">
              Register now — verification can take time. Don&apos;t miss the opening bid.
            </p>
            {!bidder.isLoggedIn ? (
              <button onClick={onRegisterRequest} className="btn-coral w-full">
                Register to Bid
              </button>
            ) : !bidder.hasProfile ? (
              <button onClick={onRegisterRequest} className="btn-coral w-full">
                Complete Registration
              </button>
            ) : !bidder.cardVerified ? (
              <button onClick={onVerifyRequest} className="btn-coral w-full">
                Verify Payment Method
              </button>
            ) : (
              <div className="text-brand-teal font-semibold text-sm">
                ✓ You&apos;re registered — we&apos;ll notify you when bidding opens
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-brand-navy/5 rounded-2xl p-6 text-center">
        <p className="text-brand-navy/50 font-medium">
          {auction.status === 'closed' ? 'This auction has ended.' : 'This auction has been cancelled.'}
        </p>
        {auction.current_bid && auction.status === 'closed' && (
          <p className="text-brand-navy font-bold text-xl mt-2">
            Final price: {formatCurrency(auction.current_bid)}
          </p>
        )}
      </div>
    );
  }

  // ─── Logged-out ────────────────────────────────────────────────────────────
  if (!bidder.isLoggedIn) {
    return (
      <div className="space-y-3">
        <div className="bg-white border border-game-border rounded-2xl p-6 text-center">
          <p className="text-brand-navy/60 text-sm mb-4">Sign in or create an account to bid</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={onLoginRequest} className="btn-navy flex-1">Sign In</button>
            <button onClick={onRegisterRequest} className="btn-coral flex-1">Register to Bid</button>
          </div>
        </div>
      </div>
    );
  }

  // ─── No profile ────────────────────────────────────────────────────────────
  if (!bidder.hasProfile) {
    return (
      <div className="bg-white border border-game-border rounded-2xl p-6 text-center">
        <p className="text-brand-navy/70 text-sm mb-4">Complete your bidder registration to participate</p>
        <button onClick={onRegisterRequest} className="btn-coral w-full">Complete Registration</button>
      </div>
    );
  }

  // ─── Pending / rejected / suspended ───────────────────────────────────────
  if (bidder.profileStatus === 'pending') {
    return (
      <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-2xl p-6 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-teal border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-brand-navy font-semibold mb-1">Application Under Review</p>
        <p className="text-brand-navy/60 text-sm">
          We&apos;ll email you once your application is approved. This typically takes 1–2 hours.
        </p>
      </div>
    );
  }

  if (bidder.profileStatus !== 'approved') {
    return (
      <div className="bg-brand-navy/5 border border-brand-navy/10 rounded-2xl p-6 text-center">
        <p className="text-brand-navy/70 text-sm">
          Your bidder application was not approved for this auction. Please contact us for assistance.
        </p>
      </div>
    );
  }

  // ─── Card not verified ─────────────────────────────────────────────────────
  if (!bidder.cardVerified) {
    return (
      <div className="bg-white border border-game-border rounded-2xl p-6 text-center">
        <div className="text-3xl mb-3">💳</div>
        <p className="text-brand-navy font-semibold mb-1">Verify Your Payment Method</p>
        <p className="text-brand-navy/60 text-sm mb-4">
          A refundable ${(50000 / 100).toLocaleString()} authorization hold is required to bid.
        </p>
        <button onClick={onVerifyRequest} className="btn-coral w-full">Verify Card to Bid</button>
      </div>
    );
  }

  // ─── Ready to bid ──────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      <StatusBadge />

      <div className="bg-white border border-game-border rounded-2xl p-5 space-y-4">
        {/* Bid input */}
        <div>
          <label className="block text-xs font-semibold text-brand-navy/50 uppercase tracking-wider mb-2">
            Your Bid
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/40 font-semibold text-lg">$</span>
            <input
              type="text"
              inputMode="numeric"
              value={bidInput}
              onChange={(e) => setBidInput(e.target.value)}
              placeholder={minNext.toLocaleString()}
              className="w-full pl-8 pr-4 py-3 border-2 border-game-border rounded-xl text-brand-navy font-semibold text-lg focus:outline-none focus:border-brand-teal transition-colors"
            />
          </div>
          <p className="text-xs text-brand-navy/40 mt-1">
            Minimum: {formatCurrency(minNext)}
          </p>
        </div>

        {/* Max bid toggle */}
        <div>
          <button
            type="button"
            onClick={() => setShowMaxBid(!showMaxBid)}
            className="text-sm text-brand-teal font-medium hover:underline"
          >
            {showMaxBid ? '− Hide maximum bid' : '+ Set a confidential maximum bid'}
          </button>
          {showMaxBid && (
            <div className="mt-3 space-y-1">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/40 font-semibold text-lg">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={maxBidInput}
                  onChange={(e) => setMaxBidInput(e.target.value)}
                  placeholder="Your maximum — kept confidential"
                  className="w-full pl-8 pr-4 py-3 border-2 border-game-border rounded-xl text-brand-navy font-semibold focus:outline-none focus:border-brand-teal transition-colors"
                />
              </div>
              <p className="text-xs text-brand-navy/40">
                We&apos;ll bid automatically on your behalf up to this amount. Your maximum is never shown publicly.
              </p>
            </div>
          )}
        </div>

        {/* Message */}
        {message && (
          <div className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
            message.type === 'success'
              ? 'bg-brand-teal/10 text-brand-teal border border-brand-teal/20'
              : 'bg-brand-coral/10 text-brand-coral border border-brand-coral/20'
          }`}>
            {message.text}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting || !bidInput}
          className="btn-coral w-full text-base py-4"
        >
          {submitting ? 'Placing Bid…' : 'Place Bid'}
        </button>

        <p className="text-xs text-brand-navy/40 text-center">
          All bids are binding. By bidding you agree to the auction terms.
        </p>
      </div>
    </div>
  );
}
