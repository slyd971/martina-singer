'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type ArtistStat = {
  label: string;
  value: number;
  suffix: string;
  detail: string;
};

type ArtistTrack = {
  title: string;
  format: string;
  year: string;
  description: string;
  cover: string;
  spotifyEmbedUrl: string;
};

type ArtistVideo = {
  title: string;
  note: string;
  embedId: string;
};

type ArtistSocial = {
  platform: 'Instagram' | 'TikTok';
  handle: string;
  href: string;
  image: string;
  metric: string;
  caption: string;
};

type ArtistPressItem = {
  name: string;
  kind: string;
  quote: string;
};

type ArtistContact = {
  bookingEmail: string;
  managementEmail: string;
  pressEmail: string;
  phone: string;
  city: string;
};

type ArtistSpotifyFeature = {
  title: string;
  subtitle: string;
  description: string;
  embedUrl: string;
};

type ArtistGalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export const artistData = {
  name: "Sly'D",
  role: 'Singer • Songwriter • Live Performer',
  tagline: 'A refined voice, strong visuals, and a stage presence built for premium rooms.',
  bio: `Sly'D is a singer and songwriter blending contemporary pop, R&B, and electronic influences into a polished, performance-driven identity. Her work moves between intimate writing and more cinematic hooks, with a visual universe shaped by nightlife, fashion, and modern live culture. She performs across showcases, private events, and curated music settings, while building a growing audience through releases, collaborations, and live sessions.`,
  aboutImage: '/dj-assets/profile.jpg',
  stats: [
    { label: 'Years shaping her sound', value: 8, suffix: '+', detail: 'from underground rooms to international showcases' },
    { label: 'Spotify streams', value: 24, suffix: 'M+', detail: 'across catalog highlights and curated playlists' },
    { label: 'Creative collaborations', value: 19, suffix: '', detail: 'with producers, brands, and guest artists' },
    { label: 'Audience across platforms', value: 410, suffix: 'K', detail: 'an engaged community following each release cycle' },
  ] satisfies ArtistStat[],
  tracks: [
    {
      title: 'Afterglow Fever',
      format: 'Single',
      year: '2026',
      description: 'A sleek late-night anthem carried by breathy vocals, restrained percussion, and a massive final chorus.',
      cover: '/dj-assets/gallery-1.jpg',
      spotifyEmbedUrl:
        'https://open.spotify.com/embed/track/7ouMYWpwJ422jRcDASZB7P?utm_source=generator',
    },
    {
      title: 'Midnight Signal',
      format: 'EP',
      year: '2025',
      description: 'A five-track project balancing intimate songwriting with pulse-heavy club production and cinematic transitions.',
      cover: '/dj-assets/gallery-3.jpg',
      spotifyEmbedUrl:
        'https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3?utm_source=generator',
    },
    {
      title: 'Gold Static',
      format: 'Collaboration',
      year: '2025',
      description: 'A cross-genre collaboration with electronic textures, glitch details, and a hook made for festival singalongs.',
      cover: '/dj-assets/gallery-4.jpg',
      spotifyEmbedUrl:
        'https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT?utm_source=generator',
    },
    {
      title: 'Roomservice Hearts',
      format: 'Live Session',
      year: '2024',
      description: 'A stripped-back live recording that spotlights her tone, control, and ability to hold attention in a single take.',
      cover: '/dj-assets/gallery-6.jpg',
      spotifyEmbedUrl:
        'https://open.spotify.com/embed/track/0VjIjW4GlUZAMYd2vXMi3b?utm_source=generator',
    },
  ] satisfies ArtistTrack[],
  videos: [
    {
      title: 'Live at Midnight House',
      note: 'Live performance video recorded with full band.',
      embedId: 'ScMzIvxBSi4',
    },
    {
      title: 'Afterglow Fever Official Video',
      note: 'Official music video for one of her recent singles.',
      embedId: 'ysz5S6PUM-U',
    },
    {
      title: 'Acoustic Rooftop Session',
      note: 'Acoustic session highlighting vocal tone and control.',
      embedId: 'aqz-KE-bpKQ',
    },
  ] satisfies ArtistVideo[],
  socials: [
    {
      platform: 'Instagram',
      handle: '@slyd',
      href: 'https://instagram.com',
      image: '/dj-assets/gallery-2.jpg',
      metric: '148K followers',
      caption: 'Release week visuals, backstage moments, and polished editorial storytelling.',
    },
    {
      platform: 'TikTok',
      handle: '@slydmusic',
      href: 'https://tiktok.com',
      image: '/dj-assets/gallery-5.jpg',
      metric: '6.8M monthly views',
      caption: 'Performance clips and hook-driven snippets that consistently travel beyond the core fanbase.',
    },
    {
      platform: 'Instagram',
      handle: '@slyd',
      href: 'https://instagram.com',
      image: '/dj-assets/gallery-1.jpg',
      metric: '34K average reach',
      caption: 'Tour-ready imagery with a luxury after-dark visual language.',
    },
    {
      platform: 'TikTok',
      handle: '@slydmusic',
      href: 'https://tiktok.com',
      image: '/dj-assets/gallery-6.jpg',
      metric: '11.2% engagement',
      caption: 'Fast-moving community response around live cuts and unreleased previews.',
    },
  ] satisfies ArtistSocial[],
  gallery: [
    {
      src: '/dj-assets/gallery-1.jpg',
      alt: "Sly'D backstage portrait",
      caption: 'Backstage portrait',
    },
    {
      src: '/dj-assets/gallery-2.jpg',
      alt: "Sly'D editorial close-up",
      caption: 'Editorial close-up',
    },
    {
      src: '/dj-assets/gallery-3.jpg',
      alt: "Sly'D studio portrait",
      caption: 'Studio portrait',
    },
    {
      src: '/dj-assets/gallery-4.jpg',
      alt: "Sly'D performance lighting moment",
      caption: 'Stage lighting',
    },
    {
      src: '/dj-assets/gallery-5.jpg',
      alt: "Sly'D live set detail",
      caption: 'Live set detail',
    },
    {
      src: '/dj-assets/gallery-6.jpg',
      alt: "Sly'D fashion-led portrait",
      caption: 'Fashion portrait',
    },
  ] satisfies ArtistGalleryImage[],
  press: [
    {
      name: 'Luna FM',
      kind: 'Radio Feature',
      quote: 'Slu\'D balances intimacy and scale with ease.',
    },
    {
      name: 'Nocturne Magazine',
      kind: 'Editorial',
      quote: 'A polished artist with a clear identity and stage presence.',
    },
    {
      name: 'Maison Rouge',
      kind: 'Brand Event',
      quote: 'Elegant, reliable, and easy to program for premium events.',
    },
    {
      name: 'Velour Sessions',
      kind: 'Live Platform',
      quote: 'Her live delivery translates immediately on camera.',
    },
  ] satisfies ArtistPressItem[],
  booking: {
    heading: 'Available for clubs, private events, showcases, and branded live performances.',
    description: 'Flexible live formats for showcases, private events, and premium nightlife programming.',
  },
  spotifyFeature: {
    title: 'Listen on Spotify',
    subtitle: 'Artist profile',
    description:
      'A direct artist embed for press, promoters, and bookers who want immediate access to the catalog.',
    embedUrl:
      'https://open.spotify.com/embed/artist/3fDBK7mHavPMCZxfwy1V3k?utm_source=generator',
  } satisfies ArtistSpotifyFeature,
  contact: {
    bookingEmail: 'booking@slydmusic.com',
    managementEmail: 'management@slydmusic.com',
    pressEmail: 'press@slydmusic.com',
    phone: '+33 6 12 45 88 10',
    city: 'Paris • London • International',
  } satisfies ArtistContact,
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  body: string;
  align?: 'left' | 'center';
}) {
  return (
    <motion.div
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <p className="mb-4 text-[0.72rem] uppercase tracking-[0.45em] text-white">{eyebrow}</p>
      <h2 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-white sm:text-lg">{body}</p>
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section className="press-section section-about relative overflow-hidden border-t border-white/12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,246,230,0.05),rgba(33,23,18,0.42)_58%,transparent)]" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(226,192,148,0.16),transparent_56%)] blur-2xl" />
      <div className="grain-overlay" />
      <div className="paper-texture" />
      <div className="warm-spotlight right-[-8rem] top-[12%]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#c4844d]/12 blur-3xl" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-10">
        <motion.div
          className="flex flex-col justify-between gap-8 lg:gap-10"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="space-y-6">
            <motion.p
              variants={fadeUp}
              className="text-[0.72rem] uppercase tracking-[0.5em] text-white"
            >
              About The Artist
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="max-w-xl text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl"
            >
              About Sly&apos;D
            </motion.h2>
            <motion.p variants={fadeUp} className="max-w-xl text-base leading-8 text-white sm:text-lg">
              {artistData.bio}
            </motion.p>
          </div>

        </motion.div>

        <motion.div
          className="relative min-h-[28rem] overflow-hidden rounded-[2rem]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <Image
            src={artistData.aboutImage}
            alt={`${artistData.name} portrait`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
                <div className="theme-image-overlay absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="text-sm uppercase tracking-[0.28em] text-white">{artistData.role}</p>
            <p className="theme-overlay-panel mt-3 max-w-md rounded-[1.25rem] bg-black/26 p-4 text-lg leading-7 text-white backdrop-blur-sm">
              {artistData.tagline}
            </p>
                </div>
              </motion.div>
      </div>
    </section>
  );
}

