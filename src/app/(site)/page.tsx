import type { Metadata } from 'next';
import { ArtistHomePage } from '@/components/press-kit';
import { martinaArtist } from '@/data/artists/martina';
import { buildArtistMetadata, buildArtistJsonLd } from '@/lib/seo';
import { resolveArtist } from '@/lib/airtable';

export async function generateMetadata(): Promise<Metadata> {
  return buildArtistMetadata(martinaArtist, '/');
}

export default async function HomePage() {
  const artist = await resolveArtist(martinaArtist.slug);
  const jsonLd = buildArtistJsonLd(artist);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtistHomePage artist={artist} />
    </>
  );
}
