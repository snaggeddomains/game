#!/usr/bin/env python3
"""Update SouthOrange.com guide pages with real local business data."""
import pathlib

BASE = pathlib.Path.home() / "southorange-site"

RESTAURANTS = """\
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Best Restaurants in South Orange, NJ — Local Dining Guide',
  description: "The best restaurants in South Orange NJ — Bistro d'Azur, Giorgio's, Village Trattoria, Papillon 25, and more local favorites.",
};
export default function RestaurantsPage() {
  return (
    <article className="gd-article">
      <h1 className="gd-h1">Best Restaurants in South Orange, NJ</h1>
      <p className="gd-lead">
        South Orange Village packs an impressive restaurant scene into a walkable downtown.
        Here&rsquo;s where locals eat.
      </p>

      <h2 className="gd-h2">Top-Rated Spots</h2>

      <div className="gd-card">
        <h3 className="gd-h3">Bistro d&rsquo;Azur <span className="gd-badge">4.7 stars</span></h3>
        <p className="gd-addr">14 Academy St &mdash; <a href="https://bistrodazur.com/" className="gd-link" target="_blank" rel="noopener">bistrodazur.com</a></p>
        <p>South Orange&rsquo;s most celebrated table. French-Mediterranean cooking in a charming Academy Street setting &mdash; perfect for date night or weekend brunch. Reservations recommended.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Giorgio&rsquo;s Restaurant <span className="gd-badge">4.3 stars</span></h3>
        <p className="gd-addr">52 Vose Ave &mdash; <a href="https://giorgiosristorante.com/" className="gd-link" target="_blank" rel="noopener">giorgiosristorante.com</a></p>
        <p>A neighborhood Italian staple. Solid red-sauce classics and a warm, old-school atmosphere that keeps regulars coming back year after year.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Harusame Japanese Cuisine <span className="gd-badge">4.2 stars</span></h3>
        <p className="gd-addr">63 Academy St &mdash; <a href="https://harusamesushinj.com/" className="gd-link" target="_blank" rel="noopener">harusamesushinj.com</a></p>
        <p>The go-to for sushi in South Orange. Fresh rolls, nigiri, and Japanese staples in a relaxed Academy Street setting. Great lunch specials too.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Village Trattoria <span className="gd-badge">4.1 stars</span></h3>
        <p className="gd-addr">21 S Orange Ave &mdash; <a href="https://villagetrattoria.com/" className="gd-link" target="_blank" rel="noopener">villagetrattoria.com</a></p>
        <p>Right on the main drag &mdash; Italian comfort food, thin-crust pizza, and classic antipasti. A reliable go-to for casual family dinners.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Reservoir <span className="gd-badge">3.9 stars</span></h3>
        <p className="gd-addr">106 W South Orange Ave &mdash; <a href="https://soreservoir.com/" className="gd-link" target="_blank" rel="noopener">soreservoir.com</a></p>
        <p>Italian-American fare and cocktails in a lively neighborhood spot. The bar gets busy on weekends &mdash; good for groups.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Toro Loco <span className="gd-badge">3.8 stars</span></h3>
        <p className="gd-addr">23 Valley St &mdash; <a href="https://toroloco.net/" className="gd-link" target="_blank" rel="noopener">toroloco.net</a></p>
        <p>Affordable Mexican on Valley Street &mdash; tacos, burritos, and margaritas without a wait. A solid casual pick.</p>
      </div>

      <h2 className="gd-h2">More Local Favorites</h2>

      <div className="gd-card">
        <h3 className="gd-h3">Papillon 25</h3>
        <p className="gd-addr">25 Valley St &mdash; bar and restaurant</p>
        <p>Valley Street&rsquo;s best cocktail bar with Italian small plates. Creative drink menu, intimate vibe, genuinely lively on Friday and Saturday nights.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Felina Steak South Orange</h3>
        <p className="gd-addr">101 S Orange Ave &mdash; <a href="https://bylandmark.com/felina-steak-south-orange" className="gd-link" target="_blank" rel="noopener">bylandmark.com</a></p>
        <p>South Orange&rsquo;s upscale splurge. Prime cuts, handcrafted cocktails, and white-tablecloth service from the Landmark Hospitality group.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Miti Miti</h3>
        <p className="gd-addr">10 Sloan St &mdash; <a href="https://mitimitinj.com/" className="gd-link" target="_blank" rel="noopener">mitimitinj.com</a></p>
        <p>Lively Latin-fusion with strong margaritas and shareable plates. One of the best happy hour deals in the Village (typically 4&ndash;7pm weekdays).</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Village Diner</h3>
        <p className="gd-addr">1 Sloan St &mdash; <a href="https://thevillagedinerso.com/" className="gd-link" target="_blank" rel="noopener">thevillagedinerso.com</a></p>
        <p>Classic NJ diner open early every day. Generous portions, no wait, and a menu that runs from eggs Benedict to late-night burgers.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Jackie &amp; Sons</h3>
        <p className="gd-addr">134 S Orange Ave &mdash; <a href="https://jackieandsons.com/" className="gd-link" target="_blank" rel="noopener">jackieandsons.com</a></p>
        <p>Casual American comfort food and weekend brunch. The burger and weekend egg dishes get strong local reviews.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">mozzarella</h3>
        <p className="gd-addr">396 Valley St &mdash; <a href="https://mozzarellaso.com/" className="gd-link" target="_blank" rel="noopener">mozzarellaso.com</a></p>
        <p>Fresh pasta and excellent mozzarella. A newer Italian concept further down Valley Street worth seeking out.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Jus&rsquo; Tacos</h3>
        <p className="gd-addr">6 Village Plaza &mdash; <a href="https://jus-tacos.com/" className="gd-link" target="_blank" rel="noopener">jus-tacos.com</a></p>
        <p>Simple, fresh tacos at Village Plaza. A local favorite for a quick lunch &mdash; the al pastor and fish tacos are crowd pleasers.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Pandang</h3>
        <p className="gd-addr">8&ndash;12 Village Plaza &mdash; <a href="https://pandangsushi.com/" className="gd-link" target="_blank" rel="noopener">pandangsushi.com</a></p>
        <p>Pan-Asian at Village Plaza covering sushi, noodles, and rice bowls. A convenient weeknight dinner stop.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Ariyoshi</h3>
        <p className="gd-addr">56 S Orange Ave &mdash; <a href="https://ariyoshisushi.com/" className="gd-link" target="_blank" rel="noopener">ariyoshisushi.com</a></p>
        <p>Solid sushi right on South Orange Ave with a cozy neighborhood feel.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Gaslight Brewery &amp; Restaurant</h3>
        <p className="gd-addr">15 S Orange Ave &mdash; <a href="https://gaslightbreweryrestaurant.com/" className="gd-link" target="_blank" rel="noopener">gaslightbreweryrestaurant.com</a></p>
        <p>South Orange&rsquo;s only brewery. House-brewed beers, pub fare, trivia nights, and live music in a large casual space.</p>
      </div>

      <h2 className="gd-h2">Quick Bites &amp; Pizza</h2>
      <ul className="gd-list">
        <li><strong>Village Pizzeria</strong> &mdash; 319 S Orange Ave &mdash; <a href="https://villagepizzeriaoforangeave.com/" className="gd-link" target="_blank" rel="noopener">classic slice shop</a></li>
        <li><strong>El Greco Pizza</strong> &mdash; 404 Irvington Ave &mdash; Greek-style pizza</li>
        <li><strong>La Villa Mexican and Salvadoran Food</strong> &mdash; 261 Irvington Ave &mdash; <a href="https://lavillasouthorange.com/" className="gd-link" target="_blank" rel="noopener">authentic Latin homestyle cooking</a></li>
        <li><strong>Sakura Teriyaki</strong> &mdash; 127 S Orange Ave &mdash; quick Japanese teriyaki and rolls</li>
        <li><strong>J &amp; J Caribbean Restaurant</strong> &mdash; 390 Valley St &mdash; Caribbean homestyle cooking</li>
        <li><strong>Guanaticos</strong> &mdash; 261-A Irvington Ave &mdash; Salvadoran and Central American specialties</li>
      </ul>

      <h2 className="gd-h2">Getting Here</h2>
      <p>
        Almost every restaurant listed is within a 10-minute walk of the South Orange NJ Transit station
        on the Morris &amp; Essex line. Street parking is generally available on Vose Ave, Valley St,
        and Sloan St, especially on weeknights.
      </p>
    </article>
  );
}
"""

