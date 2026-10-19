import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe secret key is not configured' }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2025-02-24.acacia' as any,
    });

    // Detect site origin dynamically
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'https://aetherdynamics.net';

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1USFgu8a7qlQqW2LrODZQew1',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/shop/success?product=statement-vault&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Failed to create checkout session url' }, { status: 500 });
    }

    // Check if client expects JSON or form redirect
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return NextResponse.json({ url: session.url });
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
