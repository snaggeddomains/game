#!/usr/bin/env python3
"""Add Local Guides section to SouthOrange.com homepage."""
import pathlib, re

PAGE = pathlib.Path.home() / "southorange-site" / "app" / "page.tsx"
content = PAGE.read_text()

if "Local Guides" in content:
    print("Local Guides section already present — nothing to do.")
    raise SystemExit(0)

GUIDES_SECTION = """
      {/* Local Guides */}
      <section className="so-teasers-section" style={{borderTop: '1.5px solid #E5DDD0'}}>
        <div className="so-teasers-inner">
          <h2 className="so-teasers-heading">Local Guides</h2>
          <p style={{textAlign: 'center', color: '#6B7280', marginTop: '-1.5rem', marginBottom: '2.5rem', fontSize: '1rem'}}>
            Everything you need to know about South Orange, NJ
          </p>

          <h3 style={{fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1rem', color: '#2D5016', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem'}}>Dining &amp; Nightlife</h3>
          <div className="so-teasers-grid" style={{marginBottom: '2.5rem'}}>
            {[
              {href: '/guides/restaurants', label: 'Best Restaurants', desc: "South Orange’s top-rated dining — from Bistro d’Azur to the local pizza spots."},
              {href: '/guides/brunch-south-orange', label: 'Best Brunch', desc: 'Weekend morning favorites: Bistro d’Azur, THE ORDER, Jackie & Sons, and more.'},
              {href: '/guides/bars-south-orange', label: 'Bars & Nightlife', desc: 'Cocktails at Papillon 25, craft beer at Gaslight Brewery, and the best of Valley Street.'},
              {href: '/guides/coffee-south-orange', label: 'Best Coffee', desc: 'From Elitist Coffee specialty roasts to Three Daughters Baking on Vose Ave.'},
            ].map(g => (
              <a key={g.href} href={g.href} className="so-teaser-card" style={{textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <h4 style={{fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1.05rem', color: '#1A2332'}}>{g.label} →</h4>
                <p className="so-teaser-desc">{g.desc}</p>
              </a>
            ))}
          </div>

          <h3 style={{fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1rem', color: '#2D5016', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem'}}>Things To Do</h3>
          <div className="so-teasers-grid" style={{marginBottom: '2.5rem'}}>
            {[
              {href: '/guides/things-to-do', label: 'Things To Do', desc: 'SOPAC, South Mountain Reservation, Hemlock Falls, and the walkable downtown.'},
              {href: '/guides/date-night-south-orange', label: 'Date Night Guide', desc: 'The best date night combinations — dinner, cocktails, SOPAC shows, and more.'},
            ].map(g => (
              <a key={g.href} href={g.href} className="so-teaser-card" style={{textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <h4 style={{fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1.05rem', color: '#1A2332'}}>{g.label} →</h4>
                <p className="so-teaser-desc">{g.desc}</p>
              </a>
            ))}
          </div>

          <h3 style={{fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1rem', color: '#2D5016', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem'}}>Moving &amp; Neighborhoods</h3>
          <div className="so-teasers-grid">
            {[
              {href: '/guides/moving-to', label: 'Moving to South Orange', desc: 'Everything you need to know before you move — schools, commute, neighborhoods, and costs.'},
              {href: '/guides/neighborhoods', label: 'Neighborhoods Guide', desc: "Downtown, Newstead, South Mountain — a breakdown of South Orange’s distinct areas."},
              {href: '/guides/south-orange-vs-maplewood', label: 'South Orange vs. Maplewood', desc: "Side-by-side comparison of two of Essex County’s most popular towns."},
              {href: '/guides/real-estate', label: 'Real Estate Guide', desc: "What homes cost, what’s selling, and what to know before buying in South Orange."},
            ].map(g => (
              <a key={g.href} href={g.href} className="so-teaser-card" style={{textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <h4 style={{fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1.05rem', color: '#1A2332'}}>{g.label} →</h4>
                <p className="so-teaser-desc">{g.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
"""

# Insert before the About section using regex so whitespace doesn't matter
updated = re.sub(r'(\s*\{/\*\s*About\s*\*/\})', GUIDES_SECTION + r'\1', content)

if updated == content:
    # Fallback: insert before </div> that closes so-root (last one before footer)
    updated = re.sub(r'(\s*\{/\*\s*Footer\s*\*/\})', GUIDES_SECTION + r'\1', content)

if updated == content:
    print("ERROR: Could not find insertion point. Printing landmarks for debug:")
    for i, line in enumerate(content.splitlines(), 1):
        if 'About' in line or 'Footer' in line or 'so-about' in line:
            print(f"  line {i}: {line!r}")
else:
    PAGE.write_text(updated)
    print("Done — Local Guides section added to homepage.")
