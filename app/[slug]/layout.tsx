import type { Metadata } from 'next';
import { createServiceClient } from '@/lib/supabase';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServiceClient();
  const { data } = await supabase
    .from('auctions')
    .select('title, domain, tagline')
    .eq('slug', slug)
    .single();

  const row = data as unknown as { title: string; domain: string; tagline: string | null } | null;
  if (!row) return { title: 'Snagged Auctions' };

  return {
    title: `${row.title} — Snagged Auctions`,
    description: row.tagline ?? `Bid on ${row.domain} — a premium domain available at Snagged Auctions.`,
    openGraph: {
      title: `${row.title} is up for auction`,
      description: row.tagline ?? undefined,
      siteName: 'Snagged Auctions',
    },
  };
}

export default function AuctionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
