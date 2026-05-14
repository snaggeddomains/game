#!/usr/bin/env python3
import os, json

base = os.path.expanduser('~/southorange-site/app/guides')

def write_page(path, content):
    os.makedirs(path, exist_ok=True)
    with open(f'{path}/page.tsx', 'w') as f:
        f.write(content)
    print(f'Wrote {path}/page.tsx')

# ── COFFEE ──────────────────────────────────────────────────────────────────
coffee = '''export const metadata = {
  title: 'Best Coffee in South Orange NJ | South Orange Guide',
  description: 'Where to find great coffee in South Orange, NJ — local cafes, specialty espresso, and work-from-home spots.',
}

const SPOTS = [
  {
    name: 'Elitist Coffee',
    tag: 'Specialty · Third-Wave',
    addr: 'S Orange Ave',
    hours: 'Daily 7am–5pm',
    desc: 'The most serious coffee operation in South Orange. Single-origin pour-overs, dialed-in espresso, and a staff that actually knows what they\'re talking about. Small space, zero pretension despite the name.',
    tip: 'The seasonal pour-over changes monthly — always worth asking what\'s on.',
    best: 'Best for: coffee purists',
  },
  {
    name: 'The Order',
    tag: 'Cafe · Full Menu',
    addr: '50 W South Orange Ave',
    hours: 'Daily 8am–3pm',
    desc: 'The most social coffee spot in town. Strong lattes, good pastries, and the community energy that makes weekend mornings feel like an event. Lines on Saturdays are real but move fast.',
    tip: 'The oat milk latte is consistently well-made. Get a table near the window.',
    best: 'Best for: people-watching, first dates',
  },
  {
    name: 'Orange House Cafe',
    tag: 'Neighborhood Cafe',
    addr: 'Valley St',
    hours: 'Daily 7am–4pm',
    desc: 'Quieter alternative to The Order. Good drip coffee, reliable espresso drinks, and enough wifi-friendly tables to make it a viable remote work spot. Popular with the Valley St residential crowd.',
    tip: 'BYOB at the cafe on weekend afternoons — bring a bottle and they\'ll provide glasses.',
    best: 'Best for: remote work, quiet mornings',
  },
  {
    name: 'Three Daughters Bakery',
    tag: 'Bakery · Coffee',
    addr: 'S Orange Ave',
    hours: 'Wed–Sun 7am–2pm',
    desc: 'The pastry situation here makes the coffee taste better. Excellent croissants, seasonal tarts, and a rotating cake selection. Coffee is solid; the baked goods are the main event.',
    tip: 'Arrive early — the croissants and morning buns sell out before 10am on weekends.',
    best: 'Best for: treats, special breakfast',
  },
  {
    name: 'Inkosi Cafe',
    tag: 'Cafe · Light Bites',
    addr: 'S Orange Ave',
    hours: 'Mon–Sat 7am–4pm',
    desc: 'A neighborhood staple with a loyal regular base. Good drip coffee, friendly service, and a calm atmosphere that\'s been consistent for years. Underrated.',
    tip: 'The egg sandwich is better than it looks on the menu.',
    best: 'Best for: quick stop, low-key morning',
  },
  {
    name: "Sonny's Bagels",
    tag: 'Bagels · Coffee',
    addr: 'S Orange Ave',
    hours: 'Daily 6am–2pm',
    desc: 'Not a coffee destination per se — but you\'re getting coffee with your bagel anyway. Drip is solid; the combination of a proper NJ bagel and a cup of coffee is a reliable morning.',
    tip: 'Order ahead on the app on Sundays — the line can be long.',
    best: 'Best for: combining coffee with the best breakfast in town',
  },
]

export default function CoffeeGuide() {
  return (
    <div style={{ background: \'#FAF8F3\', minHeight: \'100vh\' }}>
      <div style={{ background: \'linear-gradient(135deg, #4a2c0a 0%, #8B6914 100%)\', padding: \'64px 24px 48px\', textAlign: \'center\' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>☕</div>
        <h1 style={{ fontFamily: \'Georgia, serif\', fontSize: 42, color: \'#FAF8F3\', margin: \'0 0 12px\', fontWeight: 700 }}>
          Best Coffee in South Orange, NJ
        </h1>
        <p style={{ color: \'#E8BE5A\', fontSize: 18, margin: \'0 auto\', maxWidth: 600 }}>
          Local cafes, specialty espresso, and spots worth building your morning around.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: \'48px auto\', padding: \'0 24px\' }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\' }}>
          South Orange has a genuine cafe culture. The concentration of commuters, Seton Hall students, and work-from-home residents means most of these spots do real volume — but the quality is there. Elitist Coffee is the answer if you care about the bean; The Order is the answer if you care about the scene.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: \'0 auto\', padding: \'0 24px 80px\', display: \'grid\', gridTemplateColumns: \'repeat(auto-fill, minmax(320px, 1fr))\', gap: 24 }}>
        {SPOTS.map(s => (
          <div key={s.name} style={{ background: \'#fff\', borderRadius: 12, padding: 28, border: \'1px solid #E5DDD0\', boxShadow: \'0 2px 8px rgba(0,0,0,0.05)\' }}>
            <h3 style={{ fontFamily: \'Georgia, serif\', fontSize: 20, color: \'#1a1a1a\', margin: \'0 0 4px\' }}>{s.name}</h3>
            <div style={{ fontSize: 12, color: \'#8B6914\', fontWeight: 600, letterSpacing: 0.8, textTransform: \'uppercase\', marginBottom: 8 }}>{s.tag}</div>
            <div style={{ fontSize: 13, color: \'#666\', marginBottom: 12 }}>📍 {s.addr} · 🕐 {s.hours}</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: \'#3a3a3a\', margin: \'0 0 12px\' }}>{s.desc}</p>
            <div style={{ background: \'#FAF8F3\', borderLeft: \'3px solid #E8BE5A\', padding: \'8px 12px\', borderRadius: \'0 6px 6px 0\', fontSize: 13, color: \'#555\', fontStyle: \'italic\', marginBottom: 10 }}>
              💡 {s.tip}
            </div>
            <div style={{ fontSize: 12, color: \'#2D5016\', fontWeight: 600 }}>{s.best}</div>
          </div>
        ))}
      </div>

      <div style={{ background: \'#2D5016\', padding: \'40px 24px\', textAlign: \'center\' }}>
        <div style={{ display: \'flex\', gap: 12, flexWrap: \'wrap\', justifyContent: \'center\' }}>
          {[
            { href: \'/guides/brunch-south-orange\', label: \'🥂 Brunch Guide\' },
            { href: \'/guides/restaurants\', label: \'🍽 All Restaurants\' },
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

# ── BARS ─────────────────────────────────────────────────────────────────────
bars = '''export const metadata = {
  title: 'Best Bars & Nightlife in South Orange NJ | South Orange Guide',
  description: 'Where to drink in South Orange, NJ — craft cocktails, local breweries, wine bars, and neighborhood dives.',
}

