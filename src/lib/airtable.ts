import type { Artist, ArtistGalleryImage, ArtistVideo, ArtistContactPoint, ArtistHighlight, ArtistPressQuote } from '@/types/artist';
import { martinaArtist } from '@/data/artists/martina';

// ─── Config ──────────────────────────────────────────────────────────────────

const AIRTABLE_API_URL = process.env.AIRTABLE_API_URL ?? 'https://api.airtable.com/v0';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN ?? process.env.AIRTABLE_PAT ?? null;
const AIRTABLE_REVALIDATE_SECONDS = Number(process.env.AIRTABLE_REVALIDATE_SECONDS ?? '60');

const TABLES = {
  clients:     process.env.AIRTABLE_TABLE_CLIENTS       ?? 'Clients',
  contacts:    process.env.AIRTABLE_TABLE_CONTACTS      ?? 'Contacts',
  sections:    process.env.AIRTABLE_TABLE_SECTIONS      ?? 'Sections',
  gallery:     process.env.AIRTABLE_TABLE_GALLERY       ?? 'Gallery Images',
  videos:      process.env.AIRTABLE_TABLE_VIDEOS        ?? 'Videos',
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type AirtableRecord = { id: string; fields: Record<string, unknown> };
type AirtableResponse = { records: AirtableRecord[]; offset?: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function isAirtableConfigured(): boolean {
  return Boolean(AIRTABLE_TOKEN && AIRTABLE_BASE_ID);
}

function str(fields: Record<string, unknown>, key: string): string {
  const v = fields[key];
  return typeof v === 'string' ? v.trim() : '';
}

function num(fields: Record<string, unknown>, key: string): number | undefined {
  const v = fields[key];
  return typeof v === 'number' ? v : undefined;
}

function strLines(fields: Record<string, unknown>, key: string): string[] {
  const v = fields[key];
  if (typeof v === 'string') return v.split('\n').map((s) => s.trim()).filter(Boolean);
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  return [];
}

function attachment(fields: Record<string, unknown>, key: string): string | undefined {
  const v = fields[key];
  if (Array.isArray(v) && v.length > 0) {
    const a = v[0] as { url?: string };
    return typeof a.url === 'string' ? a.url : undefined;
  }
  return undefined;
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function fetchRecords(table: string, filterFormula?: string): Promise<AirtableRecord[]> {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) return [];

  const params = new URLSearchParams();
  if (filterFormula) params.set('filterByFormula', filterFormula);

  const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}?${params}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
      next: {
        revalidate: AIRTABLE_REVALIDATE_SECONDS,
        tags: ['airtable', `airtable:${table.toLowerCase()}`],
      },
    });

    if (!res.ok) return [];

    const data: AirtableResponse = await res.json();
    return data.records ?? [];
  } catch {
    return [];
  }
}

// ─── Table mappers ────────────────────────────────────────────────────────────

function mapClient(record: AirtableRecord): Partial<Artist> {
  const f = record.fields;
  const partial: Partial<Artist> = {};

  if (str(f, 'name'))        partial.name = str(f, 'name');
  if (str(f, 'stageName'))   partial.stageName = str(f, 'stageName');
  if (str(f, 'tagline'))     partial.tagline = str(f, 'tagline');
  if (str(f, 'city'))        partial.city = str(f, 'city');
  if (str(f, 'country'))     partial.country = str(f, 'country');
  if (str(f, 'genre'))       partial.genre = str(f, 'genre');
  if (str(f, 'description')) partial.description = str(f, 'description');
  if (str(f, 'shortBio'))    partial.shortBio = str(f, 'shortBio');
  if (str(f, 'longBio'))     partial.longBio = str(f, 'longBio');
  if (str(f, 'bookingEmail')) partial.bookingEmail = str(f, 'bookingEmail');

  const heroSrc = attachment(f, 'heroImageFile') ?? str(f, 'heroImage');
  const heroAlt = str(f, 'heroImageAlt');
  if (heroSrc) partial.heroImage = { src: heroSrc, alt: heroAlt || partial.stageName || '' };

  return partial;
}

function mapGalleryImage(record: AirtableRecord): ArtistGalleryImage | null {
  const f = record.fields;
  const src = attachment(f, 'imageFile') ?? str(f, 'src');
  if (!src) return null;
  return {
    src,
    alt: str(f, 'alt'),
    caption: str(f, 'caption'),
  };
}

