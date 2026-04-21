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
  return (
    <>
      {/* Set bw theme on <html> before paint to avoid flash */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.dataset.siteTheme = 'bw';`,
        }}
      />
      <ArtistHomePage artist={artist} initialTheme="bw" />
    </>
  );
}
