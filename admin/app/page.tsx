'use client';

import { useState } from 'react';

interface Result {
  ok: boolean;
  domain?: string;
  destinationUrl?: string;
  newlyCreated?: boolean;
  nameServers?: string[];
  message?: string;
  error?: string;
}

export default function AdminPage() {
  const [domain, setDomain] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await fetch('/api/add-redirect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain, destinationUrl }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);

    if (data.ok) {
      setDomain('');
      setDestinationUrl('');
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--navy)' }}>
          Snagged Admin
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-6" style={{ border: '1px solid var(--border)' }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--navy)' }}>
            Add Domain Redirect
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            Creates or updates a Cloudflare 301 redirect for the given domain.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--navy)' }}>
                Domain
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="foal.com"
                className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                style={{ border: '1px solid var(--border)' }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--navy)' }}>
                Destination URL
              </label>
              <input
                type="url"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                placeholder="https://www.snagged.com/domains/foal-com"
                className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                style={{ border: '1px solid var(--border)' }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
              style={{ background: 'var(--navy)' }}
            >
              {loading ? 'Setting up redirect…' : 'Create Redirect'}
            </button>
          </form>

          {result && (
            <div
              className="mt-6 rounded-lg p-4 text-sm"
              style={{
                background: result.ok ? '#eff6ff' : '#fef2f2',
                border: `1px solid ${result.ok ? '#bfdbfe' : '#fecaca'}`,
                color: result.ok ? '#1e40af' : '#991b1b',
              }}
            >
              {result.ok ? (
                <>
                  <p className="font-medium mb-1">{result.message}</p>
                  <p>
                    <span className="font-medium">{result.domain}</span>
                    {' → '}
                    <span className="break-all">{result.destinationUrl}</span>
                  </p>
                  {result.newlyCreated && result.nameServers && (
                    <div className="mt-3">
                      <p className="font-medium mb-1">Update nameservers at your registrar:</p>
                      <ul className="space-y-0.5 font-mono text-xs">
                        {result.nameServers.map((ns) => (
                          <li key={ns}>{ns}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p>{result.error}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
