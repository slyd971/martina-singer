import type { Artist } from '@/types/artist';

export const martinaArtist: Artist = {
  slug: 'martina',
  domain: 'martina.presskit.fr',
  vercelSubdomain: 'martina-presskit.vercel.app',
  name: 'Martina Bellucci',
  stageName: 'Martina',
  tagline: "L'élégance soul au service de la house contemporaine.",
  city: 'Paris',
  country: 'France',
  category: 'Singer',
  genre: 'Soul House',
  description:
    "Une voix qui habite l'espace. Martina traverse la soul et la house contemporaine avec une présence scénique construite dès l'enfance — entre danse, théâtre et liberté.",
  shortBio:
    "Martina construit un projet musical élégant, sensible et visuel, pensé pour la scène, la presse et le booking premium.",
  longBio:
    "Martina déploie un univers où la voix, le mouvement et l'image avancent ensemble. Son projet mélange émotion soul, textures house contemporaines et présence scénique maîtrisée. Chaque sortie, chaque live session et chaque visuel prolonge la même intention : installer une identité premium, forte et immédiate, capable de parler autant au public qu'aux programmateurs, médias et partenaires.",
  heroImage: {
    src: '/martina/hero-martina.jpeg',
    alt: 'Martina en portrait héro pour le press kit premium',
  },
  gallery: [
    {
      src: '/martina/gallery-1.jpg',
      alt: 'Martina en scène sous lumière rouge',
      caption: 'Feu rouge',
    },
    {
      src: '/martina/gallery-2.JPG',
      alt: 'Portrait éditorial de Martina',
      caption: 'Studio',
    },
    {
      src: '/martina/gallery-3.jpeg',
      alt: 'Martina sur scène sous lumière bleue',
      caption: 'Live',
    },
    {
      src: '/martina/gallery-4.jpeg',
      alt: 'Martina dans une ambiance violette sur scène',
      caption: 'Live',
    },
    {
      src: '/martina/gallery-5.jpeg',
      alt: 'Portrait concept de Martina',
      caption: 'Éclats',
    },
    {
      src: '/martina/gallery-6.jpeg',
      alt: 'Visuel studio de Martina',
      caption: 'Chrome',
    },
    {
      src: '/martina/gallery-7.jpeg',
      alt: 'Martina en prise éditoriale contrastée',
      caption: 'Ground Control',
    },
    {
      src: '/martina/gallery-8.jpeg',
      alt: 'Martina dans une ambiance noir et or',
      caption: 'Backstage',
    },
    {
      src: '/martina/gallery-9.jpeg',
      alt: 'Martina en portrait profil',
      caption: 'Scène libre',
    },
  ],
  socials: [
    {
      platform: 'Instagram',
      handle: '@martinabl',
      url: 'https://www.instagram.com/martinabl',
    },
    {
      platform: 'TikTok',
      handle: '@martinabl',
      url: 'https://www.tiktok.com/@martinabl',
    },
    {
      platform: 'YouTube',
      handle: '@martinablive',
      url: 'https://www.youtube.com/@martinablive',
    },
  ],
  streamingLinks: [
    {
      platform: 'Spotify',
      label: 'Profil artiste Spotify',
      url: 'https://open.spotify.com/artist/5PotJkfj02FkVdu8e6JgKO',
      embedUrl: 'https://open.spotify.com/embed/artist/5PotJkfj02FkVdu8e6JgKO?utm_source=generator',
    },
    {
      platform: 'Apple Music',
      label: 'Écouter sur Apple Music',
      url: 'https://music.apple.com/fr/artist/martina/1619828881',
    },
  ],
  bookingEmail: 'martinablbusiness@gmail.com',
  managementContact: {
    name: 'M. Bellucci Management',
    email: 'management@martina.presskit.fr',
    role: 'Management',
  },
  pressContact: {
    name: 'Press Office Martina',
    email: 'press@martina.presskit.fr',
    role: 'Presse',
  },
  highlights: [
    {
      label: 'Streams',
      value: '128K+',
      detail: 'Écoutes cumulées sur les sorties actuellement actives.',
    },
    {
      label: 'Instagram',
      value: '18K',
      detail: 'Communauté visuelle engagée autour du projet.',
    },
    {
      label: 'Live',
      value: '12',
      detail: 'Dates privées, showcases et apparitions live récentes.',
    },
  ],
  pressQuotes: [
    {
      source: 'Editorial Note',
      kind: 'Press angle',
      quote:
        "Une voix soul contemporaine avec une direction visuelle assez forte pour tenir autant sur scène qu'en presse.",
    },
    {
      source: 'Booking Deck',
      kind: 'Positioning',
      quote:
        "Le projet Martina se distingue par une exécution premium, pensée pour des environnements live, brand et event haut de gamme.",
    },
  ],
  videos: [
    {
      title: 'Nouvelle Robe',
      note: 'Performance live de Martina, entre présence scénique et intensité vocale.',
      embedId: 'DlqpLlqjkyM',
      cover: '/martina/gallery-3.jpeg',
    },
    {
      title: 'Pas Si Facile',
      note: "Une autre facette du projet, portée par la voix, l'émotion et le groove.",
      embedId: 'rDJ-cVKNJxA',
      cover: '/martina/gallery-4.jpeg',
    },
    {
      title: "How You Doin'",
      note: "Une vidéo qui prolonge l'univers de Martina dans une esthétique plus frontale.",
      embedId: 'h8dalM6XkjE',
      cover: '/martina/gallery-5.jpeg',
    },
  ],
  seo: {
    title: 'Martina | Press kit — Soul House Artist',
    description:
      'Press kit officiel de Martina : bio, galerie, vidéos, streaming et contact booking.',
    keywords: ['Martina', 'press kit artiste', 'soul house', 'booking artiste', 'live performer'],
    ogImage: '/martina/og-image.jpg',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Martina — Presskit — Soul House Artist',
    pages: {
      gallery: {
        title: 'Martina | Galerie photos',
        description:
          'Galerie officielle de Martina : photos de scène, portraits éditoriaux et visuels premium disponibles pour la presse.',
      },
      listen: {
        title: 'Martina | Écouter — Spotify & Apple Music',
        description:
          'Retrouvez la discographie de Martina sur Spotify, Apple Music et toutes les plateformes de streaming.',
      },
    },
  },
};
