import type { MetadataRoute } from 'next';
import { martinaArtist } from '@/data/artists/martina';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = martinaArtist.domain ?? martinaArtist.vercelSubdomain;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://${host}/sitemap.xml`,
    host,
  };
}
