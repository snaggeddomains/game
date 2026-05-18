/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { releaseVerificationHold } from '@/lib/stripe';
import { sendNotification } from '@/lib/email';
import type { Auction } from '@/lib/auction-types';

function isAdmin(email: string | undefined): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());
  return !!email && adminEmails.includes(email.toLowerCase());
}

async function requireAdmin(req: NextRequest) {
  const supabase = createServiceClient();
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const { data: { user } } = await supabase.auth.getUser(authHeader.slice(7));
  if (!user || !isAdmin(user.email)) return null;
  return user;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const supabase = createServiceClient();

  const { data: auction } = await (supabase as any)
    .from('auctions').select('*').eq('id', id).single();
  if (!auction) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { data: bidEvents } = await (supabase as any)
    .from('bid_events').select('*').eq('auction_id', id).order('created_at', { ascending: false });

  const { data: standingBids } = await (supabase as any)
    .from('standing_bids')
    .select('*, bidder_profiles(full_name, email, company)')
    .eq('auction_id', id)
    .order('max_bid', { ascending: false });

  return NextResponse.json({ auction, bidEvents: bidEvents ?? [], standingBids: standingBids ?? [] });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const supabase = createServiceClient();
  const body = await req.json();

  const allowed = ['status', 'start_time', 'end_time', 'reserve_price',
                   'starting_bid', 'soft_close_minutes', 'soft_close_extension_minutes',
                   'verification_hold_cents'];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update.' }, { status: 400 });
  }

  const { data: auctionRaw, error } = await (supabase as any)
    .from('auctions').update(updates).eq('id', id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const auction = auctionRaw as Auction & { reserve_price?: number };

  await (supabase as any).from('admin_actions').insert({
    admin_user_id: admin.id,
    action_type: 'update_auction',
    target_type: 'auction',
    target_id: id,
    payload: updates,
  });

  if (updates.status === 'closed' && auction?.current_bid_user_id) {
    const { data: winner } = await (supabase as any)
      .from('bidder_profiles').select('email, full_name').eq('user_id', auction.current_bid_user_id).single();

    if (winner) {
      sendNotification({
        userId: auction.current_bid_user_id,
        email: winner.email,
        type: 'winning',
        auctionId: id,
        payload: {
          domain: auction.domain,
          winningBid: `$${auction.current_bid?.toLocaleString()}`,
        },
      }).catch(console.error);
    }

    const { data: otherVs } = await (supabase as any)
      .from('payment_verifications')
      .select('stripe_payment_intent_id')
      .eq('auction_id', id)
      .eq('status', 'authorized')
      .neq('user_id', auction.current_bid_user_id);

    for (const v of (otherVs ?? []) as { stripe_payment_intent_id: string | null }[]) {
      if (v.stripe_payment_intent_id) {
        releaseVerificationHold(v.stripe_payment_intent_id).catch(console.error);
        await (supabase as any)
          .from('payment_verifications')
          .update({ status: 'released' })
          .eq('stripe_payment_intent_id', v.stripe_payment_intent_id);
      }
    }
  }

  return NextResponse.json({ auction });
}
