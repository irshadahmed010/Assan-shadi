import { HeroSection } from "@/components/home/HeroSection";
import { TrustedMatchmakingSection } from "@/components/home/TrustedMatchmakingSection";
import { JourneyToNikahSection } from "@/components/home/JourneyToNikahSection";
import { OurMissionVisionSection } from "@/components/home/OurMissionVisionSection";
import { OurAdvantagesSection } from "@/components/home/OurAdvantagesSection";
import { PrivacyMattersSection } from "@/components/home/PrivacyMattersSection";
import { HappyMarriagesSection } from "@/components/home/HappyMarriagesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { MomentsOfTogethernessSection } from "@/components/home/MomentsOfTogethernessSection";
import { PersonalizedMatchmakingSection } from "@/components/home/PersonalizedMatchmakingSection";
import { BiodataSection } from "@/components/home/BiodataSection";
import { BeginYourJourneySection } from "@/components/home/BeginYourJourneySection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Luxury Hero & Search */}
      <HeroSection />

      {/* 2. Trusted Matchmaking (Why Asaan Shaadi?) */}
      <TrustedMatchmakingSection />

      {/* 3. How It Works — Your Journey to Nikah */}
      <JourneyToNikahSection />

      {/* 5. Our Purpose — Intention, Vision & Mission */}
      <OurMissionVisionSection />

      {/* 6. Why Choose Asaan Shaadi — Our Advantages */}
      <OurAdvantagesSection />

      {/* 7. Verified & Secure — Your Privacy Matters */}
      <PrivacyMattersSection />

      {/* 8. Real Stories — Happy Marriages */}
      <HappyMarriagesSection />

      {/* 9. Frequently Asked Questions (FAQ) */}
      <FaqSection />

      {/* 10. Our Gallery — Moments of Togetherness */}
      <MomentsOfTogethernessSection />

      {/* 10. Personalized Matchmaking — Expert Guidance */}
      <PersonalizedMatchmakingSection />

      {/* 11. Submit Your Biodata — Beautiful Relationship */}
      <BiodataSection />

      {/* 12. Join Our Community — Begin Your Journey */}
      <BeginYourJourneySection />
    </div>
  );
}
