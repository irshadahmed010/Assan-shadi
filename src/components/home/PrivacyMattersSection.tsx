"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, EyeOff, ShieldCheck, Users, ArrowRight, Sparkles } from "lucide-react";

export const PrivacyMattersSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const privacyFeatures = [
    {
      id: "data-protection",
      title: "Data Protection",
      desc: "Your personal information is encrypted and stored securely.",
      icon: Lock,
    },
    {
      id: "profile-privacy",
      title: "Profile Privacy",
      desc: "Control who can see your profile and personal details.",
      icon: EyeOff,
    },
    {
      id: "manual-verification",
      title: "Manual Verification",
      desc: "Every profile is manually reviewed to ensure genuineness.",
      icon: ShieldCheck,
    },
    {
      id: "safe-respectful-community",
      title: "Safe & Respectful Community",
      desc: "A trusted space for serious individuals and families only.",
      icon: Users,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="privacy-matters"
      className="relative py-10 lg:py-14 bg-[#171615] text-[#FAF7F2] overflow-hidden border-t border-white/10"
    >
      {/* Background Grand Mosque Courtyard & Archway on the Right */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute right-0 top-0 w-full lg:w-[50%] h-full opacity-35 lg:opacity-75">
          <Image
            src="/images/mosque-arch-sunset.jpg"
            alt="Majestic Mosque arches and courtyard at sunset"
            fill
            className="object-cover object-right"
            priority={false}
          />
          {/* Seamless Luxury Vignette Blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#171615] via-[#171615]/80 to-transparent hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171615] via-[#171615]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#171615]/85 via-transparent to-[#171615]" />
        </div>

        {/* Ambient Warm Golden Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#9a6a4f]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-[#b9965b]/12 blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Region: Eyebrow, Heading, Poetic Callout & Vertical Tag */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12 lg:mb-16">
          {/* Left: Eyebrow + Main Title + Subtitle */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-3.5">
              <span className="w-10 h-[2px] bg-gradient-to-r from-[#b9965b] to-[#f59e0b]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#b9965b] font-semibold font-sans-modern flex items-center gap-2">
                <span>VERIFIED &amp; SECURE</span>
                <Sparkles className="w-3.5 h-3.5 text-[#b9965b]" />
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.15] text-[#FAF7F2] mb-4">
              Your Privacy{" "}
              <span className="text-[#c88a64] font-medium italic font-serif-luxury">
                Matters
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-stone-300 text-sm sm:text-base lg:text-lg font-sans-modern leading-relaxed">
              Your trust is sacred. We are committed to keeping your information safe,
              private, and only for serious matrimonial purposes.
            </p>
          </div>

          {/* Right Callouts */}
          <div className="flex items-start gap-8 lg:gap-12 self-start">
            {/* Poetic Quote */}
            <div className="text-stone-200">
              <p className="font-serif-luxury italic text-lg sm:text-xl text-[#c88a64] leading-tight">
                “Deen
                <br />
                Dua
                <br />
                Together
                <br />
                Always”
              </p>
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#b9965b] to-[#f59e0b] mt-3" />
            </div>

            {/* Ambient Vertical Slogan (Visible on Large Screens) */}
            <div className="hidden xl:block text-stone-400 pl-6 border-l border-white/10">
              <p className="font-serif-luxury italic text-sm text-stone-300/90 leading-tight">
                Private
                <br />
                Respectful
                <br />
                Meaningful
              </p>
              <div className="w-8 h-[1.5px] bg-[#b9965b]/50 mt-2.5" />
            </div>
          </div>
        </div>

        {/* 4 Privacy Feature Cards (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-14">
          {privacyFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-[#242220]/80 hover:bg-[#2c2825] border border-white/10 hover:border-[#b9965b]/60 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#9a6a4f]/20 flex flex-col items-start gap-4 backdrop-blur-md overflow-hidden cursor-pointer"
              >
                {/* Glow Backdrop on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#9a6a4f]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Circular Icon Container matching mockup */}
                <div className="w-14 h-14 rounded-full bg-[#9a6a4f]/25 group-hover:bg-[#9a6a4f]/40 border border-[#9a6a4f]/40 group-hover:border-[#b9965b]/60 flex items-center justify-center text-[#e8a379] group-hover:text-[#ffd6b8] transition-all duration-300 shadow-md shadow-[#9a6a4f]/20 shrink-0">
                  <Icon className="w-6 h-6 stroke-[1.9] transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-bold font-serif-luxury text-[#FAF7F2] tracking-wide group-hover:text-white transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm font-sans-modern leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Edge Accent Glow on Hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b9965b]/0 to-transparent group-hover:via-[#b9965b] transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: CTA Button + Slogan */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-6 border-t border-white/10">
          {/* Rounded Pill Copper Button */}
          <Link
            href="/submit-biodata"
            className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 bg-[#9a6a4f] hover:bg-[#b17b5d] text-white font-sans-modern font-semibold px-8 py-3.5 rounded-[5px] transition-all duration-300 shadow-lg shadow-[#9a6a4f]/30 hover:shadow-xl hover:shadow-[#9a6a4f]/50 group text-sm sm:text-base tracking-wide overflow-hidden"
          >
            {/* Shimmer effect */}
            <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-in-out pointer-events-none" />

            <span className="relative z-10">Start Your Journey</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10" />
          </Link>

          {/* Slogan line */}
          <div className="inline-flex items-center gap-3 text-stone-400">
            <span className="w-12 h-[2px] bg-gradient-to-r from-[#b9965b] to-[#f59e0b]" />
            <span className="text-xs sm:text-sm tracking-[0.22em] uppercase font-sans-modern font-semibold text-stone-300">
              A More Secure Tomorrow Together
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyMattersSection;
