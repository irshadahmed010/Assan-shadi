"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const TrustedMatchmakingSection: React.FC = () => {
  const features = [
    {
      id: "verified-profiles",
      title: "Verified Profiles",
      desc: "Manually checked with phone verification.",
      image: "/images/Trusted_Matchmaking/img_01.png",
    },
    {
      id: "genuine-members",
      title: "Genuine Members",
      desc: "Serious individuals and families only.",
      image: "/images/Trusted_Matchmaking/img_02.png",
    },
    {
      id: "islamic-values",
      title: "Islamic Values",
      desc: "Built on trust, respect and shared deen.",
      image: "/images/Trusted_Matchmaking/img_03.png",
    },
    {
      id: "safe-private",
      title: "Safe & Private",
      desc: "Your information stays confidential.",
      image: "/images/Trusted_Matchmaking/img_04.png",
    },
  ];

  return (
    <section className="relative py-10 lg:py-14 bg-[#252525] text-[#FAF7F2] overflow-hidden border-b border-white/10">
      {/* Decorative luxury background glow and subtle Islamic arch watermark */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Warm Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#9a6a4f]/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#b9965b]/15 blur-3xl" />

        {/* Subtle geometric dot matrix overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] bg-repeat"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #b9965b 1.5px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Right side architectural silhouette ambient blend */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.05] bg-gradient-to-l from-[#b9965b]/30 via-transparent to-transparent pointer-events-none hidden lg:block" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Content */}
        <ScrollReveal direction="up">
          <div className="max-w-2xl mb-14">
            {/* Eyebrow with decorative line */}
            <div className="inline-flex flex-wrap items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#FFD78A]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FFD78A] font-bold font-sans-modern">
                Trusted Matchmaking
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#FFD78A]/15 border border-[#FFD78A]/40 text-[#FFD78A] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Completely Offline Services
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.15] text-white mb-4">
              Why{" "}
              <span className="text-[#FFD78A] italic font-serif-luxury font-medium">
                Choose Asaan Shaadi?
              </span>
            </h2>

            {/* Subtitle Description */}
            <p className="text-stone-200 text-base sm:text-lg font-sans-modern leading-relaxed">
              We combine trust, technology and values to help you find a
              compatible life partner — the halal way.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-stretch">
          {features.map((feature, idx) => {
            return (
              <ScrollReveal
                key={feature.id}
                direction="up"
                delay={idx * 0.1}
                className="h-full"
              >
                <div className="group relative h-full flex flex-col justify-between bg-[#2a2825]/95 hover:bg-[#322f2b] border border-white/15 hover:border-[#FFD78A]/60 rounded-[5px] overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#c2794c]/20 hover:-translate-y-2">
                  {/* Modern Edge-to-Edge Image with Bottom Shadows */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#1e1d1b] border-b border-white/10 group-hover:border-[#FFD78A]/40 transition-colors shadow-[0_8px_16px_rgba(0,0,0,0.7)]">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {/* Subtle Gradient vignette on image bottom for sleek depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    {/* Ambient gold line at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD78A]/40 to-transparent group-hover:via-[#FFD78A] transition-all duration-500" />
                  </div>

                  {/* Feature Content with compact internal padding */}
                  <div className="flex flex-col flex-1 items-center justify-between p-4 sm:p-5 pt-3.5 pb-4 text-center">
                    <div className="flex flex-col items-center w-full">
                      {/* Feature Title */}
                      <h3 className="text-base sm:text-lg font-bold font-serif-luxury text-white tracking-wide mb-1.5 group-hover:text-[#FFD78A] transition-colors">
                        {feature.title}
                      </h3>

                      {/* Small Center Divider Line */}
                      <div className="w-8 h-[2px] bg-[#FFD78A] group-hover:w-14 transition-all duration-300 my-1.5" />

                      {/* Feature Description */}
                      <p className="text-stone-200 text-xs sm:text-sm font-sans-modern leading-relaxed mt-0.5">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Bar: CTA Button + Slogan */}
        <ScrollReveal direction="up" delay={0.35}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/15">
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/submit-biodata"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 btn-primary-glow text-white font-sans-modern font-semibold px-8 py-3.5 rounded-[6px] transition-all duration-300 group text-sm sm:text-base tracking-wide"
              >
                <span>Join Asaan Shaadi</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-stone-100 border border-white/20 hover:border-[#FFD78A]/50 font-sans-modern font-medium px-6 py-3.5 rounded-[6px] transition-all duration-300 text-sm tracking-wide shadow-sm"
              >
                <span>Who We Are & Our Story</span>
              </Link>
            </div>

            {/* Slogan with decorative line */}
            <div className="inline-flex items-center gap-3 text-stone-300">
              <span className="w-10 h-[2px] bg-[#FFD78A]" />
              <span className="text-xs sm:text-sm tracking-[0.22em] uppercase font-sans-modern font-semibold text-stone-200">
                A step closer to a blessful tomorrow
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustedMatchmakingSection;
