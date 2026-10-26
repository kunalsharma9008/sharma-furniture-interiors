import { createHash, createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'sharma_admin_session';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '';
}

export function isValidAdminPassword(candidate: string) {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured || !candidate) return false;
  const candidateHash = createHash('sha256').update(candidate).digest();
  const configuredHash = createHash('sha256').update(configured).digest();
  return timingSafeEqual(candidateHash, configuredHash);
}

export function createAdminSessionToken() {
  const secret = getSessionSecret();
  if (!secret) throw new Error('Admin session secret is not configured.');
  const expiresAt = String(Date.now() + SESSION_DURATION_MS);
  const signature = createHmac('sha256', secret).update(expiresAt).digest('base64url');
  return `${expiresAt}.${signature}`;
}

export function hasValidAdminSession(request: Request) {
  const secret = getSessionSecret();
  if (!secret) return false;
  const cookies = request.headers.get('cookie') ?? '';
  const cookie = cookies.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${ADMIN_COOKIE_NAME}=`));
  const token = cookie?.slice(ADMIN_COOKIE_NAME.length + 1);
  if (!token) return false;

  const [expiresAt, signature] = token.split('.');
  if (!expiresAt || !signature || !/^\d+$/.test(expiresAt) || Number(expiresAt) < Date.now()) return false;
  const expected = createHmac('sha256', secret).update(expiresAt).digest();
  let actual: Buffer;
  try {
    actual = Buffer.from(signature, 'base64url');
  } catch {
    return false;
  }
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}