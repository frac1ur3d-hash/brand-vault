/**
 * Blog content for the "From the Ground Up" blog on Brand Vault.
 *
 * BLOG_BRAND is the blog's name — set once Kyle picks it.
 * To add a post: append an entry to POSTS with a unique slug.
 * Content is HTML strings (our own writing, no untrusted input).
 */

export const BLOG_BRAND = 'The Shit Nobody Tells You';
export const BLOG_TAGLINE = 'The honest truth about starting a business. No gurus, no gatekeeping.';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingMinutes: number;
  content: string;
};

export const POSTS: BlogPost[] = [
  {
    slug: 'from-the-ground-up-manifesto',
    title: 'From the Ground Up: The Free Business Toolkit Nobody Else Will Build',
    date: '2026-10-15',
    excerpt:
      'Every big formation site paywalls, upsells, or dark-patterns you. We looked at all of them — here is what we are building instead, and why it is free.',
    tags: ['manifesto', 'starting up'],
    readingMinutes: 5,
    content: `
<p>We spent a week going through every major business-formation site — Tailor Brands, ZenBusiness, LegalZoom, Bizee, Northwest, the whole lineup. Here is the pattern:</p>
<ul>
<li><strong>The name check is bait.</strong> Most of them only let you search a business name <em>inside</em> a paid checkout flow. The free checkers (Namechk and friends) do not check state LLC registries or trademarks, and they leave you hanging with no next step.</li>
<li><strong>The forms are paywalled.</strong> An operating agreement — a document every LLC should have — costs $29 as an add-on here, $99 there, or sits behind a $249–$299/year plan somewhere else.</li>
<li><strong>The checkout is a minefield.</strong> Pre-selected free trials, auto-renewing compliance plans at $199/year, registered agent renewals at $249/year, signups that require a sales call.</li>
</ul>
<p>So here is the bet behind this blog and this site: <strong>the honest, free version wins.</strong> Free name check across domains, social handles, all 50 states, and trademarks — no signup. Free forms library with plain-English explanations. No pre-selected anything, no sales calls, no gotchas.</p>
<p>How does that make money? The same way this whole site works: when you do decide to form the LLC or grab the domain, some of those links pay us a commission. It costs you nothing extra. That is the entire business model, stated plainly, because the industry we are competing with would never state theirs.</p>
<p>This blog is the build log. What is hot, what is not, what things actually cost, what the fine print says — documented live, from the ground up.</p>
`,
  },
  {
    slug: 'llc-cost-by-state-2026',
    title: 'What It Actually Costs to Form an LLC in Every State (2026)',
    date: '2026-10-15',
    excerpt:
      'Wyoming: $100. California: $800 a year, every year. The state you file in changes the math completely — here are the real numbers.',
    tags: ['llc', 'costs', 'guide'],
    readingMinutes: 6,
    content: `
<p>The filing fee is the first number everyone Googles and the first number most sites bury under an upsell. Here are the straight numbers for the states founders ask about most:</p>
<ul>
<li><strong>Wyoming — $100.</strong> The founder favorite: cheap filing, no state income tax, strong privacy.</li>
<li><strong>Delaware — $110.</strong> The startup standard if you plan to raise money; everyone else can usually skip it.</li>
<li><strong>Florida — $125.</strong> Straightforward, no state income tax.</li>
<li><strong>Texas — $300.</strong> Higher upfront, no state income tax, big market.</li>
<li><strong>Nevada — $425.</strong> Privacy reputation, but you pay for it.</li>
<li><strong>California — $70 to file, then $800/year minimum franchise tax.</strong> Every year. This is the number that ruins budgets.</li>
<li><strong>Oregon — $100.</strong> Where this site was born. Simple filing, reasonable ongoing costs.</li>
</ul>
<p>But the filing fee is not the total. Budget for these too:</p>
<ul>
<li><strong>Registered agent</strong> — required in every state. $0–$300/year depending on whether you do it yourself (your address becomes public) or hire a service.</li>
<li><strong>Operating agreement</strong> — technically optional in most states, practically mandatory. Banks ask for it. Ours is in the <a href="/forms">free forms library</a>.</li>
<li><strong>EIN</strong> — free from the IRS. Anyone charging you for one is selling you air.</li>
<li><strong>Annual reports / statements of information</strong> — most states want a periodic filing with a fee. Miss it and your LLC goes delinquent.</li>
<li><strong>Business licenses</strong> — city and county level, varies wildly.</li>
</ul>
<p>Rule of thumb: a single-member LLC in a normal state runs roughly <strong>$100–$300 to start</strong> plus the registered agent decision. Anyone quoting you $500+ before state fees is selling you a bundle you did not ask for.</p>
<p><em>Fees change — verify against your Secretary of State before filing. We keep our state guides current; the state website is the final word.</em></p>
`,
  },
  {
    slug: 'rags-to-riches-is-dead',
    title: 'Rags to Riches Is a Lottery Ticket. Build From the Ground Up Instead.',
    date: '2026-10-14',
    excerpt:
      'The come-up story everyone sells is survivorship bias. The real version is slower, cheaper, and documented — here is what it actually looks like.',
    tags: ['mindset', 'the come-up'],
    readingMinutes: 4,
    content: `
<p>The internet's favorite business story goes like this: broke nobody has an idea, montage happens, private jet. What they skip is the part where 99% of the montages end with the credit card bill.</p>
<p>Here is the version nobody posts: I am building this site, two books, and a game with $0, documenting all of it live. Some days the win is shipping a forms page. Some days the win is just not quitting. There is no montage. There is a checklist.</p>
<p>That is what "from the ground up" means here:</p>
<ul>
<li><strong>Free before paid.</strong> Every tool on this site is free. The money comes after the value, not before it.</li>
<li><strong>Boring beats brilliant.</strong> File the LLC. Write the operating agreement. Get the EIN. None of it is exciting. All of it is the business.</li>
<li><strong>Document, don't perform.</strong> Real numbers, real costs, real mistakes — that is what this blog is for.</li>
<li><strong>Cheap is a strategy.</strong> Wyoming over Delaware when Delaware does nothing for you. Free EIN over a $75 filing service. Every dollar you do not spend is a dollar of runway.</li>
</ul>
<p>Rags to riches is a lottery ticket with better lighting. Rags to <em>something real</em> is a checklist, a calendar, and the discipline to do the unsexy paperwork. Start with the <a href="/forms">forms</a>. Check the <a href="/">name</a>. Then do the next thing.</p>
`,
  },
  {
    slug: 'vibe-coded-incorporate-first',
    title: 'Vibe-Coded It? Incorporate Before You Fundraise.',
    date: '2026-10-15',
    excerpt:
      'AI built your MVP in a weekend. But until you form the company, the IP belongs to you personally — and investors are now catching that in diligence.',
    tags: ['startups', 'llc', 'vibe coding'],
    readingMinutes: 5,
    content: `
<p>Vibe coding — building software by prompting instead of programming — is now the default way non-technical founders ship. Collins named it Word of the Year. The idea-to-working-product cycle went from months to days.</p>
<p>Then October 13th brought the reckoning. Accountants started warning publicly: founders are shipping investable-looking products in weeks while the company behind them has no vesting agreements, murky IP ownership, and no financial records. Investors are finding it in diligence — and walking.</p>
<p>Here is the costly mistake almost everyone makes: <strong>incorporating too late.</strong> Everything you build before the company exists belongs to <em>you personally</em>, not the company. When you finally form the LLC or corporation, that IP has to be formally assigned over — and if a co-founder, contractor, or early helper touched the code, the ownership chain gets messy fast.</p>
<p>The fix is boring and cheap:</p>
<ul>
<li><strong>Form the entity first</strong> — before the product has value, before the pitch deck. A Wyoming or home-state LLC costs ~$100.</li>
<li><strong>Assign the IP in writing</strong> — a simple IP assignment from you (and anyone who helped) to the company. It is in our <a href="/forms">free forms library</a>.</li>
<li><strong>Open the business bank account</strong> — with the EIN (free from the IRS), so money and code live inside the company from day one.</li>
<li><strong>Paper the founders</strong> — operating agreement with vesting, even if it is just you. Future-you will thank present-you.</li>
</ul>
<p>Speed is the whole point of vibe coding. Do not let the paperwork be the thing that kills the deal six months later. <a href="/">Check the name</a>, file the entity, then get back to prompting.</p>
`,
  },
  {
    slug: 'fintech-hot-october-2026',
    title: "What's Hot in Fintech Right Now (October 2026)",
    date: '2026-10-15',
    excerpt:
      'Stablecoins got boring — that is the bull case. AI agents trade stocks for retail, WhatsApp is becoming a bank, and the middlemen are getting squeezed.',
    tags: ['fintech', 'trends'],
    readingMinutes: 6,
    content: `
<p>The heat in fintech right now is not where the headlines were two years ago. It is in the plumbing.</p>
<p><strong>Stablecoins went "boring" — and that is the bull case.</strong> Circulation is past $300B and the growth moved from token speculation to settlement infrastructure: a 21-bank consortium (Goldman, BofA, Citi and 18 more) is launching a joint dollar stablecoin, Visa and Circle backed a $48M round for the payments platform Velocity, and Miami's Jeeves raised $110M to run corporate banking on stablecoin rails — payouts to 190 countries, volume up 4x in 14 months. The driver: the GENIUS Act (US stablecoin law) is hitting implementation, with final rules due in November. Regulatory clarity unlocked the institutional money.</p>
<p><strong>AI agents trade for retail now.</strong> Robinhood's September summit launched in-app AI trading agents that analyze markets and execute trades, plus weekend equity trading coming early next year. 150,000+ agentic accounts opened since the soft launch; the agents hit Robinhood's platform ~30M times a day. This is the consumer face of the agent wave — and 37% of heavy AI users already rely on AI as their main money-management tool.</p>
<p><strong>WhatsApp is becoming a bank.</strong> Felix raised $200M for remittances sent directly through WhatsApp ($8B+ processed); Razorpay launched an AI account manager for 10,000+ businesses inside WhatsApp. In emerging markets, the messaging app is the operating system for money — no app download, no branch.</p>
<p><strong>Cooling: commission-funded middlemen.</strong> India's Policybazaar parent crashed 36% in a single session after regulators proposed hard caps on insurance distribution commissions. The 2023 deregulation that fueled commission-led growth is reversing. The pattern across everything cooling right now: middlemen getting squeezed.</p>
<p>The cross-cutting bet: <strong>agentic infrastructure</strong> — stablecoin rails, agents inside workflows, expert data feeding the models. The money is in the plumbing, not the chatbots.</p>
`,
  },
  {
    slug: 'gig-work-pay-ranked-2026',
    title: "Gig Work Pay, Ranked: What's Actually Paying in 2026",
    date: '2026-10-15',
    excerpt:
      'Medical couriers and Walmart Spark top the net-pay leaderboard. Food delivery collapsed to 7th. And AI training gigs are the new remote floor.',
    tags: ['gig work', 'trends'],
    readingMinutes: 5,
    content: `
<p>Forget the platform marketing — here is 2026 ranked by <em>net</em> hourly pay, after expenses, per worker-tracked data:</p>
<ul>
<li><strong>#1 — Medical/lab couriers</strong> (Dropoff, Roadie Medical): $24–32/hr. Specimens do not complain and the routes are consistent.</li>
<li><strong>#2 — Walmart Spark:</strong> $22–32/hr, with peak suburban earners hitting $30–40+/hr. Their tier system rewards high performers with priority orders.</li>
<li><strong>#3 — Amazon Flex:</strong> $22–28/hr. Packages over people.</li>
</ul>
<p>The standard strategy now is <strong>multi-apping</strong> — DoorDash + Uber Eats, Spark + Instacart — to kill idle time between orders. Nobody serious runs one app anymore.</p>
<p><strong>The new remote floor: AI training gigs.</strong> Snorkel AI just raised $350M at a $3.5B valuation to build what the industry calls "Data 2.0" — expert humans building tasks and rubrics for AI agents, not clickwork labeling. That is the top end. The accessible floor: AI data reviewer roles (~$10/hr), DoorDash's own "Tasks" program, paid AI research missions. It pays better than surveys ($4–6/hr) and needs no car.</p>
<p><strong>The side hustle to watch: clipping.</strong> Cutting podcasts and streams into viral shorts, paid per view — $0.50 to $25 CPM depending on niche, finance and tech paying best. Platforms like Whop and MrBeast's Vyro turned it into a real pipeline; top clippers pull $500–$1,500/month retainers. The catch: view-based pay, no floor, algorithmic risk.</p>
<p><strong>Cooling: food delivery.</strong> DoorDash and Uber Eats rank 7th and 8th for solo drivers at $13–20/hr net. Drivers are calling the offers "brutal" and quitting for in-store audit apps and AI tasks. Delivery is not dead — but as a default first gig, its pay rank collapsed.</p>
<p>Bottom line: the money moved from <em>moving food</em> to <em>moving anything else</em> — and to training the machines.</p>
`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}
