import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook signature missing' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[stripe-webhook] signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createServiceClient();

  switch (event.type) {
    case 'payment_intent.amount_capturable_updated': {
      // Authorization hold confirmed — already handled via API route
      break;
    }

    case 'payment_intent.payment_failed': {
      const pi = event.data.object as Stripe.PaymentIntent;
      const userId = pi.metadata?.supabase_user_id;
      if (userId) {
        await supabase
          .from('payment_verifications')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', pi.id);
      }
      break;
    }

    case 'payment_intent.canceled': {
      const pi = event.data.object as Stripe.PaymentIntent;
      await supabase
        .from('payment_verifications')
        .update({ status: 'released' })
        .eq('stripe_payment_intent_id', pi.id);
      break;
    }

    case 'setup_intent.succeeded': {
      const si = event.data.object as Stripe.SetupIntent;
      const userId = si.metadata?.supabase_user_id;
      if (userId) {
        await supabase
          .from('payment_verifications')
          .update({ stripe_setup_intent_id: si.id, status: 'setup_complete' })
          .eq('user_id', userId)
          .eq('status', 'pending');
      }
      break;
    }

    default:
      // Unhandled event types are expected; return 200 to acknowledge receipt
      break;
  }

  return NextResponse.json({ received: true });
}
