'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Download,
  FolderCheck,
  Terminal,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  MousePointerClick,
  Laptop,
} from 'lucide-react';

export default function ShopSuccessPage() {
  useEffect(() => {
    // Automatically trigger the download when buyer arrives from Stripe
    const timer = setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/downloads/recon-vault-v1.0.zip';
      link.download = 'recon-vault-v1.0.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

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
              <span>Payment Successful • License Activated</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Your Download Is Starting!
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
              Your copy of <strong>ReconVault Desktop v1.0 (1-Click Offline Invoice Reconciler)</strong> has been generated and is downloading now.
            </p>
          </div>

          {/* Download Action Box */}
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left space-y-1">
                <div className="font-bold text-white text-base">ReconVault v1.0 Standalone Package</div>
                <div className="text-xs text-slate-400">
                  Includes 1-Click Desktop Installer, Drag &amp; Drop Graphical UI, and QuickBooks Exporter.
                </div>
              </div>

              <a
                href="/downloads/recon-vault-v1.0.zip"
                download="recon-vault-v1.0.zip"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 shrink-0 group cursor-pointer"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Click Here if Download Doesn&apos;t Start</span>
              </a>
            </div>
          </div>
        </div>

        {/* 1-Click Zero-Reading Guide */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <MousePointerClick className="w-6 h-6 text-emerald-400" />
              <span>Zero-Setup QuickStart: 3 Simple Steps</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              No technical commands or prerequisites. Everything runs visually right on your desktop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <strong className="text-white block">Unzip the File</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Right-click <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300">recon-vault-v1.0.zip</code> and extract it anywhere on your computer.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <strong className="text-white block">1-Click Launch</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Double-click <code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-300">INSTALL-RECONVAULT.bat</code> to put an icon on your Desktop, or open <code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-300">ReconVault-Desktop.html</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <strong className="text-white block">Drag &amp; Drop Folder</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drag your invoice folder right onto the big box on screen. In 0.2s, see all verified invoices and penny errors instantly!
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Offline — invoices and confidential pricing never touch the internet.</span>
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
