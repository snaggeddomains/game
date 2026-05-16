import '../so-guide.css';

export const metadata = {
  title: 'Dog-Friendly South Orange, NJ | Complete Guide for Dog Owners | SouthOrange.com',
  description:
    'Everything dog owners need to know about South Orange, NJ — from the South Mountain Reservation dog park and 26+ miles of trails to dog-friendly patios, licensing, and a welcoming dog owner community.',
  openGraph: {
    title: 'Dog-Friendly South Orange, NJ | Guide for Dog Owners',
    description:
      'South Mountain Reservation dog park, 26+ miles of trails, dog-friendly dining, and one of the most walkable towns in NJ. A complete guide for dog owners in South Orange.',
    url: 'https://southorange.com/guides/dog-friendly-south-orange',
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
      name: 'Is South Orange, NJ a good place to live with a dog?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. South Orange is widely considered one of the best towns in Essex County for dog owners. It offers a large, fully fenced off-leash dog park inside South Mountain Reservation with separate areas for large and small dogs, 26+ miles of trails where leashed dogs are welcome, walkable tree-lined streets perfect for daily walks, and a genuine community of dog owners who make the dog park a social scene as much as a place to exercise pets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is the South Orange dog park located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The dog park is located inside South Mountain Reservation, a 2,110-acre Essex County park that borders several South Orange neighborhoods. The park is fully fenced and off-leash, with separate areas for large and small dogs and water stations on site. It is accessible directly on foot from many South Orange neighborhoods. Dogs must have current vaccination records to use the park.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a dog license in South Orange, NJ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Essex County requires all dogs to be licensed annually. You will need proof of a current rabies vaccination to obtain the license. The dog park inside South Mountain Reservation also requires that dogs have up-to-date vaccination records. Licensing your dog is straightforward and typically handled through the municipality.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are dogs allowed on the trails in South Mountain Reservation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, leashed dogs are welcome on the 26+ miles of trails throughout South Mountain Reservation. Dogs must remain on leash on all reservation trails. The only off-leash area within the reservation is the dedicated, fully fenced dog park, which has separate sections for large and small dogs.',
      },
    },
  ],
};

const cards = [
  {
    emoji: '🐕',
    name: 'South Mountain Reservation Dog Park',
    tag: 'Featured',
    tagColor: '#E8BE5A',
    tagText: '#2D5016',
    description:
      'One of the best dog parks in Essex County — fully fenced and off-leash, with separate areas for large and small dogs and water stations throughout. Tucked inside the 2,110-acre South Mountain Reservation, it offers a real natural setting rather than a simple concrete run. The dog park has become a genuine social scene: regulars know each other and their dogs by name, and weekend mornings draw a crowd.',
    detail: 'Off-leash · Fully fenced · Large & small dog areas · Water stations',
    featured: true,
  },
  {
    emoji: '🥾',
    name: '26+ Miles of Trails',
    tag: 'Leash Required',
    tagColor: '#A8CC78',
    tagText: '#2D5016',
    description:
      'South Mountain Reservation surrounds South Orange with more than 26 miles of wooded trails — rocky ridgelines, stream-side paths, and quiet forest roads. Leashed dogs are welcome on all of them. Many South Orange residents walk directly from their neighborhood into the reservation, making this a true daily-walk destination without needing a car.',
    detail: 'Dogs on leash · Multiple trailheads · Year-round access',
    featured: false,
  },
  {
    emoji: '🌳',
    name: 'Spiotta Park',
    tag: 'Leash Required',
    tagColor: '#A8CC78',
    tagText: '#2D5016',
    description:
      "Downtown South Orange's central green and the town's outdoor living room. Spiotta Park is a popular dog-walking destination — broad lawns, mature trees, and a steady stream of fellow dog owners make it a sociable stop. Leashes are required. The park hosts farmers markets, outdoor concerts, and community events throughout the year, all of which draw dogs along for the experience.",
    detail: 'Leash required · Downtown location · Events year-round',
    featured: false,
  },
  {
    emoji: '🍺',
    name: 'Gaslight Brewery Patio',
    tag: 'Dog-Friendly Dining',
    tagColor: '#E8BE5A',
    tagText: '#2D5016',
    description:
      "South Orange's best outdoor drinking spot, and happily dog-friendly. The Gaslight Brewery patio is the go-to destination for dog owners who want to extend a walk into an afternoon out. Well-behaved dogs are welcome on the patio. Several other spots along South Orange Avenue also welcome dogs on their outdoor patios — policies vary by season, so a quick call ahead is always a good idea.",
    detail: 'Outdoor patio · Dog-friendly · Other Ave patios seasonal',
    featured: false,
  },
  {
    emoji: '🚶',
    name: 'Daily Neighborhood Walks',
    tag: 'Most Walkable',
    tagColor: '#A8CC78',
    tagText: '#2D5016',
    description:
      "South Orange's tree-lined streets and compact layout make it genuinely excellent for daily dog walks — not just on weekends. Sidewalks are plentiful, the neighborhoods are calm and residential, and many homes have yards. A large share of residents walk their dogs to the dog park without ever getting in a car. That combination of walkability and proximity to the reservation is one of the top reasons dog owners say they chose South Orange.",
    detail: 'Tree-lined streets · Sidewalks throughout · Yards common',
    featured: false,
  },
];

