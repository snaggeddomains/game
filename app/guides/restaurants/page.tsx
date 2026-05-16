import '../so-guide.css';

export const metadata = {
  title: 'Best Restaurants in South Orange, NJ | Local Dining Guide | SouthOrange.com',
  description: 'The complete guide to restaurants in South Orange, NJ — fine dining, Italian, Japanese, Latin American, casual eats, and more.',
};

const BG = '#FAF8F3';
const DARK_GREEN = '#2D5016';
const GOLD = '#E8BE5A';
const SAGE = '#A8CC78';
const STONE = '#E5DDD0';
const TEXT = '#1A1A1A';
const MUTED = '#5A5A4A';

const CLUSTERS = [
  {
    label: 'Fine Dining & Date Night',
    restaurants: [
        { name: 'Bistro d\'Azur', link: 'https://bistrodazur.com', tag: 'French · Fine Dining', addr: '75 S Orange Ave', hours: 'Tue–Sun dinner', desc: 'The village’s most polished dining room — French-leaning menu, excellent wine list, white tablecloth atmosphere. Reliable for a real occasion.', tip: 'Reserve ahead on weekends; the prix fixe is worth it.' },
        { name: 'Felina', link: 'https://felinasteak.com', tag: 'Steakhouse · Italian', addr: 'S Orange Ave', hours: 'Wed–Sun dinner', desc: 'Upscale steakhouse with a moody, intimate vibe. Great for a splurge — aged cuts, handmade pasta, solid cocktail program.', tip: 'Bar seats are first-come; great for a spontaneous date night.' },
        { name: 'Giorgio\'s Ristorante', link: 'https://giorgiosristorante.com', tag: 'Italian · Seafood', addr: 'S Orange Ave', hours: 'Tue–Sun', desc: 'Long-running Italian spot with a loyal following — classic dishes, generous portions, reliably good. A village anchor.', tip: 'Ask about the daily fish specials.' },
    ],
  },
  {
    label: 'Italian & Pizza',
    restaurants: [
        { name: 'Reservoir Restaurant', link: 'https://www.soreservoir.com', tag: 'Italian · Pizza', addr: 'S Orange Ave', hours: 'Daily', desc: 'Neighborhood Italian with pizza, pasta, and red-sauce classics. Casual, family-friendly, and dependable for a quick dinner.' },
        { name: 'Mozzarella', link: 'https://www.yelp.com/biz/mozzarella-south-orange', tag: 'Italian · Pizza', addr: 'S Orange Ave', hours: 'Daily', desc: 'Casual Italian focused on hand-crafted pizza and fresh mozzarella. Popular with families and after-school crowds.' },
        { name: 'Village Trattoria', tag: 'Italian · Pizza', addr: 'S Orange Ave', hours: 'Daily', desc: 'Neighborhood trattoria with pizza, pasta, and a relaxed dining room. Solid weeknight option.' },
    ],
  },
  {
    label: 'Japanese & Asian',
    restaurants: [
        { name: 'Ariyoshi Japanese Restaurant', link: 'http://www.ariyoshisushi.com', tag: 'Japanese · Sushi', addr: 'S Orange Ave', hours: 'Tue–Sun', desc: 'Traditional Japanese with sushi, hot entrees, and bento. Quiet, consistent, and good value for a sit-down sushi dinner.' },
        { name: 'Harusame Japanese Cuisine', link: 'https://www.seamless.com/menu/harusame-japanese-cuisine-63-valley-st-south-orange/1135421', tag: 'Japanese · Sushi', addr: '63 Valley St', hours: 'Tue–Sun', desc: 'Local sushi spot with a broad menu — rolls, sashimi, and Japanese comfort dishes. A reliable neighborhood option.' },
        { name: 'Pandang', link: 'https://www.pandangnj.com', tag: 'Thai · Sushi', addr: 'S Orange Ave', hours: 'Daily', desc: 'Thai-Japanese hybrid doing pad thai, curries, and sushi rolls under one roof. Casual and convenient.' },
        { name: 'Number One Chinese Restaurant', link: 'https://www.seamless.com/menu/number-one-chinese-restaurant-210-s-orange-ave-south-orange/641672', tag: 'Chinese · Takeout', addr: '210 S Orange Ave', hours: 'Daily', desc: 'Classic American-Chinese takeout — combo platters, lo mein, General Tso’s. Exactly what it sounds like.' },
        { name: 'New Great Wall', link: 'https://newgreatwallso.com', tag: 'Chinese · Takeout', addr: 'S Orange Ave', hours: 'Daily', desc: 'Reliable takeout spot for Chinese-American staples. Fast, affordable, convenient.' },
        { name: 'Sakura Teriyaki', link: 'https://www.sakurateriyakinewjersey.com', tag: 'Japanese · Fast Casual', addr: 'S Orange Ave', hours: 'Daily', desc: 'Quick-service teriyaki and Japanese basics. Good for a no-fuss lunch or takeout.' },
    ],
  },
  {
    label: 'Latin American & African',
    restaurants: [
        { name: 'Chullo\'s Restaurant', link: 'https://www.seamless.com/menu/chullos-restaurant-4-s-orange-ave-south-orange/10418324', tag: 'Peruvian · Latin', addr: '4 S Orange Ave', hours: 'Daily', desc: 'The newest arrival and already earning buzz — Peruvian cooking with bold flavors and a welcoming room. One to watch.', tip: 'Try the ceviche.' },
        { name: 'Walia', link: 'https://waliarestaurant.com', tag: 'Ethiopian · African', addr: 'S Orange Ave', hours: 'Tue–Sun', desc: 'Excellent Ethiopian — injera-based sharing plates with vegetarian and meat options. One of South Orange’s most distinctive dining experiences.', tip: 'Go with a group and order the combination platter.' },
        { name: 'Jackie & Sons', link: 'https://jackieandsons.com', tag: 'Southern · Comfort Food', addr: 'S Orange Ave', hours: 'Daily', desc: 'Southern comfort food done right — fried chicken, biscuits, weekend brunch that draws a crowd. A village staple.', tip: 'The hot chicken biscuit at brunch is worth the wait.' },
        { name: 'Guanaticos Restaurant', tag: 'Latin American', addr: 'S Orange Ave', hours: 'Daily', desc: 'Lively Latin American spot with full-flavored mains, rice dishes, and a casual atmosphere. Good for a filling weeknight dinner.' },
        { name: 'Miti Miti Latin Street Food', link: 'https://www.mitimitinj.com', tag: 'Latin American · Mexican', addr: 'S Orange Ave', hours: 'Daily', desc: 'Casual Latin street food — tacos, burritos, rice bowls. Fast, fresh, and priced right.' },
        { name: 'Toro Loco', link: 'https://www.grubhub.com/restaurant/toro-loco-23-s-orange-ave-south-orange/2789567', tag: 'Mexican · Diner', addr: '23 S Orange Ave', hours: 'Daily', desc: 'Mexican-American spot covering the basics — tacos, burritos, breakfast plates. No-frills and reliable.' },
        { name: 'Jus\' Tacos', link: 'https://www.seamless.com/menu/jus-tacos-190-s-orange-ave-south-orange/8064782', tag: 'Tacos · Mexican', addr: '190 S Orange Ave', hours: 'Daily', desc: 'Focused taco spot with a loyal following — high ratings and a simple menu done well. Underrated.', tip: 'Cash-friendly; check the daily specials.' },
    ],
  },
  {
    label: 'Mediterranean & Middle Eastern',
    restaurants: [
        { name: 'Medusa Greek Street Food', link: 'https://www.doordash.com/store/medusa-greek-street-food-south-orange-31962875/', tag: 'Greek · Mediterranean', addr: 'S Orange Ave', hours: 'Daily', desc: 'Greek street food — gyros, souvlaki, falafel, and fresh salads. A quick casual option with Mediterranean flavors.' },
        { name: 'OMGYRO', link: 'https://www.seamless.com/menu/omgyro-1-south-orange-avenue-south-orange/10300542', tag: 'Halal · Mediterranean · Gyros', addr: '1 S Orange Ave', hours: 'Daily', desc: 'Halal Mediterranean with gyros, wraps, and rice plates. High ratings and a fast-casual format.', tip: 'One of the better-reviewed spots on the avenue.' },
    ],
  },
  {
    label: 'Indian',
    restaurants: [
        { name: 'BayLeaf Indian Cuisine', link: 'https://www.seamless.com/menu/bayleaf-indian-cuisine-139-s-orange-ave-south-orange/10353800', tag: 'Indian', addr: '139 S Orange Ave', hours: 'Daily', desc: 'Full-service Indian restaurant with curries, biryanis, and a lunch buffet. Consistent and well-regarded by regulars.', tip: 'Lunch buffet is good value on weekdays.' },
    ],
  },
  {
    label: 'Casual & Quick Bites',
    restaurants: [
        { name: 'The Order', link: 'https://theordernj.com', tag: 'Cafe · Brunch · Coffee', addr: 'S Orange Ave', hours: 'Daily 8am–4pm', desc: 'The village’s go-to cafe — excellent coffee, avocado toast, and a brunch menu that draws a line on weekends. Central to South Orange social life.', tip: 'Arrive early on weekends or expect a wait.' },
        { name: 'Town Hall Deli', link: 'https://townhalldeli.com', tag: 'Deli · Sandwiches', addr: '74 1st St', hours: 'Daily 7am–6pm', desc: 'The local deli institution — piled-high sandwiches, breakfast wraps, and house-made soups. Counter service and always a line at lunch.', tip: 'The Italian sub is a neighborhood staple.' },
        { name: 'Orange House Cafe', link: 'https://www.orangehousecafe.com', tag: 'Cafe · Breakfast', addr: 'S Orange Ave', hours: 'Daily', desc: 'Neighborhood breakfast and lunch spot with a homey feel. Popular with locals for eggs, sandwiches, and coffee.' },
        { name: 'NYC Style Deli', link: 'https://www.yelp.com/biz/nyc-style-deli-south-orange-village', tag: 'Deli · Sandwiches', addr: '12 S Orange Ave', hours: 'Daily 6am–2am', desc: 'Classic deli sandwiches and breakfast wraps. Good grab-and-go for commuters and lunch crowds — open late.' },
        { name: 'Chipoba', link: 'https://chipobaso.com', tag: 'Poke · Bubble Tea · Fast Casual', addr: 'S Orange Ave', hours: 'Daily', desc: 'Poke bowls and bubble tea in a bright fast-casual format. A lighter option on the avenue.' },
        { name: 'Playa Bowls', link: 'https://playabowls.com', tag: 'Acai Bowls · Smoothies', addr: 'S Orange Ave', hours: 'Daily 8am–8pm', desc: 'Acai bowls, pitaya bowls, and smoothies. The go-to for a post-hike or post-workout refuel.' },
        { name: 'Sonny\'s Bagels', link: 'https://sonnysbagels.com', tag: 'Bagels · Breakfast', addr: '123 S Orange Ave', hours: 'Daily 6am–3pm', desc: 'The village bagel spot — classic NJ-style bagels with all the toppings. Opens early, gets busy fast.', tip: 'Get there by 9am on weekends.' },
        { name: 'BGR Burgers', link: 'https://bgrtheburgerjoint.com', tag: 'Burgers · Fast Casual', addr: 'S Orange Ave', hours: 'Daily', desc: 'Build-your-own burgers with quality beef, solid toppings, and fries. Reliable for a quick, satisfying lunch.' },
        { name: 'Your Ultimate Patty Place', link: 'https://www.yourultimatepattyplace.com', tag: 'Caribbean · Patties', addr: 'S Orange Ave', hours: 'Daily', desc: 'Jamaican-style beef patties and Caribbean snacks. A unique quick-bite option — cheap and satisfying.' },
        { name: 'House of Wings', link: 'https://www.doordash.com/store/house-of-wings-south-orange-32163386/', tag: 'Wings · Burgers', addr: 'S Orange Ave', hours: 'Daily', desc: 'Wings in a range of sauces, plus burgers and sides. Casual takeout-friendly spot with high local ratings.' },
        { name: 'Tira\'s Cafe', link: 'https://www.tirascafe.com', tag: 'Cafe', addr: 'S Orange Ave', hours: 'Daily', desc: 'Neighborhood cafe with strong early reviews. A quiet spot for coffee and a bite.' },
        { name: 'Village Diner', link: 'https://www.yelp.com/biz/village-diner-south-orange', tag: 'Diner · Breakfast', addr: 'S Orange Ave', hours: 'Daily 6am–3pm', desc: 'Classic NJ diner — eggs any style, pancakes, Greek salads, and the full diner menu. Open early, priced fairly.' },
        { name: 'Lucky Fortune', tag: 'Chinese · Takeout', addr: 'S Orange Ave', hours: 'Daily', desc: 'Quick Chinese takeout for the basics. Convenient for a fast weeknight dinner.' },
    ],
  },
  {
    label: 'Bars & Drinks',
    restaurants: [
        { name: 'Papillon 25', link: 'https://papillon25.com', tag: 'Cocktail Bar · Martini Bar', addr: '25 Valley St', hours: 'Wed–Sun 5pm–close', desc: 'South Orange’s best cocktail bar — creative seasonal drinks, intimate setting, a cut above the typical bar scene.', tip: 'Show up early; it fills up on weekends.' },
        { name: 'Gaslight Brewery & Restaurant', link: 'https://www.gaslightbrewery.net', tag: 'Brewery · Bar', addr: 'S Orange Ave', hours: 'Daily', desc: 'The village’s own brewery — house-brewed beers, pub food, and a spacious room for a casual dinner or a few pints.' },
        { name: 'Bunny\'s Bar', link: 'https://bunnyssportsbar.us', tag: 'Sports Bar', addr: 'S Orange Ave', hours: 'Daily', desc: 'The neighborhood sports bar — cold beer, TVs everywhere, no-frills pub food, and a welcoming local crowd.', tip: 'Best for watching a big game with a group.' },
    ],
  },
];

