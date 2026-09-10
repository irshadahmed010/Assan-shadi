"use client";

import React, { useState, useMemo } from "react";
import { Search, Sparkles, Filter, BookHeart, Compass } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blogData";
import { BlogCard } from "./BlogCard";

export const BlogListSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Articles");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Articles" || post.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="relative py-8 sm:py-14 lg:py-20 w-full max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient accents clipped within section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 sm:w-full max-w-4xl h-96 bg-[#b9965b]/5 rounded-full blur-[120px]" />
      </div>

      {/* Section Header */}
      <div className="relative text-center w-full max-w-3xl mx-auto mb-8 sm:mb-12">
        {/* Subtle Decorative Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#b9965b]/10 border border-[#b9965b]/30 text-[#e5d2b0] text-[11px] sm:text-xs font-sans-modern mb-3 sm:mb-4">
          <BookHeart className="w-3.5 h-3.5 text-[#b9965b]" />
          <span>Sacred Bonds & Marital Harmony</span>
        </div>

        {/* Main Section Title */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#FAF7F2] tracking-tight leading-tight px-1">
          Insights for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8a379] via-[#b9965b] to-[#e5d2b0]">Happy Marriage</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-2 sm:mt-4 text-xs sm:text-base text-stone-300/80 font-sans-modern leading-relaxed max-w-xl mx-auto px-2">
          Sunnah wisdom and practical guidance for a blessed marriage.
        </p>

        {/* Live Search Input */}
        <div className="relative w-full max-w-md mx-auto mt-5 sm:mt-6 px-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics (e.g. Mahr, In-laws, Wali, Budget)..."
            className="w-full pl-10 pr-12 py-2 sm:py-2.5 rounded-full bg-[#1c1c1c] border border-white/15 text-xs sm:text-sm text-stone-200 placeholder-stone-400 focus:outline-none focus:border-[#b9965b] focus:ring-2 focus:ring-[#b9965b]/20 transition-all font-sans-modern"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Modern Category Tabs with Safe Mobile Scroll */}
      <div className="relative w-full max-w-full mb-8 sm:mb-12 overflow-hidden">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none no-scrollbar w-full max-w-full">
          {BLOG_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const count =
              category === "All Articles"
                ? BLOG_POSTS.length
                : BLOG_POSTS.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group relative flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 shrink-0 ${
                  isActive
                    ? "bg-[#b9965b] text-white shadow-[0_4px_20px_rgba(185,150,91,0.35)]"
                    : "bg-[#1c1c1c]/80 text-stone-300 hover:text-white hover:bg-[#252525] border border-white/10"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-sans-modern transition-colors ${
                    isActive
                      ? "bg-black/20 text-white"
                      : "bg-white/5 text-stone-400 group-hover:text-stone-300"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Grid: 1 Col on Mobile, 2 Cols on Tablet, 3 Cols on Desktop */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-[#1c1c1c]/50 rounded-2xl border border-white/10 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#b9965b]/15 border border-[#b9965b]/30 flex items-center justify-center mx-auto text-[#b9965b] mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-serif-luxury font-bold text-[#FAF7F2]">
            No Articles Found
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-sm mx-auto">
            We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try another keyword or switch category tabs.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Articles");
            }}
            className="mt-4 px-4 py-2 rounded-full bg-[#b9965b] text-white text-xs font-medium hover:bg-[#a38048] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
