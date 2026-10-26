import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, createAdminSessionToken, isValidAdminPassword } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin login is not configured. Set ADMIN_PASSWORD in .env.local and restart the site.' }, { status: 503 });
  }

  let password = '';
  try {
    const body = await request.json();
    password = typeof body?.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json({ error: 'Enter your admin password.' }, { status: 400 });
  }

  if (!isValidAdminPassword(password)) {
    return NextResponse.json({ error: 'That password is not correct.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 8 * 60 * 60,
  });
  return response;
}