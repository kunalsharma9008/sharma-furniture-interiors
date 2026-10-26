import { mkdir, readFile, rename, writeFile } from 'fs/promises';
import path from 'path';

export type UploadSection = 'services' | 'portfolio';
export type UploadedMediaKind = 'image' | 'video';

export interface UserUploadedMedia {
  id: string;
  section: UploadSection;
  kind: UploadedMediaKind;
  category: string;
  serviceId?: string;
  fileName: string;
  src: string;
  alt: string;
  createdAt: string;
  size: number;
  mimeType: string;
}

export type UserUploadedImage = UserUploadedMedia;
export const USER_UPLOADS_DIRECTORY = path.join(process.cwd(), 'public', 'images', 'uploads');
const MANIFEST_PATH = path.join(process.cwd(), 'data', 'userUploads.json');
const HIDDEN_INSPIRATION_PATH = path.join(process.cwd(), 'data', 'hiddenInspiration.json');

function normalizeRecord(value: unknown): UserUploadedMedia | null {
  if (!value || typeof value !== 'object') return null;
  const item = value as Record<string, unknown>;
  if (typeof item.id !== 'string' || typeof item.fileName !== 'string' || typeof item.src !== 'string') return null;
  const serviceId = typeof item.serviceId === 'string' ? item.serviceId : undefined;
  const section: UploadSection = item.section === 'portfolio' ? 'portfolio' : 'services';
  const category = typeof item.category === 'string' ? item.category : serviceId;
  if (!category) return null;
  const kind: UploadedMediaKind = item.kind === 'video' ? 'video' : 'image';
  return {
    id: item.id, section, kind, category,
    ...(serviceId ? { serviceId } : section === 'services' ? { serviceId: category } : {}),
    fileName: item.fileName, src: item.src,
    alt: typeof item.alt === 'string' ? item.alt : '',
    createdAt: typeof item.createdAt === 'string' ? item.createdAt : '',
    size: typeof item.size === 'number' ? item.size : 0,
    mimeType: typeof item.mimeType === 'string' ? item.mimeType : kind === 'video' ? 'video/mp4' : 'image/jpeg',
  };
}

export async function readUserUploads(): Promise<UserUploadedMedia[]> {
  try {
    const parsed: unknown = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
    return Array.isArray(parsed) ? parsed.map(normalizeRecord).filter((item): item is UserUploadedMedia => item !== null) : [];
  } catch { return []; }
}

export async function writeUserUploads(media: UserUploadedMedia[]) {
  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  const temporaryPath = `${MANIFEST_PATH}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(media, null, 2)}\n`, 'utf8');
  await rename(temporaryPath, MANIFEST_PATH);
}

export async function readHiddenInspirationSources(): Promise<string[]> {
  try {
    const parsed: unknown = JSON.parse(await readFile(HIDDEN_INSPIRATION_PATH, 'utf8'));
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch { return []; }
}

export async function setInspirationHidden(src: string, hidden: boolean) {
  const current = new Set(await readHiddenInspirationSources());
  if (hidden) current.add(src); else current.delete(src);
  await mkdir(path.dirname(HIDDEN_INSPIRATION_PATH), { recursive: true });
  const temporaryPath = `${HIDDEN_INSPIRATION_PATH}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(Array.from(current), null, 2)}\n`, 'utf8');
  await rename(temporaryPath, HIDDEN_INSPIRATION_PATH);
}