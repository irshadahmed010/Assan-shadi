"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const GalleryStorySpotlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (imageRef.current && containerRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="story-spotlight"
      className="relative py-10 sm:py-12 lg:py-14 bg-[#1e1e1e] text-[#FAF7F2] overflow-hidden border-b border-white/10"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[250px] bg-[#9a6a4f]/15 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-[1350px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Image with Reduced Height & Responsive Fit */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="right">
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                {/* Glow ring */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#9a6a4f]/30 to-[#b9965b]/30 rounded-xl blur-xl opacity-60" />

                {/* Reduced Height Image Frame (aspect-[4/3] sm:aspect-[16/11] with max height) */}
                <div className="relative rounded-[5px] overflow-hidden border-2 border-[#b9965b]/40 shadow-xl bg-[#171615] aspect-[4/3] sm:aspect-[16/11] max-h-[340px] sm:max-h-[380px]">
                  <div ref={imageRef} className="relative w-full h-[115%] -top-[7%]">
                    <Image
                      src="/images/muslim-wedding-couple.jpg"
                      alt="Featured Couple - Zubair & Maryam"
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/20 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 backdrop-blur-md bg-[#1e1e1e]/90 border border-[#b9965b]/30 rounded-[5px] px-2.5 py-1 flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3 h-3 text-[#e8c078]" />
                    <span className="text-[11px] font-sans-modern font-semibold text-stone-200">
                      Featured Union • Bangalore
                    </span>
                  </div>

                  {/* Bottom Verification Note */}
                  <div className="absolute bottom-3 left-3 right-3 backdrop-blur-md bg-[#1e1e1e]/95 border border-white/15 rounded-[5px] p-2.5 sm:p-3 shadow-lg space-y-0.5">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#e8c078] font-sans-modern border-b border-white/10 pb-1 mb-1">
                      <span className="font-semibold">Zubair & Maryam</span>
                      <span className="text-emerald-400 font-medium">✓ Verified Union</span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-sans-modern italic line-clamp-2">
                      &ldquo;Finding someone aligned with our deen without unrealistic demands was the greatest blessing.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Narrative & Testimonial Details */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#e8a379] text-[11px] font-semibold uppercase tracking-widest font-sans-modern">
                <Heart className="w-3 h-3 fill-[#e8a379]" />
                <span>Featured Love Story</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury tracking-tight leading-[1.2] text-[#FAF7F2]">
                A Simple Nikah Filled With{" "}
                <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                  Everlasting Barakah
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="space-y-2 text-stone-300 text-xs sm:text-sm font-sans-modern leading-relaxed">
                <p>
                  When Zubair and Maryam&apos;s families began their search on Asaan Shaadi, they had one shared priority: finding a partner with genuine compatibility and shared values, free from burdensome wedding customs.
                </p>
                <p>
                  Through our verified matchmaking service, both families connected with complete dignity and met at Bangalore Central Mosque for a quiet, beautiful Nikah with zero dowry demands.
                </p>
              </div>
            </ScrollReveal>

            {/* Quick Milestones: Compact */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1">
                <div className="p-2.5 sm:p-3 rounded-[5px] bg-[#242424] border border-white/10 space-y-0.5">
                  <span className="text-[10px] text-[#b9965b] uppercase font-sans-modern font-semibold">Step 1</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white font-serif-luxury">Verified Connect</h4>
                  <p className="text-[10px] sm:text-xs text-stone-400">100% phone checked</p>
                </div>

                <div className="p-2.5 sm:p-3 rounded-[5px] bg-[#242424] border border-white/10 space-y-0.5">
                  <span className="text-[10px] text-[#b9965b] uppercase font-sans-modern font-semibold">Step 2</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white font-serif-luxury">Comfort Chat</h4>
                  <p className="text-[10px] sm:text-xs text-stone-400">Overcame anxiety</p>
                </div>

                <div className="p-2.5 sm:p-3 rounded-[5px] bg-[#242424] border border-white/10 space-y-0.5">
                  <span className="text-[10px] text-[#b9965b] uppercase font-sans-modern font-semibold">Step 3</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white font-serif-luxury">Blessed Nikah</h4>
                  <p className="text-[10px] sm:text-xs text-stone-400">Debt-free & dignified</p>
                </div>
              </div>
            </ScrollReveal>

            {/* CTA Link */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="pt-1">
                <Link
                  href="/submit-biodata"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-[5px] bg-[#9a6a4f] hover:bg-[#b17b5d] text-white font-sans-modern font-semibold text-xs sm:text-sm transition-all shadow-md shadow-[#9a6a4f]/25 group"
                >
                  <span>Start Your Story Today</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryStorySpotlight;
