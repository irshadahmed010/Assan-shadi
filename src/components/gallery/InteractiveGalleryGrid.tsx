"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Calendar,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: "nikah" | "walima" | "rings";
  categoryLabel: string;
  city: string;
  year: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "royal-nikah",
    src: "/images/muslim-wedding-couple.jpg",
    title: "Zubair & Maryam",
    caption:
      "A timeless celebration of faith, pure intentions, and sacred vows.",
    category: "nikah",
    categoryLabel: "Nikah Ceremony",
    city: "Bangalore",
    year: "2025",
  },
  {
    id: "ayaan-saba",
    src: "/images/couple-ayaan-saba.jpg",
    title: "Ayaan & Saba",
    caption: "Golden hour sunset vows and lifelong commitment.",
    category: "rings",
    categoryLabel: "Rings & Promises",
    city: "Hyderabad",
    year: "2025",
  },
  {
    id: "hero-wedding",
    src: "/images/hero-wedding-couple.webp",
    title: "Farhan & Zainab",
    caption: "United in love, dignity, and sunnah values.",
    category: "walima",
    categoryLabel: "Walima & Reception",
    city: "Mumbai",
    year: "2024",
  },
  {
    id: "rings-henna",
    src: "/images/gallery-mehndi-hands.jpg",
    title: "Sacred Rings & Promises",
    caption: "The beautiful pledge of togetherness and family blessings.",
    category: "rings",
    categoryLabel: "Rings & Promises",
    city: "Delhi",
    year: "2025",
  },
  {
    id: "hamza-areeba",
    src: "/images/couple-hamza-areeba.jpg",
    title: "Hamza & Areeba",
    caption: "Quiet companionship and mutual respect.",
    category: "walima",
    categoryLabel: "Walima & Reception",
    city: "Bangalore",
    year: "2024",
  },
  {
    id: "zaid-hira",
    src: "/images/couple-zaid-hira.jpg",
    title: "Zaid & Hira",
    caption: "Serene vows and embarking on life's journey.",
    category: "rings",
    categoryLabel: "Rings & Promises",
    city: "Dubai",
    year: "2025",
  },
  {
    id: "twilight-horizons",
    src: "/images/gallery-couple-sunset.jpg",
    title: "Twilight Horizons",
    caption: "Looking forward together towards a blessed future.",
    category: "walima",
    categoryLabel: "Walima & Reception",
    city: "Islamabad",
    year: "2024",
  },
  {
    id: "mosque-arch-sunset",
    src: "/images/mosque-arch-sunset.jpg",
    title: "Sanctuary of Peace",
    caption: "Spiritual grounding before the Nikah congregation.",
    category: "nikah",
    categoryLabel: "Nikah Ceremony",
    city: "Agra",
    year: "2025",
  },
  {
    id: "guidance-consultation",
    src: "/images/expert-guidance-consultation.jpg",
    title: "Relationship Supervisor Guidance",
    caption: "Families connecting with respect and transparency.",
    category: "nikah",
    categoryLabel: "Nikah Ceremony",
    city: "Bangalore",
    year: "2025",
  },
  {
    id: "mosque-lantern-sunset",
    src: "/images/mosque-lantern-sunset.jpg",
    title: "Light & Serenity",
    caption: "The radiant illumination of faith and marriage.",
    category: "rings",
    categoryLabel: "Rings & Promises",
    city: "Sharjah",
    year: "2025",
  },
];

type CategoryFilter = "all" | "nikah" | "walima" | "rings";

