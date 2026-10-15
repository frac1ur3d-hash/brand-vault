'use client';

import React, { useState } from 'react';
import { MessageSquareHeart, ThumbsUp, Meh, ThumbsDown, Send, CheckCircle2 } from 'lucide-react';

/**
 * On-site feedback widget — "did you like our site / tell us how we suck".
 *
 * BACKEND: Google Forms (free, no API key).
 * Setup for Kyle (2 minutes):
 *   1. Create a Google Form with these 3 questions (all short-answer/paragraph):
 *      Q1 "Did you like our site?" | Q2 "Any comments for us?" | Q3 "How can we do better?"
 *   2. Send Muse the form's URL (the .../viewform link).
 *   3. Muse fetches the form, extracts the entry IDs, and fills in the config below.
 *
 * Until formAction is set, this component renders nothing — no dead UI on the site.
 */
const FEEDBACK_CONFIG = {
  formAction: '',
  entryLiked: '',
  entryComments: '',
  entryImprove: '',
};

const RATINGS = [
  { value: 'yes', label: 'Yes', icon: ThumbsUp },
  { value: 'ok', label: "It's OK", icon: Meh },
  { value: 'no', label: 'No', icon: ThumbsDown },
];

export default function FeedbackWidget() {
  const [liked, setLiked] = useState<string | null>(null);
  const [comments, setComments] = useState('');
  const [improve, setImprove] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  if (!FEEDBACK_CONFIG.formAction) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!liked) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const body = new URLSearchParams();
      body.set(FEEDBACK_CONFIG.entryLiked, liked);
      body.set(FEEDBACK_CONFIG.entryComments, comments);
      body.set(FEEDBACK_CONFIG.entryImprove, improve);
      await fetch(FEEDBACK_CONFIG.formAction, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <section className="py-16 border-t border-slate-800/80">
        <div className="max-w-2xl mx-auto px-4">
          <div className="p-8 rounded-3xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h2 className="text-xl font-bold text-white">Thanks — we read all of it.</h2>
            <p className="text-sm text-slate-400">
              Every piece of feedback shapes what gets built next.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 border-t border-slate-800/80 bg-slate-900/20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="text-center space-y-2">
            <MessageSquareHeart className="w-8 h-8 text-indigo-400 mx-auto" />
            <h2 className="text-2xl font-bold text-white">How are we doing?</h2>
            <p className="text-sm text-slate-400">
              Quick one-tap rating, plus room to tell us how we suck.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white">Did you like our site?</label>
              <div className="flex gap-3">
                {RATINGS.map((r) => {
                  const Icon = r.icon;
                  const active = liked === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setLiked(r.value)}
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-indigo-500/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="fb-comments" className="text-sm font-semibold text-white">
                Want to leave us any comments?
              </label>
              <textarea
                id="fb-comments"
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Anything on your mind…"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="fb-improve" className="text-sm font-semibold text-white">
                Tell us how we suck — what could we do better, and how?
              </label>
              <textarea
                id="fb-improve"
                rows={3}
                value={improve}
                onChange={(e) => setImprove(e.target.value)}
                placeholder="Don't hold back. Specifics help the most."
                className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60"
              />
            </div>

            {status === 'error' && !liked && (
              <p className="text-xs text-rose-400">Tap one of the rating buttons first.</p>
            )}
            {status === 'error' && liked && (
              <p className="text-xs text-rose-400">Something went wrong — try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>{status === 'sending' ? 'Sending…' : 'Send feedback'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
