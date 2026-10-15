'use client';

import React, { useState } from 'react';
import { FileText, Users, User, ChevronDown } from 'lucide-react';

type Clause = {
  title: string;
  plain: string;
  regret: string;
  multiOnly?: boolean;
};

const CLAUSES: Clause[] = [
  {
    title: 'Formation & name',
    plain:
      'States the LLC\'s legal name, the state where it was formed, and the date. This is the clause that ties the document to your actual state filing.',
    regret: 'A mismatch between this and your Articles of Organization can stall a bank account opening.',
  },
  {
    title: 'Members & ownership',
    plain:
      'Lists every owner (member) and what percentage each owns. Single-member: it\'s 100% you. Multi-member: the percentages must add up to 100.',
    regret: 'Verbal "we\'re 50/50" agreements are worthless in a dispute. This page is the proof.',
  },
  {
    title: 'Capital contributions',
    plain:
      'What each member put in to start the business — cash, equipment, or work. It establishes who paid for what on day one.',
    regret: 'Without it, a member who contributed $20k and a member who contributed $0 look identical later.',
  },
  {
    title: 'Profit & loss distribution',
    plain:
      'How money gets split. Defaults to ownership percentage, but you can set any split you agree on.',
    regret: 'The #1 source of co-founder fights. Decide this while you still like each other.',
    multiOnly: true,
  },
  {
    title: 'Management & voting',
    plain:
      'Who makes decisions: all members together (member-managed, the default) or designated managers (manager-managed). Defines what needs a unanimous vote vs. a majority.',
    regret: 'Without this, any member can arguably bind the whole company to a contract.',
    multiOnly: true,
  },
  {
    title: 'Member exit & buyout',
    plain:
      'What happens when someone wants out, dies, or gets divorced. Sets how their share is valued and who gets first right to buy it.',
    regret: 'No buyout clause means negotiating with someone\'s ex-spouse over your business.',
    multiOnly: true,
  },
  {
    title: 'Transfer restrictions',
    plain:
      'Stops a member from selling their share to a stranger without approval. Keeps control inside the group you chose.',
    regret: 'Without it, your co-founder can sell half your company to anyone.',
    multiOnly: true,
  },
  {
    title: 'Indemnification',
    plain:
      'The LLC covers members for legal costs from actions taken in good faith on the company\'s behalf. It does not cover fraud or intentional harm.',
    regret: 'Skipping this leaves members personally exposed for doing their job.',
  },
  {
    title: 'Dissolution',
    plain:
      'How the LLC winds down: who decides, how debts get paid first, and how leftover assets are distributed.',
    regret: 'Closing without a process is how personal liability sneaks back in at the finish line.',
  },
  {
    title: 'Signatures',
    plain:
      'Every member signs and dates. An unsigned operating agreement is a draft, not a document — banks and courts treat it accordingly.',
    regret: 'The most common reason an OA "doesn\'t count" when it matters.',
  },
];

export default function OAExplainer() {
  const [multi, setMulti] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  const clauses = CLAUSES.filter((c) => !c.multiOnly || multi);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-bold text-white">Operating Agreement, in Plain English</h2>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">
        Formation services charge $35–$149 for this document. The paper is free — what you actually
        need is to understand what you&apos;re signing. Clause by clause, no legalese.
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setMulti(false)}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
            !multi
              ? 'bg-indigo-600 border-indigo-500 text-white'
              : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-indigo-500/50'
          }`}
        >
          <User className="w-4 h-4" /> Single-member
        </button>
        <button
          type="button"
          onClick={() => setMulti(true)}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
            multi
              ? 'bg-indigo-600 border-indigo-500 text-white'
              : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-indigo-500/50'
          }`}
        >
          <Users className="w-4 h-4" /> Multi-member
        </button>
      </div>

      <div className="space-y-2">
        {clauses.map((c, i) => {
          const isOpen = open === i;
          return (
            <div key={c.title} className="rounded-2xl bg-slate-800/50 border border-slate-700/60 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-bold text-white">
                  {i + 1}. {c.title}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 space-y-3">
                  <p className="text-sm text-slate-300 leading-relaxed">{c.plain}</p>
                  <p className="text-xs text-amber-200/90 leading-relaxed border-l-2 border-amber-500/50 pl-3">
                    <strong>Why founders skip it and regret it:</strong> {c.regret}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed">
        Educational walkthrough, not legal advice and not a document generator. Grab a free
        operating agreement template from our Forms Library, then come back here to understand
        every clause before you sign.
      </p>
    </div>
  );
}
