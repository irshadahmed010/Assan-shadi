import React from "react";
import { AboutPageHeader } from "@/components/about/AboutPageHeader";
import { WhoWeAreStorySection } from "@/components/about/WhoWeAreStorySection";
import { IntentionVisionMissionSection } from "@/components/about/IntentionVisionMissionSection";
import { WhatKeepsUsGoingSection } from "@/components/about/WhatKeepsUsGoingSection";
import { TwelveReasonsSection } from "@/components/about/TwelveReasonsSection";
import { PersonalizedSupervisorSection } from "@/components/about/PersonalizedSupervisorSection";
import { AboutFinalCtaSection } from "@/components/about/AboutFinalCtaSection";

export const metadata = {
  title: "Who We Are & About Us | Asaan Shaadi Matrimonial Foundation",
  description:
    "Learn about Asaan Shaadi — Bangalore-founded registered matrimonial service. Discover our intention, vision, mission, and 12 reasons why singles choose our verified matchmaking platform.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#252525] text-[#FAF7F2]">
      {/* 1. Page Header (Exact 80px height banner, mobile responsive) */}
      <AboutPageHeader />

      {/* 2. Who We Are & Bangalore Story (Our Genesis, Registered Company, Manual Checks) */}
      <WhoWeAreStorySection />

      {/* 3. Guiding Pillars of Purpose (Our Intention, Vision & Mission) */}
      <IntentionVisionMissionSection />

      {/* 4. What Keeps Us Going? (The Sacred Reality of Marriage & No Compromise) */}
      <WhatKeepsUsGoingSection />

      {/* 5. 12 Reasons Why Choose Asaan Shaadi (Interactive Category-Filtered Grid) */}
      <TwelveReasonsSection />

      {/* 6. Personalized Matchmaking & Dedicated Relationship Supervisor */}
      <PersonalizedSupervisorSection />

      {/* 7. Strong Final Call-To-Action (Begin Your Sacred Journey with Ease & Dignity) */}
      <AboutFinalCtaSection />
    </div>
  );
}
