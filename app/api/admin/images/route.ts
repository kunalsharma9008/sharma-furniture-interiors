import { mkdir, unlink, writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { PROJECTS_DATA, SERVICES_DATA } from '@/data/siteData';
import { PHOTO_LIBRARY, PROJECT_COVER_PHOTOS } from '@/data/uploadedPhotos';
import { hasValidAdminSession } from '@/lib/adminAuth';
import { readHiddenInspirationSources, readUserUploads, setInspirationHidden, USER_UPLOADS_DIRECTORY, writeUserUploads, type UserUploadedMedia } from '@/lib/uploadStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;
const serviceCategories = new Map(SERVICES_DATA.map((service) => [service.id, service.title]));
const portfolioCategories = new Map<string, string>();
for (const project of PROJECTS_DATA) portfolioCategories.set(project.category, project.categoryLabel);
const inspirationLabels: Record<string, string> = {
  bedroom: 'Bedroom', 'crockery-units': 'Crockery Units', 'dining-room': 'Dining Room', 'false-ceiling': 'False Ceiling',
  'living-room': 'Living Room', 'modular-kitchen': 'Modular Kitchen', office: 'Office', 'safety-doors': 'Safety Doors',
  'study-room': 'Study Room', 'tv-unit': 'TV Unit', wardrobe: 'Wardrobe',
};

function staticInspirationMedia(hiddenSources: Set<string>) {
  const items = Object.entries(PHOTO_LIBRARY).flatMap(([category, photos]) => photos.map((photo) => ({
    id: `inspiration:${category}:${photo.id}`, section: 'inspiration' as const, sourceType: 'site-image' as const,
    kind: 'image' as const, category, fileName: path.basename(photo.src), src: photo.src, alt: photo.alt,
    createdAt: '', size: 0, mimeType: 'image/*', removed: hiddenSources.has(photo.src),
  })));
  const portfolioCovers = PROJECTS_DATA.flatMap((project) => {
    const src = PROJECT_COVER_PHOTOS[project.id];
    if (!src) return [];
    return [{
      id: `portfolio-cover:${project.id}`, section: 'portfolio' as const, sourceType: 'site-image' as const,
      kind: 'image' as const, category: project.category, fileName: path.basename(src), src, alt: project.altText,
      title: project.title, createdAt: '', size: 0, mimeType: 'image/*', removed: hiddenSources.has(src),
    }];
  });
  return [...items, ...portfolioCovers];
}

function detectMedia(buffer: Buffer) {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return { extension: 'jpg', mime: 'image/jpeg', kind: 'image' as const };
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { extension: 'png', mime: 'image/png', kind: 'image' as const };
  if (buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') return { extension: 'webp', mime: 'image/webp', kind: 'image' as const };
  if (buffer.length >= 12 && buffer.toString('ascii', 4, 8) === 'ftyp') return { extension: 'mp4', mime: 'video/mp4', kind: 'video' as const };
  if (buffer.length >= 4 && buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))) return { extension: 'webm', mime: 'video/webm', kind: 'video' as const };
  return null;
}

