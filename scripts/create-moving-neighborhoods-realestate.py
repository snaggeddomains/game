#!/usr/bin/env python3
import os

base = os.path.expanduser('~/southorange-site/app/guides')

def write_page(path, content):
    os.makedirs(path, exist_ok=True)
    with open(f'{path}/page.tsx', 'w') as f:
        f.write(content)
    print(f'Wrote {path}/page.tsx')

# ── MOVING TO ────────────────────────────────────────────────────────────────
moving = '''export const metadata = {
  title: 'Moving to South Orange NJ | South Orange Guide',
  description: 'Everything you need to know about moving to South Orange, NJ — transit, schools, taxes, housing, and what life is really like.',
}

const TRANSIT = [
  { label: 'To NYC Penn Station', value: '~35 min', detail: 'Express Midtown Direct service on NJ Transit\'s Morris & Essex Line. Mountain Station is the main stop — it\'s IN downtown, a 2-minute walk from most restaurants.' },
  { label: 'Train frequency', value: 'Every 20–30 min', detail: 'Peak hours offer more frequent service; off-peak is every 30–60 min. The schedule is consistent enough that most residents don\'t time it obsessively.' },
  { label: 'Annual rail pass', value: 'Zone 4', detail: 'Check NJTransit.com for current pricing. Monthly passes are the standard move for commuters.' },
  { label: 'Bus routes', value: '#92 and #107', detail: 'Provide connections within Essex County and to Newark. Less commonly used by commuters than the train but useful for local trips.' },
  { label: 'Parking at Mountain Station', value: 'Township lots', detail: 'The township operates parking near the station. Commuter permits are available through the municipality — apply early, wait lists are common.' },
  { label: 'Driving to NYC', value: '30–50 min off-peak', detail: 'Via I-78 E or US-22 to the tunnels. Peak traffic can double this. Most residents choose the train.' },
]

const SCHOOLS = [
  { name: 'South Orange–Maplewood School District (SOMSD)', type: 'District Overview', desc: 'Shared K-12 district between South Orange and Maplewood. 7,200+ students across 10 schools. Known for strong academics, high diversity, and active parent community. Columbia High School is the shared 9-12 campus.' },
  { name: 'Montrose Early Childhood Center', type: 'Pre-K', desc: 'Township pre-K program serving 3 and 4-year-olds. Lottery-based enrollment; apply in the fall for the following year.' },
  { name: 'Elementary Schools (SO)', type: 'K-5', desc: 'South Orange has six elementary schools: Clinton, Delia Bolden, Marshall, Seth Boyden, South Mountain, and Tuscan. School assignments are based on address — check the district zoning map.' },
  { name: 'South Orange Middle School', type: 'Grade 6-8', desc: 'One of two SOMSD middle schools. Maplewood Middle School serves Maplewood-zoned students; South Orange students attend SOMS.' },
  { name: 'Columbia High School', type: 'Grades 9-12', desc: 'The shared high school for all SOMSD students. Located in Maplewood (though the address is Maplewood, it draws from all of South Orange). Strong arts and AP programs. Diverse student body.' },
  { name: 'Seton Hall University', type: 'University', desc: 'Division I university on the South Orange border with 10,000+ undergraduate and graduate students. Adds college-town energy to the commercial district.' },
]

const TAXES = [
  { q: 'When are property taxes due?', a: 'Quarterly: February 1, May 1, August 1, and November 1. Late payments accrue interest from the due date.' },
  { q: 'Where do I pay?', a: 'Tax Collector\'s Office: 76 S Orange Ave, Suite 302, South Orange, NJ 07079. Phone: 973-378-7715 Ext. 4.' },
  { q: 'How do I get tax alerts?', a: 'Sign up for SO Alerts at southorange.org — the township sends reminders before quarterly due dates.' },
  { q: 'How high are the taxes?', a: 'South Orange property taxes are among the higher in Essex County. A home assessed at $500,000 might carry $12,000–$18,000/year in taxes depending on the year\'s rate and exemptions. The walk-to-train premium in pricing is real, and so are the corresponding taxes.' },
  { q: 'Are there exemptions?', a: 'Yes — senior citizen, veteran, disabled person, and surviving spouse exemptions are available. Contact the Tax Assessor\'s office at 73 S Orange Ave.' },
  { q: 'Why are taxes high?', a: 'South Orange funds its own municipal services plus contributes to the SOMSD district (shared with Maplewood). The combination of strong school funding and municipal infrastructure drives the rate. Buyers who factor in the school quality tend to view it as fair value.' },
]

const HOUSING = [
  { type: 'Victorian & Tudor Homes', desc: 'The dominant housing stock in most South Orange neighborhoods. Built 1880s–1920s, these homes have the architectural character that defines the town. Expect older mechanicals, original hardwood floors, and rooms that don\'t conform to modern open-plan tastes.' },
  { type: 'Colonial & Craftsman', desc: 'Common throughout the residential streets. More accessible price points than the large Victorians; strong bones and usually well-maintained by long-term owners.' },
  { type: 'Condos & Multi-Family', desc: 'Scattered through the downtown and near-transit zones. Good entry point for first-time buyers who want the South Orange commute without the maintenance of a single-family home.' },
  { type: 'New Construction', desc: 'Rare but exists near the SHU campus zone and on infill lots. Usually townhome style. Priced at a premium for the newness.' },
]

export default function MovingToGuide() {
  return (
    <div style={{ background: \'#FAF8F3\', minHeight: \'100vh\' }}>
      <div style={{ background: \'linear-gradient(135deg, #1a3a6c 0%, #2D5016 100%)\', padding: \'64px 24px 48px\', textAlign: \'center\' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
        <h1 style={{ fontFamily: \'Georgia, serif\', fontSize: 42, color: \'#FAF8F3\', margin: \'0 0 12px\', fontWeight: 700 }}>
          Moving to South Orange, NJ
        </h1>
        <p style={{ color: \'#A8CC78\', fontSize: 18, margin: \'0 auto\', maxWidth: 640 }}>
          Everything you actually need to know — transit, schools, taxes, housing, and honest tradeoffs.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: \'48px auto\', padding: \'0 24px\' }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\' }}>
          South Orange attracts a specific kind of buyer: someone who wants the NYC commute, a genuine walkable downtown, good public schools, and a real neighborhood feel. It delivers all four, at a price. The taxes are high, the housing stock is old, and good homes move fast. If those are acceptable tradeoffs, very few towns in New Jersey offer what South Orange does.
        </p>
      </div>

      {/* Transit */}
      <div style={{ maxWidth: 900, margin: \'0 auto\', padding: \'0 24px 48px\' }}>
        <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 30, color: \'#2D5016\', marginBottom: 8 }}>🚂 Getting to NYC</h2>
        <p style={{ fontSize: 15, color: \'#555\', marginBottom: 24 }}>The train is the reason many people move here. Understand it before you buy.</p>
        <div style={{ display: \'grid\', gridTemplateColumns: \'repeat(auto-fill, minmax(280px, 1fr))\', gap: 16 }}>
          {TRANSIT.map(t => (
            <div key={t.label} style={{ background: \'#fff\', borderRadius: 10, padding: \'18px 20px\', border: \'1px solid #E5DDD0\' }}>
              <div style={{ fontSize: 12, color: \'#888\', textTransform: \'uppercase\', letterSpacing: 0.8, marginBottom: 4 }}>{t.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: \'#2D5016\', marginBottom: 8 }}>{t.value}</div>
              <div style={{ fontSize: 13, color: \'#555\', lineHeight: 1.6 }}>{t.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Schools */}
      <div style={{ maxWidth: 900, margin: \'0 auto\', padding: \'0 24px 48px\' }}>
        <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 30, color: \'#2D5016\', marginBottom: 8 }}>🏫 Schools</h2>
        <p style={{ fontSize: 15, color: \'#555\', marginBottom: 24 }}>South Orange–Maplewood SD is a K-12 district with strong academics and one of the most diverse student bodies in NJ.</p>
        <div style={{ display: \'grid\', gap: 16 }}>
          {SCHOOLS.map(s => (
            <div key={s.name} style={{ background: \'#fff\', borderRadius: 10, padding: \'18px 24px\', border: \'1px solid #E5DDD0\', display: \'flex\', gap: 20 }}>
              <div style={{ minWidth: 80, fontSize: 12, color: \'#2D5016\', fontWeight: 700, textTransform: \'uppercase\', letterSpacing: 0.5, paddingTop: 2 }}>{s.type}</div>
              <div>
                <div style={{ fontFamily: \'Georgia, serif\', fontSize: 17, color: \'#1a1a1a\', marginBottom: 6, fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: 14, color: \'#555\', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Taxes */}
      <div style={{ maxWidth: 900, margin: \'0 auto\', padding: \'0 24px 48px\' }}>
        <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 30, color: \'#2D5016\', marginBottom: 8 }}>💰 Property Taxes</h2>
        <p style={{ fontSize: 15, color: \'#555\', marginBottom: 24 }}>High, predictable, and worth understanding before you close.</p>
        <div style={{ display: \'grid\', gap: 16 }}>
          {TAXES.map(t => (
            <div key={t.q} style={{ background: \'#fff\', borderRadius: 10, padding: \'16px 24px\', border: \'1px solid #E5DDD0\' }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: \'#1a1a1a\', marginBottom: 6 }}>{t.q}</div>
              <div style={{ fontSize: 14, color: \'#555\', lineHeight: 1.6 }}>{t.a}</div>
            </div>
          ))}
        </div>
        <div style={{ background: \'#fff8e8\', border: \'1px solid #E8BE5A\', borderRadius: 10, padding: \'16px 24px\', marginTop: 20 }}>
          <strong>Tax Collector:</strong> 76 S Orange Ave, Suite 302 · 973-378-7715 Ext. 4 · Quarterly due: Feb 1, May 1, Aug 1, Nov 1
        </div>
      </div>

      {/* Housing */}
      <div style={{ maxWidth: 900, margin: \'0 auto\', padding: \'0 24px 80px\' }}>
        <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 30, color: \'#2D5016\', marginBottom: 8 }}>🏠 Housing Stock</h2>
        <p style={{ fontSize: 15, color: \'#555\', marginBottom: 24 }}>Most of South Orange\'s homes were built before 1940. That\'s the charm and the maintenance reality.</p>
        <div style={{ display: \'grid\', gridTemplateColumns: \'repeat(auto-fill, minmax(280px, 1fr))\', gap: 16 }}>
          {HOUSING.map(h => (
            <div key={h.type} style={{ background: \'#fff\', borderRadius: 10, padding: \'18px 20px\', border: \'1px solid #E5DDD0\' }}>
              <div style={{ fontFamily: \'Georgia, serif\', fontSize: 16, fontWeight: 600, color: \'#2D5016\', marginBottom: 10 }}>{h.type}</div>
              <div style={{ fontSize: 14, color: \'#555\', lineHeight: 1.6 }}>{h.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: \'#2D5016\', padding: \'40px 24px\', textAlign: \'center\' }}>
        <div style={{ display: \'flex\', gap: 12, flexWrap: \'wrap\', justifyContent: \'center\' }}>
          {[
            { href: \'/guides/neighborhoods\', label: \'🏘 Neighborhoods\' },
            { href: \'/guides/real-estate\', label: \'🏠 Real Estate\' },
            { href: \'/guides/south-orange-vs-maplewood\', label: \'⚖️ vs Maplewood\' },
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

# ── NEIGHBORHOODS ─────────────────────────────────────────────────────────────
neighborhoods = '''export const metadata = {
  title: 'South Orange NJ Neighborhoods Guide | South Orange Guide',
  description: 'Detailed profiles of every South Orange neighborhood — from the walkable downtown village to South Mountain and Tuxedo Park.',
}

