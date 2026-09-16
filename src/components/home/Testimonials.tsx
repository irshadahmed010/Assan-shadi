import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Quote, Star } from "lucide-react";

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      quote:
        "Asaan Shaadi restored our faith in matrimonial platforms. We had grown tired of matchmakers asking for lakhs in advance. Here, we found an educated, respectful boy for our daughter within 3 months with complete privacy.",
      author: "Tariq Mehmood & Family",
      location: "Bengaluru, Karnataka",
      match: "Married in Dec 2025 • Software Engineer & Doctor",
    },
    {
      quote:
        "The zero-dowry charter is what won my heart. As an NRI professional, I wanted a partner who values character, deen, and simple family life. Asaan Shaadi's guardian verification ensured everything was 100% authentic.",
      author: "Saad & Mahnoor",
      location: "Dubai & Hyderabad",
      match: "Married in Jan 2026 • Supply Chain Manager & Architect",
    },
    {
      quote:
        "The photo privacy option gave my daughter complete peace of mind. Only families with verified credentials and serious proposal notes could request contact. Truly a blessing for dignified families.",
      author: "Mrs. Farzana Begum (Mother)",
      location: "Mumbai, Maharashtra",
      match: "Nikah completed • Alhamdulillah",
    },
  ];

  return (
    <section className="py-24 bg-[#252525] border-t border-white/10 text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <SectionHeading
            badge="Blessed Unions"
            title="Stories of Pure & Simple Nikah"
            subtitle="Hear from families who chose mutual respect, simplicity, and sunnah over extravagant social pressures."
          />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <ScrollReveal
              key={rev.author}
              direction="up"
              delay={idx * 0.15}
              className="bg-[#1e1e1e] rounded-3xl p-8 border border-white/10 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#B9965B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B9965B] text-[#B9965B]" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#B9965B]/40" />
                <p className="text-sm text-[#FAF7F2]/90 leading-relaxed italic font-sans-modern">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <h4 className="font-bold font-serif-luxury text-[#FAF7F2] text-base">
                  {rev.author}
                </h4>
                <p className="text-xs text-[#B9965B] font-medium font-sans-modern">{rev.location}</p>
                <p className="text-[11px] text-stone-400 mt-0.5 font-sans-modern">{rev.match}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
