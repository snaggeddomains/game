import '../so-guide.css';

export const metadata = {
  title: 'Is South Orange, NJ Safe? An Honest Guide for Families | SouthOrange.com',
  description:
    'A straightforward look at safety in South Orange, NJ — covering crime stats, the downtown at night, the train station area, proximity to Newark, and what life is really like for families.',
};

const faqItems = [
  {
    question: 'Is South Orange, NJ safe to live in?',
    answer:
      'Yes. South Orange is a safe suburban village with roughly 16,000 residents. Crime rates are typical for an NJ suburb of its size — property crimes like car break-ins occur, but violent crime is low. Thousands of families with children live here comfortably and walk the downtown regularly.',
  },
  {
    question: 'Is South Orange safe at night?',
    answer:
      'The downtown along South Orange Avenue is well-lit, active in the evenings, and generally safe to walk at night. Restaurants, bars, and SOPAC events keep foot traffic going on weekends. Standard urban-adjacent awareness applies — stay in lit areas and be mindful of your surroundings, as you would anywhere.',
  },
  {
    question: 'Is the South Orange train station area safe?',
    answer:
      'The NJ Transit train station area is a transit hub and sees a mix of commuters and foot traffic. It is functional and generally safe during commuting hours. Late at night it is quieter, and like any train station, some situational awareness is warranted. The township has its own police department with regular patrols.',
  },
  {
    question: 'Does being next to Newark make South Orange unsafe?',
    answer:
      'No. South Orange borders Newark but it is a separate, independently governed municipality with its own police force, zoning, and community identity. The two share a border, not crime statistics. South Orange\'s safety profile is consistent with comparable NJ suburbs like Maplewood and Millburn — not Newark.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const cards = [
  {
    icon: '🛡️',
    title: 'Overall Safety',
    body: 'South Orange is a safe place to live. It consistently falls in the "low to moderate" range for NJ suburban crime. The village has its own police department, active neighborhood watch programs, and a tightly knit community that tends to look out for itself. It is not crime-free — no place is — but serious violent incidents are rare.',
  },
  {
    icon: '🌆',
    title: 'Downtown at Night',
    body: 'South Orange Avenue and the surrounding blocks are among the most walkable and livable stretches in Essex County. Street lighting is good, restaurants stay open late, and SOPAC brings evening crowds year-round. Walking from dinner to the train or to a parked car at 10 p.m. is a routine, unremarkable experience for most residents.',
  },
  {
    icon: '🚉',
    title: 'Train Station Area',
    body: 'The NJ Transit station is busy and functional. During rush hours it is full of commuters heading to NYC. Late-night platforms are quieter. Most people report no issues, but like any transit hub it is worth being aware of your surroundings after midnight. The township police do patrol the area.',
  },
  {
    icon: '🗺️',
    title: 'Proximity to Newark',
    body: "South Orange and Newark share a municipal boundary, but that boundary matters. South Orange is its own incorporated village with independent governance, its own school district, its own police force, and a distinct community character. The fact that the towns are adjacent does not mean South Orange's safety profile mirrors Newark's. It doesn't.",
  },
  {
    icon: '👨‍👩‍👧',
    title: 'For Families',
    body: 'South Orange is firmly on the radar for families relocating from NYC and the surrounding suburbs — and for good reason. The South Orange–Maplewood School District (SOMSD) draws households who prioritize education. Kids play in Meadowland Park, walk to town for ice cream, and bike neighborhood streets. Family life here is genuinely comfortable.',
  },
  {
    icon: '📋',
    title: 'Crime Types',
    body: 'Property crime is the most common category — car break-ins, porch package theft, and occasional bike thefts, particularly near the train station. Violent crime is uncommon and typically not random. These patterns are consistent with Maplewood, Montclair, and other comparable Essex County towns. Taking standard precautions (lock your car, light your porch) goes a long way.',
  },
];

const relatedGuides = [
  { label: 'Moving to South Orange', href: '/guides/moving-to' },
  { label: 'South Orange Neighborhoods', href: '/guides/neighborhoods' },
  { label: 'South Orange Schools Guide', href: '/guides/schools-south-orange' },
  { label: 'Commuting to NYC from South Orange', href: '/guides/commute-south-orange-nyc' },
];

// ─── Styles ──────────────────────────────────────────────────────────────────

const BG = '#FAF8F3';
const DARK_GREEN = '#2D5016';
const GOLD = '#E8BE5A';
const SAGE = '#A8CC78';
const STONE = '#E5DDD0';
const TEXT = '#1A1A1A';
const MUTED = '#5A5A4A';

export default function IsSouthOrangeSafePage() {
  return (
    <>
      {/* JSON-LD FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: BG, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: TEXT }}>

        {/* ── Nav ── */}
        <nav style={{
          background: DARK_GREEN,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
        }}>
          <a href="/" style={{ color: GOLD, fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 18, textDecoration: 'none', letterSpacing: '-0.3px' }}>
            SouthOrange.com
          </a>
          <div className="so-nav-links">
            <a href="/guides" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Guides</a>
            <a href="/south-orange" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Home</a>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section style={{
          background: DARK_GREEN,
          padding: '64px 24px 72px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏡</div>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(28px, 5vw, 46px)',
            fontWeight: 700,
            color: '#FFFFFF',
            margin: '0 0 16px',
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
          }}>
            Is South Orange, NJ Safe?
          </h1>
          <p style={{
            fontSize: 18,
            color: SAGE,
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            An honest, practical guide for families and newcomers considering a move to South Orange.
          </p>
          <div style={{
            display: 'inline-block',
            marginTop: 24,
            background: GOLD,
            borderRadius: 4,
            padding: '6px 14px',
            fontSize: 13,
            fontWeight: 600,
            color: DARK_GREEN,
            letterSpacing: '0.3px',
          }}>
            South Orange, NJ
          </div>
        </section>

        {/* ── Main content ── */}
        <main style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 64px' }}>

          {/* Direct answer */}
          <section style={{ marginBottom: 48 }}>
            <p style={{
              fontSize: 18,
              lineHeight: 1.8,
              color: TEXT,
              background: '#FFFFFF',
              border: `1px solid ${STONE}`,
              borderLeft: `4px solid ${SAGE}`,
              borderRadius: 8,
              padding: '20px 24px',
              margin: 0,
            }}>
              <strong>South Orange is safe for families.</strong> It is an established suburban village with its own
              police department, strong schools, and an active community — not a neighborhood of Newark, but an
              independent municipality next to it. Crime here is typical for an NJ suburb: property crimes
              happen, violent crime is uncommon, and thousands of families with kids live here without issue.
              The downtown is walkable day and night, the schools attract households who care about community,
              and the anxiety people feel about proximity to Newark is usually bigger than the actual risk.
            </p>
            <p style={{ fontSize: 13, color: MUTED, marginTop: 12, marginBottom: 0 }}>
              Written by Rob Schutz · Last updated May 2026
            </p>
          </section>

          {/* Cards */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 26,
              fontWeight: 700,
              color: DARK_GREEN,
              marginBottom: 24,
              marginTop: 0,
            }}>
              What to Know About Safety in South Orange
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 20,
            }}>
              {cards.map((card) => (
                <article
                  key={card.title}
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${STONE}`,
                    borderRadius: 10,
                    padding: '24px 24px 20px',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
                  <h3 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 18,
                    fontWeight: 700,
                    color: DARK_GREEN,
                    margin: '0 0 10px',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: '#3A3A2A',
                    margin: 0,
                  }}>
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 26,
              fontWeight: 700,
              color: DARK_GREEN,
              marginBottom: 8,
              marginTop: 0,
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: MUTED, fontSize: 14, marginTop: 0, marginBottom: 28 }}>
              Common questions from people researching South Orange before a move.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${STONE}`,
                    borderRadius: 10,
                    padding: '22px 24px',
                  }}
                >
                  <h3 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 17,
                    fontWeight: 700,
                    color: DARK_GREEN,
                    margin: '0 0 10px',
                  }}>
                    {item.question}
                  </h3>
                  <p style={{
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: '#3A3A2A',
                    margin: 0,
                  }}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Guides */}
          <section>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 22,
              fontWeight: 700,
              color: DARK_GREEN,
              marginBottom: 16,
              marginTop: 0,
            }}>
              Related Guides
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 12,
            }}>
              {relatedGuides.map((guide) => (
                <a
                  key={guide.href}
                  href={guide.href}
                  style={{
                    display: 'block',
                    background: '#FFFFFF',
                    border: `1px solid ${STONE}`,
                    borderRadius: 8,
                    padding: '16px 18px',
                    textDecoration: 'none',
                    color: DARK_GREEN,
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: 1.4,
                    transition: 'border-color 0.15s',
                  }}
                >
                  {guide.label} →
                </a>
              ))}
            </div>
          </section>

        </main>

        {/* ── Footer nav ── */}
        <footer style={{
          background: DARK_GREEN,
          padding: '40px 24px',
          textAlign: 'center',
        }}>
          <a href="/" style={{ color: GOLD, fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 20, textDecoration: 'none', display: 'block', marginBottom: 20 }}>
            SouthOrange.com
          </a>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', marginBottom: 28 }}>
            {[
              { label: 'Guides', href: '/guides' },
              { label: 'Moving Here', href: '/guides/moving-to' },
              { label: 'Neighborhoods', href: '/guides/neighborhoods' },
              { label: 'Schools', href: '/guides/schools-south-orange' },
              { label: 'Commute to NYC', href: '/guides/commute-south-orange-nyc' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ color: '#A8CC78', fontSize: 14, textDecoration: 'none' }}
              >
                {link.label}
              </a>
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
