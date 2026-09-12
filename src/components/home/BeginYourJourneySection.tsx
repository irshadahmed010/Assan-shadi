"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Heart, Award, ArrowRight } from "lucide-react";

export const BeginYourJourneySection: React.FC = () => {
  const communityFeatures = [
    {
      id: "trusted-community",
      title: "Trusted Community",
      desc: "Real people, sincere intentions.",
      icon: Users,
    },
    {
      id: "halal-respectful",
      title: "Halal & Respectful",
      desc: "A safe and positive space for everyone.",
      icon: Heart,
    },
    {
      id: "brighter-tomorrow",
      title: "A Brighter Tomorrow",
      desc: "Take the first step towards your happily ever after.",
      icon: Award,
    },
  ];

  return (
    <section
      id="begin-your-journey"
      className="relative py-10 lg:py-14 bg-[#FAF7F2] text-stone-900 overflow-hidden border-t border-stone-200/90"
    >
      {/* Background Couple Looking at Mosque on the Right */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute right-0 top-0 w-full lg:w-[48%] h-full opacity-25 lg:opacity-90">
          <Image
            src="/images/couple-ayaan-saba.jpg"
            alt="Muslim couple beginning their journey together looking at mosque"
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover object-center lg:object-right"
            priority={false}
          />
          {/* Subtle gradient vignette blend into the left ivory cream */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/10 to-transparent hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-transparent to-[#FAF7F2]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Heading, Features & CTA */}
          <div className="lg:col-span-8 max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-3.5">
              <span className="w-10 h-[2px] bg-[#8a431c]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#8a431c] font-bold font-sans-modern">
                JOIN OUR COMMUNITY
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.15] text-stone-900 mb-4">
              Begin Your{" "}
              <span className="text-[#8a431c] font-serif-luxury font-bold italic">
                Journey
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-stone-700 text-sm sm:text-base lg:text-lg font-sans-modern leading-relaxed max-w-2xl mb-8 sm:mb-10">
              Become a part of a trusted community, where faith, values and meaningful
              connections lead to lifelong happiness.
            </p>

            {/* 3 Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-10">
              {communityFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-start gap-3.5 group">
                    {/* Rounded Circle Icon Container matching mockup */}
                    <div className="w-12 h-12 rounded-full bg-[#faede4] border border-[#ecd5c5] flex items-center justify-center text-[#8a431c] group-hover:bg-[#f7ded0] transition-colors shrink-0 shadow-sm">
                      <Icon className="w-5 h-5 stroke-[1.9]" />
                    </div>

                    {/* Text content */}
                    <div>
                      <h3 className="text-sm sm:text-base font-bold font-serif-luxury text-stone-950 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-stone-700 text-xs sm:text-sm font-sans-modern leading-snug mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA Row: Button + Slogan */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
              <Link
                href="/submit-biodata"
                className="relative inline-flex items-center justify-center gap-2.5 btn-primary-glow text-white font-sans-modern font-semibold px-8 py-3.5 rounded-[6px] transition-all duration-300 group text-sm sm:text-base tracking-wide overflow-hidden"
              >
                {/* Shimmer effect */}
                <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-in-out pointer-events-none" />

                <span className="relative z-10">Get in Touch</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10" />
              </Link>

              {/* Tagline */}
              <div className="inline-flex items-center gap-3 text-stone-600">
                <span className="w-10 h-[2px] bg-[#8a431c]" />
                <span className="text-xs sm:text-sm tracking-[0.22em] uppercase font-sans-modern font-bold text-stone-700">
                  SAME VALUES. BRIGHTER TOMORROWS.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Poetic Quote Overlay on the couple image */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="bg-white/85 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-4 lg:p-0 rounded-2xl border border-stone-200/80 lg:border-none self-end lg:mr-4">
              <p className="font-serif-luxury italic text-stone-900 text-lg sm:text-xl lg:text-2xl leading-snug font-bold">
                “New
                <br />
                Beginnings
                <br />
                Stronger
                <br />
                Together”
              </p>
              <div className="w-12 h-[2px] bg-[#8a431c] mt-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeginYourJourneySection;
