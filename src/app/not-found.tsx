import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="site-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0908] px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(241,211,161,0.14),transparent_28%),linear-gradient(180deg,rgba(18,14,13,0.92),rgba(10,10,10,1))]" />
      <div className="grain-overlay" />
      <div className="film-vignette" />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="text-[0.72rem] uppercase tracking-[0.45em] text-white">404</p>
        <h1 className="mt-6 text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl">
          Artist not found
        </h1>
        <p className="mt-6 text-base leading-7 text-white/80 sm:text-lg">
          La page demandee est introuvable. Retournez au press kit principal de Martina.
        </p>
        <Link
          href="/"
          className="theme-chip mt-8 inline-flex rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-bold uppercase tracking-[0.26em] text-white transition-colors hover:bg-white/12"
        >
          Retour au site
        </Link>
      </div>
    </main>
  );
}
