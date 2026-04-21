import type { Metadata, Viewport } from 'next';
import './globals.css';
import { martinaArtist } from '@/data/artists/martina';

const hostname = martinaArtist.domain ?? martinaArtist.vercelSubdomain;

export const metadata: Metadata = {
  metadataBase: new URL(`https://${hostname}`),
  title: {
    default: martinaArtist.seo.title,
    template: '%s',
  },
  description: martinaArtist.seo.description,
};

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
