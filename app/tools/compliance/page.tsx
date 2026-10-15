import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ComplianceTracker from '@/components/tools/ComplianceTracker';

export const metadata: Metadata = {
  title: 'Free LLC Compliance Deadline Tracker | Brand Vault',
  description:
    'The $199/yr "Worry-Free Compliance" killer: your state\'s annual report deadlines, fees, late penalties, and calendar reminders — free, no signup.',
};

export default function CompliancePage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Never miss a deadline. <span className="text-indigo-400">Never pay $199/yr for reminders.</span>
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Missing an annual report can cost hundreds in penalties — or your LLC&apos;s good
          standing. The formation companies sell you deadline tracking as a subscription. This
          does the same job for free.
        </p>
      </div>

      <ComplianceTracker />

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
