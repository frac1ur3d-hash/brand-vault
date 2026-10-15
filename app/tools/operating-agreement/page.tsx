import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import OAExplainer from '@/components/tools/OAExplainer';

export const metadata: Metadata = {
  title: 'Operating Agreement in Plain English — Free | Brand Vault',
  description:
    'Formation services charge $35–$149 for an operating agreement. Understand every clause in plain English before you sign — free.',
};

export default function OAPage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Your operating agreement, <span className="text-indigo-400">in plain English.</span>
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Nobody explains what the clauses mean — they just sell you the document. Here&apos;s
          every clause translated, plus why founders regret skipping each one.
        </p>
      </div>

      <OAExplainer />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/forms"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          <span>Get a free operating agreement template</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
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
