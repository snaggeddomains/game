import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { GameMode } from '@/lib/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendNotification(email: string, mode: GameMode | null, score: number | null) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'game@snagged.com',
      to: 'rob@snagged.com',
      subject: `New signup: ${email}`,
      text: `New email signup on Is it Snagged?\n\nEmail: ${email}\nMode: ${mode ?? 'unknown'}\nScore: ${score ?? 'N/A'}`,
    }),
  }).catch(() => {
    // notification failure is non-blocking
  });
}

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

  const { error } = await supabase.from('game_email_captures').insert({
    email: email.toLowerCase().trim(),
    mode: mode ?? null,
    score: typeof score === 'number' ? score : null,
  });

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    console.error('Error saving email capture:', error);
    return NextResponse.json({ error: 'Failed to save email.' }, { status: 500 });
  }

  await sendNotification(email, mode ?? null, score ?? null);

  return NextResponse.json({ ok: true });
}
