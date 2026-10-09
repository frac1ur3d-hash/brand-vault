import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/subscribe — email capture for "alert me" / "email me the report".
 *
 * TO GO LIVE: create a free Beehiiv account, then set these Vercel env vars:
 *   BEEHIIV_API_KEY, BEEHIIV_PUBLICATION_ID
 * Until then the endpoint returns 503 `not_configured` and the UI honestly
 * shows "launching soon" — no email is silently dropped.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, brandName, stateName, variant } = await req.json();

    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
    }

    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !publicationId) {
      return NextResponse.json({ error: 'not_configured' }, { status: 503 });
    }

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'brand-vault',
          utm_medium: variant === 'taken' ? 'name-alert' : 'report-email',
          custom_fields: [
            { name: 'brand_name', value: String(brandName || '').slice(0, 100) },
            { name: 'state', value: String(stateName || '').slice(0, 100) },
          ],
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('Beehiiv subscribe failed:', res.status, text.slice(0, 300));
      return NextResponse.json({ error: 'Subscription failed. Try again.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
