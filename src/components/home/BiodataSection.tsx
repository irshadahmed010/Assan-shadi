"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FileText,
  User,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Heart,
  Users,
  X,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const BiodataSection: React.FC = () => {
  const router = useRouter();
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !mobileNumber.trim()) {
      setFormError("Please fill in your Full Name and Mobile Number.");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName.trim(),
          mobile_number: mobileNumber.trim(),
          email_address: emailAddress.trim(),
          gender: gender,
          source: "Quick Profile Submission",
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to submit profile. Please try again.");
      }

      setShowSuccessModal(true);
    } catch (err: any) {
      setFormError(err.message || "Failed to submit profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setFullName("");
    setMobileNumber("");
    setEmailAddress("");
    setGender("Male");
  };

  const handleDone = () => {
    handleCloseModal();
    router.push("/submit-biodata");
  };

  return (
    <section
      id="register"
      className="relative py-10 sm:py-12 lg:py-14 bg-[#252525] text-[#FAF7F2] overflow-hidden border-b border-white/10 scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Anchor for Quick Profile Submission */}
      <span id="quick-profile" className="absolute -top-24 pointer-events-none" />
      <span id="quick-profile-submission" className="absolute -top-24 pointer-events-none" />
      {/* Soft Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#9a6a4f]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-28 w-96 h-96 bg-[#b9965b]/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #b9965b 1.5px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative max-w-[1350px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Header Section (Outside Form Card) */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 space-y-3">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c2794c]/20 border border-[#c2794c]/50 text-[#FFD78A] text-xs font-bold uppercase tracking-widest font-sans-modern">
              <FileText className="w-3.5 h-3.5 text-[#FFD78A]" />
              <span>SUBMIT YOUR BIODATA</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury tracking-tight leading-snug text-white">
              Take the First Step{" "}
              <span className="text-[#FFD78A] italic font-serif-luxury font-medium">
                Towards a Beautiful Relationship
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-stone-200 text-xs sm:text-sm lg:text-base font-sans-modern leading-relaxed max-w-xl mx-auto">
              Fill in your details to submit your biodata and connect with verified matches.
            </p>
          </ScrollReveal>
        </div>

        {/* Main Card Container */}
        <div className="relative rounded-[6px] bg-[#1e1e1e]/98 border border-white/15 p-5 sm:p-8 lg:p-10 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Subtle top gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD78A] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
            {/* Left Column: Form (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-4">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="border-b border-white/15 pb-3">
                  <h3 className="text-lg sm:text-xl font-bold font-serif-luxury text-white">
                    Quick Profile Submission
                  </h3>
                  <p className="text-xs text-[#FFD78A] font-sans-modern font-semibold mt-0.5">
                    100% Confidential • Verified Matrimonial Process
                  </p>
                </div>
              </ScrollReveal>

              {/* Form Component */}
              <ScrollReveal direction="up" delay={0.15}>
                <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
                  {formError && (
                    <div className="p-3 rounded-[6px] bg-red-500/15 border border-red-500/30 text-red-200 text-xs font-sans-modern">
                      {formError}
                    </div>
                  )}

                  {/* Row 1: Full Name + WhatsApp / Calling Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {/* Full Name */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-[#FFD78A]" />
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name *"
                        required
                        className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-[6px] bg-[#272727] border border-white/15 hover:border-white/25 focus:border-[#FFD78A] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-colors"
                      />
                    </div>

                    {/* WhatsApp / Calling Number */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-[#FFD78A]" />
                      </div>
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="WhatsApp / Calling Number *"
                        required
                        className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-[6px] bg-[#272727] border border-white/15 hover:border-white/25 focus:border-[#FFD78A] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email Address + Gender Selector Toggle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {/* Email Address */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-[#FFD78A]" />
                      </div>
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="Email Address"
                        className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-[6px] bg-[#272727] border border-white/15 hover:border-white/25 focus:border-[#FFD78A] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-colors"
                      />
                    </div>

                    {/* Gender Selector Toggle */}
                    <div className="grid grid-cols-2 gap-2 bg-[#272727] p-1 rounded-[6px] border border-white/15">
                      <button
                        type="button"
                        onClick={() => setGender("Male")}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-[5px] text-xs font-sans-modern font-semibold transition-all ${
                          gender === "Male"
                            ? "bg-gradient-to-r from-[#c2794c] to-[#a86036] text-white shadow-md font-bold"
                            : "text-stone-300 hover:text-white"
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Male</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setGender("Female")}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-[5px] text-xs font-sans-modern font-semibold transition-all ${
                          gender === "Female"
                            ? "bg-gradient-to-r from-[#c2794c] to-[#a86036] text-white shadow-md font-bold"
                            : "text-stone-300 hover:text-white"
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Female</span>
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-[6px] btn-primary-glow text-white font-sans-modern font-bold text-xs sm:text-sm transition-all duration-300 disabled:opacity-60 group shrink-1"
                    >
                      <span>{isSubmitting ? "Submitting..." : "Submit My Biodata"}</span>
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </button>
                  </div>

                  {/* 3 Trust Points Row */}
                  <div className="pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-200 font-sans-modern">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-[5px] bg-[#c2794c]/20 text-[#FFD78A] flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-[11px] sm:text-xs">100% Privacy Guaranteed</span>
                    </div>

                    <div className="flex items-center gap-2 sm:border-l sm:border-white/15 sm:pl-3">
                      <div className="w-6 h-6 rounded-[5px] bg-[#c2794c]/20 text-[#FFD78A] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-[11px] sm:text-xs">Verified Profiles</span>
                    </div>

                    <div className="flex items-center gap-2 sm:border-l sm:border-white/15 sm:pl-3">
                      <div className="w-6 h-6 rounded-[5px] bg-[#c2794c]/20 text-[#FFD78A] flex items-center justify-center shrink-0">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-[11px] sm:text-xs">Fast Match Alerts</span>
                    </div>
                  </div>
                </form>
              </ScrollReveal>
            </div>

            {/* Right Column: Image with Reduced Height (lg:col-span-5) */}
            <div className="lg:col-span-5 relative">
              <ScrollReveal direction="left" delay={0.2}>
                <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                  {/* Subtle Glow behind the card */}
                  <div className="absolute -inset-3 bg-gradient-to-tr from-[#9a6a4f]/30 to-[#b9965b]/30 rounded-[15px] blur-2xl opacity-50 pointer-events-none" />

                  {/* Compact Image Container with reduced height */}
                  <div className="relative rounded-[10px] overflow-hidden border-2 border-[#b9965b]/50 shadow-2xl bg-[#171615] aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3] max-h-[260px] sm:max-h-[300px] lg:max-h-[320px] w-full">
                    <Image
                      src="/images/couple-ayaan-saba.jpg"
                      alt="Muslim Couple at Grand Mosque Sunset - Asaan Shaadi"
                      fill
                      className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-[#151515]/30" />

                    {/* Top Right Floating Pill */}
                    <div className="absolute top-2.5 right-2.5 backdrop-blur-md bg-[#1e1e1e]/90 border border-[#b9965b]/40 rounded-[5px] px-2.5 py-1.5 shadow-xl flex items-center gap-1.5 z-20">
                      <Heart className="w-3.5 h-3.5 text-[#e8a379] fill-[#e8a379]/40" />
                      <span className="text-[10px] font-sans-modern font-semibold text-stone-200">
                        Better Families, Brighter Tomorrows
                      </span>
                    </div>

                    {/* Bottom Floating Glass Card */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 backdrop-blur-md bg-[#1e1e1e]/90 border border-white/15 rounded-[5px] p-2.5 shadow-xl flex items-center justify-between gap-2 z-20">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-[5px] bg-[#9a6a4f]/25 text-[#e8a379] flex items-center justify-center shrink-0 border border-[#9a6a4f]/40">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white font-serif-luxury truncate">
                            Real People • Real Connections
                          </h4>
                          <p className="text-[10px] text-[#e8c078] font-sans-modern">
                            Insha&apos;Allah
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#b9965b] shrink-0" />
                    </div>
                  </div>

                  {/* Below Quote */}
                  <div className="pt-2 text-center">
                    <p className="text-[11px] sm:text-xs text-stone-400 font-serif-luxury italic flex items-center justify-center gap-2">
                      <span className="w-6 h-[1px] bg-[#b9965b]/40" />
                      <span>&ldquo;Deen • Trust • Together Always&rdquo;</span>
                      <span className="w-6 h-[1px] bg-[#b9965b]/40" />
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      {/* Small Interactive Success Submission Popup Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-sm sm:max-w-md w-full bg-[#1e1e1e] border border-[#b9965b]/50 rounded-[5px] p-6 text-center shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Success Icon */}
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-sans-modern font-semibold uppercase tracking-widest text-[#b9965b]">
                Alhamdulillah
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white">
                Biodata Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-sans-modern leading-relaxed pt-1">
                Thank you, <strong className="text-white">{fullName}</strong>! Your biodata details have been received securely.
              </p>
              <p className="text-xs text-stone-400 font-sans-modern">
                Our matrimonial team will contact you on <span className="text-[#e8c078] font-medium">{mobileNumber}</span> shortly.
              </p>
            </div>

            {/* Trust Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-[#e8c078] font-sans-modern">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b9965b]" />
              <span>100% Confidential • Guardian-Verified Process</span>
            </div>

            {/* Action button */}
            <button
              onClick={handleDone}
              className="w-full py-2.5 rounded-[5px] bg-[#9a6a4f] hover:bg-[#b17b5d] text-white font-sans-modern font-semibold text-xs sm:text-sm transition-all shadow-md shadow-[#9a6a4f]/30"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BiodataSection;
