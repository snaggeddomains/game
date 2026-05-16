import '../so-guide.css';

export const metadata = {
  title: 'South Orange, NJ with Kids | Family Guide | SouthOrange.com',
  description:
    'Everything families need to know about raising kids in South Orange, NJ — from the Fairy Trail and community pool to schools, parks, and the best local activities for children of all ages.',
  openGraph: {
    title: 'South Orange, NJ with Kids | Family Guide',
    description:
      "From the magical Fairy Trail to Olympic-size pool and top-rated schools, South Orange is one of NJ's great towns for families.",
    url: 'https://southorange.com/guides/south-orange-with-kids',
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
      name: 'Is South Orange, NJ a good place to raise kids?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. South Orange is widely regarded as one of the best towns in New Jersey for families. It offers walkable streets, excellent parks, a highly regarded K-12 school district (SOMSD), a free resident community pool, and a tight-knit, diverse community with active parent networks and neighborhood associations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Fairy Trail in South Orange?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Fairy Trail is a beloved family attraction inside South Mountain Reservation. It features dozens of hand-crafted fairy doors placed at the bases of trees along a gentle woodland path, creating a whimsical, magical experience especially popular with young children. It is free, open year-round, and accessible from multiple trailheads.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are the public schools in South Orange?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'South Orange is part of the South Orange-Maplewood School District (SOMSD), a well-regarded K-12 district known for its diversity, strong arts programs, and academic outcomes. There are six elementary schools in South Orange, and placement is based on home address. See our full Schools Guide for details.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the South Orange community pool free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. South Orange residents have free access to the community pool, which is Olympic-size and open from Memorial Day through Labor Day. It is a major summer gathering spot for families and one of the most-cited perks of living in town.',
      },
    },
  ],
};

