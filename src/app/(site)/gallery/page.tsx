import type { Metadata } from 'next';
import { ArtistGalleryPage } from '@/components/press-kit';
import { martinaArtist } from '@/data/artists/martina';
import { buildArtistMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildArtistMetadata(martinaArtist, '/gallery');
}

export default function GalleryPage() {
  return <ArtistGalleryPage artist={martinaArtist} />;
}
