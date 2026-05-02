import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { GameMode, RoundResult } from '@/lib/types';

interface GameResultPayload {
  mode: GameMode;
  score: number;
  max_streak: number;
  rounds: RoundResult[];
}

export async function POST(req: NextRequest) {
  let body: GameResultPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { mode, score, max_streak, rounds } = body;

  if (!mode || typeof score !== 'number' || !Array.isArray(rounds)) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const correctCount = rounds.filter((r) => r.correct).length;
  const accuracy = rounds.length > 0 ? (correctCount / rounds.length) * 100 : 0;

  // Save anonymised aggregate result
  const { error: resultError } = await supabase.from('game_results').insert({
    mode,
    score,
    max_streak,
    accuracy: Math.round(accuracy * 100) / 100,
  });

  if (resultError) {
    console.error('Error saving game result:', resultError);
  }

  // Update per-domain analytics (times_shown + rolling correct_guess_rate)
  const updates = rounds.map((r) => ({
    id: r.domain.id,
    times_shown: (r.domain.times_shown ?? 0) + 1,
    correct_guess_rate: computeNewRate(
      r.domain.correct_guess_rate,
      r.domain.times_shown ?? 0,
      r.correct
    ),
    updated_at: new Date().toISOString(),
  }));

  // Upsert in parallel (best-effort; don't fail the response on analytics errors)
  await Promise.allSettled(
    updates.map(({ id, ...rest }) =>
      supabase.from('domains').update(rest).eq('id', id)
    )
  );

  return NextResponse.json({ ok: true, accuracy });
}

function computeNewRate(
  currentRate: number | null,
  timesShown: number,
  correct: boolean
): number {
  if (timesShown === 0 || currentRate === null) return correct ? 100 : 0;
  const totalCorrect = (currentRate / 100) * timesShown + (correct ? 1 : 0);
  return Math.round((totalCorrect / (timesShown + 1)) * 10000) / 100;
}
