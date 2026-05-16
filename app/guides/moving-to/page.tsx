export const metadata = {
  title: 'Moving to South Orange NJ | Complete Relocation Guide | SouthOrange.com',
  description:
    'Everything you need to know about moving to South Orange, NJ — NJ Transit commute, schools, property taxes, housing stock, bus routes, and what life is really like.',
  openGraph: {
    title: 'Moving to South Orange, NJ — Relocation Guide',
    description:
      'NJ Transit commute times, SOMSD schools, property taxes, housing stock, and honest tradeoffs for people considering a move to South Orange.',
    url: 'https://southorange.com/guides/moving-to',
    siteName: 'SouthOrange.com',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How far is South Orange from NYC by train?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'South Orange Station is approximately 30–35 minutes from New York Penn Station on the NJ Transit Morris & Essex Line (Midtown Direct). The station is at 1 Valley St, right in the heart of downtown — walkable from most restaurants and shops. Mountain Station, the second stop, is a few minutes closer to Newark. Most commuters use South Orange Station.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the schools like in South Orange?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'South Orange is served by the South Orange-Maplewood School District (SOMSD), a K-12 shared district with strong academics, high diversity, and an active parent community. The district includes six elementary schools in South Orange, South Orange Middle School, and Columbia High School (shared with Maplewood, located at 17 Parker Ave, Maplewood). Seton Hall Preparatory School (shp.org, 120 Northfield Ave, West Orange) is a well-regarded private option nearby.',
      },
    },
    {
      '@type': 'Question',
      name: 'How high are property taxes in South Orange?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'South Orange property taxes are among the higher in Essex County. A home assessed at $500,000 might carry $12,000–$18,000/year depending on the tax rate and exemptions. Taxes are paid quarterly and managed by the Tax Collector at 76 S Orange Ave. Visit southorange.org for the tax collector portal and signup for quarterly reminders.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is South Orange a good place to raise a family?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. South Orange consistently attracts families from NYC who want a walkable town, strong public schools, and a real community feel. The SOMSD district, proximity to South Mountain Reservation, the community pool, SOPAC, and an active local community make it a genuinely excellent place to raise children. The main tradeoffs are high property taxes and older housing stock.',
      },
    },
  ],
};

const BG = '#FAF8F3';
const DARK_GREEN = '#2D5016';
const GOLD = '#E8BE5A';
const SAGE = '#A8CC78';
const STONE = '#E5DDD0';
const TEXT = '#1A1A1A';
const MUTED = '#5A5A4A';

