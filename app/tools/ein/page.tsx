import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import EINWalkthrough from '@/components/tools/EINWalkthrough';

export const metadata: Metadata = {
  title: 'Free EIN Walkthrough — Never Pay for an EIN | Brand Vault',
  description:
    'Formation services charge $50–$99 to file your EIN. The IRS gives it away free. Step-by-step walkthrough plus a fee-scam checker.',
};

export default function EINPage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Get your EIN free. <span className="text-indigo-400">Never pay for one.</span>
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          An EIN is free from the IRS — always. The $50–$99 &quot;EIN filing&quot; add-on is a
          10-minute form with a markup. Do it yourself in the time it takes to check out.
        </p>
      </div>

      <EINWalkthrough />

      <div className="text-center">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          <span>More free tools</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