const HOODS = [
  {
    name: 'Downtown / Village Center',
    tags: ['Most Walkable', 'Train Access', 'Restaurant Row'],
    color: '#2D5016',
    desc: 'The heart of South Orange. Mountain Station is here, as are virtually all of the restaurants, bars, coffee shops, and SOPAC. Residential streets directly adjacent to the commercial strip — some are genuinely quiet despite the proximity. The trade-off is street noise on weekends and parking pressure.',
    bestFor: 'Commuters who want to walk to the train; those who want to walk to dinner without a car.',
    housing: 'Mix of older multi-family, converted condos, and Victorian single-family near the commercial edges.',
  },
  {
    name: 'Academy Heights',
    tags: ['Historic', 'Victorian Architecture', 'Large Lots'],
    color: '#4a7c28',
    desc: 'One of the most architecturally significant residential areas in South Orange. Large Victorians and Tudor revivals on tree-lined streets, mostly built 1890–1920. A short walk to the village but decidedly residential in character.',
    bestFor: 'Buyers who want a signature historic home with the downtown amenities nearby.',
    housing: 'Large single-family Victorians and Tudors. Some of the highest home prices in the township.',
  },
  {
    name: 'Montrose Park',
    tags: ['Quiet', 'Family-Friendly', 'Well-Maintained'],
    color: '#1a5c8c',
    desc: 'A well-established residential neighborhood with strong neighborhood association activity. Solid mix of Colonials and Tudors, good public schools nearby, and easy access to South Mountain Reservation trails. Quieter than the village neighborhoods but not remote.',
    bestFor: 'Families who want established streets and trail access without sacrificing proximity to the train.',
    housing: 'Colonials, Tudors, and Craftsman bungalows at a range of price points.',
  },
  {
    name: 'South Mountain',
    tags: ['Park Access', 'Trails', 'Wooded'],
    color: '#2D5016',
    desc: 'Borders South Mountain Reservation — some houses back directly up to the park. The most nature-immersed part of South Orange. Longer walk to the train (typically 15–25 min or a short drive), but the access to 2,110 acres of preserve is unmatched.',
    bestFor: 'Outdoor enthusiasts, families with dogs, anyone who wants a trail at the back door.',
    housing: 'Mid-century ranches, some newer construction, plus older Colonials. Generally more affordable than downtown-adjacent neighborhoods.',
  },
  {
    name: 'Tuxedo Park',
    tags: ['Upscale', 'Large Lots', 'Estate-Scale'],
    color: '#8B6914',
    desc: 'A small enclave of larger, estate-style properties in the northwestern part of the township. Some of the largest homes and lots in South Orange. Removed from downtown bustle; requires a car for most errands.',
    bestFor: 'Buyers prioritizing space and privacy over walkability.',
    housing: 'Large estate homes and oversize lots. High price points; rarely listed.',
  },
  {
    name: 'Seton Village',
    tags: ['University Adjacent', 'Young Professionals', 'Affordable Entry'],
    color: '#3d1a5c',
    desc: 'Adjacent to Seton Hall\'s campus, this neighborhood has a younger energy with more rental inventory. Good entry-level pricing for buyers willing to accept some university adjacency (event traffic, student pedestrian activity).',
    bestFor: 'First-time buyers, SHU faculty and staff, young renters.',
    housing: 'Mix of rentals, small multi-family, and older single-family homes at accessible price points.',
  },
  {
    name: 'Wyoming / Upper Wyoming',
    tags: ['Tree-Lined', 'Classic SO', 'Mixed Housing'],
    color: '#4a7c28',
    desc: 'Wyoming Avenue and the streets branching from it form a classic South Orange residential fabric — large trees, varied architecture, and the sense of a neighborhood that has been happily itself for a long time. Upper Wyoming is the more elevated, larger-lot section.',
    bestFor: 'Buyers who want the quintessential South Orange residential experience.',
    housing: 'Diverse — Victorians, Colonials, some bungalows. Wyoming is one of the most sought addresses in town.',
  },
  {
    name: 'Newstead',
    tags: ['Residential', 'Quiet', 'Underrated'],
    color: '#555',
    desc: 'A quieter residential area southeast of downtown. Less foot traffic than the village-adjacent neighborhoods but solid housing stock and easy access to the commercial strip by car or bike.',
    bestFor: 'Buyers who want South Orange\'s school district and train access without the downtown premium.',
    housing: 'Varied — some older multi-family alongside single-family Colonials and bungalows.',
  },
  {
    name: 'West Montrose',
    tags: ['Residential', 'Established', 'Family'],
    color: '#2D5016',
    desc: 'A well-established neighborhood on the western edge of the township, characterized by solid Colonials and a strong owner-occupancy rate. Less architectural drama than Academy Heights but consistent and well-maintained.',
    bestFor: 'Families who want stable, established blocks with good schools.',
    housing: 'Colonials and Tudors, mostly well-maintained. Mid-range pricing for South Orange.',
  },
  {
    name: 'Village Colonials',
    tags: ['Close to Train', 'Good Value', 'Dense'],
    color: '#1a3a6c',
    desc: 'The blocks immediately surrounding the village center with Colonial-style housing stock — denser than the outer neighborhoods, closer to the train. Some noise from the downtown on weekends but unbeatable convenience.',
    bestFor: 'Buyers who want train proximity without condo living.',
    housing: 'Colonials and some multi-family, priced at a premium for location.',
  },
]

