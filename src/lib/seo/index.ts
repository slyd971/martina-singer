import type { Metadata, MetadataRoute } from 'next';
import type { Artist } from '@/types/artist';

function getCanonicalUrl(artist: Artist, path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const hostname = artist.domain ?? artist.vercelSubdomain;
  return new URL(normalizedPath, `https://${hostname}`).toString();
}

function getPageSeo(artist: Artist, path: string) {
  if (path === '/gallery') {
    return artist.seo.pages?.gallery ?? {
      title: `${artist.stageName} | Galerie`,
      description: artist.seo.description,
    };
  }
  if (path === '/listen') {
    return artist.seo.pages?.listen ?? {
      title: `${artist.stageName} | Écouter`,
      description: artist.seo.description,
    };
  }
  return { title: artist.seo.title, description: artist.seo.description };
}

export function buildArtistMetadata(artist: Artist, path = '/'): Metadata {
  const canonical = getCanonicalUrl(artist, path);
  const hostname = artist.domain ?? artist.vercelSubdomain;
  const { title, description } = getPageSeo(artist, path);

  return {
    metadataBase: new URL(`https://${hostname}`),
    title,
    description,
    keywords: artist.seo.keywords,
    authors: [{ name: artist.stageName }],
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: `${artist.stageName} Press Kit`,
      locale: 'fr_FR',
      images: [
        {
          url: getCanonicalUrl(artist, artist.seo.ogImage),
          width: artist.seo.ogImageWidth ?? 1200,
          height: artist.seo.ogImageHeight ?? 630,
          alt: artist.seo.ogImageAlt ?? artist.stageName,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: getCanonicalUrl(artist, artist.seo.ogImage),
          width: artist.seo.ogImageWidth ?? 1200,
          height: artist.seo.ogImageHeight ?? 630,
          alt: artist.seo.ogImageAlt ?? artist.stageName,
        },
      ],
    },
  };
}

export function buildArtistJsonLd(artist: Artist) {
  const hostname = artist.domain ?? artist.vercelSubdomain;
  const baseUrl = `https://${hostname}`;

  const sameAs = [
    ...artist.socials.map((s) => s.url),
    ...artist.streamingLinks.map((s) => s.url),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: artist.stageName,
    alternateName: artist.name !== artist.stageName ? artist.name : undefined,
    description: artist.seo.description,
    url: baseUrl,
    image: `${baseUrl}${artist.seo.ogImage}`,
    genre: artist.genre.split(' '),
    foundingLocation: {
      '@type': 'Place',
      name: `${artist.city}, ${artist.country}`,
    },
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'booking',
      email: artist.bookingEmail,
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
