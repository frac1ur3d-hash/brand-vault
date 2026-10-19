const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');

const envPath = path.join(process.cwd(), '.env.local');
const lines = fs.readFileSync(envPath, 'utf8').split('\n');
let key = '';
for (const line of lines) {
  const match = line.match(/^STRIPE_SECRET_KEY=(.*)$/);
  if (match) {
    key = match[1].trim().replace(/^["']|["']$/g, '');
    break;
  }
}

const stripe = new Stripe(key);

async function testSession() {
  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: 'price_1USGGr8a7qlQqW2LenhSDU1y', quantity: 1 }],
    mode: 'subscription',
    success_url: 'https://aetherdynamics.net/shop/success?plan=concierge&session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://aetherdynamics.net/shop',
  });
  console.log('LIVE CONCIERGE SUBSCRIPTION CHECKOUT URL CREATED:');
  console.log(session.url);
}

testSession().catch(err => {
  console.error('Session creation failed:', err.message);
  process.exit(1);
});
