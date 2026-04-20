'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import type { Artist, ArtistSocialLink, ArtistStreamingLink } from '@/types/artist';

type Variation = 'luxury' | 'street' | 'futuristic';
type ThemeMode = 'dark' | 'light';

type ArtistPageProps = {
  artist: Artist;
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

function getPrimaryEmbed(links: ArtistStreamingLink[]) {
  return links.find((link) => link.embedUrl) ?? null;
}

function getSocialUrl(artist: Artist, platform: ArtistSocialLink['platform']) {
  return artist.socials.find((social) => social.platform === platform)?.url ?? '#';
}

function buildNavItems() {
  return [
    { label: 'Listen', href: '/listen' },
    { label: 'A propos', href: '#about' },
    { label: 'Videos', href: '#video' },
    { label: 'Galerie', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: smoothEase }}
    >
      <p className="mb-4 text-[0.72rem] uppercase tracking-[0.45em] text-white">{eyebrow}</p>
      <h2 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-white sm:text-lg">{body}</p>
    </motion.div>
  );
}

function YouTubePoster({
  videoId,
  title,
  className,
  onClick,
  fallbackSrc,
}: {
  videoId: string;
  title: string;
  className: string;
  onClick: () => void;
  fallbackSrc: string;
}) {
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);

  return (
    <button type="button" onClick={onClick} className="absolute inset-0 h-full w-full">
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 1280px) 100vw, 33vw"
        className={className}
        onError={() => {
          if (src.includes('maxresdefault')) {
            setSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
            return;
          }

          setSrc(fallbackSrc);
        }}
      />
    </button>
  );
}

