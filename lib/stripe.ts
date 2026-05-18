import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY env var is required');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-04-22.dahlia',
  typescript: true,
});

// Create or retrieve a Stripe customer for a bidder
export async function getOrCreateStripeCustomer(
  email: string,
  name: string,
  userId: string,
  existingCustomerId?: string | null
): Promise<string> {
  if (existingCustomerId) {
    return existingCustomerId;
  }
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { supabase_user_id: userId },
  });
  return customer.id;
}

// Create a SetupIntent to collect and save a payment method
export async function createSetupIntent(customerId: string): Promise<Stripe.SetupIntent> {
  return stripe.setupIntents.create({
    customer: customerId,
    payment_method_types: ['card'],
    usage: 'off_session',
  });
}

// Create a manual-capture authorization hold for bidder verification.
// This places a hold on the card without charging it.
// The hold should be released after the auction closes (or captured if bidder defaults).
export async function createVerificationHold(
  customerId: string,
  paymentMethodId: string,
  amountCents: number,
  auctionSlug: string,
  userId: string
): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.create({
    amount: amountCents,
    currency: 'usd',
    customer: customerId,
    payment_method: paymentMethodId,
    capture_method: 'manual',
    confirm: true,
    off_session: true,
    description: `Bidder verification hold — Snagged Auctions / ${auctionSlug}`,
    metadata: {
      auction_slug: auctionSlug,
      supabase_user_id: userId,
      purpose: 'bidder_verification_hold',
    },
    statement_descriptor_suffix: 'SNAGGED BID',
  });
}

// Release (cancel) a verification hold after auction closes
export async function releaseVerificationHold(paymentIntentId: string): Promise<void> {
  await stripe.paymentIntents.cancel(paymentIntentId);
}

export function formatAmount(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}
