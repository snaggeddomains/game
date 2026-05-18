'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase-client';
import CountdownTimer from '@/components/auction/CountdownTimer';
import BidBox from '@/components/auction/BidBox';
import TrustSection from '@/components/auction/TrustSection';
import FAQ from '@/components/auction/FAQ';
import AuthModal from '@/components/auction/AuthModal';
import { formatCurrency } from '@/lib/increments';
import type { Auction, PublicBidEvent, BidIncrementSchedule } from '@/lib/auction-types';

interface Props {
  auction: Auction;
  initialBidEvents: PublicBidEvent[];
  incrementSchedule: Partial<BidIncrementSchedule>[];
}

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

const DEFAULT_BIDDER: BidderState = {
  isLoggedIn: false,
  emailVerified: false,
  hasProfile: false,
  profileStatus: null,
  cardVerified: false,
  isLeader: false,
  standingBid: null,
  token: null,
};

export default function AuctionPageClient({ auction: initialAuction, initialBidEvents, incrementSchedule }: Props) {
  const [auction, setAuction] = useState(initialAuction);
  const [bidEvents, setBidEvents] = useState(initialBidEvents);
  const [bidder, setBidder] = useState<BidderState>(DEFAULT_BIDDER);
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const supabase = getSupabaseBrowserClient();

  // Load bidder session + profile
  const loadBidderState = useCallback(async (token: string | null) => {
    if (!token) {
      setBidder(DEFAULT_BIDDER);
      return;
    }
    try {
      const res = await fetch(`/api/me?auction_id=${auction.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.user) {
        setBidder(DEFAULT_BIDDER);
        return;
      }
      setBidder({
        isLoggedIn: true,
        emailVerified: data.user.emailVerified,
        hasProfile: !!data.profile,
        profileStatus: data.profile?.status ?? null,
        cardVerified: !!data.profile?.card_verified_at,
        isLeader: data.isLeader,
        standingBid: data.standingBid,
        token,
      });
    } catch {
      setBidder(DEFAULT_BIDDER);
    }
  }, [auction.id]);

  // Supabase auth listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await loadBidderState(session?.access_token ?? null);
    });
    // Load initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      loadBidderState(session?.access_token ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase, loadBidderState]);

  // Poll for auction updates every 5 seconds while open
  const refreshAuction = useCallback(async () => {
    const res = await fetch(`/api/auctions/${auction.slug}`);
    if (!res.ok) return;
    const data = await res.json();
    setAuction(data.auction);
    setBidEvents(data.bidEvents);
  }, [auction.slug]);

  useEffect(() => {
    if (auction.status !== 'open') return;
    pollRef.current = setInterval(refreshAuction, 5000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [auction.status, refreshAuction]);

  const handleBidSuccess = useCallback((newStanding: number, isLeader: boolean) => {
    setAuction((prev) => ({ ...prev, current_bid: newStanding }));
    setBidder((prev) => ({ ...prev, isLeader, standingBid: newStanding }));
    refreshAuction();
  }, [refreshAuction]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setBidder(DEFAULT_BIDDER);
    setMenuOpen(false);
  };

  const isOpen = auction.status === 'open';

  return (
    <div className="min-h-screen bg-game-bg">
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="bg-brand-navy sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="https://snagged.com" className="font-display text-xl tracking-wider text-brand-cream">
            SNAGGED
          </a>
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-xs font-semibold uppercase tracking-widest hidden sm:block">
              Auctions
            </span>
            {bidder.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-teal/30 flex items-center justify-center text-xs text-brand-tealLight font-bold">
                    {bidder.profileStatus === 'approved' ? '✓' : '·'}
                  </div>
                  <span className="hidden sm:block">Account</span>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-game-border py-1 z-50">
                    <div className="px-4 py-2 border-b border-game-border">
                      <p className="text-xs text-brand-navy/50 uppercase tracking-wider font-semibold">Status</p>
                      <p className="text-sm font-semibold text-brand-navy capitalize mt-0.5">
                        {bidder.profileStatus ?? 'Unregistered'}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-brand-navy/70 hover:text-brand-coral hover:bg-brand-coral/5 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAuthModal('login')}
                  className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthModal('signup')}
                  className="px-3 py-1.5 bg-brand-coral hover:bg-brand-salmondark rounded-lg text-white text-sm font-semibold transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <header className="bg-brand-navy text-white pb-0">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <p className="text-brand-tealLight text-xs font-semibold uppercase tracking-widest mb-4">
            Premium Domain Auction
          </p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white tracking-wider mb-6">
            {auction.domain}
          </h1>
          {auction.tagline && (
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {auction.tagline}
            </p>
          )}
        </div>
        {/* wave */}
        <div className="h-8 bg-game-bg" style={{
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }} />
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-2">
        {/* ── Auction status card ─────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-lg border border-game-border p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: Timer + bid info */}
            <div className="space-y-6">
              <CountdownTimer
                endTime={auction.end_time}
                status={auction.status}
                softCloseMinutes={auction.soft_close_minutes}
                onExpired={refreshAuction}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-game-bg rounded-xl p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-navy/40 mb-1">
                    Current Bid
                  </p>
                  <p className="text-2xl font-bold text-brand-navy">
                    {auction.current_bid ? formatCurrency(auction.current_bid) : '—'}
                  </p>
                  {!auction.current_bid && (
                    <p className="text-xs text-brand-navy/40 mt-1">
                      Opening: {formatCurrency(auction.starting_bid)}
                    </p>
                  )}
                </div>

                <div className="bg-game-bg rounded-xl p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-navy/40 mb-1">
                    Bids
                  </p>
                  <p className="text-2xl font-bold text-brand-navy">{auction.bid_count}</p>
                  <div className="mt-1">
                    {auction.reserve_met ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-teal">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                        Reserve met
                      </span>
                    ) : auction.current_bid ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-coral">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-coral" />
                        Reserve not yet met
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bid box */}
            <div>
              <BidBox
                auction={auction}
                bidder={bidder}
                onBidSuccess={handleBidSuccess}
                onLoginRequest={() => setAuthModal('login')}
                onRegisterRequest={() => window.location.href = `/${auction.slug}/register`}
                onVerifyRequest={() => window.location.href = `/${auction.slug}/verify`}
              />
            </div>
          </div>
        </div>

        {/* ── Domain story ─────────────────────────────────────────────── */}
        {auction.description && (
          <div className="bg-white rounded-2xl border border-game-border p-8 mb-8">
            <h2 className="text-xl font-bold text-brand-navy mb-4">About {auction.domain}</h2>
            <p className="text-brand-navy/70 leading-relaxed">{auction.description}</p>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <DomainStat label="Length" value={auction.domain.replace(/\.[^.]+$/, '').length + ' chars'} />
              <DomainStat label="Extension" value={`.${auction.domain.split('.').pop()}`} />
              <DomainStat label="Age" value="Established" />
            </div>
          </div>
        )}

        {/* ── Bid history ──────────────────────────────────────────────── */}
        {bidEvents.length > 0 && (
          <div className="bg-white rounded-2xl border border-game-border p-8 mb-8">
            <h2 className="text-xl font-bold text-brand-navy mb-4">Bid Activity</h2>
            <div className="divide-y divide-game-border">
              {bidEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-teal" />
                    <span className="text-sm text-brand-navy/60">
                      {event.event_type === 'proxy_bid' ? 'Auto bid' : 'Bid placed'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-brand-navy text-sm">
                      {formatCurrency(event.resulting_standing_price)}
                    </p>
                    <p className="text-xs text-brand-navy/40">
                      {new Date(event.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Trust + FAQ ───────────────────────────────────────────────── */}
        <TrustSection />
        <FAQ />

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="py-12 border-t border-game-border text-center">
          <p className="font-display text-2xl tracking-wider text-brand-navy/20 mb-3">SNAGGED</p>
          <p className="text-sm text-brand-navy/40">
            © {new Date().getFullYear()} Snagged · Premium Domain Auctions ·{' '}
            <a href="mailto:auctions@snagged.com" className="hover:text-brand-teal">auctions@snagged.com</a>
          </p>
        </footer>
      </main>

      {/* Auth modal */}
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          redirectTo={`/${auction.slug}`}
        />
      )}

      {/* Close dropdown on outside click */}
      {menuOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
      )}
    </div>
  );
}

function DomainStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-game-bg rounded-xl p-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-navy/40 mb-1">{label}</p>
      <p className="font-bold text-brand-navy">{value}</p>
    </div>
  );
}
