import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { FileText, UserCheck, MessageSquareHeart, Church, ArrowRight } from "lucide-react";

export const HowItWorksSteps: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: FileText,
      title: "Register Biodata",
      desc: "Fill out a dignified biodata highlighting educational background, profession, family values, and partner expectations.",
    },
    {
      num: "02",
      icon: UserCheck,
      title: "Guardian Verification",
      desc: "Our verification team validates the parent/guardian phone number and credentials to preserve trust and security.",
    },
    {
      num: "03",
      icon: MessageSquareHeart,
      title: "Dignified Inquiries",
      desc: "Browse compatible matches and send structured proposal notes. No casual chatrooms or superficial swiping.",
    },
    {
      num: "04",
      icon: Church,
      title: "Family Meeting & Nikah",
      desc: "Families connect directly with mutual respect, arrange meetings, and proceed to a simple, blessed Nikah.",
    },
  ];

  return (
    <section className="py-24 bg-[#252525] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <SectionHeading
            badge="The Process"
            title="How Assan Shadi Works"
            subtitle="A transparent, 4-step path designed for parents, candidates, and guardians."
          />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal
                key={step.num}
                direction="up"
                delay={idx * 0.15}
                className="relative bg-[#1e1e1e] p-8 rounded-3xl border border-white/10 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold font-serif-luxury text-[#B9965B]">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B9965B] shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-[#FAF7F2] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed font-sans-modern">{step.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal direction="up" delay={0.4} className="mt-16 text-center">
          <div className="glass-card rounded-3xl p-8 max-w-3xl mx-auto border border-[#9a6a4f]/20 bg-gradient-to-r from-[#9a6a4f] to-[#493831] text-white shadow-xl">
            <h3 className="text-2xl font-bold font-serif-luxury">
              Ready to begin your journey with dignity?
            </h3>
            <p className="mt-2 text-sm text-[#f5ede6]/90 max-w-xl mx-auto font-sans-modern">
              Join hundreds of respected families who have chosen simplicity and sincerity over commercial matchmaking.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 font-sans-modern">
              <Link href="/submit-biodata">
                <Button variant="gold" size="lg" className="font-semibold text-[#171615]">
                  Get in Touch
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
