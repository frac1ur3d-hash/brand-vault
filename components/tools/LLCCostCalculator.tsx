'use client';

import React, { useMemo, useState } from 'react';
import { Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';
import statesData from '@/data/states.json';

type StateFee = {
  slug: string;
  name: string;
  filingFee: string;
  annualFee: string;
};

/** Extract the first dollar amount from a fee string like "$800 annual franchise tax + $20 ..." */
function parseFirstDollars(s: string): number {
  const m = s.replace(/,/g, '').match(/\$(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
}

function fmt(n: number): string {
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

// Typical formation-service bundle pricing (industry averages, clearly labeled as estimates)
const SERVICE_EIN = 79;
const SERVICE_OA = 99;
const SERVICE_AGENT_YR = 149;

export default function LLCCostCalculator() {
  const [slug, setSlug] = useState('wyoming');
  const [agentSelf, setAgentSelf] = useState(false);

  const state = useMemo(
    () => (statesData as StateFee[]).find((s) => s.slug === slug) ?? (statesData as StateFee[])[0],
    [slug]
  );

  const calc = useMemo(() => {
    const filing = parseFirstDollars(state.filingFee);
    const annual = parseFirstDollars(state.annualFee);
    const agentYr = agentSelf ? 0 : 125; // typical standalone RA service price

    const diyYear1 = filing + annual + agentYr;
    const diyYear3 = filing + annual * 3 + agentYr * 3;

    const svcYear1 = filing + SERVICE_EIN + SERVICE_OA + 0; // agent often "free" year 1
    const svcYear3 = filing + SERVICE_EIN + SERVICE_OA + SERVICE_AGENT_YR * 2 + annual * 3;

    return { filing, annual, agentYr, diyYear1, diyYear3, svcYear1, svcYear3 };
  }, [state, agentSelf]);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
      <div className="flex items-center gap-3">
        <Calculator className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-bold text-white">LLC True Cost Calculator</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="calc-state" className="text-sm font-semibold text-white">
            State
          </label>
          <select
            id="calc-state"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500/60"
          >
            {(statesData as StateFee[]).map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-500">
            Filing: {state.filingFee} · Ongoing: {state.annualFee}
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-semibold text-white">Registered agent</span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAgentSelf(false)}
              className={`flex-1 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
                !agentSelf
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-indigo-500/50'
              }`}
            >
              Hire a service (~$125/yr)
            </button>
            <button
              type="button"
              onClick={() => setAgentSelf(true)}
              className={`flex-1 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
                agentSelf
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-indigo-500/50'
              }`}
            >
              Myself ($0)
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Doing it yourself is legal in most states — but your address becomes public record.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DIY column */}
        <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white">Do it yourself</h3>
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-slate-300">
              <span>State filing fee</span>
              <span className="font-semibold text-white">{fmt(calc.filing)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>EIN (IRS, free)</span>
              <span className="font-semibold text-white">$0</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Operating agreement (our free forms)</span>
              <span className="font-semibold text-white">$0</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Registered agent (annual)</span>
              <span className="font-semibold text-white">
                {agentSelf ? '$0' : `~${fmt(calc.agentYr).slice(1)}/yr`}
              </span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>State ongoing fees (annualized)</span>
              <span className="font-semibold text-white">{fmt(calc.annual)}/yr</span>
            </div>
          </div>
          <div className="pt-3 border-t border-emerald-500/20 space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">Year 1 total</span>
              <span className="text-xl font-black text-emerald-300">{fmt(calc.diyYear1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">True 3-year cost</span>
              <span className="text-lg font-black text-emerald-300">{fmt(calc.diyYear3)}</span>
            </div>
          </div>
        </div>

        {/* Formation service column */}
        <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="font-bold text-white">Typical "$0" formation service</h3>
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-slate-300">
              <span>State filing fee</span>
              <span className="font-semibold text-white">{fmt(calc.filing)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>EIN filing add-on</span>
              <span className="font-semibold text-white">~${SERVICE_EIN}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Operating agreement add-on</span>
              <span className="font-semibold text-white">~${SERVICE_OA}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Registered agent (free yr 1, then ~${SERVICE_AGENT_YR}/yr)</span>
              <span className="font-semibold text-white">~${SERVICE_AGENT_YR * 2} over 3 yrs</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>State ongoing fees (annualized)</span>
              <span className="font-semibold text-white">{fmt(calc.annual)}/yr</span>
            </div>
          </div>
          <div className="pt-3 border-t border-rose-500/20 space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">Year 1 total</span>
              <span className="text-xl font-black text-rose-300">{fmt(calc.svcYear1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-400">True 3-year cost</span>
              <span className="text-lg font-black text-rose-300">{fmt(calc.svcYear3)}</span>
            </div>
          </div>
        </div>
      </div>

      {calc.svcYear3 > calc.diyYear3 && (
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-center">
          <p className="text-sm text-slate-200">
            Doing it yourself in {state.name} saves roughly{' '}
            <strong className="text-white">{fmt(calc.svcYear3 - calc.diyYear3)}</strong> over 3
            years versus the typical formation-service bundle.
          </p>
        </div>
      )}

      <p className="text-[11px] text-slate-500 leading-relaxed">
        Estimates only — state fees change, and service bundles vary. Service add-on prices are
        industry-typical averages, not quotes. Always verify against your Secretary of State
        before filing.
      </p>
    </div>
  );
}
