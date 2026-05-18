/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

function isAdmin(email: string | undefined): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());
  return !!email && adminEmails.includes(email.toLowerCase());
}

export async function GET(req: NextRequest) {
  const supabase = createServiceClient();
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { data: { user } } = await supabase.auth.getUser(authHeader.slice(7));
  if (!user || !isAdmin(user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const status = req.nextUrl.searchParams.get('status');
  let query = (supabase as any).from('bidder_profiles').select('*').order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);

  const { data: profiles } = await query;
  return NextResponse.json({ profiles: profiles ?? [] });
}
