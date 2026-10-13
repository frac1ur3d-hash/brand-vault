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

export const AFFILIATE_LINKS = {
  /**
   * Northwest Registered Agent — $150/formation via ShareASale.
   * TEMP 2026-10-11: pointing at Tailor Brands (live earner) until the
   * ShareASale tracking link is approved. Swap back when it lands.
   */
  northwest: (brandName = ''): string => '/go/tailorbrands',

  /**
   * Trademark Engine — $50/sale via ShareASale.
   * TEMP 2026-10-11: pointing at Tailor Brands (live earner) until the
   * ShareASale tracking link is approved. Swap back when it lands.
   */
  trademarkEngine: (brandName = ''): string => '/go/tailorbrands',

  /**
   * ZenBusiness — $75/$125/$175 tiers via Awin.
   * TEMP 2026-10-11: pointing at Tailor Brands (live earner) until the
   * Awin tracking link is approved. Swap back when it lands.
   */
  zenbusiness: (): string => '/go/tailorbrands',

  /**
   * Tailor Brands — $50/$150/$250 per LLC plan (Lite/Essential/Elite)
   * via the Tailor Brands Partners Program. Approved 2026-10-11.
   *
   * Cloaked: site buttons use '/start' (bridge page, also the Google Ads
   * conversion page) which auto-redirects to the tracking URL below.
   * '/go/tailorbrands' (307 in next.config.ts) remains as a fallback.
   */
  tailorBrands: (): string => '/start',

  /**
   * Bizee (Incfile) — tiered $15–$175 via Awin.
   * TEMP 2026-10-11: pointing at Tailor Brands (live earner) until the
   * Awin tracking link is approved. Swap back when it lands.
   */
  bizee: (): string => '/go/tailorbrands',

  /**
   * LegalZoom — 15% per sale via CJ Affiliate.
   * TEMP 2026-10-11: pointing at Tailor Brands (live earner) until the
   * CJ tracking link is approved. Swap back when it lands.
   */
  legalzoom: (): string => '/go/tailorbrands',

  /**
   * LawDepot — $6.50/free trial, 25% of paid subscriptions via CJ Affiliate.
   * Approved 2026-10-13. Legal documents: Articles of Organization,
   * Operating Agreement, and other LLC paperwork templates.
   */
  lawdepot: (): string =>
    'https://www.kqzyfj.com/click-101901434-16995795',

  /**
   * LawDepot LLC Operating Agreement deep link (same CJ program).
   * Reserved for future use (e.g. LLC formation package docs).
   */
  lawdepotOperatingAgreement: (): string =>
    'https://www.jdoqocy.com/click-101901434-16995515',

  /**
   * Namecheap domain search — 20% on domains via Impact/CJ/ShareASale.
   * TEMP 2026-10-11: pointing at Tailor Brands (live earner) until a real
   * domain-affiliate link exists. Swap back when it lands.
   */
  namecheapSearch: (domain: string): string => '/go/tailorbrands',

  /**
   * Namecheap homepage (footer link).
   * TEMP 2026-10-11: pointing at Tailor Brands (live earner).
   */
  namecheapHome: (): string => '/go/tailorbrands',
};

/** Real tracking destinations for cloaked /go/* affiliate links. */
export const TAILOR_BRANDS_TRACKING_URL =
  'https://tailorbrands.go2cloud.org/aff_c?offer_id=90&aff_id=10182';

/** Standard rel attribute for all affiliate/outbound money links. */
export const AFFILIATE_REL = 'noopener noreferrer sponsored';