export const InteractiveGalleryGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filteredItems =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  // GSAP Stagger Animation on filter change
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
        },
      );
    }
  }, [activeFilter]);

  // Keyboard Navigation for Lightbox Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIdx === null) return;

      if (e.key === "Escape") {
        setActivePhotoIdx(null);
      } else if (e.key === "ArrowRight") {
        setActivePhotoIdx((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null,
        );
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIdx((prev) =>
          prev !== null
            ? (prev - 1 + filteredItems.length) % filteredItems.length
            : null,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIdx, filteredItems.length]);

  const currentPhoto =
    activePhotoIdx !== null ? filteredItems[activePhotoIdx] : null;

  return (
    <section
      id="interactive-gallery"
      className="relative py-10 sm:py-12 lg:py-14 bg-[#252525] text-[#FAF7F2] overflow-hidden border-b border-white/10"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-28 w-96 h-96 bg-[#9a6a4f]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-28 w-96 h-96 bg-[#b9965b]/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #b9965b 1.5px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative max-w-[1350px] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3.5">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#e8a379] text-xs font-semibold uppercase tracking-widest font-sans-modern">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Matrimonial Celebrations</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight text-[#FAF7F2]">
              Cherished Moments &{" "}
              <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                Sacred Milestones
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
              Real stories of love, companionship, and Barakah through Asaan
              Shaadi.
            </p>
          </ScrollReveal>

          {/* Interactive Category Filter Tabs: Removed Mehndi & Portraits, Added Rings & Promises */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
              {[
                { id: "all", label: "All Moments" },
                { id: "nikah", label: "Nikah Ceremony" },
                { id: "walima", label: "Walima & Reception" },
                { id: "rings", label: "Rings & Promises" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as CategoryFilter)}
                  className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-sans-modern font-semibold transition-all duration-300 border ${
                    activeFilter === tab.id
                      ? "bg-[#9a6a4f] text-white border-[#9a6a4f] shadow-lg shadow-[#9a6a4f]/30 scale-105"
                      : "bg-[#202020] text-stone-300 border-white/10 hover:border-[#b9965b]/40 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Gallery Grid: 4 columns on Desktop, 2 columns on Mobile, with 30% reduced height (aspect-[4/3]) */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5"
        >
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActivePhotoIdx(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-[5px] border border-white/10 hover:border-[#b9965b]/60 bg-[#1e1e1e] shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-1"
            >
              {/* Image Container: Increased height with aspect-[1/1] */}
              <div className="relative w-full aspect-[1/1] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Ambient Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Top Floating Badge */}
                <div className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5 right-2 sm:right-2.5 flex items-center justify-between pointer-events-none">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-sans-modern font-semibold px-2 py-0.5 rounded-full bg-[#1e1e1e]/85 backdrop-blur-md border border-white/15 text-[#e8a379] truncate max-w-[80%]">
                    {item.categoryLabel}
                  </span>

                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1e1e1e]/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-md shrink-0">
                    <ZoomIn className="w-3.5 h-3.5 text-[#e8c078]" />
                  </div>
                </div>

                {/* Bottom Content Card: Sleek & Compact */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3.5 text-[#FAF7F2] space-y-0.5 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-[#b9965b] font-sans-modern">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-2.5 h-2.5 text-[#e8a379] shrink-0" />
                      {item.city}
                    </span>
                    <span>•</span>
                    <span>{item.year}</span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold font-serif-luxury text-white group-hover:text-[#e8c078] transition-colors leading-snug truncate">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal: Compact width, reduced height, description removed */}
      {currentPhoto && activePhotoIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePhotoIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIdx(null);
            }}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all z-50 group shadow-xl"
            aria-label="Close Lightbox"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Modal Container with Side-by-Side Prev/Next Arrows */}
          <div className="relative flex items-center justify-center gap-2 sm:gap-3.5 w-full max-w-full">
            {/* Prev Arrow - Beside Modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIdx(
                  (activePhotoIdx - 1 + filteredItems.length) %
                    filteredItems.length,
                );
              }}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#1e1e1e]/90 hover:bg-[#9a6a4f] text-white flex items-center justify-center border border-white/20 transition-all z-20 group shadow-xl shrink-0"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Modal Content Frame: Increased Width (max-w-[420px] sm:max-w-[520px]) */}
            <div
              className="relative max-w-[420px] sm:max-w-[520px] w-full bg-[#1e1e1e] border border-[#b9965b]/40 rounded-[5px] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Box: Uniform Height with rounded-[5px] */}
              <div className="relative w-full h-[46vh] sm:h-[54vh] max-h-[480px] bg-[#121212] p-2 sm:p-2.5">
                <div className="relative w-full h-full rounded-[5px] overflow-hidden">
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.title}
                    fill
                    className="object-cover object-center rounded-[5px]"
                    priority
                  />
                </div>
              </div>

              {/* Bottom Details Bar: Compact, Description Removed */}
              <div className="p-3 sm:p-4 bg-[#222222] border-t border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#e8a379] font-sans-modern">
                    <span className="font-semibold uppercase tracking-wider">
                      {currentPhoto.categoryLabel}
                    </span>
                    <span>•</span>
                    <span>{currentPhoto.city}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold font-serif-luxury text-white truncate mt-0.5">
                    {currentPhoto.title}
                  </h3>
                </div>

                {/* Photo Counter */}
                <div className="shrink-0 text-[11px] font-sans-modern text-stone-400 bg-white/5 px-2.5 py-1 rounded-[5px] border border-white/10">
                  <strong className="text-white">{activePhotoIdx + 1}</strong> /{" "}
                  {filteredItems.length}
                </div>
              </div>
            </div>

            {/* Next Arrow - Beside Modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIdx((activePhotoIdx + 1) % filteredItems.length);
              }}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#1e1e1e]/90 hover:bg-[#9a6a4f] text-white flex items-center justify-center border border-white/20 transition-all z-20 group shadow-xl shrink-0"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveGalleryGrid;
