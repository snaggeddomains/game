import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { GameMode } from '@/lib/types';
import { TOTAL_ROUNDS } from '@/lib/types';

const TAKEN_PER_ROUND = Math.ceil(TOTAL_ROUNDS * 0.4);    // 4 taken
const AVAILABLE_PER_ROUND = TOTAL_ROUNDS - TAKEN_PER_ROUND; // 6 available

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const mode = searchParams.get('mode') as GameMode | null;

  const validModes: GameMode[] = ['regular', 'kid_friendly', 'adult'];
  if (!mode || !validModes.includes(mode)) {
    return NextResponse.json({ error: 'Invalid or missing mode parameter.' }, { status: 400 });
  }

  // Fetch taken and available separately so we always guarantee a balanced mix.
  // Random offset into the full pool ensures variety across sessions.
  async function fetchPool(status: 'taken' | 'available', need: number) {
    const { count } = await supabase
      .from('domains')
      .select('*', { count: 'exact', head: true })
      .eq('mode', mode!)
      .eq('availability_status', status);

    const total = count ?? 0;
    const fetchSize = Math.min(need * 4, total);
    const maxOffset = Math.max(0, total - fetchSize);
    const offset = Math.floor(Math.random() * maxOffset);

    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .eq('mode', mode!)
      .eq('availability_status', status)
      .range(offset, offset + fetchSize - 1);

    if (error) throw new Error(error.message);
    return data ?? [];
  }

  try {
    const [takenPool, availablePool] = await Promise.all([
      fetchPool('taken', TAKEN_PER_ROUND),
      fetchPool('available', AVAILABLE_PER_ROUND),
    ]);

    const shuffle = <T>(arr: T[]) => arr.sort(() => Math.random() - 0.5);

    const taken = shuffle(takenPool).slice(0, TAKEN_PER_ROUND);
    const available = shuffle(availablePool).slice(0, AVAILABLE_PER_ROUND);

    if (taken.length + available.length < TOTAL_ROUNDS) {
      return NextResponse.json(
        { error: `Not enough domains in the pool for mode "${mode}". Run the seed script first.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ domains: shuffle([...taken, ...available]) });
  } catch (err) {
    console.error('Error fetching domains:', err);
    return NextResponse.json({ error: 'Failed to fetch domains.' }, { status: 500 });
  }
}
