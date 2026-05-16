#!/usr/bin/env python3
import os

base = os.path.expanduser('~/southorange-site/app/guides')

def write_page(path, content):
    os.makedirs(path, exist_ok=True)
    with open(f'{path}/page.tsx', 'w') as f:
        f.write(content)
    print(f'Wrote {path}/page.tsx')

# ── THINGS TO DO ─────────────────────────────────────────────────────────────
things = '''export const metadata = {
  title: 'Things To Do in South Orange NJ | South Orange Guide',
  description: 'The complete guide to activities, parks, arts, recreation, and family fun in South Orange, NJ.',
}

const SECTIONS = [
  {
    emoji: '🌲',
    title: 'South Mountain Reservation',
    subtitle: '2,110 acres · Essex County\'s largest park',
    color: '#2D5016',
    items: [
      { name: 'Wildflower Sculpture Garden', desc: 'A hidden gem inside the reservation — a curated garden with rotating sculpture installations set among native plantings. The best-kept secret in South Orange for a slow afternoon walk.' },
      { name: 'Hemlock Falls', desc: 'A 25-foot waterfall accessible via a 1.5-mile trail from Crest Drive. One of the most scenic spots in Essex County and surprisingly few tourists find it.' },
      { name: 'Fairy Trail', desc: 'A beloved family trail through the woods where locals have installed tiny fairy doors and houses at the base of trees. Wonderful with young kids; evolves seasonally.' },
      { name: 'Dog Park', desc: 'Off-leash dog area within the reservation. One of the best in Essex County — fenced, well-maintained, with separate large and small dog sections.' },
      { name: 'Hiking & Trail Network', desc: '26+ miles of marked trails ranging from easy creek-side walks to more strenuous ridge climbs. Trailheads accessible directly from several South Orange neighborhoods.' },
    ],
  },
  {
    emoji: '🎭',
    title: 'SOPAC — South Orange Performing Arts Center',
    subtitle: '1 SOPAC Way · Year-round programming',
    color: '#5a2d82',
    items: [
      { name: 'Main Stage Performances', desc: 'SOPAC hosts nationally touring acts, classical concerts, comedy, and dance. Now in its 20th anniversary season — programming has gotten more ambitious every year.' },
      { name: 'Film Series', desc: 'Regular film programming including independent cinema, documentary screenings, and classic film nights in an intimate theater setting.' },
      { name: 'Education Programs', desc: 'Classes and workshops for all ages, from kids\' theater camps to adult music instruction. A true community arts hub, not just a venue.' },
      { name: 'Box Office Tips', desc: 'The 500-seat venue sells out quickly for popular acts. Sign up for the mailing list — presales often happen before public on-sale. Parking in the adjacent lot is free with a ticket.' },
    ],
  },
  {
    emoji: '🏊',
    title: 'Community Pool & Recreation',
    subtitle: 'Resident amenities worth knowing',
    color: '#1a5c8c',
    items: [
      { name: 'South Orange Community Pool', desc: 'Olympic-size pool open to South Orange residents (proof of residency required). Free for residents with ID — one of the best municipal amenities in the area. Opens Memorial Day, closes Labor Day.' },
      { name: 'Baird Community Center', desc: '5 Mead St. The township\'s main recreation hub — fitness equipment, gym space, classes, community programming. Hours: Mon–Thu 9am–9:30pm, Fri–Sat 9am–4:30pm.' },
      { name: 'Cameron Field', desc: 'Multi-sport athletic complex with baseball diamonds, soccer fields, and tennis courts. Youth leagues run through the township recreation department.' },
      { name: 'CAPAS Arts & Drama', desc: '128 Irvington Ave. Community arts and performance studio for ages 3+. After-school programs, summer camps, seasonal productions. Strong reputation in the township.' },
    ],
  },
  {
    emoji: '📚',
    title: 'South Orange Public Library',
    subtitle: 'Currently in interim locations',
    color: '#8B6914',
    items: [
      { name: 'Main Branch (Interim)', desc: '298 Walton Ave. The main library is in a temporary location while the permanent building undergoes renovation. Full services available.' },
      { name: 'Baird Branch', desc: 'Branch location inside the Baird Community Center at 5 Mead St — convenient for families using the rec facilities.' },
      { name: 'Programming', desc: 'The library runs strong programming year-round: author events, kids\' story time, teen programs, ESL classes, and a robust digital resource collection.' },
    ],
  },
  {
    emoji: '🌿',
    title: 'Seasonal Events & Community Life',
    subtitle: 'What actually happens in South Orange',
    color: '#4a7c28',
    items: [
      { name: 'Farmers Market', desc: 'Sloan St Parking Lot. Every Wednesday June–October, 1–6pm. Produce, flowers, artisan food, coffee. A genuine community gathering that draws the whole town.' },
      { name: 'Downtown After Sundown', desc: 'Summer Saturday evenings. Live music, street performers, extended restaurant hours, and a festival atmosphere along S Orange Ave. Peak South Orange.' },
      { name: "Flood's Hill Concerts", desc: 'Summer evening concert series at Meadowland Park. Families bring blankets and coolers; the hill fills up by 6pm. Free and genuinely excellent.' },
      { name: "Food Stroll", desc: 'Annual spring event (typically April) where downtown restaurants offer tastings and specials. Starts at Spiotta Park and winds through the restaurant corridor.' },
      { name: 'Spooky Spiotta', desc: 'October family Halloween event at Spiotta Park. The whole neighborhood turns out — costume contest, activities, candy. One of the most attended local events of the year.' },
      { name: 'Spiotta Park', desc: 'The downtown green — a small but beloved park used for events, pickup games, dog walks, and lunch breaks. Central to downtown life in a way a small park rarely is.' },
    ],
  },
  {
    emoji: '🛍',
    title: 'Downtown Shopping & Walkable Life',
    subtitle: 'South Orange Ave & Valley St corridor',
    color: '#3a3a5c',
    items: [
      { name: 'South Orange Ave Strip', desc: 'The main commercial corridor runs from the train station south along S Orange Ave. Restaurants, coffee shops, boutiques, and services within a 10-minute walk.' },
      { name: 'Valley St Corridor', desc: 'A secondary strip with Fox & Falcon, Papillon 25, and several neighborhood services. More local-feeling, slightly quieter than the main avenue.' },
      { name: 'Seton Hall University Campus', desc: 'Walk the campus — the Gothic-influenced architecture is worth a look. The Walsh Library is one of the better research libraries in NJ.' },
    ],
  },
]

export default function ThingsToDoGuide() {
  return (
    <div style={{ background: \'#FAF8F3\', minHeight: \'100vh\' }}>
      <div style={{ background: \'linear-gradient(135deg, #2D5016 0%, #1a3a0a 100%)\', padding: \'64px 24px 48px\', textAlign: \'center\' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎭</div>
        <h1 style={{ fontFamily: \'Georgia, serif\', fontSize: 42, color: \'#FAF8F3\', margin: \'0 0 12px\', fontWeight: 700 }}>
          Things To Do in South Orange, NJ
        </h1>
        <p style={{ color: \'#A8CC78\', fontSize: 18, margin: \'0 auto\', maxWidth: 640 }}>
          Parks, arts, recreation, seasonal events, and the amenities that make this one of NJ\'s most livable towns.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: \'48px auto\', padding: \'0 24px\' }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\' }}>
          South Orange is dense with things to do for a town its size. The combination of a world-class performing arts center, direct access to 2,110 acres of preserved forest, a genuine farmers market, a free Olympic-size pool for residents, and a walkable downtown gives it an activity profile that most suburban towns twice its size can\'t match.
        </p>
      </div>

      <div style={{ maxWidth: 1000, margin: \'0 auto\', padding: \'0 24px 80px\' }}>
        {SECTIONS.map(section => (
          <div key={section.title} style={{ marginBottom: 56, background: \'#fff\', borderRadius: 16, overflow: \'hidden\', border: \'1px solid #E5DDD0\', boxShadow: \'0 2px 12px rgba(0,0,0,0.06)\' }}>
            <div style={{ background: section.color, padding: \'24px 32px\' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{section.emoji}</div>
              <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 26, color: \'#FAF8F3\', margin: \'0 0 4px\', fontWeight: 700 }}>{section.title}</h2>
              <p style={{ color: \'rgba(255,255,255,0.75)\', fontSize: 14, margin: 0 }}>{section.subtitle}</p>
            </div>
            <div style={{ padding: \'24px 32px\' }}>
              {section.items.map(item => (
                <div key={item.name} style={{ borderBottom: \'1px solid #f0ebe3\', paddingBottom: 16, marginBottom: 16 }}>
                  <h3 style={{ fontFamily: \'Georgia, serif\', fontSize: 17, color: section.color, margin: \'0 0 6px\' }}>{item.name}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: \'#3a3a3a\', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: \'#2D5016\', padding: \'40px 24px\', textAlign: \'center\' }}>
        <div style={{ display: \'flex\', gap: 12, flexWrap: \'wrap\', justifyContent: \'center\' }}>
          {[
            { href: \'/guides/date-night-south-orange\', label: \'💑 Date Night\' },
            { href: \'/guides/moving-to\', label: \'📦 Moving Here\' },
            { href: \'/guides/restaurants\', label: \'🍽 Restaurants\' },
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

# ── DATE NIGHT ───────────────────────────────────────────────────────────────
datenight = '''export const metadata = {
  title: 'Date Night Guide South Orange NJ | South Orange Guide',
  description: 'The complete date night guide for South Orange, NJ — dinner, cocktails, SOPAC shows, and the best romantic evenings the town offers.',
}

