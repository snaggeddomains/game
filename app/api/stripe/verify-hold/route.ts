/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { stripe, createVerificationHold } from '@/lib/stripe';
import { sendNotification } from '@/lib/email';

// After SetupIntent completes on the client, this endpoint:
// 1. Attaches the payment method to the Stripe customer
// 2. Creates a manual-capture authorization hold (not a charge)
//
// Why a manual-capture hold vs. just saving the card?
// A hold proves card viability + real bidder intent.
// For premium domain auctions ($10k+), a $500 hold is industry standard.
// The hold is released after auction close for non-winners.
// Winners proceed to final settlement via Escrow.com — the hold does not cover the full purchase.
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

  const { paymentMethodId, auctionId } = await req.json();
  if (!paymentMethodId || !auctionId) {
    return NextResponse.json({ error: 'paymentMethodId and auctionId are required.' }, { status: 400 });
  }

  const { data: profile } = await (supabase as any)
    .from('bidder_profiles')
    .select('stripe_customer_id, email, full_name, card_verified_at')
    .eq('user_id', user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return NextResponse.json({ error: 'Create a setup intent first.' }, { status: 400 });
  }

  const { data: auction } = await (supabase as any)
    .from('auctions').select('id, slug, verification_hold_cents').eq('id', auctionId).single();
  if (!auction) return NextResponse.json({ error: 'Auction not found.' }, { status: 404 });

  const { data: existing } = await (supabase as any)
    .from('payment_verifications').select('status').eq('user_id', user.id).eq('auction_id', auctionId).single();
  if (existing?.status === 'authorized') {
    return NextResponse.json({ message: 'Card already verified for this auction.' });
  }

  await stripe.paymentMethods.attach(paymentMethodId, { customer: profile.stripe_customer_id });
  await stripe.customers.update(profile.stripe_customer_id, {
    invoice_settings: { default_payment_method: paymentMethodId },
  });

  const pm = await stripe.paymentMethods.retrieve(paymentMethodId);
  const card = pm.card;

  let paymentIntent;
  try {
    paymentIntent = await createVerificationHold(
      profile.stripe_customer_id,
      paymentMethodId,
      auction.verification_hold_cents,
      auction.slug,
      user.id
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Card authorization failed.';
    return NextResponse.json({ error: message }, { status: 402 });
  }

  await (supabase as any).from('bidder_profiles').update({
    stripe_payment_method_id: paymentMethodId,
    card_last4: card?.last4 ?? null,
    card_brand: card?.brand ?? null,
    card_verified_at: new Date().toISOString(),
  }).eq('user_id', user.id);

  await (supabase as any).from('payment_verifications').upsert(
    {
      user_id: user.id,
      auction_id: auctionId,
      stripe_payment_intent_id: paymentIntent.id,
      amount_cents: auction.verification_hold_cents,
      status: 'authorized',
    },
    { onConflict: 'user_id,auction_id' }
  );

  sendNotification({
    userId: user.id,
    email: profile.email,
    type: 'card_verified',
    auctionId,
    payload: { full_name: profile.full_name },
  }).catch(console.error);

  return NextResponse.json({
    success: true,
    card_last4: card?.last4,
    card_brand: card?.brand,
    hold_amount: auction.verification_hold_cents / 100,
  });
}
