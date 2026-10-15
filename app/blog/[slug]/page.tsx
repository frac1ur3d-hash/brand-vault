import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, Tag, MessagesSquare } from 'lucide-react';
import { BLOG_BRAND, getPost, getAllPosts } from '@/lib/blog-posts';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Not found | Brand Vault' };
  return {
    title: `${post.title} | ${BLOG_BRAND}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen py-12 px-4 max-w-3xl mx-auto space-y-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-indigo-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> All posts
      </Link>

      <article className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>{post.date}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readingMinutes} min read
            </span>
            <span className="inline-flex items-center gap-1">
              <Tag className="w-3 h-3" /> {post.tags.join(', ')}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">{post.excerpt}</p>
        </div>

        <div
          className="blog-body text-[15px] text-slate-300 leading-relaxed space-y-4
            [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
            [&_strong]:text-white [&_a]:text-indigo-400 [&_a]:underline [&_a]:underline-offset-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Discussion */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessagesSquare className="w-5 h-5 text-indigo-400" />
            <span>Got a take?</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Disagree with something? Building something yourself? On-site discussion opens soon —
            until then, the fastest way to reach us is the feedback box. Tell us how we suck; we
            read all of it.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            <span>Back to the name checker</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}
