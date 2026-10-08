import React from 'react';
import Link from 'next/link';
import UnifiedBrandChecker from '@/components/UnifiedBrandChecker';
import AdBanner from '@/components/AdBanner';
import statesData from '@/data/states.json';
import {
  Globe,
  Building2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  Search,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

const TOP_STATE_SLUGS = ['delaware', 'wyoming', 'nevada', 'florida', 'texas', 'california'];

export default function HomePage() {
  const topStates = statesData.filter((s) => TOP_STATE_SLUGS.includes(s.slug));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[130px] -z-10 pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The All-in-One Founder Brand Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Check Domains, Social Handles &amp; <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              50-State LLC Availability
            </span>{' '}
            Instantly
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300">
            Verify real-time DNS records, probe social username availability, and access official Secretary of State business registries in one unified search.
          </p>

          {/* Search App Integration */}
          <div className="mt-8">
            <UnifiedBrandChecker />
          </div>
        </div>
      </section>

      {/* Ad slot */}
      <div className="max-w-5xl mx-auto px-4 w-full">
        <AdBanner slot="1234567890" label="Sponsored Partner" />
      </div>

      {/* Feature Highlights Grid */}
      <section className="py-16 border-t border-slate-800/80 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Everything You Need to Secure Your Startup Identity
            </h2>
            <p className="text-sm text-slate-400">
              Stop manually hopping across 10 different registrar sites and state registries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Live DNS &amp; DoH Resolution</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Direct querying against Cloudflare and Google DNS over HTTPS to inspect live .com, .io, .ai, and .co records in milliseconds.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">50 US State Business Registries</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Direct SOS lookup portals, statutory state filing fees, turnaround times, and formation rules for all 50 states.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">USPTO Trademark Clearance</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Integrated USPTO guidance and phonetic conflict warnings to protect your brand from costly infringement lawsuits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular State LLC Directories */}
      <section className="py-16 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-indigo-400 font-bold">Directories</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Top LLC Formation States
              </h2>
            </div>
            <Link
              href="/llc-search/delaware"
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Explore Delaware Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topStates.map((state) => (
              <Link
                key={state.slug}
                href={`/llc-search/${state.slug}`}
                className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all block"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {state.name} LLC
                    </h3>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-1">{state.agencyName}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/20">
                    {state.slug.substring(0, 2).toUpperCase()}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500">Filing Fee:</span>{' '}
                    <span className="font-bold text-emerald-400">{state.filingFee}</span>
                  </div>
                  <div className="flex items-center gap-1 text-indigo-400 font-medium group-hover:translate-x-0.5 transition-transform">
                    <span>View Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick list of all 50 states */}
          <div className="mt-10 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-slate-400">
              All 50 US State LLC Filing Indexes
            </h3>
            <div className="flex flex-wrap gap-2">
              {statesData.map((s) => (
                <Link
                  key={s.slug}
                  href={`/llc-search/${s.slug}`}
                  className="px-3 py-1.5 bg-slate-800/60 hover:bg-indigo-900/30 hover:text-indigo-300 hover:border-indigo-500/40 border border-slate-700/50 rounded-lg text-xs text-slate-300 transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 border-t border-slate-800/80 bg-slate-900/20">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-400">Everything about entity registration and trademark clearing.</p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                Why should I check domain, social, and LLC availability together?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Founding a company under a name where the .com domain is held by a squatter, the Instagram handle is taken by a competitor, or the name is already trademarked causes costly rebranding down the line. Brand Vault checks all three layers simultaneously.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                Which state is best for registering an LLC?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Delaware is preferred by venture-backed startups due to its Chancery Court. Wyoming and New Mexico offer maximum privacy and low fees. However, if you are a local brick-and-mortar or sole proprietor operating in your home state, forming in your home state (e.g. California, Texas, Florida) often avoids foreign qualification fees.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                How accurate is the live domain check?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our checker queries Cloudflare authoritative DNS-over-HTTPS resolvers in real-time. If an A record, AAAA record, or nameserver is present, the domain is confirmed registered. Status 3 (NXDOMAIN) indicates immediate availability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
