import Link from 'next/link';
import { Metadata } from 'next';
import { Wrench, ArrowRight, Calculator, BadgeCheck, FileText, BellRing, ShieldCheck, FlaskConical } from 'lucide-react';
import LLCCostCalculator from '@/components/tools/LLCCostCalculator';

export const metadata: Metadata = {
  title: 'Free Business Tools — LLC Cost Calculator | Brand Vault',
  description:
    'Free interactive tools for founders: the LLC true-cost calculator that exposes what "$0 formation" really costs, and more coming.',
};

const TOOL_CARDS = [
  {
    href: '/tools/ein',
    icon: BadgeCheck,
    title: 'EIN Walkthrough + Fee-Scam Checker',
    blurb: 'Services charge $50–$99 for your EIN. The IRS gives it free. Step-by-step + a checker for anyone trying to charge you.',
    live: true,
  },
  {
    href: '/tools/operating-agreement',
    icon: FileText,
    title: 'Operating Agreement in Plain English',
    blurb: 'The $35–$149 document, clause by clause, translated. Know what you\'re signing before you sign it.',
    live: true,
  },
  {
    href: '/tools/registered-agent',
    icon: ShieldCheck,
    title: '"Can I Be My Own Agent?" Quiz',
    blurb: 'The $125–$299/yr question, answered in 60 seconds. Half the people paying it don\'t need to.',
    live: true,
  },
  {
    href: '/tools/compliance',
    icon: BellRing,
    title: 'Compliance Deadline Tracker',
    blurb: 'The $199/yr "Worry-Free Compliance" killer. Your state\'s deadlines, fees, and late penalties — free, no signup.',
    live: true,
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-4xl mx-auto space-y-10">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Wrench className="w-3.5 h-3.5" />
          <span>Free Tools</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Free tools that tell you the truth
        </h1>
        <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
          The stuff formation services charge $50–$280/yr for — free here. No signup, no paywall,
          no &quot;free*&quot; with an asterisk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TOOL_CARDS.map((t) => (
          <Link
            key={t.title}
            href={t.live ? t.href : '/tools'}
            className={`p-5 rounded-2xl border space-y-2 transition-colors ${
              t.live
                ? 'bg-slate-900/60 border-slate-800 hover:border-indigo-500/50'
                : 'bg-slate-900/40 border-slate-800/60 opacity-70'
            }`}
          >
            <t.icon className={`w-5 h-5 ${t.live ? 'text-indigo-400' : 'text-slate-500'}`} />
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              {t.title}
              {!t.live && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Building
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.blurb}</p>
            {t.live && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-300">
                Open tool <ArrowRight className="w-3.5 h-3.5" />
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">LLC True Cost Calculator</h2>
        </div>
        <LLCCostCalculator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: '"Where should I form?" quiz',
            blurb:
              'Home state vs. Wyoming vs. Delaware — answer 5 questions, avoid the out-of-state trap. Coming soon.',
          },
          {
            title: '"Can I be my own registered agent?" quiz',
            blurb:
              'The $125/yr question, answered in 60 seconds. Coming soon.',
          },
          {
            title: 'Post-formation checklist',
            blurb:
              'You filed. Now what? Every step after the paperwork, in order. Coming soon.',
          },
        ].map((t) => (
          <div
            key={t.title}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 opacity-80"
          >
            <FlaskConical className="w-5 h-5 text-slate-500" />
            <h3 className="text-sm font-bold text-white">{t.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.blurb}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          <span>Check a business name</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
