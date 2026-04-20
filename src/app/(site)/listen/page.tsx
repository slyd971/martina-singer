import type { Metadata } from 'next';
import { ArtistListenPage } from '@/components/press-kit';
import { martinaArtist } from '@/data/artists/martina';
import { buildArtistMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildArtistMetadata(martinaArtist, '/listen');
}

export default function ListenPage() {
  return <ArtistListenPage artist={martinaArtist} />;
}
