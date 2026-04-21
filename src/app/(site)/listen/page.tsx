import type { Metadata } from 'next';
import { ArtistListenPage } from '@/components/press-kit';
import { martinaArtist } from '@/data/artists/martina';
import { buildArtistMetadata } from '@/lib/seo';
import { resolveArtist } from '@/lib/airtable';

export async function generateMetadata(): Promise<Metadata> {
  return buildArtistMetadata(martinaArtist, '/listen');
}

export default async function ListenPage() {
  const artist = await resolveArtist(martinaArtist.slug);
  return <ArtistListenPage artist={artist} />;
}
