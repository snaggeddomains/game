#!/usr/bin/env python3
import os

base = os.path.expanduser('~/southorange-site/app/guides')

def write_page(path, content):
    os.makedirs(path, exist_ok=True)
    with open(f'{path}/page.tsx', 'w') as f:
        f.write(content)
    print(f'Wrote {path}/page.tsx')

# ── SO vs MAPLEWOOD ───────────────────────────────────────────────────────────
vs_maplewood = '''export const metadata = {
  title: 'South Orange vs Maplewood NJ | South Orange Guide',
  description: 'A detailed comparison of South Orange and Maplewood, NJ — commute, dining, schools, housing, and which town fits your lifestyle.',
}

const COMPARISONS = [
  {
    category: 'The Commute',
    so: 'Mountain Station is IN downtown South Orange — walk out of any restaurant and the train is visible. Express Midtown Direct to Penn: ~35 min.',
    maplewood: 'Maplewood Station is slightly more removed from the dining core, requiring a 5–8 min walk from the main restaurant strip. Same Morris & Essex Line; similar timing.',
    edge: 'South Orange',
    edgeReason: 'The train is more integrated with the daily downtown loop. The walk from dinner to the platform is genuinely shorter.',
  },
  {
    category: 'Downtown & Dining',
    so: 'Tighter, more concentrated corridor. South Orange Ave + Valley St carry most of the restaurants, bars, and coffee shops. Easier to bar-hop; everything is within a 10-min walk.',
    maplewood: 'Springfield Ave corridor is longer and more diffuse. More total restaurants by count, but more spread out. Requires more intentional navigation.',
    edge: 'Depends',
    edgeReason: 'South Orange wins for village coherence and nightlife concentration. Maplewood has more total dining variety across the corridor.',
  },
  {
    category: 'Schools',
    so: 'Both towns share SOMSD — the same K-12 district. Elementary school assignment varies by address within each town.',
    maplewood: 'Same SOMSD district. Columbia High School (shared) is physically located in Maplewood.',
    edge: 'Tie',
    edgeReason: 'Identical district — the shared SOMSD is the defining feature of this comparison.',
  },
  {
    category: 'Parking',
    so: '262-space municipal lot near Mountain Station. Available commuter permits through the township.',
    maplewood: 'Two main lots: ~300 spaces at Maplewood Station lot and ~220 spaces at additional municipal parking.',
    edge: 'Maplewood',
    edgeReason: 'More raw parking capacity, though South Orange\'s compact layout means fewer trips requiring parking at all.',
  },
  {
    category: 'Town Character',
    so: 'Compact, station-centered, SOPAC as an arts anchor, Seton Hall energy. Feels more like a village that also has a university.',
    maplewood: 'More residential in feel, broader, slightly more spread out. The Springfield Ave strip is the center but it\'s a longer walk from the residential edges.',
    edge: 'Depends',
    edgeReason: 'South Orange has more concentrated energy near the station. Maplewood has a quieter residential character in most of its neighborhoods.',
  },
  {
    category: 'Arts & Culture',
    so: 'SOPAC (500-seat performing arts center, 20-year history) is a genuine cultural anchor. Farmers market, summer events calendar.',
    maplewood: 'Good restaurant scene and events, but no equivalent performing arts institution. The community arts scene is more distributed.',
    edge: 'South Orange',
    edgeReason: 'SOPAC is a meaningful differentiator. Having a real performing arts center walkable from dinner changes the cultural profile of the town.',
  },
  {
    category: 'Housing & Prices',
    so: 'Slightly more affordable median than Montclair; competitive with Maplewood. Walk-to-train premium is real in both towns.',
    maplewood: 'Comparable pricing. The share of the same school district means neither town has a significant value premium over the other on schools alone.',
    edge: 'Tie',
    edgeReason: 'Very similar market dynamics. The specific block and neighborhood matter more than the town line.',
  },
]

const VERDICT = {
  chooseSO: [
    'You want to walk from dinner to the train in under 5 minutes',
    'SOPAC programming matters to your social life',
    'You prefer a tighter, more walkable village feel',
    'You want concentrated nightlife options (Papillon, Fox & Falcon, Gaslight all in one strip)',
  ],
  chooseMaplewood: [
    'You want more total restaurant variety along a longer strip',
    'You need maximum parking capacity for two-car households',
    'You prefer a quieter, more spread-out residential feel',
    'You\'re buying specifically near Columbia High School',
  ],
}

export default function VsMaplewoodGuide() {
  return (
    <div style={{ background: \'#FAF8F3\', minHeight: \'100vh\' }}>
      <div style={{ background: \'linear-gradient(135deg, #2D5016 0%, #1a3a6c 100%)\', padding: \'64px 24px 48px\', textAlign: \'center\' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⚖️</div>
        <h1 style={{ fontFamily: \'Georgia, serif\', fontSize: 38, color: \'#FAF8F3\', margin: \'0 0 12px\', fontWeight: 700 }}>
          South Orange vs Maplewood, NJ
        </h1>
        <p style={{ color: \'#A8CC78\', fontSize: 18, margin: \'0 auto\', maxWidth: 620 }}>
          Same school district, same train line — here\'s what actually differs.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: \'48px auto\', padding: \'0 24px\' }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\' }}>
          South Orange and Maplewood are often treated as interchangeable — same NJ Transit line, same SOMSD school district. That framing misses real differences. The towns have distinct commercial districts, different parking situations, and different feels at the neighborhood level.
        </p>
      </div>

      {/* Comparison table */}
      <div style={{ maxWidth: 1000, margin: \'0 auto\', padding: \'0 24px 48px\' }}>
        {COMPARISONS.map(c => (
          <div key={c.category} style={{ background: \'#fff\', borderRadius: 12, marginBottom: 20, border: \'1px solid #E5DDD0\', overflow: \'hidden\', boxShadow: \'0 2px 8px rgba(0,0,0,0.04)\' }}>
            <div style={{ background: \'#f5f2ec\', padding: \'12px 24px\', display: \'flex\', justifyContent: \'space-between\', alignItems: \'center\' }}>
              <h3 style={{ fontFamily: \'Georgia, serif\', fontSize: 18, color: \'#2D5016\', margin: 0 }}>{c.category}</h3>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.edge === \'Tie\' ? \'#888\' : c.edge === \'South Orange\' ? \'#2D5016\' : \'#1a3a6c\', background: \'#fff\', padding: \'3px 10px\', borderRadius: 12, border: \'1px solid #E5DDD0\' }}>
                Edge: {c.edge}
              </div>
            </div>
            <div style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: 0 }}>
              <div style={{ padding: \'16px 24px\', borderRight: \'1px solid #E5DDD0\' }}>
                <div style={{ fontSize: 12, color: \'#2D5016\', fontWeight: 700, textTransform: \'uppercase\', letterSpacing: 0.8, marginBottom: 8 }}>South Orange</div>
                <div style={{ fontSize: 14, color: \'#3a3a3a\', lineHeight: 1.6 }}>{c.so}</div>
              </div>
              <div style={{ padding: \'16px 24px\' }}>
                <div style={{ fontSize: 12, color: \'#1a3a6c\', fontWeight: 700, textTransform: \'uppercase\', letterSpacing: 0.8, marginBottom: 8 }}>Maplewood</div>
                <div style={{ fontSize: 14, color: \'#3a3a3a\', lineHeight: 1.6 }}>{c.maplewood}</div>
              </div>
            </div>
            <div style={{ padding: \'10px 24px\', background: \'#FAFFF8\', borderTop: \'1px solid #E5DDD0\', fontSize: 13, color: \'#555\', fontStyle: \'italic\' }}>
              {c.edgeReason}
            </div>
          </div>
        ))}
      </div>

      {/* Verdict */}
      <div style={{ maxWidth: 900, margin: \'0 auto\', padding: \'0 24px 80px\', display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: 24 }}>
        <div style={{ background: \'#fff\', borderRadius: 12, padding: 28, border: \'2px solid #2D5016\' }}>
          <h3 style={{ fontFamily: \'Georgia, serif\', fontSize: 20, color: \'#2D5016\', marginBottom: 16 }}>Choose South Orange if...</h3>
          {VERDICT.chooseSO.map((v, i) => (
            <div key={i} style={{ display: \'flex\', gap: 10, marginBottom: 10, fontSize: 14, color: \'#3a3a3a\' }}>
              <span style={{ color: \'#2D5016\', fontWeight: 700 }}>✓</span> {v}
            </div>
          ))}
        </div>
        <div style={{ background: \'#fff\', borderRadius: 12, padding: 28, border: \'2px solid #1a3a6c\' }}>
          <h3 style={{ fontFamily: \'Georgia, serif\', fontSize: 20, color: \'#1a3a6c\', marginBottom: 16 }}>Choose Maplewood if...</h3>
          {VERDICT.chooseMaplewood.map((v, i) => (
            <div key={i} style={{ display: \'flex\', gap: 10, marginBottom: 10, fontSize: 14, color: \'#3a3a3a\' }}>
              <span style={{ color: \'#1a3a6c\', fontWeight: 700 }}>✓</span> {v}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: \'#2D5016\', padding: \'40px 24px\', textAlign: \'center\' }}>
        <div style={{ display: \'flex\', gap: 12, flexWrap: \'wrap\', justifyContent: \'center\' }}>
          {[
            { href: \'/guides/south-orange-vs-montclair\', label: \'🏙 SO vs Montclair\' },
            { href: \'/guides/real-estate\', label: \'🏠 Real Estate\' },
            { href: \'/guides/moving-to\', label: \'📦 Moving Here\' },
            { href: \'/\', label: \'🏡 Home\' },
          ].map(l => (
            <a key={l.href} href={l.href} style={{ background: \'rgba(255,255,255,0.1)\', color: \'#FAF8F3\', padding: \'10px 20px\', borderRadius: 24, textDecoration: \'none\', fontSize: 14, border: \'1px solid rgba(255,255,255,0.2)\' }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
'''

