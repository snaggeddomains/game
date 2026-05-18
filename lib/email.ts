// Email notification abstraction.
// In production, wire sendEmail() to Resend, SendGrid, Postmark, or similar.
// The notification_events table acts as a durable queue — rows are inserted
// before sending so they can be retried if the send fails.

import type { NotificationType } from './auction-types';
import { createServiceClient } from './supabase';

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
}

// Replace with a real email provider call in production.
async function sendEmail(payload: EmailPayload): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    console.log('[email]', payload.to, '|', payload.subject);
    return;
  }

  // Production: call your provider here.
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: 'auctions@snagged.com', ...payload });

  console.warn('[email] No email provider configured. Set up sendEmail() in lib/email.ts');
}

interface SendNotificationOptions {
  userId: string | null;
  email: string;
  type: NotificationType;
  auctionId: string | null;
  payload: Record<string, unknown>;
}

export async function sendNotification(opts: SendNotificationOptions): Promise<void> {
  const supabase = createServiceClient();

  const emailPayload = buildEmailPayload(opts.type, opts.email, opts.payload);
  if (!emailPayload) return;

  // Insert notification record first (acts as audit + retry queue)
  const { data: notif } = await supabase
    .from('notification_events')
    .insert({
      user_id: opts.userId,
      email: opts.email,
      event_type: opts.type,
      auction_id: opts.auctionId,
      payload: opts.payload,
    })
    .select('id')
    .single();

  try {
    await sendEmail(emailPayload);
    if (notif) {
      await supabase
        .from('notification_events')
        .update({ sent_at: new Date().toISOString() })
        .eq('id', notif.id);
    }
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    if (notif) {
      await supabase
        .from('notification_events')
        .update({ error })
        .eq('id', notif.id);
    }
    console.error('[email] Send failed:', error);
  }
}

function buildEmailPayload(
  type: NotificationType,
  to: string,
  data: Record<string, unknown>
): EmailPayload | null {
  const base = 'Snagged Auctions';

  switch (type) {
    case 'registration_confirmation':
      return {
        to,
        subject: `Welcome to Snagged Auctions — complete your registration`,
        html: `<p>Thanks for registering. Please verify your email to continue.</p>`,
        text: `Thanks for registering. Please verify your email to continue.`,
      };

    case 'verify_email':
      return {
        to,
        subject: `Verify your email — ${base}`,
        html: `<p>Click the link in the email from Supabase to verify your address.</p>`,
        text: `Check your inbox for a verification link.`,
      };

    case 'bidder_approved':
      return {
        to,
        subject: `You're approved to bid — ${data.domain ?? ''}`,
        html: `<p>Your bidder application has been approved. You may now place bids.</p>`,
        text: `Your bidder application has been approved. You may now place bids.`,
      };

    case 'bidder_rejected':
      return {
        to,
        subject: `Bidder application update — ${base}`,
        html: `<p>Unfortunately we were unable to approve your bidder application at this time. Please contact us if you have questions.</p>`,
        text: `Your bidder application was not approved. Please contact us for details.`,
      };

    case 'card_verified':
      return {
        to,
        subject: `Card verified — ${base}`,
        html: `<p>Your payment method has been verified. You may now bid once approved.</p>`,
        text: `Your payment method has been verified.`,
      };

    case 'outbid':
      return {
        to,
        subject: `You've been outbid on ${data.domain ?? ''} — act now`,
        html: `<p>Someone has outbid you. The current bid is <strong>${data.currentBid}</strong>. <a href="${data.auctionUrl}">Bid now</a></p>`,
        text: `You've been outbid. Current bid: ${data.currentBid}. Visit ${data.auctionUrl} to respond.`,
      };

    case 'winning':
      return {
        to,
        subject: `Congratulations — you won ${data.domain ?? ''}!`,
        html: `<p>You are the winning bidder at <strong>${data.winningBid}</strong>. Our team will be in touch to coordinate transfer via Escrow.com.</p>`,
        text: `Congratulations! You won at ${data.winningBid}. Expect an email from our team shortly.`,
      };

    case 'auction_closing_soon':
      return {
        to,
        subject: `Auction closing soon — ${data.domain ?? ''}`,
        html: `<p>The auction for ${data.domain} closes in <strong>${data.timeRemaining}</strong>. Current bid: ${data.currentBid}.</p>`,
        text: `Auction closing soon. ${data.domain} — ${data.timeRemaining} remaining. Current bid: ${data.currentBid}.`,
      };

    case 'auction_ended':
      return {
        to,
        subject: `Auction ended — ${data.domain ?? ''}`,
        html: `<p>The auction for ${data.domain} has closed. Final price: ${data.finalBid}.</p>`,
        text: `Auction closed. ${data.domain}. Final price: ${data.finalBid}.`,
      };

    default:
      return null;
  }
}
