'use client';

import React, { useState } from 'react';
import { BadgeCheck, ShieldAlert, ArrowRight, ArrowLeft, RotateCcw, ExternalLink } from 'lucide-react';

type Step = 'start' | 'ssn' | 'nossn' | 'scam';

const ONLINE_STEPS = [
  {
    title: 'Check the hours',
    body: 'The IRS online EIN tool only runs Monday–Friday, 7:00 AM–10:00 PM Eastern. Outside those hours the site just refuses. Plan for it.',
  },
  {
    title: 'Start the application',
    body: 'Go to the IRS EIN Assistant and choose "Limited Liability Company (LLC)" as your entity type. The whole thing takes about 10 minutes.',
  },
  {
    title: 'Name your responsible party',
    body: 'The "responsible party" is the person who controls the business — usually you. You need their SSN (or ITIN) and the business start date. This is the #1 rejection point: the name must match IRS records exactly.',
  },
  {
    title: 'Answer the business questions',
    body: 'The IRS asks what the LLC does, when it started, and whether it will hire employees. Answer plainly — there are no trick questions, and nothing here locks in your taxes.',
  },
  {
    title: 'Get your EIN instantly',
    body: 'Submit and the IRS issues your EIN on screen immediately. Save the confirmation letter (CP 575) as a PDF — banks ask for it when you open a business account.',
  },
];

const FAX_STEPS = [
  {
    title: 'Get Form SS-4',
    body: 'Without an SSN or ITIN you cannot use the online tool. Download IRS Form SS-4 (Application for Employer Identification Number) instead.',
  },
  {
    title: 'Fill it out for a foreign applicant',
    body: 'On line 7b leave the SSN/ITIN blank and write "Foreign" if you have neither. The responsible party rules still apply — name the person who controls the LLC.',
  },
  {
    title: 'Fax it to the IRS',
    body: 'Fax the completed SS-4 to the IRS Cincinnati office. Processing takes about 4–6 weeks. There is no online shortcut for this path — anyone selling you one is lying.',
  },
];

export default function EINWalkthrough() {
  const [step, setStep] = useState<Step>('start');
  const [price, setPrice] = useState('');
  const [verdict, setVerdict] = useState<null | { bad: boolean; msg: string }>(null);

  const checkPrice = () => {
    const n = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (isNaN(n)) {
      setVerdict({ bad: false, msg: 'Enter a dollar amount to check it.' });
      return;
    }
    if (n <= 0) {
      setVerdict({
        bad: false,
        msg: 'Free is correct. The EIN itself always costs $0 from the IRS.',
      });
    } else {
      setVerdict({
        bad: true,
        msg: `Red flag. The EIN itself is FREE from the IRS — a $${n} charge is pure markup for filling out a 10-minute form. Do it yourself with the walkthrough above.`,
      });
    }
  };

  const reset = () => {
    setStep('start');
    setVerdict(null);
    setPrice('');
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
      <div className="flex items-center gap-3">
        <BadgeCheck className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-bold text-white">EIN Walkthrough + Fee-Scam Checker</h2>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">
        Formation services charge $50–$99 to file your EIN. The IRS gives the number away free.
        Here&apos;s the whole process, plus a checker for anyone trying to charge you.
      </p>

      {step === 'start' && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Do you have a Social Security Number?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setStep('ssn')}
              className="p-5 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-left transition-colors"
            >
              <p className="font-bold text-white">Yes — I have an SSN</p>
              <p className="text-xs text-slate-400 mt-1">10-minute online application, EIN issued instantly.</p>
            </button>
            <button
              type="button"
              onClick={() => setStep('nossn')}
              className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 hover:border-indigo-500/50 text-left transition-colors"
            >
              <p className="font-bold text-white">No SSN / foreign founder</p>
              <p className="text-xs text-slate-400 mt-1">SS-4 by fax — slower, but still free.</p>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setStep('scam')}
            className="inline-flex items-center gap-2 text-sm text-rose-300 hover:text-rose-200 font-semibold"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Someone&apos;s charging me for an EIN — check the price</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {(step === 'ssn' || step === 'nossn') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">
              {step === 'ssn' ? 'IRS online path (with SSN)' : 'SS-4 fax path (no SSN)'}
            </h3>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Start over
            </button>
          </div>
          <ol className="space-y-3">
            {(step === 'ssn' ? ONLINE_STEPS : FAX_STEPS).map((s, i) => (
              <li key={i} className="flex gap-3 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60">
                <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{s.title}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            <span>Open the official IRS EIN application</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-[11px] text-slate-500">
            Never enter your SSN anywhere except irs.gov. No legitimate service needs it in chat,
            email, or a random form.
          </p>
        </div>
      )}

      {step === 'scam' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">EIN fee-scam checker</h3>
            <button
              type="button"
              onClick={() => setStep('start')}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>
          <p className="text-sm text-slate-400">
            What is the site charging you for &quot;EIN filing&quot;?
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$79"
              className="flex-1 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500/60"
            />
            <button
              type="button"
              onClick={checkPrice}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              Check
            </button>
          </div>
          {verdict && (
            <div
              className={`p-4 rounded-2xl border text-sm leading-relaxed ${
                verdict.bad
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-100'
                  : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
              }`}
            >
              {verdict.msg}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