const BARS = [
  {
    name: 'Papillon 25',
    tag: 'Cocktail Bar · Martini Bar',
    addr: '25 Valley St',
    hours: 'Wed–Sun 5pm–close',
    vibe: 'Intimate & Sophisticated',
    desc: 'South Orange\'s best cocktail bar, full stop. Seasonal menus that actually rotate, skilled bartenders who make proper drinks, and a martini program that earns the loyalty. Small room — arrive early on Fridays or accept that you\'ll wait.',
    tip: 'The dry martini is the benchmark move. The seasonal cocktail is worth the risk.',
  },
  {
    name: 'Fox & Falcon',
    tag: 'Gastropub · Full Bar',
    addr: '19 Valley St',
    hours: 'Daily 11am–close',
    vibe: 'Lively & Social',
    desc: 'The most reliably fun bar in town. Wide draft selection, strong cocktails, good bar food, and the kind of crowd that mixes commuters, young professionals, and Seton Hall faculty. The bar area gets energetic without being chaotic.',
    tip: 'Happy hour weekdays 4–6pm is genuinely good value.',
  },
  {
    name: "Gaslight Brewery & Restaurant",
    tag: 'Craft Brewery · Pub',
    addr: '15 S Orange Ave',
    hours: 'Daily 11am–close',
    vibe: 'Casual & Outdoorsy',
    desc: 'One of the oldest craft breweries in NJ, right in downtown South Orange. House-brewed lagers, IPAs, and seasonals on tap, plus a full pub menu. The outdoor patio is the best outdoor drinking spot in town all summer.',
    tip: 'The patio fills up fast on summer Fridays. Go early or weeknight.',
  },
  {
    name: "Bunny's Bar",
    tag: 'Dive Bar · Neighborhood',
    addr: 'S Orange Ave',
    hours: 'Daily 3pm–close',
    vibe: 'No-Frills & Unpretentious',
    desc: 'Cash bar, cold beer, great jukebox, no attitude. The kind of place that\'s been the same for decades and the regulars like it that way. Essential to the ecosystem.',
    tip: 'Cash preferred. Don\'t wear anything you\'d miss.',
  },
  {
    name: "Bistro d'Azur Bar",
    tag: 'Wine Bar · French',
    addr: '14 Academy St',
    hours: 'Tue–Sun from 5pm',
    vibe: 'Romantic & Quiet',
    desc: 'Sitting at the Bistro bar with a glass of Burgundy and the charcuterie board is one of the better evenings South Orange offers. It\'s a proper bar program attached to a proper French kitchen.',
    tip: 'The bar has walk-in seating even when the dining room is full.',
  },
  {
    name: 'Felina Bar',
    tag: 'Steakhouse Bar · Upscale',
    addr: '101 S Orange Ave',
    hours: 'Wed–Sun from 5pm',
    vibe: 'Polished & Buzzy',
    desc: 'The bar at Felina has its own energy — good for pre-dinner cocktails or a late-night old fashioned after a SOPAC show. Strong spirits program, elevated apps at the bar.',
    tip: 'Post-SOPAC (the theater is 5 min away) the bar gets a cultured late crowd.',
  },
]

