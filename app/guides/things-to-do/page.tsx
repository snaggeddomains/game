import '../so-guide.css';

export const metadata = {
  title: 'Things To Do in South Orange, NJ | Complete Activity Guide | SouthOrange.com',
  description:
    'The complete guide to things to do in South Orange, NJ — parks, trails, SOPAC performances, the community pool, library, farmers market, and seasonal events.',
  openGraph: {
    title: 'Things To Do in South Orange, NJ',
    description:
      'Parks, arts, recreation, and seasonal events in South Orange. South Mountain Reservation, SOPAC, community pool, library, and more.',
    url: 'https://southorange.com/guides/things-to-do',
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
      name: 'What is there to do in South Orange, NJ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'South Orange offers an unusually rich set of activities for a small NJ suburb: 2,110 acres of preserved forest in South Mountain Reservation with 26+ miles of trails and a dog park, SOPAC (a 500-seat performing arts center), a free outdoor community pool for residents, the South Orange Public Library, a Wednesday farmers market, and a walkable downtown with restaurants, coffee shops, and boutiques.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is South Mountain Reservation worth visiting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — South Mountain Reservation is one of the best parks in Essex County. It covers 2,110 acres with 26+ miles of marked hiking trails, a fully fenced off-leash dog park with separate large and small dog areas, Hemlock Falls waterfall, and the Wildflower Sculpture Garden. Trailheads are accessible on foot from several South Orange neighborhoods.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is SOPAC in South Orange?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SOPAC (South Orange Performing Arts Center) is a 500-seat performing arts venue at 1 SOPAC Way in downtown South Orange. It hosts nationally touring musical acts, comedy, dance, film screenings, and children\'s programming. Parking is free in the adjacent lot with a ticket. Visit sopacnow.org for the current schedule.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a community pool in South Orange?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. South Orange has a free outdoor community pool for residents at the Underhill Sports Complex, located near Scotland Rd. Proof of residency required. It opens Memorial Day weekend and closes Labor Day. One of the best municipal amenities in Essex County.',
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

export default function ThingsToDoGuide() {
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
            <a href="/guides/restaurants" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Eat & Drink</a>
            <a href="/guides/moving-to" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Moving Here</a>
            <a href="/" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Home</a>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ background: DARK_GREEN, padding: '64px 24px 72px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏕️</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
            Things To Do in South Orange, NJ
          </h1>
          <p style={{ fontSize: 18, color: SAGE, maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            Parks, trails, arts, recreation, and seasonal events — what makes South Orange one of NJ&rsquo;s most livable towns.
          </p>
        </section>

        <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* Intro */}
          <p style={{ fontSize: 17, lineHeight: 1.85, color: TEXT, marginBottom: 32, marginTop: 0 }}>
            South Orange is unusually dense with things to do for a town of 16,000 people. A world-class performing
            arts center, 2,110 acres of preserved forest, a free Olympic-size pool for residents, a walkable downtown,
            and a genuine farmers market — all within a few minutes of the train station. Most residents barely scratch
            the surface of what&rsquo;s here.
          </p>

          {/* Photo strip */}
          <div className="so-photo-strip">
            <img src="/reservation.jpeg" alt="South Mountain Reservation" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            <img src="/sopac.jpg" alt="SOPAC South Orange Performing Arts Center" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            <img src="/floods_hill.jpeg" alt="Flood's Hill concerts South Orange" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
          </div>

          {/* ── South Mountain Reservation ── */}
          <section style={{ marginBottom: 56 }}>
            <div style={{ background: DARK_GREEN, borderRadius: '12px 12px 0 0', padding: '24px 28px' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🌲</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: '#FFFFFF', margin: '0 0 4px', fontWeight: 700 }}>
                South Mountain Reservation
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>
                2,110 acres · Essex County&rsquo;s largest park ·{' '}
                <a href="https://maps.google.com/?q=South+Mountain+Reservation+South+Orange+NJ" target="_blank" rel="noopener noreferrer" style={{ color: SAGE, textDecoration: 'underline' }}>
                  Get directions
                </a>
              </p>
            </div>
            <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '24px 28px' }}>
              {[
                {
                  name: 'Hemlock Falls',
                  desc: 'A 25-foot waterfall accessible via a 1.5-mile trail from Crest Drive. One of the most scenic spots in Essex County — and surprisingly uncrowded. Best in spring when water flow is high.',
                  link: 'https://maps.google.com/?q=Hemlock+Falls+South+Mountain+Reservation+NJ',
                },
                {
                  name: 'Wildflower Sculpture Garden',
                  desc: 'A curated garden inside the reservation with rotating sculpture installations set among native plantings. The best-kept secret in South Orange for a slow afternoon walk.',
                  link: 'https://maps.google.com/?q=Wildflower+Sculpture+Garden+South+Mountain+Reservation+NJ',
                },
                {
                  name: 'Fairy Trail',
                  desc: "A beloved family trail through the woods where locals have installed tiny fairy doors and houses at the base of trees. Evolves seasonally and is wonderful with young kids.",
                  link: 'https://maps.google.com/?q=South+Mountain+Reservation+Fairy+Trail+NJ',
                },
                {
                  name: 'Off-Leash Dog Park',
                  desc: 'Fully fenced off-leash area with separate sections for large and small dogs, water stations, and benches. One of the best dog parks in Essex County. Current vaccination records required.',
                  link: 'https://maps.google.com/?q=South+Mountain+Reservation+Dog+Park+NJ',
                },
                {
                  name: 'Hiking & Trail Network',
                  desc: '26+ miles of marked trails ranging from easy creekside walks to more strenuous ridge climbs. Several trailheads are accessible directly on foot from South Orange neighborhoods — no driving required.',
                  link: 'https://maps.google.com/?q=South+Mountain+Reservation+trailhead+South+Orange+NJ',
                },
              ].map((item) => (
                <div key={item.name} style={{ borderBottom: `1px solid #f0ebe3`, paddingBottom: 16, marginBottom: 16 }}>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: DARK_GREEN, margin: '0 0 6px' }}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: DARK_GREEN, textDecoration: 'none' }}>
                      {item.name} ↗
                    </a>
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3a3a3a', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SOPAC ── */}
          <section style={{ marginBottom: 56 }}>
            <div style={{ background: '#5a2d82', borderRadius: '12px 12px 0 0', padding: '24px 28px' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎭</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: '#FFFFFF', margin: '0 0 4px', fontWeight: 700 }}>
                SOPAC — South Orange Performing Arts Center
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>
                <a href="https://www.sopacnow.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#C8A8E8', textDecoration: 'underline' }}>sopacnow.org</a>
                {' '}· 1 SOPAC Way, South Orange, NJ 07079 ·{' '}
                <a href="https://maps.google.com/?q=1+SOPAC+Way+South+Orange+NJ+07079" target="_blank" rel="noopener noreferrer" style={{ color: '#C8A8E8', textDecoration: 'underline' }}>
                  Directions
                </a>
              </p>
            </div>
            <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '24px 28px' }}>
              {[
                {
                  name: 'Main Stage Performances',
                  desc: 'SOPAC hosts nationally touring acts, classical concerts, comedy, and dance. The 500-seat venue punches well above its size — programming has grown more ambitious every year.',
                },
                {
                  name: 'Film Series',
                  desc: 'Regular film programming including independent cinema, documentary screenings, and classic film nights in an intimate theater setting. A great alternative to a multiplex.',
                },
                {
                  name: 'Education Programs',
                  desc: "Classes and workshops for all ages — from kids' theater camps to adult music instruction. A true community arts hub, not just a venue.",
                },
                {
                  name: 'Ticketing Tips',
                  desc: 'Popular shows sell out fast. Sign up for the mailing list at sopacnow.org — presales happen before public on-sale. Parking in the adjacent lot is free with a ticket.',
                },
              ].map((item) => (
                <div key={item.name} style={{ borderBottom: `1px solid #f0ebe3`, paddingBottom: 16, marginBottom: 16 }}>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: '#5a2d82', margin: '0 0 6px' }}>{item.name}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3a3a3a', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Community Pool & Recreation ── */}
          <section style={{ marginBottom: 56 }}>
            <div style={{ background: '#1a5c8c', borderRadius: '12px 12px 0 0', padding: '24px 28px' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏊</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: '#FFFFFF', margin: '0 0 4px', fontWeight: 700 }}>
                Community Pool & Recreation
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>Resident amenities worth knowing about</p>
            </div>
            <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '24px 28px' }}>
              {[
                {
                  name: 'South Orange Community Pool',
                  desc: 'Outdoor pool open to South Orange residents (proof of residency required). Free for residents with ID — one of the best municipal amenities in Essex County. Opens Memorial Day, closes Labor Day.',
                  link: 'https://maps.google.com/?q=270+Scotland+Rd+South+Orange+NJ+07079',
                  linkLabel: '270 Scotland Rd — Directions',
                },
                {
                  name: 'Baird Community Center',
                  desc: '5 Mead St. The township\'s main recreation hub — fitness equipment, gym space, classes, and community programming. Hours: Mon–Thu 9am–9:30pm, Fri–Sat 9am–4:30pm.',
                  link: 'https://maps.google.com/?q=5+Mead+St+South+Orange+NJ+07079',
                  linkLabel: 'Directions',
                },
                {
                  name: 'Cameron Field',
                  desc: 'Multi-sport athletic complex with baseball diamonds, soccer fields, and tennis courts. Youth leagues run through the township recreation department.',
                  link: 'https://maps.google.com/?q=Cameron+Field+South+Orange+NJ',
                  linkLabel: 'Directions',
                },
                {
                  name: 'CAPAS Arts & Drama',
                  desc: '128 Irvington Ave. Community arts and performance studio for ages 3+. After-school programs, summer camps, and seasonal productions. Strong reputation in the township.',
                  link: 'https://maps.google.com/?q=128+Irvington+Ave+South+Orange+NJ+07079',
                  linkLabel: 'Directions',
                },
              ].map((item) => (
                <div key={item.name} style={{ borderBottom: `1px solid #f0ebe3`, paddingBottom: 16, marginBottom: 16 }}>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: '#1a5c8c', margin: '0 0 6px' }}>{item.name}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3a3a3a', margin: '0 0 6px' }}>{item.desc}</p>
                  {'link' in item && (
                    <a href={(item as { link: string; linkLabel: string }).link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#1a5c8c', textDecoration: 'underline' }}>
                      📍 {(item as { link: string; linkLabel: string }).linkLabel}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Library ── */}
          <section style={{ marginBottom: 56 }}>
            <div style={{ background: '#8B6914', borderRadius: '12px 12px 0 0', padding: '24px 28px' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📚</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: '#FFFFFF', margin: '0 0 4px', fontWeight: 700 }}>
                South Orange Public Library
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>
                <a href="https://www.southorangelibrary.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#F0D080', textDecoration: 'underline' }}>southorangelibrary.org</a>
                {' '}·{' '}
                <a href="https://maps.google.com/?q=65+Scotland+Rd+South+Orange+NJ+07079" target="_blank" rel="noopener noreferrer" style={{ color: '#F0D080', textDecoration: 'underline' }}>
                  65 Scotland Rd — Directions
                </a>
              </p>
            </div>
            <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '24px 28px' }}>
              {[
                {
                  name: 'Main Branch',
                  desc: '65 Scotland Rd, South Orange, NJ 07079. Full library services — books, digital resources, study rooms, and community meeting spaces.',
                },
                {
                  name: 'Baird Branch',
                  desc: 'Branch location inside the Baird Community Center at 5 Mead St — convenient for families using the rec facilities.',
                },
                {
                  name: 'Programming',
                  desc: "Author events, kids' story time, teen programs, ESL classes, and a robust digital resource collection. One of the better-programmed small-town libraries in Essex County.",
                },
              ].map((item) => (
                <div key={item.name} style={{ borderBottom: `1px solid #f0ebe3`, paddingBottom: 16, marginBottom: 16 }}>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: '#8B6914', margin: '0 0 6px' }}>{item.name}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3a3a3a', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bunny's photo */}
          <div style={{ marginBottom: 48, borderRadius: 12, overflow: 'hidden', border: `1px solid ${STONE}` }}>
            <img src="/bunnys.jpeg" alt="South Orange dining" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
          </div>

          {/* ── Seton Hall Campus ── */}
          <section style={{ marginBottom: 56 }}>
            <div style={{ background: '#003087', borderRadius: '12px 12px 0 0', padding: '24px 28px' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎓</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: '#FFFFFF', margin: '0 0 4px', fontWeight: 700 }}>
                Seton Hall University Campus
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>
                <a href="https://www.shu.edu/" target="_blank" rel="noopener noreferrer" style={{ color: '#A0B8E8', textDecoration: 'underline' }}>shu.edu</a>
                {' '}· 400 South Orange Ave ·{' '}
                <a href="https://maps.google.com/?q=400+South+Orange+Ave+South+Orange+NJ+07079" target="_blank" rel="noopener noreferrer" style={{ color: '#A0B8E8', textDecoration: 'underline' }}>
                  Directions
                </a>
              </p>
            </div>
            <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '24px 28px' }}>
              {[
                {
                  name: 'Campus Walk',
                  desc: 'The Gothic-influenced architecture is worth a look. The Walsh Library is one of the better research libraries in NJ and open to the public for on-site use.',
                },
                {
                  name: 'Seton Hall Arena Events',
                  desc: "Division I basketball games, concerts, and events at the Prudential Center in Newark draw from the SHU campus community. The campus adds college-town energy to South Orange's commercial district.",
                },
                {
                  name: 'University Adjacency',
                  desc: '10,000+ undergraduate and graduate students means a flow of foot traffic, restaurants catering to a younger crowd, and a livelier downtown evening scene than a comparably sized NJ suburb.',
                },
              ].map((item) => (
                <div key={item.name} style={{ borderBottom: `1px solid #f0ebe3`, paddingBottom: 16, marginBottom: 16 }}>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: '#003087', margin: '0 0 6px' }}>{item.name}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3a3a3a', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Seasonal Events ── */}
          <section style={{ marginBottom: 56 }}>
            <div style={{ background: '#4a7c28', borderRadius: '12px 12px 0 0', padding: '24px 28px' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🗓️</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: '#FFFFFF', margin: '0 0 4px', fontWeight: 700 }}>
                Seasonal Events & Community Life
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>What actually happens in South Orange year-round</p>
            </div>
            <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '24px 28px' }}>
              {[
                {
                  name: 'Wednesday Farmers Market',
                  desc: 'Sloan St Parking Lot. Every Wednesday June–October, 1–6pm. Produce, flowers, artisan food, coffee. A genuine community gathering that draws the whole town.',
                  link: 'https://maps.google.com/?q=Sloan+St+Parking+Lot+South+Orange+NJ+07079',
                },
                {
                  name: "Flood's Hill Concerts",
                  desc: 'Summer evening concert series at Meadowland Park. Families bring blankets and coolers; the hill fills up by 6pm. Free and genuinely excellent.',
                  link: 'https://maps.google.com/?q=Meadowland+Park+South+Orange+NJ',
                },
                {
                  name: 'Downtown After Sundown',
                  desc: 'Summer Saturday evenings — live music, street performers, extended restaurant hours, and a festival atmosphere along S Orange Ave. Peak South Orange.',
                  link: null,
                },
                {
                  name: 'Food Stroll',
                  desc: 'Annual spring event (typically April) where downtown restaurants offer tastings and specials. Starts at Spiotta Park and winds through the restaurant corridor.',
                  link: 'https://maps.google.com/?q=Spiotta+Park+South+Orange+NJ+07079',
                },
                {
                  name: 'Spooky Spiotta',
                  desc: 'October family Halloween event at Spiotta Park. Costume contest, activities, candy — one of the most attended local events of the year.',
                  link: 'https://maps.google.com/?q=Spiotta+Park+South+Orange+NJ+07079',
                },
                {
                  name: 'Spiotta Park',
                  desc: 'The downtown green — a small but beloved park used for events, pickup games, dog walks, and lunch breaks. Central to downtown life in a way small parks rarely are.',
                  link: 'https://maps.google.com/?q=Spiotta+Park+South+Orange+NJ+07079',
                },
              ].map((item) => (
                <div key={item.name} style={{ borderBottom: `1px solid #f0ebe3`, paddingBottom: 16, marginBottom: 16 }}>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: '#4a7c28', margin: '0 0 6px' }}>{item.name}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3a3a3a', margin: '0 0 6px' }}>{item.desc}</p>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#4a7c28', textDecoration: 'underline' }}>
                      📍 Directions
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Alley/downtown photo */}
          <div style={{ marginBottom: 48, borderRadius: 12, overflow: 'hidden', border: `1px solid ${STONE}` }}>
            <img src="/so_alley.jpeg" alt="South Orange downtown alley" style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
          </div>

          {/* ── Downtown ── */}
          <section style={{ marginBottom: 56 }}>
            <div style={{ background: '#3a3a5c', borderRadius: '12px 12px 0 0', padding: '24px 28px' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏘️</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: '#FFFFFF', margin: '0 0 4px', fontWeight: 700 }}>
                Downtown & Walkable Life
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>
                South Orange Ave & Valley St corridor ·{' '}
                <a href="https://maps.google.com/?q=South+Orange+Ave+South+Orange+NJ+07079" target="_blank" rel="noopener noreferrer" style={{ color: '#C0C8E8', textDecoration: 'underline' }}>
                  Directions
                </a>
              </p>
            </div>
            <div style={{ background: '#FFFFFF', border: `1px solid ${STONE}`, borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '24px 28px' }}>
              {[
                {
                  name: 'South Orange Ave Strip',
                  desc: 'The main commercial corridor runs from the train station south along S Orange Ave. Restaurants, coffee shops, boutiques, and services within a 10-minute walk.',
                },
                {
                  name: 'Valley St Corridor',
                  desc: 'A secondary strip with Papillon 25, neighborhood services, and local businesses. More residential-feeling, slightly quieter than the main avenue.',
                },
                {
                  name: 'Walkability',
                  desc: "South Orange scores high on walkability for a New Jersey suburb. Train, grocery, dining, coffee, and parks are all reachable on foot from most neighborhoods — this is genuinely unusual for Essex County.",
                },
              ].map((item) => (
                <div key={item.name} style={{ borderBottom: `1px solid #f0ebe3`, paddingBottom: 16, marginBottom: 16 }}>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: '#3a3a5c', margin: '0 0 6px' }}>{item.name}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3a3a3a', margin: 0 }}>{item.desc}</p>
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
                { label: 'Restaurants', href: '/guides/restaurants' },
                { label: 'Dog-Friendly Guide', href: '/guides/dog-friendly-south-orange' },
                { label: 'South Orange with Kids', href: '/guides/south-orange-with-kids' },
                { label: 'Commute to NYC', href: '/guides/commute-south-orange-nyc' },
                { label: 'Neighborhoods', href: '/guides/neighborhoods' },
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
              { label: 'Restaurants', href: '/guides/restaurants' },
              { label: 'Moving Here', href: '/guides/moving-to' },
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