export default function MovingToGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ background: BG, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: TEXT }}>

        {/* Nav */}
        <nav style={{ background: DARK_GREEN, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <a href="/" style={{ color: GOLD, fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 18, textDecoration: 'none' }}>
            SouthOrange.com
          </a>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="/guides/things-to-do" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Things To Do</a>
            <a href="/guides/restaurants" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Restaurants</a>
            <a href="/" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Home</a>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ background: DARK_GREEN, padding: '64px 24px 72px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
            Moving to South Orange, NJ
          </h1>
          <p style={{ fontSize: 18, color: SAGE, maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            Everything you actually need to know — transit, schools, taxes, housing, and honest tradeoffs.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 16, marginBottom: 0 }}>
            Written by Rob Schutz · Updated May 2026
          </p>
        </section>

        <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* Intro */}
          <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderLeft: `4px solid ${SAGE}`, borderRadius: 8, padding: '20px 24px', marginBottom: 48 }}>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: TEXT, margin: 0 }}>
              South Orange attracts a specific kind of buyer: someone who wants the NYC commute, a genuine walkable
              downtown, good public schools, and a real neighborhood feel. It delivers all four, at a price. The taxes
              are high, the housing stock is old, and good homes move fast. If those are acceptable tradeoffs, very
              few towns in New Jersey offer what South Orange does.
            </p>
          </div>

          {/* ── Transit ── */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: DARK_GREEN, margin: '0 0 8px' }}>
              🚂 Getting to NYC
            </h2>
            <p style={{ color: MUTED, fontSize: 15, marginTop: 0, marginBottom: 24 }}>
              The train is the reason many people move here. Understand it before you buy.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {[
                {
                  label: 'South Orange Station → NYC Penn',
                  value: '~30–35 min',
                  detail: 'NJ Transit Morris & Essex Line, Midtown Direct service. South Orange Station (1 Valley St) is right in downtown — 2-minute walk from restaurants and shops. This is the primary station for most residents.',
                  link: 'https://maps.google.com/?q=1+Valley+St+South+Orange+NJ+07079',
                },
                {
                  label: 'Mountain Station',
                  value: 'One stop closer',
                  detail: 'A secondary stop just outside the main downtown area. Less convenient for walkability but an option if you\'re in the eastern part of town. Same Midtown Direct service.',
                  link: null,
                },
                {
                  label: 'Train frequency',
                  value: 'Every 20–30 min',
                  detail: 'Peak hours offer more frequent service; off-peak is every 30–60 min. Consistent enough that most residents don\'t obsessively time it. Check njtransit.com for live schedules.',
                  link: 'https://www.njtransit.com/schedules',
                },
                {
                  label: 'Monthly pass zone',
                  value: 'Zone 4',
                  detail: 'Check NJTransit.com for current pricing. Monthly passes are the standard move for daily commuters. Midtown Direct means no transfer — straight shot to Penn Station.',
                  link: 'https://www.njtransit.com/schedules',
                },
                {
                  label: 'Bus routes',
                  value: '#92 and #107',
                  detail: 'Provide connections within Essex County and to Newark. Less commonly used by commuters than the train, but useful for local trips and non-peak destinations.',
                  link: null,
                },
                {
                  label: 'Commuter parking',
                  value: 'Township lots',
                  detail: 'The township operates parking near South Orange Station. Commuter permits available through the municipality — apply early, wait lists are common for the most convenient spots.',
                  link: null,
                },
                {
                  label: 'Driving to NYC',
                  value: '30–50 min off-peak',
                  detail: 'Via I-78 E or US-22 to the tunnels. Peak traffic can double this easily. Most residents with a choice take the train.',
                  link: null,
                },
              ].map((t) => (
                <div key={t.label} style={{ background: '#FFFFFF', borderRadius: 10, padding: '18px 20px', border: `1px solid ${STONE}` }}>
                  <div style={{ fontSize: 12, color: MUTED, textTransform: 'uppercase' as const, letterSpacing: 0.8, marginBottom: 4 }}>{t.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: DARK_GREEN, marginBottom: 8 }}>{t.value}</div>
                  <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: t.link ? 8 : 0 }}>{t.detail}</div>
                  {t.link && (
                    <a href={t.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: DARK_GREEN, textDecoration: 'underline' }}>
                      View →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Schools ── */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: DARK_GREEN, margin: '0 0 8px' }}>
              🏫 Schools
            </h2>
            <p style={{ color: MUTED, fontSize: 15, marginTop: 0, marginBottom: 24 }}>
              South Orange–Maplewood SD is a K-12 district with strong academics and one of the most diverse student bodies in NJ.{' '}
              <a href="https://www.somsd.k12.nj.us/" target="_blank" rel="noopener noreferrer" style={{ color: DARK_GREEN }}>somsd.k12.nj.us</a>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                {
                  type: 'District',
                  name: 'South Orange–Maplewood School District (SOMSD)',
                  address: null,
                  link: 'https://www.somsd.k12.nj.us/',
                  desc: 'K-12 shared district between South Orange and Maplewood. 7,200+ students across 10 schools. Known for strong academics, high diversity, and active parent community.',
                },
                {
                  type: 'Elementary (K-5)',
                  name: 'Six South Orange Elementary Schools',
                  address: null,
                  link: 'https://www.somsd.k12.nj.us/',
                  desc: 'Clinton, Delia Bolden, Marshall, Seth Boyden, South Mountain, and Tuscan. School assignments are based on home address — check the district zoning map on somsd.k12.nj.us.',
                },
                {
                  type: 'Middle School (6-8)',
                  name: 'South Orange Middle School',
                  address: '70 N Ridgewood Rd, South Orange, NJ 07079',
                  link: 'https://maps.google.com/?q=70+N+Ridgewood+Rd+South+Orange+NJ+07079',
                  desc: 'One of two SOMSD middle schools. South Orange-zoned students attend SOMS; Maplewood students attend Maplewood Middle School.',
                },
                {
                  type: 'High School (9-12)',
                  name: 'Columbia High School',
                  address: '17 Parker Ave, Maplewood, NJ 07040',
                  link: 'https://maps.google.com/?q=17+Parker+Ave+Maplewood+NJ+07040',
                  desc: 'The shared high school for all SOMSD students. Located in Maplewood but serves all of South Orange. Strong arts, AP programs, and a highly diverse student body. One of the best public high schools in Essex County.',
                },
                {
                  type: 'Private Option',
                  name: 'Seton Hall Preparatory School',
                  address: '120 Northfield Ave, West Orange, NJ 07052',
                  link: 'https://www.shp.org/',
                  desc: 'Well-regarded Catholic prep school just a few miles from South Orange. shp.org — strong college placement record.',
                },
                {
                  type: 'University',
                  name: 'Seton Hall University',
                  address: '400 South Orange Ave, South Orange, NJ 07079',
                  link: 'https://www.shu.edu/',
                  desc: 'Division I university on the South Orange border with 10,000+ undergraduate and graduate students. Adds college-town energy and some of the best dining options in town.',
                },
              ].map((s) => (
                <div key={s.name} style={{ background: '#FFFFFF', borderRadius: 10, padding: '18px 24px', border: `1px solid ${STONE}`, display: 'flex', gap: 20 }}>
                  <div style={{ minWidth: 90, fontSize: 12, color: DARK_GREEN, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 0.5, paddingTop: 2, flexShrink: 0 }}>
                    {s.type}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: TEXT, marginBottom: 4, fontWeight: 600 }}>{s.name}</div>
                    {s.address && (
                      <div style={{ marginBottom: 6 }}>
                        <a href={s.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: DARK_GREEN, textDecoration: 'underline' }}>
                          📍 {s.address}
                        </a>
                      </div>
                    )}
                    {!s.address && s.link && (
                      <div style={{ marginBottom: 6 }}>
                        <a href={s.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: DARK_GREEN, textDecoration: 'underline' }}>
                          {s.link.replace('https://', '')} →
                        </a>
                      </div>
                    )}
                    <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Taxes ── */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: DARK_GREEN, margin: '0 0 8px' }}>
              🏦 Property Taxes
            </h2>
            <p style={{ color: MUTED, fontSize: 15, marginTop: 0, marginBottom: 24 }}>
              High but transparent. Know what you&rsquo;re signing up for.{' '}
              <a href="https://www.southorange.org/" target="_blank" rel="noopener noreferrer" style={{ color: DARK_GREEN }}>southorange.org</a>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                {
                  q: 'How high are the taxes?',
                  a: "Among the higher in Essex County. A home assessed at $500,000 might carry $12,000–$18,000/year depending on the year's rate and exemptions. The walk-to-train premium in pricing is real, and so are the taxes.",
                },
                {
                  q: 'When are property taxes due?',
                  a: 'Quarterly: February 1, May 1, August 1, and November 1. Late payments accrue interest from the due date.',
                },
                {
                  q: 'Where do I pay and how do I get reminders?',
                  a: 'Tax Collector\'s Office: 76 S Orange Ave, Suite 302, South Orange, NJ 07079. Sign up for SO Alerts at southorange.org — the township sends reminders before quarterly due dates.',
                },
                {
                  q: 'Are there exemptions?',
                  a: 'Yes — senior citizen, veteran, disabled person, and surviving spouse exemptions are available. Contact the Tax Assessor\'s office at 73 S Orange Ave.',
                },
                {
                  q: 'Why are taxes so high?',
                  a: 'South Orange funds its own municipal services plus contributes to SOMSD (shared with Maplewood). The combination of strong school funding and municipal infrastructure drives the rate. Buyers who factor in school quality tend to view it as reasonable value.',
                },
              ].map((item) => (
                <div key={item.q} style={{ background: '#FFFFFF', borderRadius: 10, padding: '18px 24px', border: `1px solid ${STONE}` }}>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 700, color: DARK_GREEN, marginBottom: 8 }}>{item.q}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.65 }}>{item.a}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Housing ── */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: DARK_GREEN, margin: '0 0 8px' }}>
              🏡 Housing Stock
            </h2>
            <p style={{ color: MUTED, fontSize: 15, marginTop: 0, marginBottom: 24 }}>
              Mostly 1880s–1920s construction. Beautiful bones, older mechanicals.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {[
                {
                  type: 'Victorian & Tudor Homes',
                  desc: 'The dominant housing stock in most South Orange neighborhoods. Built 1880s–1920s — architectural character that defines the town. Expect original hardwood floors and rooms that don\'t conform to modern open-plan tastes.',
                },
                {
                  type: 'Colonial & Craftsman',
                  desc: 'Common throughout the residential streets. More accessible price points than the large Victorians; strong bones and usually well-maintained by long-term owners.',
                },
                {
                  type: 'Condos & Multi-Family',
                  desc: 'Scattered through the downtown and near-transit zones. Good entry point for first-time buyers who want the South Orange commute without single-family maintenance.',
                },
                {
                  type: 'New Construction',
                  desc: 'Rare but exists near the SHU campus zone and on infill lots. Usually townhome style. Priced at a premium for the newness.',
                },
              ].map((h) => (
                <div key={h.type} style={{ background: '#FFFFFF', borderRadius: 10, padding: '20px 22px', border: `1px solid ${STONE}` }}>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: DARK_GREEN, marginBottom: 8 }}>{h.type}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.65 }}>{h.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Instagram Shoutout ── */}
          <section style={{ marginBottom: 56 }}>
            <div style={{
              background: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%)',
              borderRadius: 12,
              padding: '28px 32px',
              color: '#FFFFFF',
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>📸</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, margin: '0 0 10px', color: '#FFFFFF' }}>
                Follow Along: @LiveLoveMaplewood
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: '0 0 16px', color: 'rgba(255,255,255,0.92)' }}>
                For day-to-day life in the South Orange–Maplewood area — restaurant openings, neighborhood events,
                local recommendations, and what it actually feels like to live here — follow{' '}
                <a
                  href="https://www.instagram.com/livelovemaplewood/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#FFFFFF', fontWeight: 700, textDecoration: 'underline' }}
                >
                  @LiveLoveMaplewood
                </a>{' '}
                on Instagram. One of the best local accounts covering this area.
              </p>
              <a
                href="https://www.instagram.com/livelovemaplewood/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: 24,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Follow @LiveLoveMaplewood →
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 700, color: DARK_GREEN, marginBottom: 20, marginTop: 0 }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {faqSchema.mainEntity.map((item) => (
                <div key={item.name} style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderRadius: 10, padding: '20px 24px' }}>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: DARK_GREEN, margin: '0 0 10px' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: '#3A3A2A', margin: 0 }}>
                    {item.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related */}
          <section>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: DARK_GREEN, marginBottom: 16, marginTop: 0 }}>
              Related Guides
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { label: 'Commute to NYC', href: '/guides/commute-south-orange-nyc' },
                { label: 'Schools Guide', href: '/guides/schools-south-orange' },
                { label: 'Neighborhoods', href: '/guides/neighborhoods' },
                { label: 'Real Estate', href: '/guides/real-estate' },
                { label: 'Is It Safe?', href: '/guides/is-south-orange-safe' },
                { label: 'Things To Do', href: '/guides/things-to-do' },
              ].map((g) => (
                <a key={g.href} href={g.href} style={{ display: 'block', background: '#FFFFFF', border: `1px solid ${STONE}`, borderRadius: 8, padding: '16px 18px', textDecoration: 'none', color: DARK_GREEN, fontWeight: 600, fontSize: 14 }}>
                  {g.label} →
                </a>
              ))}
            </div>
          </section>

        </main>

        <footer style={{ background: DARK_GREEN, padding: '40px 24px', textAlign: 'center' }}>
          <a href="/" style={{ color: GOLD, fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 20, textDecoration: 'none', display: 'block', marginBottom: 20 }}>
            SouthOrange.com
          </a>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', marginBottom: 24 }}>
            {[
              { label: 'Things To Do', href: '/guides/things-to-do' },
              { label: 'Restaurants', href: '/guides/restaurants' },
              { label: 'Neighborhoods', href: '/guides/neighborhoods' },
              { label: 'Schools', href: '/guides/schools-south-orange' },
              { label: 'Commute to NYC', href: '/guides/commute-south-orange-nyc' },
              { label: 'Is It Safe?', href: '/guides/is-south-orange-safe' },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ color: '#A8CC78', fontSize: 14, textDecoration: 'none' }}>{link.label}</a>
            ))}
          </nav>
          <p style={{ color: '#6A8A50', fontSize: 13, margin: 0 }}>
            © {new Date().getFullYear()} SouthOrange.com · South Orange, NJ 07079
          </p>
        </footer>

      </div>
    </>
  );
}
