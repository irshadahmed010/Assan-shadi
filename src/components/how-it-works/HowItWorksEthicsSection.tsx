"use client";

import React from "react";
import { ShieldCheck, Lock, Ban, HeartHandshake, Sparkles, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const ETHICS = [
  {
    id: "privacy",
    icon: Lock,
    title: "Photo Privacy Shield",
    desc: "Candidates can keep photos blurred. Photos are unlocked only with explicit consent after reviewing a serious proposal note.",
    badge: "Discretion Guaranteed",
  },
  {
    id: "guardian",
    icon: ShieldCheck,
    title: "Guardian Involvement",
    desc: "We ensure parents and legal guardians are informed and involved at every step, preserving family honor, modesty, and peace of mind.",
    badge: "100% Verified Contact",
  },
  {
    id: "dowry",
    icon: Ban,
    title: "Zero Dowry Charter",
    desc: "We reject all forms of dowry (Jahez) demands and transactional mindsets that place an un-Islamic burden on bride families.",
    badge: "Sunnah-Aligned",
  },
  {
    id: "supervisor",
    icon: HeartHandshake,
    title: "Dedicated Matchmaker Support",
    desc: "Optional expert supervisor to conduct background checks, liaise between families, and arrange comfortable pre-meeting discussions.",
    badge: "Personal Guidance",
  },
];

export const HowItWorksEthicsSection: React.FC = () => {
  return (
    <section
      id="ethics-charter"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#1f1f1f] text-[#FAF7F2] overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#9a6a4f]/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative max-w-[1350px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b9965b]/15 border border-[#b9965b]/30 text-[#e8c078] text-xs font-semibold uppercase tracking-widest font-sans-modern">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Code of Ethics</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight text-[#FAF7F2]">
              Designed for Dignity, Privacy &{" "}
              <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                Mutual Respect
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
              Unlike casual dating platforms or commercial marriage bureaus, every feature on Asaan Shaadi is built around Islamic principles and family values.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ETHICS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.id}
                direction="up"
                delay={idx * 0.1}
                className="h-full"
              >
                <div className="group relative h-full bg-[#262626] hover:bg-[#2d2d2d] border border-white/10 hover:border-[#b9965b]/50 rounded-[5px] p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-[5px] bg-[#9a6a4f]/25 text-[#e8a379] flex items-center justify-center border border-[#9a6a4f]/40 group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-sans-modern font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-stone-400">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold font-serif-luxury text-[#FAF7F2] group-hover:text-[#e8c078] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-300 font-sans-modern leading-relaxed mt-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#e8c078] font-sans-modern">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#b9965b] shrink-0" />
                    <span className="font-medium text-[11px]">Strict Compliance</span>
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

export default HowItWorksEthicsSection;
