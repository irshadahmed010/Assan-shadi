"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight, BookOpen, Sparkles } from "lucide-react";

export const BlogPageHeader: React.FC = () => {
  return (
    <section
      id="blog-page-header"
      className="relative min-h-[90px] sm:min-h-[110px] md:min-h-[130px] py-4 sm:py-0 w-full bg-[#1e1e1e] border-b border-[#9a6a4f]/30 flex items-center overflow-hidden z-20"
      aria-label="Blog Page Header Banner"
    >
      {/* Ambient background glow & subtle geometric pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#9a6a4f]/15 rounded-full blur-3xl" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#b9965b]/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #b9965b 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        {/* Left: Breadcrumbs + Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3.5 min-w-0 max-w-full">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-400 font-sans-modern"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-stone-300 hover:text-[#b9965b] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-500 shrink-0" />
            <span className="text-[#e8a379] font-medium truncate">Nikah Blog</span>
          </nav>

          {/* Vertical Divider on sm+ */}
          <div className="hidden sm:block w-[1px] h-4 bg-white/20" />

          {/* Heading */}
          <h1 className="text-sm sm:text-base md:text-lg font-bold font-serif-luxury text-[#FAF7F2] tracking-wide truncate flex items-center gap-2">
            <span>Nikah & Matrimonial Insights</span>
            <span className="hidden md:inline-block text-[11px] font-sans-modern font-normal text-stone-400">
              — Faith-Centered Marriage Guidance
            </span>
          </h1>
        </div>

        {/* Right: Quick Verification & Trust Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#FAF7F2] text-[11px] sm:text-xs font-sans-modern">
            <Sparkles className="w-3.5 h-3.5 text-[#b9965b]" />
            <span className="font-medium text-[#FAF7F2]/90 hidden xs:inline">
              Sunnah-Inspired Advice
            </span>
            <span className="font-medium text-[#FAF7F2]/90 xs:hidden">
              Articles
            </span>
          </div>

          <div className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-stone-300">
            <BookOpen className="w-3 h-3 text-[#b9965b]" />
            <span>Verified Counsel</span>
          </div>
        </div>
      </div>
    </section>
  );
};
