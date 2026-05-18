/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { sendNotification } from '@/lib/email';
import type { RegisterBidderRequest, BidderProfile } from '@/lib/auction-types';

const COUNTRY_CODES = [
  'US','CA','GB','AU','DE','FR','ES','IT','NL','SE','NO','DK','FI','CH','AT',
  'BE','PT','IE','NZ','JP','SG','HK','KR','IN','BR','MX','AR','CL','CO',
  'AE','SA','IL','ZA','NG','EG','Other',
];

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();

  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { data: { user }, error: authErr } = await supabase.auth.getUser(authHeader.slice(7));
  if (authErr || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!user.email_confirmed_at) {
    return NextResponse.json({ error: 'Please verify your email before registering.' }, { status: 403 });
  }

  const body: RegisterBidderRequest = await req.json();
  const { full_name, email, company, phone, country, auction_id } = body;

  if (!full_name?.trim() || !email?.trim() || !country?.trim() || !auction_id) {
    return NextResponse.json({ error: 'full_name, email, country, and auction_id are required.' }, { status: 400 });
  }
  if (!COUNTRY_CODES.includes(country)) {
    return NextResponse.json({ error: 'Invalid country code.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const now = new Date().toISOString();

  const { data: profileRaw, error: profileErr } = await (supabase as any)
    .from('bidder_profiles')
    .upsert(
      {
        user_id: user.id,
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        company: company?.trim() || null,
        phone: phone?.trim() || null,
        country,
        terms_agreed_at: now,
        binding_bids_agreed_at: now,
        status: 'pending',
      },
      { onConflict: 'user_id', ignoreDuplicates: false }
    )
    .select('*')
    .single();

  if (profileErr) {
    console.error('[register] profile upsert error:', profileErr);
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 });
  }
  const profile = profileRaw as BidderProfile;

  await (supabase as any)
    .from('payment_verifications')
    .upsert(
      { user_id: user.id, auction_id, amount_cents: 50000, status: 'pending' },
      { onConflict: 'user_id,auction_id', ignoreDuplicates: true }
    );

  sendNotification({
    userId: user.id,
    email: profile.email,
    type: 'registration_confirmation',
    auctionId: auction_id,
    payload: { full_name: profile.full_name },
  }).catch(console.error);

  return NextResponse.json({ profile }, { status: 201 });
}
