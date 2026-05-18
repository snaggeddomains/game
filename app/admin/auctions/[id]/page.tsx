'use client';

import { useState, useEffect, use } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase-client';
import { formatCurrency } from '@/lib/increments';

interface BidEvent {
  id: string;
  user_id: string;
  event_type: string;
  bid_amount: number;
  max_bid_amount: number | null;
  resulting_standing_price: number;
  created_at: string;
}

interface StandingBid {
  user_id: string;
  max_bid: number;
  is_leader: boolean;
  updated_at: string;
  bidder_profiles: { full_name: string; email: string; company: string | null } | null;
}

interface AuctionFull {
  id: string;
  slug: string;
  domain: string;
  status: string;
  start_time: string | null;
  end_time: string | null;
  reserve_price: number | null;
  reserve_met: boolean;
  starting_bid: number;
  current_bid: number | null;
  bid_count: number;
  soft_close_minutes: number;
  soft_close_extension_minutes: number;
  verification_hold_cents: number;
}

export default function AdminAuctionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const supabase = getSupabaseBrowserClient();

  const [token, setToken] = useState<string | null>(null);
  const [auction, setAuction] = useState<AuctionFull | null>(null);
  const [bidEvents, setBidEvents] = useState<BidEvent[]>([]);
  const [standingBids, setStandingBids] = useState<StandingBid[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // Editable fields
  const [editStatus, setEditStatus] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [editReserve, setEditReserve] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { window.location.href = '/'; return; }
      setToken(session.access_token);
    });
  }, [supabase]);

  useEffect(() => {
    if (!token) return;
    fetch(`/api/admin/auctions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        setAuction(d.auction);
        setBidEvents(d.bidEvents ?? []);
        setStandingBids(d.standingBids ?? []);
        setEditStatus(d.auction?.status ?? '');
        setEditEndTime(d.auction?.end_time ? d.auction.end_time.slice(0, 16) : '');
        setEditReserve(d.auction?.reserve_price ? String(d.auction.reserve_price) : '');
        setLoading(false);
      });
  }, [token, id]);

  const saveChanges = async () => {
    if (!token || !auction) return;
    setSaving(true);
    setSaveMsg('');
    const res = await fetch(`/api/admin/auctions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        status: editStatus,
        end_time: editEndTime ? new Date(editEndTime).toISOString() : undefined,
        reserve_price: editReserve ? parseFloat(editReserve) : null,
      }),
    });
    const d = await res.json();
    setSaving(false);
    if (res.ok) {
      setAuction(d.auction);
      setSaveMsg('Saved.');
    } else {
      setSaveMsg(d.error ?? 'Save failed.');
    }
  };

  if (loading || !auction) {
    return (
      <div className="min-h-screen bg-game-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-navy/20 border-t-brand-teal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-game-bg">
      <nav className="bg-brand-navy h-14 flex items-center px-6 gap-3">
        <a href="/admin" className="font-display text-xl tracking-wider text-brand-cream">SNAGGED</a>
        <span className="text-white/30">/</span>
        <a href="/admin" className="text-white/60 text-sm font-medium hover:text-white">Admin</a>
        <span className="text-white/30">/</span>
        <span className="text-white/80 text-sm font-medium">{auction.domain}</span>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">{auction.domain}</h1>
            <p className="text-brand-navy/50 text-sm mt-1">Auction ID: {auction.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <a href={`/${auction.slug}`} target="_blank" className="text-sm text-brand-teal hover:underline">
              View public page →
            </a>
          </div>
        </div>

        {/* ── Settings ─────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-game-border p-6">
          <h2 className="font-bold text-brand-navy mb-5">Auction Settings</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/50 mb-2">Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-4 py-3 border-2 border-game-border rounded-xl text-brand-navy focus:outline-none focus:border-brand-teal bg-white"
              >
                {['preview', 'open', 'closed', 'cancelled'].map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/50 mb-2">End Time</label>
              <input
                type="datetime-local"
                value={editEndTime}
                onChange={(e) => setEditEndTime(e.target.value)}
                className="w-full px-4 py-3 border-2 border-game-border rounded-xl text-brand-navy focus:outline-none focus:border-brand-teal"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy/50 mb-2">
                Reserve Price (confidential)
              </label>
              <input
                type="number"
                value={editReserve}
                onChange={(e) => setEditReserve(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 border-2 border-game-border rounded-xl text-brand-navy focus:outline-none focus:border-brand-teal"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <button onClick={saveChanges} disabled={saving} className="btn-navy text-sm px-5 py-2.5">
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            {saveMsg && <p className="text-sm text-brand-teal">{saveMsg}</p>}
          </div>
        </section>

        {/* ── Standings ────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-game-border p-6">
          <h2 className="font-bold text-brand-navy mb-1">Bidder Standings</h2>
          <p className="text-xs text-brand-navy/40 mb-5">Max bids are confidential — visible to admins only.</p>
          {standingBids.length === 0 ? (
            <p className="text-brand-navy/40 text-sm">No bids yet.</p>
          ) : (
            <div className="divide-y divide-game-border">
              {standingBids.map((sb, i) => (
                <div key={sb.user_id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? 'bg-brand-teal text-white' : 'bg-brand-navy/10 text-brand-navy/50'
                    }`}>{i + 1}</span>
                    <div>
                      <p className="font-semibold text-brand-navy text-sm">
                        {sb.bidder_profiles?.full_name ?? 'Unknown'}
                        {sb.is_leader && (
                          <span className="ml-2 text-xs text-brand-teal font-normal">Current leader</span>
                        )}
                      </p>
                      <p className="text-xs text-brand-navy/40">{sb.bidder_profiles?.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-navy text-sm">{formatCurrency(sb.max_bid)}</p>
                    <p className="text-xs text-brand-navy/30">max bid</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Bid log ──────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-game-border p-6">
          <h2 className="font-bold text-brand-navy mb-5">Bid Event Log</h2>
          {bidEvents.length === 0 ? (
            <p className="text-brand-navy/40 text-sm">No bid events yet.</p>
          ) : (
            <div className="divide-y divide-game-border text-sm">
              {bidEvents.map((e) => (
                <div key={e.id} className="py-3 grid grid-cols-4 gap-2">
                  <div className="text-brand-navy/40 text-xs">{new Date(e.created_at).toLocaleString()}</div>
                  <div>
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                      e.event_type === 'manual_bid' ? 'bg-brand-teal/10 text-brand-teal'
                      : e.event_type === 'proxy_bid' ? 'bg-brand-navy/10 text-brand-navy/60'
                      : e.event_type === 'outbid_notification' ? 'bg-brand-coral/10 text-brand-coral'
                      : 'bg-gray-100 text-gray-500'
                    }`}>
                      {e.event_type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="font-semibold text-brand-navy">{formatCurrency(e.bid_amount)}</div>
                  <div className="text-right text-brand-navy/60">
                    {e.max_bid_amount ? (
                      <span title="Max bid (admin only)" className="text-brand-coral font-medium">
                        max: {formatCurrency(e.max_bid_amount)}
                      </span>
                    ) : (
                      <span>→ {formatCurrency(e.resulting_standing_price)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
