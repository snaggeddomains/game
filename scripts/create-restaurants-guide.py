#!/usr/bin/env python3
import os

base = os.path.expanduser('~/southorange-site/app/guides/restaurants')
os.makedirs(base, exist_ok=True)

page = r"""
const CLUSTERS = [
  {
    title: 'Date Night & Fine Dining',
    color: '#2D5016',
    places: [
      {
        name: "Bistro d'Azur",
        tag: 'French · Intimate',
        addr: '14 Academy St',
        hours: 'Tue–Sun dinner; Sun brunch',
        desc: 'The gold standard for a special evening in South Orange. Classic French technique — steak frites, moules, duck confit — in a warm, candlelit room two blocks from the train. Reservations strongly recommended on weekends.',
        tip: 'Ask for a table in the back room. The prix-fixe is excellent value.',
      },
      {
        name: 'Felina Steak',
        tag: 'Steakhouse · Special Occasion',
        addr: '101 S Orange Ave',
        hours: 'Wed–Sun dinner',
        desc: 'Upscale steakhouse with dry-aged cuts, a serious wine list, and a polished bar. The room feels big-city; the walk home is two minutes. Best for celebrations and client dinners.',
        tip: 'The bone-in ribeye and the tableside Caesar are the moves.',
      },
      {
        name: 'Fox & Falcon',
        tag: 'American · Upscale Casual',
        addr: '19 Valley St',
        hours: 'Daily lunch & dinner',
        desc: 'Gastropub energy with genuine kitchen ambition. Excellent burgers, well-executed apps, and a bar scene that stays lively without getting loud. A reliable anchor for the Valley St corridor.',
        tip: 'Great for groups — the long tables handle 8+ without advance booking most weeknights.',
      },
    ],
  },
  {
    title: 'Casual & Neighborhood Favorites',
    color: '#4a7c28',
    places: [
      {
        name: 'The Order',
        tag: 'Brunch · Casual Lunch',
        addr: '50 W South Orange Ave',
        hours: 'Daily 8am–3pm',
        desc: 'The morning anchor for downtown South Orange. Avocado toast done right, strong coffee program, weekend brunch with lines that move fast. A true community gathering spot.',
        tip: 'Arrive before 10am on Saturdays to skip the wait.',
      },
      {
        name: 'Town Hall Deli',
        tag: 'Deli · Local Legend',
        addr: '74 First St',
        hours: 'Daily 6am–8pm',
        desc: 'A South Orange institution that\'s been feeding the town since 1927. Italian cold cuts, house-made salads, incredible hero sandwiches. Locals debate the correct order fiercely.',
        tip: 'The #7 with sharp provolone and hot peppers. No debate.',
      },
      {
        name: 'Orange House Cafe',
        tag: 'Cafe · Breakfast & Lunch',
        addr: 'Valley St',
        hours: 'Daily 7am–4pm',
        desc: 'Neighborhood cafe with a loyal following for its egg sandwiches and baked goods. Quieter than The Order — the go-to for solo work sessions with a good latte.',
        tip: 'Strong wifi; BYOB on weekends for a low-key brunch.',
      },
      {
        name: 'Jackie & Sons',
        tag: 'Diner · All-Day',
        addr: 'S Orange Ave',
        hours: 'Daily 7am–3pm',
        desc: 'A proper NJ diner — enormous portions, friendly counter service, and prices that feel like a time warp. Nothing precious; everything satisfying.',
        tip: 'The pork roll, egg & cheese on a hard roll is the correct order.',
      },
    ],
  },
  {
    title: 'International & Standout Cuisine',
    color: '#8B6914',
    places: [
      {
        name: 'Walia Ethiopian Cuisine',
        tag: 'Ethiopian · Vegetarian-Friendly',
        addr: '134 S Orange Ave',
        hours: 'Tue–Sun lunch & dinner',
        desc: 'The most distinctive restaurant in South Orange\'s dining scene — authentic injera-based Ethiopian cooking with generous vegetarian options and communal platters. A local favorite that punches well above its size.',
        tip: 'Order the combo platter for two and eat family-style. BYOB.',
      },
      {
        name: 'Playa Bowls',
        tag: 'Acai · Health',
        addr: 'S Orange Ave',
        hours: 'Daily 8am–8pm',
        desc: 'The NJ-born chain but this location is a genuine hit — acai bowls, pitaya, coconut bases. Popular with SHU students and the post-park crowd after South Mountain hikes.',
        tip: 'The "Rio" bowl with granola and honey is the classic.',
      },
      {
        name: 'Sonny\'s Bagels',
        tag: 'Bagels · Breakfast',
        addr: 'S Orange Ave',
        hours: 'Daily 6am–2pm',
        desc: 'New Jersey bagels the right way — hand-rolled, boiled, baked. The everything with lox and scallion cream cheese is a weekend ritual for a significant chunk of the township.',
        tip: 'Get there by 9am Sunday or the everything is gone.',
      },
    ],
  },
  {
    title: 'Bars & Drinks-Forward',
    color: '#5a2d82',
    places: [
      {
        name: 'Papillon 25',
        tag: 'Cocktail Bar · Martini Bar',
        addr: '25 Valley St',
        hours: 'Wed–Sun from 5pm',
        desc: 'South Orange\'s best dedicated cocktail bar. Seasonal menus, skilled bartenders, a martini program that gets taken seriously. Small, intimate, fills up fast on Fridays.',
        tip: 'The dirty martini and the seasonal spritz are both excellent entry points.',
      },
      {
        name: 'Gaslight Brewery & Restaurant',
        tag: 'Craft Beer · Pub',
        addr: '15 S Orange Ave',
        hours: 'Daily 11am–close',
        desc: 'South Orange\'s only craft brewery and one of the oldest in NJ. House-brewed ales and lagers, a full pub menu, and outdoor seating that\'s packed all summer.',
        tip: 'The seasonal IPA and the fish & chips are a reliable combo.',
      },
      {
        name: "Bunny's Bar",
        tag: 'Dive Bar · Local Hang',
        addr: 'S Orange Ave',
        hours: 'Daily 3pm–close',
        desc: 'No frills, cold beer, great jukebox. The kind of neighborhood bar that every town needs and few still have. Unpretentious and essential.',
        tip: 'Cash only some nights. Check before you go.',
      },
    ],
  },
]

export default function RestaurantsGuide() {
  return (
    <div style={{ background: '#FAF8F3', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #2D5016 0%, #4a7c28 100%)', padding: '64px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🍽</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 42, color: '#FAF8F3', margin: '0 0 12px', fontWeight: 700 }}>
          Best Restaurants in South Orange, NJ
        </h1>
        <p style={{ color: '#A8CC78', fontSize: 18, margin: '0 auto', maxWidth: 600 }}>
          From French bistros and steakhouses to Ethiopian cuisine and classic NJ delis — the full dining picture.
        </p>
      </div>

      {/* Intro */}
      <div style={{ maxWidth: 800, margin: '48px auto', padding: '0 24px' }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#3a3a3a' }}>
          South Orange punches above its weight for a town of 16,000. The dining scene clusters around South Orange Avenue and the Valley Street corridor — both a short walk from the train station. You can do a legitimately excellent date night without leaving downtown, and the quick-bite and brunch options are strong enough that locals rarely feel the need to drive to Montclair or the Short Hills Mall.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#3a3a3a', marginTop: 16 }}>
          BYOB is common at several spots — Walia and Orange House in particular — which keeps the bill reasonable even on weeknights.
        </p>
      </div>

      {/* Clusters */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        {CLUSTERS.map(cluster => (
          <div key={cluster.title} style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <div style={{ height: 4, width: 40, background: cluster.color, borderRadius: 2 }} />
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: '#2D5016', margin: 0 }}>{cluster.title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {cluster.places.map(p => (
                <div key={p.name} style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #E5DDD0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#1a1a1a', margin: 0 }}>{p.name}</h3>
                  </div>
                  <div style={{ fontSize: 12, color: cluster.color, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>{p.tag}</div>
                  <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>📍 {p.addr} &nbsp;·&nbsp; 🕐 {p.hours}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3a3a3a', margin: '0 0 14px' }}>{p.desc}</p>
                  <div style={{ background: '#FAF8F3', borderLeft: '3px solid #E8BE5A', padding: '10px 14px', borderRadius: '0 6px 6px 0', fontSize: 13, color: '#555', fontStyle: 'italic' }}>
                    💡 {p.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{ background: '#2D5016', padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ color: '#A8CC78', marginBottom: 20, fontSize: 15 }}>Explore more South Orange guides</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { href: '/guides/brunch-south-orange', label: '🥂 Brunch' },
            { href: '/guides/bars-south-orange', label: '🍸 Bars' },
            { href: '/guides/coffee-south-orange', label: '☕ Coffee' },
            { href: '/guides/date-night-south-orange', label: '💑 Date Night' },
            { href: '/', label: '🏡 Home' },
          ].map(l => (
            <a key={l.href} href={l.href} style={{ background: 'rgba(255,255,255,0.1)', color: '#FAF8F3', padding: '10px 20px', borderRadius: 24, textDecoration: 'none', fontSize: 14, border: '1px solid rgba(255,255,255,0.2)' }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
"""

