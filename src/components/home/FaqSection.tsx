"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Lock,
  HeartHandshake,
  MessageCircle,
  PhoneCall,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface FaqItem {
  id: string;
  category: "general" | "privacy" | "verification" | "pricing";
  question: string;
  answer: string;
  badge?: string;
}

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>("faq-1");
  const [activeTab, setActiveTab] = useState<string>("all");

  const faqs: FaqItem[] = [
    {
      id: "faq-1",
      category: "general",
      question: "How is Asaan Shaadi different from conventional matchmaking apps?",
      answer:
        "Asaan Shaadi is built strictly upon Islamic values and family honor. We eliminate casual dating behavior, superficial swiping, and fake profiles. Every profile is manually reviewed, guardian (Wali) involvement is prioritized, and our entire process is designed with the sole intention of facilitating a blessed, honorable Nikah.",
      badge: "Halal & Trusted",
    },
    {
      id: "faq-2",
      category: "privacy",
      question: "Can I keep photographs and personal contact numbers private?",
      answer:
        "Yes, absolutely. We offer 100% photo privacy controls, especially for sisters and private families. You can choose to keep your photo visible only to verified profiles with whom you have mutually agreed to connect. Furthermore, contact information is never made public — it is shared solely after mutual guardian consent.",
      badge: "100% Private",
    },
    {
      id: "faq-3",
      category: "verification",
      question: "How are candidate biodatas and profiles verified?",
      answer:
        "Our dedicated verification team manually inspects every submission. We verify candidate phone numbers via WhatsApp/SMS, confirm primary guardian details, and screen educational and professional credentials. Unverified or suspicious accounts are immediately rejected.",
      badge: "Manual Review",
    },
    {
      id: "faq-4",
      category: "pricing",
      question: "Do you charge expensive commissions after Nikah?",
      answer:
        "No, never. Traditional matchmaking brokers and agencies often demand large, percentage-based commissions after Nikah is finalized. Asaan Shaadi is transparent and barakah-driven: we have zero hidden fees and never charge any commission upon your wedding.",
      badge: "Zero Commission",
    },
    {
      id: "faq-5",
      category: "general",
      question: "Can overseas Pakistanis and international Muslims find a match?",
      answer:
        "Yes! We have hundreds of verified profiles from the UK, USA, Canada, UAE, Saudi Arabia, and Europe who are looking for compatible, practicing partners either in their home country or within Pakistan for relocation.",
      badge: "Worldwide",
    },
    {
      id: "faq-6",
      category: "privacy",
      question: "Who should create the profile — the candidate or the guardian?",
      answer:
        "Either can register! Most profiles on Asaan Shaadi are managed collaboratively by parents, guardians (Wali), or the candidates themselves. We mandate a verified guardian phone number so that respectable families can connect with complete reassurance.",
      badge: "Family First",
    },
    {
      id: "faq-7",
      category: "general",
      question: "What is the difference between Self-Service and Personalized Matchmaking?",
      answer:
        "Self-Service lets you browse, filter, and express interest in verified biodatas yourself. Our Personalized Matchmaking VIP service assigns a dedicated senior Matchmaker who personally handpicks compatible matches, coordinates family introductions, and facilitates respectful meetings.",
      badge: "VIP Service",
    },
  ];

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "About Platform" },
    { id: "privacy", label: "Privacy & Photos" },
    { id: "verification", label: "Verification" },
    { id: "pricing", label: "Fees & Pricing" },
  ];

  const filteredFaqs = useMemo(() => {
    if (activeTab === "all") return faqs;
    return faqs.filter((faq) => faq.category === activeTab);
  }, [activeTab]);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="faq"
      className="relative py-10 sm:py-12 lg:py-14 bg-[#FAF7F2] text-stone-900 overflow-hidden border-t border-stone-200/80"
    >
      {/* Subtle Luxury Islamic Pattern Watermark */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#b9965b 1.2px, transparent 1.2px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Region */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#b9965b]/10 border border-[#b9965b]/25 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#9a6a4f]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#9a6a4f] font-bold font-sans-modern">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight text-stone-900 leading-[1.2] mb-4">
            Have Questions?{" "}
            <span className="text-[#c88a64] italic font-serif-luxury font-medium">
              We Have Answers
            </span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base lg:text-lg font-sans-modern leading-relaxed">
            Everything you need to know about starting your journey toward a blessed Nikah
            with complete privacy, dignity, and family involvement.
          </p>

          {/* Quick Filter Tabs for Mobile & Desktop */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-6">
            {categories.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#171615] text-[#FAF7F2] shadow-md shadow-black/10 scale-[1.02]"
                      : "bg-white/80 hover:bg-white text-stone-600 border border-stone-200/80 hover:border-stone-300"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid: Accordion + Help Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* FAQ Accordion List (8 Cols on Desktop) */}
          <div className="lg:col-span-8 space-y-3.5">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`group rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-white border-[#b9965b]/40 shadow-lg shadow-[#b9965b]/5 ring-1 ring-[#b9965b]/20"
                      : "bg-white/70 hover:bg-white border-stone-200/90 hover:border-stone-300"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left transition-colors"
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-semibold transition-colors duration-200 ${
                          isOpen
                            ? "bg-[#9a6a4f] text-white"
                            : "bg-stone-100 text-stone-500 group-hover:bg-[#b9965b]/10 group-hover:text-[#9a6a4f]"
                        }`}
                      >
                        Q{index + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap mb-1">
                          <span className="font-serif-luxury font-bold text-base sm:text-lg text-stone-900 leading-snug">
                            {faq.question}
                          </span>
                          {faq.badge && (
                            <span className="inline-flex items-center text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#9a6a4f] border border-[#b9965b]/30">
                              {faq.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 bg-[#FAF7F2] text-[#9a6a4f]"
                          : "text-stone-400 group-hover:text-stone-700"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Accordion Body with smooth animation */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 pb-5 sm:pb-6 px-5 sm:px-6 pl-14 sm:pl-16"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none px-5 sm:px-6"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-stone-600 text-sm sm:text-base font-sans-modern leading-relaxed border-t border-stone-100 pt-3.5">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Sticky Support & Trust Card (4 Cols on Desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            {/* Direct Support Card */}
            <div className="rounded-3xl p-6 sm:p-7 bg-[#171615] text-[#FAF7F2] shadow-xl relative overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#b9965b]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2]/10 border border-white/15 flex items-center justify-center text-[#c88a64]">
                  <HelpCircle className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white">
                    Still have questions?
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm font-sans-modern mt-1 leading-relaxed">
                    Our dedicated marital advisors are ready to assist parents and candidates
                    with personalized guidance.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-[#c88a64] flex-shrink-0" />
                    <span>Free confidential consultation</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-[#c88a64] flex-shrink-0" />
                    <span>Assistance in Urdu & English</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-[#c88a64] flex-shrink-0" />
                    <span>Direct Guardian-to-Guardian support</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-col gap-2.5">
                  <a
                    href="https://wa.me/923000000000?text=Assalam%20o%20Alaikum,%20I%20have%20a%20question%20regarding%20Asaan%20Shaadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-emerald-950/40"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>

                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-sm transition-all duration-200"
                  >
                    <PhoneCall className="w-4 h-4 text-[#c88a64]" />
                    Contact Support Team
                  </Link>
                </div>
              </div>
            </div>

            {/* Halal Guarantee Trust Badge */}
            <div className="rounded-2xl p-5 bg-white border border-stone-200/90 shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#b9965b]/10 border border-[#b9965b]/20 flex items-center justify-center text-[#9a6a4f] flex-shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-serif-luxury text-stone-900">
                  Sunnah-Aligned Commitment
                </h4>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed font-sans-modern">
                  No hidden fees, no dating culture. Only serious, blessed unions conducted with
                  utmost dignity and transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