const ITINERARIES = [
  {
    title: 'The Classic: SOPAC + Dinner',
    tag: 'Most Popular · Plan Ahead',
    color: '#5a2d82',
    steps: [
      { time: '6:00 PM', action: 'Drinks at Papillon 25', detail: '25 Valley St — arrive early, get a table, start with the seasonal cocktail or a proper martini. The vibe is exactly right for pre-show warmup.' },
      { time: '7:30 PM', action: 'Walk to SOPAC', detail: '1 SOPAC Way — 5 min on foot. Check the season lineup at sopacnow.org. The 500-seat venue has excellent sightlines from everywhere.' },
      { time: '10:00 PM', action: 'Late dinner at Felina or Bistro', detail: 'Both keep late reservations for show nights. Felina for the steakhouse moment; Bistro d\'Azur for French and candlelight.' },
    ],
    notes: 'Buy SOPAC tickets 2–3 weeks in advance for popular shows. The adjacent parking lot is free with a ticket.',
  },
  {
    title: 'The French Evening',
    tag: 'Most Romantic · Reservation Required',
    color: '#8B3a14',
    steps: [
      { time: '6:30 PM', action: 'Walk the Village', detail: 'Start at Spiotta Park, walk down S Orange Ave toward Academy St — the village has a walkable, old-town quality that\'s best appreciated slowly.' },
      { time: '7:30 PM', action: 'Dinner at Bistro d\'Azur', detail: '14 Academy St. Request the back room. Start with moules frites; the duck confit is the move for mains. Prix-fixe if available.' },
      { time: '10:00 PM', action: 'Nightcap at Papillon 25', detail: 'A 4-minute walk. Order something from the seasonal menu and close the evening properly.' },
    ],
    notes: 'Bistro reservations fill quickly on Fridays and Saturdays. Book 1–2 weeks out. Walk to the train after — no Uber needed.',
  },
  {
    title: 'The Summer Evening',
    tag: 'Seasonal · Best June–August',
    color: '#2D5016',
    steps: [
      { time: '5:30 PM', action: "Flood's Hill Concerts", detail: 'Meadowland Park. Bring a blanket and a bottle — the hill fills up but rarely feels crowded. Free, family-friendly, and genuinely great.' },
      { time: '7:30 PM', action: 'Dinner at Fox & Falcon', detail: '19 Valley St. After the concert, the gastropub is the natural move — lively, no reservation needed most evenings, good cocktails.' },
      { time: '9:30 PM', action: 'Gaslight Patio', detail: '15 S Orange Ave. The best outdoor drinking spot in town. Summer nights, a cold pint, and a town that actually knows how to do summer.' },
    ],
    notes: 'Check the Flood\'s Hill concert schedule at southorange.org. Concerts usually start around 6pm.',
  },
  {
    title: 'The Special Occasion',
    tag: 'Anniversary · Celebration',
    color: '#1a3a6c',
    steps: [
      { time: '7:00 PM', action: 'Felina Steak', detail: '101 S Orange Ave. Dry-aged cuts, good wine list, the kind of room that signals occasion. The bone-in ribeye is the call. Make a proper reservation — request a corner table.' },
      { time: '9:30 PM', action: 'Bar at Bistro d\'Azur', detail: 'A four-minute walk. The bar at Bistro has walk-in seating and a dessert menu worth a second evening.' },
      { time: '11:00 PM', action: 'Walk home', detail: 'If you live here, the walk home from downtown is the dessert. If you\'re visiting, the train runs late on weekends.' },
    ],
    notes: 'Felina takes reservations via their website. Call ahead for special occasions — they do small gestures well.',
  },
]