THINGS_TO_DO = """\
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Things To Do in South Orange, NJ — Local Guide',
  description: 'The best things to do in South Orange NJ: SOPAC concerts, South Mountain hiking, Hemlock Falls, the walkable downtown, and more.',
};
export default function ThingsToDoPage() {
  return (
    <article className="gd-article">
      <h1 className="gd-h1">Things To Do in South Orange, NJ</h1>
      <p className="gd-lead">
        South Orange packs a lot into a small footprint &mdash; live arts, hiking trails, a walkable downtown,
        and easy access to Essex County&rsquo;s best parks.
      </p>

      <h2 className="gd-h2">Arts &amp; Entertainment</h2>

      <div className="gd-card">
        <h3 className="gd-h3">South Orange Performing Arts Center (SOPAC) <span className="gd-badge">4.6 stars</span></h3>
        <p className="gd-addr">One SOPAC Way &mdash; <a href="https://www.sopacnow.org/" className="gd-link" target="_blank" rel="noopener">sopacnow.org</a></p>
        <p>
          South Orange&rsquo;s cultural anchor. SOPAC hosts national touring acts, comedy, film screenings, dance,
          and community events year-round in a 514-seat theater with excellent acoustics.
          Check the calendar &mdash; there&rsquo;s almost always something good coming up.
        </p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Independent Bookstores</h3>
        <p>South Orange has two beloved indie bookshops within walking distance of each other:</p>
        <ul className="gd-list">
          <li><strong>Noble Hungers</strong> &mdash; 57 S Orange Ave &mdash; <a href="https://noblehungers.com/" className="gd-link" target="_blank" rel="noopener">noblehungers.com</a></li>
          <li><strong>The Chatterbox Books</strong> &mdash; 126 S Orange Ave &mdash; <a href="https://thechatterboxbooks.com/" className="gd-link" target="_blank" rel="noopener">thechatterboxbooks.com</a></li>
        </ul>
        <p>Both host author events and community gatherings &mdash; check their calendars.</p>
      </div>

      <h2 className="gd-h2">Parks &amp; Outdoors</h2>

      <div className="gd-card">
        <h3 className="gd-h3">South Mountain Reservation</h3>
        <p className="gd-addr">~1.8 miles from downtown &mdash; <a href="https://essexcountyparks.org/parks/south-mountain-reservation" className="gd-link" target="_blank" rel="noopener">essexcountyparks.org</a></p>
        <p>
          Over 2,100 acres of Essex County parkland right at South Orange&rsquo;s doorstep. Miles of hiking and
          mountain biking trails, the Rahway River, picnic groves, and sweeping reservoir views.
          Locals run and hike here daily.
        </p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Hemlock Falls</h3>
        <p className="gd-addr">Route 510, South Orange Village</p>
        <p>
          A hidden gem tucked into South Mountain Reservation &mdash; a waterfall accessible via a short hike
          from the South Orange entrance. Popular with families and trail runners. Best after rain.
        </p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Regatta Playground &amp; Waterfront <span className="gd-badge">4.5 stars</span></h3>
        <p className="gd-addr">Cherry Ln, West Orange &mdash; <a href="https://essexcountyparks.org/south-mountain/the-waterfront" className="gd-link" target="_blank" rel="noopener">essexcountyparks.org</a></p>
        <p>A large playground, open field, and reservoir access within South Mountain Reservation. A great half-day outing for families.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Meadowland Park</h3>
        <p className="gd-addr">5 Mead St, South Orange Village</p>
        <p>A central South Orange park &mdash; good for morning walks, pickup games, and outdoor community events.</p>
      </div>

      <h2 className="gd-h2">Explore Downtown</h2>

      <div className="gd-card">
        <h3 className="gd-h3">South Orange Downtown District</h3>
        <p className="gd-addr"><a href="https://www.southorangedowntown.org/" className="gd-link" target="_blank" rel="noopener">southorangedowntown.org</a></p>
        <p>
          The walkable heart of South Orange &mdash; independent restaurants, coffee shops, boutiques, and the
          Village Green. Hosts farmers markets, outdoor concerts, holiday events, and the weekly Village Night Out.
        </p>
      </div>

      <h2 className="gd-h2">Day Trips</h2>

      <div className="gd-card">
        <h3 className="gd-h3">Thomas Edison National Historical Park <span className="gd-badge">4.7 stars</span></h3>
        <p className="gd-addr">211 Main St, West Orange &mdash; ~2.8 miles &mdash; <a href="https://www.nps.gov/edis/index.htm" className="gd-link" target="_blank" rel="noopener">nps.gov/edis</a></p>
        <p>
          One of the most underrated NPS sites in the Northeast. Edison&rsquo;s original lab complex and Glenmont
          estate are remarkably preserved &mdash; the Black Maria (world&rsquo;s first film studio) is here.
          Allow 2&ndash;3 hours. Book timed entry in advance on weekends.
        </p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Cora Hartshorn Arboretum <span className="gd-badge">4.2 stars</span></h3>
        <p className="gd-addr">324 Forest Dr S, Short Hills &mdash; ~3.9 miles &mdash; <a href="https://hartshornarboretum.org/" className="gd-link" target="_blank" rel="noopener">hartshornarboretum.org</a></p>
        <p>A quiet 16.5-acre arboretum and bird sanctuary in Short Hills. Free to visit, great for birding and a gentle wooded walk.</p>
      </div>

      <h2 className="gd-h2">Getting Around</h2>
      <p>
        South Orange is served by NJ Transit&rsquo;s Morris &amp; Essex line with direct service to Penn Station
        NYC (about 45 min). Most downtown activities are within a 5-minute walk of the train station.
        South Mountain Reservation is best reached by car or bike (about 10 minutes from downtown).
      </p>
    </article>
  );
}
"""

