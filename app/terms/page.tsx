import React from 'react';
import { Metadata } from 'next';
import { Scale, AlertTriangle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service & Legal Disclaimer | Brand Vault',
  description: 'Terms of Service, non-legal advice disclaimer, and use guidelines for Brand Vault.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-4xl mx-auto space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Scale className="w-3.5 h-3.5" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Terms of Service</h1>
        <p className="text-xs text-slate-400">Effective Date: October 2026</p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        {/* Critical Legal Disclaimer */}
        <section className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
          <h2 className="text-base font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Important Legal Disclaimer: Not a Law Firm
          </h2>
          <p className="text-amber-100/90 text-xs sm:text-sm">
            Brand Vault is an informational tool and software utility. Brand Vault is <strong className="underline">NOT</strong> an attorney, law firm, or substitute for professional legal or tax advice. Information provided on this website—including state statutory filing fees, turnaround times, and DNS availability—is compiled for general educational purposes. Always consult a licensed attorney or certified public accountant (CPA) regarding specific formation and compliance decisions.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Brand Vault (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you disagree with any portion of these terms, you must refrain from using the platform.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white">2. DNS &amp; Availability Lookup Disclaimers</h2>
          <p>
            Brand availability results (including DNS over HTTPS queries, social handle probes, and state corporation search links) are provided &quot;as is&quot; and &quot;as available&quot;. While we strive for absolute accuracy, authoritative registration status is strictly determined at the moment of actual registration with ICANN registrars, social platforms, and the respective Secretary of State.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white">3. Third-Party Links &amp; Affiliate Relationships</h2>
          <p>
            Brand Vault links to external websites and resources, including official state filing portals, the USPTO, and affiliate partners. We do not control or endorse the content, policies, or operational standards of these third-party websites.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white">4. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Brand Vault and its operators shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.
          </p>
        </section>
      </div>
    </div>
  );
}
