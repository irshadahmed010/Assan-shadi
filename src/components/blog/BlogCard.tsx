"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight, Bookmark, Sparkles } from "lucide-react";
import { BlogPost } from "@/data/blogData";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <article className="group relative flex flex-col h-full bg-[#1c1c1c]/90 rounded-2xl border border-white/10 hover:border-[#b9965b]/50 overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgba(185,150,91,0.15)] hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle Dark Vignette / Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-black/25 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Category Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-[#252525]/90 backdrop-blur-md text-[#E5D2B0] border border-[#b9965b]/30 shadow-md">
            <Sparkles className="w-3 h-3 text-[#b9965b]" />
            {post.category}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setBookmarked(!bookmarked);
          }}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark article"}
          className={`absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
            bookmarked
              ? "bg-[#b9965b] text-white shadow-lg"
              : "bg-[#1e1e1e]/80 text-stone-300 hover:bg-[#b9965b] hover:text-white border border-white/10"
          }`}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-4 sm:p-6 justify-between gap-3 sm:gap-4">
        <div className="space-y-2.5 sm:space-y-3">
          {/* Metadata: Date & Read Time */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-stone-400 font-sans-modern">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#b9965b]/80" />
              {post.publishedAt}
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-600" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#b9965b]/80" />
              {post.readTime}
            </span>
          </div>

          {/* Title with Link */}
          <Link href={`/blog/${post.slug}`} className="block focus:outline-none">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold font-serif-luxury text-[#FAF7F2] group-hover:text-[#e8a379] transition-colors leading-snug line-clamp-2">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-stone-300/85 font-sans-modern leading-relaxed line-clamp-2 sm:line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Footer: Author & Read Action */}
        <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between gap-2">
          {/* Author */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#b9965b]/40 shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-stone-200 truncate">
                {post.author.name}
              </span>
              <span className="text-[10px] text-stone-400 truncate">
                {post.author.role}
              </span>
            </div>
          </div>

          {/* Read Full Button */}
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#b9965b] hover:text-[#e8a379] group-hover:translate-x-0.5 transition-all shrink-0"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};
