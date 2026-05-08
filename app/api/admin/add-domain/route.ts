import { NextRequest, NextResponse } from 'next/server';

const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL ?? 'https://hooks.zapier.com/hooks/catch/20835373/uxooclr/';
const DOMAIN_RE = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z]{2,})+$/;

export async function POST(req: NextRequest) {
  let domain: string, destination_url: string;
  try {
    ({ domain, destination_url } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!domain || !DOMAIN_RE.test(domain)) {
    return NextResponse.json({ error: 'Enter a valid lowercase domain (e.g. foal.com).' }, { status: 400 });
  }
  if (!destination_url?.startsWith('http')) {
    return NextResponse.json({ error: 'Enter a valid destination URL.' }, { status: 400 });
  }

  const zapRes = await fetch(ZAPIER_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Name: domain, 'destination-url': destination_url }),
  });

  if (!zapRes.ok) {
    return NextResponse.json({ error: 'Zapier webhook failed.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
