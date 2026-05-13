#!/usr/bin/env python3
"""Rewrite SouthOrange.com homepage with Local Guides section."""
import pathlib

PAGE = pathlib.Path.home() / "southorange-site" / "app" / "page.tsx"

CONTENT = '''\
'use client';

import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EmailForm() {
  const [email, setEmail]   = useState('');
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
      const res  = await fetch('/api/email', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
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
      <div className="so-success-box animate-fade-in">
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
      <button type="submit" disabled={status === 'loading'} className="so-email-btn">
        {status === 'loading' ? 'Joining…' : 'Notify Me'}
      </button>
      {(status === 'error' || errorMsg) && (
        <p className="so-error-text">{errorMsg || 'Something went wrong.'}</p>
      )}
    </form>
  );
}

const TEASERS = [
  {
    icon:  '\U0001f37d',
    label: 'Dining & Nightlife',
    desc:  'From the Ward to Valley Street — every spot worth knowing in South Orange.',
  },
  {
    icon:  '\U0001f4c5',
    label: 'Events & Things To Do',
    desc:  'Farmers markets, concerts at SOPAC, and everything happening around town.',
  },
  {
    icon:  '\U0001f3e1',
    label: 'Real Estate & Neighborhoods',
    desc:  "South Orange’s streets, parks, and what’s actually selling right now.",
  },
  {
    icon:  '\U0001f4f0',
    label: 'Community News',
    desc:  'Township meetings, school updates, local business spotlights, and more.',
  },
];

const DINING_GUIDES = [
  { href: '/guides/restaurants',       label: 'Best Restaurants',  desc: "South Orange’s top-rated dining — from Bistro d’Azur to the local pizza spots." },
  { href: '/guides/brunch-south-orange', label: 'Best Brunch',     desc: 'Weekend morning favorites: Bistro d’Azur, THE ORDER, Jackie & Sons, and more.' },
  { href: '/guides/bars-south-orange',   label: 'Bars & Nightlife', desc: 'Cocktails at Papillon 25, craft beer at Gaslight Brewery, and the best of Valley Street.' },
  { href: '/guides/coffee-south-orange', label: 'Best Coffee',     desc: 'From Elitist Coffee specialty roasts to Three Daughters Baking on Vose Ave.' },
];

const ACTIVITY_GUIDES = [
  { href: '/guides/things-to-do',          label: 'Things To Do',    desc: 'SOPAC, South Mountain Reservation, Hemlock Falls, and the walkable downtown.' },
  { href: '/guides/date-night-south-orange', label: 'Date Night Guide', desc: 'The best date night combinations — dinner, cocktails, SOPAC shows, and more.' },
];

const MOVING_GUIDES = [
  { href: '/guides/moving-to',                  label: 'Moving to South Orange',      desc: 'Everything you need to know before you move — schools, commute, and costs.' },
  { href: '/guides/neighborhoods',              label: 'Neighborhoods Guide',          desc: "Downtown, Newstead, South Mountain — South Orange’s distinct areas explained." },
  { href: '/guides/south-orange-vs-maplewood',  label: 'South Orange vs. Maplewood',  desc: "Side-by-side comparison of two of Essex County’s most popular towns." },
  { href: '/guides/real-estate',               label: 'Real Estate Guide',            desc: "What homes cost, what’s selling, and what to know before buying." },
];

const subheadStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 700,
  fontSize: '1rem',
  color: '#2D5016',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: '1rem',
};

const cardHeadStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 700,
  fontSize: '1.05rem',
  color: '#1A2332',
};

function GuideGrid({ guides, mb = '2.5rem' }: { guides: typeof DINING_GUIDES; mb?: string }) {
  return (
    <div className="so-teasers-grid" style={{ marginBottom: mb }}>
      {guides.map(g => (
        <a
          key={g.href}
          href={g.href}
          className="so-teaser-card"
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <span style={cardHeadStyle}>{g.label} &rarr;</span>
          <p className="so-teaser-desc">{g.desc}</p>
        </a>
      ))}
    </div>
  );
}

export default function HomePage() {
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
            A new local guide for dining, events, real estate, and community
            news — built for the people who love South Orange.
          </p>
          <div className="so-cta-box">
            <p className="so-cta-label">Be the first to know when we launch:</p>
            <EmailForm />
          </div>
        </div>
        <div className="so-hero-arch" aria-hidden="true" />
      </section>

      {/* Teasers */}
      <section className="so-teasers-section">
        <div className="so-teasers-inner">
          <h2 className="so-teasers-heading">What&rsquo;s coming</h2>
          <div className="so-teasers-grid">
            {TEASERS.map(t => (
              <div key={t.label} className="so-teaser-card">
                <span className="so-teaser-icon" aria-hidden="true">{t.icon}</span>
                <h3 className="so-teaser-label">{t.label}</h3>
                <p className="so-teaser-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Guides */}
      <section className="so-teasers-section" style={{ borderTop: '1.5px solid #E5DDD0' }}>
        <div className="so-teasers-inner">
          <h2 className="so-teasers-heading">Local Guides</h2>
          <p style={{ textAlign: 'center', color: '#6B7280', marginTop: '-1.5rem', marginBottom: '2.5rem' }}>
            Everything you need to know about South Orange, NJ
          </p>
          <h3 style={subheadStyle}>Dining &amp; Nightlife</h3>
          <GuideGrid guides={DINING_GUIDES} />
          <h3 style={subheadStyle}>Things To Do</h3>
          <GuideGrid guides={ACTIVITY_GUIDES} />
          <h3 style={subheadStyle}>Moving &amp; Neighborhoods</h3>
          <GuideGrid guides={MOVING_GUIDES} mb="0" />
        </div>
      </section>

      {/* About */}
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
        <p>&copy; {new Date().getFullYear()} SouthOrange.com &nbsp;&middot;&nbsp; South Orange, NJ 07079</p>
      </footer>
    </div>
  );
}
'''

PAGE.write_text(CONTENT)
print("Done — page.tsx rewritten with Local Guides section.")
