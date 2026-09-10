import React from "react";
import { GalleryPageHeader } from "@/components/gallery/GalleryPageHeader";
import { InteractiveGalleryGrid } from "@/components/gallery/InteractiveGalleryGrid";
import { GalleryStorySpotlight } from "@/components/gallery/GalleryStorySpotlight";
import { GalleryFinalCtaSection } from "@/components/gallery/GalleryFinalCtaSection";

export const metadata = {
  title: "Moments of Togetherness — Matrimonial Gallery | Asaan Shaadi",
  description:
    "Explore authentic photographs of real couples united through Asaan Shaadi. Celebrating dignity, simple sunnah Nikah, and lasting companionship.",
};

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#252525] text-[#FAF7F2]">
      {/* 1. 80px Height Page Header Banner */}
      <GalleryPageHeader />

      {/* 2. Interactive Animated Gallery Grid with Category Filters & Lightbox */}
      <InteractiveGalleryGrid />

      {/* 3. Featured Couple Journey Spotlight with Parallax Visual */}
      <GalleryStorySpotlight />

      {/* 4. Strong Final Call-To-Action */}
      <GalleryFinalCtaSection />
    </div>
  );
}
