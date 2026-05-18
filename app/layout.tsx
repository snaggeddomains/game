import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Snagged Auctions — Premium Domain Auctions',
  description: 'Buy and bid on premium domain names through Snagged Auctions. Transparent, trustworthy, broker-assisted.',
  openGraph: {
    title: 'Snagged Auctions',
    description: 'Premium domain auctions — bid with confidence.',
    siteName: 'Snagged Auctions',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070a0f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-game-bg">{children}</body>
    </html>
  );
}
