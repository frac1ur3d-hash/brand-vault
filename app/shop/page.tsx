'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  FolderCheck,
  AlertTriangle,
  FileSpreadsheet,
  Terminal,
  Lock,
  Download,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Laptop,
  Coins,
  Cpu,
  FileCode,
  Sparkles,
} from 'lucide-react';

export default function ShopPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
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
        setLoading(false);
      }
    } catch (err: any) {
      alert('Checkout error: ' + (err.message || 'Please check your connection'));
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Background ambient lighting */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-emerald-600/10 blur-[140px] -z-10 pointer-events-none rounded-full" />

      {/* Hero Header */}
      <section className="pt-14 pb-12 px-4 max-w-6xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BrandVault Software Store • 100% Offline • Zero Subscriptions</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
          High-Integrity Financial Tools &amp; <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Autonomous B2B Automations
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300">
          Industrial-grade software packages that run entirely on your local machine. No recurring SaaS fees, no cloud privacy leaks, no fuzzy hallucinations.
        </p>
      </section>

      {/* Featured Flagship Product: ReconVault */}
      <section className="py-8 max-w-6xl mx-auto px-4 w-full">
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-900/50 border border-slate-800 p-8 md:p-12 shadow-2xl overflow-hidden">
          {/* Subtle Corner Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Product Info & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Featured B2B Tool
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Version 1.0 Release
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                  100% Offline Capable
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  ReconVault <span className="text-indigo-400">v1.0</span>
                </h2>
                <p className="text-lg text-indigo-200/90 font-medium mt-1">
                  Deterministic B2B Invoice &amp; Bulk CSV Reconciliation Engine
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                ReconVault automates the tedious, error-prone chore of matching supplier invoices, Stripe payouts, and QuickBooks spreadsheets. It audits quantities, unit rates, tax lines, and totals down to the integer cent—catching penny errors before they corrupt your accounting books.
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200">
                    <strong>Drop-Folder Automation:</strong> Drop files in <code className="text-xs bg-slate-800 px-1 py-0.5 rounded text-indigo-300">Incoming_Invoices/</code> and double-click.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200">
                    <strong>100% Offline Privacy:</strong> Confidential billing records never touch external servers or the cloud.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200">
                    <strong>Integer-Cents Math:</strong> Zero floating-point rounding errors. Catches 1-cent discrepancies.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200">
                    <strong>Auto-Sorting:</strong> Separates into <span className="text-emerald-400">Verified QuickBooks</span> &amp; <span className="text-rose-400">Flagged</span> folders.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200">
                    <strong>Multi-Format Ingestion:</strong> Processes JSON invoices and bulk CSV payout exports.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200">
                    <strong>Turnkey Runners:</strong> Includes 1-click batch runners for both Windows (<code className="text-xs bg-slate-800 px-1 py-0.5 rounded text-indigo-300">.bat</code>) and macOS/Linux (<code className="text-xs bg-slate-800 px-1 py-0.5 rounded text-indigo-300">.sh</code>).
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Checkout Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-950/80 border border-indigo-500/30 p-6 sm:p-8 space-y-6 shadow-xl relative">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">One-Time Purchase</div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl sm:text-5xl font-black text-white">$47</span>
                      <span className="text-sm text-slate-400">USD</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                      Lifetime License
                    </span>
                    <div className="text-[11px] text-slate-400 mt-1">Unlimited Invoices</div>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-800 pt-4 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Delivery:</span>
                    <span className="font-semibold text-white">Instant .ZIP Download</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Compatibility:</span>
                    <span className="font-semibold text-white">Windows 10/11, macOS, Linux</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Subscription:</span>
                    <span className="font-semibold text-emerald-400">None (Buy once, keep forever)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Included:</span>
                    <span className="font-semibold text-white">Engine + 1-Click Scripts + User Guide</span>
                  </div>
                </div>

                {/* Instant Stripe Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Opening Stripe Checkout...</span>
                  ) : (
                    <>
                      <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Get ReconVault Now — $47</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 pt-1">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Secured by 256-Bit SSL &amp; Stripe Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Actually Works Workflow Diagram */}
      <section className="py-16 max-w-6xl mx-auto px-4 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs uppercase tracking-wider text-indigo-400 font-bold">The Zero-Friction Workflow</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            How Businesses Reconcile Hundreds of Invoices in Seconds
          </h2>
          <p className="text-sm text-slate-400">
            No complicated server setup or cloud database configuration required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-black">
              1
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderCheck className="w-5 h-5 text-indigo-400" />
              <span>Drop Invoices in Folder</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Whenever you or your team receive an invoice or export a batch from Stripe, Shopify, or a supplier, simply save it into the <code className="text-xs bg-slate-800 px-1 py-0.5 rounded text-indigo-300">Incoming_Invoices/</code> folder.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black">
              2
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-400" />
              <span>Double-Click Batch Runner</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Double-click <code className="text-xs bg-slate-800 px-1 py-0.5 rounded text-purple-300">run-batch.bat</code> on Windows or run <code className="text-xs bg-slate-800 px-1 py-0.5 rounded text-purple-300">run-batch.sh</code> on Mac. The engine sweeps all files in 2 seconds with zero network latency.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black">
              3
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Inspect Auto-Sorted Output</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              100% matched files move to <span className="text-emerald-400 font-semibold">Verified_Ready_For_QuickBooks/</span>. Any file with a 1-cent calculation error or tax drift moves to <span className="text-rose-400 font-semibold">Flagged_Discrepancies/</span> with a breakdown report.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Package Contents ("What's In The Box") */}
      <section className="py-12 border-t border-slate-800/80 bg-slate-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Everything Included in Your Download (.ZIP)
            </h2>
            <p className="text-sm text-slate-400">
              A complete, standalone turnkey package ready for immediate deployment on your workstation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <FileCode className="w-6 h-6 text-indigo-400" />
              <div className="font-bold text-white text-sm">Deterministic Engine</div>
              <p className="text-xs text-slate-400">
                Pre-compiled CommonJS bundle (<code className="text-indigo-300">dist/recon-vault-core.js</code>) with integer math &amp; cryptographic audit journal.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <Laptop className="w-6 h-6 text-emerald-400" />
              <div className="font-bold text-white text-sm">1-Click Batch Runners</div>
              <p className="text-xs text-slate-400">
                Native <code className="text-emerald-300">run-batch.bat</code> (Windows) and <code className="text-emerald-300">run-batch.sh</code> (Mac/Linux) for immediate double-click operation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <FileSpreadsheet className="w-6 h-6 text-purple-400" />
              <div className="font-bold text-white text-sm">Sample Test Invoices</div>
              <p className="text-xs text-slate-400">
                Includes sample clean JSON invoices, a tampered 1-cent discrepancy test, and a multi-row payout CSV file so you can test right away.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <Download className="w-6 h-6 text-pink-400" />
              <div className="font-bold text-white text-sm">Visual Operator Guide</div>
              <p className="text-xs text-slate-400">
                Interactive <code className="text-pink-300">README.html</code> visual manual and plaintext <code className="text-pink-300">QUICKSTART.txt</code> with step-by-step instructions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 max-w-4xl mx-auto px-4 w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-400">Common questions about ReconVault and offline licensing.</p>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm sm:text-base">Does ReconVault require internet access or send data to the cloud?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No. ReconVault runs 100% offline directly on your local machine. No invoice data, customer names, line item amounts, or financial summaries are ever transmitted over the network.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm sm:text-base">Are there any monthly subscription fees or limits?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              None. When you buy ReconVault for $47, you own a lifetime license. You can process unlimited invoices and batch CSV files forever without recurring charges.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm sm:text-base">What accounting platforms can I use with ReconVault?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              All approved invoices are cleanly isolated in <code className="text-indigo-300 font-mono text-xs">Verified_Ready_For_QuickBooks/</code>, ready for import into QuickBooks Online, QuickBooks Desktop, Xero, FreshBooks, NetSuite, or any custom ERP.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm sm:text-base">What prerequisite software is needed?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ReconVault requires Node.js (version 18 or newer), which is free and standard on almost all workstations. If you don't already have it installed, <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">nodejs.org</a> provides a 1-click free installer.
            </p>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/50 via-purple-900/30 to-slate-900 border border-indigo-500/30 p-8 text-center space-y-5">
          <h3 className="text-2xl font-bold text-white">Protect Your Books From Mismatches Today</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Stop losing hours hunting down $0.01 calculation errors manually. Get instant access to ReconVault for a one-time payment of $47.
          </p>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Buy ReconVault v1.0 ($47)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
