#!/usr/bin/env python3
import os

base = os.path.expanduser('~/southorange-site/app')

# SiteNav component
sitenav = '''\'use client\'

import Link from \'next/link\'
import { useState } from \'react\'

const NAV_LINKS = [
  { href: \'/guides/restaurants\', label: \'Restaurants\' },
  { href: \'/guides/coffee-south-orange\', label: \'Coffee\' },
  { href: \'/guides/bars-south-orange\', label: \'Bars\' },
  { href: \'/guides/brunch-south-orange\', label: \'Brunch\' },
  { href: \'/guides/things-to-do\', label: \'Things To Do\' },
  { href: \'/guides/date-night-south-orange\', label: \'Date Night\' },
  { href: \'/guides/moving-to\', label: \'Moving Here\' },
  { href: \'/guides/neighborhoods\', label: \'Neighborhoods\' },
  { href: \'/guides/real-estate\', label: \'Real Estate\' },
]

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  return (
    <nav style={{ background: \'#2D5016\', borderBottom: \'3px solid #E8BE5A\' }}>
      <div style={{ maxWidth: 1100, margin: \'0 auto\', padding: \'0 24px\', display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', height: 56 }}>
        <Link href="/" style={{ color: \'#FAF8F3\', fontFamily: \'Georgia, serif\', fontWeight: 700, fontSize: 18, textDecoration: \'none\', letterSpacing: 0.5 }}>
          South Orange Guide
        </Link>
        {/* Desktop */}
        <div style={{ display: \'flex\', gap: 20, flexWrap: \'wrap\' }} className="hidden-mobile">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} style={{ color: \'#E5DDD0\', fontSize: 13, textDecoration: \'none\', letterSpacing: 0.3 }}>
              {l.label}
            </Link>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{ background: \'none\', border: \'none\', color: \'#FAF8F3\', fontSize: 22, cursor: \'pointer\', display: \'none\' }} className="show-mobile" aria-label="Menu">
          {open ? \'✕\' : \'☰\'}
        </button>
      </div>
      {open && (
        <div style={{ background: \'#1e3a0f\', padding: \'12px 24px 16px\', display: \'flex\', flexDirection: \'column\', gap: 12 }}>
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ color: \'#E5DDD0\', fontSize: 15, textDecoration: \'none\' }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
'''

# Guides layout
layout = '''import SiteNav from \'../components/SiteNav\'

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
    </>
  )
}
'''

os.makedirs(f'{base}/components', exist_ok=True)
os.makedirs(f'{base}/guides', exist_ok=True)

with open(f'{base}/components/SiteNav.tsx', 'w') as f:
    f.write(sitenav)
print('Wrote SiteNav.tsx')

with open(f'{base}/guides/layout.tsx', 'w') as f:
    f.write(layout)
print('Wrote guides/layout.tsx')
