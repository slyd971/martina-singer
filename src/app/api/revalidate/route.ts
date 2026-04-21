import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { getAirtableRevalidateSlugFromRequestBody, isAirtableConfigured } from '@/lib/airtable';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET ?? '';

function getSecret(request: Request) {
  return (
    request.headers.get('x-revalidate-secret') ??
    new URL(request.url).searchParams.get('secret') ??
    ''
  );
}

export async function POST(request: Request) {
  if (!REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: 'REVALIDATE_SECRET not configured.' }, { status: 500 });
  }

  if (getSecret(request) !== REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: 'Invalid secret.' }, { status: 401 });
  }

  let body: unknown = null;
  try { body = await request.json(); } catch { body = null; }

  const slug = getAirtableRevalidateSlugFromRequestBody(body);
  const tags = slug
    ? ['airtable', 'airtable:clients', `airtable:client:${slug}`]
    : ['airtable', 'airtable:clients'];

  for (const tag of tags) {
    revalidateTag(tag, 'max');
  }

  return NextResponse.json({
    ok: true,
    configured: isAirtableConfigured(),
    revalidated: tags,
  });
}