# ── SO vs MONTCLAIR ───────────────────────────────────────────────────────────
vs_montclair = '''export const metadata = {
  title: 'South Orange vs Montclair NJ | South Orange Guide',
  description: 'South Orange vs Montclair NJ — a detailed comparison of commute, dining, schools, housing prices, and town character.',
}

const COMPARISONS = [
  {
    category: 'Train & Commute',
    so: 'Mountain Station is embedded in downtown — the train platform is a 2-min walk from most restaurants. Midtown Direct to Penn: ~35 min express.',
    montclair: 'Montclair has multiple stations (Bay Street, Walnut Street, Montclair State) but Bay Street (the main one) requires a transfer at Secaucus for Penn Station. Adds 10-15 min for Manhattan commuters.',
    edge: 'South Orange',
    edgeReason: 'The Midtown Direct express with no transfer is a meaningful advantage for daily Penn Station commuters.',
  },
  {
    category: 'Dining & Restaurants',
    so: 'Strong scene for the town\'s size — Bistro d\'Azur, Felina, Fox & Falcon, Papillon 25, Walia. Concentrated in a tight corridor.',
    montclair: 'More restaurants overall. Bloomfield Ave and Church St offer a longer dining strip with more variety. Montclair is in a different weight class by restaurant count.',
    edge: 'Montclair',
    edgeReason: 'Montclair has more total restaurant options and more price-point variety. South Orange compensates with concentration and quality-per-block.',
  },
  {
    category: 'Town Scale',
    so: '~16,000 residents. Compact. Everything in the commercial district is within a 10-minute walk of the train. Easy to feel like you know the town.',
    montclair: '~40,000 residents. Three commercial nodes (downtown, Upper Montclair, Watchung Plaza) plus a full downtown. Takes longer to know well.',
    edge: 'Depends',
    edgeReason: 'South Orange wins on coherence and simplicity. Montclair wins on scale and variety.',
  },
  {
    category: 'Arts & Culture',
    so: 'SOPAC is the anchor — 500-seat performing arts center, 20-year history, nationally touring acts. Punches above weight class.',
    montclair: 'Montclair Art Museum, The Wellmont Theater, Montclair Film Festival. A richer arts ecosystem overall.',
    edge: 'Montclair',
    edgeReason: 'Montclair has more arts infrastructure. But SOPAC is legitimately excellent — for performing arts specifically, it holds its own.',
  },
  {
    category: 'Schools',
    so: 'SOMSD (South Orange–Maplewood SD). Strong, diverse, well-funded. 7,200+ students. Columbia High School.',
    montclair: 'Montclair Public Schools — a separate district known for its magnet school program and strong arts integration. Also diverse and well-regarded.',
    edge: 'Tie',
    edgeReason: 'Both districts are strong and comparable. The magnet structure in Montclair is distinctive; SOMSD\'s diversity and consistency is its selling point.',
  },
  {
    category: 'Housing Prices',
    so: 'High by NJ standards. Walk-to-train premium is real. Generally 10–20% less expensive than comparable Montclair addresses.',
    montclair: 'Highest prices in Essex County in most categories. The Montclair premium is real and persistent.',
    edge: 'South Orange',
    edgeReason: 'Buyers who can\'t hit Montclair prices often find South Orange offers comparable commute and lifestyle at a meaningfully lower basis.',
  },
  {
    category: 'Parking',
    so: '262-space municipal lot near Mountain Station.',
    montclair: 'Bay Street lot: ~240 paid spaces. Additional municipal lots. But parking in Montclair\'s busy areas is paid and less predictable.',
    edge: 'South Orange',
    edgeReason: 'South Orange\'s station area parking tends to be more accessible. Montclair\'s paid parking adds friction.',
  },
]

const VERDICT = {
  chooseSO: [
    'Direct Penn Station express train is a daily priority',
    'You want a single coherent walkable village, not three nodes',
    'The Montclair price premium pushes you over budget',
    'SOPAC-level performing arts satisfies your cultural needs',
    'You prefer a smaller, easier-to-know community',
  ],
  chooseMontclair: [
    'Restaurant variety and dining scene are top priority',
    'You want multiple commercial districts and neighborhoods to explore',
    'The Montclair Art Museum or Film Festival matters to you',
    'Your transfer to Hoboken/WTC is equally important as Penn Station',
    'Budget allows for the Montclair premium',
  ],
}

export default function VsMontclairGuide() {
  return (
    <div style={{ background: \'#FAF8F3\', minHeight: \'100vh\' }}>
      <div style={{ background: \'linear-gradient(135deg, #2D5016 0%, #4a2c6c 100%)\', padding: \'64px 24px 48px\', textAlign: \'center\' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏙</div>
        <h1 style={{ fontFamily: \'Georgia, serif\', fontSize: 38, color: \'#FAF8F3\', margin: \'0 0 12px\', fontWeight: 700 }}>
          South Orange vs Montclair, NJ
        </h1>
        <p style={{ color: \'#A8CC78\', fontSize: 18, margin: \'0 auto\', maxWidth: 620 }}>
          Similar appeal, different scale — here\'s the honest comparison.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: \'48px auto\', padding: \'0 24px\' }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\' }}>
          Montclair is the most-discussed suburb in Essex County and carries a premium to match. South Orange is often framed as "Montclair but more affordable" — which is partially true and partially reductive. The train situations are different, the scale is very different, and the towns have genuinely distinct characters.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\', marginTop: 16 }}>
          The short version: Montclair has more of everything (restaurants, arts, scale). South Orange wins on commute clarity, village coherence, and price.
        </p>
      </div>

      {/* Comparison */}
      <div style={{ maxWidth: 1000, margin: \'0 auto\', padding: \'0 24px 48px\' }}>
        {COMPARISONS.map(c => (
          <div key={c.category} style={{ background: \'#fff\', borderRadius: 12, marginBottom: 20, border: \'1px solid #E5DDD0\', overflow: \'hidden\', boxShadow: \'0 2px 8px rgba(0,0,0,0.04)\' }}>
            <div style={{ background: \'#f5f2ec\', padding: \'12px 24px\', display: \'flex\', justifyContent: \'space-between\', alignItems: \'center\' }}>
              <h3 style={{ fontFamily: \'Georgia, serif\', fontSize: 18, color: \'#2D5016\', margin: 0 }}>{c.category}</h3>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.edge === \'Tie\' ? \'#888\' : c.edge === \'South Orange\' ? \'#2D5016\' : \'#4a2c6c\', background: \'#fff\', padding: \'3px 10px\', borderRadius: 12, border: \'1px solid #E5DDD0\' }}>
                Edge: {c.edge}
              </div>
            </div>
            <div style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: 0 }}>
              <div style={{ padding: \'16px 24px\', borderRight: \'1px solid #E5DDD0\' }}>
                <div style={{ fontSize: 12, color: \'#2D5016\', fontWeight: 700, textTransform: \'uppercase\', letterSpacing: 0.8, marginBottom: 8 }}>South Orange</div>
                <div style={{ fontSize: 14, color: \'#3a3a3a\', lineHeight: 1.6 }}>{c.so}</div>
              </div>
              <div style={{ padding: \'16px 24px\' }}>
                <div style={{ fontSize: 12, color: \'#4a2c6c\', fontWeight: 700, textTransform: \'uppercase\', letterSpacing: 0.8, marginBottom: 8 }}>Montclair</div>
                <div style={{ fontSize: 14, color: \'#3a3a3a\', lineHeight: 1.6 }}>{c.montclair}</div>
              </div>
            </div>
            <div style={{ padding: \'10px 24px\', background: \'#FAFFF8\', borderTop: \'1px solid #E5DDD0\', fontSize: 13, color: \'#555\', fontStyle: \'italic\' }}>
              {c.edgeReason}
            </div>
          </div>
        ))}
      </div>

      {/* Verdict */}
      <div style={{ maxWidth: 900, margin: \'0 auto\', padding: \'0 24px 80px\', display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: 24 }}>
        <div style={{ background: \'#fff\', borderRadius: 12, padding: 28, border: \'2px solid #2D5016\' }}>
          <h3 style={{ fontFamily: \'Georgia, serif\', fontSize: 20, color: \'#2D5016\', marginBottom: 16 }}>Choose South Orange if...</h3>
          {VERDICT.chooseSO.map((v, i) => (
            <div key={i} style={{ display: \'flex\', gap: 10, marginBottom: 10, fontSize: 14, color: \'#3a3a3a\' }}>
              <span style={{ color: \'#2D5016\', fontWeight: 700 }}>✓</span> {v}
            </div>
          ))}
        </div>
        <div style={{ background: \'#fff\', borderRadius: 12, padding: 28, border: \'2px solid #4a2c6c\' }}>
          <h3 style={{ fontFamily: \'Georgia, serif\', fontSize: 20, color: \'#4a2c6c\', marginBottom: 16 }}>Choose Montclair if...</h3>
          {VERDICT.chooseMontclair.map((v, i) => (
            <div key={i} style={{ display: \'flex\', gap: 10, marginBottom: 10, fontSize: 14, color: \'#3a3a3a\' }}>
              <span style={{ color: \'#4a2c6c\', fontWeight: 700 }}>✓</span> {v}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: \'#2D5016\', padding: \'40px 24px\', textAlign: \'center\' }}>
        <div style={{ display: \'flex\', gap: 12, flexWrap: \'wrap\', justifyContent: \'center\' }}>
          {[
            { href: \'/guides/south-orange-vs-maplewood\', label: \'⚖️ SO vs Maplewood\' },
            { href: \'/guides/real-estate\', label: \'🏠 Real Estate\' },
            { href: \'/guides/moving-to\', label: \'📦 Moving Here\' },
            { href: \'/\', label: \'🏡 Home\' },
          ].map(l => (
            <a key={l.href} href={l.href} style={{ background: \'rgba(255,255,255,0.1)\', color: \'#FAF8F3\', padding: \'10px 20px\', borderRadius: 24, textDecoration: \'none\', fontSize: 14, border: \'1px solid rgba(255,255,255,0.2)\' }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
'''

write_page(f'{base}/south-orange-vs-maplewood', vs_maplewood)
write_page(f'{base}/south-orange-vs-montclair', vs_montclair)
