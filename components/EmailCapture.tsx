'use client';

import React, { useState } from 'react';
import { BellRing, MailCheck, Loader2, Send } from 'lucide-react';

interface EmailCaptureProps {
  /** 'taken' = alert-me-if-it-frees-up, 'report' = email-me-this-report */
  variant: 'taken' | 'report';
  brandName: string;
  stateName?: string;
}

export default function EmailCapture({ variant, brandName, stateName }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error' | 'unconfigured'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const heading =
    variant === 'taken'
      ? `Get alerted if "${brandName}" frees up${stateName ? ` in ${stateName}` : ''}`
      : `Email me the "${brandName}" brand report`;

  const subtext =
    variant === 'taken'
      ? 'One email if this name becomes available. No spam, unsubscribe anytime.'
      : 'The full clearance breakdown, delivered to your inbox.';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: clean, brandName, stateName, variant }),
      });
      const data = await res.json();
      if (res.status === 503 && data?.error === 'not_configured') {
        setStatus('unconfigured');
        return;
      }
      if (!res.ok) throw new Error(data?.error || 'Subscription failed');
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  };

  if (status === 'done') {
    return (
      <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex items-center gap-3">
        <MailCheck className="w-6 h-6 text-emerald-400 shrink-0" />
        <div>
          <div className="text-sm font-bold text-emerald-300">You&apos;re on the list.</div>
          <div className="text-xs text-slate-400 mt-0.5">
            We&apos;ll email {email} if anything changes.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
      <div className="flex items-center gap-2.5">
        <BellRing className="w-5 h-5 text-indigo-400 shrink-0" />
        <div className="text-sm font-bold text-white">{heading}</div>
      </div>
      <p className="text-xs text-slate-400 mt-1 mb-3">{subtext}</p>
      {status === 'unconfigured' ? (
        <p className="text-xs text-amber-400">
          Email alerts are launching soon — check back shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            disabled={status === 'sending'}
            className="flex-1 px-4 py-2.5 bg-slate-800/80 border border-slate-700 focus:border-indigo-500 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {status === 'sending' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{status === 'sending' ? 'Joining…' : 'Notify me'}</span>
          </button>
        </form>
      )}
      {status === 'error' && <p className="text-xs text-rose-400 mt-2">{errorMsg}</p>}
    </div>
  );
}