const activities = [
  {
    emoji: '🧚',
    name: 'The Fairy Trail',
    location: 'South Mountain Reservation',
    ages: 'Ages 2–10',
    description:
      'Dozens of hand-crafted fairy doors nestle at the bases of trees along a gentle woodland path. Pure magic for little ones — plan 30–60 minutes and let them discover each door at their own pace.',
    tip: 'Park at the Crest Drive trailhead. Bring a magnifying glass to spot tiny details on each door.',
  },
  {
    emoji: '🏊',
    name: 'Community Pool',
    location: 'South Orange',
    ages: 'All ages',
    description:
      'An Olympic-size outdoor pool open to all South Orange residents at no charge, Memorial Day through Labor Day. Lifeguards on duty, shallow sections for toddlers, and a social scene that defines summer in town.',
    tip: 'Arrive early on hot weekends — it fills up fast. Bring a cooler; there\'s a shaded picnic area.',
  },
  {
    emoji: '🌳',
    name: 'Spiotta Park',
    location: 'Downtown South Orange',
    ages: 'All ages',
    description:
      'The central green in the heart of downtown, Spiotta Park is the town\'s outdoor living room. Families spread out on the lawn, kids play, and it hosts farmers markets, concerts, and community events throughout the year.',
    tip: 'Grab a coffee from a nearby café and let the kids run — the park is enclosed enough to relax.',
  },
  {
    emoji: '🎭',
    name: 'CAPAS Arts & Drama',
    location: '128 Irvington Ave',
    ages: 'Ages 3+',
    description:
      'A beloved community arts studio offering drama, visual arts, and creative programs for kids starting at age 3. After-school classes, weekend workshops, and summer camps make it a South Orange family staple.',
    tip: 'Summer camps fill quickly — sign up in the spring. After-school spots open in August for the fall session.',
  },
  {
    emoji: '📚',
    name: 'South Orange Public Library',
    location: '298 Walton Ave (interim location)',
    ages: 'All ages',
    description:
      'Story time, STEM activities, craft programs, and a robust collection of children\'s books. The library runs free programming throughout the year and is a cornerstone of the family community in town.',
    tip: 'Check the library\'s calendar online — popular story times book up. The staff are wonderful with young kids.',
  },
  {
    emoji: '🎃',
    name: 'Spooky Spiotta',
    location: 'Spiotta Park, October',
    ages: 'All ages',
    description:
      'South Orange\'s beloved annual Halloween celebration at Spiotta Park draws thousands of costumed kids and families. Costume contest, activities, and the full community out in force — one of the most festive nights of the year.',
    tip: 'Arrive before the costume contest starts. The energy is electric and the crowd is enormous.',
  },
  {
    emoji: '⚾',
    name: 'Cameron Field',
    location: 'South Orange',
    ages: 'Ages 4+',
    description:
      'Baseball diamonds, soccer fields, and tennis courts anchor this multi-sport complex. Youth leagues in baseball, soccer, and more operate through the South Orange Recreation Department, giving kids structured team experience close to home.',
    tip: 'Register for youth leagues through the South Orange Rec Department — seasons fill fast, especially spring baseball.',
  },
  {
    emoji: '🥾',
    name: 'South Mountain Reservation',
    location: 'Accessible from multiple neighborhoods',
    ages: 'All ages',
    description:
      '26+ miles of trails, Hemlock Falls waterfall, a dog park, and forest that feels a world away from the suburbs — all accessible directly from South Orange neighborhoods. Perfect for introducing kids to hiking.',
    tip: 'The Hemlock Falls hike is manageable for kids 5+ and delivers a real payoff. Dogs welcome on most trails.',
  },
  {
    emoji: '🏀',
    name: 'Seton Hall Basketball',
    location: 'Prudential Center / Walsh Gymnasium',
    ages: 'Ages 5+',
    description:
      'Division I college basketball right in your backyard. Seton Hall Pirates games — especially at the Prudential Center in Newark — make a great family outing with real big-game energy and kid-friendly atmosphere.',
    tip: 'Home games at Walsh Gymnasium on campus are an easy walk from many South Orange neighborhoods.',
  },
  {
    emoji: '🏛️',
    name: 'Baird Community Center',
    location: 'South Orange',
    ages: 'All ages',
    description:
      'The Baird is the hub for recreational classes and youth programs in South Orange. From gymnastics to martial arts to seasonal camps, it offers year-round programming that keeps kids active and engaged.',
    tip: 'Programs book quickly — check the South Orange Recreation Department\'s seasonal catalog when it drops.',
  },
];

const whyFamilies = [
  {
    emoji: '🚶',
    heading: 'Genuinely Walkable',
    body: 'Kids can walk to school, to the library, to the park, and downtown for ice cream — all without a car. That independence is increasingly rare in NJ suburbs and families consistently cite it as a top reason they chose South Orange.',
  },
  {
    emoji: '🤝',
    heading: 'Strong, Active Community',
    body: 'South Orange has active neighborhood associations, engaged parent groups, and a culture of showing up. Neighbors know each other. Community events like Spooky Spiotta and farmers markets are well-attended. New families get welcomed in quickly.',
  },
  {
    emoji: '🚆',
    heading: 'NYC 35 Minutes Away',
    body: 'Direct NJ Transit trains from South Orange Village put Manhattan about 35 minutes away — close enough for regular cultural trips to museums, shows, and sporting events that enrich family life without a car or a long commute.',
  },
  {
    emoji: '🌍',
    heading: 'Diverse and Welcoming',
    body: 'South Orange and the broader SOMSD district are genuinely diverse in race, background, and family structure. Kids grow up alongside peers from many walks of life, which families find both meaningful and rare in the NJ suburb landscape.',
  },
];

const relatedGuides = [
  { label: 'Schools Guide', href: '/guides/schools-south-orange' },
  { label: 'Things To Do', href: '/guides/things-to-do' },
  { label: 'South Mountain Reservation', href: '/guides/south-mountain-reservation' },
  { label: 'Moving to South Orange', href: '/guides/moving-to' },
];

