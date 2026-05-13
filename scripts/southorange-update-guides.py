#!/usr/bin/env python3
"""Update SouthOrange.com guide pages with real local business data — plain Tailwind classes."""
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
    <article className="mx-auto max-w-2xl px-6 py-14 md:py-20">
      <h1 className="font-serif font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight tracking-tight mb-4">
        Best Restaurants in South Orange, NJ
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        South Orange Village packs an impressive restaurant scene into a walkable downtown. Here&rsquo;s where locals eat.
      </p>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Top-Rated Spots</h2>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Bistro d&rsquo;Azur <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">4.7 stars</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">14 Academy St &mdash; <a href="https://bistrodazur.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">bistrodazur.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">South Orange&rsquo;s most celebrated table. French-Mediterranean cooking in a charming Academy Street setting &mdash; perfect for date night or weekend brunch. Reservations recommended.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Giorgio&rsquo;s Restaurant <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">4.3 stars</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">52 Vose Ave &mdash; <a href="https://giorgiosristorante.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">giorgiosristorante.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">A neighborhood Italian staple. Solid red-sauce classics and a warm, old-school atmosphere that keeps regulars coming back year after year.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Harusame Japanese Cuisine <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">4.2 stars</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">63 Academy St &mdash; <a href="https://harusamesushinj.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">harusamesushinj.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">The go-to for sushi in South Orange. Fresh rolls, nigiri, and Japanese staples in a relaxed setting. Great lunch specials too.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Village Trattoria <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">4.1 stars</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">21 S Orange Ave &mdash; <a href="https://villagetrattoria.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">villagetrattoria.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Right on the main drag &mdash; Italian comfort food, thin-crust pizza, and classic antipasti. A reliable go-to for casual family dinners.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Reservoir <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">3.9 stars</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">106 W South Orange Ave &mdash; <a href="https://soreservoir.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">soreservoir.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Italian-American fare and cocktails in a lively neighborhood spot. The bar gets busy on weekends &mdash; good for groups.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Toro Loco <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">3.8 stars</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">23 Valley St &mdash; <a href="https://toroloco.net/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">toroloco.net</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Affordable Mexican on Valley Street &mdash; tacos, burritos, and margaritas without a wait. A solid casual pick.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">More Local Favorites</h2>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Papillon 25</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">25 Valley St &mdash; bar and restaurant</p>
        <p className="text-gray-600 text-sm leading-relaxed">Valley Street&rsquo;s best cocktail bar with Italian small plates. Creative drink menu, intimate vibe, genuinely lively on Friday and Saturday nights.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Felina Steak South Orange</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">101 S Orange Ave &mdash; <a href="https://bylandmark.com/felina-steak-south-orange" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">bylandmark.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">South Orange&rsquo;s upscale splurge. Prime cuts, handcrafted cocktails, and white-tablecloth service from the Landmark Hospitality group.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Miti Miti</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">10 Sloan St &mdash; <a href="https://mitimitinj.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">mitimitinj.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Lively Latin-fusion with strong margaritas and shareable plates. One of the best happy hour deals in the Village (typically 4&ndash;7pm weekdays).</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Village Diner</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">1 Sloan St &mdash; <a href="https://thevillagedinerso.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">thevillagedinerso.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Classic NJ diner open early every day. Generous portions, no wait, and a menu that runs from eggs Benedict to late-night burgers.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Jackie &amp; Sons</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">134 S Orange Ave &mdash; <a href="https://jackieandsons.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">jackieandsons.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Casual American comfort food and weekend brunch. The burger and weekend egg dishes get strong local reviews.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">mozzarella</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">396 Valley St &mdash; <a href="https://mozzarellaso.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">mozzarellaso.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Fresh pasta and excellent mozzarella. A newer Italian concept further down Valley Street worth seeking out.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Jus&rsquo; Tacos</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">6 Village Plaza &mdash; <a href="https://jus-tacos.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">jus-tacos.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Simple, fresh tacos at Village Plaza. The al pastor and fish tacos are crowd pleasers.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Ariyoshi</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">56 S Orange Ave &mdash; <a href="https://ariyoshisushi.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">ariyoshisushi.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Solid sushi right on South Orange Ave with a cozy neighborhood feel.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Gaslight Brewery &amp; Restaurant</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">15 S Orange Ave &mdash; <a href="https://gaslightbreweryrestaurant.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">gaslightbreweryrestaurant.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">South Orange&rsquo;s only brewery. House-brewed beers, pub fare, trivia nights, and live music in a large casual space.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Quick Bites &amp; Pizza</h2>
      <ul className="pl-5 space-y-2 list-disc">
        <li className="text-gray-600 text-sm leading-relaxed"><strong className="text-gray-900">Village Pizzeria</strong> &mdash; 319 S Orange Ave &mdash; <a href="https://villagepizzeriaoforangeave.com/" className="text-green-800 underline underline-offset-2" target="_blank" rel="noopener">classic slice shop</a></li>
        <li className="text-gray-600 text-sm leading-relaxed"><strong className="text-gray-900">El Greco Pizza</strong> &mdash; 404 Irvington Ave &mdash; Greek-style pizza</li>
        <li className="text-gray-600 text-sm leading-relaxed"><strong className="text-gray-900">La Villa Mexican and Salvadoran Food</strong> &mdash; 261 Irvington Ave &mdash; <a href="https://lavillasouthorange.com/" className="text-green-800 underline underline-offset-2" target="_blank" rel="noopener">authentic Latin homestyle cooking</a></li>
        <li className="text-gray-600 text-sm leading-relaxed"><strong className="text-gray-900">Sakura Teriyaki</strong> &mdash; 127 S Orange Ave &mdash; quick Japanese teriyaki and rolls</li>
        <li className="text-gray-600 text-sm leading-relaxed"><strong className="text-gray-900">J &amp; J Caribbean Restaurant</strong> &mdash; 390 Valley St &mdash; Caribbean homestyle cooking</li>
        <li className="text-gray-600 text-sm leading-relaxed"><strong className="text-gray-900">Guanaticos</strong> &mdash; 261-A Irvington Ave &mdash; Salvadoran and Central American specialties</li>
      </ul>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-4 pb-2 border-b-2 border-green-200">Getting Here</h2>
      <p className="text-gray-600 text-sm leading-relaxed">
        Almost every restaurant listed is within a 10-minute walk of the South Orange NJ Transit station on the Morris &amp; Essex line.
        Street parking is generally available on Vose Ave, Valley St, and Sloan St, especially on weeknights.
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
    <article className="mx-auto max-w-2xl px-6 py-14 md:py-20">
      <h1 className="font-serif font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight tracking-tight mb-4">
        Things To Do in South Orange, NJ
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        South Orange packs a lot into a small footprint &mdash; live arts, hiking trails, a walkable downtown, and easy access to Essex County&rsquo;s best parks.
      </p>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Arts &amp; Entertainment</h2>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">South Orange Performing Arts Center (SOPAC) <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">4.6 stars</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">One SOPAC Way &mdash; <a href="https://www.sopacnow.org/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">sopacnow.org</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">South Orange&rsquo;s cultural anchor. SOPAC hosts national touring acts, comedy, film screenings, dance, and community events year-round in a 514-seat theater with excellent acoustics. Check the calendar &mdash; there&rsquo;s almost always something good coming up.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-2">Independent Bookstores</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">South Orange has two beloved indie bookshops within walking distance of each other:</p>
        <ul className="pl-5 space-y-2 list-disc">
          <li className="text-gray-600 text-sm"><strong className="text-gray-900">Noble Hungers</strong> &mdash; 57 S Orange Ave &mdash; <a href="https://noblehungers.com/" className="text-green-800 underline underline-offset-2" target="_blank" rel="noopener">noblehungers.com</a></li>
          <li className="text-gray-600 text-sm"><strong className="text-gray-900">The Chatterbox Books</strong> &mdash; 126 S Orange Ave &mdash; <a href="https://thechatterboxbooks.com/" className="text-green-800 underline underline-offset-2" target="_blank" rel="noopener">thechatterboxbooks.com</a></li>
        </ul>
        <p className="text-gray-600 text-sm leading-relaxed mt-3">Both host author events and community gatherings &mdash; check their calendars.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Parks &amp; Outdoors</h2>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">South Mountain Reservation</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">~1.8 miles from downtown &mdash; <a href="https://essexcountyparks.org/parks/south-mountain-reservation" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">essexcountyparks.org</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Over 2,100 acres of Essex County parkland right at South Orange&rsquo;s doorstep. Miles of hiking and mountain biking trails, the Rahway River, picnic groves, and sweeping reservoir views. Locals run and hike here daily.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Hemlock Falls</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Route 510, South Orange Village</p>
        <p className="text-gray-600 text-sm leading-relaxed">A hidden gem tucked into South Mountain Reservation &mdash; a waterfall accessible via a short hike from the South Orange entrance. Popular with families and trail runners. Best after rain.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Regatta Playground &amp; Waterfront <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">4.5 stars</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cherry Ln, West Orange &mdash; <a href="https://essexcountyparks.org/south-mountain/the-waterfront" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">essexcountyparks.org</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">A large playground, open field, and reservoir access within South Mountain Reservation. A great half-day outing for families.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Meadowland Park</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">5 Mead St, South Orange Village</p>
        <p className="text-gray-600 text-sm leading-relaxed">A central South Orange park &mdash; good for morning walks, pickup games, and outdoor community events.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Explore Downtown</h2>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">South Orange Downtown District</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2"><a href="https://www.southorangedowntown.org/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">southorangedowntown.org</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">The walkable heart of South Orange &mdash; independent restaurants, coffee shops, boutiques, and the Village Green. Hosts farmers markets, outdoor concerts, holiday events, and the weekly Village Night Out.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Day Trips</h2>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Thomas Edison National Historical Park <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">4.7 stars</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">211 Main St, West Orange &mdash; ~2.8 miles &mdash; <a href="https://www.nps.gov/edis/index.htm" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">nps.gov/edis</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">One of the most underrated NPS sites in the Northeast. Edison&rsquo;s original lab complex and Glenmont estate are remarkably preserved &mdash; the Black Maria (world&rsquo;s first film studio) is here. Allow 2&ndash;3 hours.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Cora Hartshorn Arboretum <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">4.2 stars</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">324 Forest Dr S, Short Hills &mdash; ~3.9 miles &mdash; <a href="https://hartshornarboretum.org/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">hartshornarboretum.org</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">A quiet 16.5-acre arboretum and bird sanctuary in Short Hills. Free to visit, great for birding and a gentle wooded walk.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-4 pb-2 border-b-2 border-green-200">Getting Around</h2>
      <p className="text-gray-600 text-sm leading-relaxed">
        South Orange is served by NJ Transit&rsquo;s Morris &amp; Essex line with direct service to Penn Station NYC (about 45 min).
        Most downtown activities are within a 5-minute walk of the train station.
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
    <article className="mx-auto max-w-2xl px-6 py-14 md:py-20">
      <h1 className="font-serif font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight tracking-tight mb-4">
        Best Brunch in South Orange, NJ
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        South Orange&rsquo;s brunch scene is small but well-curated. Here&rsquo;s where locals actually go on weekend mornings.
      </p>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Bistro d&rsquo;Azur <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">4.7 stars &mdash; Top Pick</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">14 Academy St &mdash; <a href="https://bistrodazur.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">bistrodazur.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">The best weekend brunch in South Orange by most accounts. French-Mediterranean dishes &mdash; crepes, eggs Benedict with a twist, and excellent pastries. The Academy Street patio is lovely on a warm morning. Reservations recommended.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">THE ORDER</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">50W S Orange Ave &mdash; <a href="https://theordernj.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">theordernj.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">A newer spot with a great coffee program and focused brunch menu &mdash; avocado toast, grain bowls, and thoughtful egg dishes. Popular with Seton Hall area residents and young professionals.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Jackie &amp; Sons</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">134 S Orange Ave &mdash; <a href="https://jackieandsons.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">jackieandsons.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Casual American brunch with a neighborhood feel &mdash; pancakes, breakfast sandwiches, and strong coffee. No fuss, always reliable.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Village Diner</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">1 Sloan St &mdash; <a href="https://thevillagedinerso.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">thevillagedinerso.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Classic NJ diner brunch seven days a week &mdash; no wait, generous portions, and no ceremony required.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Three Daughters Baking</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">12 Vose Ave &mdash; <a href="https://threedaughtersbakingco.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">threedaughtersbakingco.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">A bakery-cafe with fresh pastries and light brunch fare. Perfect for a quieter weekend morning with coffee and something freshly baked.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Tips</h2>
      <ul className="pl-5 space-y-2 list-disc">
        <li className="text-gray-600 text-sm leading-relaxed">Bistro d&rsquo;Azur fills up fast &mdash; reserve for Saturday/Sunday</li>
        <li className="text-gray-600 text-sm leading-relaxed">THE ORDER gets busy after 10am on weekends &mdash; go early for a seat</li>
        <li className="text-gray-600 text-sm leading-relaxed">Parking is easier on Vose Ave and Sloan St than South Orange Ave on weekends</li>
        <li className="text-gray-600 text-sm leading-relaxed">All spots are walkable from the South Orange NJ Transit station</li>
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
    <article className="mx-auto max-w-2xl px-6 py-14 md:py-20">
      <h1 className="font-serif font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight tracking-tight mb-4">
        Bars &amp; Nightlife in South Orange, NJ
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        South Orange has a genuinely good bar scene for a small Village &mdash; craft cocktails, a local brewery, and spots that actually draw a crowd on weekends.
      </p>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Papillon 25 <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">Best Cocktails</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">25 Valley St &mdash; bar and restaurant</p>
        <p className="text-gray-600 text-sm leading-relaxed">The cocktail bar in South Orange. Creative rotating drink menu, dimly lit intimate atmosphere, and Italian small plates. Gets genuinely lively Friday and Saturday nights. No reservations &mdash; arrive before 8pm or expect a wait.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Gaslight Brewery &amp; Restaurant</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">15 S Orange Ave &mdash; <a href="https://gaslightbreweryrestaurant.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">gaslightbreweryrestaurant.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">South Orange&rsquo;s only craft brewery. House-brewed beers in a large casual space &mdash; trivia nights, live music, and sports viewing. The best bet for a large group or casual night out.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Reservoir</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">106 W South Orange Ave &mdash; <a href="https://soreservoir.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">soreservoir.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Italian-American restaurant with a full bar that gets lively after dinner service. A popular weekend nightcap spot.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Felina Steak South Orange</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">101 S Orange Ave &mdash; <a href="https://bylandmark.com/felina-steak-south-orange" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">bylandmark.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">The upscale option &mdash; handcrafted cocktails, extensive wine list, and a polished atmosphere. Great for a pre-dinner drink or a proper cocktail hour.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Miti Miti</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">10 Sloan St &mdash; <a href="https://mitimitinj.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">mitimitinj.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Strong margaritas and sangria. Happy hour deals are among the best in the Village (typically 4&ndash;7pm weekdays).</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">What to Know</h2>
      <ul className="pl-5 space-y-2 list-disc">
        <li className="text-gray-600 text-sm leading-relaxed">South Orange&rsquo;s bar scene winds down around midnight on most nights</li>
        <li className="text-gray-600 text-sm leading-relaxed">Valley Street (Papillon 25, Toro Loco) has the most concentrated bar energy</li>
        <li className="text-gray-600 text-sm leading-relaxed">Gaslight Brewery is the best bet for a large group</li>
        <li className="text-gray-600 text-sm leading-relaxed">Last NJ Transit train to NYC is around midnight &mdash; plan accordingly</li>
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
    <article className="mx-auto max-w-2xl px-6 py-14 md:py-20">
      <h1 className="font-serif font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight tracking-tight mb-4">
        Best Coffee in South Orange, NJ
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        South Orange has a small but quality coffee scene &mdash; a specialty roaster, a great cafe-restaurant combo, and beloved bakery-cafes.
      </p>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Elitist Coffee <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 ml-1">Specialty Roaster</span></h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">154 Valley St (Upper Level) &mdash; <a href="https://elitistcoffee.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">elitistcoffee.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">South Orange&rsquo;s specialty coffee destination. Single-origin roasts, precision brewing, and a space that attracts serious coffee drinkers. Tucked upstairs on Valley Street &mdash; a bit of a find, which is part of the appeal.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">THE ORDER</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">50W S Orange Ave &mdash; <a href="https://theordernj.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">theordernj.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Excellent espresso drinks alongside a focused food menu. A modern cafe atmosphere &mdash; good for working a few hours, meeting for breakfast, or grabbing a strong latte before the train.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Three Daughters Baking</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">12 Vose Ave &mdash; <a href="https://threedaughtersbakingco.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">threedaughtersbakingco.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Excellent pastries and solid coffee. The combination of a fresh croissant and a cappuccino on a weekend morning has a devoted local following.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Bakes by Izzy</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">108 W South Orange Ave &mdash; <a href="https://bakesbyizzy.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">bakesbyizzy.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">A beloved local bakery known for custom cakes and pastries, with coffee service alongside.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Cait &amp; Abby&rsquo;s Bakery</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">15 Sloan St &mdash; <a href="https://caitandabbys.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">caitandabbys.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Community bakery on Sloan Street with beautiful baked goods and coffee. A neighborhood staple.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Tips</h2>
      <ul className="pl-5 space-y-2 list-disc">
        <li className="text-gray-600 text-sm leading-relaxed">Elitist Coffee: the pick for serious specialty coffee &mdash; lighter roasts, precise technique</li>
        <li className="text-gray-600 text-sm leading-relaxed">THE ORDER: best for a full cafe experience (food plus coffee in one stop)</li>
        <li className="text-gray-600 text-sm leading-relaxed">Three Daughters and the bakeries fill up fast on weekend mornings &mdash; arrive by 9am</li>
        <li className="text-gray-600 text-sm leading-relaxed">All locations are walkable from the South Orange NJ Transit station</li>
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
    <article className="mx-auto max-w-2xl px-6 py-14 md:py-20">
      <h1 className="font-serif font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight tracking-tight mb-4">
        Best Date Night in South Orange, NJ
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        South Orange is a genuinely great date night destination &mdash; walkable, charming, and with enough variety to put together a great evening.
      </p>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-4 mb-5 pb-2 border-b-2 border-green-200">The Classic Evening</h2>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Dinner at Bistro d&rsquo;Azur</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">14 Academy St &mdash; <a href="https://bistrodazur.com/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">bistrodazur.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">South Orange&rsquo;s best restaurant (4.7 stars). French-Mediterranean cooking, curated wine list, and candlelit atmosphere. After dinner, walk the Village Green and catch the street scene on South Orange Ave.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Arts + Dinner</h2>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">SOPAC Show + Late Dinner</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2"><a href="https://www.sopacnow.org/" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">sopacnow.org</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">Check SOPAC&rsquo;s calendar for a show that interests you &mdash; concerts, comedy, and dance all work. Dinner before at Giorgio&rsquo;s or Village Trattoria, or cocktails at Papillon 25 after. The whole evening stays within a 5-minute walk.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Upscale Option</h2>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Felina Steak South Orange</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">101 S Orange Ave &mdash; <a href="https://bylandmark.com/felina-steak-south-orange" className="text-green-800 underline underline-offset-2 hover:text-green-600" target="_blank" rel="noopener">bylandmark.com</a></p>
        <p className="text-gray-600 text-sm leading-relaxed">The splurge option &mdash; a proper steakhouse with white-tablecloth service, prime cuts, and excellent cocktails. Good for a special occasion.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Cocktails &amp; Small Plates</h2>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Papillon 25</h3>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">25 Valley St &mdash; bar and restaurant</p>
        <p className="text-gray-600 text-sm leading-relaxed">Valley Street&rsquo;s best cocktail bar. Intimate atmosphere, creative drinks, and Italian small plates. Works as a first stop before dinner or as the main event for a lighter evening.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Outdoor Date</h2>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">South Mountain Hike + Brunch or Dinner</h3>
        <p className="text-gray-600 text-sm leading-relaxed">South Mountain Reservation is minutes from downtown &mdash; hike to Hemlock Falls, explore the reservoir trails, then grab brunch at Bistro d&rsquo;Azur or dinner at Giorgio&rsquo;s. A classic South Orange Saturday.</p>
      </div>

      <h2 className="font-serif font-bold text-2xl text-green-800 mt-12 mb-5 pb-2 border-b-2 border-green-200">Quick Tips</h2>
      <ul className="pl-5 space-y-2 list-disc">
        <li className="text-gray-600 text-sm leading-relaxed">Reserve Bistro d&rsquo;Azur and Felina in advance &mdash; both fill up on weekends</li>
        <li className="text-gray-600 text-sm leading-relaxed">Papillon 25 takes no reservations &mdash; arrive by 7pm on weekends for a seat</li>
        <li className="text-gray-600 text-sm leading-relaxed">SOPAC tickets sell quickly for popular shows &mdash; buy online ahead of time</li>
        <li className="text-gray-600 text-sm leading-relaxed">Everything listed is a short walk from South Orange NJ Transit station</li>
      </ul>
    </article>
  );
}
"""

FILES = {
    "app/guides/restaurants/page.tsx":           RESTAURANTS,
    "app/guides/things-to-do/page.tsx":           THINGS_TO_DO,
    "app/guides/brunch-south-orange/page.tsx":    BRUNCH,
    "app/guides/bars-south-orange/page.tsx":      BARS,
    "app/guides/coffee-south-orange/page.tsx":    COFFEE,
    "app/guides/date-night-south-orange/page.tsx": DATE_NIGHT,
}

for rel, content in FILES.items():
    path = BASE / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)
    print(f"  wrote {rel}")

print("\nAll done! Restart npm run dev if needed.")
