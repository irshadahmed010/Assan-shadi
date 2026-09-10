import React from "react";
import { HowItWorksPageHeader } from "@/components/how-it-works/HowItWorksPageHeader";
import { HowItWorksStepsSection } from "@/components/how-it-works/HowItWorksStepsSection";
import { HowItWorksEthicsSection } from "@/components/how-it-works/HowItWorksEthicsSection";
import { HowItWorksFaqSection } from "@/components/how-it-works/HowItWorksFaqSection";
import { HowItWorksCtaSection } from "@/components/how-it-works/HowItWorksCtaSection";

export const metadata = {
  title: "How It Works | Assan Shadi Matrimonial Process",
  description:
    "Learn how Assan Shadi connects families through 4 simple steps: Free profile creation, 100% phone verification, compatible matching, and respectful Nikah introductions.",
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#252525] text-[#FAF7F2]">
      {/* 1. 80px Page Header Banner */}
      <HowItWorksPageHeader />

      {/* 2. 4-Step Nikah Roadmap */}
      <HowItWorksStepsSection />

      {/* 3. Core Ethics & Trust Charter */}
      <HowItWorksEthicsSection />

      {/* 4. Frequently Asked Questions */}
      <HowItWorksFaqSection />

      {/* 5. Strong Final Call-To-Action */}
      <HowItWorksCtaSection />
    </div>
  );
}
