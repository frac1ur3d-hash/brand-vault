import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import {
  Vault,
  Search,
  Globe,
  Building2,
  ShieldCheck,
  ExternalLink,
  Heart,
  Layers,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Brand Vault - Instant Domain, Social & 50-State LLC Availability Search',
    template: '%s | Brand Vault',
  },
  description:
    'Search domain names via live DNS/DoH, probe social media handle availability, and verify business entity names across all 50 US Secretary of State LLC registries.',
  keywords: [
    'brand name search',
    'domain checker',
    'llc availability',
    'social media handle checker',
    '50 state llc search',
    'secretary of state search',
    'uspto trademark search',
    'start an llc',
    'dns lookup',
  ],
  authors: [{ name: 'Brand Vault Team' }],
  metadataBase: new URL('https://brandvault.app'),
  openGraph: {
    title: 'Brand Vault - Instant Domain, Social & 50-State LLC Search',
    description:
      'The developer and founder engine to search domains, check social handles, and access 50-state LLC business registers instantly.',
    url: 'https://brandvault.app',
    siteName: 'Brand Vault',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Vault - Instant Domain, Social & LLC Checker',
    description: 'Check domains, handles, and LLC availability in seconds.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="bg-slate-950 text-slate-100 flex flex-col min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
        {/* Top Notification Announcement Bar */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border-b border-indigo-500/20 py-1.5 px-4 text-center text-xs font-medium text-indigo-200 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>Form your LLC in Delaware, Wyoming, or any US State for $0 + state fees</span>
          <a
            href="https://www.zenbusiness.com/?aff=brandvault"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="underline text-white hover:text-amber-300 font-semibold transition-colors ml-1"
          >
            Claim Offer &rarr;
          </a>
        </div>

        {/* Global Navigation Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                <Vault className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  BRAND<span className="text-indigo-400">VAULT</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 -mt-1 uppercase">
                  Identity Engine
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <Link href="/" className="hover:text-white transition-colors">
                Brand Scanner
              </Link>
              <Link href="/llc-search/delaware" className="hover:text-white transition-colors">
                Delaware LLC
              </Link>
              <Link href="/llc-search/wyoming" className="hover:text-white transition-colors">
                Wyoming LLC
              </Link>
              <Link href="/llc-search/california" className="hover:text-white transition-colors">
                California LLC
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </nav>

            {/* Header Right Action CTA */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.zenbusiness.com/?aff=brandvault"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Form an LLC ($0)</span>
              </a>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Global Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Col */}
              <div className="space-y-3 md:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <Vault className="w-4 h-4" />
                  </div>
                  <span className="text-base font-black text-white">BRANDVAULT</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real-time domain DNS inspection, social handle probe, and 50-state Secretary of State business lookup engine for entrepreneurs.
                </p>
              </div>

              {/* State LLC Hubs */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-white uppercase tracking-wider">Top Formation States</div>
                <ul className="space-y-1.5 text-slate-400">
                  <li>
                    <Link href="/llc-search/delaware" className="hover:text-indigo-400 transition-colors">
                      Delaware LLC ($110 fee)
                    </Link>
                  </li>
                  <li>
                    <Link href="/llc-search/wyoming" className="hover:text-indigo-400 transition-colors">
                      Wyoming LLC ($100 fee)
                    </Link>
                  </li>
                  <li>
                    <Link href="/llc-search/nevada" className="hover:text-indigo-400 transition-colors">
                      Nevada LLC ($425 fee)
                    </Link>
                  </li>
                  <li>
                    <Link href="/llc-search/california" className="hover:text-indigo-400 transition-colors">
                      California LLC ($70 fee)
                    </Link>
                  </li>
                  <li>
                    <Link href="/llc-search/texas" className="hover:text-indigo-400 transition-colors">
                      Texas LLC ($300 fee)
                    </Link>
                  </li>
                  <li>
                    <Link href="/llc-search/florida" className="hover:text-indigo-400 transition-colors">
                      Florida LLC ($125 fee)
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Tools & Resources */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-white uppercase tracking-wider">Tools &amp; Registrars</div>
                <ul className="space-y-1.5 text-slate-400">
                  <li>
                    <Link href="/" className="hover:text-indigo-400 transition-colors">
                      Live DNS / DoH Lookup
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-indigo-400 transition-colors">
                      Social Username Probe
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://www.namecheap.com/?aff=brandvault"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Namecheap Domains</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tmsearch.uspto.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
                    >
                      <span>USPTO Trademark TESS</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal & Compliance */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-white uppercase tracking-wider">Compliance &amp; Legal</div>
                <ul className="space-y-1.5 text-slate-400">
                  <li>
                    <Link href="/about" className="hover:text-indigo-400 transition-colors">
                      About Brand Vault
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">
                      Privacy Policy &amp; Cookies
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                      Terms of Service &amp; Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar & Legal Disclaimer */}
            <div className="pt-8 border-t border-slate-900 text-xs text-slate-400 space-y-2">
              <p>
                <strong className="text-slate-400">Disclaimer:</strong> Brand Vault is not an attorney, law firm, or registered agent. We do not provide legal or tax advice. All brand availability results and state statutory data are compiled for informational and planning purposes only.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-slate-400">
                <span>&copy; 2026 Brand Vault. All rights reserved.</span>
                <span>Crafted for founders, creators, and indie builders.</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