BRUNCH = """\
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Best Brunch in South Orange, NJ',
  description: "Where to brunch in South Orange NJ: Bistro d'Azur, THE ORDER, Jackie & Sons, Three Daughters Baking, and the best weekend morning spots.",
};
export default function BrunchPage() {
  return (
    <article className="gd-article">
      <h1 className="gd-h1">Best Brunch in South Orange, NJ</h1>
      <p className="gd-lead">
        South Orange&rsquo;s brunch scene is small but well-curated.
        Here&rsquo;s where locals actually go on weekend mornings.
      </p>

      <div className="gd-card">
        <h3 className="gd-h3">Bistro d&rsquo;Azur <span className="gd-badge">4.7 stars &mdash; Top Pick</span></h3>
        <p className="gd-addr">14 Academy St &mdash; <a href="https://bistrodazur.com/" className="gd-link" target="_blank" rel="noopener">bistrodazur.com</a></p>
        <p>
          The best weekend brunch in South Orange by most accounts. French-Mediterranean dishes &mdash;
          crepes, eggs Benedict with a twist, and excellent pastries. The Academy Street patio is lovely
          on a warm morning. Reservations recommended.
        </p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">THE ORDER</h3>
        <p className="gd-addr">50W S Orange Ave &mdash; <a href="https://theordernj.com/" className="gd-link" target="_blank" rel="noopener">theordernj.com</a></p>
        <p>
          A newer spot with a great coffee program and focused brunch menu &mdash; avocado toast, grain bowls,
          and thoughtful egg dishes. Popular with Seton Hall area residents and young professionals.
        </p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Jackie &amp; Sons</h3>
        <p className="gd-addr">134 S Orange Ave &mdash; <a href="https://jackieandsons.com/" className="gd-link" target="_blank" rel="noopener">jackieandsons.com</a></p>
        <p>Casual American brunch with a neighborhood feel &mdash; pancakes, breakfast sandwiches, and strong coffee. No fuss, always reliable.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Village Diner</h3>
        <p className="gd-addr">1 Sloan St &mdash; <a href="https://thevillagedinerso.com/" className="gd-link" target="_blank" rel="noopener">thevillagedinerso.com</a></p>
        <p>Classic NJ diner brunch seven days a week &mdash; no wait, generous portions, and no ceremony required.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Three Daughters Baking</h3>
        <p className="gd-addr">12 Vose Ave &mdash; <a href="https://threedaughtersbakingco.com/" className="gd-link" target="_blank" rel="noopener">threedaughtersbakingco.com</a></p>
        <p>A bakery-cafe with fresh pastries and light brunch fare. Perfect for a quieter weekend morning with coffee and something freshly baked.</p>
      </div>

      <h2 className="gd-h2">Tips</h2>
      <ul className="gd-list">
        <li>Bistro d&rsquo;Azur fills up fast &mdash; reserve for Saturday/Sunday</li>
        <li>THE ORDER gets busy after 10am on weekends &mdash; go early for a seat</li>
        <li>Parking is easier on Vose Ave and Sloan St than South Orange Ave on weekends</li>
        <li>All spots are walkable from the South Orange NJ Transit station</li>
      </ul>
    </article>
  );
}
"""

