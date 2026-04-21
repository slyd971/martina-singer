'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { artistData } from '@/components/artist-press-kit';

export default function GalleryPage() {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

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
  }, [themeMode]);

  return (
    <main
      className="gallery-shell relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#19110d_0%,#241814_22%,#16100d_48%,#0d0908_100%)] text-white"
      data-site-theme={themeMode}
    >
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-white">Gallery</p>
              <h1 className="mt-4 text-5xl font-black tracking-[-0.07em] text-white sm:text-6xl lg:text-8xl">
                {artistData.name}
              </h1>
              <p className="theme-overlay-panel mt-5 max-w-xl rounded-[1.25rem] bg-black/24 p-4 text-base leading-7 text-white backdrop-blur-sm sm:text-lg">
                A curated gallery for press, booking, and visual reference.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="theme-panel rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-white">Image selection</p>
              <p className="mt-3 text-sm leading-6 text-white">
                These visuals can be used as a clean overview of the artist universe across portrait,
                performance, and editorial moments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="gallery-grid-section relative bg-[linear-gradient(180deg,rgba(12,10,10,0),rgba(255,255,255,0.03))] px-5 pb-20 pt-8 sm:px-8 lg:px-12 lg:pb-28">
        <div className="warm-spotlight left-[-10rem] top-[10%]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {artistData.gallery.map((image, index) => (
            <motion.figure
              key={image.src}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
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
