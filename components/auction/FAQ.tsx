'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'What is a domain auction?',
    a: 'A domain auction is a transparent, time-limited sale of a domain name to the highest bidder. All bids are binding. The highest bid when the timer expires wins the right to purchase the domain.',
  },
  {
    q: 'What is proxy bidding?',
    a: 'When you set a confidential maximum bid, our system automatically advances your standing bid only as needed to keep you in the lead — just like a proxy on a stock exchange. Your maximum is never revealed to other bidders.',
  },
  {
    q: 'Why is a credit card hold required?',
    a: 'A refundable authorization hold (not a charge) is placed on your card to verify your identity and ensure all bidders are serious participants. The hold is released automatically after the auction closes if you do not win.',
  },
  {
    q: 'How is payment handled when I win?',
    a: 'Final settlement is handled through Escrow.com — an industry-standard neutral third party. The buyer sends funds to Escrow, the domain is transferred, and then funds are released to the seller. This protects both parties.',
  },
  {
    q: 'What is soft close / anti-sniping?',
    a: 'If a bid is placed in the last 5 minutes of the auction, the timer automatically extends by 5 minutes. This prevents last-second "sniping" and ensures all bidders have a fair opportunity to respond.',
  },
  {
    q: 'What does "reserve not met" mean?',
    a: 'Some auctions have a confidential minimum price (reserve). If the current bid is below this threshold, the domain may not sell even if the auction ends. Once the reserve is met, the highest bidder is guaranteed to win.',
  },
  {
    q: 'How long does the domain transfer take?',
    a: 'After the auction, our broker coordinates the transfer via Escrow.com. Typical .com transfers take 5–7 business days from payment confirmation to full transfer.',
  },
  {
    q: 'Are bids legally binding?',
    a: 'Yes. By placing a bid you agree that it is a binding commitment to purchase at that price if you win. This is confirmed during registration and on each bid submission.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 border-t border-game-border">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-brand-navy mb-8">Frequently Asked Questions</h2>
        <div className="divide-y divide-game-border">
          {FAQS.map((item, i) => (
            <div key={i}>
              <button
                className="w-full text-left py-5 flex items-start justify-between gap-4 group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-brand-navy group-hover:text-brand-teal transition-colors">
                  {item.q}
                </span>
                <span className={`mt-0.5 flex-shrink-0 transition-transform duration-200 text-brand-navy/30 ${open === i ? 'rotate-45' : ''}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="pb-5 pr-8">
                  <p className="text-brand-navy/65 leading-relaxed text-sm">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