function ContactLogo({
  kind,
}: {
  kind: 'email' | 'instagram' | 'management' | 'press';
}) {
  if (kind === 'email') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 text-[#f1d3a1]">
        <path
          d="M3 6h18v12H3zM4 7l8 6 8-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 text-[#f1d3a1]">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17" cy="7.2" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 text-[#f1d3a1]">
      <path
        d="M12 3 4 7v5c0 5 3.4 8.8 8 10 4.6-1.2 8-5 8-10V7l-8-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9.5 11.5 11 13l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArtistHero({ artist }: ArtistPageProps) {
  const { scrollYProgress } = useScroll();
  const [currentVariation, setCurrentVariation] = useState<Variation>('luxury');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [styleMenuOpen, setStyleMenuOpen] = useState(false);
  const navItems = useMemo(() => buildNavItems(), []);
  const y1 = useTransform(scrollYProgress, [0, 0.14], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 0.14], [0, -25]);
  const opacity = useTransform(scrollYProgress, [0, 0.14], [1, 0.82]);
  const isLight = themeMode === 'light';
  const streetImage = artist.gallery[1]?.src ?? artist.heroImage.src;
  const futuristicImage = artist.gallery[2]?.src ?? artist.heroImage.src;

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('site-theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      const frame = window.requestAnimationFrame(() => {
        setThemeMode(savedTheme);
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.siteTheme = themeMode;
    window.localStorage.setItem('site-theme', themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const closeOnScroll = () => {
      setMobileMenuOpen(false);
    };

    window.addEventListener('scroll', closeOnScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', closeOnScroll);
    };
  }, [mobileMenuOpen]);

  const renderLuxuryMinimal = () => (
    <motion.section
      className="hero-shell hero-luxury relative flex min-h-screen w-full items-center overflow-hidden bg-[#0d0907]"
      style={{ opacity }}
    >
      <Image
        src={artist.heroImage.src}
        alt={artist.heroImage.alt}
        fill
        priority
        className="object-cover object-center opacity-90"
        sizes="100vw"
      />
      <div className="hero-overlay-primary absolute inset-0 bg-[linear-gradient(180deg,rgba(22,14,10,0.14)_0%,rgba(20,14,12,0.24)_32%,rgba(10,8,8,0.76)_100%)]" />
      <div className="hero-overlay-secondary absolute inset-0 bg-[linear-gradient(90deg,rgba(16,10,8,0.44)_0%,rgba(30,22,18,0.06)_42%,rgba(14,10,10,0.4)_100%)]" />
      <div className="ambient-shift absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(231,199,153,0.28),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(167,104,72,0.22),transparent_30%),linear-gradient(135deg,rgba(95,63,40,0.18),transparent_55%)]" />
      <div className="hero-bottom-fade absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-black via-black/55 to-transparent" />
      <div className="grain-overlay" />
      <div className="film-vignette" />
      <div className="paper-texture" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 lg:px-16">
        <div className="flex min-h-screen items-end pb-16 sm:pb-20 lg:pb-24">
          <div className="w-full max-w-5xl">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3, ease: 'easeOut' }}
            >
              <div className="relative max-w-5xl">
                <motion.p
                  className="mb-4 text-[0.72rem] font-medium tracking-[0.5em] text-white uppercase"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                >
                  Press kit
                </motion.p>
                <motion.h1
                  className="relative z-10 text-6xl leading-[0.92] font-black tracking-[-0.08em] text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:text-8xl md:text-[9rem] lg:text-[12rem]"
                  style={{ y: y1 }}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
                >
                  {artist.stageName}
                </motion.h1>
              </div>

              <motion.div
                className="h-px w-28 bg-white"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.9, ease: 'easeOut' }}
                style={{ originX: 0 }}
              />

              <motion.div
                className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8"
                style={{ y: y2 }}
              >
                <motion.p
                  className="max-w-xl text-base leading-relaxed font-light text-white md:text-xl lg:text-2xl"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
                >
                  {artist.tagline}
                </motion.p>
                <div className="hero-info-panel theme-panel space-y-2 rounded-[1.25rem] bg-black/24 p-4 backdrop-blur-sm md:text-right">
                  <motion.p
                    className="text-sm font-medium tracking-[0.35em] text-white uppercase md:text-base"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 2, ease: 'easeOut' }}
                  >
                    {artist.stageName}
                  </motion.p>
                  <motion.p
                    className="text-sm tracking-[0.3em] text-white uppercase"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 2.15, ease: 'easeOut' }}
                  >
                    {artist.category} • {artist.genre}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );

  const renderStreetEnergy = () => (
    <motion.section
      className="hero-shell hero-street relative min-h-screen w-full overflow-hidden bg-[#120b09]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Image
        src={streetImage}
        alt={`${artist.stageName} visual street energy`}
        fill
        priority
        className="object-cover object-center opacity-88"
        sizes="100vw"
      />
      <div className="hero-overlay-primary absolute inset-0 bg-[linear-gradient(180deg,rgba(36,23,16,0.16),rgba(11,8,8,0.84))]" />
      <div className="hero-overlay-accent ambient-shift absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,130,84,0.24),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(241,210,166,0.1),transparent_28%),linear-gradient(125deg,rgba(120,83,54,0.16),transparent_55%)]" />
      <div className="grain-overlay" />
      <div className="film-vignette" />
      <div className="paper-texture" />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
        <div className="mx-auto w-full max-w-6xl px-8">
          <div className="flex min-h-screen items-center justify-center">
            <div className="max-w-3xl text-center">
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <motion.h1
                  className="relative text-6xl leading-none font-black tracking-tighter text-white md:text-9xl"
                  animate={{
                    textShadow: [
                      '0 0 0px rgba(241, 211, 161, 0)',
                      '0 0 20px rgba(241, 211, 161, 0.28)',
                      '0 0 0px rgba(241, 211, 161, 0)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                >
                  {artist.stageName}
                </motion.h1>
                <motion.div
                  className="mt-4 h-1 w-full bg-[#f1d3a1]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                  style={{ originX: 0.5 }}
                />
              </motion.div>

              <motion.div
                className="mt-8 space-y-3"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.p
                  className="text-xl font-bold tracking-wide text-white uppercase md:text-3xl"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                >
                  {artist.genre}
                </motion.p>
                <motion.p
                  className="text-lg font-black tracking-wider text-[#f1d3a1] uppercase md:text-2xl"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                >
                  {artist.city} • {artist.country}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );

  const renderFuturisticTech = () => (
    <motion.section
      className="hero-shell hero-futuristic relative min-h-screen w-full overflow-hidden bg-[#0b0908]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Image
        src={futuristicImage}
        alt={`${artist.stageName} visual futuristic`}
        fill
        priority
        className="object-cover object-center opacity-82 saturate-0"
        sizes="100vw"
      />
      <div className="hero-overlay-primary absolute inset-0 bg-[linear-gradient(180deg,rgba(34,22,15,0.12),rgba(7,5,5,0.86))]" />
      <div className="hero-overlay-accent ambient-shift absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(199,170,131,0.18),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(130,88,59,0.18),transparent_30%),linear-gradient(145deg,rgba(116,82,55,0.16),transparent_58%)]" />
      <div className="grain-overlay" />
      <div className="paper-texture" />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
        <div className="space-y-12 text-center">
          <motion.h1
            className="relative z-10 text-6xl leading-none font-black tracking-wider text-white md:text-9xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {artist.stageName}
          </motion.h1>
          <motion.div
            className="space-y-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.p
              className="text-lg tracking-widest text-[#f1d3a1] md:text-2xl"
              animate={{
                opacity: [1, 0.5, 1],
                textShadow: [
                  '0 0 0px rgba(241, 211, 161, 0)',
                  '0 0 10px rgba(241, 211, 161, 0.42)',
                  '0 0 0px rgba(241, 211, 161, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            >
              {`> ${artist.slug.toUpperCase()}.PRESSKIT`}
            </motion.p>
            <motion.p
              className="text-sm text-white md:text-lg"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            >
              {artist.shortBio}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );

  const renderCurrentVariation = () => {
    switch (currentVariation) {
      case 'street':
        return renderStreetEnergy();
      case 'futuristic':
        return renderFuturisticTech();
      case 'luxury':
      default:
        return renderLuxuryMinimal();
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-0 py-0 sm:px-6 lg:site-header-shell lg:rounded-full lg:border lg:border-white/15 lg:bg-black/35 lg:px-4 lg:py-3 lg:backdrop-blur-xl">
          <a
            href="#top"
            className="hidden text-sm font-black tracking-[0.35em] text-white uppercase lg:inline-flex"
          >
            {artist.stageName}
          </a>
          <nav className="hidden flex-1 items-center justify-end gap-6 lg:flex">
            {navItems.map((item) =>
              item.href.startsWith('#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link text-xs font-medium tracking-[0.28em] text-white uppercase transition-colors hover:text-[#f1d3a1]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link text-xs font-medium tracking-[0.28em] text-white uppercase transition-colors hover:text-[#f1d3a1]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="ml-auto flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label="Toggle navigation"
          >
            <span className="space-y-1.5">
              <span className="block h-px w-4 bg-white/90 transition-transform" />
              <span className="block h-px w-4 bg-white/90 transition-transform" />
              <span className="block h-px w-4 bg-white/90 transition-transform" />
            </span>
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="mobile-menu-shell mx-auto mt-2 max-w-7xl rounded-[1.5rem] border border-white/15 bg-black/70 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) =>
                item.href.startsWith('#') ? (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="theme-chip rounded-[0.95rem] border border-white/10 bg-white/6 px-3 py-2.5 text-[0.68rem] font-medium tracking-[0.2em] text-white uppercase"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="theme-chip rounded-[0.95rem] border border-white/10 bg-white/6 px-3 py-2.5 text-[0.68rem] font-medium tracking-[0.2em] text-white uppercase"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        ) : null}
      </header>

      {renderCurrentVariation()}

      <div className="fixed bottom-4 right-4 z-50 sm:bottom-8 sm:right-8">
        {styleMenuOpen ? (
          <div className="style-panel mb-3 rounded-[1.5rem] border border-white/15 bg-black/72 p-3 backdrop-blur-2xl">
            <div className="mb-2 flex items-center gap-2">
              <button
                onClick={() => setThemeMode('dark')}
                className={`theme-chip rounded-full px-3 py-2 text-[0.65rem] font-bold tracking-[0.24em] uppercase transition-colors ${
                  !isLight ? 'theme-chip-active' : ''
                }`}
              >
                Nuit
              </button>
              <button
                onClick={() => setThemeMode('light')}
                className={`theme-chip rounded-full px-3 py-2 text-[0.65rem] font-bold tracking-[0.24em] uppercase transition-colors ${
                  isLight ? 'theme-chip-active' : ''
                }`}
              >
                Jour
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentVariation('luxury')}
                className={`theme-chip rounded-full px-3 py-2 text-[0.65rem] font-bold tracking-[0.24em] uppercase transition-colors ${
                  currentVariation === 'luxury' ? 'theme-chip-active' : ''
                }`}
              >
                Luxe
              </button>
              <button
                onClick={() => setCurrentVariation('street')}
                className={`theme-chip rounded-full px-3 py-2 text-[0.65rem] font-bold tracking-[0.24em] uppercase transition-colors ${
                  currentVariation === 'street' ? 'theme-chip-active' : ''
                }`}
              >
                Scene
              </button>
              <button
                onClick={() => setCurrentVariation('futuristic')}
                className={`theme-chip rounded-full px-3 py-2 text-[0.65rem] font-bold tracking-[0.24em] uppercase transition-colors ${
                  currentVariation === 'futuristic' ? 'theme-chip-active' : ''
                }`}
              >
                Futur
              </button>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setStyleMenuOpen((open) => !open)}
          className="style-toggle rounded-full border border-white/15 bg-black/72 px-4 py-3 text-[0.65rem] font-bold tracking-[0.24em] text-white uppercase backdrop-blur-2xl transition-colors hover:bg-black/84"
        >
          Style
        </button>
      </div>
    </>
  );
}

function AboutSection({ artist }: { artist: Artist }) {
  return (
    <section
      id="about"
      className="press-section section-about relative overflow-hidden border-t border-white/12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-32"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,246,230,0.05),rgba(33,23,18,0.42)_58%,transparent)]" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(226,192,148,0.16),transparent_56%)] blur-2xl" />
      <div className="grain-overlay" />
      <div className="paper-texture" />
      <div className="warm-spotlight right-[-8rem] top-[12%]" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-10">
        <div className="flex flex-col justify-between gap-8 lg:gap-10">
          <div className="space-y-6">
            <p className="text-[0.72rem] uppercase tracking-[0.5em] text-white">L&apos;artiste</p>
            <h2 className="max-w-xl text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              A propos de {artist.stageName}
            </h2>
            <p className="max-w-xl text-base leading-8 text-white sm:text-lg">{artist.longBio}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {artist.highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="theme-overlay-panel rounded-[1.5rem] border border-white/10 bg-black/22 p-5 backdrop-blur-md"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white">
                  {highlight.label}
                </p>
                <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-white">
                  {highlight.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-white">{highlight.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="relative min-h-[28rem] overflow-hidden rounded-[2rem]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <Image
            src={artist.gallery[0]?.src ?? artist.heroImage.src}
            alt={artist.gallery[0]?.alt ?? artist.heroImage.alt}
            fill
            className="object-cover object-[center_18%]"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="theme-image-overlay absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-white">
              {artist.category} • {artist.genre}
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-white">{artist.shortBio}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ListenHighlightSection({ artist }: ArtistPageProps) {
  const feature = getPrimaryEmbed(artist.streamingLinks);

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
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-white">Listen</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-white sm:text-4xl lg:text-5xl">
                Ecouter {artist.stageName}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white sm:text-base">
                {artist.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {artist.streamingLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="theme-chip inline-flex rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white"
                >
                  {link.platform}
                </a>
              ))}
              <Link
                href="/listen"
                className="theme-chip inline-flex rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white"
              >
                Full page
              </Link>
            </div>
          </div>

          <div className="theme-panel-subtle relative bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.04))] p-4 sm:p-5 lg:p-6">
            <div className="theme-embed-shell overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/30 shadow-[0_18px_60px_rgba(0,0,0,0.3)]">
              {feature?.embedUrl ? (
                <iframe
                  title={feature.label}
                  src={feature.embedUrl}
                  width="100%"
                  height="352"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="block"
                />
              ) : (
                <div className="relative h-[352px]">
                  <Image
                    src={artist.heroImage.src}
                    alt={artist.heroImage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="theme-image-overlay absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function VideoSection({ artist }: { artist: Artist }) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  if (artist.videos.length === 0) {
    return null;
  }

  return (
    <section
      id="video"
      className="press-section section-video relative overflow-hidden border-t border-white/12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,14,12,0.95),rgba(8,8,8,0.35))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,214,174,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(179,118,79,0.14),transparent_26%)]" />
      <div className="grain-overlay" />
      <div className="paper-texture" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Videos"
          title="Live et visuels"
          body={`Une selection de videos pour decouvrir ${artist.stageName} en mouvement, sur scene et dans son univers.`}
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {artist.videos.map((video, index) => (
            <motion.article
              key={video.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: smoothEase }}
              className="theme-panel group grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {video.embedId && activeVideoId === video.embedId ? (
                  <iframe
                    className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.02]"
                    src={`https://www.youtube-nocookie.com/embed/${video.embedId}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : video.embedId ? (
                  <YouTubePoster
                    videoId={video.embedId}
                    title={video.title}
                    onClick={() => setActiveVideoId(video.embedId ?? null)}
                    fallbackSrc={video.cover}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                ) : (
                  <Image
                    src={video.cover}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                )}
                <div className="theme-image-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />
                <div className="film-vignette" />
              </div>

              <div className="theme-overlay-panel border-t border-white/10 bg-black/88 p-4 backdrop-blur-md">
                <h3 className="text-xl font-black tracking-[-0.04em] text-white">{video.title}</h3>
                <p className="mt-1 text-sm leading-5 text-white">{video.note}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ artist }: ArtistPageProps) {
  return (
    <section
      id="gallery"
      className="press-section section-gallery relative overflow-hidden border-t border-white/12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-32"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,14,13,0.94),rgba(10,10,10,0.2))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(233,198,154,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(155,98,66,0.14),transparent_24%)]" />
      <div className="grain-overlay" />
      <div className="film-vignette" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="Galerie"
            title="Univers visuel"
            body={`Une selection d'images pour decouvrir l'identite visuelle et la presence de ${artist.stageName}.`}
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
              Voir la galerie
            </Link>
          </motion.div>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-3 sm:mt-12 sm:gap-5 sm:pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {artist.gallery.slice(0, 6).map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: smoothEase }}
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
        </div>
      </div>
    </section>
  );
}

function PressQuotesSection({ artist }: { artist: Artist }) {
  if (artist.pressQuotes.length === 0) {
    return null;
  }

  return (
    <section className="press-section section-press relative overflow-hidden border-t border-white/12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,16,14,0.96),rgba(10,9,9,0.22))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(170,120,87,0.16),transparent_24%),radial-gradient(circle_at_right,rgba(232,198,154,0.14),transparent_26%)]" />
      <div className="grain-overlay" />
      <div className="paper-texture" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Press"
          title="Quotes et positionnement"
          body="Une couche editoriale legere pour la presse, le booking et la lecture rapide du projet."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {artist.pressQuotes.map((quote, index) => (
            <motion.article
              key={`${quote.source}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: smoothEase }}
              className="theme-panel rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white">{quote.kind}</p>
              <h3 className="mt-4 text-2xl font-black tracking-[-0.04em] text-white">
                {quote.source}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white">&ldquo;{quote.quote}&rdquo;</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ artist }: { artist: Artist }) {
  const contactItems = [
    {
      label: 'Booking',
      value: artist.bookingEmail,
      href: `mailto:${artist.bookingEmail}`,
      kind: 'email' as const,
    },
    artist.managementContact
      ? {
          label: 'Management',
          value: artist.managementContact.email,
          href: `mailto:${artist.managementContact.email}`,
          kind: 'management' as const,
        }
      : null,
    artist.pressContact
      ? {
          label: 'Presse',
          value: artist.pressContact.email,
          href: `mailto:${artist.pressContact.email}`,
          kind: 'press' as const,
        }
      : null,
    {
      label: 'Instagram',
      value: artist.socials.find((social) => social.platform === 'Instagram')?.handle ?? '@artist',
      href: getSocialUrl(artist, 'Instagram'),
      kind: 'instagram' as const,
    },
  ].filter(Boolean) as Array<{
    label: string;
    value: string;
    href: string;
    kind: 'email' | 'instagram' | 'management' | 'press';
  }>;

  return (
    <section
      id="contact"
      className="press-section section-contact relative overflow-hidden border-t border-white/12 px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-32"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(61,42,28,0.62),rgba(12,12,12,0.3))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,198,154,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(141,97,67,0.16),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.05))]" />
      <div className="grain-overlay" />
      <div className="paper-texture" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 sm:pt-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 lg:pt-14">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.45em] text-white">Contact</p>
          <h2 className="mt-5 max-w-xl text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
            Contact
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white sm:text-lg">
            Pour toute demande professionnelle, booking ou prise de contact, voici les coordonnees
            dediees a {artist.stageName}.
          </p>
        </div>

        <div className="border-t border-white/12">
          <div className="grid sm:grid-cols-2">
            {contactItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                className="group grid min-h-[10rem] grid-cols-1 border-b border-white/10 px-0 py-6 transition-colors hover:bg-white/[0.02] sm:px-6 lg:min-h-[11rem] lg:py-7"
                style={{
                  borderRight:
                    index % 2 === 0 && index !== contactItems.length - 1
                      ? '1px solid rgba(255,255,255,0.10)'
                      : undefined,
                }}
              >
                <div className="flex items-center gap-4">
                  <ContactLogo kind={item.kind} />
                  <p className="text-[0.72rem] uppercase tracking-[0.32em] text-white/72">
                    {item.label}
                  </p>
                </div>
                <div className="min-w-0 pl-0 sm:pl-8">
                  <p className="mt-4 max-w-[20rem] text-lg leading-7 text-white transition-colors group-hover:text-[#f1d3a1] sm:text-xl">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArtistHomePage({ artist }: ArtistPageProps) {
  return (
    <div className="site-shell relative overflow-x-hidden bg-[#0b0908] text-white" data-site-theme="dark">
      <ArtistHero artist={artist} />
      <main className="page-main relative">
        <ListenHighlightSection artist={artist} />
        <AboutSection artist={artist} />
        <VideoSection artist={artist} />
        <GallerySection artist={artist} />
        <PressQuotesSection artist={artist} />
        <ContactSection artist={artist} />
      </main>
    </div>
  );
}

export function ArtistGalleryPage({ artist }: ArtistPageProps) {
  return (
    <main className="gallery-shell relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#19110d_0%,#241814_22%,#16100d_48%,#0d0908_100%)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(233,198,154,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(155,98,66,0.14),transparent_24%)]" />
      <div className="grain-overlay" />
      <div className="film-vignette" />
      <div className="paper-texture" />

      <section className="gallery-section relative overflow-hidden border-b border-white/12 px-5 pb-14 pt-28 sm:px-8 lg:px-12 lg:pb-20 lg:pt-32">
        <div className="relative z-10 mx-auto max-w-7xl">
          <Link
            href="/"
            className="theme-chip inline-flex items-center rounded-full border border-white/15 bg-white/8 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-white transition-colors hover:bg-white/12"
          >
            Back to press kit
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-white">Galerie</p>
              <h1 className="mt-4 text-5xl font-black tracking-[-0.07em] text-white sm:text-6xl lg:text-8xl">
                {artist.stageName}
              </h1>
              <p className="theme-overlay-panel mt-5 max-w-xl rounded-[1.25rem] bg-black/24 p-4 text-base leading-7 text-white backdrop-blur-sm sm:text-lg">
                A curated gallery for press, booking, and visual reference.
              </p>
            </div>

            <div className="theme-panel rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-white">Image selection</p>
              <p className="mt-3 text-sm leading-6 text-white">
                Visuals remain isolated per artist, while the page system stays shared and reusable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-grid-section relative bg-[linear-gradient(180deg,rgba(12,10,10,0),rgba(255,255,255,0.03))] px-5 pb-20 pt-8 sm:px-8 lg:px-12 lg:pb-28">
        <div className="warm-spotlight left-[-10rem] top-[10%]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {artist.gallery.map((image, index) => (
            <motion.figure
              key={image.src}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: index * 0.05, ease: smoothEase }}
              className="theme-panel group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04]"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1280px) 100vw, 26rem"
                />
                <div className="theme-image-overlay absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                <div className="film-vignette" />
              </div>
              <figcaption className="theme-overlay-panel border-t border-white/10 bg-black/28 p-5 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.28em] text-white">Image {index + 1}</p>
                <p className="mt-2 text-lg text-white">{image.caption}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </main>
  );
}

export function ArtistListenPage({ artist }: ArtistPageProps) {
  const primaryEmbed = getPrimaryEmbed(artist.streamingLinks);

  return (
    <main className="gallery-shell relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#120d0b_0%,#211612_22%,#140f0d_54%,#0d0908_100%)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(233,198,154,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(155,98,66,0.14),transparent_24%)]" />
      <div className="grain-overlay" />
      <div className="film-vignette" />
      <div className="paper-texture" />

      <section className="relative overflow-hidden border-b border-white/12 px-5 pb-14 pt-28 sm:px-8 lg:px-12 lg:pb-20 lg:pt-32">
        <div className="relative z-10 mx-auto max-w-7xl">
          <Link
            href="/"
            className="theme-chip inline-flex items-center rounded-full border border-white/15 bg-white/8 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-white transition-colors hover:bg-white/12"
          >
            Back to press kit
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-white">Listen</p>
              <h1 className="mt-4 text-5xl font-black tracking-[-0.07em] text-white sm:text-6xl lg:text-8xl">
                {artist.stageName}
              </h1>
              <p className="theme-overlay-panel mt-5 max-w-xl rounded-[1.25rem] bg-black/24 p-4 text-base leading-7 text-white backdrop-blur-sm sm:text-lg">
                Streaming links, featured embed and editorial cues stay artist-specific while the UI remains shared.
              </p>
            </div>

            <div className="theme-panel rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-white">Primary links</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {artist.streamingLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="theme-chip rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="theme-embed-shell overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/25">
            {primaryEmbed?.embedUrl ? (
              <iframe
                title={primaryEmbed.label}
                src={primaryEmbed.embedUrl}
                width="100%"
                height="480"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block"
              />
            ) : (
              <div className="relative h-[480px]">
                <Image
                  src={artist.heroImage.src}
                  alt={artist.heroImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="theme-image-overlay absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="theme-panel rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[0.72rem] uppercase tracking-[0.32em] text-white">Artist positioning</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
                {artist.shortBio}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white">{artist.longBio}</p>
            </div>

            <div className="theme-panel rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[0.72rem] uppercase tracking-[0.32em] text-white">Press quotes</p>
              <div className="mt-4 space-y-4">
                {artist.pressQuotes.map((quote, index) => (
                  <div
                    key={`${quote.source}-${index}`}
                    className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-white">{quote.source}</p>
                    <p className="mt-2 text-sm leading-7 text-white">&ldquo;{quote.quote}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
