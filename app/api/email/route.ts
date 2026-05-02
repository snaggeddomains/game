import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import type { GameMode } from '@/lib/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email: string; mode?: GameMode; score?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { email, mode, score } = body;

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { error } = await supabase.from('game_email_captures').insert({
    email: email.toLowerCase().trim(),
    mode: mode ?? null,
    score: typeof score === 'number' ? score : null,
  });

  if (error) {
    // Ignore duplicate-email errors gracefully
    if (error.code === '23505') {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    console.error('Error saving email capture:', error);
    return NextResponse.json({ error: 'Failed to save email.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
