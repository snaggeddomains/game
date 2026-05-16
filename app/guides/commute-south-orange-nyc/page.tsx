import '../so-guide.css';

export const metadata = {
  title: 'Commuting from South Orange to NYC | NJ Transit Guide | SouthOrange.com',
  description:
    'Everything commuters need to know about taking NJ Transit from South Orange to NYC — times, costs, parking, South Orange Station details, and tips for Midtown Direct riders.',
  openGraph: {
    title: 'Commuting from South Orange to NYC — NJ Transit Guide',
    description:
      'NJ Transit Midtown Direct from South Orange Station to Penn Station in ~30 minutes. Schedules, parking, costs, and commuter tips.',
    url: 'https://southorange.com/guides/commute-south-orange-nyc',
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
      name: 'How long is the train from South Orange to NYC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'South Orange Station to New York Penn Station is approximately 30–35 minutes on the NJ Transit Morris & Essex Line (Midtown Direct). No transfer required — straight shot to Penn Station. This is one of the shortest commute times of any walkable suburban town in New Jersey.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is South Orange train station?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'South Orange Station is at 1 Valley St, South Orange, NJ 07079 — right in the heart of downtown. It is within a 2-minute walk of the main restaurant and coffee corridor, making it one of the most conveniently located commuter stations in NJ. There is no need to drive to this station for most South Orange residents.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the NJ Transit Midtown Direct?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Midtown Direct is NJ Transit's express service on the Morris & Essex Line that runs non-stop to Penn Station without requiring a transfer at Newark. South Orange is served by Midtown Direct — this is a major selling point for commuters, as you board in South Orange and step off at Penn Station in about 30 minutes.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a monthly NJ Transit pass from South Orange cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'South Orange is in Zone 4 on the NJ Transit pricing grid. Check njtransit.com for current monthly pass rates, which change periodically. Monthly passes are the standard choice for daily commuters. 10-trip tickets are also available for less frequent travelers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there parking at South Orange train station?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The township operates commuter parking lots near South Orange Station. Commuter parking permits are available through the municipality — but wait lists exist for the most convenient spots. Apply early. Daily parking is also available in the municipal lots.',
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

export default function CommutePage() {
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
          <div className="so-nav-links">
            <a href="/guides/moving-to" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Moving Here</a>
            <a href="/guides/neighborhoods" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Neighborhoods</a>
            <a href="/" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Home</a>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ background: DARK_GREEN, padding: '64px 24px 72px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚂</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
            Commuting from South Orange to NYC
          </h1>
          <p style={{ fontSize: 18, color: SAGE, maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            ~30 minutes to Penn Station. No transfer. Downtown station, walkable from home.
            This commute is why people move here.
          </p>
        </section>

        <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* Key fact callout */}
          <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderLeft: `4px solid ${GOLD}`, borderRadius: 8, padding: '20px 24px', marginBottom: 48 }}>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: TEXT, margin: 0 }}>
              <strong>South Orange is one of the best commuter towns in New Jersey.</strong> The NJ Transit Morris &amp; Essex Line
              (Midtown Direct) runs straight to Penn Station in roughly 30 minutes — no transfer at Newark, no PATH connection.
              South Orange Station is at 1 Valley St, two minutes from the main restaurant corridor. Most residents walk to the
              train. That combination — speed, walkability, and a real downtown to return to — is what drives demand here.
            </p>
          </div>

          {/* Station photo */}
          <div style={{ marginBottom: 40, borderRadius: 12, overflow: 'hidden', border: `1px solid ${STONE}` }}>
            <img src="/train_station.jpeg" alt="South Orange Train Station" style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
          </div>

          {/* ── South Orange Station ── */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: DARK_GREEN, margin: '0 0 20px' }}>
              South Orange Station
            </h2>
            <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ background: DARK_GREEN, padding: '20px 24px' }}>
                <div style={{ color: SAGE, fontSize: 14, marginBottom: 4 }}>Primary Station</div>
                <div style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700 }}>South Orange Station</div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 4 }}>
                  <a href="https://maps.google.com/?q=1+Valley+St+South+Orange+NJ+07079" target="_blank" rel="noopener noreferrer" style={{ color: SAGE, textDecoration: 'underline' }}>
                    1 Valley St, South Orange, NJ 07079
                  </a>
                  {' '}·{' '}
                  <a href="https://www.njtransit.com/schedules" target="_blank" rel="noopener noreferrer" style={{ color: SAGE, textDecoration: 'underline' }}>
                    NJ Transit Schedules
                  </a>
                </div>
              </div>
              <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
                {[
                  { label: 'To Penn Station', value: '~30–35 min', note: 'Midtown Direct, no transfer' },
                  { label: 'Service', value: 'Morris & Essex Line', note: 'Midtown Direct designation' },
                  { label: 'Peak frequency', value: 'Every 15–20 min', note: 'More trains during rush hours' },
                  { label: 'Off-peak', value: 'Every 30–60 min', note: 'Check njtransit.com' },
                  { label: 'Monthly pass zone', value: 'Zone 4', note: 'See njtransit.com for pricing' },
                  { label: 'Walk from downtown', value: '2 min', note: 'From S Orange Ave restaurants' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontSize: 12, color: MUTED, textTransform: 'uppercase' as const, letterSpacing: 0.8, marginBottom: 3 }}>{stat.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: DARK_GREEN, marginBottom: 2 }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: MUTED }}>{stat.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── What Makes This Commute Good ── */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: DARK_GREEN, margin: '0 0 20px' }}>
              Why This Commute Works
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                {
                  icon: '🎯',
                  title: 'Midtown Direct — No Transfer',
                  body: "South Orange is a Midtown Direct stop. You board in South Orange and step off at Penn Station — no switching at Newark, no PATH train, no connection. For commuters, this single fact is the difference between a manageable commute and a miserable one. It's why South Orange consistently outperforms similarly priced towns when buyers compare commutes.",
                },
                {
                  icon: '🚶',
                  title: 'You Can Walk to the Station',
                  body: "South Orange Station is embedded in the downtown at 1 Valley St. Most South Orange residents can walk to the platform — many in under 10 minutes. The walk home from the train passes restaurants, coffee shops, and grocery options. Coming home on a Friday night and grabbing dinner on the way is a real, daily thing here.",
                },
                {
                  icon: '⏰',
                  title: 'Consistent Schedule',
                  body: "NJ Transit's Morris & Essex Line runs a consistent schedule that experienced commuters learn by heart. Peak express trains hit Penn Station in under 30 minutes. Off-peak trains take 35–40 minutes with a local stop or two added. The line is one of the more reliable in the NJ Transit system.",
                },
                {
                  icon: '📱',
                  title: 'Mobile Ticketing',
                  body: "NJ Transit's app handles ticketing entirely — monthly passes, 10-trip tickets, single rides. No need to interact with a ticket machine. Monthly passes can be purchased in the app and loaded to your phone. Most regular commuters buy monthly.",
                },
                {
                  icon: '🅿️',
                  title: 'Parking',
                  body: 'The township operates commuter lots adjacent to South Orange Station. Permit parking is available through the municipality — apply early, as wait lists for the most convenient spots are common. Daily metered parking is available in the nearby municipal lots. For residents who walk to the station, this is a non-issue.',
                },
              ].map((item) => (
                <div key={item.title} style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderRadius: 10, padding: '22px 24px', display: 'flex', gap: 16 }}>
                  <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1.2 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: DARK_GREEN, marginBottom: 8 }}>{item.title}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.7, color: '#3a3a3a' }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Mountain Station ── */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: DARK_GREEN, margin: '0 0 8px' }}>
              Mountain Station
            </h2>
            <p style={{ color: MUTED, fontSize: 15, marginTop: 0, marginBottom: 20 }}>
              A secondary stop on the same line — less used but worth knowing.
            </p>
            <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderRadius: 12, padding: '24px' }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3a3a3a', margin: '0 0 16px' }}>
                Mountain Station is the next stop toward Newark on the Morris &amp; Essex Line. It sits just outside
                the downtown core, closer to the eastern neighborhoods of South Orange. Same Midtown Direct service,
                same line — just one stop closer to the city, which saves 2–3 minutes of travel time.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3a3a3a', margin: '0 0 16px' }}>
                Most South Orange residents use South Orange Station — it&rsquo;s more walkable, embedded in the
                downtown, and surrounded by post-commute amenities. Mountain Station is more useful for residents
                in the eastern parts of the village or for drivers who find its parking situation more convenient.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3a3a3a', margin: 0 }}>
                Both stations are served by the same trains. If your home is closer to Mountain Station, use it —
                but don&rsquo;t let the secondary station factor heavily into a neighborhood or home purchase decision.
                The South Orange Station experience is what defines commuting from this town.
              </p>
            </div>
          </section>

          {/* Cafe photo — what you come home to */}
          <div style={{ marginBottom: 48, borderRadius: 12, overflow: 'hidden', border: `1px solid ${STONE}` }}>
            <img src="/cafe.jpg" alt="South Orange cafe" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
            <div style={{ background: '#FFFFFF', padding: '12px 16px', fontSize: 13, color: MUTED, fontStyle: 'italic' }}>
              The commute ends here — coffee and a downtown worth walking home through.
            </div>
          </div>

          {/* ── Bus & Other Options ── */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: DARK_GREEN, margin: '0 0 20px' }}>
              Bus Routes & Other Options
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {[
                {
                  label: 'Bus #92',
                  detail: 'Connects South Orange to Irvington, Newark, and surrounding Essex County communities. Useful for local transit and non-NYC destinations. Less common for daily NYC commutes.',
                },
                {
                  label: 'Bus #107',
                  detail: 'Additional Essex County bus service. Check njtransit.com for current routes and schedules. More useful for local trips than for commuting into the city.',
                },
                {
                  label: 'Driving to NYC',
                  detail: 'Via I-78 E or US-22 to the Holland or Lincoln Tunnel. Off-peak: 30–50 minutes. During rush hour, this can easily exceed 60–90 minutes. Most South Orange commuters choose the train.',
                },
                {
                  label: 'Newark Airport',
                  detail: 'Newark Liberty International is approximately 15 minutes by car from South Orange — one of the genuine perks of Essex County location. Easier airport access than most NJ suburbs.',
                },
              ].map((item) => (
                <div key={item.label} style={{ background: '#FFFFFF', borderRadius: 10, padding: '18px 20px', border: `1px solid ${STONE}` }}>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: DARK_GREEN, marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.65 }}>{item.detail}</div>
                </div>
              ))}
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
                { label: 'Moving to South Orange', href: '/guides/moving-to' },
                { label: 'Neighborhoods', href: '/guides/neighborhoods' },
                { label: 'Real Estate', href: '/guides/real-estate' },
                { label: 'Schools Guide', href: '/guides/schools-south-orange' },
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
              { label: 'Moving Here', href: '/guides/moving-to' },
              { label: 'Things To Do', href: '/guides/things-to-do' },
              { label: 'Restaurants', href: '/guides/restaurants' },
              { label: 'Neighborhoods', href: '/guides/neighborhoods' },
              { label: 'Schools', href: '/guides/schools-south-orange' },
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
