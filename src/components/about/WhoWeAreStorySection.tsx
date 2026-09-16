"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ShieldCheck, MapPin, Building2, HeartHandshake, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const WhoWeAreStorySection: React.FC = () => {
  return (
    <section
      id="who-we-are"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#252525] text-[#FAF7F2] overflow-hidden border-b border-white/10"
    >
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#9a6a4f]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#b9965b]/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #b9965b 1.5px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story Content */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#FAF7F2]">
                <span className="w-2 h-2 rounded-full bg-[#b9965b] animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-semibold font-sans-modern text-[#b9965b]">
                  Who We Are • About Asaan Shaadi
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.2] text-[#FAF7F2]">
                Creating Unforgettable{" "}
                <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                  Reminiscences
                </span>{" "}
                Through Matchmaking
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="space-y-4 text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
                <p>
                  We have been creating unforgettable reminiscences through matchmaking. It all began with creating several successful marriages for family and friends in Bengaluru. To take the essence of matchmaking to succeeding level, <strong className="text-white font-semibold">Asaan Shaadi</strong> was created.
                </p>
                <p>
                  The most important element of our network is that users notice their true match through our platform. We are proud to say that several users are wedged with our online wedding portal with happy endings. Our commitment lies in serving members to meet somebody special for a long-lasting, dignified relationship. Today, Asaan Shaadi is understood as one of the highest introductions and marital services providers. We are happy to welcome you to our matchmaking network and wish you success at each step of the manner.
                </p>
                <p>
                  Asaan Shaadi is a <strong className="text-[#e8c078] font-semibold">registered and proprietary corporation primarily based in India</strong>. We are a leading matchmaking company for singles. Through our network, we wish to make the method of your relationship journey comparatively easy, respectful, and dignified. All profiles are checked manually with phone verification to ensure a secure atmosphere for our users.
                </p>
              </div>
            </ScrollReveal>

            {/* Quick Pillars Badges */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#202020] border border-white/10 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#9a6a4f]/25 text-[#e8a379] flex items-center justify-center shrink-0 border border-[#9a6a4f]/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-serif-luxury">Bengaluru Genesis</h4>
                    <p className="text-xs text-stone-400 mt-0.5">Started with family & friends</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#202020] border border-white/10 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#9a6a4f]/25 text-[#e8a379] flex items-center justify-center shrink-0 border border-[#9a6a4f]/30">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-serif-luxury">Registered Firm</h4>
                    <p className="text-xs text-stone-400 mt-0.5">Proprietary corp in India</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#202020] border border-white/10 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#9a6a4f]/25 text-[#e8a379] flex items-center justify-center shrink-0 border border-[#9a6a4f]/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-serif-luxury">Phone Verified</h4>
                    <p className="text-xs text-stone-400 mt-0.5">100% manual check</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Action buttons */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#9a6a4f] hover:bg-[#b17b5d] text-white font-sans-modern font-semibold text-sm transition-all shadow-lg shadow-[#9a6a4f]/25 group"
                >
                  <span>How It Works</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="#reasons"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white font-sans-modern font-medium text-sm border border-white/10 transition-colors"
                >
                  <span>Why Choose Us</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Couple Visual & Graphic Framing */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative Frame Glow */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#9a6a4f]/40 to-[#b9965b]/40 rounded-3xl blur-xl opacity-60" />

                {/* Main Couple Image Container */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#b9965b]/40 shadow-2xl bg-[#1e1e1e] aspect-[4/5]">
                  <Image
                    src="/images/muslim-wedding-couple.jpg"
                    alt="Happy Muslim Couple on Wedding Day - Asaan Shaadi"
                    fill
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />

                  {/* Gradient Overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b] via-[#1b1b1b]/20 to-transparent" />

                  {/* Floating Graphic Badge - Top Left */}
                  <div className="absolute top-4 left-4 backdrop-blur-md bg-[#1e1e1e]/85 border border-[#b9965b]/40 rounded-xl px-3.5 py-2 shadow-xl flex items-center gap-2.5">
                    <HeartHandshake className="w-4 h-4 text-[#e8a379]" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-stone-400 font-sans-modern">Real Connections</p>
                      <p className="text-xs font-bold text-white font-serif-luxury">Dignified & Meaningful</p>
                    </div>
                  </div>

                  {/* Floating Graphic Badge - Bottom Right */}
                  <div className="absolute bottom-5 left-5 right-5 backdrop-blur-md bg-[#1e1e1e]/90 border border-white/15 rounded-xl p-4 shadow-2xl">
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
                      <span className="text-xs font-serif-luxury font-bold text-[#e8c078]">
                        Bengaluru • Pan India • Global
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-[#a3e635] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 font-sans-modern leading-snug">
                      &ldquo;Helping sincere members meet someone special for a blessed and lasting union.&rdquo;
                    </p>
                  </div>
                </div>

                {/* Graphic Islamic Arch Pattern Accent */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border border-[#b9965b]/30 pointer-events-none hidden sm:block -z-10" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreStorySection;
