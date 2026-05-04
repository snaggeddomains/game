import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { GameMode } from '@/lib/types';
import { TOTAL_ROUNDS } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const mode = searchParams.get('mode') as GameMode | null;

  const validModes: GameMode[] = ['regular', 'kid_friendly', 'adult'];
  if (!mode || !validModes.includes(mode)) {
    return NextResponse.json({ error: 'Invalid or missing mode parameter.' }, { status: 400 });
  }

  // Fetch a pool larger than needed, then randomly slice — avoids ORDER BY RANDOM() being slow at scale
  const { data, error } = await supabase
    .from('domains')
    .select('*')
    .eq('mode', mode)
    .in('availability_status', ['available', 'taken'])
    .limit(60);

  if (error) {
    console.error('Supabase error fetching domains:', error);
    return NextResponse.json({ error: 'Failed to fetch domains.' }, { status: 500 });
  }

  if (!data || data.length < TOTAL_ROUNDS) {
    return NextResponse.json(
      { error: `Not enough domains in the pool for mode "${mode}". Run the seed script first.` },
      { status: 404 }
    );
  }

  // Ensure a balanced mix: at least ~40% of each status
  const taken = data.filter((d) => d.availability_status === 'taken');
  const available = data.filter((d) => d.availability_status === 'available');

  const shuffle = <T>(arr: T[]) => arr.sort(() => Math.random() - 0.5);

  const takenCount = Math.min(Math.ceil(TOTAL_ROUNDS * 0.5), taken.length);
  const availableCount = TOTAL_ROUNDS - takenCount;

  const selected = [
    ...shuffle(taken).slice(0, takenCount),
    ...shuffle(available).slice(0, availableCount),
  ];

  const domains = shuffle(selected).slice(0, TOTAL_ROUNDS);

  return NextResponse.json({ domains });
}
