import { NextRequest, NextResponse } from 'next/server';

const SINGER_HOSTNAMES = ['martina', 'singer-presskit'];

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const isSingerDomain = SINGER_HOSTNAMES.some((h) => host.includes(h));

  if (!isSingerDomain) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    if (pathname === '/') {
      url.pathname = '/artist-demo';
      return NextResponse.rewrite(url);
    }
    if (pathname === '/gallery') {
      url.pathname = '/artist-demo/gallery';
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/gallery'],
};
