"use client";

import React from "react";
import Image from "next/image";
import { Heart, Sparkles, CheckCircle2, ShieldAlert, Compass, Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const WhatKeepsUsGoingSection: React.FC = () => {
  return (
    <section
      id="what-keeps-us-going"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#252525] text-[#FAF7F2] overflow-hidden border-b border-white/10"
    >
      {/* Ambient background styling */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#9a6a4f]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#b9965b]/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Couple Imagery with Graphic Floating Overlay */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <ScrollReveal direction="right">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow ring */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#9a6a4f]/30 to-[#b9965b]/30 rounded-3xl blur-2xl opacity-70" />

                {/* Main Card */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#b9965b]/40 shadow-2xl bg-[#1e1e1e] aspect-[4/5]">
                  <Image
                    src="/images/couple-ayaan-saba.jpg"
                    alt="Happy Married Couple - Asaan Shaadi Matrimony"
                    fill
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />

                  {/* Top floating pill */}
                  <div className="absolute top-4 left-4 backdrop-blur-md bg-[#1e1e1e]/85 border border-[#b9965b]/30 rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-lg">
                    <Star className="w-3.5 h-3.5 text-[#e8c078] fill-[#e8c078]" />
                    <span className="text-xs font-sans-modern font-semibold text-stone-200">
                      Real Story • Lasting Companionship
                    </span>
                  </div>

                  {/* Bottom emotional quote box */}
                  <div className="absolute bottom-5 left-5 right-5 backdrop-blur-md bg-[#1e1e1e]/90 border border-white/15 rounded-xl p-4 shadow-2xl space-y-2">
                    <p className="text-xs sm:text-sm font-serif-luxury italic text-[#FAF7F2] leading-relaxed">
                      &ldquo;The more compatible your life partner is with you, the happier and more blessed your life is sure to be.&rdquo;
                    </p>
                    <div className="flex items-center justify-between text-[11px] font-sans-modern text-[#e8a379] pt-1 border-t border-white/10">
                      <span>Shared Values & Goals</span>
                      <span>No Compromise</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Narrative & Philosophy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#e8a379] text-xs font-semibold uppercase tracking-widest font-sans-modern">
                <Heart className="w-3.5 h-3.5 fill-[#e8a379]" />
                <span>What Keeps Us Going?</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.2] text-[#FAF7F2]">
                Your Continued Support &{" "}
                <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                  Happy Success Stories!
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="space-y-4 text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
                <p>
                  Marriage is not a simple and straightforward process. It’s rather a <strong className="text-white font-semibold">vital turning point in every man and woman’s life</strong>. You cannot be careless while choosing your life companion. Remember the fact that your life partner is going to be with you to guide you during your successes and failures, ups and downs, and pleasures and pains.
                </p>
                <p>
                  In today’s modern times, people have started to find the love of their lives on their own. However, the falling rates of love marriages have made people realize that it might not be the best technique to ensure a successful married life. Consequently, they have started looking for a feasible alternative and chosen <strong className="text-[#e8c078] font-semibold">Matrimony services to fulfill their needs</strong>.
                </p>
                <p>
                  Now, you need not compromise with situations and people. As a substitute, you can discover a life partner on your own terms. Asaan Shaadi is superior to traditional marriage bureaus as it requires you to fill in verified, necessary information on our secure registration portal and begin your search with complete clarity and dignity.
                </p>
              </div>
            </ScrollReveal>

            {/* Contrast Highlights Cards */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#202020] border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-stone-300 text-xs font-semibold uppercase tracking-wider font-sans-modern">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    The Modern Dilemma
                  </div>
                  <p className="text-xs text-stone-300 font-sans-modern leading-relaxed">
                    Falling rates of impulsive love marriages and chaotic dating apps leave individuals feeling anxious and disappointed.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#2a2420] border border-[#9a6a4f]/40 space-y-2">
                  <div className="flex items-center gap-2 text-[#e8c078] text-xs font-semibold uppercase tracking-wider font-sans-modern">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    The Asaan Shaadi Way
                  </div>
                  <p className="text-xs text-stone-300 font-sans-modern leading-relaxed">
                    Verified backgrounds, family respect, open communication, and zero compromise on personal values and lifestyle.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatKeepsUsGoingSection;