BARS = """\
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Bars & Nightlife in South Orange, NJ',
  description: 'The best bars in South Orange NJ: Papillon 25, Gaslight Brewery, Reservoir, Felina Steak, and the Village cocktail scene.',
};
export default function BarsPage() {
  return (
    <article className="gd-article">
      <h1 className="gd-h1">Bars &amp; Nightlife in South Orange, NJ</h1>
      <p className="gd-lead">
        South Orange has a genuinely good bar scene for a small Village &mdash; craft cocktails,
        a local brewery, and spots that actually draw a crowd on weekends.
      </p>

      <div className="gd-card">
        <h3 className="gd-h3">Papillon 25 <span className="gd-badge">Best Cocktails</span></h3>
        <p className="gd-addr">25 Valley St &mdash; bar and restaurant</p>
        <p>
          The cocktail bar in South Orange. Creative rotating drink menu, dimly lit intimate atmosphere,
          and Italian small plates. Gets genuinely lively Friday and Saturday nights.
          No reservations &mdash; arrive before 8pm or expect a wait.
        </p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Gaslight Brewery &amp; Restaurant</h3>
        <p className="gd-addr">15 S Orange Ave &mdash; <a href="https://gaslightbreweryrestaurant.com/" className="gd-link" target="_blank" rel="noopener">gaslightbreweryrestaurant.com</a></p>
        <p>
          South Orange&rsquo;s only craft brewery. House-brewed beers in a large casual space &mdash;
          trivia nights, live music, and sports viewing. The best bet for a large group or casual night out.
        </p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Reservoir</h3>
        <p className="gd-addr">106 W South Orange Ave &mdash; <a href="https://soreservoir.com/" className="gd-link" target="_blank" rel="noopener">soreservoir.com</a></p>
        <p>Italian-American restaurant with a full bar that gets lively after dinner service. A popular weekend nightcap spot.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Felina Steak South Orange</h3>
        <p className="gd-addr">101 S Orange Ave &mdash; <a href="https://bylandmark.com/felina-steak-south-orange" className="gd-link" target="_blank" rel="noopener">bylandmark.com</a></p>
        <p>
          The upscale option &mdash; handcrafted cocktails, an extensive wine list, and a polished atmosphere.
          Great for a pre-dinner drink or a proper cocktail hour.
        </p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Miti Miti</h3>
        <p className="gd-addr">10 Sloan St &mdash; <a href="https://mitimitinj.com/" className="gd-link" target="_blank" rel="noopener">mitimitinj.com</a></p>
        <p>Strong margaritas and sangria. Happy hour deals are among the best in the Village (typically 4&ndash;7pm weekdays).</p>
      </div>

      <h2 className="gd-h2">What to Know</h2>
      <ul className="gd-list">
        <li>South Orange&rsquo;s bar scene winds down around midnight on most nights</li>
        <li>Valley Street (Papillon 25, Toro Loco) has the most concentrated bar energy</li>
        <li>Gaslight Brewery is the best bet for a large group</li>
        <li>Last NJ Transit train to NYC is around midnight &mdash; plan accordingly</li>
      </ul>
    </article>
  );
}
"""

