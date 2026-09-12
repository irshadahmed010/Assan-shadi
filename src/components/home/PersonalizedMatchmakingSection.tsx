"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  UserCheck,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  MessageCircle,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  X,
  Send,
} from "lucide-react";

export const PersonalizedMatchmakingSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "Candidate (Self)",
    city: "",
    notes: "",
  });

  const conciergePillars = [
    {
      id: "dedicated-advisor",
      title: "1-on-1 Dedicated Family Advisor",
      desc: "A seasoned Islamic matrimonial counselor who personally understands your family values, religious outlook, education, and lifestyle expectations.",
      icon: UserCheck,
    },
    {
      id: "curated-vetting",
      title: "Handpicked & Pre-Vetted Proposals",
      desc: "No public listings or casual swiping. Receive confidential, guardian-verified matches hand-selected exclusively for you.",
      icon: HeartHandshake,
    },
    {
      id: "absolute-discretion",
      title: "Complete Privacy & Photo Shield",
      desc: "Your identity, profession, and photos remain strictly private. They are only disclosed to mutual matches after explicit consent.",
      icon: ShieldCheck,
    },
    {
      id: "family-coordination",
      title: "Dignified Family Facilitation",
      desc: "From initial guardian inquiries to respectful video consultations and meetings, we provide polite, comfortable facilitation at every milestone.",
      icon: Sparkles,
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Confidential Intake",
      desc: "A deep consultation to document criteria, values & sunnah priorities.",
    },
    {
      step: "02",
      title: "Bespoke Curation",
      desc: "Handpicked review of verified candidates from our private circle.",
    },
    {
      step: "03",
      title: "Guided Introduction",
      desc: "Polite guardian introduction with complete respect and dignity.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        name: "",
        phone: "",
        role: "Candidate (Self)",
        city: "",
        notes: "",
      });
    }, 2500);
  };

  return (
    <section
      id="personalized-matchmaking"
      className="relative py-10 lg:py-14 bg-[#171615] text-[#FAF7F2] overflow-hidden border-t border-white/10"
    >
      {/* Ambient Warm Golden & Amber Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#9a6a4f]/12 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] rounded-full bg-[#b9965b]/12 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Region */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-14 lg:mb-16">
          {/* Left: Eyebrow + Title + Subtitle */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-3.5">
              <span className="w-10 h-[2px] bg-gradient-to-r from-[#FFD78A] to-[#f59e0b]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FFD78A] font-bold font-sans-modern flex items-center gap-2">
                <span>CONCIERGE &amp; ADVISORY</span>
                <Sparkles className="w-3.5 h-3.5 text-[#FFD78A]" />
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.15] text-white mb-4">
              Personalized Matchmaking —{" "}
              <span className="text-[#FFD78A] font-medium italic font-serif-luxury">
                Expert Guidance
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-stone-200 text-sm sm:text-base lg:text-lg font-sans-modern leading-relaxed">
              For distinguished families, busy professionals, and overseas individuals who
              prefer a discreet, sunnah-aligned, and assisted journey to finding a spouse.
            </p>
          </div>

          {/* Right Poetic Callouts */}
          <div className="flex items-start gap-8 lg:gap-12 self-start">
            {/* Poetic Quote */}
            <div className="text-stone-100">
              <p className="font-serif-luxury italic text-lg sm:text-xl text-[#FFD78A] leading-tight">
                “Guidance with Wisdom,
                <br />
                Matches Built
                <br />
                on Faith”
              </p>
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#FFD78A] to-[#f59e0b] mt-3" />
            </div>

            {/* Slogan */}
            <div className="hidden xl:block text-stone-300 pl-6 border-l border-white/15">
              <p className="font-serif-luxury italic text-sm text-stone-300 leading-tight">
                Bespoke
                <br />
                Confidential
                <br />
                Sunnah-Aligned
              </p>
              <div className="w-8 h-[1.5px] bg-[#FFD78A]/60 mt-2.5" />
            </div>
          </div>
        </div>

        {/* Main Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          {/* Left Column: 4 Pillars & CTAs */}
          <div className="lg:col-span-7 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {conciergePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    className="group relative bg-[#242220]/95 hover:bg-[#2b2724] border border-white/15 hover:border-[#FFD78A]/60 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#c2794c]/20 flex flex-col justify-between backdrop-blur-md overflow-hidden"
                  >
                    {/* Top Icon & Title */}
                    <div>
                      <div className="w-12 h-12 rounded-full bg-[#c2794c]/20 group-hover:bg-[#c2794c]/35 border border-[#c2794c]/50 group-hover:border-[#FFD78A]/60 flex items-center justify-center text-[#FFD78A] group-hover:text-white transition-all duration-300 mb-4 shadow-sm">
                        <Icon className="w-5 h-5 stroke-[1.9] transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <h3 className="text-base font-bold font-serif-luxury text-white tracking-wide group-hover:text-[#FFD78A] transition-colors mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-stone-200 text-xs sm:text-sm font-sans-modern leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    {/* Bottom Accent Glow Line */}
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFD78A]/0 to-transparent group-hover:via-[#FFD78A] transition-all duration-500 mt-4" />
                  </div>
                );
              })}
            </div>

            {/* Action Bar: Book Consultation & WhatsApp Hotline */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#quick-profile"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("quick-profile") || document.getElementById("register");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = "/#quick-profile";
                  }
                }}
                className="relative inline-flex items-center justify-center gap-2.5 btn-primary-glow text-white font-sans-modern font-semibold px-8 py-3.5 rounded-[6px] transition-all duration-300 group text-sm sm:text-base tracking-wide overflow-hidden cursor-pointer"
              >
                {/* Shimmer effect */}
                <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-in-out pointer-events-none" />
                <span className="relative z-10">Request Private Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10" />
              </a>

              <a
                href="https://wa.me/919620078691?text=Assalam-o-Alaikum,%20I%20am%20inquiring%20about%20Personalized%20Matchmaking%20Consultancy."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[6px] border border-white/25 hover:border-[#FFD78A]/70 bg-white/10 hover:bg-white/15 text-stone-100 hover:text-white font-sans-modern text-sm sm:text-base font-semibold transition-all duration-300 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Advisor Hotline</span>
              </a>
            </div>
          </div>

          {/* Right Column: Luxury Consultation Visual & Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group bg-[#242220]">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full">
                <Image
                  src="/images/expert-guidance-consultation.jpg"
                  alt="Personalized Islamic matrimonial consultation salon"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171615]/90 via-[#171615]/20 to-transparent" />
              </div>

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 bg-black/65 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-[#b9965b]" />
                <span className="text-xs font-semibold text-white font-sans-modern tracking-wide">
                  100% Confidential Guardian Review
                </span>
              </div>

              {/* Floating Bottom Card Over Image */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#1c1a18]/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#9a6a4f]/25 border border-[#b9965b]/50 flex items-center justify-center text-[#e8a379]">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-serif-luxury text-white">
                        Direct Family Consultation
                      </h4>
                      <p className="text-xs text-stone-300 font-sans-modern">
                        Discreet matchmaking across Pakistan &amp; Overseas
                      </p>
                    </div>
                  </div>
                  <div className="text-right pl-3 border-l border-white/10 hidden sm:block">
                    <span className="text-lg font-bold font-serif-luxury text-[#c88a64]">
                      94%
                    </span>
                    <p className="text-[10px] text-stone-400 font-sans-modern uppercase tracking-wider">
                      Family Harmony
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Steps: The Guided Journey */}
        <div className="pt-10 border-t border-white/15">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD78A] font-sans-modern">
              HOW CONCIERGE WORKS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white mt-1">
              Your 3-Step Journey to Nikah
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, idx) => (
              <div
                key={s.step}
                className="relative bg-[#242220]/90 border border-white/15 rounded-2xl p-6 transition-all duration-300 hover:border-[#FFD78A]/60 hover:bg-[#282622]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold font-serif-luxury text-[#FFD78A]">
                    {s.step}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-[#FFD78A] font-bold font-mono">
                    Phase {idx + 1}
                  </span>
                </div>
                <h4 className="text-base font-bold font-serif-luxury text-white mb-2">
                  {s.title}
                </h4>
                <p className="text-stone-200 text-xs sm:text-sm font-sans-modern leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Consultation Request Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[#1c1a18] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#FAF7F2]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close consultation modal"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {formSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold font-serif-luxury text-white">
                  JazakAllah Khair
                </h4>
                <p className="text-sm text-stone-300 font-sans-modern max-w-sm mx-auto leading-relaxed">
                  Your private consultation request has been received. Our senior advisor
                  will reach out discreetly within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#b9965b] font-semibold font-sans-modern">
                    DISCREET &amp; CONFIDENTIAL
                  </span>
                  <h3 className="text-2xl font-bold font-serif-luxury text-white mt-1">
                    Book Private Consultation
                  </h3>
                  <p className="text-xs text-stone-400 font-sans-modern mt-1">
                    Speak directly with a senior matrimonial advisor.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5 font-sans-modern">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full bg-[#282624] border border-white/15 focus:border-[#b9965b] rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-[#b9965b] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1.5 font-sans-modern">
                        WhatsApp / Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+92 300 0000000"
                        className="w-full bg-[#282624] border border-white/15 focus:border-[#b9965b] rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-[#b9965b] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1.5 font-sans-modern">
                        Inquiring As
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        className="w-full bg-[#282624] border border-white/15 focus:border-[#b9965b] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#b9965b] transition-all"
                      >
                        <option value="Candidate (Self)">Candidate (Self)</option>
                        <option value="Parent / Guardian">Parent / Guardian</option>
                        <option value="Sibling">Sibling</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5 font-sans-modern">
                      City &amp; Country of Residence
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="e.g. Lahore / London / Dubai"
                      className="w-full bg-[#282624] border border-white/15 focus:border-[#b9965b] rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-[#b9965b] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5 font-sans-modern">
                      Special Requirements or Preferences (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="Brief details about profession, education, or preferences..."
                      className="w-full bg-[#282624] border border-white/15 focus:border-[#b9965b] rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-[#b9965b] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#9a6a4f] hover:bg-[#b17b5d] text-white font-sans-modern font-semibold py-3 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Confidential Request</span>
                  </button>

                  <p className="text-[11px] text-center text-stone-400 pt-1">
                    🔒 Strict Confidentiality Guaranteed. Never shared with third parties.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PersonalizedMatchmakingSection;
