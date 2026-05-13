'use client';

import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EmailForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/south-orange-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="so-success-box">
        <span className="so-success-icon">✓</span>
        <p className="so-success-text">You&rsquo;re on the list — we&rsquo;ll be in touch soon!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="so-email-form" noValidate>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="so-email-input"
        required
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="so-email-btn"
      >
        {status === 'loading' ? 'Joining…' : 'Notify Me'}
      </button>
      {(errorMsg || status === 'error') && (
        <p className="so-error-text">{errorMsg || 'Something went wrong.'}</p>
      )}
    </form>
  );
}

const teasers = [
  {
    icon: '🍽',
    label: 'Dining & Nightlife',
    desc: 'From the Ward to Valley Street — every spot worth knowing in South Orange.',
  },
  {
    icon: '📅',
    label: 'Events & Things To Do',
    desc: 'Farmers markets, concerts at SOPAC, and everything happening around town.',
  },
  {
    icon: '🏡',
    label: 'Real Estate & Neighborhoods',
    desc: "South Orange's streets, parks, and what's actually selling right now.",
  },
  {
    icon: '📰',
    label: 'Community News',
    desc: 'Township meetings, school updates, local business spotlights, and more.',
  },
];

export default function SouthOrangePage() {
  return (
    <div className="so-root">
      {/* Nav */}
      <header className="so-nav">
        <span className="so-nav-logo">SouthOrange.com</span>
        <span className="so-nav-badge">Coming Soon</span>
      </header>

      {/* Hero */}
      <section className="so-hero">
        <div className="so-hero-inner">
          <div className="so-eyebrow">South Orange, New Jersey</div>
          <h1 className="so-hero-heading">
            Your hometown,<br />
            <em>online.</em>
          </h1>
          <p className="so-hero-sub">
            A new local guide for dining, events, real estate, and community news —
            built for the people who love South Orange.
          </p>

          <div className="so-cta-box">
            <p className="so-cta-label">Be the first to know when we launch:</p>
            <EmailForm />
          </div>
        </div>

        {/* decorative arch */}
        <div className="so-hero-arch" aria-hidden="true" />
      </section>

      {/* Teasers */}
      <section className="so-teasers-section">
        <div className="so-teasers-inner">
          <h2 className="so-teasers-heading">What&rsquo;s coming</h2>
          <div className="so-teasers-grid">
            {teasers.map(t => (
              <div key={t.label} className="so-teaser-card">
                <span className="so-teaser-icon" aria-hidden="true">{t.icon}</span>
                <h3 className="so-teaser-label">{t.label}</h3>
                <p className="so-teaser-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About blurb */}
      <section className="so-about">
        <div className="so-about-inner">
          <p className="so-about-text">
            South Orange has always had a strong sense of place — walkable streets,
            a real downtown, incredible food, and a community that shows up. We&rsquo;re
            building the site it deserves: a genuine local guide, not an algorithm.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="so-footer">
        <p>© {new Date().getFullYear()} SouthOrange.com &nbsp;·&nbsp; South Orange, NJ 07079</p>
      </footer>
    </div>
  );
}
