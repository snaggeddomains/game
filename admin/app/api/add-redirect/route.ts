import { NextRequest, NextResponse } from 'next/server';

const CF_API = 'https://api.cloudflare.com/client/v4';

function cfHeaders() {
  return {
    Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

async function getZone(domain: string): Promise<{ id: string } | null> {
  const res = await fetch(`${CF_API}/zones?name=${encodeURIComponent(domain)}&status=active`, {
    headers: cfHeaders(),
  });
  const data = await res.json();
  return data.result?.[0] ?? null;
}

async function createZone(domain: string, accountId: string) {
  const res = await fetch(`${CF_API}/zones`, {
    method: 'POST',
    headers: cfHeaders(),
    body: JSON.stringify({ name: domain, account: { id: accountId }, jump_start: false }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.errors?.[0]?.message ?? 'Failed to create zone');
  return data.result as { id: string; name_servers: string[] };
}

async function upsertRedirectRuleset(zoneId: string, destinationUrl: string) {
  const phasePath = `${CF_API}/zones/${zoneId}/rulesets/phases/http_request_dynamic_redirect/entrypoint`;

  const rule = {
    action: 'redirect',
    action_parameters: {
      from_value: {
        status_code: 301,
        target_url: { value: destinationUrl },
        preserve_query_string: false,
      },
    },
    expression: 'true',
    description: 'Redirect all traffic to destination',
    enabled: true,
  };

  const getRes = await fetch(phasePath, { headers: cfHeaders() });
  const existing = await getRes.json();

  if (existing.success && existing.result?.id) {
    const putRes = await fetch(`${CF_API}/zones/${zoneId}/rulesets/${existing.result.id}`, {
      method: 'PUT',
      headers: cfHeaders(),
      body: JSON.stringify({ rules: [rule] }),
    });
    const putData = await putRes.json();
    if (!putData.success) throw new Error(putData.errors?.[0]?.message ?? 'Failed to update ruleset');
  } else {
    const postRes = await fetch(phasePath, {
      method: 'PUT',
      headers: cfHeaders(),
      body: JSON.stringify({ rules: [rule] }),
    });
    const postData = await postRes.json();
    if (!postData.success) throw new Error(postData.errors?.[0]?.message ?? 'Failed to create ruleset');
  }
}

export async function POST(req: NextRequest) {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

  if (!token || !accountId) {
    return NextResponse.json(
      { error: 'CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID must be set.' },
      { status: 500 }
    );
  }

  let body: { domain?: string; destinationUrl?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const domain = body.domain?.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
  const destinationUrl = body.destinationUrl?.trim();

  if (!domain || !/^[a-z0-9][a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) {
    return NextResponse.json({ error: 'Invalid domain name.' }, { status: 400 });
  }
  if (!destinationUrl || !/^https?:\/\/.+/.test(destinationUrl)) {
    return NextResponse.json({ error: 'Destination URL must start with http(s)://.' }, { status: 400 });
  }

  try {
    let zone = await getZone(domain);
    let newlyCreated = false;
    let nameServers: string[] | undefined;

    if (!zone) {
      const created = await createZone(domain, accountId);
      zone = { id: created.id };
      nameServers = created.name_servers;
      newlyCreated = true;
    }

    await upsertRedirectRuleset(zone.id, destinationUrl);

    return NextResponse.json({
      ok: true,
      domain,
      destinationUrl,
      newlyCreated,
      nameServers,
      message: newlyCreated
        ? 'Zone created. Update nameservers at your registrar to activate the redirect.'
        : 'Redirect rule updated successfully.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