content = "export const metadata = { title: 'Best Restaurants in South Orange NJ | South Orange Guide', description: 'The complete guide to dining in South Orange, NJ — from French bistros and steakhouses to Ethiopian cuisine, classic delis, and craft beer.' }\n\n"
content += "const CLUSTERS = [\n"

clusters_data = [
    {
        "title": "Date Night & Fine Dining",
        "color": "#2D5016",
        "places": [
            {
                "name": "Bistro d'Azur",
                "tag": "French · Intimate",
                "addr": "14 Academy St",
                "hours": "Tue–Sun dinner; Sun brunch",
                "desc": "The gold standard for a special evening in South Orange. Classic French technique — steak frites, moules, duck confit — in a warm, candlelit room two blocks from the train. Reservations strongly recommended on weekends.",
                "tip": "Ask for a table in the back room. The prix-fixe is excellent value.",
            },
            {
                "name": "Felina Steak",
                "tag": "Steakhouse · Special Occasion",
                "addr": "101 S Orange Ave",
                "hours": "Wed–Sun dinner",
                "desc": "Upscale steakhouse with dry-aged cuts, a serious wine list, and a polished bar. The room feels big-city; the walk home is two minutes. Best for celebrations and client dinners.",
                "tip": "The bone-in ribeye and the tableside Caesar are the moves.",
            },
            {
                "name": "Fox & Falcon",
                "tag": "American · Upscale Casual",
                "addr": "19 Valley St",
                "hours": "Daily lunch & dinner",
                "desc": "Gastropub energy with genuine kitchen ambition. Excellent burgers, well-executed apps, and a bar scene that stays lively without getting loud. A reliable anchor for the Valley St corridor.",
                "tip": "Great for groups — the long tables handle 8+ without advance booking most weeknights.",
            },
        ],
    },
    {
        "title": "Casual & Neighborhood Favorites",
        "color": "#4a7c28",
        "places": [
            {
                "name": "The Order",
                "tag": "Brunch · Casual Lunch",
                "addr": "50 W South Orange Ave",
                "hours": "Daily 8am–3pm",
                "desc": "The morning anchor for downtown South Orange. Avocado toast done right, strong coffee program, weekend brunch with lines that move fast. A true community gathering spot.",
                "tip": "Arrive before 10am on Saturdays to skip the wait.",
            },
            {
                "name": "Town Hall Deli",
                "tag": "Deli · Local Legend",
                "addr": "74 First St",
                "hours": "Daily 6am–8pm",
                "desc": "A South Orange institution that's been feeding the town since 1927. Italian cold cuts, house-made salads, incredible hero sandwiches. Locals debate the correct order fiercely.",
                "tip": "The #7 with sharp provolone and hot peppers. No debate.",
            },
            {
                "name": "Orange House Cafe",
                "tag": "Cafe · Breakfast & Lunch",
                "addr": "Valley St",
                "hours": "Daily 7am–4pm",
                "desc": "Neighborhood cafe with a loyal following for its egg sandwiches and baked goods. Quieter than The Order — the go-to for solo work sessions with a good latte.",
                "tip": "Strong wifi; BYOB on weekends for a low-key brunch.",
            },
            {
                "name": "Jackie & Sons",
                "tag": "Diner · All-Day",
                "addr": "S Orange Ave",
                "hours": "Daily 7am–3pm",
                "desc": "A proper NJ diner — enormous portions, friendly counter service, and prices that feel like a time warp. Nothing precious; everything satisfying.",
                "tip": "The pork roll, egg & cheese on a hard roll is the correct order.",
            },
        ],
    },
    {
        "title": "International & Standout Cuisine",
        "color": "#8B6914",
        "places": [
            {
                "name": "Walia Ethiopian Cuisine",
                "tag": "Ethiopian · Vegetarian-Friendly",
                "addr": "134 S Orange Ave",
                "hours": "Tue–Sun lunch & dinner",
                "desc": "The most distinctive restaurant in South Orange's dining scene — authentic injera-based Ethiopian cooking with generous vegetarian options and communal platters. A local favorite that punches well above its size.",
                "tip": "Order the combo platter for two and eat family-style. BYOB.",
            },
            {
                "name": "Playa Bowls",
                "tag": "Acai · Health",
                "addr": "S Orange Ave",
                "hours": "Daily 8am–8pm",
                "desc": "The NJ-born chain but this location is a genuine hit — acai bowls, pitaya, coconut bases. Popular with SHU students and the post-park crowd after South Mountain hikes.",
                "tip": 'The "Rio" bowl with granola and honey is the classic.',
            },
            {
                "name": "Sonny's Bagels",
                "tag": "Bagels · Breakfast",
                "addr": "S Orange Ave",
                "hours": "Daily 6am–2pm",
                "desc": "New Jersey bagels the right way — hand-rolled, boiled, baked. The everything with lox and scallion cream cheese is a weekend ritual for a significant chunk of the township.",
                "tip": "Get there by 9am Sunday or the everything is gone.",
            },
        ],
    },
    {
        "title": "Bars & Drinks-Forward",
        "color": "#5a2d82",
        "places": [
            {
                "name": "Papillon 25",
                "tag": "Cocktail Bar · Martini Bar",
                "addr": "25 Valley St",
                "hours": "Wed–Sun from 5pm",
                "desc": "South Orange's best dedicated cocktail bar. Seasonal menus, skilled bartenders, a martini program that gets taken seriously. Small, intimate, fills up fast on Fridays.",
                "tip": "The dirty martini and the seasonal spritz are both excellent entry points.",
            },
            {
                "name": "Gaslight Brewery & Restaurant",
                "tag": "Craft Beer · Pub",
                "addr": "15 S Orange Ave",
                "hours": "Daily 11am–close",
                "desc": "South Orange's only craft brewery and one of the oldest in NJ. House-brewed ales and lagers, a full pub menu, and outdoor seating that's packed all summer.",
                "tip": "The seasonal IPA and the fish & chips are a reliable combo.",
            },
            {
                "name": "Bunny's Bar",
                "tag": "Dive Bar · Local Hang",
                "addr": "S Orange Ave",
                "hours": "Daily 3pm–close",
                "desc": "No frills, cold beer, great jukebox. The kind of neighborhood bar that every town needs and few still have. Unpretentious and essential.",
                "tip": "Cash only some nights. Check before you go.",
            },
        ],
    },
]

