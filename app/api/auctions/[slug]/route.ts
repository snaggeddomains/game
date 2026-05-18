import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import type { Auction, PublicBidEvent } from '@/lib/auction-types';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = createServiceClient();

  const { data: auctionRaw, error } = await supabase
    .from('auctions')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !auctionRaw) {
    return NextResponse.json({ error: 'Auction not found' }, { status: 404 });
  }

  // Strip reserve_price from the public response
  const { reserve_price: _, ...publicAuction } = auctionRaw as unknown as Auction & { reserve_price?: number };

  // Recent bid history (public — max_bid_amount excluded)
  const { data: bidEventsRaw } = await supabase
    .from('bid_events')
    .select('id,auction_id,user_id,event_type,bid_amount,resulting_standing_price,created_at')
    .eq('auction_id', publicAuction.id)
    .in('event_type', ['manual_bid', 'proxy_bid'])
    .order('created_at', { ascending: false })
    .limit(20);

  const bidEvents: PublicBidEvent[] = (bidEventsRaw ?? []).map((e) => {
    const row = e as unknown as PublicBidEvent;
    return {
      id: row.id,
      auction_id: row.auction_id,
      user_id: row.user_id,
      event_type: row.event_type,
      bid_amount: row.bid_amount,
      resulting_standing_price: row.resulting_standing_price,
      created_at: row.created_at,
    };
  });

  // Bid increment schedule for this auction
  const { data: schedule } = await supabase
    .from('auction_increment_schedules')
    .select('min_price,max_price,increment_amount')
    .or(`auction_id.eq.${publicAuction.id},auction_id.is.null`)
    .order('min_price', { ascending: true });

  return NextResponse.json({
    auction: publicAuction,
    bidEvents,
    incrementSchedule: schedule ?? [],
  });
}
