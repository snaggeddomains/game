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

    const res = await fetch('/game/api/admin/add-redirect', {
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
    <div className="min-h-screen bg-game-bg p-6">
      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-3xl text-brand-navy mb-8">Admin</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-game-border p-6">
          <h2 className="text-lg font-semibold text-brand-navy mb-2">Add Domain Redirect</h2>
          <p className="text-sm text-game-muted mb-6">
            Creates or updates a Cloudflare 301 redirect for the given domain.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="foal.com"
                className="w-full border border-game-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">Destination URL</label>
              <input
                type="url"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                placeholder="https://www.snagged.com/domains/foal-com"
                className="w-full border border-game-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy text-white rounded-lg py-2 text-sm font-medium hover:bg-brand-teal transition-colors disabled:opacity-50"
            >
              {loading ? 'Setting up redirect…' : 'Create Redirect'}
            </button>
          </form>

          {result && (
            <div
              className={`mt-6 rounded-lg p-4 text-sm ${
                result.ok
                  ? 'bg-blue-50 border border-blue-200 text-blue-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
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
