import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AgentQuiz from '@/components/tools/AgentQuiz';

export const metadata: Metadata = {
  title: 'Can I Be My Own Registered Agent? — Free Quiz | Brand Vault',
  description:
    'Services charge $125–$299/yr to be your registered agent. Take the 60-second quiz to find out if you can legally do it yourself for free.',
};

export default function AgentPage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Do you really need to <span className="text-indigo-400">pay for a registered agent?</span>
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          It&apos;s a $125–$299/yr subscription for receiving mail. Sometimes it&apos;s worth it.
          Half the time it isn&apos;t. Answer 5 questions, get the honest verdict.
        </p>
      </div>

      <AgentQuiz />

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