const colors = {
  bg: '#FAF8F3',
  darkGreen: '#2D5016',
  gold: '#E8BE5A',
  sage: '#A8CC78',
  stone: '#E5DDD0',
  textDark: '#1a1a1a',
  textMid: '#444',
  white: '#ffffff',
};

export default function SouthOrangeWithKidsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ backgroundColor: colors.bg, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: colors.textDark }}>

        {/* Nav */}
        <nav style={{ background: colors.darkGreen, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <a href="/" style={{ color: colors.gold, fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 18, textDecoration: 'none' }}>
            SouthOrange.com
          </a>
          <div className="so-nav-links">
            <a href="/guides/restaurants" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Dining</a>
            <a href="/guides/things-to-do" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Things To Do</a>
            <a href="/guides/moving-to" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Moving Here</a>
            <a href="/guides/compare-towns" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Compare Towns</a>
            <a href="/" style={{ color: '#C8D9B0', fontSize: 14, textDecoration: 'none' }}>Home</a>
          </div>
        </nav>

        {/* Hero */}
        <section
          style={{
            backgroundColor: colors.darkGreen,
            color: colors.white,
            padding: '72px 24px 60px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px', lineHeight: 1 }}>🧒</div>
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              margin: '0 0 16px',
              lineHeight: 1.15,
            }}
          >
            South Orange, NJ with Kids
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              opacity: 0.88,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Fairy trails, free pools, great schools, and a community that makes raising a family here genuinely special.
          </p>
        </section>

        {/* Gold accent bar */}
        <div style={{ height: '5px', backgroundColor: colors.gold }} />

        {/* Main content */}
        <main style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* Intro */}
          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.75,
              color: colors.textMid,
              marginBottom: '56px',
              borderLeft: `4px solid ${colors.sage}`,
              paddingLeft: '20px',
            }}
          >
            South Orange has a way of surprising families who discover it. It&rsquo;s a real walking town where kids gain genuine independence early — walking to school, the library, or the park on their own. Layer in one of New Jersey&rsquo;s most respected and diverse public school districts, direct train access to New York City, thousands of acres of reservation forest literally bordering the neighborhoods, and a community that shows up for each other, and you start to understand why families who move here tend to stay.
          </p>

          {/* Activities */}
          <section style={{ marginBottom: '64px' }}>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: colors.darkGreen,
                marginBottom: '8px',
                fontWeight: 700,
              }}
            >
              Activities &amp; Destinations for Families
            </h2>
            <p style={{ color: colors.textMid, marginBottom: '32px', lineHeight: 1.6 }}>
              From toddlers to teenagers, South Orange has more to offer than most towns its size.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                gap: '20px',
              }}
            >
              {activities.map((activity) => (
                <div
                  key={activity.name}
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.stone}`,
                    borderRadius: '10px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ fontSize: '1.75rem', lineHeight: 1 }}>{activity.emoji}</div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: colors.darkGreen,
                        margin: '0 0 4px',
                      }}
                    >
                      {activity.name}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: colors.textMid, marginBottom: '6px' }}>
                      {activity.location}
                    </div>
                    <span
                      style={{
                        display: 'inline-block',
                        backgroundColor: colors.sage,
                        color: colors.darkGreen,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '2px 10px',
                        borderRadius: '20px',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {activity.ages}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: colors.textMid, lineHeight: 1.6, margin: 0 }}>
                    {activity.description}
                  </p>
                  <div
                    style={{
                      fontSize: '0.82rem',
                      color: colors.darkGreen,
                      backgroundColor: `${colors.sage}22`,
                      borderLeft: `3px solid ${colors.sage}`,
                      padding: '8px 10px',
                      borderRadius: '0 4px 4px 0',
                      lineHeight: 1.55,
                    }}
                  >
                    <strong>Tip:</strong> {activity.tip}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Schools callout */}
          <section
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.stone}`,
              borderTop: `4px solid ${colors.gold}`,
              borderRadius: '10px',
              padding: '32px',
              marginBottom: '64px',
            }}
          >
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '1.4rem',
                color: colors.darkGreen,
                marginTop: 0,
                marginBottom: '12px',
                fontWeight: 700,
              }}
            >
              🏫 Schools in South Orange
            </h2>
            <p style={{ color: colors.textMid, lineHeight: 1.7, margin: '0 0 16px' }}>
              South Orange is part of the{' '}
              <strong>South Orange-Maplewood School District (SOMSD)</strong>, a well-regarded, diverse K&ndash;12 district with strong academics, arts, and athletics. There are{' '}
              <strong>six elementary schools in South Orange</strong>, with placement based on your home address. The district is consistently recognized for its commitment to both excellence and equity.
            </p>
            <a
              href="/guides/schools-south-orange"
              style={{
                display: 'inline-block',
                backgroundColor: colors.darkGreen,
                color: colors.white,
                padding: '10px 22px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              Read the Full Schools Guide &rarr;
            </a>
          </section>

          {/* Why families choose South Orange */}
          <section style={{ marginBottom: '64px' }}>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: colors.darkGreen,
                marginBottom: '8px',
                fontWeight: 700,
              }}
            >
              Why Families Choose South Orange
            </h2>
            <p style={{ color: colors.textMid, marginBottom: '28px', lineHeight: 1.6 }}>
              Ask families why they picked South Orange, and the same themes come up again and again.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px',
              }}
            >
              {whyFamilies.map((item) => (
                <div
                  key={item.heading}
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.stone}`,
                    borderRadius: '10px',
                    padding: '24px',
                  }}
                >
                  <div style={{ fontSize: '1.6rem', marginBottom: '10px', lineHeight: 1 }}>{item.emoji}</div>
                  <h3
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontSize: '1.05rem',
                      color: colors.darkGreen,
                      margin: '0 0 8px',
                      fontWeight: 700,
                    }}
                  >
                    {item.heading}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: colors.textMid, lineHeight: 1.65, margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: '64px' }}>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: colors.darkGreen,
                marginBottom: '24px',
                fontWeight: 700,
              }}
            >
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqSchema.mainEntity.map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.stone}`,
                    borderRadius: '10px',
                    padding: '24px 28px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontSize: '1.05rem',
                      color: colors.darkGreen,
                      margin: '0 0 10px',
                      fontWeight: 700,
                    }}
                  >
                    {item.name}
                  </h3>
                  <p style={{ color: colors.textMid, lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>
                    {item.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related guides */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '1.25rem',
                color: colors.darkGreen,
                marginBottom: '16px',
                fontWeight: 700,
              }}
            >
              Related Guides
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {relatedGuides.map((guide) => (
                <a
                  key={guide.href}
                  href={guide.href}
                  style={{
                    display: 'inline-block',
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.stone}`,
                    borderRadius: '6px',
                    padding: '10px 18px',
                    textDecoration: 'none',
                    color: colors.darkGreen,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'border-color 0.15s',
                  }}
                >
                  {guide.label} &rarr;
                </a>
              ))}
            </div>
          </section>

          {/* Author */}
          <p
            style={{
              fontSize: '0.82rem',
              color: '#888',
              borderTop: `1px solid ${colors.stone}`,
              paddingTop: '20px',
              margin: 0,
            }}
          >
            Written by Rob Schutz &middot; Last updated May 2026
          </p>
        </main>

        {/* Footer nav */}
        <footer
          style={{
            backgroundColor: colors.darkGreen,
            color: colors.white,
            padding: '40px 24px',
          }}
        >
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 24px',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
                fontSize: '1rem',
                opacity: 0.9,
                marginRight: '8px',
              }}
            >
              SouthOrange.com
            </span>
            {[
              { label: 'Home', href: '/' },
              { label: 'Guides', href: '/guides' },
              { label: 'Schools', href: '/guides/schools-south-orange' },
              { label: 'Things To Do', href: '/guides/things-to-do' },
              { label: 'South Mountain Reservation', href: '/guides/south-mountain-reservation' },
              { label: 'Moving Here', href: '/guides/moving-to' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: colors.white,
                  opacity: 0.75,
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
