// Supabase table types — generated manually since we don't use the CLI type gen here.
// If you add the Supabase CLI, run: supabase gen types typescript --local > lib/database.types.ts

export type Database = {
  public: {
    Tables: {
      auctions: {
        Row: {
          id: string;
          slug: string;
          title: string;
          domain: string;
          tagline: string | null;
          description: string | null;
          status: 'preview' | 'open' | 'closed' | 'cancelled';
          start_time: string | null;
          end_time: string | null;
          reserve_price: number | null;
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
        };
        Insert: Partial<Database['public']['Tables']['auctions']['Row']> & {
          slug: string; title: string; domain: string;
        };
        Update: Partial<Database['public']['Tables']['auctions']['Row']>;
      };
      bidder_profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          email: string;
          company: string | null;
          phone: string | null;
          country: string;
          status: 'pending' | 'approved' | 'rejected' | 'suspended';
          terms_agreed_at: string;
          binding_bids_agreed_at: string;
          stripe_customer_id: string | null;
          stripe_payment_method_id: string | null;
          card_last4: string | null;
          card_brand: string | null;
          card_verified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bidder_profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['bidder_profiles']['Row']>;
      };
      payment_verifications: {
        Row: {
          id: string;
          user_id: string;
          auction_id: string;
          stripe_setup_intent_id: string | null;
          stripe_payment_intent_id: string | null;
          amount_cents: number;
          status: 'pending' | 'setup_complete' | 'authorized' | 'released' | 'failed';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['payment_verifications']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['payment_verifications']['Row']>;
      };
      standing_bids: {
        Row: {
          id: string;
          auction_id: string;
          user_id: string;
          max_bid: number;
          is_leader: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['standing_bids']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['standing_bids']['Row']>;
      };
      bid_events: {
        Row: {
          id: string;
          auction_id: string;
          user_id: string;
          event_type: 'manual_bid' | 'proxy_bid' | 'max_bid_updated' | 'outbid_notification';
          bid_amount: number;
          max_bid_amount: number | null;
          resulting_standing_price: number;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bid_events']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
      notification_events: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          event_type: string;
          auction_id: string | null;
          payload: Record<string, unknown>;
          sent_at: string | null;
          error: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['notification_events']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['notification_events']['Row']>;
      };
      admin_actions: {
        Row: {
          id: string;
          admin_user_id: string;
          action_type: string;
          target_type: string | null;
          target_id: string | null;
          notes: string | null;
          payload: Record<string, unknown>;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['admin_actions']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
      auction_increment_schedules: {
        Row: {
          id: string;
          auction_id: string | null;
          min_price: number;
          max_price: number | null;
          increment_amount: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['auction_increment_schedules']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['auction_increment_schedules']['Row']>;
      };
      // Legacy game tables
      domains: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      game_email_captures: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      game_results: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
    };
    Functions: {
      process_bid: {
        Args: {
          p_auction_id: string;
          p_user_id: string;
          p_bid_amount: number;
          p_max_bid?: number | null;
          p_ip_address?: string | null;
          p_user_agent?: string | null;
        };
        Returns: {
          success: boolean;
          is_leader?: boolean;
          standing_bid?: number;
          message?: string;
          error?: string;
          outbid_user_id?: string;
        };
      };
      get_bid_increment: {
        Args: { p_auction_id: string; p_current_price: number };
        Returns: number;
      };
      maybe_extend_auction: {
        Args: { p_auction_id: string };
        Returns: void;
      };
    };
    Enums: Record<string, never>;
  };
};