import json

tsx = '''export const metadata = {
  title: 'Best Restaurants in South Orange NJ | South Orange Guide',
  description: 'The complete guide to dining in South Orange, NJ — from French bistros and steakhouses to Ethiopian cuisine, classic delis, and craft beer.',
}

const CLUSTERS = [
'''

for c in clusters_data:
    tsx += f"  {{\n    title: {json.dumps(c['title'])},\n    color: {json.dumps(c['color'])},\n    places: [\n"
    for p in c['places']:
        tsx += f"      {{ name: {json.dumps(p['name'])}, tag: {json.dumps(p['tag'])}, addr: {json.dumps(p['addr'])}, hours: {json.dumps(p['hours'])}, desc: {json.dumps(p['desc'])}, tip: {json.dumps(p['tip'])} }},\n"
    tsx += "    ],\n  },\n"

tsx += ''']

export default function RestaurantsGuide() {
  return (
    <div style={{ background: \'#FAF8F3\', minHeight: \'100vh\' }}>
      <div style={{ background: \'linear-gradient(135deg, #2D5016 0%, #4a7c28 100%)\', padding: \'64px 24px 48px\', textAlign: \'center\' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🍽</div>
        <h1 style={{ fontFamily: \'Georgia, serif\', fontSize: 42, color: \'#FAF8F3\', margin: \'0 0 12px\', fontWeight: 700 }}>
          Best Restaurants in South Orange, NJ
        </h1>
        <p style={{ color: \'#A8CC78\', fontSize: 18, margin: \'0 auto\', maxWidth: 600 }}>
          From French bistros and steakhouses to Ethiopian cuisine and classic NJ delis — the full dining picture.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: \'48px auto\', padding: \'0 24px\' }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\' }}>
          South Orange punches above its weight for a town of 16,000. The dining scene clusters around South Orange Avenue and the Valley Street corridor — both a short walk from the train station. You can do a legitimately excellent date night without leaving downtown, and the quick-bite and brunch options are strong enough that locals rarely feel the need to drive elsewhere.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: \'#3a3a3a\', marginTop: 16 }}>
          BYOB is common at several spots — Walia and Orange House in particular — which keeps the bill reasonable even on weeknights.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: \'0 auto\', padding: \'0 24px 80px\' }}>
        {CLUSTERS.map(cluster => (
          <div key={cluster.title} style={{ marginBottom: 64 }}>
            <div style={{ display: \'flex\', alignItems: \'center\', gap: 16, marginBottom: 28 }}>
              <div style={{ height: 4, width: 40, background: cluster.color, borderRadius: 2 }} />
              <h2 style={{ fontFamily: \'Georgia, serif\', fontSize: 26, color: \'#2D5016\', margin: 0 }}>{cluster.title}</h2>
            </div>
            <div style={{ display: \'grid\', gridTemplateColumns: \'repeat(auto-fill, minmax(300px, 1fr))\', gap: 24 }}>
              {cluster.places.map(p => (
                <div key={p.name} style={{ background: \'#fff\', borderRadius: 12, padding: 28, border: \'1px solid #E5DDD0\', boxShadow: \'0 2px 8px rgba(0,0,0,0.05)\' }}>
                  <h3 style={{ fontFamily: \'Georgia, serif\', fontSize: 20, color: \'#1a1a1a\', margin: \'0 0 4px\' }}>{p.name}</h3>
                  <div style={{ fontSize: 12, color: cluster.color, fontWeight: 600, letterSpacing: 0.8, textTransform: \'uppercase\', marginBottom: 8 }}>{p.tag}</div>
                  <div style={{ fontSize: 13, color: \'#666\', marginBottom: 12 }}>📍 {p.addr} · 🕐 {p.hours}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: \'#3a3a3a\', margin: \'0 0 14px\' }}>{p.desc}</p>
                  <div style={{ background: \'#FAF8F3\', borderLeft: \'3px solid #E8BE5A\', padding: \'10px 14px\', borderRadius: \'0 6px 6px 0\', fontSize: 13, color: \'#555\', fontStyle: \'italic\' }}>
                    💡 {p.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: \'#2D5016\', padding: \'40px 24px\', textAlign: \'center\' }}>
        <p style={{ color: \'#A8CC78\', marginBottom: 20, fontSize: 15 }}>Explore more South Orange guides</p>
        <div style={{ display: \'flex\', gap: 12, flexWrap: \'wrap\', justifyContent: \'center\' }}>
          {[
            { href: \'/guides/brunch-south-orange\', label: \'🥂 Brunch\' },
            { href: \'/guides/bars-south-orange\', label: \'🍸 Bars\' },
            { href: \'/guides/coffee-south-orange\', label: \'☕ Coffee\' },
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

os.makedirs(base, exist_ok=True)
with open(f'{base}/page.tsx', 'w') as f:
    f.write(tsx)
print('Wrote restaurants/page.tsx')
