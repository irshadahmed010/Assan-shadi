"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

export const BlogCtaSection: React.FC = () => {
  return (
    <section className="relative py-8 sm:py-14 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#2a1b14] via-[#1f1714] to-[#1a1411] border border-[#b9965b]/30 p-5 sm:p-10 lg:p-12 shadow-2xl">
        {/* Ambient background glows */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#b9965b]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-60 h-60 bg-[#9a6a4f]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl text-center lg:text-left space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b9965b]/20 border border-[#b9965b]/35 text-[#e5d2b0] text-[11px] sm:text-xs font-sans-modern">
              <Sparkles className="w-3.5 h-3.5 text-[#b9965b]" />
              <span>Begin With Pure Intentions</span>
            </div>

            <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-[#FAF7F2] leading-tight">
              Ready to find a partner who shares your values?
            </h3>

            <p className="text-xs sm:text-base text-stone-300 font-sans-modern leading-relaxed">
              Experience a dignified, guardian-verified matrimonial journey. No commercial subscriptions, no dowry culture—only pure Sunnah connections.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2 text-[11px] sm:text-xs text-stone-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b9965b]" />
                100% Guardian Verified
              </span>
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b9965b]" />
                Zero Commercial Pressure
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
            <Link
              href="/submit-biodata"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#b9965b] to-[#c7a66c] text-white font-medium text-xs sm:text-sm hover:from-[#a38048] hover:to-[#b9965b] shadow-[0_4px_20px_rgba(185,150,91,0.4)] hover:scale-[1.02] transition-all"
            >
              <span>Submit Free Biodata</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-stone-200 border border-white/15 text-xs sm:text-sm transition-colors"
            >
              <span>How It Works</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
