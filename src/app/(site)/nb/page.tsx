import type { Metadata } from 'next';
import { ArtistHomePage } from '@/components/press-kit';
import { martinaArtist } from '@/data/artists/martina';
import { resolveArtist } from '@/lib/airtable';

export const metadata: Metadata = {
  title: 'Martina — Press Kit N&B',
  robots: { index: false, follow: false },
};

export default async function NbPage() {
  const artist = await resolveArtist(martinaArtist.slug);
  return <ArtistHomePage artist={artist} initialTheme="bw" />;
}
