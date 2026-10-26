import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const cleanText = (value: unknown, limit: number) =>
  typeof value === 'string' ? value.trim().slice(0, limit) : '';

export async function POST(request: Request) {
  const webAppUrl = process.env.INQUIRY_WEB_APP_URL;
  const secret = process.env.INQUIRY_WEB_APP_SECRET;

  if (!webAppUrl || !secret) {
    return NextResponse.json(
      { ok: false, error: 'Google Sheets is not connected yet.' },
      { status: 503 }
    );
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid enquiry details.' }, { status: 400 });
  }

  if (!input || typeof input !== 'object') {
    return NextResponse.json({ ok: false, error: 'Invalid enquiry details.' }, { status: 400 });
  }

  const body = input as Record<string, unknown>;
  const name = cleanText(body.name, 120);
  const phone = cleanText(body.phone, 40);
  const service = cleanText(body.service, 120);
  const projectDetails = cleanText(body.projectDetails, 2000);

  if (!name || !phone || !service) {
    return NextResponse.json(
      { ok: false, error: 'Name, phone number, and service are required.' },
      { status: 400 }
    );
  }

  try {
    const endpoint = new URL(webAppUrl);
    if (endpoint.hostname !== 'script.google.com' || !endpoint.pathname.includes('/macros/s/')) {
      return NextResponse.json({ ok: false, error: 'Invalid Google Sheets connection.' }, { status: 503 });
    }
    endpoint.searchParams.set('secret', secret);

    const response = await fetch(endpoint.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, service, projectDetails }),
      cache: 'no-store',
      redirect: 'follow',
    });
    const result = await response.json().catch(() => null);

    if (!response.ok || result?.ok !== true) {
      const scriptError = typeof result?.error === 'string' ? result.error : '';
      let message = 'Google Sheets could not save this enquiry. Check that the latest web app version is deployed.';

      if (scriptError === 'Not allowed.') {
        message = 'The website and Google Sheet connection keys do not match. Check the secret in Apps Script and .env.local.';
      } else if (scriptError.includes('column headings')) {
        message = 'The first row of the enquiry sheet has different column headings. Update the headings in the sheet, then try again.';
      }
      return NextResponse.json(
        { ok: false, error: message },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'The website could not reach Google Sheets. Check that the web app is deployed and available to anyone with the link.' },
      { status: 502 }
    );
  }
}