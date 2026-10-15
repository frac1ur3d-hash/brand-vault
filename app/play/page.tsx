import Link from 'next/link';
import { Metadata } from 'next';
import { Gamepad2, ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Play Rain Blade — Free 8-Bit Game | Brand Vault',
  description:
    'Bored? Play Portland Protocol: Rain Blade — a free 8-bit cyber hack & slash ARPG by Kyle Alexander McLeod. Right here in your browser.',
};

const GAME_URL = 'https://portland-rain-blade.netlify.app/rain-blade.html';

export default function PlayPage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-6xl mx-auto space-y-8">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Arcade Break</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Portland Protocol: <span className="text-purple-400">Rain Blade</span>
        </h1>
        <p className="text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Bored of paperwork? Take a break — a free 8-bit cyber hack &amp; slash ARPG with
          bullet-deflecting katana combat, rune skills, and 120+ Portland-themed items. Made by
          the same guy who built this site.
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden border border-slate-700 bg-black shadow-2xl">
        <iframe
          src={GAME_URL}
          title="Portland Protocol: Rain Blade — playable demo"
          className="w-full h-[70vh] min-h-[480px]"
          allow="fullscreen"
          allowFullScreen
          loading="lazy"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="https://frac1al.itch.io/portland-protocol-rain-blade"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          <span>Get the full game on itch.io</span>
          <ExternalLink className="w-4 h-4" />
        </a>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          <span>Back to the name checker</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <p className="text-center text-[11px] text-slate-500">
        Tip: the game plays best with a keyboard. Click inside the game frame first.
      </p>
    </div>
  );
}