COFFEE = """\
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Best Coffee in South Orange, NJ',
  description: 'The best coffee shops in South Orange NJ: Elitist Coffee, THE ORDER, Three Daughters Baking, Bakes by Izzy, and more.',
};
export default function CoffeePage() {
  return (
    <article className="gd-article">
      <h1 className="gd-h1">Best Coffee in South Orange, NJ</h1>
      <p className="gd-lead">
        South Orange has a small but quality coffee scene &mdash; a specialty roaster, a great cafe-restaurant
        combo, and beloved bakery-cafes.
      </p>

      <div className="gd-card">
        <h3 className="gd-h3">Elitist Coffee <span className="gd-badge">Specialty Roaster</span></h3>
        <p className="gd-addr">154 Valley St (Upper Level) &mdash; <a href="https://elitistcoffee.com/" className="gd-link" target="_blank" rel="noopener">elitistcoffee.com</a></p>
        <p>
          South Orange&rsquo;s specialty coffee destination. Single-origin roasts, precision brewing, and a space
          that attracts serious coffee drinkers. Tucked upstairs on Valley Street &mdash; a bit of a find,
          which is part of the appeal. If you care about your coffee, start here.
        </p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">THE ORDER</h3>
        <p className="gd-addr">50W S Orange Ave &mdash; <a href="https://theordernj.com/" className="gd-link" target="_blank" rel="noopener">theordernj.com</a></p>
        <p>
          Excellent espresso drinks alongside a focused food menu. A modern cafe atmosphere &mdash; good for working
          a few hours, meeting for breakfast, or grabbing a strong latte before the train.
        </p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Three Daughters Baking</h3>
        <p className="gd-addr">12 Vose Ave &mdash; <a href="https://threedaughtersbakingco.com/" className="gd-link" target="_blank" rel="noopener">threedaughtersbakingco.com</a></p>
        <p>Excellent pastries and solid coffee. The combination of a fresh croissant and a cappuccino on a weekend morning has a devoted local following.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Bakes by Izzy</h3>
        <p className="gd-addr">108 W South Orange Ave &mdash; <a href="https://bakesbyizzy.com/" className="gd-link" target="_blank" rel="noopener">bakesbyizzy.com</a></p>
        <p>A beloved local bakery known for custom cakes and pastries, with coffee service alongside.</p>
      </div>

      <div className="gd-card">
        <h3 className="gd-h3">Cait &amp; Abby&rsquo;s Bakery</h3>
        <p className="gd-addr">15 Sloan St &mdash; <a href="https://caitandabbys.com/" className="gd-link" target="_blank" rel="noopener">caitandabbys.com</a></p>
        <p>Community bakery on Sloan Street with beautiful baked goods and coffee. A neighborhood staple.</p>
      </div>

      <h2 className="gd-h2">Tips</h2>
      <ul className="gd-list">
        <li>Elitist Coffee: the pick for serious specialty coffee &mdash; lighter roasts, precise technique</li>
        <li>THE ORDER: best for a full cafe experience (food plus coffee in one stop)</li>
        <li>Three Daughters and the bakeries fill up fast on weekend mornings &mdash; arrive by 9am</li>
        <li>All locations are walkable from the South Orange NJ Transit station</li>
      </ul>
    </article>
  );
}
"""

