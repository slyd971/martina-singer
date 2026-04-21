import type { Metadata } from 'next';
import { ArtistGalleryPage } from '@/components/press-kit';
import { martinaArtist } from '@/data/artists/martina';
import { buildArtistMetadata } from '@/lib/seo';
import { resolveArtist } from '@/lib/airtable';

export async function generateMetadata(): Promise<Metadata> {
  return buildArtistMetadata(martinaArtist, '/gallery');
}

export default async function GalleryPage() {
  const artist = await resolveArtist(martinaArtist.slug);
  return <ArtistGalleryPage artist={artist} />;
}
