"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const FAQS = [
  {
    id: "verify",
    q: "How does Asaan Shaadi verify candidates and guardians?",
    a: "Our moderation team manually verifies contact numbers and candidate credentials before marking any profile as verified. This ensures serious individuals and legitimate guardians on our platform.",
  },
  {
    id: "photo",
    q: "Can I keep my daughter's or my own photograph private?",
    a: "Yes. You can toggle photo privacy during registration. Your photo will remain safely blurred and will only be revealed with your explicit consent to genuine, verified matches.",
  },
  {
    id: "fees",
    q: "What is your fee and payment structure?",
    a: "We charge an initial registration fee, and upon successful marriage settlement (marriage fix time), a predetermined mutually agreed fixed amount is charged. Everything is discussed transparently upfront.",
  },
  {
    id: "supervisor",
    q: "What is the role of an assigned Marriage Supervisor?",
    a: "An expert supervisor assists with background verification, liaises between prospective families, arranges introductory chats/video calls, and coordinates the first respectful meeting.",
  },
  {
    id: "pre-chat",
    q: "Can candidates talk or video call before the first physical meeting?",
    a: "Yes. We support respectful introductory text and video interactions to help both candidates overcome anxiety and establish mutual compatibility before formal family meetings.",
  },
];

export const HowItWorksFaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("verify");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="how-it-works-faq"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#252525] text-[#FAF7F2] overflow-hidden border-b border-white/10"
    >
      <div className="relative max-w-[1000px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#e8a379] text-xs font-semibold uppercase tracking-widest font-sans-modern">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury tracking-tight text-[#FAF7F2]">
              Frequently Asked{" "}
              <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                Questions
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
              Everything you need to know about our verified matchmaking process.
            </p>
          </ScrollReveal>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <ScrollReveal key={faq.id} direction="up" delay={idx * 0.08}>
                <div
                  className={`rounded-[5px] border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-[#282828] border-[#b9965b]/50 shadow-lg"
                      : "bg-[#202020] border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold font-serif-luxury text-[#FAF7F2]">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                        isOpen
                          ? "bg-[#9a6a4f] text-white border-[#9a6a4f] rotate-180"
                          : "bg-white/5 text-stone-400 border-white/10"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-stone-300 font-sans-modern leading-relaxed border-t border-white/5 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksFaqSection;
