import { Metadata } from 'next';
import { HeartHandshake } from 'lucide-react';
import GoFundMeWidget from '@/components/GoFundMeWidget';

export const metadata: Metadata = {
  title: 'Support the Come-Up | Brand Vault',
  description:
    "Help Kyle and his mom get back on their feet — keep a roof over their heads while the businesses he's building start to pay.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-2xl mx-auto space-y-8">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Support the Come-Up</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Help us get out for good
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Everything on this site is free because Kyle believes starting a business shouldn&apos;t
          cost a fortune. If the tools helped you — or you just want to back the come-up — this
          is where you can.
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-3 text-center">
        <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
          Part of every donation goes further
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Part of the donations raised here also go toward{' '}
          <strong className="text-white">Knotty Roots Initiative</strong> — Kyle&apos;s nonprofit
          at{' '}
          <a
            href="https://knottyroots.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 font-semibold hover:text-emerald-300"
          >
            knottyroots.org
          </a>{' '}
          — helping people get started again with permanent housing, real jobs, and a fresh
          start off the streets. It ain&apos;t about getting rich, it&apos;s about getting
          people off the streets.
        </p>
      </div>

      <div className="flex justify-center">
        <GoFundMeWidget />
      </div>

      <p className="text-center text-xs text-slate-500">
        Donations go through GoFundMe&apos;s secure platform. Sharing the fundraiser helps just as
        much.
      </p>
    </div>
  );
}
