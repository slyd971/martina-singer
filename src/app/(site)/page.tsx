import type { Metadata } from 'next';
import { ArtistHomePage } from '@/components/press-kit';
import { martinaArtist } from '@/data/artists/martina';
import { buildArtistMetadata, buildArtistJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildArtistMetadata(martinaArtist, '/');
}

export default function HomePage() {
  const jsonLd = buildArtistJsonLd(martinaArtist);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtistHomePage artist={martinaArtist} />
    </>
  );
}
