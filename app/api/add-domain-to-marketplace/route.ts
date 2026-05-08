import { NextRequest, NextResponse } from 'next/server';

const DOMAIN_RE = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z]{2,})+$/;

interface AddDomainPayload {
  /** The bare domain, e.g. "foal.com" */
  domain: string;
  /** The snagged.com listing URL, e.g. "https://www.snagged.com/domains/foal-com" */
  destination_url: string;
}

export async function POST(req: NextRequest) {
  // Support both JSON (direct fetch) and form-encoded (Zapier / Webflow webhook)
  let domain: string | undefined;
  let destination_url: string | undefined;

  const contentType = req.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    let body: Partial<AddDomainPayload>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }
    domain = body.domain;
    destination_url = body.destination_url;
  } else {
    // application/x-www-form-urlencoded (Zapier passes Webflow form fields as-is)
    // Webflow names the fields by their Webflow field name:
    //   "Name"  → domain name
    //   "Email" → destination URL  (misnamed in the Webflow form — that's the root cause of the submission error)
    const form = await req.formData();
    domain = (form.get('Name') ?? form.get('domain') ?? '').toString().trim().toLowerCase();
    destination_url = (
      form.get('destination_url') ??
      form.get('Email') ??
      form.get('email') ??
      ''
    )
      .toString()
      .trim();
  }

  if (!domain || !DOMAIN_RE.test(domain)) {
    return NextResponse.json(
      { error: 'A valid lowercase domain name is required (e.g. foal.com).' },
      { status: 400 }
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(destination_url ?? '');
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error();
  } catch {
    return NextResponse.json(
      { error: 'A valid https:// destination URL is required.' },
      { status: 400 }
    );
  }

  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

  if (!apiToken || !accountId) {
    console.error('Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ACCOUNT_ID env vars.');
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  // Step 1 — create (or retrieve) the Cloudflare zone for the domain
  const zoneId = await ensureZone(domain, accountId, apiToken);
  if (!zoneId) {
    return NextResponse.json(
      { error: `Failed to create or find Cloudflare zone for "${domain}".` },
      { status: 502 }
    );
  }

  // Step 2 — upsert a catch-all redirect rule: domain/* → destination_url
  const ruleOk = await upsertRedirectRule(zoneId, domain, parsedUrl.toString(), apiToken);
  if (!ruleOk) {
    return NextResponse.json(
      { error: 'Zone created but failed to set redirect rule.' },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: `"${domain}" added to the marketplace. Redirect → ${parsedUrl}.`,
    cloudflare_zone_id: zoneId,
  });
}

// ---------------------------------------------------------------------------
// Cloudflare helpers
// ---------------------------------------------------------------------------

async function cfFetch(path: string, apiToken: string, init?: RequestInit) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
  return res.json() as Promise<{ success: boolean; result?: unknown; errors?: unknown[] }>;
}

async function ensureZone(
  domain: string,
  accountId: string,
  apiToken: string
): Promise<string | null> {
  // Check if zone already exists
  const list = await cfFetch(
    `/zones?name=${encodeURIComponent(domain)}&account.id=${accountId}`,
    apiToken
  );
  if (list.success && Array.isArray(list.result) && list.result.length > 0) {
    return (list.result[0] as { id: string }).id;
  }

  // Create the zone
  const created = await cfFetch('/zones', apiToken, {
    method: 'POST',
    body: JSON.stringify({
      name: domain,
      account: { id: accountId },
      jump_start: false,
    }),
  });

  if (!created.success || !created.result) {
    console.error('Cloudflare zone creation failed:', created.errors);
    return null;
  }
  return (created.result as { id: string }).id;
}

async function upsertRedirectRule(
  zoneId: string,
  domain: string,
  destinationUrl: string,
  apiToken: string
): Promise<boolean> {
  // Use Cloudflare Redirect Rules (Ruleset Engine, phase http_request_dynamic_redirect)
  const listRes = await cfFetch(
    `/zones/${zoneId}/rulesets?phase=http_request_dynamic_redirect`,
    apiToken
  );

  const existingRuleset =
    listRes.success && Array.isArray(listRes.result) && listRes.result.length > 0
      ? (listRes.result[0] as { id: string })
      : null;

  const rule = {
    description: `Snagged marketplace redirect for ${domain}`,
    expression: `(http.host eq "${domain}" or http.host eq "www.${domain}")`,
    action: 'redirect',
    action_parameters: {
      from_value: {
        target_url: { value: destinationUrl },
        status_code: 301,
        preserve_query_string: false,
      },
    },
  };

  if (existingRuleset) {
    // Replace the entire ruleset with our single redirect rule
    const updateRes = await cfFetch(
      `/zones/${zoneId}/rulesets/${existingRuleset.id}`,
      apiToken,
      {
        method: 'PUT',
        body: JSON.stringify({
          rules: [rule],
        }),
      }
    );
    if (!updateRes.success) {
      console.error('Cloudflare ruleset update failed:', updateRes.errors);
      return false;
    }
  } else {
    // Create a new ruleset
    const createRes = await cfFetch(
      `/zones/${zoneId}/rulesets`,
      apiToken,
      {
        method: 'POST',
        body: JSON.stringify({
          name: `Snagged redirect — ${domain}`,
          kind: 'zone',
          phase: 'http_request_dynamic_redirect',
          rules: [rule],
        }),
      }
    );
    if (!createRes.success) {
      console.error('Cloudflare ruleset creation failed:', createRes.errors);
      return false;
    }
  }

  return true;
}
