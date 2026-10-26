import { NextResponse } from 'next/server';
import { PROJECTS_DATA, SERVICES_DATA } from '@/data/siteData';
import { readHiddenInspirationSources, readUserUploads } from '@/lib/uploadStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const section = params.get('section');
  const serviceId = params.get('serviceId');
  const category = params.get('category');
  if (section && section !== 'services' && section !== 'portfolio') return NextResponse.json({ media: [], hiddenSources: [] }, { headers: { 'Cache-Control': 'no-store' } });
  if (serviceId && !SERVICES_DATA.some((service) => service.id === serviceId)) return NextResponse.json({ media: [], hiddenSources: [] }, { headers: { 'Cache-Control': 'no-store' } });
  if (category && section === 'portfolio' && !PROJECTS_DATA.some((project) => project.category === category)) return NextResponse.json({ media: [], hiddenSources: [] }, { headers: { 'Cache-Control': 'no-store' } });
  const [all, hiddenSources] = await Promise.all([readUserUploads(), readHiddenInspirationSources()]);
  const hidden = new Set(hiddenSources);
  const media = all.filter((item) => !hidden.has(item.src) && (!section || item.section === section) && (!serviceId || item.serviceId === serviceId) && (!category || item.category === category));
  return NextResponse.json({ media, hiddenSources }, { headers: { 'Cache-Control': 'no-store' } });
}