export default function BarsGuide() {
  return (
    <div style={{ background: \'#FAF8F3\', minHeight: \'100vh\' }}>
      <div style={{ background: \'linear-gradient(135deg, #1a0a2e 0%, #3d1a5c 100%)\', padding: \'64px 24px 48px\', textAlign: \'center\' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🍸</div>
        <h1 style={{ fontFamily: \'Georgia, serif\', fontSize: 42, color: \'#FAF8F3\', margin: \'0 0 12px\', fontWeight: 700 }}>
          Bars & Nightlife in South Orange, NJ
        </h1>
        <p style={{ color: \'#E8BE5A\', fontSize: 18, margin: \'0 auto\', maxWidth: 600 }}>
          Craft cocktails, house-brewed beer, wine bars, and the right neighborhood dive — all walkable.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: \'48px auto\', padding: \'0 24px\' }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\' }}>
          South Orange has more bar options than its size suggests — and crucially, they cover different vibes. Papillon for serious cocktails, Gaslight for craft beer and summer patios, Fox & Falcon for a social gastropub night, Bunny\'s when you want none of the above. The Valley St and South Orange Ave corridors keep everything walkable.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: \'0 auto\', padding: \'0 24px 80px\', display: \'grid\', gridTemplateColumns: \'repeat(auto-fill, minmax(320px, 1fr))\', gap: 24 }}>
        {BARS.map(b => (
          <div key={b.name} style={{ background: \'#fff\', borderRadius: 12, padding: 28, border: \'1px solid #E5DDD0\', boxShadow: \'0 2px 8px rgba(0,0,0,0.05)\' }}>
            <h3 style={{ fontFamily: \'Georgia, serif\', fontSize: 20, color: \'#1a1a1a\', margin: \'0 0 4px\' }}>{b.name}</h3>
            <div style={{ fontSize: 12, color: \'#3d1a5c\', fontWeight: 600, letterSpacing: 0.8, textTransform: \'uppercase\', marginBottom: 8 }}>{b.tag}</div>
            <div style={{ fontSize: 13, color: \'#666\', marginBottom: 4 }}>📍 {b.addr} · 🕐 {b.hours}</div>
            <div style={{ fontSize: 13, color: \'#2D5016\', fontWeight: 600, marginBottom: 12 }}>Vibe: {b.vibe}</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: \'#3a3a3a\', margin: \'0 0 14px\' }}>{b.desc}</p>
            <div style={{ background: \'#FAF8F3\', borderLeft: \'3px solid #E8BE5A\', padding: \'8px 12px\', borderRadius: \'0 6px 6px 0\', fontSize: 13, color: \'#555\', fontStyle: \'italic\' }}>
              💡 {b.tip}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: \'#2D5016\', padding: \'40px 24px\', textAlign: \'center\' }}>
        <div style={{ display: \'flex\', gap: 12, flexWrap: \'wrap\', justifyContent: \'center\' }}>
          {[
            { href: \'/guides/date-night-south-orange\', label: \'💑 Date Night\' },
            { href: \'/guides/restaurants\', label: \'🍽 Restaurants\' },
            { href: \'/guides/coffee-south-orange\', label: \'☕ Coffee\' },
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

# ── BRUNCH ───────────────────────────────────────────────────────────────────
brunch = '''export const metadata = {
  title: 'Best Brunch in South Orange NJ | South Orange Guide',
  description: 'Where to brunch in South Orange, NJ — the best weekend spots for eggs, pastries, cocktails, and slow mornings.',
}

const SPOTS = [
  {
    name: 'The Order',
    tag: 'Casual Brunch · Most Popular',
    addr: '50 W South Orange Ave',
    hours: 'Sat–Sun 8am–3pm',
    desc: 'The town\'s undisputed brunch anchor. Weekend mornings here have an energy — the kind of place where you run into everyone you know. Avocado toast, egg sandwiches, strong lattes, good pastries. Lines move reasonably fast.',
    tip: 'Arrive before 10am to avoid the main rush. The outdoor seating fills first.',
    rating: '★★★★★',
  },
  {
    name: "Bistro d'Azur",
    tag: 'Sunday Brunch · French Elegant',
    addr: '14 Academy St',
    hours: 'Sunday brunch only',
    desc: 'South Orange\'s most proper brunch — French classics done with care. Crêpes, omelettes, croque madame, and a Bloody Mary that earns its price. Not for rushing; bring someone you want to linger with.',
    tip: 'Make a reservation. The Sunday brunch fills faster than the dinner service.',
    rating: '★★★★★',
  },
  {
    name: 'Fox & Falcon',
    tag: 'Weekend Brunch · Gastropub',
    addr: '19 Valley St',
    hours: 'Sat–Sun from 11am',
    desc: 'Full brunch menu with cocktails. Slightly more substantial than The Order — good if you want eggs Benedict and a Bloody Mary rather than coffee and a pastry. The bar is open from the start.',
    tip: 'The bottomless mimosa brunch is available — ask when you\'re seated.',
    rating: '★★★★',
  },
  {
    name: 'Orange House Cafe',
    tag: 'Low-Key Brunch · BYOB',
    addr: 'Valley St',
    hours: 'Sat–Sun 8am–3pm',
    desc: 'A quieter, more local-feeling brunch. BYOB welcome on weekends, which makes it a genuinely good value. Solid egg dishes, baked goods, and a relaxed pace. No rush here.',
    tip: 'Bring a bottle of sparkling wine and ask for OJ — DIY mimosas at cafe prices.',
    rating: '★★★★',
  },
  {
    name: 'Jackie & Sons',
    tag: 'Diner Brunch · Classic NJ',
    addr: 'S Orange Ave',
    hours: 'Daily 7am–3pm',
    desc: 'When you want breakfast that doesn\'t try too hard. Enormous portions, proper pork roll, pancakes the size of dinner plates. The anti-trend brunch, and sometimes that\'s exactly right.',
    tip: 'The pork roll, egg & cheese on a kaiser roll is a New Jersey birthright.',
    rating: '★★★★',
  },
  {
    name: 'Three Daughters Bakery',
    tag: 'Bakery Brunch · Pastry-Forward',
    addr: 'S Orange Ave',
    hours: 'Wed–Sun 7am–2pm',
    desc: 'Less a brunch spot than a reason to make brunch a two-stop situation. Pick up croissants and pastries here, then grab coffee elsewhere. The morning bun and the seasonal tarts are exceptional.',
    tip: 'Wednesday–Friday are the secret slots — weekends mean competition for the best pastries.',
    rating: '★★★★★',
  },
  {
    name: 'Playa Bowls',
    tag: 'Health Brunch · Acai',
    addr: 'S Orange Ave',
    hours: 'Daily 8am–8pm',
    desc: 'For the post-South Mountain hike brunch crowd. Acai bowls, pitaya, coconut bases — actually filling and properly made. The "Rio" bowl has become something of a weekend ritual.',
    tip: 'Add the bee pollen and extra granola. Worth the upcharge.',
    rating: '★★★',
  },
]

export default function BrunchGuide() {
  return (
    <div style={{ background: \'#FAF8F3\', minHeight: \'100vh\' }}>
      <div style={{ background: \'linear-gradient(135deg, #8B3a14 0%, #c45e2a 100%)\', padding: \'64px 24px 48px\', textAlign: \'center\' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🥂</div>
        <h1 style={{ fontFamily: \'Georgia, serif\', fontSize: 42, color: \'#FAF8F3\', margin: \'0 0 12px\', fontWeight: 700 }}>
          Best Brunch in South Orange, NJ
        </h1>
        <p style={{ color: \'#FAD080\', fontSize: 18, margin: \'0 auto\', maxWidth: 600 }}>
          Weekend spots worth building your Saturday around — from French bistro to classic NJ diner.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: \'48px auto\', padding: \'0 24px\' }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\' }}>
          South Orange has a legitimate brunch scene for a town its size. The Order is the social hub; Bistro d\'Azur is the special-occasion move; Fox & Falcon handles the gastropub crowd. The BYOB-friendly Orange House Cafe is the underrated choice when you want to spend three hours over eggs without feeling rushed.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: \'0 auto\', padding: \'0 24px 80px\', display: \'grid\', gridTemplateColumns: \'repeat(auto-fill, minmax(320px, 1fr))\', gap: 24 }}>
        {SPOTS.map(s => (
          <div key={s.name} style={{ background: \'#fff\', borderRadius: 12, padding: 28, border: \'1px solid #E5DDD0\', boxShadow: \'0 2px 8px rgba(0,0,0,0.05)\' }}>
            <div style={{ display: \'flex\', justifyContent: \'space-between\', alignItems: \'flex-start\' }}>
              <h3 style={{ fontFamily: \'Georgia, serif\', fontSize: 20, color: \'#1a1a1a\', margin: \'0 0 4px\' }}>{s.name}</h3>
              <span style={{ fontSize: 13, color: \'#E8BE5A\' }}>{s.rating}</span>
            </div>
            <div style={{ fontSize: 12, color: \'#8B3a14\', fontWeight: 600, letterSpacing: 0.8, textTransform: \'uppercase\', marginBottom: 8 }}>{s.tag}</div>
            <div style={{ fontSize: 13, color: \'#666\', marginBottom: 12 }}>📍 {s.addr} · 🕐 {s.hours}</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: \'#3a3a3a\', margin: \'0 0 14px\' }}>{s.desc}</p>
            <div style={{ background: \'#FAF8F3\', borderLeft: \'3px solid #E8BE5A\', padding: \'8px 12px\', borderRadius: \'0 6px 6px 0\', fontSize: 13, color: \'#555\', fontStyle: \'italic\' }}>
              💡 {s.tip}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: \'#2D5016\', padding: \'40px 24px\', textAlign: \'center\' }}>
        <div style={{ display: \'flex\', gap: 12, flexWrap: \'wrap\', justifyContent: \'center\' }}>
          {[
            { href: \'/guides/coffee-south-orange\', label: \'☕ Coffee\' },
            { href: \'/guides/restaurants\', label: \'🍽 All Restaurants\' },
            { href: \'/guides/date-night-south-orange\', label: \'💑 Date Night\' },
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

write_page(f'{base}/coffee-south-orange', coffee)
write_page(f'{base}/bars-south-orange', bars)
write_page(f'{base}/brunch-south-orange', brunch)
