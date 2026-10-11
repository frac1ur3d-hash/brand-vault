/**
 * Central affiliate link configuration for Brand Vault.
 *
 * HOW TO GO LIVE:
 * 1. Get approved on each network (see brand-vault-monetization-playbook.md).
 * 2. Paste your real tracking link over the placeholder below.
 * 3. Everything on the site updates automatically — no other file changes needed.
 *
 * Placeholders are harmless: they point at the merchant's homepage with a
 * brandvault tag until you replace them.
 */

function withParams(base: string, params: Record<string, string>): string {
  const url = new URL(base);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return url.toString();
}

export const AFFILIATE_LINKS = {
  /**
   * Northwest Registered Agent — $150/formation via ShareASale.
   * TODO: replace with your ShareASale tracking link.
   */
  northwest: (brandName = ''): string =>
    withParams('https://www.northwestregisteredagent.com/', {
      aff: 'brandvault',
      ...(brandName ? { name: brandName } : {}),
    }),

  /**
   * Trademark Engine — $50/sale via ShareASale.
   * TODO: replace with your ShareASale tracking link.
   */
  trademarkEngine: (brandName = ''): string =>
    withParams('https://www.trademarkengine.com/', {
      aff: 'brandvault',
      ...(brandName ? { name: brandName } : {}),
    }),

  /**
   * ZenBusiness — $75/$125/$175 tiers via Awin.
   * TODO: replace with your Awin tracking link.
   */
  zenbusiness: (): string => 'https://www.zenbusiness.com/?aff=brandvault',

  /**
   * Tailor Brands — $50/$150/$250 per LLC plan (Lite/Essential/Elite)
   * via the Tailor Brands Partners Program. Approved 2026-10-11.
   *
   * Cloaked: site buttons use '/go/tailorbrands' (same domain, cleaner URL).
   * The real tracking URL below is the redirect destination in next.config.ts.
   */
  tailorBrands: (): string => '/go/tailorbrands',

  /**
   * Bizee (Incfile) — tiered $15–$175 via Awin.
   * TODO: replace with your Awin tracking link.
   */
  bizee: (): string => 'https://bizee.com/?aff=brandvault',

  /**
   * LegalZoom — 15% per sale via CJ Affiliate.
   * TODO: replace with your CJ tracking link.
   */
  legalzoom: (): string => 'https://www.legalzoom.com/?aff=brandvault',

  /**
   * Namecheap domain search — 20% on domains via Impact/CJ/ShareASale.
   * TODO: replace with your network tracking link (keep the domain= param).
   */
  namecheapSearch: (domain: string): string =>
    `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(
      domain
    )}&aff=brandvault`,

  /** Namecheap homepage (footer link). TODO: replace with tracking link. */
  namecheapHome: (): string => 'https://www.namecheap.com/?aff=brandvault',
};

/** Real tracking destinations for cloaked /go/* affiliate links. */
export const TAILOR_BRANDS_TRACKING_URL =
  'https://tailorbrands.go2cloud.org/aff_c?offer_id=90&aff_id=10182';

/** Standard rel attribute for all affiliate/outbound money links. */
export const AFFILIATE_REL = 'noopener noreferrer sponsored';
