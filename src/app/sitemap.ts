import type { MetadataRoute } from 'next';
import { martinaArtist } from '@/data/artists/martina';
import { buildArtistSitemapEntries } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildArtistSitemapEntries(martinaArtist);
}
