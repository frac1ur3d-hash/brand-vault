import React from 'react';
import { Metadata } from 'next';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Brand Vault',
  description: 'Privacy Policy and Cookie Notice for Brand Vault - detailing data collection, Google AdSense, analytics, and affiliate tracking.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-4xl mx-auto space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Shield className="w-3.5 h-3.5" />
          <span>Legal &amp; Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        <section className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            1. Search Queries &amp; No Idea Squatting
          </h2>
          <p>
            At Brand Vault, we do not store, log, or sell your brand search queries to domain front-runners or third-party brokers. DNS queries are submitted in real-time to public DNS-over-HTTPS resolvers (such as Cloudflare 1.1.1.1 and Google Public DNS).
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-purple-400" />
            2. Google AdSense &amp; Advertising Cookies
          </h2>
          <p>
            Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              Google Ads Settings
            </a>{' '}
            or through{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              aboutads.info
            </a>
            .
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            3. Affiliate Links &amp; Third-Party Cookies
          </h2>
          <p>
            Our website contains outbound affiliate links to trusted domain registrars (e.g., Namecheap) and business formation service providers (e.g., ZenBusiness, LegalZoom). When you click these links, an affiliate tracking cookie may be stored in your browser to attribute commissions.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white">4. Analytics &amp; Log Files</h2>
          <p>
            Like most modern web platforms, Brand Vault gathers non-identifying technical data including browser type, operating system, referrer pages, and timestamp to monitor system performance and prevent automated abuse.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white">5. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy or data processing practices, contact us at{' '}
            <span className="text-indigo-400 font-mono">legal@brandvault.app</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