const LIFESTYLE_SORT = [
  { profile: 'NYC Commuter', answer: 'Downtown / Village Center or Village Colonials — shortest walk to Mountain Station.' },
  { profile: 'Families with Young Kids', answer: 'Montrose Park or South Mountain — good elementary school proximity and park access.' },
  { profile: 'Outdoor Enthusiasts', answer: 'South Mountain — backs to 2,110 acres of South Mountain Reservation.' },
  { profile: 'Historic Home Buyers', answer: 'Academy Heights or Wyoming — the best Victorian and Tudor stock.' },
  { profile: 'First-Time Buyers', answer: 'Seton Village or Newstead — most accessible price points in the district.' },
  { profile: 'Walkers / No Car', answer: 'Downtown / Village Center — the only neighborhood where a car is truly optional.' },
]

export default function NeighborhoodsGuide() {
  return (
    <div style={{ background: \'#FAF8F3\', minHeight: \'100vh\' }}>
      <div style={{ background: \'linear-gradient(135deg, #2D5016 0%, #4a7c28 100%)\', padding: \'64px 24px 48px\', textAlign: \'center\' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏘</div>
        <h1 style={{ fontFamily: \'Georgia, serif\', fontSize: 42, color: \'#FAF8F3\', margin: \'0 0 12px\', fontWeight: 700 }}>
          South Orange Neighborhoods Guide
        </h1>
        <p style={{ color: \'#A8CC78\', fontSize: 18, margin: \'0 auto\', maxWidth: 640 }}>
          Profiles of all 10 neighborhoods — walkability, housing types, and which fits your lifestyle.
        </p>
      </div>

      {/* Lifestyle matcher */}
      <div style={{ maxWidth: 900, margin: \'48px auto\', padding: \'0 24px\' }}>
        <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 26, color: \'#2D5016\', marginBottom: 20 }}>Match Your Lifestyle</h2>
        <div style={{ display: \'grid\', gridTemplateColumns: \'repeat(auto-fill, minmax(260px, 1fr))\', gap: 14 }}>
          {LIFESTYLE_SORT.map(l => (
            <div key={l.profile} style={{ background: \'#fff\', borderRadius: 10, padding: \'14px 18px\', border: \'1px solid #E5DDD0\' }}>
              <div style={{ fontSize: 12, color: \'#888\', textTransform: \'uppercase\', letterSpacing: 0.8, marginBottom: 6 }}>{l.profile}</div>
              <div style={{ fontSize: 14, color: \'#1a1a1a\', lineHeight: 1.5 }}>{l.answer}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Neighborhood profiles */}
      <div style={{ maxWidth: 900, margin: \'0 auto\', padding: \'0 24px 80px\' }}>
        <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 26, color: \'#2D5016\', marginBottom: 24 }}>All Neighborhoods</h2>
        <div style={{ display: \'grid\', gap: 20 }}>
          {HOODS.map(h => (
            <div key={h.name} style={{ background: \'#fff\', borderRadius: 12, border: \'1px solid #E5DDD0\', overflow: \'hidden\', boxShadow: \'0 2px 8px rgba(0,0,0,0.05)\' }}>
              <div style={{ borderLeft: \`6px solid ${h.color}\`, padding: \'20px 24px\' }}>
                <div style={{ display: \'flex\', flexWrap: \'wrap\', gap: 8, marginBottom: 10, alignItems: \'center\' }}>
                  <h3 style={{ fontFamily: \'Georgia, serif\', fontSize: 20, color: \'#1a1a1a\', margin: 0 }}>{h.name}</h3>
                  {h.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 11, background: h.color, color: \'#fff\', padding: \'2px 8px\', borderRadius: 12, fontWeight: 600, letterSpacing: 0.5 }}>{tag}</span>
                  ))}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: \'#3a3a3a\', margin: \'0 0 12px\' }}>{h.desc}</p>
                <div style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: 12 }}>
                  <div style={{ background: \'#FAF8F3\', borderRadius: 8, padding: \'10px 14px\' }}>
                    <div style={{ fontSize: 11, color: \'#888\', textTransform: \'uppercase\', letterSpacing: 0.8, marginBottom: 4 }}>Best For</div>
                    <div style={{ fontSize: 13, color: \'#3a3a3a\' }}>{h.bestFor}</div>
                  </div>
                  <div style={{ background: \'#FAF8F3\', borderRadius: 8, padding: \'10px 14px\' }}>
                    <div style={{ fontSize: 11, color: \'#888\', textTransform: \'uppercase\', letterSpacing: 0.8, marginBottom: 4 }}>Housing</div>
                    <div style={{ fontSize: 13, color: \'#3a3a3a\' }}>{h.housing}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: \'#2D5016\', padding: \'40px 24px\', textAlign: \'center\' }}>
        <div style={{ display: \'flex\', gap: 12, flexWrap: \'wrap\', justifyContent: \'center\' }}>
          {[
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

# ── REAL ESTATE ───────────────────────────────────────────────────────────────
realestate = '''export const metadata = {
  title: 'South Orange NJ Real Estate Guide | South Orange Guide',
  description: 'The honest real estate guide to South Orange, NJ — what drives prices, housing types, taxes, and how it compares to Maplewood and Montclair.',
}

const WHY_EXPENSIVE = [
  { factor: 'Walk-to-Train Premium', desc: 'Mountain Station is IN downtown. A walkable train to NYC Penn Station (35 min express) is the single biggest price driver. Properties within a 10-minute walk carry a measurable premium over identical homes in non-train towns.' },
  { factor: 'School District', desc: 'SOMSD (South Orange–Maplewood) is well-regarded and diverse. Strong school districts always support home values, and SOMSD is a draw for families specifically.' },
  { factor: 'Walkable Downtown', desc: 'Restaurants, coffee, bars, SOPAC, and the farmers market — all walkable. This is rare in NJ suburbs and the market prices it accordingly.' },
  { factor: 'Tight Inventory', desc: 'South Orange doesn\'t build much new housing. The town is fully developed; turnover drives the market. When good homes list, they move fast.' },
  { factor: 'Essex County Location', desc: 'Proximity to Montclair (the most desirable suburb in Essex) provides a market floor. Buyers who can\'t make Montclair work often turn to South Orange — which keeps demand elevated.' },
]

const HOUSING_TYPES = [
  { type: 'Victorian & Tudor (pre-1930)', price: '$$$$', desc: 'The signature housing type. Original details — tin ceilings, pocket doors, hardwood floors — paired with older mechanicals. Budget for a full inspection and deferred maintenance. When move-in ready, they command top dollar.' },
  { type: 'Colonial (1930s–1960s)', price: '$$$', desc: 'Solid mid-century construction, typically well-maintained. More accommodating floor plans than the Victorians for modern living. The accessible volume of the market.' },
  { type: 'Craftsman Bungalow', price: '$$–$$$', desc: 'Smaller footprint but high character. Popular with first-time buyers and downsizers. Concentrated in the Wyoming Ave area and outer neighborhoods.' },
  { type: 'Condo / Multi-Family', price: '$$', desc: 'Downtown-adjacent inventory with low maintenance. The entry point for buyers who want SO\'s location without the single-family responsibility.' },
  { type: 'New Construction', price: '$$$$+', desc: 'Rare. Townhome-style, usually near the SHU campus. High price per square foot but modern systems and no deferred maintenance.' },
]

const HONEST_TRADEOFFS = [
  { issue: 'High taxes', reality: 'Real. A $700K home might carry $16,000–$22,000/year in taxes. Know this number before you make an offer.' },
  { issue: 'Old housing stock', reality: 'Virtually everything was built before 1950. This means character AND costs. Full home inspection, sewer scope, and oil tank search are table stakes.' },
  { issue: 'Tight parking', reality: 'On-street parking is limited near the village. If you have two cars, verify parking capacity before you buy.' },
  { issue: 'Inventory scarcity', reality: 'Good homes move in days, not weeks. Buyers need pre-approval, a clear brief, and an agent who\'s in the market daily.' },
  { issue: 'University adjacency', reality: 'Near Seton Hall: more foot traffic, occasional event noise. Not a negative for everyone, but worth knowing.' },
]

export default function RealEstateGuide() {
  return (
    <div style={{ background: \'#FAF8F3\', minHeight: \'100vh\' }}>
      <div style={{ background: \'linear-gradient(135deg, #1a3a6c 0%, #2D5016 100%)\', padding: \'64px 24px 48px\', textAlign: \'center\' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
        <h1 style={{ fontFamily: \'Georgia, serif\', fontSize: 42, color: \'#FAF8F3\', margin: \'0 0 12px\', fontWeight: 700 }}>
          South Orange Real Estate Guide
        </h1>
        <p style={{ color: \'#A8CC78\', fontSize: 18, margin: \'0 auto\', maxWidth: 640 }}>
          What drives prices, what to expect from the housing stock, and the honest tradeoffs before you buy.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: \'48px auto\', padding: \'0 24px\' }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\' }}>
          South Orange real estate is expensive by NJ standards for the reasons you\'d expect: a train to Penn Station that\'s genuinely fast, a walkable downtown with actual amenities, a solid school district, and architectural housing stock that people want to live in. The demand is real and the inventory is tight.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\', marginTop: 16 }}>
          The honest version: taxes are high, most homes are old and need inspection discipline, and the market moves fast. Buyers who understand those three things and buy anyway tend to be happy. Buyers who discover them after closing tend not to be.
        </p>
      </div>

      {/* Why expensive */}
      <div style={{ maxWidth: 900, margin: \'0 auto\', padding: \'0 24px 48px\' }}>
        <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 28, color: \'#2D5016\', marginBottom: 20 }}>Why South Orange Is Priced the Way It Is</h2>
        <div style={{ display: \'grid\', gap: 16 }}>
          {WHY_EXPENSIVE.map(w => (
            <div key={w.factor} style={{ background: \'#fff\', borderRadius: 10, padding: \'16px 24px\', border: \'1px solid #E5DDD0\', display: \'flex\', gap: 20 }}>
              <div style={{ minWidth: 6, background: \'#2D5016\', borderRadius: 3 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: \'#1a1a1a\', marginBottom: 6 }}>{w.factor}</div>
                <div style={{ fontSize: 14, color: \'#555\', lineHeight: 1.6 }}>{w.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Housing types */}
      <div style={{ maxWidth: 900, margin: \'0 auto\', padding: \'0 24px 48px\' }}>
        <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 28, color: \'#2D5016\', marginBottom: 20 }}>Housing Types</h2>
        <div style={{ display: \'grid\', gridTemplateColumns: \'repeat(auto-fill, minmax(280px, 1fr))\', gap: 16 }}>
          {HOUSING_TYPES.map(h => (
            <div key={h.type} style={{ background: \'#fff\', borderRadius: 10, padding: \'18px 20px\', border: \'1px solid #E5DDD0\' }}>
              <div style={{ display: \'flex\', justifyContent: \'space-between\', alignItems: \'flex-start\', marginBottom: 8 }}>
                <div style={{ fontFamily: \'Georgia, serif\', fontSize: 15, fontWeight: 600, color: \'#2D5016\', flex: 1 }}>{h.type}</div>
                <div style={{ fontSize: 13, color: \'#E8BE5A\', fontWeight: 700, marginLeft: 8 }}>{h.price}</div>
              </div>
              <div style={{ fontSize: 13, color: \'#555\', lineHeight: 1.6 }}>{h.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tradeoffs */}
      <div style={{ maxWidth: 900, margin: \'0 auto\', padding: \'0 24px 80px\' }}>
        <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 28, color: \'#2D5016\', marginBottom: 8 }}>Honest Tradeoffs</h2>
        <p style={{ fontSize: 15, color: \'#555\', marginBottom: 20 }}>Every town has them. Know South Orange\'s before you bid.</p>
        <div style={{ display: \'grid\', gap: 14 }}>
          {HONEST_TRADEOFFS.map(t => (
            <div key={t.issue} style={{ background: \'#fff\', borderRadius: 10, padding: \'14px 20px\', border: \'1px solid #E5DDD0\', display: \'flex\', gap: 16, alignItems: \'flex-start\' }}>
              <div style={{ minWidth: 120, fontSize: 12, color: \'#c44\', fontWeight: 700, textTransform: \'uppercase\', letterSpacing: 0.5, paddingTop: 2 }}>{t.issue}</div>
              <div style={{ fontSize: 14, color: \'#3a3a3a\', lineHeight: 1.6 }}>{t.reality}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: \'#2D5016\', padding: \'40px 24px\', textAlign: \'center\' }}>
        <div style={{ display: \'flex\', gap: 12, flexWrap: \'wrap\', justifyContent: \'center\' }}>
          {[
            { href: \'/guides/neighborhoods\', label: \'🏘 Neighborhoods\' },
            { href: \'/guides/moving-to\', label: \'📦 Moving Here\' },
            { href: \'/guides/south-orange-vs-maplewood\', label: \'⚖️ vs Maplewood\' },
            { href: \'/guides/south-orange-vs-montclair\', label: \'🏙 vs Montclair\' },
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

write_page(f'{base}/moving-to', moving)
write_page(f'{base}/neighborhoods', neighborhoods)
write_page(f'{base}/real-estate', realestate)
