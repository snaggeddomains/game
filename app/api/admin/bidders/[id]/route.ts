/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { sendNotification } from '@/lib/email';
import type { BidderProfile, BidderStatus } from '@/lib/auction-types';

function isAdmin(email: string | undefined): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());
  return !!email && adminEmails.includes(email.toLowerCase());
}

async function requireAdmin(req: NextRequest) {
  const supabase = createServiceClient();
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const { data: { user } } = await supabase.auth.getUser(authHeader.slice(7));
  if (!user || !isAdmin(user.email)) return null;
  return user;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const supabase = createServiceClient();

  const { data: profile } = await (supabase as any)
    .from('bidder_profiles').select('*').eq('id', id).single();
  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ profile });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const { status, notes }: { status: BidderStatus; notes?: string } = await req.json();

  const validStatuses: BidderStatus[] = ['pending', 'approved', 'rejected', 'suspended'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data: profileRaw, error } = await (supabase as any)
    .from('bidder_profiles')
    .update({ status })
    .eq('id', id)
    .select('user_id, email, full_name')
    .single();

  if (error || !profileRaw) return NextResponse.json({ error: 'Update failed.' }, { status: 500 });
  const profile = profileRaw as Pick<BidderProfile, 'user_id' | 'email' | 'full_name'>;

  await (supabase as any).from('admin_actions').insert({
    admin_user_id: admin.id,
    action_type: `bidder_${status}`,
    target_type: 'bidder_profile',
    target_id: id,
    notes: notes ?? null,
    payload: { status },
  });

  const notifType = status === 'approved' ? 'bidder_approved'
                  : status === 'rejected' ? 'bidder_rejected'
                  : null;

  if (notifType) {
    const { data: pv } = await (supabase as any)
      .from('payment_verifications')
      .select('auction_id')
      .eq('user_id', profile.user_id)
      .limit(1)
      .single();

    let domain = '';
    if (pv?.auction_id) {
      const { data: a } = await (supabase as any)
        .from('auctions').select('domain').eq('id', pv.auction_id).single();
      domain = a?.domain ?? '';
    }

    sendNotification({
      userId: profile.user_id,
      email: profile.email,
      type: notifType,
      auctionId: pv?.auction_id ?? null,
      payload: { full_name: profile.full_name, domain },
    }).catch(console.error);
  }

  return NextResponse.json({ profile });
}
