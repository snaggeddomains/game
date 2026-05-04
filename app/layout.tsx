import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Is it Snagged? — The Domain Name Game',
  description:
    'Guess whether domain names are already taken or still available. Play in Regular, Kid Friendly, or Adult mode.',
  icons: {
    icon: '/snagged-logo.png',
    apple: '/snagged-logo.png',
  },
  openGraph: {
    title: 'Is it Snagged?',
    description: 'Can you tell which domains are taken? Find out at Snagged.com.',
    siteName: 'Snagged',
    images: [{ url: '/snagged-logo.png' }],
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