DATE_NIGHT = """\
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Best Date Night Ideas in South Orange, NJ',
  description: "The best date night ideas in South Orange NJ: dinner at Bistro d'Azur, cocktails at Papillon 25, a SOPAC show, and more.",
};
export default function DateNightPage() {
  return (
    <article className="gd-article">
      <h1 className="gd-h1">Best Date Night in South Orange, NJ</h1>
      <p className="gd-lead">
        South Orange is a genuinely great date night destination &mdash; walkable, charming, and with enough
        variety to put together a great evening. Here are the best combinations.
      </p>

      <h2 className="gd-h2">The Classic Evening</h2>
      <div className="gd-card">
        <h3 className="gd-h3">Dinner at Bistro d&rsquo;Azur</h3>
        <p className="gd-addr">14 Academy St &mdash; <a href="https://bistrodazur.com/" className="gd-link" target="_blank" rel="noopener">bistrodazur.com</a></p>
        <p>
          South Orange&rsquo;s best restaurant (4.7 stars). French-Mediterranean cooking, a curated wine list,
          and a candlelit atmosphere. After dinner, walk the Village Green and catch the street scene on
          South Orange Ave.
        </p>
      </div>

      <h2 className="gd-h2">Arts + Dinner</h2>
      <div className="gd-card">
        <h3 className="gd-h3">SOPAC Show + Late Dinner</h3>
        <p className="gd-addr"><a href="https://www.sopacnow.org/" className="gd-link" target="_blank" rel="noopener">sopacnow.org</a></p>
        <p>
          Check SOPAC&rsquo;s calendar for a show that interests you &mdash; concerts, comedy, and dance all work.
          Dinner before at Giorgio&rsquo;s or Village Trattoria, or cocktails at Papillon 25 after.
          The whole evening stays within a 5-minute walk.
        </p>
      </div>

      <h2 className="gd-h2">Upscale Option</h2>
      <div className="gd-card">
        <h3 className="gd-h3">Felina Steak South Orange</h3>
        <p className="gd-addr">101 S Orange Ave &mdash; <a href="https://bylandmark.com/felina-steak-south-orange" className="gd-link" target="_blank" rel="noopener">bylandmark.com</a></p>
        <p>The splurge option &mdash; a proper steakhouse with white-tablecloth service, prime cuts, and excellent cocktails. Good for a special occasion.</p>
      </div>

      <h2 className="gd-h2">Cocktails &amp; Small Plates</h2>
      <div className="gd-card">
        <h3 className="gd-h3">Papillon 25</h3>
        <p className="gd-addr">25 Valley St &mdash; bar and restaurant</p>
        <p>
          Valley Street&rsquo;s best cocktail bar. Intimate atmosphere, creative drinks, and Italian small plates.
          Works as a first stop before dinner or as the main event for a lighter evening.
        </p>
      </div>

      <h2 className="gd-h2">Outdoor Date</h2>
      <div className="gd-card">
        <h3 className="gd-h3">South Mountain Hike + Brunch or Dinner</h3>
        <p>
          South Mountain Reservation is minutes from downtown &mdash; hike to Hemlock Falls, explore the
          reservoir trails, then grab brunch at Bistro d&rsquo;Azur or dinner at Giorgio&rsquo;s.
          A classic South Orange Saturday.
        </p>
      </div>

      <h2 className="gd-h2">Quick Tips</h2>
      <ul className="gd-list">
        <li>Reserve Bistro d&rsquo;Azur and Felina in advance &mdash; both fill up on weekends</li>
        <li>Papillon 25 takes no reservations &mdash; arrive by 7pm on weekends for a seat</li>
        <li>SOPAC tickets sell quickly for popular shows &mdash; buy online ahead of time</li>
        <li>Everything listed is a short walk from South Orange NJ Transit station</li>
      </ul>
    </article>
  );
}
"""

FILES = {
    "app/guides/restaurants/page.tsx":        RESTAURANTS,
    "app/guides/things-to-do/page.tsx":        THINGS_TO_DO,
    "app/guides/brunch-south-orange/page.tsx": BRUNCH,
    "app/guides/bars-south-orange/page.tsx":   BARS,
    "app/guides/coffee-south-orange/page.tsx": COFFEE,
    "app/guides/date-night-south-orange/page.tsx": DATE_NIGHT,
}

for rel, content in FILES.items():
    path = BASE / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)
    print(f"  wrote {rel}")

print("\nAll done! Run: npm run dev")
