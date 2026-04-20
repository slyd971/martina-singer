import type { Metadata, MetadataRoute } from 'next';
import type { Artist } from '@/types/artist';

function getCanonicalUrl(artist: Artist, path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const hostname = artist.domain ?? artist.vercelSubdomain;

  return new URL(normalizedPath, `https://${hostname}`).toString();
}

export function buildArtistMetadata(artist: Artist, path = '/'): Metadata {
  const canonical = getCanonicalUrl(artist, path);
  const title = path === '/' ? artist.seo.title : `${artist.stageName} | ${path.replace('/', '')}`;

  return {
    title,
    description: artist.seo.description,
    keywords: artist.seo.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description: artist.seo.description,
      siteName: `${artist.stageName} Press Kit`,
      locale: 'fr_FR',
      images: [
        {
          url: getCanonicalUrl(artist, artist.seo.ogImage),
          alt: artist.stageName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: artist.seo.description,
      images: [getCanonicalUrl(artist, artist.seo.ogImage)],
    },
  };
}

export function buildArtistSitemapEntries(artist: Artist): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: getCanonicalUrl(artist, '/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: getCanonicalUrl(artist, '/gallery'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl(artist, '/listen'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
