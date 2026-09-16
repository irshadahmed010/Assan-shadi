import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ShieldCheck, EyeOff, Ban, HeartHandshake, Award, Clock } from "lucide-react";

export const WhyAsaanShaadi: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "100% Guardian Verified",
      desc: "Every biodata is validated with CNIC and verified parent/guardian contacts to eliminate fake profiles and ensure serious matrimonial intent.",
      color: "text-[#9a6a4f] bg-[#f5ede6]",
    },
    {
      icon: EyeOff,
      title: "Strict Photo Privacy",
      desc: "Honor modesty with privacy blurring. Profiles can lock their photographs so they are only visible upon explicit guardian authorization.",
      color: "text-[#B9965B] bg-[#F3EAD9]",
    },
    {
      icon: Ban,
      title: "Zero Dowry Culture",
      desc: "We take a firm stand against extravagant dowry demands (jahez) and unrealistic social pressures, making marriage blessed and debt-free.",
      color: "text-[#9a6a4f] bg-[#f5ede6]",
    },
    {
      icon: HeartHandshake,
      title: "Direct Family Contact",
      desc: "No extortionate matchmaking commission agents. Families connect with dignity, transparency, and mutual respect.",
      color: "text-[#B9965B] bg-[#F3EAD9]",
    },
    {
      icon: Award,
      title: "Sunnah Aligned Ethics",
      desc: "Structured according to Islamic principles of simplicity (Asaan Shaadi), compatibility (Kafa'ah), and mutual compassion.",
      color: "text-[#9a6a4f] bg-[#f5ede6]",
    },
    {
      icon: Clock,
      title: "Fast & Respectful Moderation",
      desc: "Dedicated advisory council reviews every proposal note within 24 hours to ensure high respect and zero spam.",
      color: "text-[#B9965B] bg-[#F3EAD9]",
    },
  ];

  return (
    <section className="py-24 bg-[#252525] border-y border-white/10 text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <SectionHeading
            badge="Our Ethical Standard"
            title="Why Dignified Families Choose Asaan Shaadi"
            subtitle="Breaking the commercialization of marriage to bring back simplicity, honor, and barakah."
          />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.title}
                direction="up"
                delay={idx * 0.1}
                className="bg-[#1e1e1e] rounded-3xl p-8 border border-white/10 shadow-lg card-hover-effect flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-[#B9965B] flex items-center justify-center mb-6 shadow-inner"
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-[#FAF7F2] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed font-sans-modern">{item.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