export function MusicSection() {
  return (
    <section className="press-section section-music relative overflow-hidden border-t border-white/12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-32">
      <div className="ambient-shift absolute inset-0 bg-[linear-gradient(135deg,rgba(53,34,24,0.92),rgba(16,12,10,0.58)),radial-gradient(circle_at_top_left,rgba(225,189,144,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(150,96,64,0.18),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_18%,rgba(0,0,0,0.18)_100%)]" />
      <div className="grain-overlay" />
      <div className="film-vignette" />
      <div className="warm-spotlight left-[-10rem] top-[-8rem]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Music / Discography"
          title="Selected releases"
          body="A quick overview of recent singles, live sessions, and collaborative projects."
        />

        <motion.div
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:mt-14 sm:gap-5 sm:pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {artistData.tracks.map((track, index) => (
            <motion.article
              key={track.title}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="theme-panel group relative min-h-[28rem] min-w-[84vw] snap-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] sm:min-h-[30rem] sm:min-w-[34rem] lg:min-w-[38rem]"
            >
              <div className="absolute inset-x-6 bottom-6 z-0 hidden overflow-hidden rounded-[1.5rem] border border-white/10 opacity-65 blur-[1px] sm:block">
                <iframe
                  title={`${track.title} Spotify embed`}
                  src={track.spotifyEmbedUrl}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="pointer-events-none"
                />
              </div>
              <div className="absolute inset-0">
                <Image
                  src={track.cover}
                  alt={track.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 84vw, 38rem"
                />
                <div className="theme-image-overlay absolute inset-0 bg-gradient-to-r from-black via-black/45 to-black/12" />
                <div className="theme-image-depth absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#0d0908] via-[#0d0908]/84 to-transparent" />
                <div className="film-vignette" />
              </div>
              <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white">{track.format}</p>
                    <p className="mt-2 text-sm text-white">{track.year}</p>
                  </div>
                  <div className="text-right text-xs uppercase tracking-[0.3em] text-white">
                    0{index + 1}
                  </div>
                </div>

                <div className="theme-overlay-panel max-w-md rounded-[1.5rem] bg-black/28 p-4 backdrop-blur-sm sm:mb-0 sm:p-5">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.97 }}
                    className="theme-chip mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm"
                    aria-label={`Play ${track.title}`}
                  >
                    <span className="ml-1 inline-block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white" />
                  </motion.button>
                  <h3 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
                    {track.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-white">{track.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function VideoSection() {
  const [featured, supporting] = artistData.videos;

  return (
    <section className="press-section section-video relative overflow-hidden border-t border-white/12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,14,12,0.95),rgba(8,8,8,0.35))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,214,174,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(179,118,79,0.14),transparent_26%)]" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]" />
      <div className="grain-overlay" />
      <div className="paper-texture" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Video"
          title="Video highlights"
          body="Official visuals and live performance content for press, promoters, and curators."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: smoothEase }}
            className="theme-panel group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
          >
            <div className="relative h-[20rem] overflow-hidden sm:h-[24rem] lg:h-[26rem]">
              <iframe
                className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.02]"
                src={`https://www.youtube-nocookie.com/embed/${featured.embedId}?rel=0`}
                title={featured.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="theme-image-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />
              <div className="film-vignette" />
              <div className="pointer-events-none absolute left-6 top-6 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/35 backdrop-blur-sm">
                  <span className="ml-1 inline-block h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-white" />
                </span>
                <span className="text-xs uppercase tracking-[0.35em] text-white">Featured Cut</span>
              </div>
              <div className="theme-overlay-panel absolute inset-x-0 bottom-0 flex min-h-[7.5rem] flex-col justify-end rounded-t-[1.25rem] bg-black/32 p-4 backdrop-blur-md">
                <h3 className="text-xl font-black tracking-[-0.04em] text-white">{featured.title}</h3>
                <p className="mt-1 text-sm leading-5 text-white">{featured.note}</p>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.08, ease: smoothEase }}
            className="theme-panel group grid h-[20rem] grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] sm:h-[24rem] lg:h-[26rem]"
          >
            <div className="relative min-h-0 overflow-hidden">
              <iframe
                className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
                src={`https://www.youtube-nocookie.com/embed/${supporting.embedId}?rel=0`}
                title={supporting.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="theme-image-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="film-vignette" />
              <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/35 backdrop-blur-sm">
                  <span className="ml-1 inline-block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white">Watch</span>
              </div>
            </div>
            <div className="theme-overlay-panel relative z-10 border-t border-white/10 bg-black/88 p-4 backdrop-blur-md">
              <h3 className="text-xl font-black tracking-[-0.04em] text-white">{supporting.title}</h3>
              <p className="mt-1 text-sm leading-5 text-white">{supporting.note}</p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export function SpotifySection() {
  const feature = artistData.spotifyFeature;

  return (
    <section className="press-section section-spotify relative overflow-hidden border-t border-white/12 px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,18,15,0.96),rgba(10,10,10,0.28))]" />
      <div className="ambient-shift absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(241,211,161,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(160,96,66,0.16),transparent_28%)]" />
      <div className="grain-overlay" />
      <div className="film-vignette" />
      <div className="warm-spotlight right-[-8rem] top-[-6rem]" />

      <motion.div
        className="theme-panel mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] shadow-[0_24px_90px_rgba(0,0,0,0.28)]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: smoothEase }}
      >
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="theme-panel-subtle relative flex flex-col justify-between border-b border-white/10 bg-[linear-gradient(180deg,rgba(15,12,11,0.5),rgba(15,12,11,0.18))] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-8">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-white">{feature.subtitle}</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-white sm:text-4xl lg:text-5xl">
                {feature.title}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white sm:text-base">
                {feature.description}
              </p>
            </div>

            <div className="theme-overlay-panel mt-6 rounded-[1.25rem] border border-white/10 bg-black/22 p-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.3em] text-white">Spotify embed</p>
              <p className="mt-2 text-sm leading-5 text-white">
                Large-format player designed to feel native to the press kit rather than dropped in as a default widget.
              </p>
            </div>
          </div>

          <div className="theme-panel-subtle relative bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.04))] p-4 sm:p-5 lg:p-6">
            <div className="theme-embed-shell overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/30 shadow-[0_18px_60px_rgba(0,0,0,0.3)]">
              <iframe
                title={feature.title}
                src={feature.embedUrl}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function SocialProofSection() {
  return (
    <section className="press-section section-numbers relative overflow-hidden border-t border-white/12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-32">
      <div className="ambient-shift absolute inset-0 bg-[linear-gradient(180deg,rgba(71,46,30,0.84),rgba(12,10,10,0.22)),radial-gradient(circle_at_top,rgba(232,200,154,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(145,87,58,0.22),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.04),transparent)]" />
      <div className="grain-overlay" />
      <div className="warm-spotlight right-[-8rem] top-[-6rem]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Social Proof / Numbers"
          title="Key numbers"
          body="A snapshot of audience reach, streams, and collaborative activity."
          align="center"
        />

        <motion.div
          className="mt-10 grid gap-x-6 gap-y-8 sm:mt-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {artistData.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="border-t border-white/12 pt-5"
            >
              <p className="text-5xl font-black tracking-[-0.07em] text-white sm:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white">{stat.label}</p>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white">{stat.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function PressSection() {
  const items = [...artistData.press, ...artistData.press];

  return (
    <section className="press-section section-press relative overflow-hidden border-t border-white/12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,16,14,0.96),rgba(10,9,9,0.22))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(170,120,87,0.16),transparent_24%),radial-gradient(circle_at_right,rgba(232,198,154,0.14),transparent_26%)]" />
      <div className="grain-overlay" />
      <div className="paper-texture" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Press / Collaborations"
          title="Press and collaborations"
          body="Selected media support, editorial mentions, and event partnerships."
        />

        <div className="mt-10 overflow-hidden border-y border-white/10 py-4 sm:mt-14 sm:py-5">
          <div className="marquee-track flex min-w-max gap-5">
            {items.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="theme-panel w-[18rem] flex-none rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white">{item.kind}</p>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">{item.name}</h3>
                <p className="mt-4 text-sm leading-6 text-white">&ldquo;{item.quote}&rdquo;</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LiveSection() {
  return (
    <section className="press-section section-booking relative overflow-hidden border-t border-white/12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-32">
      <div className="ambient-shift absolute inset-0 bg-[linear-gradient(180deg,rgba(115,82,50,0.74),rgba(22,18,15,0.28)),radial-gradient(circle_at_center,rgba(255,231,196,0.18),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_45%)]" />
      <div className="grain-overlay" />
      <div className="film-vignette" />
      <motion.div
        className="theme-panel relative z-10 mx-auto grid max-w-7xl gap-6 overflow-hidden rounded-[2rem] border border-white/20 bg-[linear-gradient(135deg,rgba(255,248,239,0.28),rgba(255,255,255,0.12))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.26)] sm:gap-8 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:p-14"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: smoothEase }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_38%,rgba(0,0,0,0.04))]" />
        <div className="relative z-10">
          <p className="text-[0.72rem] uppercase tracking-[0.45em] text-white">Live Performance / Booking</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
            Booking
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white sm:mt-6 sm:text-lg">
            {artistData.booking.heading}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white sm:mt-4 sm:text-base sm:leading-7">
            {artistData.booking.description}
          </p>
        </div>

        <div className="theme-overlay-panel relative z-10 flex flex-col justify-between gap-5 rounded-[1.5rem] border border-white/12 bg-black/18 p-4 backdrop-blur-md sm:gap-8 sm:p-6 lg:pl-8 lg:pt-6">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white">Direct Booking</p>
            <a
              href={`mailto:${artistData.contact.bookingEmail}`}
              className="block break-all text-xl font-black tracking-[-0.04em] text-white sm:text-3xl sm:break-normal"
            >
              {artistData.contact.bookingEmail}
            </a>
            <p className="text-sm text-white">{artistData.contact.city}</p>
          </div>
          <motion.a
            href={`mailto:${artistData.contact.bookingEmail}?subject=Booking Inquiry for ${artistData.name}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="theme-button-primary inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.22em] text-black sm:w-fit sm:px-7 sm:tracking-[0.25em]"
          >
            Book now
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

export function SocialWallSection() {
  const [featured, ...rest] = artistData.socials;

  return (
    <section className="press-section section-social relative overflow-hidden border-t border-white/12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(41,30,22,0.58),rgba(11,10,10,0.16))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(177,132,95,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(233,198,154,0.12),transparent_26%)]" />
      <div className="grain-overlay" />
      <div className="paper-texture" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Instagram / Social Wall"
          title="Social presence"
          body="Recent content and platform performance across Instagram and TikTok."
        />

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.a
            href={featured.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: smoothEase }}
            className="group relative min-h-[34rem] overflow-hidden rounded-[2rem]"
          >
            <Image
              src={featured.image}
              alt={featured.caption}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
            <div className="theme-image-overlay absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-5 text-xs uppercase tracking-[0.3em] text-white">
              <span>{featured.platform}</span>
              <span>{featured.metric}</span>
            </div>
            <div className="theme-overlay-panel absolute bottom-0 left-0 right-0 rounded-t-[1.5rem] bg-black/30 p-6 backdrop-blur-md sm:p-8">
              <p className="text-sm text-white">{featured.handle}</p>
              <h3 className="mt-3 max-w-lg text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
                Visual content built around music, live moments, and releases.
              </h3>
              <p className="mt-4 max-w-lg text-base leading-7 text-white">{featured.caption}</p>
            </div>
          </motion.a>

          <div className="grid gap-5 sm:grid-cols-2">
            {rest.map((item, index) => (
              <motion.a
                key={`${item.platform}-${item.metric}`}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: smoothEase }}
                className="theme-panel group relative min-h-[16rem] overflow-hidden rounded-[2rem] border border-white/10"
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 24vw"
                />
                <div className="theme-image-overlay absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="theme-overlay-panel absolute inset-x-0 bottom-0 rounded-t-[1.25rem] bg-black/28 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4 text-[0.65rem] uppercase tracking-[0.3em] text-white">
                    <span>{item.platform}</span>
                    <span>{item.metric}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white">{item.caption}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section className="press-section section-gallery relative overflow-hidden border-t border-white/12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,14,13,0.94),rgba(10,10,10,0.2))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(233,198,154,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(155,98,66,0.14),transparent_24%)]" />
      <div className="absolute inset-y-0 left-0 w-1/4 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
      <div className="grain-overlay" />
      <div className="film-vignette" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="Gallery"
            title="Visual gallery"
            body="Selected images for press use, editorial reference, and visual direction."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: smoothEase }}
          >
            <Link
              href="/gallery"
              className="theme-chip inline-flex items-center rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-bold uppercase tracking-[0.26em] text-white transition-colors hover:bg-white/12"
            >
              View gallery
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 flex gap-4 overflow-x-auto pb-3 sm:mt-12 sm:gap-5 sm:pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {artistData.gallery.map((image, index) => (
            <motion.div
              key={image.src}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="theme-panel group relative w-[78vw] flex-none overflow-hidden rounded-[1.75rem] border border-white/10 sm:w-[24rem] lg:w-[26rem]"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 78vw, 26rem"
                />
                <div className="theme-image-overlay absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="theme-overlay-panel absolute bottom-0 left-0 right-0 rounded-t-[1.25rem] bg-black/30 p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.28em] text-white">0{index + 1}</p>
                  <p className="mt-2 text-lg font-medium text-white">{image.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="press-section section-contact relative overflow-hidden border-t border-white/12 px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-32">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(61,42,28,0.62),rgba(12,12,12,0.3))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,198,154,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(141,97,67,0.16),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.05))]" />
      <div className="grain-overlay" />
      <div className="paper-texture" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <p className="text-[0.72rem] uppercase tracking-[0.45em] text-white">Contact / Final CTA</p>
          <h2 className="mt-5 max-w-xl text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
            Contact
          </h2>
          <div className="mt-8 space-y-5 text-base leading-7 text-white">
            <p>Booking: {artistData.contact.bookingEmail}</p>
            <p>Management: {artistData.contact.managementEmail}</p>
            <p>Press: {artistData.contact.pressEmail}</p>
            <p>Phone: {artistData.contact.phone}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.08, ease: smoothEase }}
          className="theme-panel rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-white">Name</span>
              <input
                type="text"
                placeholder="Your name"
                className="theme-input w-full rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-white outline-none placeholder:text-white"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-white">Email</span>
              <input
                type="email"
                placeholder="you@company.com"
                className="theme-input w-full rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-white outline-none placeholder:text-white"
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-white">Project</span>
            <input
              type="text"
              placeholder="Festival booking, editorial request, brand event..."
              className="theme-input w-full rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-white outline-none placeholder:text-white"
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-white">Message</span>
            <textarea
              rows={5}
              placeholder="Tell us what you need."
              className="theme-input w-full rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-4 text-sm text-white outline-none placeholder:text-white"
            />
          </label>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-white">UI only. Connect this form to your preferred backend later.</p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="theme-button-primary rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-black"
            >
              Send inquiry
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
