"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { ContactPageHeader } from "@/components/contact/ContactPageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface FormData {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  seekingAllianceFor: string;
  note: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    seekingAllianceFor: "",
    note: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (formError) setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.mobileNumber.trim() ||
      !formData.emailAddress.trim() ||
      !formData.seekingAllianceFor
    ) {
      setFormError("Please fill in all mandatory fields marked with an asterisk (*).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName.trim(),
          mobile_number: formData.mobileNumber.trim(),
          email_address: formData.emailAddress.trim(),
          seeking_for: formData.seekingAllianceFor,
          note: formData.note.trim(),
          source: "contact_page",
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to submit inquiry");
      }
      setSubmitted(true);
    } catch (err: any) {
      setFormError(err.message || "Failed to send message. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#252525] text-[#FAF7F2] font-sans-modern">
      {/* 1. Page Header (Exact 130px height, responsive) */}
      <ContactPageHeader />

      {/* 2. Main Contact Info & Form Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden border-b border-white/10">
        {/* Ambient background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#9a6a4f]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 -right-28 w-96 h-96 bg-[#b9965b]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1350px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Direct Contact Details Cards (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-5">
              <ScrollReveal direction="up">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#e8a379] text-xs font-semibold uppercase tracking-widest font-sans-modern">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct Communication</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.1}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury tracking-tight text-[#FAF7F2]">
                  Connect Directly With{" "}
                  <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                    Our Advisors
                  </span>
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.15}>
                <p className="text-stone-300 text-xs sm:text-sm font-sans-modern leading-relaxed">
                  Whether you have questions about our phone verification process, personalized supervisor assistance, or guardian inquiries, our Bengaluru team is here to assist you with complete privacy.
                </p>
              </ScrollReveal>

              {/* 3 Detail Cards */}
              <div className="space-y-3.5 pt-2">
                {/* 1. Address Card */}
                <ScrollReveal direction="up" delay={0.2}>
                  <div className="p-4 sm:p-5 rounded-[5px] bg-[#1e1e1e] border border-white/10 hover:border-[#b9965b]/40 transition-colors shadow-lg flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-[5px] bg-[#9a6a4f]/20 text-[#e8a379] flex items-center justify-center shrink-0 border border-[#9a6a4f]/40 group-hover:scale-105 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className="text-[11px] font-semibold text-[#b9965b] uppercase tracking-wider font-sans-modern">
                        Address
                      </span>
                      <h4 className="text-sm font-bold text-white font-serif-luxury">
                        Bengaluru Head Office
                      </h4>
                      <div className="text-xs text-stone-300 leading-relaxed font-sans-modern">
                        <p>B &apos; Surya Enclave Apartment, 8th Main,</p>
                        <p>BTM Layout 1st Stage, Bengaluru - 560029</p>
                        <p>Karnataka, India</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* 2. Phone Card */}
                <ScrollReveal direction="up" delay={0.25}>
                  <div className="p-4 sm:p-5 rounded-[5px] bg-[#1e1e1e] border border-white/10 hover:border-[#b9965b]/40 transition-colors shadow-lg flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-[5px] bg-[#9a6a4f]/20 text-[#e8a379] flex items-center justify-center shrink-0 border border-[#9a6a4f]/40 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className="text-[11px] font-semibold text-[#b9965b] uppercase tracking-wider font-sans-modern">
                        Phone & WhatsApp
                      </span>
                      <div>
                        <a
                          href="tel:+919845012439"
                          className="text-base sm:text-lg font-bold text-white font-serif-luxury hover:text-[#e8c078] transition-colors block"
                        >
                          +91 98450 12439
                        </a>
                      </div>
                      <div className="pt-1 flex flex-wrap gap-2">
                        <a
                          href="tel:+919845012439"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-sans-modern border border-white/10 transition-colors"
                        >
                          <Phone className="w-3 h-3 text-[#e8a379]" />
                          <span>Call Now</span>
                        </a>
                        <a
                          href="https://wa.me/919845012439?text=Hello%20Asaan%20Shaadi,%20I%20would%20like%20to%20inquire%20about%20matrimonial%20services"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-sans-modern border border-emerald-500/30 transition-colors"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-400" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* 3. Email Us Card */}
                <ScrollReveal direction="up" delay={0.3}>
                  <div className="p-4 sm:p-5 rounded-[5px] bg-[#1e1e1e] border border-white/10 hover:border-[#b9965b]/40 transition-colors shadow-lg flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-[5px] bg-[#9a6a4f]/20 text-[#e8a379] flex items-center justify-center shrink-0 border border-[#9a6a4f]/40 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className="text-[11px] font-semibold text-[#b9965b] uppercase tracking-wider font-sans-modern">
                        Email Us
                      </span>
                      <div>
                        <a
                          href="mailto:info@asaanshaadi.com"
                          className="text-base sm:text-lg font-bold text-white font-serif-luxury hover:text-[#e8c078] transition-colors block truncate"
                        >
                          info@asaanshaadi.com
                        </a>
                      </div>
                      <p className="text-xs text-stone-400 font-sans-modern">
                        Prompt replies within 24 working hours.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Operating Hours Note */}
              <ScrollReveal direction="up" delay={0.35}>
                <div className="p-3.5 rounded-[5px] bg-[#24201c] border border-[#9a6a4f]/30 flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#e8a379] shrink-0" />
                  <span className="text-xs text-stone-300 font-sans-modern">
                    <strong>Working Hours:</strong> Monday – Sunday, 10:00 AM – 10:00 PM IST
                  </span>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Interactive Contact Form (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="left" delay={0.2}>
                <div className="relative rounded-[5px] bg-[#1e1e1e] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
                  {/* Subtle Top Gold Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b9965b] to-transparent" />

                  {submitted ? (
                    <div className="text-center py-10 sm:py-12 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold font-serif-luxury text-white">
                        Thank You, {formData.fullName}!
                      </h3>
                      <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                        We have received your message. An Asaan Shaadi relationship supervisor will review your details and contact you shortly on <strong>{formData.mobileNumber}</strong>.
                      </p>
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false);
                            setFormData({
                              fullName: "",
                              mobileNumber: "",
                              emailAddress: "",
                              seekingAllianceFor: "",
                              note: "",
                            });
                          }}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[5px] bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 text-xs font-sans-modern transition-colors"
                        >
                          <span>Send Another Inquiry</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-[#b9965b] font-semibold font-sans-modern">
                          Inquiry Form
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white mt-1">
                          Send Us a Message
                        </h3>
                        <p className="text-xs text-stone-400 font-sans-modern mt-1">
                          Fields marked with an asterisk (<span className="text-red-400">*</span>) are required.
                        </p>
                      </div>

                      {formError && (
                        <div className="p-3 rounded-[5px] bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-sans-modern">
                          {formError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* 1. Full Name */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-stone-300 font-sans-modern">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter Your Name"
                            required
                            className="w-full px-3.5 py-3 rounded-[5px] bg-[#252525] border border-white/10 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-500 outline-none transition-colors"
                          />
                        </div>

                        {/* 2. Mobile Number */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-stone-300 font-sans-modern">
                            Mobile Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Enter Your Mobile Number"
                            required
                            className="w-full px-3.5 py-3 rounded-[5px] bg-[#252525] border border-white/10 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-500 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* 3. Email Address */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-stone-300 font-sans-modern">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            placeholder="Enter Your Email"
                            required
                            className="w-full px-3.5 py-3 rounded-[5px] bg-[#252525] border border-white/10 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-500 outline-none transition-colors"
                          />
                        </div>

                        {/* 4. Seeking Alliance For */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-stone-300 font-sans-modern">
                            Seeking Alliance For <span className="text-red-400">*</span>
                          </label>
                          <select
                            name="seekingAllianceFor"
                            value={formData.seekingAllianceFor}
                            onChange={handleChange}
                            required
                            className="w-full px-3.5 py-3 rounded-[5px] bg-[#252525] border border-white/10 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern outline-none transition-colors"
                          >
                            <option value="" disabled className="text-stone-500">
                              For Whom you&apos;re looking
                            </option>
                            <option value="Myself" className="bg-[#1e1e1e] text-white">
                              Myself
                            </option>
                            <option value="Son" className="bg-[#1e1e1e] text-white">
                              Son
                            </option>
                            <option value="Daughter" className="bg-[#1e1e1e] text-white">
                              Daughter
                            </option>
                            <option value="Brother" className="bg-[#1e1e1e] text-white">
                              Brother
                            </option>
                            <option value="Sister" className="bg-[#1e1e1e] text-white">
                              Sister
                            </option>
                            <option value="Friend / Relative" className="bg-[#1e1e1e] text-white">
                              Friend / Relative
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* 5. Note */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-stone-300 font-sans-modern">
                          Note
                        </label>
                        <textarea
                          name="note"
                          rows={4}
                          value={formData.note}
                          onChange={handleChange}
                          placeholder="Write any specific preferences, criteria, or questions you have..."
                          className="w-full px-3.5 py-3 rounded-[5px] bg-[#252525] border border-white/10 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-500 outline-none transition-colors resize-y"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-[5px] bg-[#9a6a4f] hover:bg-[#b17b5d] text-white font-sans-modern font-semibold text-sm transition-all duration-300 shadow-md shadow-[#9a6a4f]/30 hover:shadow-xl hover:shadow-[#9a6a4f]/50 disabled:opacity-60 group"
                        >
                          <span>{isSubmitting ? "Sending Your Message..." : "Submit Inquiry"}</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>

                      <div className="text-center pt-1">
                        <p className="text-[11px] text-stone-400 font-sans-modern">
                          🔒 We respect your privacy. Your contact details will never be shared without consent.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Embedded Google Map Section */}
      <section id="location-map" className="relative py-12 sm:py-16 bg-[#1b1b1b] overflow-hidden">
        <div className="relative max-w-[1350px] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#e8a379] text-xs font-semibold uppercase tracking-widest font-sans-modern mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Our Location</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
                Visit Our Bengaluru Office
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-sans-modern mt-1">
                B &apos; Surya Enclave Apartment, 8th Main, BTM Layout 1st Stage, Bengaluru - 560029, Karnataka
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Surya+Enclave+Apartment+BTM+Layout+1st+Stage+Bengaluru+560029"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 text-xs font-sans-modern font-semibold transition-colors shrink-0"
            >
              <span>Open in Google Maps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Google Map Frame */}
          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px] rounded-[5px] overflow-hidden border-4 border-[#9a6a4f]/40 shadow-2xl bg-[#1e1e1e]">
            <iframe
              title="Asaan Shaadi Bengaluru Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.756787311145!2d77.60835431482146!3d12.923382790887532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14ff358c9bf7%3A0x4ef21c1f4e1572c6!2sBTM%201st%20Stage%2C%20Bengaluru%2C%20Karnataka%20560029!5e0!3m2!1sen!2sin!4v1694348590123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "hue-rotate(180deg)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            {/* Floating Location Badge on Map */}
            <div className="absolute bottom-4 left-4 backdrop-blur-md bg-[#1e1e1e]/95 border border-[#b9965b]/40 rounded-[5px] p-3 shadow-xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-2 text-[#e8c078] text-xs font-serif-luxury font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#e8a379]" />
                <span>Asaan Shaadi Matchmaking Hub</span>
              </div>
              <p className="text-[11px] text-stone-300 font-sans-modern mt-1">
                BTM Layout 1st Stage, Bengaluru - 560029
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
