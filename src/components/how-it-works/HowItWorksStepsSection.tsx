"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UserPlus,
  ShieldCheck,
  Search,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  PhoneCall,
  Video,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "Create Free Profile & Biodata",
    tagline: "Quick 2-Minute Setup",
    desc: "Share your essential details including education, profession, location, and lifestyle preferences. You have complete control to keep your photo private or visible only to serious inquiries.",
    icon: UserPlus,
    badge: "Step 1",
    features: ["Photo Privacy Toggle", "No Registration Charges", "Guardian Details"],
  },
  {
    num: "02",
    title: "100% Phone Verification",
    tagline: "Guardian & Candidate Check",
    desc: "Our dedicated moderation team verifies contact numbers and credentials manually. This ensures a clean, serious community with zero spam, bots, or non-serious dating seekers.",
    icon: ShieldCheck,
    badge: "Step 2",
    features: ["Manual Phone Checks", "Guardian Consent", "Verified Badge Awarded"],
  },
  {
    num: "03",
    title: "Explore Matches & Safe Pre-Chat",
    tagline: "Filtered Compatibility",
    desc: "Discover profiles matching your values and priorities. Connect through introductory text or video calls before meeting in person to eliminate initial awkwardness and build comfort.",
    icon: Search,
    badge: "Step 3",
    features: ["Advanced Search Filters", "Pre-Meeting Video/Chat", "Direct Proposal Notes"],
  },
  {
    num: "04",
    title: "Family Meeting & Blessed Nikah",
    tagline: "Sunnah-Aligned Union",
    desc: "Coordinate respectful family visits directly or with the help of your assigned marriage supervisor. Plan a simple, debt-free, and dignified Nikah full of Barakah.",
    icon: HeartHandshake,
    badge: "Step 4",
    features: ["Supervisor Coordination", "Zero Dowry Mindset", "Sacred Companionship"],
  },
];

export const HowItWorksStepsSection: React.FC = () => {
  return (
    <section
      id="steps-roadmap"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#252525] text-[#FAF7F2] overflow-hidden border-b border-white/10"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#9a6a4f]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#b9965b]/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #b9965b 1.5px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative max-w-[1350px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#e8a379] text-xs font-semibold uppercase tracking-widest font-sans-modern">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dignified Roadmap</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight text-[#FAF7F2]">
              Your Journey to Nikah in{" "}
              <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                4 Simple Steps
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
              We have redesigned the matchmaking process to make it easy, respectful, and transparent for candidates and families alike.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid: 4 Steps on Left (2x2) + Visual Showcase on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 4 Steps Grid (lg:col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <ScrollReveal
                  key={step.num}
                  direction="up"
                  delay={idx * 0.1}
                  className="h-full"
                >
                  <div className="group relative h-full bg-[#202020] hover:bg-[#282828] border border-white/10 hover:border-[#b9965b]/50 rounded-[5px] p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                    {/* Top bar with Step Number and Icon */}
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-11 h-11 rounded-[5px] bg-[#9a6a4f]/25 text-[#e8a379] flex items-center justify-center border border-[#9a6a4f]/40 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold font-serif-luxury text-[#e8a379]/80 group-hover:text-[#e8c078] transition-colors">
                          {step.num}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-serif-luxury text-[#FAF7F2] group-hover:text-[#e8c078] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[#b9965b] font-sans-modern font-semibold mt-0.5 mb-2.5">
                        {step.tagline}
                      </p>

                      <p className="text-xs text-stone-300 font-sans-modern leading-relaxed mb-4">
                        {step.desc}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="pt-3 border-t border-white/10 space-y-1.5">
                      {step.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-[11px] text-stone-300 font-sans-modern">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Right Column: Visual Couple Showcase & Hadith Box (lg:col-span-5) */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow ring */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#9a6a4f]/30 to-[#b9965b]/30 rounded-2xl blur-xl opacity-60" />

                {/* Main Image Container */}
                <div className="relative rounded-[5px] overflow-hidden border-2 border-[#b9965b]/40 shadow-2xl bg-[#1e1e1e] aspect-[4/5]">
                  <Image
                    src="/images/couple-hamza-areeba.jpg"
                    alt="Happy Couple Marriage - Asaan Shaadi"
                    fill
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/30 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 backdrop-blur-md bg-[#1e1e1e]/90 border border-[#b9965b]/30 rounded-[5px] px-3 py-1.5 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-sans-modern font-semibold text-stone-200">
                      Verified Guardian Matchmaking
                    </span>
                  </div>

                  {/* Bottom Hadith Banner */}
                  <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-[#1e1e1e]/95 border border-white/15 rounded-[5px] p-4 shadow-2xl space-y-2">
                    <p className="text-xs sm:text-sm font-serif-luxury italic text-[#FAF7F2] leading-relaxed">
                      &ldquo;The marriage that produces the most blessing is that which involves the least burden.&rdquo;
                    </p>
                    <div className="flex items-center justify-between text-[11px] font-sans-modern text-[#e8c078] pt-1 border-t border-white/10">
                      <span>— Musnad Ahmad</span>
                      <span className="text-stone-400">Zero Dowry Sunnah</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksStepsSection;
