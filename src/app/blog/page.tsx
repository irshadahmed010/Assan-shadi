import React from "react";
import { Metadata } from "next";
import { BlogPageHeader } from "@/components/blog/BlogPageHeader";
import { BlogListSection } from "@/components/blog/BlogListSection";
import { BlogCtaSection } from "@/components/blog/BlogCtaSection";

export const metadata: Metadata = {
  title: "Insights for a Happy Marriage — Nikah Guidance | Asaan Shaadi",
  description:
    "Explore authentic Sunnah advice, pre-marital compatibility guides, relationship wisdom, and budget-friendly wedding insights for a blessed Islamic marriage.",
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#252525] text-[#FAF7F2] w-full max-w-full overflow-x-hidden">
      {/* 1. Page Header Banner */}
      <BlogPageHeader />

      {/* 2. Insights for a Happy Marriage — Category Tabs, Live Search, Responsive Grid */}
      <BlogListSection />

      {/* 3. Call To Action — Find Blessed Match / Submit Biodata */}
      <BlogCtaSection />
    </div>
  );
}
