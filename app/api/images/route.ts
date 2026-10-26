import { NextResponse } from 'next/server';
import { SERVICES_DATA } from '@/data/siteData';
import { readHiddenInspirationSources, readUserUploads } from '@/lib/uploadStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const serviceId = new URL(request.url).searchParams.get('serviceId');
  const allowed = new Set(SERVICES_DATA.map((service) => service.id));
  if (serviceId && !allowed.has(serviceId)) return NextResponse.json({ images: [], hiddenSources: [] }, { headers: { 'Cache-Control': 'no-store' } });
  const [media, hiddenSources] = await Promise.all([readUserUploads(), readHiddenInspirationSources()]);
  const hidden = new Set(hiddenSources);
  const images = media.filter((item) => item.section === 'services' && item.kind === 'image' && !hidden.has(item.src) && (!serviceId || item.serviceId === serviceId));
  return NextResponse.json({ images, hiddenSources }, { headers: { 'Cache-Control': 'no-store' } });
}