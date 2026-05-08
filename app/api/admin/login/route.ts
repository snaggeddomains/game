import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.ADMIN_PASSWORD;

  if (!correct) {
    console.error('ADMIN_PASSWORD env var is not set.');
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  if (password !== correct) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_auth', 'true', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    // 7-day session
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
