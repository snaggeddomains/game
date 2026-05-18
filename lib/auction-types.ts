export type AuctionStatus = 'preview' | 'open' | 'closed' | 'cancelled';
export type BidderStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type VerificationStatus = 'pending' | 'setup_complete' | 'authorized' | 'released' | 'failed';
export type BidEventType = 'manual_bid' | 'proxy_bid' | 'max_bid_updated' | 'outbid_notification';
export type NotificationType =
  | 'registration_confirmation'
  | 'verify_email'
  | 'bidder_approved'
  | 'bidder_rejected'
  | 'card_verified'
  | 'outbid'
  | 'winning'
  | 'auction_closing_soon'
  | 'auction_ended';

export interface Auction {
  id: string;
  slug: string;
  title: string;
  domain: string;
  tagline: string | null;
  description: string | null;
  status: AuctionStatus;
  start_time: string | null;
  end_time: string | null;
  reserve_met: boolean;
  starting_bid: number;
  current_bid: number | null;
  current_bid_user_id: string | null;
  soft_close_minutes: number;
  soft_close_extension_minutes: number;
  bid_count: number;
  verification_hold_cents: number;
  created_at: string;
  updated_at: string;
}

// Public-safe auction view (no reserve_price exposed)
export interface PublicAuction extends Omit<Auction, 'reserve_price'> {
  reserve_price?: never;
}

export interface BidderProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  company: string | null;
  phone: string | null;
  country: string;
  status: BidderStatus;
  terms_agreed_at: string;
  binding_bids_agreed_at: string;
  stripe_customer_id: string | null;
  stripe_payment_method_id: string | null;
  card_last4: string | null;
  card_brand: string | null;
  card_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaymentVerification {
  id: string;
  user_id: string;
  auction_id: string;
  stripe_setup_intent_id: string | null;
  stripe_payment_intent_id: string | null;
  amount_cents: number;
  status: VerificationStatus;
  created_at: string;
  updated_at: string;
}

export interface BidEvent {
  id: string;
  auction_id: string;
  user_id: string;
  event_type: BidEventType;
  bid_amount: number;
  max_bid_amount: number | null; // never exposed publicly
  resulting_standing_price: number;
  created_at: string;
}

// Public-safe bid event (strips max_bid_amount)
export type PublicBidEvent = Omit<BidEvent, 'max_bid_amount'>;

export interface StandingBid {
  auction_id: string;
  user_id: string;
  max_bid: number;
  is_leader: boolean;
  updated_at: string;
}

export interface BidIncrementSchedule {
  id: string;
  auction_id: string | null;
  min_price: number;
  max_price: number | null;
  increment_amount: number;
}

export interface PlaceBidRequest {
  auction_id: string;
  bid_amount: number;
  max_bid?: number;
}

export interface PlaceBidResponse {
  success: boolean;
  is_leader?: boolean;
  standing_bid?: number;
  message?: string;
  error?: string;
  outbid_user_id?: string;
}

export interface RegisterBidderRequest {
  full_name: string;
  email: string;
  company?: string;
  phone?: string;
  country: string;
  auction_id: string;
}

// Derived: bidder's status on a specific auction
export interface BidderAuctionStatus {
  profile: BidderProfile | null;
  verification: PaymentVerification | null;
  isEmailVerified: boolean;
  canBid: boolean;
  isLeader: boolean;
  myCurrentBid: number | null;
}
