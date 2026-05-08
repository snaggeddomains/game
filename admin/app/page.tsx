'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [domain, setDomain] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/add-domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domain.trim().toLowerCase(),
          destination_url: destinationUrl.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong.');
      } else {
        setStatus('success');
        setMessage(`✓ "${domain}" submitted successfully.`);
        setDomain('');
        setDestinationUrl('');
      }
    } catch {
      setStatus('error');
      setMessage('Network error — please try again.');
    }
  }

  return (
    <div style={container}>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>Add a Domain to the Snagged Marketplace</h1>
      <p style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>
        Owners must point their nameservers to <strong>ns1.snagged.com</strong> and <strong>ns2.snagged.com</strong>.
      </p>
      <p style={{ fontSize: 13, color: '#c00', fontWeight: 600, marginBottom: 24 }}>
        Enter the domain in all lowercase letters.
      </p>

      <form onSubmit={handleSubmit}>
        <label style={label}>
          Domain Name
          <input
            style={input}
            type="text"
            placeholder="foal.com"
            value={domain}
            onChange={e => setDomain(e.target.value)}
            required
          />
        </label>

        <label style={label}>
          Destination URL
          <input
            style={input}
            type="text"
            placeholder="https://www.snagged.com/domains/foal-com"
            value={destinationUrl}
            onChange={e => setDestinationUrl(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={status === 'loading'} style={button}>
          {status === 'loading' ? 'Submitting…' : 'Submit'}
        </button>
      </form>

      {message && (
        <p style={{
          marginTop: 16,
          padding: '10px 14px',
          borderRadius: 4,
          background: status === 'success' ? '#d4edda' : '#f8d7da',
          color: status === 'success' ? '#155724' : '#721c24',
          fontSize: 14,
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

const container: React.CSSProperties = {
  maxWidth: 500,
  margin: '60px auto',
  background: '#fff',
  padding: '32px',
  borderRadius: 8,
  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
};

const label: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  marginBottom: 16,
  fontSize: 14,
  fontWeight: 600,
};

const input: React.CSSProperties = {
  padding: '8px 10px',
  fontSize: 14,
  border: '1px solid #ccc',
  borderRadius: 4,
  fontWeight: 400,
};

const button: React.CSSProperties = {
  padding: '9px 20px',
  background: '#4A7FDB',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  fontSize: 14,
  cursor: 'pointer',
};
