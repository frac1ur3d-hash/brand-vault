import Link from 'next/link';
import { Metadata } from 'next';
import { Newspaper, ArrowRight, Clock, Tag } from 'lucide-react';
import { BLOG_BRAND, BLOG_TAGLINE, getAllPosts } from '@/lib/blog-posts';

export const metadata: Metadata = {
  title: `${BLOG_BRAND} — From the Ground Up | Brand Vault`,
  description:
    'Building a real business from nothing: what is hot, what is not, what things cost, and what the fine print says. Documented live.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <div className="min-h-screen py-12 px-4 max-w-4xl mx-auto space-y-10">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Newspaper className="w-3.5 h-3.5" />
          <span>The Blog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {BLOG_BRAND}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed max-w-2xl">{BLOG_TAGLINE}</p>
      </div>

      <div className="space-y-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-colors group"
          >
            <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2">
              <span>{post.date}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readingMinutes} min
              </span>
              <span className="inline-flex items-center gap-1">
                <Tag className="w-3 h-3" /> {post.tags.join(', ')}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">{post.excerpt}</p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-indigo-400">
              Read it <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
        <p className="text-sm text-slate-300">
          New posts drop as the research lands — fintech heat checks, gig-work pay reports, and
          the unsexy paperwork, explained.
        </p>
      </div>
    </div>
  );
}
