export type ArtistCategory = 'Singer' | 'DJ' | 'Producer' | 'Live Performer';

export type ArtistMediaAsset = {
  src: string;
  alt: string;
};

export type ArtistGalleryImage = ArtistMediaAsset & {
  caption: string;
};

export type ArtistSocialLink = {
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'Spotify' | 'LinkedIn';
  handle: string;
  url: string;
};

export type ArtistStreamingLink = {
  platform: 'Spotify' | 'Apple Music' | 'Deezer' | 'YouTube Music' | 'SoundCloud';
  url: string;
  label: string;
  embedUrl?: string;
};

export type ArtistContactPoint = {
  name: string;
  email: string;
  phone?: string;
  role: string;
};

export type ArtistHighlight = {
  label: string;
  value: string;
  detail: string;
};

export type ArtistPressQuote = {
  source: string;
  quote: string;
  kind: string;
};

export type ArtistVideo = {
  title: string;
  note: string;
  embedId?: string;
  cover: string;
};

export type ArtistSeo = {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageAlt?: string;
};

export type ArtistDomainConfig = {
  domain: string | null;
  vercelSubdomain: string;
};

export type Artist = ArtistDomainConfig & {
  slug: string;
  name: string;
  stageName: string;
  tagline: string;
  city: string;
  country: string;
  category: ArtistCategory;
  genre: string;
  description: string;
  shortBio: string;
  longBio: string;
  heroImage: ArtistMediaAsset;
  gallery: ArtistGalleryImage[];
  socials: ArtistSocialLink[];
  streamingLinks: ArtistStreamingLink[];
  bookingEmail: string;
  managementContact: ArtistContactPoint | null;
  pressContact: ArtistContactPoint | null;
  highlights: ArtistHighlight[];
  pressQuotes: ArtistPressQuote[];
  videos: ArtistVideo[];
  seo: ArtistSeo;
};
