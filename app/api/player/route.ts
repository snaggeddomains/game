import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  let body: { display_name: string; email: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { display_name, email } = body;
  if (!display_name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'display_name and email are required.' }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Upsert by email — update display_name if they re-register
  const { data, error } = await supabase
    .from('game_leaderboard_players')
    .upsert(
      { display_name: display_name.trim(), email: email.trim().toLowerCase() },
      { onConflict: 'email', ignoreDuplicates: false }
    )
    .select('id')
    .single();

  if (error) {
    console.error('Error upserting player:', error);
    return NextResponse.json({ error: 'Failed to register player.' }, { status: 500 });
  }

  return NextResponse.json({ player_id: data.id });
}
