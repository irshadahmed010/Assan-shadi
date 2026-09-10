"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  UploadCloud,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  GraduationCap,
  Briefcase,
  X,
  FileCheck,
  Check,
  Sparkles,
  Lock,
} from "lucide-react";
import { SubmitBiodataHeader } from "@/components/biodata/SubmitBiodataHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface BiodataFormData {
  fullName: string;
  gender: "Male" | "Female";
  lookingFor: string;
  maritalStatus: string;
  currentCityState: string;
  phone: string;
  whatsapp: string;
  email: string;
  education: string;
  profession: string;
  introduction: string;
  consent: boolean;
}

export default function SubmitBiodataPage() {
  const [formData, setFormData] = useState<BiodataFormData>({
    fullName: "",
    gender: "Male",
    lookingFor: "",
    maritalStatus: "",
    currentCityState: "",
    phone: "",
    whatsapp: "",
    email: "",
    education: "",
    profession: "",
    introduction: "",
    consent: false,
  });

  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submissionCode, setSubmissionCode] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Input Changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => {
        const updated = { ...prev, [name]: value };
        if (name === "phone" && sameAsPhone) {
          updated.whatsapp = value;
        }
        return updated;
      });
    }
    if (formError) setFormError(null);
  };

  // Toggle same as phone
  const handleSameAsPhoneToggle = (checked: boolean) => {
    setSameAsPhone(checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, whatsapp: prev.phone }));
    }
  };

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setFormError("File size exceeds 15MB limit. Please upload a smaller file.");
        return;
      }
      setSelectedFile(file);
      if (formError) setFormError(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setFormError("File size exceeds 15MB limit. Please upload a smaller file.");
        return;
      }
      setSelectedFile(file);
      if (formError) setFormError(null);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setFormError("Please enter your Full Name.");
      return;
    }
    if (!formData.lookingFor) {
      setFormError("Please select who you are looking for.");
      return;
    }
    if (!formData.maritalStatus) {
      setFormError("Please select marital status.");
      return;
    }
    if (!formData.currentCityState.trim()) {
      setFormError("Please enter current city & state.");
      return;
    }
    if (!formData.phone.trim()) {
      setFormError("Please enter calling phone number.");
      return;
    }
    if (!formData.whatsapp.trim()) {
      setFormError("Please enter WhatsApp number.");
      return;
    }
    if (!formData.email.trim()) {
      setFormError("Please enter email address.");
      return;
    }
    if (!formData.consent) {
      setFormError("Please accept the Terms & Privacy Consent to proceed.");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    // Simulate fast processing
    await new Promise((r) => setTimeout(r, 750));

    const randomCode = `AS-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmissionCode(randomCode);
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setFormData({
      fullName: "",
      gender: "Male",
      lookingFor: "",
      maritalStatus: "",
      currentCityState: "",
      phone: "",
      whatsapp: "",
      email: "",
      education: "",
      profession: "",
      introduction: "",
      consent: false,
    });
    setSelectedFile(null);
    setSameAsPhone(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#252525] text-[#FAF7F2] font-sans-modern">
      {/* 1. Page Header (Exact 130px height, responsive) */}
      <SubmitBiodataHeader />

      {/* 2. Main Form Content Section with Decorative Side Captions */}
      <section className="relative py-10 sm:py-14 lg:py-16 overflow-hidden border-b border-white/10">
        {/* Soft Ambient Background Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#9a6a4f]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-28 w-96 h-96 bg-[#b9965b]/10 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #b9965b 1.5px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Outer Grid for Ornamental Side Text on Desktop */}
        <div className="relative max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="relative flex justify-center">
            {/* Left Decorative Sidebar - Islamic motif & quote (Desktop xl+) */}
            <aside className="hidden xl:flex flex-col justify-between w-48 shrink-0 pr-6 select-none opacity-80 pt-16">
              <div className="space-y-4">
                {/* Crescent / Dome Silhouette Vector */}
                <div className="w-12 h-12 rounded-full bg-[#9a6a4f]/15 border border-[#9a6a4f]/30 flex items-center justify-center text-[#e8a379]">
                  <Sparkles className="w-6 h-6 text-[#b9965b]" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-serif-luxury italic text-[#e8c078] leading-snug">
                    &ldquo;A Halal Beginning
                  </p>
                  <p className="text-xs font-serif-luxury italic text-stone-400">
                    for a Brighter Tomorrow&rdquo;
                  </p>
                </div>
                <div className="w-10 h-[1px] bg-[#9a6a4f]/40" />
              </div>

              <div className="space-y-2 pb-16 text-xs text-stone-400 font-sans-modern">
                <p className="font-semibold text-stone-300">Dignified Process</p>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Every profile is personally reviewed to ensure purity of intention and verified family background.
                </p>
              </div>
            </aside>

            {/* Central Form Container */}
            <div className="w-full max-w-3xl">
              {/* Header inside section */}
              <div className="text-center mb-7 sm:mb-9 space-y-2.5">
                <ScrollReveal direction="up">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#e8a379] text-[11px] sm:text-xs font-semibold uppercase tracking-widest font-sans-modern">
                    <Sparkles className="w-3.5 h-3.5 text-[#b9965b]" />
                    <span>ISLAMIC MATRIMONIAL REGISTRATION</span>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.1}>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury tracking-tight text-[#FAF7F2]">
                    Create Your{" "}
                    <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                      Matrimonial Biodata
                    </span>
                  </h2>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.15}>
                  <p className="text-stone-300 text-xs sm:text-sm font-sans-modern leading-relaxed max-w-lg mx-auto">
                    Take a step towards a blessed future. Share your details to connect with verified and genuine matches.
                  </p>
                </ScrollReveal>
              </div>

              {/* Main Biodata Form Card */}
              <ScrollReveal direction="up" delay={0.2}>
                <div className="relative rounded-[10px] bg-[#1e1e1e]/95 border border-[#9a6a4f]/35 p-5 sm:p-8 lg:p-9 shadow-2xl backdrop-blur-md">
                  {/* Subtle top gold accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b9965b] to-transparent" />

                  {formError && (
                    <div className="mb-5 p-3 rounded-[5px] bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-sans-modern flex items-center gap-2">
                      <X className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Top: Upload Your Biodata Document (Optional) */}
                    <div className="rounded-[8px] bg-[#272727]/90 border border-[#9a6a4f]/30 p-4 sm:p-5 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#e8a379]" />
                            <h3 className="text-sm sm:text-base font-bold text-white font-serif-luxury">
                              Upload Your Biodata Document <span className="text-xs text-stone-400 font-sans-modern font-normal">(Optional)</span>
                            </h3>
                          </div>
                          <p className="text-[11px] sm:text-xs text-stone-400 font-sans-modern">
                            Upload your biodata, photo or CV to save time. Supported formats: PDF, JPG, PNG, DOC
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#e8c078] text-[10px] font-semibold uppercase tracking-wider shrink-0 self-start sm:self-center">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#b9965b]" />
                          <span>FAST & SECURE</span>
                        </div>
                      </div>

                      {/* Dropzone Box */}
                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="relative border-2 border-dashed border-[#b9965b]/30 hover:border-[#b9965b]/60 rounded-[8px] p-4 sm:p-6 text-center transition-colors bg-[#1f1f1f]/60 flex flex-col items-center justify-center gap-2 group cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                        />

                        {selectedFile ? (
                          <div className="flex flex-col sm:flex-row items-center gap-3 py-1">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                              <FileCheck className="w-5 h-5" />
                            </div>
                            <div className="text-center sm:text-left">
                              <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-xs">
                                {selectedFile.name}
                              </p>
                              <p className="text-[10px] text-stone-400">
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to submit
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile();
                              }}
                              className="px-2.5 py-1 rounded-[5px] bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-medium border border-red-500/30 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="w-10 h-10 rounded-full bg-[#9a6a4f]/20 text-[#e8a379] flex items-center justify-center group-hover:scale-110 transition-transform">
                              <UploadCloud className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-stone-200">
                                Click to Upload or Drag &amp; Drop
                              </p>
                              <p className="text-[11px] text-stone-400 mt-0.5">
                                Attach your biodata in any format: PDF, JPG, PNG, DOC
                              </p>
                            </div>
                            <button
                              type="button"
                              className="mt-1 px-4 py-1.5 rounded-[5px] bg-[#9a6a4f]/30 hover:bg-[#9a6a4f]/50 text-[#e8c078] border border-[#9a6a4f]/50 text-xs font-semibold transition-all"
                            >
                              Choose File
                            </button>
                            <p className="text-[10px] text-stone-400 mt-1">
                              Max size: 15MB • Your information is private and secure
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* SECTION 1: Personal Details */}
                    <div className="space-y-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-stone-200 text-xs sm:text-sm font-bold font-serif-luxury uppercase tracking-wider">
                          <User className="w-4 h-4 text-[#e8a379]" />
                          <span>Personal Details</span>
                        </div>
                        <div className="flex-1 h-[1px] bg-white/10" />
                      </div>

                      {/* Row 1: Full Name & Gender */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
                        <div className="sm:col-span-7 space-y-1">
                          <label className="text-xs text-stone-300 font-medium">
                            Full Name <span className="text-[#e8a379]">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                              <User className="w-4 h-4 text-[#e8a379]" />
                            </div>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              required
                              className="w-full pl-9 pr-3.5 py-2.5 rounded-[5px] bg-[#272727] border border-white/10 hover:border-white/20 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-colors"
                            />
                          </div>
                        </div>

                        {/* Gender Toggle */}
                        <div className="sm:col-span-5 space-y-1">
                          <label className="text-xs text-stone-300 font-medium">
                            Gender <span className="text-[#e8a379]">*</span>
                          </label>
                          <div className="grid grid-cols-2 gap-2 bg-[#272727] p-1 rounded-[5px] border border-white/10 h-[41px]">
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, gender: "Male" }))}
                              className={`flex items-center justify-center gap-1.5 rounded-[5px] text-xs font-sans-modern font-semibold transition-all ${
                                formData.gender === "Male"
                                  ? "bg-[#9a6a4f] text-white shadow-md"
                                  : "text-stone-400 hover:text-white"
                              }`}
                            >
                              <User className="w-3.5 h-3.5" />
                              <span>Male</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, gender: "Female" }))}
                              className={`flex items-center justify-center gap-1.5 rounded-[5px] text-xs font-sans-modern font-semibold transition-all ${
                                formData.gender === "Female"
                                  ? "bg-[#9a6a4f] text-white shadow-md"
                                  : "text-stone-400 hover:text-white"
                              }`}
                            >
                              <User className="w-3.5 h-3.5" />
                              <span>Female</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Looking For & Marital Status */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-stone-300 font-medium">
                            Looking For <span className="text-[#e8a379]">*</span>
                          </label>
                          <select
                            name="lookingFor"
                            value={formData.lookingFor}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3.5 py-2.5 rounded-[5px] bg-[#272727] border border-white/10 hover:border-white/20 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern outline-none transition-colors"
                          >
                            <option value="" className="bg-[#1e1e1e] text-stone-400">Select...</option>
                            <option value="Self" className="bg-[#1e1e1e]">Myself</option>
                            <option value="Son" className="bg-[#1e1e1e]">Son</option>
                            <option value="Daughter" className="bg-[#1e1e1e]">Daughter</option>
                            <option value="Brother" className="bg-[#1e1e1e]">Brother</option>
                            <option value="Sister" className="bg-[#1e1e1e]">Sister</option>
                            <option value="Relative/Friend" className="bg-[#1e1e1e]">Relative / Friend</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-stone-300 font-medium">
                            Marital Status <span className="text-[#e8a379]">*</span>
                          </label>
                          <select
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3.5 py-2.5 rounded-[5px] bg-[#272727] border border-white/10 hover:border-white/20 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern outline-none transition-colors"
                          >
                            <option value="" className="bg-[#1e1e1e] text-stone-400">Select...</option>
                            <option value="Never Married" className="bg-[#1e1e1e]">Never Married</option>
                            <option value="Divorced" className="bg-[#1e1e1e]">Divorced</option>
                            <option value="Widowed" className="bg-[#1e1e1e]">Widowed</option>
                            <option value="Awaiting Divorce" className="bg-[#1e1e1e]">Awaiting Divorce</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 3: Current City & State */}
                      <div className="space-y-1">
                        <label className="text-xs text-stone-300 font-medium">
                          Current City &amp; State <span className="text-[#e8a379]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                            <MapPin className="w-4 h-4 text-[#e8a379]" />
                          </div>
                          <input
                            type="text"
                            name="currentCityState"
                            value={formData.currentCityState}
                            onChange={handleInputChange}
                            placeholder="e.g. Bangalore, Karnataka or Hyderabad, Telangana"
                            required
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-[5px] bg-[#272727] border border-white/10 hover:border-white/20 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Contact & Guardian Details */}
                    <div className="space-y-3.5 pt-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-stone-200 text-xs sm:text-sm font-bold font-serif-luxury uppercase tracking-wider">
                          <Phone className="w-4 h-4 text-[#e8a379]" />
                          <span>Contact &amp; Guardian Details</span>
                        </div>
                        <div className="flex-1 h-[1px] bg-white/10" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-start">
                        {/* Phone */}
                        <div className="space-y-1">
                          <div className="h-5 flex items-center">
                            <label className="text-xs text-stone-300 font-medium">
                              Phone / Calling Number <span className="text-[#e8a379]">*</span>
                            </label>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                              <Phone className="w-4 h-4 text-[#e8a379]" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="e.g. +91 98765 43210"
                              required
                              className="w-full pl-9 pr-3.5 py-2.5 rounded-[5px] bg-[#272727] border border-white/10 hover:border-white/20 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-colors"
                            />
                          </div>
                        </div>

                        {/* WhatsApp */}
                        <div className="space-y-1">
                          <div className="h-5 flex items-center justify-between">
                            <label className="text-xs text-stone-300 font-medium">
                              WhatsApp No. <span className="text-[#e8a379]">*</span>
                            </label>
                            <label className="flex items-center gap-1.5 text-[11px] text-[#e8c078] cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={sameAsPhone}
                                onChange={(e) => handleSameAsPhoneToggle(e.target.checked)}
                                className="w-3.5 h-3.5 rounded accent-[#9a6a4f]"
                              />
                              <span>Same as Calling</span>
                            </label>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                              <Phone className="w-4 h-4 text-[#e8a379]" />
                            </div>
                            <input
                              type="tel"
                              name="whatsapp"
                              value={formData.whatsapp}
                              onChange={handleInputChange}
                              placeholder="e.g. +91 98765 43210"
                              required
                              className="w-full pl-9 pr-3.5 py-2.5 rounded-[5px] bg-[#272727] border border-white/10 hover:border-white/20 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-xs text-stone-300 font-medium">
                          Email Address <span className="text-[#e8a379]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                            <Mail className="w-4 h-4 text-[#e8a379]" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="name@example.com"
                            required
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-[5px] bg-[#272727] border border-white/10 hover:border-white/20 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: Additional Background Details */}
                    <div className="space-y-3.5 pt-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-stone-200 text-xs sm:text-sm font-bold font-serif-luxury uppercase tracking-wider">
                          <GraduationCap className="w-4 h-4 text-[#e8a379]" />
                          <span>Additional Background Details</span>
                        </div>
                        <div className="flex-1 h-[1px] bg-white/10" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {/* Education */}
                        <div className="space-y-1">
                          <label className="text-xs text-stone-300 font-medium">
                            Highest Education
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                              <GraduationCap className="w-4 h-4 text-[#e8a379]" />
                            </div>
                            <input
                              type="text"
                              name="education"
                              value={formData.education}
                              onChange={handleInputChange}
                              placeholder="e.g. B.Tech / MBA / Masters"
                              className="w-full pl-9 pr-3.5 py-2.5 rounded-[5px] bg-[#272727] border border-white/10 hover:border-white/20 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-colors"
                            />
                          </div>
                        </div>

                        {/* Profession */}
                        <div className="space-y-1">
                          <label className="text-xs text-stone-300 font-medium">
                            Profession / Job Title
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                              <Briefcase className="w-4 h-4 text-[#e8a379]" />
                            </div>
                            <input
                              type="text"
                              name="profession"
                              value={formData.profession}
                              onChange={handleInputChange}
                              placeholder="e.g. Software Engineer / Business"
                              className="w-full pl-9 pr-3.5 py-2.5 rounded-[5px] bg-[#272727] border border-white/10 hover:border-white/20 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Brief Introduction */}
                      <div className="space-y-1">
                        <label className="text-xs text-stone-300 font-medium">
                          Brief Introduction or Partner Expectations
                        </label>
                        <textarea
                          name="introduction"
                          rows={3}
                          value={formData.introduction}
                          onChange={handleInputChange}
                          placeholder="Share a few words about yourself, family expectations, or religious practice preferences..."
                          className="w-full p-3 rounded-[5px] bg-[#272727] border border-white/10 hover:border-white/20 focus:border-[#b9965b] text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* SECTION 4: Terms & Privacy Consent */}
                    <div className="p-3.5 rounded-[5px] bg-[#272727]/70 border border-white/10 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent-checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        required
                        className="mt-0.5 w-4 h-4 rounded accent-[#9a6a4f] shrink-0 cursor-pointer"
                      />
                      <label htmlFor="consent-checkbox" className="text-xs text-stone-300 font-sans-modern leading-relaxed cursor-pointer">
                        <strong className="text-white font-semibold">Terms &amp; Privacy Consent *</strong>
                        <span className="block text-stone-400 mt-0.5">
                          I confirm that the provided details and attached biodata are genuine and accurate. I agree to Asaan Shaadi&apos;s matrimonial verification process.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 text-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-3 px-10 py-3.5 rounded-[5px] bg-gradient-to-r from-[#9a6a4f] to-[#b17b5d] hover:from-[#b17b5d] hover:to-[#c8a66b] text-white font-sans-modern font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-[#9a6a4f]/35 hover:shadow-2xl hover:scale-[1.01] disabled:opacity-60 group w-full sm:w-auto"
                      >
                        <span>{isSubmitting ? "Submitting Biodata..." : "Submit My Biodata"}</span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      </button>
                    </div>

                    {/* Trust Badges Footer */}
                    <div className="pt-5 border-t border-white/10 space-y-3">
                      <p className="text-center text-[10px] sm:text-[11px] font-semibold text-stone-400 uppercase tracking-widest flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-white/10" />
                        <span>YOUR PRIVACY • OUR PRIORITY</span>
                        <span className="w-8 h-[1px] bg-white/10" />
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-300 font-sans-modern">
                        <div className="flex items-center justify-center gap-2 p-2 rounded-[5px] bg-[#272727]/50 border border-white/5">
                          <ShieldCheck className="w-4 h-4 text-[#e8a379] shrink-0" />
                          <span className="font-medium text-[11px] sm:text-xs">100% Privacy Guaranteed</span>
                        </div>

                        <div className="flex items-center justify-center gap-2 p-2 rounded-[5px] bg-[#272727]/50 border border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-[#e8a379] shrink-0" />
                          <span className="font-medium text-[11px] sm:text-xs">Verified Profiles Only</span>
                        </div>

                        <div className="flex items-center justify-center gap-2 p-2 rounded-[5px] bg-[#272727]/50 border border-white/5">
                          <Zap className="w-4 h-4 text-[#e8a379] shrink-0" />
                          <span className="font-medium text-[11px] sm:text-xs">Fast Match Alerts</span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Decorative Sidebar - Quotes (Desktop xl+) */}
            <aside className="hidden xl:flex flex-col justify-between w-48 shrink-0 pl-6 select-none opacity-80 pt-16">
              <div className="space-y-4 text-right">
                <div className="w-10 h-[1px] bg-[#9a6a4f]/40 ml-auto" />
                <p className="text-sm font-serif-luxury italic text-[#e8c078] leading-snug">
                  Better Muslims,
                  <span className="block text-stone-400">Brighter Tomorrows</span>
                </p>
              </div>

              <div className="space-y-3 pb-16 text-right">
                <p className="text-xs font-serif-luxury italic text-[#e8c078]">
                  Deen Connections
                  <span className="block text-stone-400">Last Forever</span>
                </p>
                <div className="w-8 h-[1px] bg-[#b9965b]/40 ml-auto" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Small Interactive Modern Success Submission Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-sm sm:max-w-md w-full bg-[#1e1e1e] border border-[#b9965b]/50 rounded-[8px] p-5 sm:p-6 text-center shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Success Check Icon */}
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-sans-modern font-semibold uppercase tracking-widest text-[#b9965b]">
                Alhamdulillah
              </span>
              <h3 className="text-xl font-bold font-serif-luxury text-white">
                Biodata Submitted!
              </h3>
              <p className="text-xs text-stone-300 font-sans-modern leading-relaxed pt-0.5">
                Thank you, <strong className="text-white">{formData.fullName}</strong>! Your matrimonial registration has been recorded.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-3 rounded-[5px] bg-[#272727] border border-white/10 text-left text-xs space-y-1.5 font-sans-modern">
              <div className="flex justify-between text-stone-400">
                <span>Reference ID:</span>
                <span className="font-mono text-[#e8c078] font-bold">{submissionCode}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Candidate / Looking:</span>
                <span className="text-white font-medium">{formData.lookingFor} ({formData.gender})</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Calling Phone:</span>
                <span className="text-stone-200">{formData.phone}</span>
              </div>
              {selectedFile && (
                <div className="flex justify-between text-stone-400">
                  <span>Attached File:</span>
                  <span className="text-emerald-400 font-medium truncate max-w-[150px]">{selectedFile.name}</span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-stone-400 font-sans-modern">
              Our matrimonial counselor will contact your registered phone/WhatsApp shortly Insha&apos;Allah.
            </p>

            {/* Action button */}
            <button
              onClick={handleCloseModal}
              className="w-full py-2.5 rounded-[5px] bg-[#9a6a4f] hover:bg-[#b17b5d] text-white font-sans-modern font-semibold text-xs sm:text-sm transition-all shadow-md shadow-[#9a6a4f]/30"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