function mapVideo(record: AirtableRecord): ArtistVideo | null {
  const f = record.fields;
  const title = str(f, 'title');
  if (!title) return null;
  return {
    title,
    note: str(f, 'note'),
    embedId: str(f, 'embedId') || undefined,
    cover: attachment(f, 'coverFile') ?? str(f, 'cover'),
  };
}

function mapContact(record: AirtableRecord): { role: string; contact: ArtistContactPoint } | null {
  const f = record.fields;
  const email = str(f, 'email');
  if (!email) return null;
  return {
    role: str(f, 'role'),
    contact: {
      name: str(f, 'name'),
      email,
      phone: str(f, 'phone') || undefined,
      role: str(f, 'role'),
    },
  };
}

function mapHighlight(record: AirtableRecord): ArtistHighlight | null {
  const f = record.fields;
  const label = str(f, 'label');
  const value = str(f, 'value');
  if (!label || !value) return null;
  return { label, value, detail: str(f, 'detail') };
}

function mapPressQuote(record: AirtableRecord): ArtistPressQuote | null {
  const f = record.fields;
  const quote = str(f, 'quote');
  if (!quote) return null;
  return {
    source: str(f, 'source'),
    quote,
    kind: str(f, 'kind'),
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAirtableArtist(slug: string): Promise<Artist | null> {
  if (!isAirtableConfigured()) return null;

  const filter = `{slug} = "${slug}"`;

  const [clientRecords, galleryRecords, videoRecords, contactRecords, sectionRecords] =
    await Promise.all([
      fetchRecords(TABLES.clients, filter),
      fetchRecords(TABLES.gallery, filter),
      fetchRecords(TABLES.videos, filter),
      fetchRecords(TABLES.contacts, filter),
      fetchRecords(TABLES.sections, filter),
    ]);

  if (clientRecords.length === 0) return null;

  // Base: static fallback merged with Airtable client fields
  const clientPatch = mapClient(clientRecords[0]);
  let artist: Artist = { ...martinaArtist, ...clientPatch };

  // Gallery
  const gallery = galleryRecords.map(mapGalleryImage).filter((g): g is ArtistGalleryImage => g !== null);
  if (gallery.length > 0) artist = { ...artist, gallery };

  // Videos
  const videos = videoRecords.map(mapVideo).filter((v): v is ArtistVideo => v !== null);
  if (videos.length > 0) artist = { ...artist, videos };

  // Contacts
  const contacts = contactRecords.map(mapContact).filter(Boolean);
  const management = contacts.find((c) => c!.role.toLowerCase().includes('management'));
  const press = contacts.find((c) => c!.role.toLowerCase().includes('press') || c!.role.toLowerCase().includes('presse'));
  if (management) artist = { ...artist, managementContact: management.contact };
  if (press) artist = { ...artist, pressContact: press.contact };

  // Sections: highlights + press quotes
  const highlightRecords = sectionRecords.filter(
    (r) => str(r.fields, 'sectionKey') === 'highlight'
  );
  const quoteRecords = sectionRecords.filter(
    (r) => str(r.fields, 'sectionKey') === 'quote'
  );

  const highlights = highlightRecords.map(mapHighlight).filter((h): h is ArtistHighlight => h !== null);
  const pressQuotes = quoteRecords.map(mapPressQuote).filter((q): q is ArtistPressQuote => q !== null);
  if (highlights.length > 0) artist = { ...artist, highlights };
  if (pressQuotes.length > 0) artist = { ...artist, pressQuotes };

  return artist;
}

export function getAirtableRevalidateSlugFromRequestBody(body: unknown): string | null {
  if (typeof body !== 'object' || body === null) return null;
  const b = body as Record<string, unknown>;
  const slug = b.slug ?? b.clientSlug ?? b.artistSlug;
  return typeof slug === 'string' ? slug.trim() : null;
}

// ─── Resolver with fallback ───────────────────────────────────────────────────

export async function resolveArtist(slug: string): Promise<Artist> {
  const fromAirtable = await getAirtableArtist(slug);
  return fromAirtable ?? martinaArtist;
}
