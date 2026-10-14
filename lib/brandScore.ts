/**
 * Brand Strength Score — rates a proposed brand name 0-100.
 *
 *  - Name length (30 pts): 4-12 chars is the sweet spot.
 *  - Pronounceability (20 pts): healthy vowel ratio (~45% is ideal).
 *  - Availability (35 pts): share of domains/handles that came back available.
 *  - Clean & simple (15 pts): no digits, hyphens, or underscores.
 */

export interface BrandTier {
  label: string;
  emoji: string;
  verdict: string;
  /** Tailwind gradient stops for the animated meter. */
  gradient: string;
}

export interface BrandScoreBreakdown {
  /** The brand name this score was computed for (already cleaned/lowercased). */
  name: string;
  score: number;
  lengthScore: number;
  pronounceScore: number;
  availabilityScore: number;
  cleanBonus: number;
  availableCount: number;
  totalCount: number;
  tier: BrandTier;
}

const TIERS: { min: number; tier: BrandTier }[] = [
  {
    min: 90,
    tier: {
      label: 'Unicorn material',
      emoji: '🦄',
      verdict: 'Short, snappy, and wide open. Claim it before someone else does.',
      gradient: 'from-fuchsia-400 via-purple-400 to-indigo-400',
    },
  },
  {
    min: 75,
    tier: {
      label: 'Investor-ready',
      emoji: '🚀',
      verdict: 'This name has real legs — most of the internet agrees.',
      gradient: 'from-emerald-400 to-teal-400',
    },
  },
  {
    min: 60,
    tier: {
      label: 'Solid — could go far',
      emoji: '💪',
      verdict: 'A strong name with a few taken slots. Worth a closer look.',
      gradient: 'from-indigo-400 to-sky-400',
    },
  },
  {
    min: 40,
    tier: {
      label: 'Meh — keep brainstorming',
      emoji: '🤔',
      verdict: 'It works, but the good corners of the internet are taken. Try the slot machine.',
      gradient: 'from-amber-400 to-orange-400',
    },
  },
  {
    min: 0,
    tier: {
      label: 'Sounds like a WiFi password',
      emoji: '📶',
      verdict: 'Long, cryptic, or crowded out. Spin for ideas and take another swing.',
      gradient: 'from-rose-400 to-red-500',
    },
  },
];

export function getBrandTier(score: number): BrandTier {
  for (const { min, tier } of TIERS) {
    if (score >= min) return tier;
  }
  return TIERS[TIERS.length - 1].tier;
}

function scoreLength(len: number): number {
  if (len >= 4 && len <= 12) return 30;
  if (len < 4) return Math.max(0, len * 8);
  return Math.max(0, Math.round(30 - (len - 12) * 3));
}

function scorePronounceability(name: string): number {
  if (name.length === 0) return 0;
  const vowels = (name.match(/[aeiou]/g) || []).length;
  const ratio = vowels / name.length;
  return Math.max(0, Math.min(20, Math.round(20 - Math.abs(ratio - 0.45) * 50)));
}

export function scoreBrand(
  name: string,
  availableCount: number,
  totalCount: number
): BrandScoreBreakdown {
  const lengthScore = scoreLength(name.length);
  const pronounceScore = scorePronounceability(name);
  const availabilityScore = totalCount > 0 ? Math.round((availableCount / totalCount) * 35) : 0;
  const cleanBonus = /[0-9_-]/.test(name) ? 0 : 15;
  const score = Math.max(
    0,
    Math.min(100, lengthScore + pronounceScore + availabilityScore + cleanBonus)
  );

  return {
    name,
    score,
    lengthScore,
    pronounceScore,
    availabilityScore,
    cleanBonus,
    availableCount,
    totalCount,
    tier: getBrandTier(score),
  };
}
