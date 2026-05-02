import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is it Snagged?',
};

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
