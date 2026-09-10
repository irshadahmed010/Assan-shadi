"use client";

import React from "react";
import { Target, Compass, Sparkles, Award, ShieldCheck, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Binoculars Icon for Vision
const BinocularsIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="6.5" cy="15.5" r="3.5" />
    <circle cx="17.5" cy="15.5" r="3.5" />
    <path d="M14 15.5a3.5 3.5 0 0 0-4 0" />
    <path d="M7 12V7a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v5" />
    <path d="M14.5 12V7a1 1 0 0 1 1-1H17a1 1 0 0 1 1 1v5" />
    <path d="M10.5 8h3" />
  </svg>
);

// Mountain Flag Icon for Mission
const MountainFlagIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2.5v5" />
    <path d="M12 3l4.5 2L12 7" />
    <path d="M3.5 21l8.5-13.5 8.5 13.5H3.5z" />
    <path d="M9 14.5l3-2.5 3 2.5" />
  </svg>
);

export const IntentionVisionMissionSection: React.FC = () => {
  const pillars = [
    {
      id: "intention",
      badge: "Core Foundation",
      title: "Our Intention",
      icon: Target,
      tagline: "Connecting with Your Choice",
      desc: "From the first stages it's been our goal to assist you connect with somebody of your selection. For an extended lasting relationship of your dreams. Our method is a fusion of recent matchmaking principles with integration of contemporary technology.",
      highlight: "Fusion of classic ethics & modern technology",
      accent: "from-[#9a6a4f]/25 to-[#b9965b]/20",
      borderColor: "hover:border-[#e8a379]",
    },
    {
      id: "vision",
      badge: "Future Outlook",
      title: "Our Vision",
      icon: BinocularsIcon,
      tagline: "No.1 Matrimonial Platform",
      desc: "To be the No.1 in our niche and introduce new options useful to members. To continue to grow with a loyal and increasing client network across the world.",
      highlight: "Global network of dignified singles & families",
      accent: "from-[#b9965b]/25 to-[#9a6a4f]/20",
      borderColor: "hover:border-[#e8c078]",
    },
    {
      id: "mission",
      badge: "Action Blueprint",
      title: "Our Mission",
      icon: MountainFlagIcon,
      tagline: "Convenience & Safe Matchmaking",
      desc: "To help you progress nearer to the specified outcome with convenience. To produce a secure progressive matchmaking platform. Supply new matchmaking options to fulfill member expectations and ensure continuing growth in our membership base around the world.",
      highlight: "Progressive, secure, outcome-oriented journey",
      accent: "from-[#9a6a4f]/25 to-[#b9965b]/20",
      borderColor: "hover:border-[#e8a379]",
    },
  ];

  return (
    <section
      id="mission-vision"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#1f1f1f] text-[#FAF7F2] overflow-hidden border-b border-white/10"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#9a6a4f]/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b9965b]/15 border border-[#b9965b]/30 text-[#e8c078] text-xs font-semibold uppercase tracking-widest font-sans-modern">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Asaan Shaadi Advantages</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight text-[#FAF7F2]">
              Our Guiding{" "}
              <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                Pillars of Purpose
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
              Every feature and service at Asaan Shaadi is anchored in deep ethical commitment, genuine compatibility, and world-class technological convenience.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 Luxury Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.id} direction="up" delay={idx * 0.15}>
                <div
                  className={`group relative h-full bg-[#262626] border border-white/10 ${pillar.borderColor} rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-400 shadow-xl hover:shadow-2xl hover:-translate-y-2 overflow-hidden`}
                >
                  {/* Subtle top gradient accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.accent}`}
                  />

                  {/* Top content */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-14 h-14 rounded-xl bg-[#9a6a4f]/25 group-hover:bg-[#9a6a4f]/35 border border-[#9a6a4f]/50 flex items-center justify-center text-[#e8a379] group-hover:text-white transition-all duration-300 shadow-md">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-sans-modern uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-stone-400 font-medium">
                        {pillar.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold font-serif-luxury text-[#FAF7F2] group-hover:text-[#e8c078] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#b9965b] font-sans-modern font-semibold uppercase tracking-wider mt-1">
                        {pillar.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-stone-300 font-sans-modern leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Bottom Highlight Tag */}
                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2 text-xs text-[#e8c078] font-sans-modern">
                    <ShieldCheck className="w-4 h-4 text-[#b9965b] shrink-0" />
                    <span className="font-medium">{pillar.highlight}</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IntentionVisionMissionSection;
