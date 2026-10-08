import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, Globe, Building2, Zap, ArrowRight, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Brand Vault',
  description: 'Learn about Brand Vault - the developer & founder tool for unified DNS, social handle, and 50-state LLC availability search.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-4xl mx-auto space-y-10">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Info className="w-3.5 h-3.5" />
          <span>About Brand Vault</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Empowering Founders to Secure Their Global Identity
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Brand Vault is engineered to eliminate the fragmentation of launching a modern business. Instead of checking domains on one registrar, social handles across five platforms, and business name registries on individual Secretary of State portals, Brand Vault provides a unified, instantaneous discovery engine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <Globe className="w-6 h-6 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">Direct DNS / DoH</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ultra-fast DNS-over-HTTPS querying directly from privacy-first resolvers without selling your search history or squatting on your ideas.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <Building2 className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-bold text-white">50 US Jurisdictions</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Up-to-date compliance guides, formation fee calculators, and direct portal search links for all 50 US Secretary of State offices.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <ShieldCheck className="w-6 h-6 text-pink-400" />
          <h3 className="text-lg font-bold text-white">Federal Trademark Clearance</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Immediate deep-linking into the USPTO Trademark Electronic Search System (TESS) to preempt legal trademark disputes.
          </p>
        </div>
      </div>

      {/* Monetization & Affiliate Transparency Section */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-indigo-500/30 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>Affiliate &amp; Advertising Disclosure</span>
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Brand Vault is a free tool funded through affiliate partnerships and advertisements (including Google AdSense). When you click out to register a domain with Namecheap, form an entity through ZenBusiness, or use third-party partner links, we may receive a commission at no additional cost to you.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Our recommendations are strictly independent, designed to save founders time and money while navigating formation compliance.
        </p>
      </div>

      <div className="pt-4 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/25"
        >
          <span>Launch Brand Search</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
