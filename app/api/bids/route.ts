/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { sendNotification } from '@/lib/email';
import type { PlaceBidRequest, PlaceBidResponse } from '@/lib/auction-types';

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();

  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = authHeader.slice(7);

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile } = await (supabase as any)
    .from('bidder_profiles').select('status, card_verified_at').eq('user_id', user.id).single();

  if (!profile) {
    return NextResponse.json({ error: 'Bidder profile not found. Please complete registration.' }, { status: 403 });
  }
  if (profile.status !== 'approved') {
    return NextResponse.json({
      error: profile.status === 'pending'
        ? 'Your bidder application is pending admin approval.'
        : 'Your bidder account is not authorized to bid.',
    }, { status: 403 });
  }
  if (!profile.card_verified_at) {
    return NextResponse.json({ error: 'Please complete card verification before bidding.' }, { status: 403 });
  }

  const body: PlaceBidRequest = await req.json();
  const { auction_id, bid_amount, max_bid } = body;

  if (!auction_id || typeof bid_amount !== 'number' || bid_amount <= 0) {
    return NextResponse.json({ error: 'Invalid bid parameters.' }, { status: 400 });
  }
  if (max_bid !== undefined && (typeof max_bid !== 'number' || max_bid < bid_amount)) {
    return NextResponse.json({ error: 'max_bid must be a number >= bid_amount.' }, { status: 400 });
  }

  const { data: verification } = await (supabase as any)
    .from('payment_verifications').select('status').eq('user_id', user.id).eq('auction_id', auction_id).single();

  if (!verification || verification.status !== 'authorized') {
    return NextResponse.json({ error: 'Card authorization required for this auction.' }, { status: 403 });
  }

  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? null;
  const ua = req.headers.get('user-agent') ?? null;

  const { data: result, error: rpcError } = await supabase.rpc('process_bid' as any, {
    p_auction_id:  auction_id,
    p_user_id:     user.id,
    p_bid_amount:  bid_amount,
    p_max_bid:     max_bid ?? null,
    p_ip_address:  ip,
    p_user_agent:  ua,
  });

  if (rpcError) {
    console.error('[bids] RPC error:', rpcError);
    return NextResponse.json({ error: 'Bid processing failed. Please try again.' }, { status: 500 });
  }

  const bidResult = result as unknown as PlaceBidResponse;

  if (bidResult.outbid_user_id) {
    const { data: outbidProfile } = await (supabase as any)
      .from('bidder_profiles').select('email, full_name').eq('user_id', bidResult.outbid_user_id).single();
    const { data: auctionData } = await (supabase as any)
      .from('auctions').select('domain, slug').eq('id', auction_id).single();

    if (outbidProfile && auctionData) {
      sendNotification({
        userId: bidResult.outbid_user_id,
        email: outbidProfile.email,
        type: 'outbid',
        auctionId: auction_id,
        payload: {
          domain: auctionData.domain,
          currentBid: `$${bidResult.standing_bid?.toLocaleString()}`,
          auctionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/${auctionData.slug}`,
        },
      }).catch(console.error);
    }
  }

  return NextResponse.json(bidResult);
}