const QUICK_PICKS = [
  { label: 'Best romantic room', answer: "Bistro d'Azur back dining room" },
  { label: 'Best bar for a first date', answer: 'Papillon 25 — intimate, interesting, not too loud' },
  { label: 'Best summer date', answer: "Flood's Hill concert → Fox & Falcon" },
  { label: 'Best splurge', answer: 'Felina Steak, bone-in ribeye' },
  { label: 'Most walkable evening', answer: 'Village walk → Bistro → Papillon nightcap' },
  { label: 'Best for out-of-town dates', answer: 'SOPAC + dinner — it\'s genuinely impressive to visitors' },
]

export default function DateNightGuide() {
  return (
    <div style={{ background: \'#FAF8F3\', minHeight: \'100vh\' }}>
      <div style={{ background: \'linear-gradient(135deg, #1a0a2e 0%, #4a1a5c 100%)\', padding: \'64px 24px 48px\', textAlign: \'center\' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>💑</div>
        <h1 style={{ fontFamily: \'Georgia, serif\', fontSize: 42, color: \'#FAF8F3\', margin: \'0 0 12px\', fontWeight: 700 }}>
          Date Night Guide to South Orange, NJ
        </h1>
        <p style={{ color: \'#E8BE5A\', fontSize: 18, margin: \'0 auto\', maxWidth: 620 }}>
          Four curated evenings — from SOPAC shows and French bistros to summer concerts and proper steakhouses.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: \'48px auto\', padding: \'0 24px\' }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\' }}>
          South Orange is genuinely underrated as a date night destination — even for people who live here. The combination of a legitimate performing arts center, a French bistro, a steakhouse, a cocktail bar worth sitting at, and summer concert series all within walking distance of each other (and the train) is unusual for a NJ suburb.
        </p>
      </div>

      {/* Itineraries */}
      <div style={{ maxWidth: 900, margin: \'0 auto\', padding: \'0 24px 48px\' }}>
        {ITINERARIES.map(it => (
          <div key={it.title} style={{ background: \'#fff\', borderRadius: 16, marginBottom: 32, border: \'1px solid #E5DDD0\', overflow: \'hidden\', boxShadow: \'0 2px 12px rgba(0,0,0,0.06)\' }}>
            <div style={{ background: it.color, padding: \'20px 28px\' }}>
              <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 22, color: \'#FAF8F3\', margin: \'0 0 4px\' }}>{it.title}</h2>
              <div style={{ fontSize: 13, color: \'rgba(255,255,255,0.7)\', letterSpacing: 0.5 }}>{it.tag}</div>
            </div>
            <div style={{ padding: \'24px 28px\' }}>
              {it.steps.map((step, i) => (
                <div key={i} style={{ display: \'flex\', gap: 20, marginBottom: 20 }}>
                  <div style={{ minWidth: 70, color: it.color, fontWeight: 700, fontSize: 13, paddingTop: 2 }}>{step.time}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: \'#1a1a1a\', marginBottom: 4 }}>{step.action}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: \'#555\' }}>{step.detail}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: \'#FAF8F3\', borderLeft: \'3px solid #E8BE5A\', padding: \'10px 14px\', borderRadius: \'0 6px 6px 0\', fontSize: 13, color: \'#555\', marginTop: 8 }}>
                📝 {it.notes}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick picks */}
      <div style={{ maxWidth: 900, margin: \'0 auto\', padding: \'0 24px 80px\' }}>
        <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 28, color: \'#2D5016\', marginBottom: 24 }}>Quick Picks</h2>
        <div style={{ display: \'grid\', gridTemplateColumns: \'repeat(auto-fill, minmax(260px, 1fr))\', gap: 16 }}>
          {QUICK_PICKS.map(q => (
            <div key={q.label} style={{ background: \'#fff\', borderRadius: 10, padding: \'16px 20px\', border: \'1px solid #E5DDD0\' }}>
              <div style={{ fontSize: 12, color: \'#888\', textTransform: \'uppercase\', letterSpacing: 0.8, marginBottom: 6 }}>{q.label}</div>
              <div style={{ fontSize: 15, color: \'#1a1a1a\', fontWeight: 600 }}>{q.answer}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: \'#2D5016\', padding: \'40px 24px\', textAlign: \'center\' }}>
        <div style={{ display: \'flex\', gap: 12, flexWrap: \'wrap\', justifyContent: \'center\' }}>
          {[
            { href: \'/guides/restaurants\', label: \'🍽 Restaurants\' },
            { href: \'/guides/bars-south-orange\', label: \'🍸 Bars\' },
            { href: \'/guides/things-to-do\', label: \'🎭 Things To Do\' },
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

write_page(f'{base}/things-to-do', things)
write_page(f'{base}/date-night-south-orange', datenight)
