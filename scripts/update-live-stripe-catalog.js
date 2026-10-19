const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');

// Read from .env.local or environment variable
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
  console.error('FATAL: STRIPE_SECRET_KEY not found in environment or .env.local');
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey);

async function main() {
  console.log('--- 1. ARCHIVING OLD DEMANDFORGE PRODUCTS IN STRIPE LIVE ---');
  const oldProductIds = ['prod_VT3fZ1YfOxtGaB', 'prod_VT3fHW0M7bsPMJ', 'prod_VT3fF3pevf9JOn'];

  for (const id of oldProductIds) {
    try {
      const updated = await stripe.products.update(id, { active: false });
      console.log(`[ARCHIVED] Product ${id} (${updated.name}) -> active: false`);
    } catch (err) {
      console.warn(`[WARN] Could not archive ${id}:`, err.message);
    }
  }

  console.log('\n--- 2. PROVISIONING BRANDVAULT LIVE CATALOG (2 PRODUCTS) ---');

  const productsToProvision = [
    {
      slug: 'statement-vault',
      name: 'StatementVault v1.0 — Offline Bank Statement Converter',
      description: 'Turnkey offline-first PDF bank & credit card statement to QuickBooks / CSV converter. Mathematical balance verification down to the integer cent with zero cloud uploads. Lifetime license.',
      unitAmount: 6700, // $67.00 USD
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
    },
    {
      slug: 'recon-vault',
      name: 'ReconVault v1.0 — Offline Invoice Reconciliation Engine',
      description: 'Turnkey offline-first B2B invoice and CSV reconciler with automated drop-folder batch sweeping, integer-cents math, and QuickBooks export. Lifetime license.',
      unitAmount: 4700, // $47.00 USD
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const results = {};
  const existing = await stripe.products.list({ active: true, limit: 50 });

  for (const item of productsToProvision) {
    let product = existing.data.find(
      (p) => p.name === item.name || p.metadata?.slug === item.slug
    );

    if (!product) {
      console.log(`[CREATING PRODUCT] ${item.name}...`);
      product = await stripe.products.create({
        name: item.name,
        description: item.description,
        images: [item.image],
        metadata: {
          app: 'brandvault',
          slug: item.slug,
        },
      });
      console.log(`[CREATED PRODUCT] ID: ${product.id}`);
    } else {
      console.log(`[FOUND PRODUCT] ID: ${product.id} (${product.name})`);
      product = await stripe.products.update(product.id, {
        name: item.name,
        description: item.description,
        images: [item.image],
        metadata: {
          app: 'brandvault',
          slug: item.slug,
        },
      });
      console.log(`[UPDATED PRODUCT] ID: ${product.id}`);
    }

    const prices = await stripe.prices.list({ product: product.id, active: true });
    let price = prices.data.find(
      (pr) => pr.unit_amount === item.unitAmount && pr.currency === 'usd' && pr.type === 'one_time'
    );

    if (!price) {
      console.log(`[CREATING PRICE] for ${item.name} ($${item.unitAmount / 100} USD)...`);
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: item.unitAmount,
        currency: 'usd',
        metadata: {
          app: 'brandvault',
          slug: item.slug,
        },
      });
      console.log(`[CREATED PRICE] ID: ${price.id}`);
    } else {
      console.log(`[FOUND PRICE] ID: ${price.id} ($${price.unit_amount / 100} USD)`);
    }

    try {
      await stripe.products.update(product.id, { default_price: price.id });
    } catch (e) {}

    results[item.slug] = {
      productId: product.id,
      priceId: price.id,
      name: item.name,
      amountCents: item.unitAmount,
      currency: 'usd',
      mode: 'payment',
    };
  }

  const libDir = path.join(process.cwd(), 'lib');
  if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });

  const catalogPath = path.join(libDir, 'stripe-catalog.json');
  fs.writeFileSync(catalogPath, JSON.stringify({ app: 'brandvault', updatedAt: new Date().toISOString(), products: results }, null, 2), 'utf-8');
  console.log(`\n[SUCCESS] Wrote BrandVault Stripe Catalog to: ${catalogPath}`);
}

main().catch(err => {
  console.error('[FATAL ERROR]:', err);
  process.exit(1);
});
