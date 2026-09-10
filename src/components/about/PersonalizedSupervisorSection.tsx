"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UserCheck,
  ShieldCheck,
  CalendarCheck,
  MessageSquare,
  Sparkles,
  PhoneCall,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const PersonalizedSupervisorSection: React.FC = () => {
  return (
    <section
      id="personalized-supervisor"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#252525] text-[#FAF7F2] overflow-hidden border-b border-white/10"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#9a6a4f]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#b9965b]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Supervisor Feature Spotlight */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b9965b]/15 border border-[#b9965b]/30 text-[#e8c078] text-xs font-semibold uppercase tracking-widest font-sans-modern">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated Relationship Care</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.2] text-[#FAF7F2]">
                Personalized Matchmaking &{" "}
                <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                  Expert Supervisors
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
                Finding a life partner shouldn’t be a solitary or stressful burden. With Asaan Shaadi’s <strong className="text-white font-semibold">Personalized Muslim Matchmaking</strong>, you are paired with a dedicated relationship supervisor who conducts background verification, liaises with matching candidates, and coordinates each step with utmost dignity.
              </p>
            </ScrollReveal>

            {/* 4 Supervisor Workflow Steps */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#1e1e1e] border border-white/10 space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-[#9a6a4f]/25 text-[#e8a379] flex items-center justify-center border border-[#9a6a4f]/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-serif-luxury">Background Verification</h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans-modern">
                    Supervisor verifies details and ensures complete neutrality before presenting prospective profiles.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1e1e1e] border border-white/10 space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-[#9a6a4f]/25 text-[#e8a379] flex items-center justify-center border border-[#9a6a4f]/30">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-serif-luxury">Hand-Picked Matching</h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans-modern">
                    Tailored search matching your exact family values, education, lifestyle, and preferences.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1e1e1e] border border-white/10 space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-[#9a6a4f]/25 text-[#e8a379] flex items-center justify-center border border-[#9a6a4f]/30">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-serif-luxury">Pre-Meeting Comfort Chats</h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans-modern">
                    Safe introductory text/video discussions to reduce initial anxiety and awkwardness.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1e1e1e] border border-white/10 space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-[#9a6a4f]/25 text-[#e8a379] flex items-center justify-center border border-[#9a6a4f]/30">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-serif-luxury">1st Meeting Coordination</h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans-modern">
                    Supervisor facilitates respectful mutual family introductions and arranges the first face-to-face meet.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Supervisor Quote / Note */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="p-4 rounded-xl bg-[#2a2420] border border-[#9a6a4f]/40 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#9a6a4f] text-white flex items-center justify-center shrink-0 shadow-md">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-white font-sans-modern">
                    Want an expert to guide your rishta search?
                  </p>
                  <p className="text-xs text-[#e8c078] font-sans-modern">
                    Request a consultation with an Asaan Shaadi Marriage Supervisor today.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Expert Guidance Couple Image */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#9a6a4f]/40 to-[#b9965b]/40 rounded-3xl blur-xl opacity-60" />

                {/* Main Card */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#b9965b]/40 shadow-2xl bg-[#1e1e1e] aspect-[4/5]">
                  <Image
                    src="/images/expert-guidance-consultation.jpg"
                    alt="Couple Receiving Matrimonial Guidance - Asaan Shaadi"
                    fill
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/25 to-transparent" />

                  {/* Floating Graphic Badge */}
                  <div className="absolute top-4 right-4 backdrop-blur-md bg-[#1e1e1e]/85 border border-[#b9965b]/30 rounded-xl px-3.5 py-2 shadow-lg flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-stone-400 font-sans-modern">Verified</p>
                      <p className="text-xs font-bold text-white font-serif-luxury">Direct Guardian Contact</p>
                    </div>
                  </div>

                  {/* Floating Metric Card */}
                  <div className="absolute bottom-5 left-5 right-5 backdrop-blur-md bg-[#1e1e1e]/90 border border-white/15 rounded-xl p-4 shadow-2xl">
                    <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2 mb-2">
                      <span className="font-serif-luxury font-bold text-[#e8c078]">
                        Assigned Supervisor Support
                      </span>
                      <span className="text-stone-300 font-sans-modern">End-to-End</span>
                    </div>
                    <p className="text-xs text-stone-300 font-sans-modern leading-relaxed">
                      &ldquo;They will ensure you do not compromise on any aspects while finding your life partner.&rdquo;
                    </p>
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

export default PersonalizedSupervisorSection;