const practicalItems = [
  {
    emoji: '📋',
    heading: 'Essex County Dog License',
    body: 'All dogs in Essex County must be licensed annually. You will need proof of a current rabies vaccination to complete the registration. Licensing is handled through the municipality and is straightforward to complete online or in person.',
  },
  {
    emoji: '💉',
    heading: 'Dog Park Vaccination Requirement',
    body: 'To use the South Mountain Reservation dog park, your dog must have current vaccination records. Bring documentation on your first visit and keep vaccinations up to date — it is required and enforced for the safety of all dogs using the off-leash area.',
  },
  {
    emoji: '🏥',
    heading: 'Veterinary Care',
    body: 'Veterinary offices are available in and around South Orange, with additional options in nearby Maplewood, Millburn, and along the Route 22 corridor. Ask your neighbors at the dog park — they will have strong opinions and reliable local recommendations.',
  },
  {
    emoji: '🤝',
    heading: 'Dog Owner Community',
    body: 'The dog park draws a regular crowd and has developed a genuine community culture. Dog owners know each other, swap vet recommendations, and organize informally. Community events periodically welcome dogs, and the overall town culture is friendly toward pets.',
  },
];

const relatedGuides = [
  { label: 'South Mountain Reservation', href: '/guides/south-mountain-reservation' },
  { label: 'Things To Do', href: '/guides/things-to-do' },
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

export default function DogFriendlySouthOrangePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div
        style={{
          backgroundColor: colors.bg,
          minHeight: '100vh',
          fontFamily: 'system-ui, sans-serif',
          color: colors.textDark,
        }}
      >
        {/* Hero */}
        <section
          style={{
            backgroundColor: colors.darkGreen,
            color: colors.white,
            padding: '72px 24px 60px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px', lineHeight: 1 }}>🐕</div>
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              margin: '0 0 16px',
              lineHeight: 1.15,
            }}
          >
            South Orange, NJ for Dog Owners
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              opacity: 0.88,
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            A top-rated dog park, 26+ miles of trails, walkable neighborhoods, and a community
            that makes life with a dog genuinely easy.
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
              lineHeight: 1.8,
              color: colors.textMid,
              marginBottom: '56px',
              borderLeft: `4px solid ${colors.sage}`,
              paddingLeft: '20px',
            }}
          >
            South Orange has a lot going for it if you own a dog. The South Mountain Reservation
            dog park — one of the best in Essex County — sits right on the edge of town, and many
            residents walk there directly from their front door. Beyond the park, 26-plus miles of
            wooded trails are open to leashed dogs year-round, and the town&rsquo;s walkable,
            tree-lined streets make daily walks genuinely pleasant rather than a chore. Add a
            dog-friendly brewery patio, a real community of dog owners at the park, and homes that
            commonly have yards, and South Orange is as good as it gets for dogs in the suburbs
            of Essex County.
          </p>

          {/* Cards section */}
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
              Parks, Trails &amp; Dog-Friendly Spots
            </h2>
            <p style={{ color: colors.textMid, marginBottom: '32px', lineHeight: 1.6 }}>
              From off-leash dog parks to patio dining, here is where dog owners spend their time
              in South Orange.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cards.map((card) => (
                <div
                  key={card.name}
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.stone}`,
                    borderTop: card.featured ? `4px solid ${colors.gold}` : `1px solid ${colors.stone}`,
                    borderRadius: '10px',
                    padding: card.featured ? '32px' : '24px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: card.featured ? '2.2rem' : '1.75rem', lineHeight: 1, flexShrink: 0 }}>
                      {card.emoji}
                    </span>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                        <h3
                          style={{
                            fontFamily: 'Georgia, "Times New Roman", serif',
                            fontSize: card.featured ? '1.3rem' : '1.1rem',
                            fontWeight: 700,
                            color: colors.darkGreen,
                            margin: 0,
                          }}
                        >
                          {card.name}
                        </h3>
                        <span
                          style={{
                            display: 'inline-block',
                            backgroundColor: card.tagColor,
                            color: card.tagText,
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '20px',
                            letterSpacing: '0.04em',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {card.tag}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: card.featured ? '0.98rem' : '0.92rem',
                          color: colors.textMid,
                          lineHeight: 1.7,
                          margin: '0 0 10px',
                        }}
                      >
                        {card.description}
                      </p>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: colors.darkGreen,
                          fontWeight: 600,
                          letterSpacing: '0.02em',
                          opacity: 0.8,
                        }}
                      >
                        {card.detail}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Practical info */}
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
              Practical Info for Dog Owners
            </h2>
            <p style={{ color: colors.textMid, marginBottom: '28px', lineHeight: 1.6 }}>
              What you need to know before you arrive — or before your dog does.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px',
              }}
            >
              {practicalItems.map((item) => (
                <div
                  key={item.heading}
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.stone}`,
                    borderRadius: '10px',
                    padding: '24px',
                  }}
                >
                  <div style={{ fontSize: '1.6rem', marginBottom: '10px', lineHeight: 1 }}>
                    {item.emoji}
                  </div>
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
              { label: 'South Mountain Reservation', href: '/guides/south-mountain-reservation' },
              { label: 'Things To Do', href: '/guides/things-to-do' },
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
