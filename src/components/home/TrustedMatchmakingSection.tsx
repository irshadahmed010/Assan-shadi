"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Users, Lock, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Mosque Silhouette Icon matching the exact Islamic Values icon from the design
const MosqueIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Crescent finial on top */}
    <path d="M12 2v2" />
    <path d="M12 3a1.2 1.2 0 0 1 1-1" />
    {/* Dome shape */}
    <path d="M12 4c-3.2 1.8-6.2 5-6.2 9v5h12.4v-5c0-4-3-7.2-6.2-9z" />
    {/* Mihrab / Arch doorway */}
    <path d="M9.5 18v-3.5a2.5 2.5 0 0 1 5 0v3.5" />
    {/* Base line */}
    <path d="M4 20h16" />
  </svg>
);

export const TrustedMatchmakingSection: React.FC = () => {
  const features = [
    {
      id: "verified-profiles",
      title: "Verified Profiles",
      desc: "Manually checked with phone verification.",
      icon: ShieldCheck,
    },
    {
      id: "genuine-members",
      title: "Genuine Members",
      desc: "Serious individuals and families only.",
      icon: Users,
    },
    {
      id: "islamic-values",
      title: "Islamic Values",
      desc: "Built on trust, respect and shared deen.",
      icon: MosqueIcon,
    },
    {
      id: "safe-private",
      title: "Safe & Private",
      desc: "Your information stays confidential.",
      icon: Lock,
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
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#b9965b]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#b9965b] font-semibold font-sans-modern">
                Trusted Matchmaking
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.15] text-[#FAF7F2] mb-4">
              Why{" "}
              <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                Choose Asaan Shaadi?
              </span>
            </h2>

            {/* Subtitle Description */}
            <p className="text-stone-300 text-base sm:text-lg font-sans-modern leading-relaxed">
              We combine trust, technology and values to help you find a
              compatible life partner — the halal way.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal
                key={feature.id}
                direction="up"
                delay={idx * 0.1}
                className="group relative bg-[#2a2a2a]/95 hover:bg-[#323232] border border-white/10 hover:border-[#b9965b]/50 rounded-[5px] p-8 text-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#9a6a4f]/15 hover:-translate-y-2 flex flex-col items-center justify-between min-h-[230px]"
              >
                {/* Circular Icon Container with High-Contrast Brand Colors */}
                <div className="w-16 h-16 rounded-full bg-[#9a6a4f]/25 group-hover:bg-[#9a6a4f]/35 border border-[#9a6a4f]/50 flex items-center justify-center text-[#e8a379] group-hover:text-[#ffd6b8] group-hover:scale-110 transition-all duration-300 mb-6 shadow-md shadow-[#9a6a4f]/20">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Feature Title */}
                <h3 className="text-lg sm:text-xl font-bold font-serif-luxury text-[#FAF7F2] tracking-wide mb-2">
                  {feature.title}
                </h3>

                {/* Small Center Divider Line */}
                <div className="w-10 h-[2px] bg-[#b9965b] group-hover:w-16 transition-all duration-300 my-2" />

                {/* Feature Description */}
                <p className="text-stone-300 text-sm font-sans-modern leading-relaxed mt-2">
                  {feature.desc}
                </p>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Bar: CTA Button + Slogan */}
        <ScrollReveal direction="up" delay={0.35}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/submit-biodata"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#9a6a4f] hover:bg-[#b17b5d] text-white font-sans-modern font-semibold px-8 py-3.5 rounded-[5px] transition-all duration-300 shadow-md shadow-[#9a6a4f]/30 hover:shadow-xl hover:shadow-[#9a6a4f]/50 group text-sm sm:text-base tracking-wide"
              >
                <span>Join Asaan Shaadi</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 hover:border-white/20 font-sans-modern font-medium px-6 py-3.5 rounded-[5px] transition-all duration-300 text-sm tracking-wide"
              >
                <span>Who We Are & Our Story</span>
              </Link>
            </div>

            {/* Slogan with decorative line */}
            <div className="inline-flex items-center gap-3 text-stone-400">
              <span className="w-10 h-[2px] bg-[#b9965b]" />
              <span className="text-xs sm:text-sm tracking-[0.22em] uppercase font-sans-modern font-semibold text-stone-300">
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
