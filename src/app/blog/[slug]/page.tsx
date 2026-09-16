import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  Home,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Quote,
  ShieldCheck,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import {
  BLOG_POSTS,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/data/blogData";
import { BlogCard } from "@/components/blog/BlogCard";
import { ShareButtons } from "@/components/blog/ShareButtons";

interface SingleBlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: SingleBlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Asaan Shaadi",
    };
  }

  return {
    title: `${post.title} — Asaan Shaadi Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.imageUrl }],
    },
  };
}

export default async function SingleBlogPage({ params }: SingleBlogPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);

  return (
    <article className="min-h-screen bg-[#252525] text-[#FAF7F2]">
      {/* 1. Top Mini-Header / Breadcrumbs Banner */}
      <section className="relative min-h-[70px] sm:min-h-[100px] py-3 sm:py-0 w-full bg-[#1e1e1e] border-b border-[#9a6a4f]/30 flex items-center overflow-hidden z-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#9a6a4f]/15 rounded-full blur-3xl" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#b9965b]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-400 font-sans-modern overflow-x-auto no-scrollbar py-0.5 max-w-full"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-stone-300 hover:text-[#b9965b] transition-colors shrink-0"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-500 shrink-0" />
            <Link
              href="/blog"
              className="text-stone-300 hover:text-[#b9965b] transition-colors shrink-0"
            >
              Nikah Blog
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-500 shrink-0" />
            <span className="text-[#b9965b] font-medium truncate max-w-[130px] xs:max-w-[180px] sm:max-w-xs md:max-w-md">
              {post.category}
            </span>
          </nav>

          {/* Back to all articles */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] sm:text-xs text-stone-200 transition-colors shrink-0"
          >
            <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>All Articles</span>
          </Link>
        </div>
      </section>

      {/* 2. Article Hero & Content Wrapper */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-14">
        {/* Article Meta Header */}
        <header className="space-y-3.5 sm:space-y-6 text-left">
          {/* Category & Read Time Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#b9965b]/20 text-[#e5d2b0] border border-[#b9965b]/40 shadow-sm">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b9965b]" />
              {post.category}
            </span>

            <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-stone-400 font-sans-modern">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b9965b]/80" />
                {post.publishedAt}
              </span>
              <span className="w-1 h-1 rounded-full bg-stone-600" />
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b9965b]/80" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#FAF7F2] leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Subtitle / Excerpt Lead */}
          <p className="text-sm sm:text-base md:text-lg text-stone-300 font-sans-modern leading-relaxed italic border-l-2 border-[#b9965b] pl-3 sm:pl-4">
            {post.excerpt}
          </p>

          {/* Author Strip & Share Toolbar */}
          <div className="pt-3 sm:pt-4 pb-4 sm:pb-6 border-y border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            {/* Author Details */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#b9965b]/50 shadow-md shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-semibold text-stone-100">
                  {post.author.name}
                </h2>
                <p className="text-[10px] sm:text-xs text-stone-400">{post.author.role}</p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <ShareButtons title={post.title} />
          </div>
        </header>

        {/* Featured Main Image */}
        <div className="my-6 sm:my-10 relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-stone-900">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#252525]/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* Quran / Hadith Sacred Quote Callout (if available) */}
        {post.quote && (
          <aside
            aria-label="Spiritual Wisdom"
            className="my-6 sm:my-10 p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2a1d17] via-[#201713] to-[#1a1411] border border-[#b9965b]/40 shadow-xl relative overflow-hidden"
          >
            <Quote className="absolute -right-4 -bottom-4 w-20 h-20 sm:w-28 sm:h-28 text-[#b9965b]/10 pointer-events-none" />

            {post.quote.arabic && (
              <p className="text-right text-lg sm:text-2xl font-serif text-[#e5d2b0] mb-3 sm:mb-4 tracking-wide leading-relaxed sm:leading-loose">
                {post.quote.arabic}
              </p>
            )}

            <blockquote className="text-sm sm:text-lg text-[#FAF7F2] font-serif-luxury italic leading-relaxed">
              &ldquo;{post.quote.translation}&rdquo;
            </blockquote>

            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-semibold text-[#b9965b] font-sans-modern flex items-center gap-1.5">
              <span>— {post.quote.source}</span>
            </p>
          </aside>
        )}

        {/* Article Body Sections */}
        <section className="space-y-6 sm:space-y-10 text-stone-300 font-sans-modern leading-relaxed text-sm sm:text-base">
          {post.sections.map((section, idx) => (
            <div key={idx} className="space-y-3 sm:space-y-4">
              {section.heading && (
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold font-serif-luxury text-[#FAF7F2] tracking-tight pt-1 sm:pt-2 flex items-center gap-2 sm:gap-2.5">
                  <span className="w-1.5 h-5 sm:h-6 bg-[#b9965b] rounded-full shrink-0" />
                  <span>{section.heading}</span>
                </h2>
              )}
              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-stone-300/90 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </section>

        {/* Key Practical Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="my-8 sm:my-12 p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#1c1c1c] border border-[#b9965b]/30 shadow-lg">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 text-[#e5d2b0]">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9965b]" />
              <h3 className="text-base sm:text-xl font-bold font-serif-luxury text-[#FAF7F2]">
                Key Takeaways for Couples & Families
              </h3>
            </div>
            <ul className="space-y-2.5 sm:space-y-3">
              {post.keyTakeaways.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-base text-stone-300 font-sans-modern"
                >
                  <span className="w-5 h-5 rounded-full bg-[#b9965b]/20 text-[#b9965b] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Tags */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 py-4 sm:py-6 border-t border-white/10">
          <span className="text-xs text-stone-400 mr-1.5">Tags:</span>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog`}
              className="px-2.5 sm:px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] sm:text-xs text-stone-300 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="my-6 sm:my-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#1e1e1e] border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-3.5 sm:gap-5 text-center sm:text-left">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#b9965b] shrink-0">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h4 className="text-sm sm:text-base font-bold font-serif-luxury text-[#FAF7F2]">
                Written by {post.author.name}
              </h4>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#b9965b]/20 text-[#e5d2b0] border border-[#b9965b]/30">
                <ShieldCheck className="w-3 h-3 text-[#b9965b]" />
                Matrimonial Desk
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 font-sans-modern leading-relaxed">
              Dedicated to upholding authentic Sunnah values, pre-marital harmony, and family counseling for the Asaan Shaadi community.
            </p>
          </div>
        </div>
      </main>

      {/* 3. Related Nikah Articles Section */}
      <section
        id="related-articles"
        className="relative py-10 sm:py-18 bg-[#1a1a1a] border-t border-white/10"
      >
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#b9965b] font-medium tracking-wide uppercase font-sans-modern mb-1.5 sm:mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Recommended Reading</span>
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold font-serif-luxury text-[#FAF7F2] tracking-tight">
                Related Nikah Articles
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 font-sans-modern">
                Curated guidance and wisdom to enrich your journey towards a blessed marriage.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#b9965b] hover:text-[#e8a379] transition-colors shrink-0"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>

          {/* Responsive Grid: 1 Col on Mobile, 2 Cols on Tablet, 3 Cols on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {relatedPosts.map((related) => (
              <BlogCard key={related.id} post={related} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom Call To Action Banner */}
      <section className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#2c1d17] to-[#1f1714] border border-[#b9965b]/30 text-center space-y-3 sm:space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-3xl font-bold font-serif-luxury text-[#FAF7F2]">
            Begin Your Matrimonial Journey
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-sans-modern max-w-xl mx-auto">
            Find an aligned, righteous spouse through simple, dignified, and 100% guardian-verified matchmaking on Asaan Shaadi.
          </p>
          <div className="pt-1 sm:pt-2 flex justify-center">
            <Link
              href="/submit-biodata"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#b9965b] to-[#c7a66c] text-white font-medium text-xs sm:text-sm hover:from-[#a38048] hover:to-[#b9965b] shadow-lg transition-all"
            >
              <span>Register Free Biodata</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
