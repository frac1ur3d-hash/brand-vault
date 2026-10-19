'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  FolderCheck,
  FileSpreadsheet,
  Lock,
  Download,
  CheckCircle2,
  ArrowRight,
  Laptop,
  Coins,
  FileCode,
  Sparkles,
  Receipt,
  FileText,
  BadgeCheck,
} from 'lucide-react';

export default function ShopPage() {
  const [loadingRecon, setLoadingRecon] = useState(false);
  const [loadingStatement, setLoadingStatement] = useState(false);

  const handleCheckoutRecon = async () => {
    setLoadingRecon(true);
    try {
      const res = await fetch('/api/checkout/recon-vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to initiate Stripe Checkout. Please try again.');
        setLoadingRecon(false);
      }
    } catch (err: any) {
      alert('Checkout error: ' + (err.message || 'Please check your connection'));
      setLoadingRecon(false);
    }
  };

  const handleCheckoutStatement = async () => {
    setLoadingStatement(true);
    try {
      const res = await fetch('/api/checkout/statement-vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to initiate Stripe Checkout. Please try again.');
        setLoadingStatement(false);
      }
    } catch (err: any) {
      alert('Checkout error: ' + (err.message || 'Please check your connection'));
      setLoadingStatement(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Background ambient lighting */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-emerald-600/10 blur-[140px] -z-10 pointer-events-none rounded-full" />

      {/* Hero Header */}
      <section className="pt-14 pb-10 px-4 max-w-6xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BrandVault Software Store • 100% Offline Standalone • Zero Subscriptions</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Industrial-Grade Financial Tools &amp; <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Air-Gapped Desktop Utilities
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300">
          Turnkey desktop software engineered for business owners, accountants, and finance teams. Run everything offline on your workstation. No recurring monthly SaaS fees, no cloud leaks, no technical friction.
        </p>
      </section>

      {/* Main Catalog: 2 Flagship Desktop Applications */}
      <section className="py-8 max-w-6xl mx-auto px-4 w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* PRODUCT 1: StatementVault */}
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/95 to-slate-900/60 border border-indigo-500/40 p-8 flex flex-col justify-between shadow-2xl overflow-hidden hover:border-indigo-400/60 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/15 blur-3xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Most Popular For Accounting
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% Offline
                </span>
              </div>

              <div>
                <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>StatementVault</span>
                  <span className="text-indigo-400 text-lg font-bold">v1.0</span>
                </h2>
                <p className="text-sm font-semibold text-indigo-200/90 mt-1">
                  Offline Bank &amp; Credit Card Statement PDF-to-CSV / QuickBooks Converter
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Stops manual data entry forever. Drag any Chase, BofA, Wells Fargo, Citi, or credit card PDF onto the screen. In 0.2s, StatementVault extracts all transactions and mathematically proves: <br />
                <span className="font-mono text-emerald-400 text-xs bg-slate-950 px-2 py-0.5 rounded mt-1 inline-block">Opening + Deposits - Withdrawals == Ending Balance</span>
              </p>

              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>1-Click Drag &amp; Drop:</strong> Drop any bank PDF or text export. Instant visual table.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>QuickBooks &amp; Excel Ready:</strong> Exports formatted 3-column QuickBooks CSV and QBO.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Cloud Leak:</strong> Account numbers and financial records stay 100% on your machine.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100x Deterministic Precision:</strong> Verified across 100+ random statement audits down to 1¢.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-slate-400">One-Time Lifetime License</div>
                  <div className="text-3xl font-black text-white">$67 <span className="text-xs text-slate-400 font-normal">USD</span></div>
                </div>
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  Zero Subscriptions
                </div>
              </div>

              <button
                onClick={handleCheckoutStatement}
                disabled={loadingStatement}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{loadingStatement ? 'Redirecting to Stripe...' : 'Buy StatementVault ($67)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Instant Auto-Download • Stripe Live Checkout • 30-Day Money Back</span>
              </div>
            </div>
          </div>

          {/* PRODUCT 2: ReconVault */}
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/95 to-slate-900/60 border border-emerald-500/40 p-8 flex flex-col justify-between shadow-2xl overflow-hidden hover:border-emerald-400/60 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 blur-3xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Flagship B2B Reconciler
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                  Batch Sweeper
                </span>
              </div>

              <div>
                <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>ReconVault</span>
                  <span className="text-emerald-400 text-lg font-bold">v1.0</span>
                </h2>
                <p className="text-sm font-semibold text-emerald-200/90 mt-1">
                  Deterministic B2B Invoice &amp; Bulk CSV Reconciliation Engine
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Automates matching supplier invoices, Stripe payouts, and QuickBooks spreadsheets. Audits quantities, unit rates, tax lines, and totals down to integer cents—catching 1¢ discrepancy drift before it reaches your accountant.
              </p>

              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>1-Click Drag &amp; Drop GUI:</strong> Drag your invoice folder right onto the screen. Zero command line.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Drop-Folder Batch Sweeping:</strong> Place files into Incoming_Invoices and click run to auto-sort.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Cryptographic Audit Journal:</strong> Generates tamper-proof SHA-256 ledger proof for every invoice.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>168x Stress-Tested:</strong> Verified across 168 unit and batch tests with 0 failures.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-slate-400">One-Time Lifetime License</div>
                  <div className="text-3xl font-black text-white">$47 <span className="text-xs text-slate-400 font-normal">USD</span></div>
                </div>
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  Zero Subscriptions
                </div>
              </div>

              <button
                onClick={handleCheckoutRecon}
                disabled={loadingRecon}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{loadingRecon ? 'Redirecting to Stripe...' : 'Buy ReconVault ($47)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Instant Auto-Download • Stripe Live Checkout • 30-Day Money Back</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Zero Friction Comparison Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs uppercase tracking-wider text-indigo-400 font-bold">Why Offline Desktop First?</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            The Antidote to SaaS &amp; Automation Fatigue
          </h2>
          <p className="text-sm text-slate-400">
            Compare BrandVault standalone desktop packages to typical SaaS web apps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-black">
              1
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderCheck className="w-5 h-5 text-indigo-400" />
              <span>Zero Webhook Fatigue</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              No Zapier connectors breaking when APIs change. No complicated webhooks to configure. Unzip the file, double-click to install, and drag your files. Done.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black">
              2
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <span>100% Air-Gapped Privacy</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Uploading confidential bank statements or corporate invoices to obscure cloud conversion sites exposes sensitive account details. With our tools, everything executes strictly in RAM on your local machine.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black">
              3
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-400" />
              <span>One-Time Lifetime Ownership</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Why pay $40 to $70 every month for software you only run a few times per week? Pay once, own it forever, process unlimited transactions with zero limits.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-12 max-w-4xl mx-auto px-4 w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-400">Questions about purchasing, installing, and using our desktop tools.</p>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm sm:text-base">What happens right after I pay?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Stripe immediately redirects you to our download page, and your browser begins downloading the full standalone .ZIP file automatically within 0.8 seconds. You also get a manual download button and a 3-step visual guide.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm sm:text-base">Is there any setup or installation headache?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              None. Every package comes with a 1-click Windows installer (<code className="text-emerald-300 text-xs font-mono">INSTALL-*.bat</code>) that puts a shortcut right on your Desktop, as well as a macOS launcher. You can also double-click the HTML GUI file directly on any computer with any browser—100% offline.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm sm:text-base">What if I have an unusual bank statement format?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every download includes our direct engineering support email (<code className="text-indigo-300 text-xs font-mono">support@aetherdynamics.net</code>) and customer support line. If you ever run into an unsupported regional bank layout, reach out and our team will provide a compatibility patch free of charge.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Support Info */}
      <footer className="mt-auto py-8 border-t border-slate-800/80 text-center text-xs text-slate-500 space-y-2">
        <p>© 2026 Aether Dynamics &amp; BrandVault. All rights reserved. 100% offline local applications.</p>
        <p>Support: <a href="mailto:support@aetherdynamics.net" className="text-indigo-400 underline">support@aetherdynamics.net</a> • Direct assistance available.</p>
      </footer>
    </div>
  );
}
