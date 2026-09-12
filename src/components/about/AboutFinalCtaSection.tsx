"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Heart,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Gift,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const AboutFinalCtaSection: React.FC = () => {
  return (
    <section
      id="about-cta"
      className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-[#1e1e1e] via-[#24201c] to-[#1a1715] text-[#FAF7F2] overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#9a6a4f]/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-[#b9965b]/15 blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #b9965b 1.5px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative max-w-[1350px] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Main Luxury Frame */}
        <div className="relative rounded-[5px] bg-[#282522]/90 border border-[#9a6a4f]/40 p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Subtle top gold line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#b9965b] to-transparent" />

          {/* Background Couple Silhouette Watermark */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-50 pointer-events-none hidden lg:block overflow-hidden">
            <Image
              src="/images/couple-zaid-hira.jpg"
              alt="Happy Couple Watermark"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#e8c078] text-xs font-semibold uppercase tracking-widest font-sans-modern">
                <Gift className="w-3.5 h-3.5 text-[#b9965b]" />
                <span>
                  Begin Your Journey Today • 100% Free Profile Registration
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.15] text-[#FAF7F2]">
                Discover Your Life Companion{" "}
                <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                  With Ease & Dignity
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="space-y-4 text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
            
                <p>   
                  Finding the right life partner is an important decision. Asaan
                  Shaadi makes your search simple, comfortable, and
                  meaningful.
                </p>
                <p>              
                  Explore profiles based on your preferences, lifestyle, and
                  faith, and take the first step toward finding your ideal life
                  partner.
                </p>
              </div>
            </ScrollReveal>

            {/* Dual CTAs & Actions */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/submit-biodata"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#9a6a4f] to-[#b9965b] hover:from-[#b17b5d] hover:to-[#c8a66b] text-white font-sans-modern font-bold text-base transition-all duration-300 shadow-xl shadow-[#9a6a4f]/35 hover:shadow-2xl hover:scale-[1.02] group"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>

                <a
                  href="https://wa.me/919620078691?text=Hello%20Asaan%20Shaadi,%20I%20would%20like%20to%20consult%20with%20a%20Matchmaking%20Supervisor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-[#FAF7F2] border border-white/15 hover:border-white/30 font-sans-modern font-semibold text-sm transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-[#e8c078]" />
                  <span>Talk to Matchmaking Supervisor</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Trust Points */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10 text-xs text-stone-400 font-sans-modern">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No Registration Fee</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#b9965b] shrink-0" />
                  <span>100% Phone Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#e8a379] shrink-0" />
                  <span>Strict Privacy & Zero Compromise</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFinalCtaSection;
