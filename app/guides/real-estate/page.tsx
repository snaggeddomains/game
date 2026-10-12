export const metadata = {
  title: 'South Orange NJ Real Estate | Homes, Prices & Market Guide',
  description:
    'South Orange, NJ real estate guide: median home prices, neighborhood breakdowns, what $700k vs $1M+ buys you, market trends, and honest advice from a local.',
  alternates: { canonical: '/guides/real-estate' },
  openGraph: {
    title: 'South Orange NJ Real Estate — Prices, Neighborhoods & Market Guide',
    description:
      'Median prices, neighborhood breakdowns, condo vs single-family tradeoffs, and what homes actually sell for in South Orange, NJ.',
    url: 'https://southorange.com/guides/real-estate',
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
      name: 'What is the median home price in South Orange, NJ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The median sale price for single-family homes in South Orange runs roughly $900,000–$1.1 million as of 2025–2026, though well-maintained homes in sought-after pockets regularly close above $1.2M. Entry-level condos and smaller colonials start closer to $550,000–$700,000. Prices have appreciated steadily since 2020 as NYC commuters prioritize direct NJ Transit access.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are property taxes like in South Orange?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'South Orange property taxes are among the higher in Essex County — a function of excellent schools and village services. A home assessed at $800,000 typically carries $18,000–$24,000/year depending on exemptions. Taxes are paid quarterly; visit southorange.org for the tax collector portal. The high tax rate is the single most common reason buyers choose neighboring towns instead.',
      },
    },
    {
      '@type': 'Question',
      name: 'What type of housing stock is available in South Orange?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'South Orange is mostly older single-family homes — Colonials, Tudors, Victorians, and Craftsman bungalows, most built between 1900 and 1960. The downtown core has a growing condo stock in converted buildings. Newstead, the neighborhood closest to the train station, has a mix of attached townhomes and smaller detached houses at lower price points. Large center-hall colonials predominate in the South Mountain and upper Ridgewood Road areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'How competitive is the South Orange real estate market?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Very competitive for desirable properties. Well-priced single-family homes in good condition routinely receive multiple offers and sell above asking within days of listing. Homes that need significant work or are priced aggressively sometimes sit. Spring (March–May) is peak season; inventory thins in summer and the fall market is active through October. Budget for a 10–20% over-ask contingency when making competitive offers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is South Orange a good real estate investment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'South Orange has strong long-term fundamentals: walkable downtown, Midtown Direct train (30–35 min to NYC Penn), excellent schools, and a tight housing supply. Home values have appreciated meaningfully since 2015. The main risk factors are high property taxes and the cost of maintaining older housing stock. For buyers planning a 7+ year horizon, it has historically been a solid investment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What neighborhoods should I consider in South Orange?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The main residential areas are: Downtown/Newstead (walkable to train, mix of condos and older homes, more affordable), South Mountain (quiet, wooded, larger lots, proximity to the Reservation), upper South Orange Ave and Ridgewood Road corridors (classic center-hall colonials, family-oriented), and the streets surrounding SOPAC and Spiotta Park (charming, very walkable). Each has a distinct character and price range.',
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

const pricePoints = [
  {
    range: 'Under $700k',
    label: 'Entry Level',
    what: 'Condos in converted downtown buildings, smaller attached homes in Newstead, fixer-uppers needing significant work.',
    tradeoff: 'Limited inventory. Condos come with HOA fees ($300–$600/mo) and shared-wall living. Single-family options at this price need work.',
  },
  {
    range: '$700k – $900k',
    label: 'Mid Market',
    what: '3-bedroom Colonials and Tudors, often on smaller lots. Some original finishes. Good bones, livable without major work.',
    tradeoff: 'Still competitive. Multiple offers common. Budget for updating kitchens and systems (roof, HVAC, windows) over time.',
  },
  {
    range: '$900k – $1.2M',
    label: 'Sweet Spot',
    what: 'Updated 4-bedroom homes, larger lots, renovated kitchens and baths. Move-in ready in desirable blocks.',
    tradeoff: 'Peak demand. Most competitive price band. Expect to move fast and likely go over ask.',
  },
  {
    range: '$1.2M+',
    label: 'Upper End',
    what: 'Center-hall Colonials and large Tudors with 5+ bedrooms, carriage houses, finished basements, and premium finishes throughout.',
    tradeoff: 'Longer days on market. Buyers have more leverage. Property taxes can exceed $28,000/year.',
  },
];

const neighborhoods = [
  {
    name: 'Downtown / Newstead',
    priceRange: '$550k – $850k',
    vibe: 'Most walkable area. Steps to NJ Transit, South Orange Ave restaurants, and the weekly farmers market.',
    stock: 'Condos, townhomes, older detached homes on smaller lots.',
    bestFor: 'Commuters, people who want to walk everywhere, buyers who want lower entry price.',
  },
  {
    name: 'South Mountain',
    priceRange: '$900k – $1.5M+',
    vibe: 'Quiet, wooded, backs up to South Mountain Reservation. Feels removed from the hustle.',
    stock: 'Larger single-family homes, bigger lots, more privacy. Many mid-century and Tudor styles.',
    bestFor: 'Families wanting space and nature access. Buyers who prioritize lot size over walkability.',
  },
  {
    name: 'Upper South Orange Ave Corridor',
    priceRange: '$800k – $1.2M',
    vibe: 'Classic suburban South Orange. Tree-lined streets, established neighborhood feel.',
    stock: 'Center-hall Colonials and Tudors from the 1920s–1950s. Well-maintained blocks.',
    bestFor: 'Families wanting the classic SO experience. Good balance of walkability and space.',
  },
  {
    name: 'Near SOPAC / Spiotta Park',
    priceRange: '$750k – $1.1M',
    vibe: 'Community feel. Walking distance to SOPAC, Spiotta Park, and the Village Green.',
    stock: 'Mix of Victorians, Craftsman bungalows, and smaller Colonials.',
    bestFor: 'Buyers who want charm and character. Arts-and-culture focused households.',
  },
];

export default function RealEstatePage() {
  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      {/* Hero */}
      <div
        style={{
          background: DARK_GREEN,
          borderBottom: `4px solid ${GOLD}`,
          padding: '48px 24px 40px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              background: GOLD,
              color: DARK_GREEN,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.08em',
              padding: '4px 12px',
              borderRadius: 20,
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            Real Estate Guide
          </div>
          <h1
            style={{
              color: '#FFFFFF',
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: 700,
              margin: '0 0 16px',
              lineHeight: 1.2,
            }}
          >
            South Orange, NJ Real Estate
          </h1>
          <p
            style={{
              color: SAGE,
              fontSize: 18,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Median prices, neighborhood breakdowns, what different budgets actually buy — and honest tradeoffs from someone who lives here.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        {/* Market Overview */}
        <section style={{ marginBottom: 52 }}>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 26,
              color: DARK_GREEN,
              borderBottom: `2px solid ${GOLD}`,
              paddingBottom: 8,
              marginBottom: 20,
            }}
          >
            The South Orange Real Estate Market
          </h2>
          <p style={{ color: TEXT, fontSize: 17, lineHeight: 1.75, marginBottom: 16 }}>
            South Orange sits at a specific intersection that drives its real estate market: a 30-minute Midtown Direct NJ Transit commute, a genuinely walkable downtown, strong public schools, and a limited housing supply. That combination has kept demand high and inventory tight.
          </p>
          <p style={{ color: TEXT, fontSize: 17, lineHeight: 1.75, marginBottom: 16 }}>
            The median sale price for single-family homes runs roughly <strong>$900,000–$1.1 million</strong> as of 2025–2026. Updated homes in the most desirable pockets — particularly the streets feeding into the South Orange Station area and the South Mountain corridor — routinely close at <strong>$1.2M–$1.5M</strong>. Entry-level options (smaller condos, attached homes, fixer-uppers) start closer to <strong>$550,000–$700,000</strong>.
          </p>
          <p style={{ color: TEXT, fontSize: 17, lineHeight: 1.75, marginBottom: 16 }}>
            The market is competitive. Well-priced, move-in-ready homes receive multiple offers within days. Homes that need significant work, or that are priced above what the market supports, can sit — but that's the exception. If you're budgeting, plan for <strong>10–20% over asking</strong> on anything desirable.
          </p>
          <p style={{ color: TEXT, fontSize: 17, lineHeight: 1.75 }}>
            The main headwind: <strong>property taxes</strong>. South Orange's effective tax rate is among the higher ones in Essex County. A home at $900k carries $20,000–$24,000/year in taxes. That's the trade for the school district and village services — but it meaningfully changes your monthly payment math.
          </p>
        </section>

        {/* Price Band Cards */}
        <section style={{ marginBottom: 52 }}>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 26,
              color: DARK_GREEN,
              borderBottom: `2px solid ${GOLD}`,
              paddingBottom: 8,
              marginBottom: 24,
            }}
          >
            What Different Budgets Actually Buy
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {pricePoints.map((p) => (
              <div
                key={p.range}
                style={{
                  background: '#FFFFFF',
                  border: `1px solid ${STONE}`,
                  borderRadius: 12,
                  padding: '20px 22px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: DARK_GREEN }}>{p.range}</div>
                  <div
                    style={{
                      background: SAGE,
                      color: DARK_GREEN,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 20,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.label}
                  </div>
                </div>
                <p style={{ color: TEXT, fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>
                  <strong>You get:</strong> {p.what}
                </p>
                <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>
                  <strong>Tradeoff:</strong> {p.tradeoff}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Neighborhoods */}
        <section style={{ marginBottom: 52 }}>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 26,
              color: DARK_GREEN,
              borderBottom: `2px solid ${GOLD}`,
              paddingBottom: 8,
              marginBottom: 20,
            }}
          >
            Neighborhoods to Know
          </h2>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
            South Orange doesn't have sharply defined neighborhoods with formal boundaries — but buyers tend to target a few distinct areas based on priorities.
          </p>
          <div style={{ border: `1px solid ${STONE}`, borderRadius: 12, overflow: 'hidden' }}>
            {neighborhoods.map((n, i) => (
              <div
                key={n.name}
                style={{
                  background: '#FFFFFF',
                  padding: '20px 24px',
                  borderBottom: i < neighborhoods.length - 1 ? `1px solid ${STONE}` : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: DARK_GREEN }}>{n.name}</div>
                  <div style={{ color: GOLD, fontWeight: 700, fontSize: 14, background: DARK_GREEN, padding: '2px 12px', borderRadius: 20 }}>{n.priceRange}</div>
                </div>
                <p style={{ color: TEXT, fontSize: 14, lineHeight: 1.6, margin: '0 0 6px' }}>{n.vibe}</p>
                <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.5, margin: '0 0 6px' }}>
                  <strong>Housing:</strong> {n.stock}
                </p>
                <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                  <strong>Best for:</strong> {n.bestFor}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Condo vs Single Family */}
        <section style={{ marginBottom: 52 }}>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 26,
              color: DARK_GREEN,
              borderBottom: `2px solid ${GOLD}`,
              paddingBottom: 8,
              marginBottom: 20,
            }}
          >
            Condo vs. Single-Family in South Orange
          </h2>
          <p style={{ color: TEXT, fontSize: 17, lineHeight: 1.75, marginBottom: 16 }}>
            South Orange is predominantly a single-family town, but the downtown core has a meaningful condo stock in converted older buildings and newer developments. Here's how they compare:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderRadius: 12, padding: '20px 22px' }}>
              <div style={{ color: DARK_GREEN, fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Condos</div>
              <ul style={{ margin: 0, padding: '0 0 0 18px', color: TEXT, fontSize: 14, lineHeight: 1.8 }}>
                <li>Entry price $550k–$750k</li>
                <li>HOA fees $300–$600/month</li>
                <li>Lower property taxes (shared assessment)</li>
                <li>Walking distance to train and downtown</li>
                <li>No yard, exterior maintenance, or snow to deal with</li>
                <li>Inventory is thin — moves fast when it hits</li>
              </ul>
            </div>
            <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderRadius: 12, padding: '20px 22px' }}>
              <div style={{ color: DARK_GREEN, fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Single-Family Homes</div>
              <ul style={{ margin: 0, padding: '0 0 0 18px', color: TEXT, fontSize: 14, lineHeight: 1.8 }}>
                <li>Entry price $650k (needs work) to $1.5M+</li>
                <li>No HOA fees, but full maintenance responsibility</li>
                <li>Higher property taxes ($16k–$28k+/year)</li>
                <li>Yard space, garage, basement common</li>
                <li>Older stock (1900–1960) means ongoing upkeep costs</li>
                <li>The dominant choice for families with kids</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Buying Tips */}
        <section style={{ marginBottom: 52 }}>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 26,
              color: DARK_GREEN,
              borderBottom: `2px solid ${GOLD}`,
              paddingBottom: 8,
              marginBottom: 20,
            }}
          >
            Tips for Buying in South Orange
          </h2>
          <div style={{ border: `1px solid ${STONE}`, borderRadius: 12, overflow: 'hidden' }}>
            {[
              { tip: 'Get pre-approved before you look', detail: 'South Orange moves fast. Sellers won\'t take you seriously without a pre-approval letter, and you need to be ready to make an offer within hours of a showing.' },
              { tip: 'Budget for the tax reality', detail: 'Run your monthly payment with actual tax numbers, not round estimates. At $900k with $22,000/year in taxes, that\'s $1,833/month in taxes alone — factor it in before falling in love with a house.' },
              { tip: 'Spring is peak season', detail: 'March through May is when inventory surges and competition peaks. If you\'re flexible, shopping in late summer or November can mean less competition — though less selection.' },
              { tip: 'Hire an inspector who knows older homes', detail: 'South Orange\'s housing stock was largely built pre-1960. Knob-and-tube wiring, old boilers, and aging sewer lines are common. An inspector experienced with older NJ homes will catch things a general inspector misses.' },
              { tip: 'Walk the commute before you commit', detail: 'South Orange Station is right downtown. Mountain Station is about a 10-minute walk from the village. If train proximity matters to your daily life, visit in person and walk it during rush hour.' },
            ].map((item, i, arr) => (
              <div
                key={item.tip}
                style={{
                  background: '#FFFFFF',
                  padding: '18px 24px',
                  borderBottom: i < arr.length - 1 ? `1px solid ${STONE}` : 'none',
                  display: 'flex',
                  gap: 14,
                }}
              >
                <div style={{ color: GOLD, fontSize: 20, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</div>
                <div>
                  <div style={{ color: DARK_GREEN, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.tip}</div>
                  <div style={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why People Choose SO */}
        <section style={{ marginBottom: 52 }}>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 26,
              color: DARK_GREEN,
              borderBottom: `2px solid ${GOLD}`,
              paddingBottom: 8,
              marginBottom: 20,
            }}
          >
            Why People Choose South Orange
          </h2>
          <p style={{ color: TEXT, fontSize: 17, lineHeight: 1.75, marginBottom: 16 }}>
            South Orange draws a specific buyer: someone coming out of NYC who wants a real town, not just a suburb. The combination of a <strong>30-minute Midtown Direct</strong> train, a <strong>walkable downtown</strong> with independent restaurants and a farmers market, <strong>Columbia High School</strong>, and actual community life is hard to replicate at this price point in NJ.
          </p>
          <p style={{ color: TEXT, fontSize: 17, lineHeight: 1.75, marginBottom: 16 }}>
            Compared to nearby Maplewood, South Orange tends to have slightly more relaxed pricing (though that gap has narrowed), a more compact town center, and direct access to South Mountain Reservation. Compared to Millburn or Summit, it's more affordable with a more urban feel and a more diverse community.
          </p>
          <p style={{ color: TEXT, fontSize: 17, lineHeight: 1.75 }}>
            The tradeoff is real: property taxes are high, the housing stock is old, and the market is competitive. But for buyers who do their homework and buy in the right spot, South Orange has held its value well and has strong long-term fundamentals.
          </p>
        </section>

        {/* Related guides */}
        <section
          style={{
            background: DARK_GREEN,
            borderRadius: 16,
            padding: '32px 28px',
            marginBottom: 8,
          }}
        >
          <div style={{ color: GOLD, fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
            Doing Your Research?
          </div>
          <p style={{ color: SAGE, fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
            Real estate is just one piece of the picture. These guides will help you evaluate the full picture before making a decision.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[
              { href: '/guides/moving-to', label: 'Moving to South Orange' },
              { href: '/guides/commute-south-orange-nyc', label: 'NYC Commute Guide' },
              { href: '/guides/south-orange-vs-maplewood', label: 'SO vs Maplewood' },
              { href: '/guides/is-south-orange-safe', label: 'Is South Orange Safe?' },
              { href: '/guides/south-orange-with-kids', label: 'South Orange with Kids' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
