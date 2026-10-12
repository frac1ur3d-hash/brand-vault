import type { Metadata } from 'next';
import { TAILOR_BRANDS_TRACKING_URL } from '@/lib/affiliates';

export const metadata: Metadata = {
  title: 'Taking you to Tailor Brands… | Brand Vault',
  description: 'Redirecting you to complete your LLC formation.',
  robots: { index: false, follow: false },
};

export default function StartPage() {
  const target = TAILOR_BRANDS_TRACKING_URL;
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-6">
      <meta httpEquiv="refresh" content={`2;url=${target}`} />
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 h-12 w-12 rounded-full border-2 border-white/20 border-t-white animate-spin" />
        <h1 className="text-2xl font-bold text-white mb-3">
          Taking you to Tailor Brands…
        </h1>
        <p className="text-white/60 mb-6">
          You&apos;re on your way to form your LLC. This takes just a few seconds.
        </p>
        <a
          href={target}
          className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-white/90 transition"
        >
          Continue →
        </a>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(function(){window.location.replace(${JSON.stringify(target)});},2000);`,
        }}
      />
    </main>
  );
}
