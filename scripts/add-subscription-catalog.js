const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');

let stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^STRIPE_SECRET_KEY=(.*)$/);
      if (match) {
        stripeSecretKey = match[1].trim().replace(/^["']|["']$/g, '');
        break;
      }
    }
  }
}

if (!stripeSecretKey) {
  console.error('FATAL: STRIPE_SECRET_KEY not found');
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey);

async function addSubscription() {
  console.log('--- CREATING AIR-GAP CONCIERGE SUBSCRIPTION IN STRIPE LIVE ---');

  const existing = await stripe.products.list({ active: true, limit: 50 });
  let product = existing.data.find(
    (p) => p.metadata?.slug === 'air-gap-concierge' || p.name.includes('Air-Gap Concierge')
  );

  if (!product) {
    product = await stripe.products.create({
      name: 'Air-Gap Concierge — Dedicated Offline Engineering & Custom Tooling Retainer',
      description: 'Dedicated fractional systems engineer on monthly retainer. Custom offline desktop tool development, guaranteed bug fixing for our software or third-party tools, and complete cloud untangling / de-SaaS migrations.',
      images: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'],
      metadata: {
        app: 'brandvault',
        slug: 'air-gap-concierge',
      },
    });
    console.log('[CREATED PRODUCT]', product.id);
  } else {
    console.log('[FOUND PRODUCT]', product.id);
  }

  // Monthly price: $297/mo (29700 cents)
  const prices = await stripe.prices.list({ product: product.id, active: true });
  let price = prices.data.find(
    (p) => p.unit_amount === 29700 && p.recurring?.interval === 'month'
  );

  if (!price) {
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: 29700,
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        app: 'brandvault',
        slug: 'air-gap-concierge',
      },
    });
    console.log('[CREATED MONTHLY PRICE]', price.id);
  } else {
    console.log('[FOUND MONTHLY PRICE]', price.id);
  }

  try {
    await stripe.products.update(product.id, { default_price: price.id });
  } catch (e) {}

  // Update lib/stripe-catalog.json
  const catalogPath = path.join(process.cwd(), 'lib', 'stripe-catalog.json');
  let catalog = {};
  if (fs.existsSync(catalogPath)) {
    catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  }
  if (!catalog.products) catalog.products = {};

  catalog.products['air-gap-concierge'] = {
    productId: product.id,
    priceId: price.id,
    name: product.name,
    amountCents: 29700,
    currency: 'usd',
    mode: 'subscription',
  };
  catalog.updatedAt = new Date().toISOString();

  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
  console.log('[SUCCESS] Updated lib/stripe-catalog.json:');
  console.log(JSON.stringify(catalog.products['air-gap-concierge'], null, 2));
}

addSubscription().catch((e) => {
  console.error('[ERROR]:', e);
  process.exit(1);
});
