import { Metadata } from 'next';
import { Sprout, Home, Briefcase, Recycle, Users, Equal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'KnottyRoot Initiative | Housing That Ends Homelessness',
  description:
    'KnottyRoot Initiative funds what reduces homelessness — not what sustains it. Permanent housing, resident-run jobs, and a self-sustaining model.',
};

const pillars = [
  {
    icon: Home,
    title: 'Permanent housing. No kickouts.',
    body: 'A home you can’t get kicked out of. Not a pod with a clock — an actual address, with a lease, for as long as you need it.',
  },
  {
    icon: Briefcase,
    title: 'Jobs you can do with your dog.',
    body: 'Real work residents are able and motivated to do — cleaning, maintenance, and upkeep at the place they live, plus work in the neighborhoods around it — with your best friend right beside you.',
  },
  {
    icon: Users,
    title: 'Residents run the building.',
    body: 'House cleaners come through 3x a week, just like a motel — and the cleaners are residents. Same with maintenance. No outside org. Higher access is earned by putting in the work.',
  },
  {
    icon: Sprout,
    title: 'In-house classes, real jobs.',
    body: 'When you’re ready to move up in the world, we teach the classes for the job you want — you get certified, you get the job, and you keep living there. The ladder is inside the building.',
  },
  {
    icon: Recycle,
    title: 'Self-sustaining and green.',
    body: 'After initial capital, the model sustains itself and reinvests back into itself. Fully green operations. Money that works instead of money that burns.',
  },
  {
    icon: Equal,
    title: 'Rule 1: no power tripping.',
    body: 'Everyone is equal. The people who’ve lived it make the decisions — not a boardroom that never has.',
  },
];

export default function KnottyRootPage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-3xl mx-auto space-y-12">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sprout className="w-3.5 h-3.5" />
          <span>KnottyRoot Initiative</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          We fund what reduces homelessness
          <span className="text-emerald-400"> — not what sustains it.</span>
        </h1>
        <p className="text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Portland spends roughly <strong className="text-white">$35,000 a year</strong> per person
          on temporary pod shelter — and people still end up back on the street. Finland houses
          people in real apartments with support for about{' '}
          <strong className="text-white">$16,000 a year</strong> — and it works. The math isn’t
          complicated. The system just isn’t built to solve the problem.
        </p>
        <p className="text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          KnottyRoot Initiative is the nonprofit that manages the property that gets people
          off the streets — permanently. It’s being built by someone who’s lived inside the
          old system for three years, to replace it with something that actually works.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
        <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
          Why this exists
        </p>
        <blockquote className="text-xl text-white leading-relaxed font-medium">
          “Without community, what do you got? A bunch of homeless folks dying from fetty ODs
          while neighbors are too scared to go out and help because nobody ever taught them
          how.”
        </blockquote>
        <p className="text-sm text-slate-400 leading-relaxed">
          KnottyRoot is being built by someone who has lived inside the homelessness system for
          three years — and watched it spend $35,000 a year per person to keep people homeless.
          This is the replacement: permanent housing, real jobs, and a community strong enough
          that nobody dies alone on the sidewalk.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2"
          >
            <div className="flex items-center gap-2">
              <p.icon className="w-5 h-5 text-emerald-400" />
              <h2 className="font-bold text-white text-sm">{p.title}</h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center space-y-3">
        <p className="text-sm text-slate-300 leading-relaxed">
          KnottyRoot Initiative is now forming. We’re pursuing fiscal sponsorship so donations
          can be tax-deductible from day one — then filing as an independent 501(c)(3) to
          acquire and manage our first property.
        </p>
        <p className="text-sm text-slate-400">
          Want to help build it?{' '}
          <a
            href="mailto:frac1ur3d@proton.me?subject=KnottyRoot%20Initiative"
            className="text-emerald-400 font-semibold hover:text-emerald-300"
          >
            Get in touch
          </a>
          .
        </p>
      </div>
    </div>
  );
}
