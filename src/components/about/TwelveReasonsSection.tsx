"use client";

import React, { useState } from "react";
import {
  Zap,
  UserCheck,
  ShieldCheck,
  Users,
  Video,
  CheckCircle2,
  Coins,
  Scale,
  Sparkles,
  Sliders,
  Award,
  Globe2,
  ChevronRight,
  Filter,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ReasonItem {
  id: number;
  number: string;
  category: "process" | "security" | "personalized" | "value";
  categoryLabel: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ElementType;
  highlight: string;
}

const REASONS: ReasonItem[] = [
  {
    id: 1,
    number: "01",
    category: "process",
    categoryLabel: "Process & Database",
    title: "Easy and Quick",
    subtitle: "Vast database of bride & groom profiles",
    desc: "Asaan Shaadi offers a vast database of bride and groom profiles. Simply provide your basic information and discover matching profiles based on your preferences.",
    icon: Zap,
    highlight: "Countless matching profiles at your fingertips",
  },
  {
    id: 2,
    number: "02",
    category: "process",
    categoryLabel: "Easy Onboarding",
    title: "Simple Registration",
    subtitle: "Quick setup with basic facts to start",
    desc: "Registration is simple and quick. Add your basic details and preferences to find better matches. You can also update your search criteria anytime.",
    icon: UserCheck,
    highlight: "Update criteria anytime as your priorities evolve",
  },
  {
    id: 3,
    number: "03",
    category: "security",
    categoryLabel: "Privacy & Protection",
    title: "Most Secured",
    subtitle: "Complete privacy tools & zero misuse policy",
    desc: "Your personal information is kept safe and private. We use privacy controls to protect your details and never share them without your permission.",
    icon: ShieldCheck,
    highlight: "Information protected with strict privacy controls",
  },
  {
    id: 4,
    number: "04",
    category: "security",
    categoryLabel: "Genuine Members",
    title: "Serious Seekers",
    subtitle: "Not a dating site — pure matrimonial intent",
    desc: "Asaan Shaadi is focused on serious matrimonial relationships, connecting genuine individuals who are looking for a life partner.",
    icon: Users,
    highlight: "100% focused on sacred marital unions",
  },
  {
    id: 5,
    number: "05",
    category: "personalized",
    categoryLabel: "Comfort & Communication",
    title: "Easily Approachable",
    subtitle: "Text & video chats before the first meeting",
    desc: "Connect through text or video calls before meeting in person. This helps both individuals feel comfortable and reduce first-meeting anxiety.",
    icon: Video,
    highlight: "Reduces anxiety & builds natural comfort",
  },
  {
    id: 6,
    number: "06",
    category: "value",
    categoryLabel: "Personal Freedom",
    title: "No Compromise",
    subtitle: "Find someone matching your exact ideals",
    desc: "Search for a partner who matches your values and preferences. Take your time, explore suitable profiles, and choose with confidence.",
    icon: CheckCircle2,
    highlight: "Never settle for less than your core values",
  },
  {
    id: 7,
    number: "07",
    category: "value",
    categoryLabel: "Affordability",
    title: "Highly Affordable",
    subtitle: "Transparent plans with weekly & monthly add-ons",
    desc: "Choose from affordable membership plans and flexible add-ons. Even with a free account, you can easily search for suitable candidates.",
    icon: Coins,
    highlight: "Free profile browsing with economical upgrades",
  },
  {
    id: 8,
    number: "08",
    category: "security",
    categoryLabel: "Integrity",
    title: "Neutrality & Truth",
    subtitle: "Zero exaggeration & thorough background verification",
    desc: "We believe in honest and transparent profiles. Background verification helps ensure accurate information for a safer matchmaking experience.",
    icon: Scale,
    highlight: "Committed to transparent, unfiltered truth",
  },
  {
    id: 9,
    number: "09",
    category: "personalized",
    categoryLabel: "Dedicated Service",
    title: "Personalized Muslim Matchmaking",
    subtitle: "Assigned expert supervisor for end-to-end guidance",
    desc: "Get personalized Muslim matchmaking support with an expert supervisor who helps verify prospective profiles and understand your preferences.",
    icon: Sparkles,
    highlight: "Personal supervisor manages verification & criteria",
  },
  {
    id: 10,
    number: "10",
    category: "personalized",
    categoryLabel: "Flexibility",
    title: "Customization Alternative",
    subtitle: "Subtle matches, refined criteria & direct contact info",
    desc: "Choose personalized services for refined matches, better search results, and access to verified contact information of suitable profiles.",
    icon: Sliders,
    highlight: "Tailored matchmaking tuned to your specific family needs",
  },
  {
    id: 11,
    number: "11",
    category: "personalized",
    categoryLabel: "Consultant Care",
    title: "Expert Advice & 1st Meeting",
    subtitle: "Supervisor coordinates introductions & fixes 1st meet",
    desc: "A dedicated supervisor helps manage your profile, connects with suitable members, and coordinates the first meeting for a smooth introduction.",
    icon: Award,
    highlight: "Smooth, respectful introductions without family stress",
  },
  {
    id: 12,
    number: "12",
    category: "value",
    categoryLabel: "Open Community",
    title: "Open & Free Platform",
    subtitle: "Free registration for all eligible individuals",
    desc: "Anyone of marriageable age can register regardless of community, caste, or profession. Creating a profile is completely free.",
    icon: Globe2,
    highlight: "Zero cost to create profile • Open to all dignified singles",
  },
];

type CategoryFilter = "all" | "process" | "security" | "personalized" | "value";

export const TwelveReasonsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filteredReasons =
    activeFilter === "all"
      ? REASONS
      : REASONS.filter((item) => item.category === activeFilter);

  return (
    <section
      id="reasons"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#1f1f1f] text-[#FAF7F2] overflow-hidden border-b border-white/10"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/3 w-[600px] h-[300px] bg-[#9a6a4f]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#b9965b]/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#e8a379] text-xs font-semibold uppercase tracking-widest font-sans-modern">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Choose Asaan Shaadi</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight text-[#FAF7F2]">
              12 Reasons Why You Must Choose{" "}
              <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                Asaan Shaadi
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-stone-300 text-sm sm:text-base font-sans-modern leading-relaxed">
              From Bangalore to nationwide communities, discover why thousands trust our dignified matrimonial platform to find their life companion on their own terms.
            </p>
          </ScrollReveal>

          {/* Interactive Category Filter Pills */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                { id: "all", label: "All" },
                { id: "process", label: "Easy & Quick Process" },
                { id: "security", label: "Privacy & Security" },
                { id: "personalized", label: "Personalized Supervisor" },
                { id: "value", label: "Affordability & Freedom" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveFilter(btn.id as CategoryFilter)}
                  className={`px-4 py-2 rounded-full text-xs font-sans-modern font-semibold transition-all duration-200 border ${
                    activeFilter === btn.id
                      ? "bg-[#9a6a4f] text-white border-[#9a6a4f] shadow-md shadow-[#9a6a4f]/30"
                      : "bg-[#282828] text-stone-300 border-white/10 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* 12 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <ScrollReveal
                key={reason.id}
                direction="up"
                delay={(idx % 3) * 0.1}
                className="h-full"
              >
                <div className="group relative h-full bg-[#262626] hover:bg-[#2c2c2c] border border-white/10 hover:border-[#b9965b]/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1.5">
                  {/* Top bar with number and category */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-2xl font-bold font-serif-luxury text-[#e8a379]/80 group-hover:text-[#e8c078] transition-colors">
                      {reason.number}
                    </span>
                    <span className="text-[10px] font-sans-modern uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-stone-400 group-hover:text-stone-300">
                      {reason.categoryLabel}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#9a6a4f]/20 group-hover:bg-[#9a6a4f]/30 border border-[#9a6a4f]/40 flex items-center justify-center text-[#e8a379] group-hover:scale-105 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold font-serif-luxury text-[#FAF7F2] group-hover:text-[#e8c078] transition-colors">
                        {reason.title}
                      </h3>
                      <p className="text-xs font-sans-modern text-[#b9965b] font-medium mt-0.5">
                        {reason.subtitle}
                      </p>
                    </div>

                    <p className="text-stone-300 text-xs sm:text-sm font-sans-modern leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>

                  {/* Bottom Highlight Feature Tag */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-sans-modern text-stone-300 group-hover:text-[#e8c078] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#b9965b] shrink-0" />
                    <span className="font-medium text-[11px] sm:text-xs">
                      {reason.highlight}
                    </span>
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

export default TwelveReasonsSection;
