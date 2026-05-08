'use client';

import { useState } from 'react';

export default function AddDomainPage() {
  const [domain, setDomain] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/admin/add-domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain.trim().toLowerCase(), destination_url: destinationUrl.trim() }),
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
    <div style={{ maxWidth: 480, margin: '60px auto', fontFamily: 'sans-serif', padding: '0 24px' }}>
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>Add a Domain to the Snagged Marketplace</h1>
      <p style={{ fontSize: 14, color: '#555', marginBottom: 24 }}>
        Remember to enter the domain in all lowercase letters.
      </p>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Domain Name
          <input
            style={inputStyle}
            type="text"
            placeholder="foal.com"
            value={domain}
            onChange={e => setDomain(e.target.value)}
            required
          />
        </label>

        <label style={labelStyle}>
          Destination URL
          <input
            style={inputStyle}
            type="text"
            placeholder="https://www.snagged.com/domains/foal-com"
            value={destinationUrl}
            onChange={e => setDestinationUrl(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={status === 'loading'}
          style={buttonStyle}
        >
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

const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  marginBottom: 16,
  fontSize: 14,
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  padding: '8px 10px',
  fontSize: 14,
  border: '1px solid #ccc',
  borderRadius: 4,
  fontWeight: 400,
};

const buttonStyle: React.CSSProperties = {
  padding: '9px 20px',
  background: '#4A7FDB',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  fontSize: 14,
  cursor: 'pointer',
};
