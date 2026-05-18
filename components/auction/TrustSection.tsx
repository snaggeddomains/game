export default function TrustSection() {
  return (
    <section className="py-16 border-t border-game-border">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-brand-navy text-center mb-12">
          A Transparent, Trusted Process
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <TrustCard
            icon="🔒"
            title="Secure Bidding"
            body="All bids are processed server-side with tamper-proof audit logs. Your maximum bid is always kept confidential."
          />
          <TrustCard
            icon="🤝"
            title="Escrow Transfer"
            body="Winning buyers complete the purchase through Escrow.com — an industry-standard, neutral third party for safe domain transfers."
          />
          <TrustCard
            icon="✓"
            title="Verified Bidders"
            body="Every bidder is reviewed and card-verified before participating, ensuring serious competition and binding commitments."
          />
        </div>

        <div className="bg-brand-navy rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Questions? We&apos;re here.</h3>
              <p className="text-white/70 text-sm">
                Our team is available to answer questions about the domain, auction process, or how Escrow.com transfers work.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:auctions@snagged.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-sm transition-colors"
              >
                Email Us
              </a>
              <a
                href="https://snagged.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-coral hover:bg-brand-salmondark rounded-xl font-semibold text-sm transition-colors"
              >
                Visit Snagged.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-3xl">{icon}</div>
      <h3 className="font-bold text-brand-navy">{title}</h3>
      <p className="text-brand-navy/60 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
