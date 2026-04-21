'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  AboutSection,
  ContactSection,
  GallerySection,
  LiveSection,
  MusicSection,
  PressSection,
  SocialProofSection,
  SocialWallSection,
  SpotifySection,
  VideoSection,
} from '@/components/artist-press-kit';

type Variation = 'luxury' | 'street' | 'futuristic';
type ThemeMode = 'dark' | 'light';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [currentVariation, setCurrentVariation] = useState<Variation>('luxury');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [styleMenuOpen, setStyleMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Music', href: '#music' },
    { label: 'Video', href: '#video' },
    { label: 'Press', href: '#press' },
    { label: 'Booking', href: '#booking' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const y1 = useTransform(scrollYProgress, [0, 0.14], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 0.14], [0, -25]);
  const opacity = useTransform(scrollYProgress, [0, 0.14], [1, 0.82]);
  const isLight = themeMode === 'light';

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

  const renderLuxuryMinimal = () => (
    <motion.section
      className="hero-shell hero-luxury relative flex min-h-screen w-full items-center overflow-hidden bg-[#0d0907]"
      style={{ opacity }}
    >
      <Image
        src="/dj-assets/profile.jpg"
        alt="Premium artist cover"
        fill
        priority
        className="object-cover object-[center_18%] opacity-90"
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
                  SLY&apos;D
                </motion.h1>
              </div>

              <motion.div
                className="h-px w-28 bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
                style={{ originX: 0 }}
              />

              <motion.div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-8" style={{ y: y2 }}>
                <motion.p
                  className="max-w-xl text-base leading-relaxed font-light text-white md:text-xl lg:text-2xl"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
                >
                  Sly&apos;D is a singer and songwriter blending contemporary pop, R&amp;B, and electronic influences.
                </motion.p>
                <div className="hero-info-panel theme-panel space-y-2 rounded-[1.25rem] bg-black/24 p-4 backdrop-blur-sm md:text-right">
                  <motion.p
                    className="text-sm font-medium tracking-[0.35em] text-white uppercase md:text-base"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 2, ease: 'easeOut' }}
                  >
                    Paris • London
                  </motion.p>
                  <motion.p
                    className="text-sm tracking-[0.3em] text-white uppercase"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 2.15, ease: 'easeOut' }}
                  >
                    Pop • R&amp;B • Live Performance
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
        src="/dj-assets/gallery-5.jpg"
        alt="Street premium background"
        fill
        priority
        className="object-cover object-[center_24%] opacity-88"
        sizes="100vw"
      />
      <div className="hero-overlay-primary absolute inset-0 bg-[linear-gradient(180deg,rgba(36,23,16,0.16),rgba(11,8,8,0.84))]" />
      <div className="hero-overlay-accent ambient-shift absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,130,84,0.24),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(241,210,166,0.1),transparent_28%),linear-gradient(125deg,rgba(120,83,54,0.16),transparent_55%)]" />
      <div className="grain-overlay" />
      <div className="film-vignette" />
      <div className="paper-texture" />
      <div className="hero-grid-layer absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(241, 211, 161, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(160, 96, 66, 0.12) 0%, transparent 50%),
              linear-gradient(45deg, transparent 40%, rgba(255, 244, 227, 0.03) 50%, transparent 60%)
            `,
            backgroundSize: '100% 100%, 100% 100%, 20px 20px',
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`light-${i}`}
            className="hero-light-column absolute bottom-0 w-1 bg-gradient-to-t from-[#e6c18d]/45 to-transparent"
            style={{ left: `${15 + i * 18}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2], height: [120, 140, 120] }}
            transition={{
              duration: 3 + i * 0.35,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute h-1 w-1 rounded-full bg-[#f1d3a1]/70"
            style={{ left: `${8 + i * 7}%`, top: `${10 + (i % 5) * 18}%` }}
            animate={{ y: [0, -20, 0], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{
              duration: 4 + (i % 4) * 0.4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
        <div className="mx-auto w-full max-w-6xl px-8">
          <div className="grid min-h-screen grid-cols-12 items-center gap-8">
            <div className="col-span-3 space-y-8">
              <motion.div
                className="space-y-4"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="h-px w-16 bg-[#f1d3a1]" />
                <div className="h-px w-8 bg-white" />
                <div className="h-px w-12 bg-[#c99863]" />
              </motion.div>

              <motion.div
                className="text-xs font-mono tracking-widest text-white uppercase"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div>VOCAL</div>
                <div>LIVE</div>
                <div>PRESENCE</div>
              </motion.div>
            </div>

            <div className="col-span-6 text-center">
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
                  SLY&apos;D
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
                className="mt-8 space-y-4"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.p
                  className="text-xl font-bold tracking-wide text-white uppercase md:text-3xl"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                >
                  Midnight pop
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
                  Editorial live act
                </motion.p>
              </motion.div>

              <motion.div
                className="mt-12 flex items-center justify-center space-x-6"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1, type: 'spring' }}
              >
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center border-2 border-[#f1d3a1]">
                    <motion.div
                      className="h-4 w-4 bg-[#f1d3a1]"
                      animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                    />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#f1d3a1]/55"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                  />
                </div>
                <span className="text-sm font-bold tracking-widest text-white uppercase">Live booking</span>
              </motion.div>
            </div>

            <div className="col-span-3 space-y-8">
              <motion.div
                className="text-right text-xs font-mono tracking-widest text-white uppercase"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div>STREAMS</div>
                <div className="text-sm text-[#f1d3a1]">24M+</div>
                <div className="mt-4">AUDIENCE</div>
                <div className="text-sm text-[#f1d3a1]">410K</div>
              </motion.div>

              <motion.div
                className="flex justify-end space-x-2"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="h-px w-6 bg-white/30" />
                <div className="h-px w-4 bg-[#f1d3a1]" />
                <div className="h-px w-8 bg-white/20" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute right-8 top-8 text-xs font-mono tracking-widest text-white uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div>PRESS</div>
        <div>LIVE</div>
        <div>SHOWCASE</div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 text-xs font-mono tracking-widest text-white uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div>SINGER</div>
        <div>SONGWRITER</div>
        <div>PERFORMER</div>
      </motion.div>
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
        src="/dj-assets/gallery-2.jpg"
        alt="Futuristic premium background"
        fill
        priority
        className="object-cover object-[center_20%] opacity-82 saturate-0"
        sizes="100vw"
      />
      <div className="hero-overlay-primary absolute inset-0 bg-[linear-gradient(180deg,rgba(34,22,15,0.12),rgba(7,5,5,0.86))]" />
      <div className="hero-overlay-accent ambient-shift absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(199,170,131,0.18),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(130,88,59,0.18),transparent_30%),linear-gradient(145deg,rgba(116,82,55,0.16),transparent_58%)]" />
      <div className="grain-overlay" />
      <div className="paper-texture" />
      <div className="hero-grid-layer absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(241, 211, 161, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(160, 96, 66, 0.08) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="hero-light-column absolute h-full w-px bg-[#f1d3a1]/35"
            style={{ left: `${10 + i * 12}%` }}
            animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
            transition={{
              duration: 2 + i * 0.25,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.12,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
        <div className="space-y-12 text-center">
          <div className="relative">
            <motion.h1
              className="relative z-10 text-6xl leading-none font-black tracking-wider text-white md:text-9xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              SLY&apos;D
            </motion.h1>
          </div>

          <motion.div
            className="space-y-4 font-mono"
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
              {`> SLYD.LIVE.SESSION`}
            </motion.p>
            <motion.p
              className="text-sm text-white md:text-lg"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            >
              curating visuals, live cuts, and booking assets...
            </motion.p>
          </motion.div>

          <motion.div
            className="flex items-center justify-center space-x-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
          >
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center border border-[#f1d3a1]">
                <motion.div
                  className="h-2 w-2 rounded-full bg-[#f1d3a1]"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                />
              </div>
              <motion.div
                className="absolute left-0 top-0 h-px w-full bg-[#f1d3a1]"
                animate={{ y: [0, 48, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
              />
            </div>
            <span className="text-sm font-mono tracking-widest text-white uppercase">press access</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute left-8 top-8 font-mono text-xs text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div>STREAMS: 24M+</div>
        <div>AUDIENCE: 410K</div>
        <div>FORMAT: LIVE</div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 text-right font-mono text-xs text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div>BOOKING.STATUS</div>
        <div>OPEN</div>
        <div>2026</div>
      </motion.div>
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
    <div
      className="site-shell relative overflow-x-hidden bg-[#0b0908] text-white"
      data-site-theme={themeMode}
    >
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-6">
        <div className="site-header-shell mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-xl sm:px-6">
          <a href="#top" className="text-sm font-black tracking-[0.35em] text-white uppercase">
            SLY&apos;D
          </a>

          <nav className="hidden flex-1 items-center justify-end gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link text-xs font-medium tracking-[0.28em] text-white uppercase transition-colors hover:text-[#f1d3a1]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="theme-chip flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 lg:hidden"
            aria-label="Toggle navigation"
          >
            <span className="space-y-1.5">
              <span className="block h-px w-4 bg-white" />
              <span className="block h-px w-4 bg-white" />
              <span className="block h-px w-4 bg-white" />
            </span>
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="mobile-menu-shell mx-auto mt-3 max-w-7xl rounded-[1.75rem] border border-white/15 bg-black/70 p-5 backdrop-blur-2xl lg:hidden">
            <div className="grid gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="theme-chip rounded-[1rem] border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium tracking-[0.24em] text-white uppercase"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                className={`theme-chip rounded-full px-4 py-2 text-[0.65rem] font-bold tracking-[0.24em] uppercase ${
                  !isLight ? 'theme-chip-active' : ''
                }`}
              >
                Dark
              </button>
              <button
                type="button"
                onClick={() => setThemeMode('light')}
                className={`theme-chip rounded-full px-4 py-2 text-[0.65rem] font-bold tracking-[0.24em] uppercase ${
                  isLight ? 'theme-chip-active' : ''
                }`}
              >
                Light
              </button>
            </div>

            <button
              type="button"
              onClick={() => setStyleMenuOpen((open) => !open)}
              className="theme-chip mt-5 inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[0.65rem] font-bold tracking-[0.24em] text-white uppercase"
            >
              {styleMenuOpen ? 'Hide styles' : 'Show styles'}
            </button>

            {styleMenuOpen ? (
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setCurrentVariation('luxury');
                    setMobileMenuOpen(false);
                    setStyleMenuOpen(false);
                  }}
                  className={`theme-chip rounded-full px-3 py-2 text-[0.65rem] font-bold tracking-[0.22em] uppercase ${
                    currentVariation === 'luxury' ? 'theme-chip-active' : ''
                  }`}
                >
                  Luxury
                </button>
                <button
                  onClick={() => {
                    setCurrentVariation('street');
                    setMobileMenuOpen(false);
                    setStyleMenuOpen(false);
                  }}
                  className={`theme-chip rounded-full px-3 py-2 text-[0.65rem] font-bold tracking-[0.22em] uppercase ${
                    currentVariation === 'street' ? 'theme-chip-active' : ''
                  }`}
                >
                  Street
                </button>
                <button
                  onClick={() => {
                    setCurrentVariation('futuristic');
                    setMobileMenuOpen(false);
                    setStyleMenuOpen(false);
                  }}
                  className={`theme-chip rounded-full px-3 py-2 text-[0.65rem] font-bold tracking-[0.22em] uppercase ${
                    currentVariation === 'futuristic' ? 'theme-chip-active' : ''
                  }`}
                >
                  Future
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </header>

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
                Dark
              </button>
              <button
                onClick={() => setThemeMode('light')}
                className={`theme-chip rounded-full px-3 py-2 text-[0.65rem] font-bold tracking-[0.24em] uppercase transition-colors ${
                  isLight ? 'theme-chip-active' : ''
                }`}
              >
                Light
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentVariation('luxury')}
                className={`theme-chip rounded-full px-3 py-2 text-[0.65rem] font-bold tracking-[0.24em] uppercase transition-colors ${
                  currentVariation === 'luxury' ? 'theme-chip-active' : ''
                }`}
              >
                Luxury
              </button>
              <button
                onClick={() => setCurrentVariation('street')}
                className={`theme-chip rounded-full px-3 py-2 text-[0.65rem] font-bold tracking-[0.24em] uppercase transition-colors ${
                  currentVariation === 'street' ? 'theme-chip-active' : ''
                }`}
              >
                Street
              </button>
              <button
                onClick={() => setCurrentVariation('futuristic')}
                className={`theme-chip rounded-full px-3 py-2 text-[0.65rem] font-bold tracking-[0.24em] uppercase transition-colors ${
                  currentVariation === 'futuristic' ? 'theme-chip-active' : ''
                }`}
              >
                Future
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

      <div id="top">{renderCurrentVariation()}</div>

      <main className="page-main relative bg-[linear-gradient(180deg,#1e130e_0%,#2d1d16_16%,#140f0d_34%,#261912_56%,#0b0908_100%)]">
        <section id="numbers">
          <SocialProofSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="music">
          <MusicSection />
        </section>
        <section id="spotify">
          <SpotifySection />
        </section>
        <section id="video">
          <VideoSection />
        </section>
        <section id="press">
          <PressSection />
        </section>
        <section id="booking">
          <LiveSection />
        </section>
        <section id="gallery">
          <GallerySection />
        </section>
        <section id="social">
          <SocialWallSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  );
}
