import Link from 'next/link';
import { Metadata } from 'next';
import {
  FileText,
  Building2,
  Users,
  Briefcase,
  Landmark,
  ScrollText,
  ArrowRight,
  Info,
  ExternalLink,
} from 'lucide-react';
import {
  AFFILIATE_LINKS,
  AFFILIATE_REL,
} from '@/lib/affiliates';

export const metadata: Metadata = {
  title: 'Business Forms Library | Brand Vault',
  description:
    'The basic paperwork you typically need to start an LLC, corporation, sole proprietorship, or partnership — Articles of Organization, Operating Agreements, EIN applications, and more.',
};

type FormEntry = {
  name: string;
  blurb: string;
  href?: string;
  affiliate?: boolean;
  free?: boolean;
};

type FormSection = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  accent: string;
  forms: FormEntry[];
};

const LAwDEPOT_HOME = 'https://www.lawdepot.com';
const IRS_EIN_URL =
  'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online';

const SECTIONS: FormSection[] = [
  {
    id: 'llc',
    icon: Building2,
    title: 'LLC (Limited Liability Company)',
    subtitle: 'The most popular structure for new founders. File in your state, then paper it up.',
    accent: 'text-indigo-400',
    forms: [
      {
        name: 'Articles of Organization',
        blurb:
          'The filing that officially creates your LLC with the state. Without this, there is no LLC — just an idea.',
        href: AFFILIATE_LINKS.lawdepot(),
        affiliate: true,
      },
      {
        name: 'LLC Operating Agreement',
        blurb:
          'Defines who owns what, how decisions get made, and what happens if a member leaves. Banks and investors ask for this.',
        href: AFFILIATE_LINKS.lawdepotOperatingAgreement(),
        affiliate: true,
      },
      {
        name: 'EIN Application (Form SS-4)',
        blurb:
          'Your business Social Security number — free from the IRS. You need it for taxes, a business bank account, and hiring.',
        href: IRS_EIN_URL,
        free: true,
      },
      {
        name: 'Registered Agent Consent',
        blurb:
          'Your registered agent (a person or service in your state) signs this to accept legal mail on your behalf. Your agent provides it.',
      },
      {
        name: 'Statement of Information / Annual Report',
        blurb:
          'Many states require a periodic filing to keep the LLC in good standing. Deadlines and fees vary by state.',
      },
      {
        name: 'Business License Application',
        blurb:
          'Filed with your city or county. Requirements range from a simple registration to industry-specific permits.',
      },
    ],
  },
  {
    id: 'corporation',
    icon: Landmark,
    title: 'Corporation (C-Corp / S-Corp)',
    subtitle: 'For founders planning to raise money or issue stock.',
    accent: 'text-purple-400',
    forms: [
      {
        name: 'Articles of Incorporation',
        blurb:
          'The state filing that creates the corporation — the C-Corp equivalent of Articles of Organization.',
        href: AFFILIATE_LINKS.lawdepotArticlesOfIncorporation(),
        affiliate: true,
      },
      {
        name: 'Corporate Bylaws',
        blurb:
          'The internal rulebook: how the board operates, how shares work, how meetings run.',
        href: LAwDEPOT_HOME,
      },
      {
        name: 'Initial Board Resolutions',
        blurb:
          'The first official decisions of the board — appointing officers, authorizing a bank account, issuing shares.',
        href: LAwDEPOT_HOME,
      },
      {
        name: 'EIN Application (Form SS-4)',
        blurb:
          'Required for every corporation. Free from the IRS, takes minutes online.',
        href: IRS_EIN_URL,
        free: true,
      },
    ],
  },
  {
    id: 'sole-prop',
    icon: Briefcase,
    title: 'Sole Proprietorship',
    subtitle: 'The simplest start — you and the business are the same legal entity.',
    accent: 'text-pink-400',
    forms: [
      {
        name: 'DBA / Fictitious Business Name',
        blurb:
          'Lets you operate under a business name instead of your personal name. Filed with your county or state.',
        href: LAwDEPOT_HOME,
      },
      {
        name: 'Business License Application',
        blurb:
          'Most cities require one even for a one-person operation. Check your city clerk.',
      },
      {
        name: 'EIN Application (optional)',
        blurb:
          'Not required for a sole prop with no employees, but handy if you want to keep your SSN off forms.',
        href: IRS_EIN_URL,
        free: true,
      },
    ],
  },
  {
    id: 'partnership',
    icon: Users,
    title: 'Partnership',
    subtitle: 'Two or more people building together — get the split in writing first.',
    accent: 'text-amber-400',
    forms: [
      {
        name: 'Partnership Agreement',
        blurb:
          'Who puts in what, who decides what, and how profits (and fights) get handled. Verbal agreements are where partnerships go to die.',
        href: LAwDEPOT_HOME,
      },
      {
        name: 'EIN Application (Form SS-4)',
        blurb: 'Partnerships need an EIN for taxes. Free from the IRS.',
        href: IRS_EIN_URL,
        free: true,
      },
      {
        name: 'DBA / Fictitious Business Name',
        blurb: 'If the partnership operates under a name other than the partners’ names.',
        href: LAwDEPOT_HOME,
      },
    ],
  },
];

function FormCard({ form }: { form: FormEntry }) {
  return (
    <div className="flex items-start justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
      <div className="space-y-1.5 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-bold text-white">{form.name}</h3>
          {form.free && (
            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Free
            </span>
          )}
          {form.affiliate && (
            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Get the form
            </span>
          )}
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{form.blurb}</p>
      </div>
      {form.href && (
        <a
          href={form.href}
          target="_blank"
          rel={form.affiliate ? AFFILIATE_REL : 'noopener noreferrer'}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
        >
          <span>{form.free ? 'IRS — Free' : 'Get it'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
}

export default function FormsPage() {
  return (
    <div className="min-h-screen py-12 px-4 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <ScrollText className="w-3.5 h-3.5" />
          <span>Forms Library</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          The Basic Forms to Start a Business
        </h1>
        <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
          Checked your name and it&apos;s available? Here&apos;s the paperwork that usually comes
          next — the standard forms founders file when starting an LLC, corporation, sole
          proprietorship, or partnership. Pick your structure below.
        </p>
        <div className="flex items-start gap-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-relaxed">
            Brand Vault isn&apos;t a law firm and this isn&apos;t legal advice — just the forms
            founders typically use. Requirements vary by state, so double-check your Secretary of
            State. A few links below are affiliate links, which keep the checker free at no extra
            cost to you.
          </p>
        </div>
      </div>

      {/* Sections */}
      {SECTIONS.map((section) => {
        const Icon = section.icon;
        return (
          <section key={section.id} className="space-y-5">
            <div className="flex items-center gap-3">
              <Icon className={`w-6 h-6 ${section.accent}`} />
              <div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
                <p className="text-xs text-slate-400">{section.subtitle}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.forms.map((form) => (
                <FormCard key={form.name} form={form} />
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-center space-y-4">
        <FileText className="w-8 h-8 text-indigo-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Haven&apos;t locked in a name yet?</h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Run your business name through the checker first — domain, social handles, and all 50
          states in one search.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          <span>Check a name</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
