/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ user: null, profile: null });
  }

  const supabase = createServiceClient();
  const { data: { user } } = await supabase.auth.getUser(authHeader.slice(7));
  if (!user) return NextResponse.json({ user: null, profile: null });

  const auctionId = req.nextUrl.searchParams.get('auction_id');

  const { data: profile } = await (supabase as any)
    .from('bidder_profiles')
    .select('id,full_name,email,status,card_verified_at,card_last4,card_brand')
    .eq('user_id', user.id)
    .single();

  let verification = null;
  let standingBid = null;
  let isLeader = false;

  if (auctionId && profile) {
    const { data: v } = await (supabase as any)
      .from('payment_verifications').select('status').eq('user_id', user.id).eq('auction_id', auctionId).single();
    verification = v;

    const { data: sb } = await (supabase as any)
      .from('standing_bids').select('max_bid, is_leader').eq('user_id', user.id).eq('auction_id', auctionId).single();
    if (sb) {
      standingBid = sb.max_bid;
      isLeader = sb.is_leader;
    }
  }

  return NextResponse.json({
    user: { id: user.id, email: user.email, emailVerified: !!user.email_confirmed_at },
    profile,
    verification,
    standingBid,
    isLeader,
  });
}
