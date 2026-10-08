import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import statesData from '@/data/states.json';
import UnifiedBrandChecker from '@/components/UnifiedBrandChecker';
import AdBanner from '@/components/AdBanner';
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
  Info,
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
      title: 'State LLC Search & Entity Availability | Brand Vault',
    };
  }

  return {
    title: `${state.name} LLC Name Search & Entity Availability (${state.filingFee} Fee) | Brand Vault`,
    description: `Official ${state.name} LLC name search, business entity registry links, ${state.agencyName} filing fees (${state.filingFee}), turnaround times (${state.turnaroundTime}), and naming requirements.`,
    alternates: {
      canonical: `https://brandvault.app/llc-search/${state.slug}`,
    },
    openGraph: {
      title: `${state.name} LLC Name Search & Entity Availability`,
      description: `Verify ${state.name} LLC business name availability with ${state.agencyName}. Statutory fee: ${state.filingFee}. Turnaround: ${state.turnaroundTime}.`,
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
                STATE: {state.name.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Official Entity Registry
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {state.name} LLC Name Search &amp; Entity Availability
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Verify legal availability against the <span className="text-white font-semibold">{state.agencyName}</span> database, review statutory requirements, and secure your brand across domains and social networks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
            <a
              href={state.officialSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Official SOS Portal</span>
            </a>
            <a
              href={`https://www.northwestregisteredagent.com/?aff=brandvault&state=${state.slug}`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Form {state.name} LLC ($39 + Fee)</span>
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
            <div className="text-xl font-black text-white mt-1">{state.filingFee}</div>
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
            <div className="text-xs font-semibold text-slate-200 mt-1 truncate" title={state.agencyName}>
              {state.agencyName}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Live Brand Checker at top */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-white">Scan Your Proposed {state.name} Business Name</h2>
          <p className="text-xs text-slate-400">
            Instant real-time checks across DNS domains, major social handles, and federal trademark databases.
          </p>
        </div>
        <UnifiedBrandChecker />
      </section>

      {/* In-Article Top Ad Placement */}
      <AdBanner slot="5678901234" label="Sponsored Partner Link" />

      {/* State-Specific Fee & Detail Table */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{state.name} LLC Formation Cost &amp; Fee Breakdown</h2>
            <p className="text-xs text-slate-400">Statutory fees and ongoing compliance requirements for {state.name}.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-mono uppercase text-slate-400 bg-slate-950/40">
                <th className="p-4 rounded-tl-xl">Fee Type</th>
                <th className="p-4">Cost</th>
                <th className="p-4">Authority / Schedule</th>
                <th className="p-4 rounded-tr-xl">Mandatory?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-semibold text-white">State Filing Fee (Articles of Organization)</td>
                <td className="p-4 text-emerald-400 font-bold">{state.filingFee}</td>
                <td className="p-4 text-xs">{state.agencyName}</td>
                <td className="p-4 text-xs text-indigo-300 font-bold">Yes (One-time)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-semibold text-white">Annual / Biennial Compliance Fee</td>
                <td className="p-4 text-purple-400 font-bold">{state.annualFee}</td>
                <td className="p-4 text-xs">Annual / Biennial Schedule</td>
                <td className="p-4 text-xs text-indigo-300 font-bold">Yes (Recurring)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-semibold text-white">Registered Agent Service</td>
                <td className="p-4 text-slate-200 font-semibold">$0 - $39/yr (Northwest)</td>
                <td className="p-4 text-xs">Commercial Agent or Self</td>
                <td className="p-4 text-xs text-indigo-300 font-bold">Yes (Required)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-semibold text-white">Federal EIN (Tax ID)</td>
                <td className="p-4 text-emerald-400 font-bold">$0 (Free)</td>
                <td className="p-4 text-xs">Internal Revenue Service (IRS)</td>
                <td className="p-4 text-xs text-slate-400 font-medium">Recommended</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* State Naming Requirements Card */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{state.name} LLC Naming Rules &amp; Guidelines</h2>
            <p className="text-xs text-slate-400">Official statutory naming constraints administered by the {state.agencyName}.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-sm text-slate-300 leading-relaxed">
          <p className="font-medium text-slate-200">{state.nameRequirements}</p>
        </div>
      </section>

      {/* Step-by-Step State LLC Formation Guide */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-10 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Formation Blueprint</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            How to Form an LLC in {state.name} (Step-by-Step)
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
                Your business name must contain a statutory designator such as &quot;LLC&quot; or &quot;Limited Liability Company&quot;. It must be distinguishable from all other registered active entities on file with the {state.agencyName}.
              </p>
              <div className="pt-2">
                <a
                  href={state.officialSearchUrl}
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
                You must appoint a registered agent with a physical street address in {state.name} (P.O. Boxes are not permitted). The agent accepts service of process and official legal notices during standard business hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">File Formation Documents &amp; Pay {state.filingFee}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Submit your official Articles of Organization to the {state.agencyName}. The standard state filing fee is <span className="text-emerald-400 font-bold">{state.filingFee}</span> with an estimated processing time of <span className="text-white font-semibold">{state.turnaroundTime}</span>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              4
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">Draft an LLC Operating Agreement</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                An Operating Agreement outlines internal governance, voting thresholds, equity percentages, and profit disbursements. Having an executed operating agreement protects corporate liability separation in court.
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
                Your Employer Identification Number (EIN) acts as your business&apos;s Federal Tax ID. It is required for business checking accounts, merchant services, and hiring staff.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              6
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">Maintain Annual Compliance &amp; Reports</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Stay in continuous good standing with {state.name} by filing your required statutory reports: <span className="text-amber-300 font-medium">{state.annualFee}</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* In-Article Bottom Ad Placement */}
      <AdBanner slot="6789012345" label="Sponsored Resource" />

      {/* Explore Other States Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Explore LLC Guides in Other States</h2>
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
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all block text-center"
            >
              <div className="font-bold text-white text-sm">{s.name}</div>
              <div className="text-xs text-emerald-400 font-semibold mt-1">{s.filingFee}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