const relatedGuides = [
  { label: 'Bars in South Orange', href: '/guides/bars-south-orange' },
  { label: 'Best Brunch in South Orange', href: '/guides/brunch-south-orange' },
  { label: 'Best Coffee in South Orange', href: '/guides/coffee-south-orange' },
  { label: 'Things To Do in South Orange', href: '/guides/things-to-do' },
];

export default function RestaurantsPage() {
  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: TEXT }}>
      <nav style={{ background: DARK_GREEN, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <a href="/" style={{ color: GOLD, fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 18, textDecoration: 'none' }}>SouthOrange.com</a>
        <div className="so-nav-links">
          <a href="/guides/restaurants" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Dining</a>
          <a href="/guides/things-to-do" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Things To Do</a>
          <a href="/guides/moving-to" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Moving Here</a>
          <a href="/guides/compare-towns" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Compare Towns</a>
          <a href="/" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Home</a>
        </div>
      </nav>
      <section style={{ background: DARK_GREEN, padding: '56px 24px 64px', textAlign: 'center' }}>
        <div style={{ fontSize: 44, marginBottom: 14 }}>🍽️</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 700, color: '#FFFFFF', margin: '0 0 14px', lineHeight: 1.2 }}>
          Restaurants in South Orange, NJ
        </h1>
        <p style={{ fontSize: 17, color: SAGE, maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
          The full dining guide — fine dining, neighborhood spots, international cuisines, and quick bites. All within the village.
        </p>
        <div style={{ display: 'inline-block', marginTop: 20, background: GOLD, borderRadius: 4, padding: '5px 14px', fontSize: 13, fontWeight: 600, color: DARK_GREEN }}>
          South Orange, NJ
        </div>
      </section>
      <div>
        <img src="/town_hall.png" alt="Town Hall Deli, South Orange NJ" style={{ width: '100%', maxHeight: 320, objectFit: 'cover', display: 'block' }} />
      </div>
      <main style={{ maxWidth: 820, margin: '0 auto', padding: '44px 24px 64px' }} className="so-main">
        {CLUSTERS.map((cluster) => (
          <section key={cluster.label} style={{ marginBottom: 44 }} className="so-section">
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: DARK_GREEN, margin: '0 0 14px' }}>
              {cluster.label}
            </h2>
            <div style={{ background: '#fff', border: '1px solid #E5DDD0', borderRadius: 12, padding: '0 24px' }}>
              {cluster.restaurants.map((r, i) => (
                <div key={r.name} style={{ padding: '18px 0', borderBottom: i < cluster.restaurants.length - 1 ? '1px solid #f0ebe3' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: DARK_GREEN }}>
                      {r.link ? (
                        <a href={r.link} target="_blank" rel="noopener noreferrer" style={{ color: DARK_GREEN, textDecoration: 'none' }}>
                          {r.name} <span style={{ fontSize: 12, opacity: 0.6 }}>↗</span>
                        </a>
                      ) : r.name}
                    </div>
                    <div style={{ fontSize: 12, color: MUTED, fontWeight: 500, whiteSpace: 'nowrap' }}>{r.tag}</div>
                  </div>
                  {(r.addr || r.hours) && (
                    <div style={{ fontSize: 12, color: MUTED, marginTop: 3 }}>{r.addr}{r.addr && r.hours ? ' · ' : ''}{r.hours}</div>
                  )}
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: '#3A3A2A', margin: '6px 0 0' }}>{r.desc}</p>
                  {r.tip && <p style={{ fontSize: 13, color: MUTED, fontStyle: 'italic', margin: '4px 0 0' }}>💡 {r.tip}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}
        <section style={{ marginTop: 16 }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: DARK_GREEN, marginBottom: 14, marginTop: 0 }}>Related Guides</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }} className="so-card-grid">
            {relatedGuides.map((guide) => (
              <a key={guide.href} href={guide.href} style={{ display: 'block', background: '#fff', border: '1px solid #E5DDD0', borderRadius: 8, padding: '14px 18px', textDecoration: 'none', color: DARK_GREEN, fontWeight: 600, fontSize: 14, lineHeight: 1.4 }}>
                {guide.label} →
              </a>
            ))}
          </div>
        </section>
      </main>
      <footer style={{ background: DARK_GREEN, padding: '40px 24px', textAlign: 'center' }}>
        <a href="/" style={{ color: GOLD, fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 20, textDecoration: 'none', display: 'block', marginBottom: 20 }}>SouthOrange.com</a>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', marginBottom: 28 }}>
          {[{ label: 'Guides', href: '/guides' }, { label: 'Bars', href: '/guides/bars-south-orange' }, { label: 'Brunch', href: '/guides/brunch-south-orange' }, { label: 'Coffee', href: '/guides/coffee-south-orange' }, { label: 'Compare Towns', href: '/guides/compare-towns' }].map((link) => (
            <a key={link.href} href={link.href} style={{ color: '#A8CC78', fontSize: 14, textDecoration: 'none' }}>{link.label}</a>
          ))}
        </nav>
        <p style={{ color: '#6A8A50', fontSize: 13, margin: 0 }}>© {new Date().getFullYear()} SouthOrange.com · South Orange, NJ 07079</p>
      </footer>
    </div>
  );
}
