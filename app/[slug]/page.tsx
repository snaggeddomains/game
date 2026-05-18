import { notFound } from 'next/navigation';
import { createServiceClient } from '@/lib/supabase';
import type { Auction, PublicBidEvent, BidIncrementSchedule } from '@/lib/auction-types';
import AuctionPageClient from './AuctionPageClient';

export default async function AuctionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Block known non-auction routes from hitting this handler
  const RESERVED = ['game', 'admin', 'api', 'auth', '_next', 'favicon.ico'];
  if (RESERVED.includes(slug)) notFound();

  const supabase = createServiceClient();
  const { data: auctionRaw, error } = await supabase
    .from('auctions')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !auctionRaw) notFound();
  const auction = auctionRaw as unknown as Auction;

  const { data: bidEventsRaw } = await supabase
    .from('bid_events')
    .select('id,auction_id,user_id,event_type,bid_amount,resulting_standing_price,created_at')
    .eq('auction_id', auction.id)
    .in('event_type', ['manual_bid', 'proxy_bid'])
    .order('created_at', { ascending: false })
    .limit(20);

  const { data: scheduleRaw } = await supabase
    .from('auction_increment_schedules')
    .select('id,auction_id,min_price,max_price,increment_amount,created_at')
    .or(`auction_id.eq.${auction.id},auction_id.is.null`)
    .order('min_price', { ascending: true });

  const bidEvents = (bidEventsRaw ?? []) as unknown as PublicBidEvent[];
  const incrementSchedule = (scheduleRaw ?? []) as unknown as BidIncrementSchedule[];

  return (
    <AuctionPageClient
      auction={auction}
      initialBidEvents={bidEvents}
      incrementSchedule={incrementSchedule}
    />
  );
}
