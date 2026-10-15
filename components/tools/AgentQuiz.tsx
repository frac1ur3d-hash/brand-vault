'use client';

import React, { useMemo, useState } from 'react';
import { ShieldCheck, ArrowRight, ArrowLeft, RotateCcw, ExternalLink } from 'lucide-react';

type Answers = {
  address: boolean | null;
  hours: boolean | null;
  travel: 'rarely' | 'sometimes' | 'often' | null;
  privacy: number | null;
  nonUS: boolean | null;
};

const INITIAL: Answers = { address: null, hours: null, travel: null, privacy: null, nonUS: null };

const QUESTIONS: {
  key: keyof Answers;
  title: string;
  sub: string;
}[] = [
  {
    key: 'address',
    title: 'Do you have a physical street address in the formation state?',
    sub: 'PO boxes don\'t count — the state needs a real street address where legal papers can be served.',
  },
  {
    key: 'hours',
    title: 'Can someone be at that address during business hours?',
    sub: 'Process servers show up 9–5 on weekdays. If nobody\'s there, you can miss a lawsuit.',
  },
  {
    key: 'nonUS',
    title: 'Are you a non-US resident forming a US LLC?',
    sub: 'Foreign founders almost always need a commercial registered agent — there\'s no DIY path.',
  },
];

export default function AgentQuiz() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(INITIAL);
  const [done, setDone] = useState(false);

  const set = (key: keyof Answers, val: Answers[keyof Answers]) => {
    setA((prev) => ({ ...prev, [key]: val }));
  };

  const verdict = useMemo(() => {
    if (!done) return null;
    const reasons: string[] = [];
    let hire = 0;

    if (a.nonUS) {
      hire += 3;
      reasons.push('Non-US founders can\'t serve as their own agent — you need a US street address.');
    }
    if (a.address === false) {
      hire += 2;
      reasons.push('No physical street address in the state = you legally can\'t be your own agent.');
    }
    if (a.hours === false) {
      hire += 2;
      reasons.push('Nobody available during business hours risks missing time-sensitive legal documents.');
    }
    if (a.travel === 'often') {
      hire += 1;
      reasons.push('Frequent travel means papers can sit unopened — a service scans and uploads same-day.');
    }
    if (a.travel === 'sometimes') {
      hire += 0.5;
      reasons.push('Some travel is manageable, but have a backup plan for urgent mail.');
    }
    if (a.privacy !== null && a.privacy <= 2) {
      hire += 1;
      reasons.push('Your registered agent\'s address goes on public record — a service keeps your home address off it.');
    }
    if (a.address && a.hours && a.travel === 'rarely' && (a.privacy ?? 3) >= 4 && !a.nonUS) {
      reasons.push('You have an address, you\'re around during the day, and you\'re fine with the public record — DIY is legal and free.');
    }

    const hireIt = hire >= 2;
    return { hireIt, reasons };
  }, [done, a]);

  const reset = () => {
    setA(INITIAL);
    setStep(0);
    setDone(false);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-bold text-white">Can I Be My Own Registered Agent?</h2>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">
        Services charge $125–$299/yr to be your registered agent. Sometimes that&apos;s worth it.
        Sometimes it&apos;s a tax on not knowing the rules. 60 seconds to find out which.
      </p>

      {!done ? (
        <div className="space-y-5">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-indigo-500' : 'bg-slate-700'}`}
              />
            ))}
          </div>

          {step < 3 && (
            <div className="space-y-4">
              <div>
                <p className="text-base font-bold text-white">{QUESTIONS[step].title}</p>
                <p className="text-xs text-slate-400 mt-1">{QUESTIONS[step].sub}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(['Yes', 'No'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      set(QUESTIONS[step].key, opt === 'Yes');
                      setStep(step + 1);
                    }}
                    className="px-4 py-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-sm font-semibold text-white hover:border-indigo-500/60 transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <p className="text-base font-bold text-white">How often do you travel?</p>
                <p className="text-xs text-slate-400 mt-1">Away from your registered address for days at a time.</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(['rarely', 'sometimes', 'often'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      set('travel', opt);
                      setStep(4);
                    }}
                    className="px-4 py-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-sm font-semibold text-white hover:border-indigo-500/60 transition-colors capitalize"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <p className="text-base font-bold text-white">
                  How comfortable are you with your home address on public record? (1–5)
                </p>
                <p className="text-xs text-slate-400 mt-1">1 = absolutely not, 5 = don&apos;t care.</p>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      set('privacy', n);
                      setDone(true);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-sm font-bold text-white hover:border-indigo-500/60 hover:bg-indigo-600/30 transition-colors"
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          )}
        </div>
      ) : (
        verdict && (
          <div className="space-y-4">
            <div
              className={`p-5 rounded-2xl border ${
                verdict.hireIt
                  ? 'bg-amber-950/30 border-amber-500/40'
                  : 'bg-emerald-950/30 border-emerald-500/40'
              }`}
            >
              <p className="text-lg font-black text-white">
                {verdict.hireIt ? 'Hire a service.' : 'Be your own agent — it\'s free.'}
              </p>
              <ul className="mt-3 space-y-2">
                {verdict.reasons.map((r, i) => (
                  <li key={i} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                    <ArrowRight className="w-4 h-4 shrink-0 mt-0.5 text-slate-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            {verdict.hireIt ? (
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-400 leading-relaxed">
                Typical cost: <strong className="text-white">$50–$300/yr (~$125 average).</strong>{' '}
                Never pay more than $300 — and beware &quot;free first year&quot; offers that renew
                at $299. When you&apos;re ready, compare providers on our homepage checker.
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-400 leading-relaxed">
                List yourself as registered agent on your Articles of Organization — it costs{' '}
                <strong className="text-white">$0 extra.</strong> Just make sure someone&apos;s at
                that address during business hours, and set a calendar reminder for your annual
                report with our{' '}
                <a href="/tools/compliance" className="text-indigo-300 hover:text-indigo-200 font-semibold">
                  compliance tracker
                </a>
                .
              </div>
            )}
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake the quiz
            </button>
          </div>
        )
      )}

      <p className="text-[11px] text-slate-500 leading-relaxed">
        Guidance only — rules vary by state and this isn&apos;t legal advice. When in doubt, check
        your Secretary of State&apos;s registered-agent requirements.
      </p>
    </div>
  );
}
