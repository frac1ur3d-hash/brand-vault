import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Download,
  FolderCheck,
  Terminal,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  FileCode,
  Laptop,
} from 'lucide-react';

export default function ShopSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 py-16 px-4">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        {/* Success Header Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-emerald-500/30 p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Payment Complete • Order Confirmed</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Thank You for Your Order!
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
              Your license for <strong>ReconVault v1.0 (Deterministic Offline Invoice Reconciliation Engine)</strong> is activated.
            </p>
          </div>

          {/* Download Action Box */}
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left space-y-1">
                <div className="font-bold text-white text-base">ReconVault v1.0 Package</div>
                <div className="text-xs text-slate-400">
                  Includes batch runners (.bat / .sh), deterministic engine, drop folders &amp; visual guide.
                </div>
              </div>

              <a
                href="/downloads/recon-vault-v1.0.zip"
                download="recon-vault-v1.0.zip"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 shrink-0 group cursor-pointer"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download .ZIP (Instant)</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3-Step Setup Instructions */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <span>How to Run ReconVault on Your Machine</span>
          </h2>

          <div className="space-y-4 text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </div>
              <div>
                <strong className="text-white">Unzip the Downloaded File:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Extract <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300">recon-vault-v1.0.zip</code> to any location on your local drive (e.g. Desktop or Documents).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </div>
              <div>
                <strong className="text-white">Drop Your Invoices or CSVs:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Place JSON invoices or accounting export CSV files into the <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300">Incoming_Invoices/</code> folder. We included 3 test files in <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300">sample_files/</code> so you can test immediately.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </div>
              <div>
                <strong className="text-white">Double-Click the Runner:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  On Windows, double-click <code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-300">run-batch.bat</code>. On macOS or Linux, run <code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-300">./run-batch.sh</code> in terminal. Everything is audited and sorted in 2 seconds flat.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Offline execution — no data ever leaves your computer.</span>
            </div>

            <Link
              href="/shop"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Back to Software Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
