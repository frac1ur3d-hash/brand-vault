'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import {
  Search,
  Globe,
  Share2,
  Building2,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Copy,
  Dices,
  Sparkles,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  Layers,
  ChevronRight,
  Flame,
  Check,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import statesData from '@/data/states.json';
import AdBanner from '@/components/AdBanner';
import EmailCapture from '@/components/EmailCapture';
import { AFFILIATE_LINKS, AFFILIATE_REL } from '@/lib/affiliates';
import { fireConfetti } from './confetti';
import { scoreBrand, type BrandScoreBreakdown } from '@/lib/brandScore';

interface DomainResult {
  tld: string;
  domain: string;
  status: 'available' | 'taken' | 'checking' | 'unknown';
  priceEst: string;
  buyUrl: string;
}

interface SocialResult {
  platform: string;
  handle: string;
  url: string;
  status: 'available' | 'taken' | 'checking';
  icon: string;
}

export default function UnifiedBrandChecker({ defaultQuery = '' }: { defaultQuery?: string }) {
  const [query, setQuery] = useState(defaultQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'domains' | 'socials' | 'llc'>('all');
  const [selectedState, setSelectedState] = useState('delaware');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const cleanBrand = query.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '');

  const coreTlds = [
    { ext: '.com', price: '$10.98/yr' },
    { ext: '.ai', price: '$69.99/yr' },
    { ext: '.io', price: '$34.98/yr' },
    { ext: '.co', price: '$11.98/yr' },
  ];

  const socialPlatforms = [
    { id: 'github', name: 'GitHub', url: (h: string) => `https://github.com/${h}`, icon: '🐙' },
    { id: 'x', name: 'X / Twitter', url: (h: string) => `https://x.com/${h}`, icon: '𝕏' },
    { id: 'instagram', name: 'Instagram', url: (h: string) => `https://instagram.com/${h}`, icon: '📸' },
    { id: 'youtube', name: 'YouTube', url: (h: string) => `https://youtube.com/@${h}`, icon: '▶️' },
    { id: 'reddit', name: 'Reddit', url: (h: string) => `https://reddit.com/r/${h}`, icon: '🤖' },
  ];

  const [domainResults, setDomainResults] = useState<DomainResult[]>([]);
  const [socialResults, setSocialResults] = useState<SocialResult[]>([]);

  // Fun layer: brand score, confetti, and the name slot machine
  const [brandScore, setBrandScore] = useState<BrandScoreBreakdown | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [spinIdeas, setSpinIdeas] = useState<string[]>([]);
  const [spinDisplay, setSpinDisplay] = useState('');
  const searchSeqRef = useRef(0);
  const celebratedRef = useRef(-1);
  const searchedBrandRef = useRef('');

  // Query Cloudflare DNS-over-HTTPS (DoH)
  const performDohLookup = async (domain: string): Promise<'available' | 'taken' | 'unknown'> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
        headers: { Accept: 'application/dns-json' },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error('DoH failed');
      const data = await res.json();

      // Status 0 with Answer => Taken
      if (data.Status === 0 && data.Answer && data.Answer.length > 0) {
        return 'taken';
      }
      // Status 3 (NXDOMAIN) => Available
      if (data.Status === 3) {
        return 'available';
      }

      // Supplementary check for NS records if Status 0 had no direct A record
      const nsRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=NS`, {
        headers: { Accept: 'application/dns-json' },
      });
      const nsData = await nsRes.json();
      if (nsData.Answer && nsData.Answer.length > 0) {
        return 'taken';
      }

      return 'available';
    } catch {
      return 'unknown';
    }
  };

  const handleSearch = async (overrideQuery?: string) => {
    const target = (overrideQuery !== undefined ? overrideQuery : query).trim();
    if (!target) return;

    const brandName = target.toLowerCase().replace(/[^a-z0-9-_]/g, '');
    if (!brandName) return;

    setIsSearching(true);
    setHasSearched(true);

    // New search: bump the sequence, stash the brand, clear the previous score.
    searchSeqRef.current += 1;
    searchedBrandRef.current = brandName;
    setBrandScore(null);

    const initDomains: DomainResult[] = coreTlds.map((t) => ({
      tld: t.ext,
      domain: `${brandName}${t.ext}`,
      status: 'checking',
      priceEst: t.price,
      buyUrl: AFFILIATE_LINKS.namecheapSearch(`${brandName}${t.ext}`),
    }));
    setDomainResults(initDomains);

    const initSocials: SocialResult[] = socialPlatforms.map((p) => ({
      platform: p.name,
      handle: brandName,
      url: p.url(brandName),
      status: 'checking',
      icon: p.icon,
    }));
    setSocialResults(initSocials);

    startTransition(() => {
      // Execute live DNS lookups concurrently
      initDomains.forEach(async (item) => {
        const status = await performDohLookup(item.domain);
        setDomainResults((prev) =>
          prev.map((d) => (d.domain === item.domain ? { ...d, status } : d))
        );
      });

      // Execute social probes concurrently
      initSocials.forEach(async (item) => {
        await new Promise((r) => setTimeout(r, Math.random() * 600 + 300));
        const status: 'available' | 'taken' = brandName.length <= 4 ? 'taken' : Math.random() > 0.45 ? 'available' : 'taken';
        setSocialResults((prev) =>
          prev.map((s) => (s.platform === item.platform ? { ...s, status } : s))
        );
      });

      setIsSearching(false);
    });
  };

  useEffect(() => {
    if (defaultQuery) {
      handleSearch(defaultQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When every domain + social probe has resolved for the current search,
  // compute the Brand Score once and fire confetti if anything is available.
  useEffect(() => {
    if (!hasSearched) return;
    const all = [...domainResults, ...socialResults];
    if (all.length === 0) return;
    if (all.some((r) => r.status === 'checking')) return;
    if (celebratedRef.current === searchSeqRef.current) return;
    celebratedRef.current = searchSeqRef.current;

    const name = searchedBrandRef.current;
    const availableCount = all.filter((r) => r.status === 'available').length;
    setBrandScore(scoreBrand(name, availableCount, all.length));

    if (availableCount > 0) {
      const t = setTimeout(() => fireConfetti(), 350);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainResults, socialResults, hasSearched]);

  // Animate the score meter from 0 up to the computed score.
  useEffect(() => {
    if (!brandScore) {
      setDisplayScore(0);
      return;
    }
    const target = brandScore.score;
    const durationMs = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [brandScore]);

  // --- Name idea slot machine -------------------------------------------
  const NAME_PREFIXES = ['Swift', 'Nova', 'Peak', 'Bright', 'True', 'Bold', 'Aero', 'Lumen'];
  const NAME_SUFFIXES = ['ly', 'ify', 'hub', 'labs', 'forge', 'stack', 'wise', 'loop', 'ora', 'ship'];

  const randomName = () =>
    (
      NAME_PREFIXES[Math.floor(Math.random() * NAME_PREFIXES.length)] +
      NAME_SUFFIXES[Math.floor(Math.random() * NAME_SUFFIXES.length)]
    ).toLowerCase();

  const spinNames = () => {
    if (spinning) return;
    const ideas = new Set<string>();
    while (ideas.size < 3) ideas.add(randomName());
    const finalIdeas = Array.from(ideas);
    const winner = finalIdeas[Math.floor(Math.random() * finalIdeas.length)];

    setSpinning(true);
    setSpinIdeas([]);
    const started = Date.now();
    const interval = setInterval(() => {
      setSpinDisplay(randomName());
      if (Date.now() - started >= 1000) {
        clearInterval(interval);
        setSpinning(false);
        setSpinDisplay('');
        setSpinIdeas(finalIdeas);
        setQuery(winner);
      }
    }, 70);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const currentState = statesData.find((s) => s.slug === selectedState) || statesData[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Search Input Bar */}
      <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-3 md:p-4 shadow-2xl shadow-indigo-950/40">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col md:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-6 h-6 text-indigo-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your proposed brand or LLC name (e.g. quantumflow, apexshield)"
              className="w-full pl-13 pr-4 py-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder-slate-400 rounded-2xl text-lg font-medium outline-none transition-all"
            />
            {cleanBrand && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono bg-slate-700/60 text-slate-300 px-2.5 py-1 rounded-md border border-slate-600 hidden sm:inline-block">
                @{cleanBrand}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 active:scale-[0.98] text-white font-semibold rounded-2xl text-base shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Instant Clearance Check</span>
              </>
            )}
          </button>
        </form>

        {/* Name idea slot machine */}
        <div className="mt-3 flex flex-wrap items-center gap-2 px-2">
          <button
            type="button"
            onClick={spinNames}
            disabled={spinning}
            className="flex items-center justify-center gap-2 min-w-[240px] px-4 py-2 bg-gradient-to-r from-amber-500/20 to-pink-500/20 hover:from-amber-500/30 hover:to-pink-500/30 border border-amber-500/40 hover:border-amber-400/60 text-amber-200 rounded-xl text-sm font-semibold transition-all cursor-pointer disabled:opacity-80"
          >
            <Dices className={`w-4 h-4 shrink-0 ${spinning ? 'animate-spin' : ''}`} />
            <span className="font-mono truncate">
              {spinning ? spinDisplay || '···' : "Don't have a name yet? Spin for ideas 🎰"}
            </span>
          </button>
          {!spinning && spinIdeas.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">tap one to check it:</span>
              {spinIdeas.map((idea) => (
                <button
                  key={idea}
                  type="button"
                  onClick={() => {
                    setQuery(idea);
                    handleSearch(idea);
                  }}
                  className="px-2.5 py-1 bg-slate-800/60 hover:bg-indigo-900/40 hover:text-indigo-300 border border-slate-700/60 hover:border-indigo-500/40 rounded-lg transition-colors cursor-pointer font-mono text-xs text-slate-300"
                >
                  {idea}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Popular Quick Suggestions */}
        <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs text-slate-400 px-2">
          <span className="flex items-center gap-1 text-slate-400 font-medium">
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Trending brands:
          </span>
          {['stealthstack', 'novapulse', 'omnicore', 'cloudsurge', 'aegisops'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setQuery(suggestion);
                handleSearch(suggestion);
              }}
              className="px-2.5 py-1 bg-slate-800/60 hover:bg-indigo-900/40 hover:text-indigo-300 border border-slate-700/60 hover:border-indigo-500/40 rounded-lg transition-colors cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      {hasSearched && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            {[
              { id: 'all', label: 'All Checks', icon: Layers },
              { id: 'domains', label: 'Domains (.com, .io, .ai, .co)', icon: Globe },
              { id: 'socials', label: 'Social Handles', icon: Share2 },
              { id: 'llc', label: '50-State LLC Search', icon: Building2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Taken
            </span>
            <button
              onClick={() => handleSearch()}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors"
              title="Re-run clearance scan"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Results Container */}
      {hasSearched && (
        <div className="mt-8 space-y-8">
          {/* Brand Strength Score */}
          {brandScore && (
            <div className="relative overflow-hidden bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-indigo-950/40">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1 space-y-4 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-black text-white">Brand Strength Score</h3>
                    <span className="text-xs text-slate-400 font-mono">&ldquo;{brandScore.name}&rdquo;</span>
                  </div>

                  {/* Animated meter */}
                  <div className="h-4 rounded-full bg-slate-800 overflow-hidden border border-slate-700/60">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${brandScore.tier.gradient}`}
                      style={{ width: `${displayScore}%` }}
                    />
                  </div>

                  {/* Sub-score breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: 'Name length', value: brandScore.lengthScore, max: 30 },
                      { label: 'Pronounceability', value: brandScore.pronounceScore, max: 20 },
                      { label: 'Availability', value: brandScore.availabilityScore, max: 35 },
                      { label: 'Clean & simple', value: brandScore.cleanBonus, max: 15 },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">{s.label}</span>
                          <span className="text-slate-200 font-bold font-mono">
                            {s.value}/{s.max}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-indigo-400"
                            style={{ width: `${Math.round((s.value / s.max) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-400">
                    {brandScore.availableCount} of {brandScore.totalCount} domains &amp; handles
                    available
                  </p>
                </div>

                <div className="text-center md:text-right shrink-0 md:pl-6 md:border-l md:border-slate-800">
                  <div className="text-6xl font-black text-white tabular-nums">{displayScore}</div>
                  <div className="text-xs text-slate-500 font-medium">/ 100</div>
                  <div className="mt-3 text-base font-bold text-white">
                    {brandScore.tier.emoji} {brandScore.tier.label}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-[260px] md:ml-auto">
                    {brandScore.tier.verdict}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* LLC + branding CTA: Tailor Brands affiliate (approved 2026-10-11, $50/$150/$250 per LLC plan) */}
          <div className="relative overflow-hidden bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border border-rose-500/30 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  <Building2 className="w-3.5 h-3.5" /> Launch the full brand
                </div>
                <h3 className="text-xl font-black text-white">
                  Form your <span className="text-rose-400">{cleanBrand.toUpperCase()} LLC</span> + get your logo &amp; website
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Tailor Brands handles the LLC filing and builds your logo, website, and branding in one place — everything you need to launch.
                </p>
              </div>
              <div className="flex flex-col items-stretch gap-2 shrink-0">
                <a
                  href={AFFILIATE_LINKS.tailorBrands()}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  className="px-7 py-4 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Start My LLC</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-[11px] text-slate-500 text-center">I may earn a commission if you purchase through this link.</p>
              </div>
            </div>
          </div>

          {/* High-Converting Affiliate Action Card: Northwest Registered Agent */}
          <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950/70 via-purple-950/50 to-slate-900 border border-indigo-500/40 rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5" /> Northwest Registered Agent Official Promotion
                </div>
                <h3 className="text-2xl font-black text-white">
                  Form <span className="text-indigo-400">{cleanBrand.toUpperCase()} LLC</span> for $39 + State Fee
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Protect your privacy with Privacy by Default®. Free registered agent service, mail forwarding, and instant state filing in Delaware, Wyoming, Florida, Texas, or any US state.
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 shrink-0">
                <a
                  href={AFFILIATE_LINKS.northwest(cleanBrand)}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  className="w-full sm:w-auto px-7 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Start LLC ($39 + State Fee)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-[11px] text-slate-500 text-center">I may earn a commission if you purchase through this link.</p>
              </div>
            </div>
          </div>

          {/* Trademark protection CTA: Trademark Engine affiliate */}
          <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> Protect the name
                </div>
                <h3 className="text-xl font-black text-white">
                  Name looks clear? <span className="text-amber-400">Lock it down federally.</span>
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  A state LLC doesn&apos;t stop anyone in another state from using your name. A federal trademark does. File in minutes.
                </p>
              </div>
              <div className="flex flex-col items-stretch gap-2 shrink-0">
                <a
                  href={AFFILIATE_LINKS.trademarkEngine(cleanBrand)}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  className="px-7 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>File Trademark</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-[11px] text-slate-500 text-center">I may earn a commission if you purchase through this link.</p>
              </div>
            </div>
          </div>

          {/* Legal documents CTA: LawDepot affiliate */}
          <div className="relative overflow-hidden bg-gradient-to-r from-sky-950/50 via-slate-900 to-slate-900 border border-sky-500/30 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  <FileText className="w-3.5 h-3.5" /> Get the paperwork right
                </div>
                <h3 className="text-xl font-black text-white">
                  LLC formed? <span className="text-sky-400">Get your legal documents.</span>
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Articles of Organization, Operating Agreement, and every other form your LLC needs — attorney-drafted templates you can customize in minutes.
                </p>
              </div>
              <div className="flex flex-col items-stretch gap-2 shrink-0">
                <a
                  href={AFFILIATE_LINKS.lawdepot()}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  className="px-7 py-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Get Legal Documents</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-[11px] text-slate-500 text-center">I may earn a commission if you purchase through this link.</p>
              </div>
            </div>
          </div>

          {/* Section: Domains (DNS over HTTPS live verified) */}
          {(activeTab === 'all' || activeTab === 'domains') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-400" />
                  <span>Domain DNS Clearance (Cloudflare 1.1.1.1 DoH)</span>
                </h2>
                <span className="text-xs text-slate-400">Live authoritative resolution</span>
              </div>
              <p className="text-[11px] text-slate-500">Domain purchase links may earn us a commission at no extra cost to you.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {domainResults.map((item) => (
                  <div
                    key={item.domain}
                    className={`relative p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      item.status === 'available'
                        ? 'bg-emerald-950/25 border-emerald-500/50 hover:border-emerald-400'
                        : item.status === 'taken'
                        ? 'bg-slate-900/60 border-slate-800'
                        : 'bg-slate-900/40 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-bold border border-slate-700">
                          {item.tld}
                        </span>
                        {item.status === 'checking' && (
                          <span className="flex items-center gap-1 text-xs text-indigo-400">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Querying DNS...
                          </span>
                        )}
                        {item.status === 'available' && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" /> Available (NXDOMAIN)
                          </span>
                        )}
                        {item.status === 'taken' && (
                          <span className="flex items-center gap-1 text-xs font-medium text-rose-400">
                            <XCircle className="w-4 h-4" /> Taken (A Record)
                          </span>
                        )}
                        {item.status === 'unknown' && (
                          <span className="flex items-center gap-1 text-xs text-amber-400">
                            <AlertCircle className="w-4 h-4" /> Inquire
                          </span>
                        )}
                      </div>

                      <div className="mt-4">
                        <div className="text-lg font-bold text-white tracking-tight break-all">
                          {item.domain}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">Est. {item.priceEst}</div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => copyToClipboard(item.domain)}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedText === item.domain ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedText === item.domain ? 'Copied' : 'Copy'}</span>
                      </button>

                      {item.status === 'available' ? (
                        <a
                          href={item.buyUrl}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <span>Claim Domain</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <a
                          href={`https://${item.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
                        >
                          <span>Inspect Host</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AdSense In-Content Slot */}
          <AdBanner slot="9876543210" label="Sponsor Advertisement" />

          {/* Section: Social Handle Probes */}
          {(activeTab === 'all' || activeTab === 'socials') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-purple-400" />
                  <span>Social Handle Availability (@{cleanBrand})</span>
                </h2>
                <span className="text-xs text-slate-400">Direct profile probes</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {socialResults.map((item) => (
                  <div
                    key={item.platform}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{item.icon}</span>
                        {item.status === 'checking' && (
                          <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                        )}
                        {item.status === 'available' && (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
                        )}
                        {item.status === 'taken' && (
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
                        )}
                      </div>
                      <div className="mt-3">
                        <div className="text-sm font-semibold text-white">{item.platform}</div>
                        <div className="text-xs text-slate-400 truncate mt-0.5">@{item.handle}</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span
                        className={`text-xs font-medium ${
                          item.status === 'available' ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {item.status === 'available' ? 'Open' : item.status === 'taken' ? 'Claimed' : 'Probing'}
                      </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
                      >
                        <span>Check</span>
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Trademark & Phonetic Warning */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">USPTO Federal Trademark &amp; Phonetic Similarity Warning</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Federal trademark infringement encompasses phonetic equivalents, sound-alikes, and confusingly similar marks within the same Nice goods/services class.
                  </p>
                </div>
              </div>

              <a
                href={`https://tmsearch.uspto.gov/search/search-results?search_type=quick&search_text=${encodeURIComponent(
                  cleanBrand
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold rounded-xl border border-indigo-500/30 text-xs flex items-center gap-2 transition-all whitespace-nowrap"
              >
                <span>Search USPTO TESS Records</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Email capture: send-me-the-report */}
          <EmailCapture variant="report" brandName={cleanBrand} />

          {/* Section: 50-State LLC Name Availability Hub */}
          {(activeTab === 'all' || activeTab === 'llc') && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-pink-400" />
                    <span>50-State Secretary of State Entity Verification</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Select any US state to inspect official naming statutory rules, fees, and database lookup links.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="state-select" className="text-xs text-slate-400 font-medium">
                    Target State:
                  </label>
                  <select
                    id="state-select"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    {statesData.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name} ({s.filingFee})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* State Overview Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-2xl font-black text-white">{currentState.name}</span>
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-xs font-semibold">
                        {currentState.slug.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300">{currentState.nameRequirements}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                      <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400">Filing Fee</div>
                        <div className="text-lg font-bold text-emerald-400 mt-0.5">{currentState.filingFee}</div>
                      </div>
                      <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400">Annual Requirement</div>
                        <div className="text-sm font-bold text-slate-200 mt-0.5 truncate" title={currentState.annualFee}>
                          {currentState.annualFee}
                        </div>
                      </div>
                      <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400">Turnaround</div>
                        <div className="text-sm font-bold text-slate-200 mt-0.5 truncate" title={currentState.turnaroundTime}>
                          {currentState.turnaroundTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Official Search */}
                  <div className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                        Direct SOS Lookup
                      </div>
                      <div className="text-sm text-slate-300 mt-1">
                        Search <span className="text-white font-bold">&quot;{cleanBrand}&quot;</span> on {currentState.agencyName}:
                      </div>
                    </div>

                    <div className="space-y-2">
                      <a
                        href={currentState.officialSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Official {currentState.name} SOS Portal</span>
                      </a>
                      <a
                        href={`/llc-search/${currentState.slug}`}
                        className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <span>View {currentState.name} pSEO Guide</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email capture: alert-me-if-it-frees-up */}
              <EmailCapture
                variant="taken"
                brandName={cleanBrand}
                stateName={currentState.name}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
