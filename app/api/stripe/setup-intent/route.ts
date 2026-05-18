/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { stripe, getOrCreateStripeCustomer } from '@/lib/stripe';

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

  const { data: profile } = await (supabase as any)
    .from('bidder_profiles')
    .select('full_name, email, stripe_customer_id, card_verified_at')
    .eq('user_id', user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: 'Complete bidder registration first.' }, { status: 400 });
  }

  const customerId = await getOrCreateStripeCustomer(
    profile.email,
    profile.full_name,
    user.id,
    profile.stripe_customer_id
  );

  if (!profile.stripe_customer_id) {
    await (supabase as any)
      .from('bidder_profiles')
      .update({ stripe_customer_id: customerId })
      .eq('user_id', user.id);
  }

  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
    payment_method_types: ['card'],
    usage: 'off_session',
    metadata: { supabase_user_id: user.id },
  });

  return NextResponse.json({ clientSecret: setupIntent.client_secret, customerId });
}
