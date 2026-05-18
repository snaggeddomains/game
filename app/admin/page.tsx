'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase-client';
import { formatCurrency } from '@/lib/increments';
import type { BidderProfile } from '@/lib/auction-types';

interface AuctionSummary {
  id: string;
  slug: string;
  domain: string;
  status: string;
  current_bid: number | null;
  bid_count: number;
  reserve_met: boolean;
  end_time: string | null;
}

export default function AdminDashboard() {
  const supabase = getSupabaseBrowserClient();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [auctions, setAuctions] = useState<AuctionSummary[]>([]);
  const [pendingBidders, setPendingBidders] = useState<BidderProfile[]>([]);
  const [tab, setTab] = useState<'auctions' | 'bidders'>('auctions');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = '/';
        return;
      }
      setToken(session.access_token);
    });
  }, [supabase]);

  useEffect(() => {
    if (!token) return;
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const loadData = async () => {
    setLoading(true);
    const headers = { Authorization: `Bearer ${token}` };

    const [auctRes, bidderRes] = await Promise.all([
      fetch('/api/auctions', { headers }).catch(() => null),
      fetch('/api/admin/bidders?status=pending', { headers }),
    ]);

    // Auctions: use public endpoint since admin one is per-id
    const auctData = await (await fetch('/api/auctions/seis')).json().catch(() => null);
    if (auctData?.auction) setAuctions([auctData.auction]);

    const bidderData = await bidderRes.json();
    setPendingBidders(bidderData.profiles ?? []);
    setLoading(false);
  };

  const approveBidder = async (id: string, status: 'approved' | 'rejected') => {
    if (!token) return;
    setActionLoading(id);
    await fetch(`/api/admin/bidders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    setActionLoading(null);
    loadData();
  };

  if (!token || loading) {
    return (
      <div className="min-h-screen bg-game-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-navy/20 border-t-brand-teal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-game-bg">
      <nav className="bg-brand-navy h-14 flex items-center px-6">
        <span className="font-display text-xl tracking-wider text-brand-cream">SNAGGED</span>
        <span className="ml-3 text-white/30">/</span>
        <span className="ml-3 text-white/60 text-sm font-medium">Admin</span>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-brand-navy mb-6">Auction Admin</h1>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-game-border mb-8">
          {(['auctions', 'bidders'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${
                tab === t
                  ? 'bg-white border-x border-t border-game-border text-brand-navy -mb-px'
                  : 'text-brand-navy/50 hover:text-brand-navy'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
              {t === 'bidders' && pendingBidders.length > 0 && (
                <span className="ml-2 bg-brand-coral text-white text-xs rounded-full px-1.5 py-0.5">
                  {pendingBidders.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Auctions tab ─────────────────────────────────────────── */}
        {tab === 'auctions' && (
          <div className="space-y-4">
            {auctions.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl border border-game-border p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-brand-navy">{a.domain}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <StatusPill status={a.status} />
                      {a.reserve_met && (
                        <span className="text-xs font-semibold text-brand-teal">Reserve Met</span>
                      )}
                    </div>
                  </div>
                  <a
                    href={`/admin/auctions/${a.id}`}
                    className="btn-navy text-sm px-4 py-2"
                  >
                    Manage →
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-5">
                  <Stat label="Current Bid" value={a.current_bid ? formatCurrency(a.current_bid) : '—'} />
                  <Stat label="Total Bids" value={String(a.bid_count)} />
                  <Stat
                    label="Ends"
                    value={a.end_time ? new Date(a.end_time).toLocaleDateString() : '—'}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Bidders tab ──────────────────────────────────────────── */}
        {tab === 'bidders' && (
          <div className="space-y-3">
            {pendingBidders.length === 0 && (
              <div className="bg-white rounded-2xl border border-game-border p-8 text-center">
                <p className="text-brand-navy/40">No pending bidder applications.</p>
              </div>
            )}
            {pendingBidders.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl border border-game-border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-brand-navy">{b.full_name}</p>
                    <p className="text-sm text-brand-navy/60">{b.email}</p>
                    {b.company && (
                      <p className="text-sm text-brand-navy/40 mt-0.5">{b.company} · {b.country}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      {b.card_verified_at ? (
                        <span className="text-xs font-semibold text-brand-teal">✓ Card Verified</span>
                      ) : (
                        <span className="text-xs text-brand-navy/40">Card not verified</span>
                      )}
                      <span className="text-xs text-brand-navy/30">
                        Applied {new Date(b.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveBidder(b.id, 'approved')}
                      disabled={actionLoading === b.id}
                      className="px-4 py-2 bg-brand-teal text-white rounded-xl text-sm font-semibold hover:bg-brand-teal/80 transition-colors disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => approveBidder(b.id, 'rejected')}
                      disabled={actionLoading === b.id}
                      className="px-4 py-2 bg-brand-navy/10 text-brand-navy/70 rounded-xl text-sm font-semibold hover:bg-brand-coral/10 hover:text-brand-coral transition-colors disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const colors: Record<string, string> = {
    open: 'bg-brand-teal/10 text-brand-teal',
    preview: 'bg-brand-navy/10 text-brand-navy/60',
    closed: 'bg-brand-navy/10 text-brand-navy/40',
    cancelled: 'bg-brand-coral/10 text-brand-coral',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${colors[status] ?? 'bg-gray-100 text-gray-500'}`}>
      {status}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-game-bg rounded-xl p-3">
      <p className="text-xs text-brand-navy/40 uppercase tracking-wider font-semibold mb-0.5">{label}</p>
      <p className="font-bold text-brand-navy">{value}</p>
    </div>
  );
}
