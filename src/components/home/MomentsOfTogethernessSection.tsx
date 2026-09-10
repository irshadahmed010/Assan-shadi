"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, Sparkles, ZoomIn } from "lucide-react";

export const MomentsOfTogethernessSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<{
    src: string;
    title: string;
    caption: string;
  } | null>(null);

  const galleryImages = [
    {
      id: "ayaan-saba",
      src: "/images/couple-ayaan-saba.jpg",
      title: "Ayaan & Saba",
      caption: "Golden hour sunset moments overlooking the grand mosque",
    },
    {
      id: "royal-nikah",
      src: "/images/muslim-wedding-couple.jpg",
      title: "Royal Nikah Elegance",
      caption: "A timeless celebration of faith and blessed commitment",
    },
    {
      id: "hamza-areeba",
      src: "/images/couple-hamza-areeba.jpg",
      title: "Hamza & Areeba",
      caption: "Peaceful reflection and companionship in harmony",
    },
    {
      id: "blessed-beginnings",
      src: "/images/hero-wedding-couple.webp",
      title: "Blessed Beginnings",
      caption: "United in love and tradition under the floral arch",
    },
    {
      id: "zaid-hira",
      src: "/images/couple-zaid-hira.jpg",
      title: "Zaid & Hira",
      caption: "Serene balcony view and lifelong partnership",
    },
    {
      id: "couple-sunset",
      src: "/images/gallery-couple-sunset.jpg",
      title: "Twilight Horizons",
      caption: "Looking forward together towards a blessed future",
    },
  ];

  return (
    <section
      id="gallery"
      className="relative py-10 lg:py-14 bg-[#171615] text-[#FAF7F2] overflow-hidden border-t border-white/10"
    >
      {/* Background Grand Mosque Archway on the Far Right */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute right-0 top-0 w-full lg:w-[46%] h-full opacity-30 lg:opacity-70">
          <Image
            src="/images/mosque-lantern-sunset.jpg"
            alt="Majestic Mosque archway framing sunset minarets"
            fill
            className="object-cover object-right"
            priority={false}
          />
          {/* Gradients to seamlessly blend into dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#171615] via-[#171615]/75 to-transparent hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171615] via-[#171615]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#171615]/80 via-transparent to-[#171615]" />
        </div>

        {/* Ambient Warm Golden Glows */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#9a6a4f]/12 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#b9965b]/15 blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Region */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12 lg:mb-14">
          {/* Left: Eyebrow + Title + Subtitle */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-3.5">
              <span className="w-10 h-[2px] bg-gradient-to-r from-[#b9965b] to-[#f59e0b]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#b9965b] font-semibold font-sans-modern flex items-center gap-2">
                <span>OUR GALLERY</span>
                <Sparkles className="w-3.5 h-3.5 text-[#b9965b]" />
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.15] text-[#FAF7F2] mb-4">
              Moments of{" "}
              <span className="text-[#c88a64] font-medium italic font-serif-luxury">
                Togetherness
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-stone-300 text-sm sm:text-base lg:text-lg font-sans-modern leading-relaxed">
              A glimpse into beautiful beginnings, nikahs, and happy families.
            </p>
          </div>

          {/* Right Callouts */}
          <div className="flex items-start gap-8 lg:gap-12 self-start">
            {/* Center Quote */}
            <div className="text-stone-200">
              <p className="font-serif-luxury italic text-lg sm:text-xl text-[#c88a64] leading-tight">
                “Different Faces
                <br />
                Same Blessings”
              </p>
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#b9965b] to-[#f59e0b] mt-3" />
            </div>

            {/* Vertical Words */}
            <div className="hidden xl:block text-stone-400 pl-6 border-l border-white/10">
              <p className="font-serif-luxury italic text-sm text-stone-300/90 leading-tight">
                Faith
                <br />
                Love
                <br />
                Family
                <br />
                Forever
              </p>
              <div className="w-8 h-[1.5px] bg-[#b9965b]/50 mt-2.5" />
            </div>
          </div>
        </div>

        {/* 6 Photo Cards in a Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-14">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setActivePhoto(img)}
              className="group relative aspect-square rounded-[18px] overflow-hidden border border-white/15 hover:border-[#b9965b]/80 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#9a6a4f]/30 cursor-pointer bg-[#242220]"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover overlay with magnifying icon and title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 pointer-events-none">
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-1.5 self-end">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <p className="text-white text-xs font-serif-luxury font-semibold truncate">
                  {img.title}
                </p>
              </div>

              {/* Subtle gold border glow line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b9965b]/0 to-transparent group-hover:via-[#b9965b] transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom Bar: CTA Button + Slogan */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-6 border-t border-white/10">
          {/* Pill button */}
          <Link
            href="/gallery"
            className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 bg-[#9a6a4f] hover:bg-[#b17b5d] text-white font-sans-modern font-semibold px-8 py-3.5 rounded-[5px] transition-all duration-300 shadow-lg shadow-[#9a6a4f]/30 hover:shadow-xl hover:shadow-[#9a6a4f]/50 group text-sm sm:text-base tracking-wide overflow-hidden"
          >
            {/* Shimmer effect */}
            <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-in-out pointer-events-none" />

            <span className="relative z-10">Explore More Moments</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10" />
          </Link>

          {/* Slogan */}
          <div className="inline-flex items-center gap-3 text-stone-400">
            <span className="w-12 h-[2px] bg-gradient-to-r from-[#b9965b] to-[#f59e0b]" />
            <span className="text-xs sm:text-sm tracking-[0.22em] uppercase font-sans-modern font-semibold text-stone-300">
              Beautiful People. Blessed Journeys.
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Lightbox Modal for Photo Preview */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#1c1a18] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full aspect-square sm:aspect-[4/3]">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="p-5 sm:p-6 bg-[#171615] text-[#FAF7F2]">
              <h4 className="text-lg sm:text-xl font-bold font-serif-luxury text-[#c88a64] mb-1">
                {activePhoto.title}
              </h4>
              <p className="text-sm text-stone-300 font-sans-modern">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MomentsOfTogethernessSection;
