import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import statesData from '@/data/states.json';
import UnifiedBrandChecker from '@/components/UnifiedBrandChecker';
import {
  Building2,
  ExternalLink,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Landmark,
  Scale,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return statesData.map((state) => ({
    state: state.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = statesData.find((s) => s.slug === stateSlug.toLowerCase());

  if (!state) {
    return {
      title: 'State LLC Search & Guide | Brand Vault',
    };
  }

  return {
    title: `${state.name} LLC Name Search & Filing Guide (${state.fee} Fee) | Brand Vault`,
    description: `Search ${state.name} business entity database, verify LLC name availability, view ${state.agency} turnaround times, and calculate formation fees.`,
    alternates: {
      canonical: `https://brandvault.app/llc-search/${state.slug}`,
    },
    openGraph: {
      title: `${state.name} LLC Name Search & Business Registration`,
      description: `Official ${state.name} LLC formation requirements, ${state.fee} filing fee, turnaround times, and free name availability checker.`,
      url: `https://brandvault.app/llc-search/${state.slug}`,
      type: 'article',
    },
  };
}

export default async function StateLLCPage({ params }: Props) {
  const { state: stateSlug } = await params;
  const state = statesData.find((s) => s.slug === stateSlug.toLowerCase());

  if (!state) {
    notFound();
  }

  // Neighbor/alternate states
  const otherStates = statesData.filter((s) => s.slug !== state.slug).slice(0, 6);

  return (
    <div className="min-h-screen py-10 px-4 max-w-6xl mx-auto space-y-12">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/#directories" className="hover:text-white transition-colors">
          LLC State Search
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-indigo-400 font-medium">{state.name}</span>
      </nav>

      {/* State Header Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30">
                STATE CODE: {state.code}
              </span>
              {state.popular && (
                <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Premier Formation State
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {state.name} LLC Name Search &amp; Formation
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Verify name availability against the <span className="text-white font-semibold">{state.agency}</span> registry, calculate statutory fees, and secure matching domain names.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
            <a
              href={state.searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Official {state.code} SOS Search</span>
            </a>
            <a
              href={`https://www.zenbusiness.com/?aff=brandvault&state=${state.code}`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Form {state.code} LLC for $0</span>
            </a>
          </div>
        </div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>State Filing Fee</span>
            </div>
            <div className="text-xl font-black text-white mt-1">{state.fee}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Turnaround Time</span>
            </div>
            <div className="text-sm font-bold text-white mt-1 truncate" title={state.turnaroundTime}>
              {state.turnaroundTime}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Annual Requirement</span>
            </div>
            <div className="text-sm font-bold text-white mt-1 truncate" title={state.annualFee}>
              {state.annualFee}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Landmark className="w-4 h-4 text-pink-400" />
              <span>Filing Authority</span>
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1 truncate" title={state.agency}>
              {state.agency}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Live Brand Checker Preset */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-white">Scan Your {state.name} Business Name</h2>
          <p className="text-xs text-slate-400">
            Check domains, social handles, and trademark records before filing with the {state.agency}.
          </p>
        </div>
        <UnifiedBrandChecker />
      </section>

      {/* Step-by-Step State LLC Formation Guide */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-10 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Complete Roadmap</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            How to Form an LLC in {state.name} (6 Simple Steps)
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">Choose a Compliant {state.name} LLC Name</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Under {state.name} law, your business name must contain a designator like &quot;Limited Liability Company&quot;, &quot;LLC&quot;, or &quot;L.L.C.&quot;. It must be distinguishable from all registered entities currently on file with the {state.agency}.
              </p>
              <div className="pt-2">
                <a
                  href={state.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  <span>Search {state.name} Business Entity Registry</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">Appoint a Registered Agent in {state.name}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                You must maintain a registered agent with a physical street address in {state.name} (P.O. Boxes are not permitted). The agent receives official state correspondence and legal Service of Process during regular business hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">File Articles of Organization &amp; Pay {state.fee}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Submit your official formation documents to the {state.agency}. The statutory state filing fee is <span className="text-emerald-400 font-bold">{state.fee}</span> with an average online processing turnaround of <span className="text-white font-semibold">{state.turnaroundTime}</span>.
              </p>
              <div className="pt-2">
                <a
                  href={state.filingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  <span>Official {state.name} Filing Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              4
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">Draft an LLC Operating Agreement</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                An Operating Agreement defines ownership percentages, member voting rights, profit distributions, and management hierarchy. While not always publicly filed with the state, having one in place protects your limited liability status in court.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              5
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">Obtain a Free Federal EIN from the IRS</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Your Employer Identification Number (EIN) operates as your business&apos;s Social Security Number. It is required to open a business bank account, hire employees, and establish merchant accounts (Stripe/PayPal).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              6
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">Maintain Annual {state.name} Compliance</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Stay in good standing with the state by meeting ongoing statutory requirements: <span className="text-amber-300 font-medium">{state.annualFee}</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Other States Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Compare Other Formation Jurisdictions</h2>
          <Link href="/" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            <span>All 50 States</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {otherStates.map((s) => (
            <Link
              key={s.slug}
              href={`/llc-search/${s.slug}`}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-850 transition-all block text-center"
            >
              <div className="font-bold text-white text-sm">{s.name}</div>
              <div className="text-xs text-emerald-400 font-semibold mt-1">{s.fee} fee</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
