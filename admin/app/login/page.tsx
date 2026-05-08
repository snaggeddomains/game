'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(searchParams.get('from') ?? '/');
    } else {
      setError('Incorrect password.');
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 320, margin: '120px auto', background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
      <h1 style={{ fontSize: 20, marginBottom: 24 }}>Snagged Admin</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '8px 10px', fontSize: 14, border: '1px solid #ccc', borderRadius: 4, marginBottom: 12, boxSizing: 'border-box' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '9px 20px', background: '#4A7FDB', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer' }}
        >
          {loading ? 'Checking…' : 'Log in'}
        </button>
      </form>
      {error && <p style={{ marginTop: 12, color: '#721c24', fontSize: 14 }}>{error}</p>}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