export async function GET(request: Request) {
  if (!hasValidAdminSession(request)) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 });
  const [uploads, hidden] = await Promise.all([readUserUploads(), readHiddenInspirationSources()]);
  const uploaded = new Set(uploads.map((item) => item.src));
  const staticItems = staticInspirationMedia(new Set(hidden)).filter((item) => !uploaded.has(item.src));
  return NextResponse.json({ media: [...uploads, ...staticItems], hiddenSources: hidden }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  if (!hasValidAdminSession(request)) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 });
  let form: FormData;
  try { form = await request.formData(); } catch { return NextResponse.json({ error: 'Could not read the uploaded file.' }, { status: 400 }); }
  const file = form.get('file');
  const section = String(form.get('section') ?? 'services');
  const category = String(form.get('category') ?? '');
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: 'Choose a photo or video to upload.' }, { status: 400 });
  if (section !== 'services' && section !== 'portfolio') return NextResponse.json({ error: 'Choose a valid destination.' }, { status: 400 });
  const categoryMap = section === 'services' ? serviceCategories : portfolioCategories;
  const categoryTitle = categoryMap.get(category);
  if (!categoryTitle) return NextResponse.json({ error: 'Choose a valid category.' }, { status: 400 });
  const bytes = Buffer.from(await file.arrayBuffer());
  const detected = detectMedia(bytes);
  if (!detected) return NextResponse.json({ error: 'Use a JPG, PNG, WebP, MP4, or WebM file.' }, { status: 415 });
  const maxBytes = detected.kind === 'video' ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (bytes.length > maxBytes) return NextResponse.json({ error: detected.kind === 'video' ? 'Each video must be 100 MB or smaller.' : 'Each photo must be 10 MB or smaller.' }, { status: 413 });
  const id = randomUUID();
  const fileName = `${id}.${detected.extension}`;
  const categoryDirectory = path.join(USER_UPLOADS_DIRECTORY, section, category);
  await mkdir(categoryDirectory, { recursive: true });
  await writeFile(path.join(categoryDirectory, fileName), bytes, { flag: 'wx' });
  const providedAlt = String(form.get('alt') ?? '').trim().slice(0, 140);
  const item: UserUploadedMedia = {
    id, section, kind: detected.kind, category, ...(section === 'services' ? { serviceId: category } : {}),
    fileName, src: `/images/uploads/${section}/${category}/${fileName}`,
    alt: providedAlt || `${categoryTitle} ${detected.kind === 'video' ? 'video' : 'photo'}`,
    createdAt: new Date().toISOString(), size: bytes.length, mimeType: detected.mime,
  };
  const media = await readUserUploads(); media.unshift(item); await writeUserUploads(media);
  return NextResponse.json({ media: item }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
}

export async function DELETE(request: Request) {
  if (!hasValidAdminSession(request)) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 });
  let id = ''; let restore = false;
  try { const body = await request.json(); id = typeof body?.id === 'string' ? body.id : ''; restore = body?.action === 'restore'; }
  catch { return NextResponse.json({ error: 'Select an item first.' }, { status: 400 }); }

  const hiddenSources = await readHiddenInspirationSources();
  let source: string | undefined;
  const inspirationMatch = /^inspiration:([^:]+):(.+)$/.exec(id);
  if (inspirationMatch) source = PHOTO_LIBRARY[inspirationMatch[1]]?.find((photo) => photo.id === inspirationMatch[2])?.src;
  const portfolioMatch = /^portfolio-cover:(.+)$/.exec(id);
  if (!source && portfolioMatch) source = PROJECT_COVER_PHOTOS[portfolioMatch[1]];
  if (source && Object.values(PHOTO_LIBRARY).some((photos) => photos.some((photo) => photo.src === source))) {
    await setInspirationHidden(source, !restore);
    return NextResponse.json({ ok: true, hidden: !restore, src: source });
  }
  if (inspirationMatch || portfolioMatch) return NextResponse.json({ error: 'This website image could not be found.' }, { status: 404 });

  const media = await readUserUploads();
  const item = media.find((entry) => entry.id === id);
  if (!item) return NextResponse.json({ error: 'Upload not found.' }, { status: 404 });
  const categoryMap = item.section === 'services' ? serviceCategories : portfolioCategories;
  if (!categoryMap.has(item.category) || path.basename(item.fileName) !== item.fileName || !/^[a-f0-9-]+\.(jpg|png|webp|mp4|webm)$/i.test(item.fileName)) return NextResponse.json({ error: 'Upload record is invalid.' }, { status: 400 });
  const isLegacyServiceRecord = item.section === 'services' && item.src === `/images/uploads/${item.category}/${item.fileName}`;
  const expectedNewSrc = `/images/uploads/${item.section}/${item.category}/${item.fileName}`;
  if (!isLegacyServiceRecord && item.src !== expectedNewSrc) return NextResponse.json({ error: 'Upload path is invalid.' }, { status: 400 });
  const categoryDirectory = path.resolve(USER_UPLOADS_DIRECTORY, ...(isLegacyServiceRecord ? [item.category] : [item.section, item.category]));
  const filePath = path.resolve(categoryDirectory, item.fileName);
  if (!filePath.startsWith(`${categoryDirectory}${path.sep}`)) return NextResponse.json({ error: 'Upload path is invalid.' }, { status: 400 });
  await unlink(filePath).catch(() => undefined);
  await writeUserUploads(media.filter((entry) => entry.id !== id));
  return NextResponse.json({ ok: true, hidden: hiddenSources.includes(item.src) });
}