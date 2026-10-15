'use client';

import React, { useMemo, useState } from 'react';
import { BellRing, ExternalLink, CalendarPlus, AlertTriangle, CheckCircle2 } from 'lucide-react';
import deadlines from '@/data/compliance-deadlines.json';

type Deadline = {
  slug: string;
  reportName: string;
  dueRule: string;
  fee: string;
  latePenalty: string;
  filingUrl: string;
  notes: string;
};

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

function monthDayFromRule(rule: string): { month: number; day: number } | null {
  const m = rule.match(
    /(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})/i
  );
  if (!m) return null;
  return { month: MONTHS[m[1].toLowerCase()], day: Math.min(parseInt(m[2], 10), 28) };
}

function nextDueDate(d: Deadline, formationISO: string): { date: Date; confident: boolean } | null {
  const rule = d.dueRule;
  if (/no annual report|not required|N\/A/i.test(d.reportName) || /^n\/a/i.test(rule)) return null;

  const now = new Date();
  const isBiennial = /biennial|every two years/i.test(rule);
  const isAnniversary = /anniversary/i.test(rule);
  const interval = isBiennial ? 2 : 1;

  let month: number, day: number;
  if (isAnniversary && formationISO) {
    const f = new Date(formationISO + 'T12:00:00');
    if (isNaN(f.getTime())) return { date: new Date(NaN), confident: false };
    month = f.getMonth();
    day = Math.min(f.getDate(), 28);
  } else {
    const md = monthDayFromRule(rule);
    if (!md) return { date: new Date(NaN), confident: false };
    month = md.month;
    day = md.day;
  }

  let year = now.getFullYear();
  let candidate = new Date(year, month, day);
  if (candidate <= now) {
    year += interval;
    candidate = new Date(year, month, day);
  }
  return { date: candidate, confident: true };
}

function fmtDate(dt: Date): string {
  return dt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function downloadICS(title: string, date: Date, description: string) {
  const pad = (n: number) => String(n).padStart(2, '0');
  const stamp = (dt: Date) =>
    `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T090000`;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Brand Vault//Compliance Tracker//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@aetherdynamics.net`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(date)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    'BEGIN:VALARM',
    'TRIGGER:-P30D',
    'ACTION:DISPLAY',
    `DESCRIPTION:30 days until ${title}`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-P7D',
    'ACTION:DISPLAY',
    `DESCRIPTION:7 days until ${title}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'llc-compliance-reminder.ics';
  a.click();
  URL.revokeObjectURL(url);
}

export default function ComplianceTracker() {
  const [slug, setSlug] = useState('oregon');
  const [formation, setFormation] = useState('');

  const data = useMemo(
    () => (deadlines as Deadline[]).find((d) => d.slug === slug) ?? (deadlines as Deadline[])[0],
    [slug]
  );

  const due = useMemo(() => nextDueDate(data, formation), [data, formation]);
  const noReport = due === null;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
      <div className="flex items-center gap-3">
        <BellRing className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-bold text-white">Compliance Deadline Tracker</h2>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">
        ZenBusiness charges $199/yr for &quot;Worry-Free Compliance&quot; — deadline tracking and
        reminders. Here&apos;s the same thing, free, no signup. Pick your state, get your deadlines,
        add them to your calendar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="ct-state" className="text-sm font-semibold text-white">
            State
          </label>
          <select
            id="ct-state"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500/60"
          >
            {(deadlines as Deadline[]).map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="ct-formation" className="text-sm font-semibold text-white">
            Formation date <span className="text-slate-500 font-normal">(for anniversary states)</span>
          </label>
          <input
            id="ct-formation"
            type="date"
            value={formation}
            onChange={(e) => setFormation(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500/60"
          />
        </div>
      </div>

      {noReport ? (
        <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-white">{data.reportName}</p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{data.dueRule}</p>
            {data.notes && <p className="text-xs text-slate-500 mt-2 leading-relaxed">{data.notes}</p>}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-indigo-300 font-semibold">
                  {data.reportName}
                </p>
                {due && !isNaN(due.date.getTime()) ? (
                  <p className="text-2xl font-black text-white mt-1">{fmtDate(due.date)}</p>
                ) : (
                  <p className="text-lg font-bold text-white mt-1">See rule below</p>
                )}
                <p className="text-xs text-slate-400 mt-1">Next due date{due && !due.confident ? ' (estimated — verify against the rule)' : ''}</p>
              </div>
              {due && !isNaN(due.date.getTime()) && (
                <button
                  type="button"
                  onClick={() =>
                    downloadICS(
                      `${data.reportName} due`,
                      due.date,
                      `Fee: ${data.fee}. File at: ${data.filingUrl}`
                    )
                  }
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition-colors"
                >
                  <CalendarPlus className="w-4 h-4" />
                  Add to calendar
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/60">
                <p className="font-semibold text-slate-300">Due rule</p>
                <p className="text-slate-400 mt-1 leading-relaxed">{data.dueRule}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60">
                <p className="font-semibold text-slate-300">Filing fee</p>
                <p className="text-slate-400 mt-1 leading-relaxed">{data.fee}</p>
              </div>
            </div>
            <a
              href={data.filingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
            >
              <span>File with the state</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white">What happens if you miss it</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{data.latePenalty}</p>
              {data.notes && (
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{data.notes}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <p className="text-[11px] text-slate-500 leading-relaxed">
        Deadlines verified against Secretary of State sources in October 2026. Rules change —
        always confirm against your state&apos;s filing office before a deadline. This is a
        reminder tool, not legal advice.
      </p>
    </div>
  );
}
