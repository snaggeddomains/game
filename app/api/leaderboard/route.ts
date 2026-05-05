import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function GET() {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from('game_leaderboard')
    .select('rank, display_name, avg_accuracy, games_played, total_answers, best_score, best_streak')
    .order('rank', { ascending: true })
    .limit(100);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard.' }, { status: 500 });
  }

  return NextResponse.json({ players: data ?? [] });
}
