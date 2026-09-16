"use client";

import React, { useState, useRef, useMemo } from "react";
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
  Copy,
  Info,
  ChevronDown,
  FileUp,
  MessageCircle,
  HelpCircle,
  Clock,
  Send,
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
  const [isCopied, setIsCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate completion percentage for progress bar
  const completionPercentage = useMemo(() => {
    let filled = 0;
    const requiredFields: (keyof BiodataFormData)[] = [
      "fullName",
      "lookingFor",
      "maritalStatus",
      "currentCityState",
      "phone",
      "whatsapp",
      "email",
    ];
    requiredFields.forEach((field) => {
      if (formData[field] && String(formData[field]).trim() !== "") {
        filled += 1;
      }
    });
    if (formData.consent) filled += 1;
    if (selectedFile) filled += 1;
    return Math.min(
      100,
      Math.round((filled / (requiredFields.length + 2)) * 100),
    );
  }, [formData, selectedFile]);

  // Handle Input Changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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
        setFormError(
          "File size exceeds 15MB limit. Please upload a smaller file.",
        );
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
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setFormError(
          "File size exceeds 15MB limit. Please upload a smaller file.",
        );
        return;
      }
      setSelectedFile(file);
      if (formError) setFormError(null);
    }
  };

  // Copy Reference Code
  const handleCopyCode = async () => {
    if (!submissionCode) return;
    try {
      await navigator.clipboard.writeText(submissionCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
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
    await new Promise((r) => setTimeout(r, 850));

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
    <div className="flex flex-col min-h-screen bg-[#1c1b1a] text-[#FAF7F2] font-sans-modern selection:bg-[#c2794c]/30 selection:text-[#e5c384]">
      {/* 1. Page Header */}
      <SubmitBiodataHeader />

      {/* 2. Main Form Content Section with Decorative Sidebars */}
      <main className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
        {/* Soft Ambient Background Glows & Geometry */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#c2794c]/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#e5c384]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 -right-28 w-96 h-96 bg-[#c2794c]/15 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #e5c384 1.5px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-center gap-8 lg:gap-10">
            {/* ============================================================== */}
            {/* Left Decorative Sidebar (Desktop xl+) */}
            {/* ============================================================== */}
            <aside className="hidden xl:flex flex-col justify-between w-64 shrink-0 pr-4 select-none pt-6">
              <div className="space-y-6">
                {/* Spiritual Quote Card */}
                <div className="rounded-2xl bg-[#252422]/70 border border-white/10 p-5 space-y-3 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-stone-200 text-xs font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-message-circle w-4 h-4 text-emerald-400"
                      aria-hidden="true"
                    >
                      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                    </svg>
                    <span>Direct WhatsApp Support</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Have questions before submitting? Reach out to our matrimony
                    advisor.
                  </p>
                  <a
                    href="https://wa.me/919936998858"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-message-circle w-3.5 h-3.5"
                      aria-hidden="true"
                    >
                      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                {/* Assurance Card */}
                <div className="rounded-2xl bg-[#252422]/70 border border-white/10 p-5 space-y-3.5 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-[#e5c384] text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#c2794c]" />
                    <span>Our Pledge to You</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-stone-300 font-sans-modern">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#e5c384] shrink-0 mt-0.5" />
                      <span>100% Privacy &amp; Data Protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#e5c384] shrink-0 mt-0.5" />
                      <span>Direct Guardian Coordination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#e5c384] shrink-0 mt-0.5" />
                      <span>Zero Public Profile Exposure</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Support Badge */}
              <div className="pt-6 pb-8">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#2a2624] to-[#201e1d] border border-[#c2794c]/30 text-center space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#c2794c]/20 text-[#e5c384] flex items-center justify-center mx-auto">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-stone-200">
                    Need Guidance?
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Our match counselors are ready to help you complete your
                    profile.
                  </p>
                </div>
              </div>
            </aside>

            {/* ============================================================== */}
            {/* Central Form Container */}
            {/* ============================================================== */}
            <div className="w-full max-w-3xl">
              {/* Header inside section */}
              <div className="text-center mb-6 sm:mb-8 space-y-3">
                <ScrollReveal direction="up">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c2794c]/15 border border-[#e5c384]/30 text-[#e5c384] text-[11px] sm:text-xs font-semibold uppercase tracking-wider font-sans-modern shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#e5c384]" />
                    <span>ISLAMIC MATRIMONIAL REGISTRATION</span>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.1}>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury tracking-tight text-[#FAF7F2]">
                    Create Your{" "}
                    <span className="bg-gradient-to-r from-[#e5c384] via-[#f0d49e] to-[#c2794c] bg-clip-text text-transparent italic">
                      Matrimonial Biodata
                    </span>
                  </h2>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.15}>
                  <p className="text-stone-300 text-xs sm:text-sm font-sans-modern leading-relaxed max-w-lg mx-auto">
                    Take a step towards a blessed future. Share your details to connect with verified and genuine matches..
                  </p>
                </ScrollReveal>

                {/* Progress Bar & Quick Status */}
                <ScrollReveal direction="up" delay={0.2}>
                  <div className="max-w-md mx-auto pt-2">
                    <div className="flex items-center justify-between text-[11px] font-sans-modern mb-1.5 px-1">
                      <span className="text-stone-400 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#c2794c]" />
                        <span>Form Completion</span>
                      </span>
                      <span className="text-[#e5c384] font-semibold">
                        {completionPercentage}% Completed
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-[1px]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#c2794c] via-[#e5c384] to-[#c2794c] transition-all duration-500"
                        style={{
                          width: `${Math.max(8, completionPercentage)}%`,
                        }}
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Main Biodata Form Card */}
              <ScrollReveal direction="up" delay={0.25}>
                <div className="relative rounded-2xl bg-[#232220]/95 border border-[#c2794c]/30 p-5 sm:p-8 lg:p-9 shadow-2xl backdrop-blur-xl">
                  {/* Subtle top gold radiant highlight bar */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#e5c384] to-transparent" />

                  {/* Form Error Banner */}
                  {formError && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-sans-modern flex items-center justify-between gap-3 shadow-inner">
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                          <X className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium">{formError}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormError(null)}
                        className="text-red-400 hover:text-red-200 text-xs"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* ============================================================== */}
                    {/* SECTION 1: Personal Details */}
                    {/* ============================================================== */}
                    <section className="space-y-4">
                      {/* Section Header */}
                      <div className="flex items-center gap-3 pb-1 border-b border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-[#c2794c]/20 border border-[#c2794c]/40 text-[#e5c384] flex items-center justify-center text-xs font-bold font-mono">
                          01
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#c2794c]" />
                          <h3 className="text-sm sm:text-base font-bold font-serif-luxury text-stone-100 tracking-wide">
                            Personal Details
                          </h3>
                        </div>
                      </div>

                      {/* Row 1: Full Name & Gender */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        {/* Full Name */}
                        <div className="sm:col-span-7 space-y-1.5">
                          <label className="text-xs font-semibold text-stone-200 flex items-center gap-1">
                            <span>Full Name</span>
                            <span className="text-[#e5c384]">*</span>
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#e5c384] transition-colors">
                              <User className="w-4 h-4" />
                            </div>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              required
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#2c2a28] border border-white/15 hover:border-white/25 focus:border-[#e5c384] focus:ring-1 focus:ring-[#e5c384]/40 text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-all shadow-inner"
                            />
                          </div>
                        </div>

                        {/* Gender Toggle */}
                        <div className="sm:col-span-5 space-y-1.5">
                          <label className="text-xs font-semibold text-stone-200 flex items-center gap-1">
                            <span>Gender</span>
                            <span className="text-[#e5c384]">*</span>
                          </label>
                          <div className="grid grid-cols-2 gap-2 bg-[#2c2a28] p-1 rounded-xl border border-white/15 h-[42px]">
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  gender: "Male",
                                }))
                              }
                              className={`flex items-center justify-center gap-1.5 rounded-lg text-xs font-sans-modern font-semibold transition-all ${
                                formData.gender === "Male"
                                  ? "bg-gradient-to-r from-[#c2794c] to-[#a65d34] text-white shadow-md shadow-[#c2794c]/30"
                                  : "text-stone-400 hover:text-white hover:bg-white/5"
                              }`}
                            >
                              <User className="w-3.5 h-3.5" />
                              <span>Male</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  gender: "Female",
                                }))
                              }
                              className={`flex items-center justify-center gap-1.5 rounded-lg text-xs font-sans-modern font-semibold transition-all ${
                                formData.gender === "Female"
                                  ? "bg-gradient-to-r from-[#c2794c] to-[#a65d34] text-white shadow-md shadow-[#c2794c]/30"
                                  : "text-stone-400 hover:text-white hover:bg-white/5"
                              }`}
                            >
                              <User className="w-3.5 h-3.5" />
                              <span>Female</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Looking For & Marital Status */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Looking For */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-200 flex items-center gap-1">
                            <span>Looking For</span>
                            <span className="text-[#e5c384]">*</span>
                          </label>
                          <div className="relative">
                            <select
                              name="lookingFor"
                              value={formData.lookingFor}
                              onChange={handleInputChange}
                              required
                              className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-[#2c2a28] border border-white/15 hover:border-white/25 focus:border-[#e5c384] focus:ring-1 focus:ring-[#e5c384]/40 text-white text-xs sm:text-sm font-sans-modern outline-none transition-all cursor-pointer shadow-inner pr-10"
                            >
                              <option
                                value=""
                                className="bg-[#1f1e1d] text-stone-400"
                              >
                                Select Relationship...
                              </option>
                              <option value="Self" className="bg-[#1f1e1d]">
                                Myself
                              </option>
                              <option value="Son" className="bg-[#1f1e1d]">
                                Son
                              </option>
                              <option value="Daughter" className="bg-[#1f1e1d]">
                                Daughter
                              </option>
                              <option value="Brother" className="bg-[#1f1e1d]">
                                Brother
                              </option>
                              <option value="Sister" className="bg-[#1f1e1d]">
                                Sister
                              </option>
                              <option
                                value="Relative/Friend"
                                className="bg-[#1f1e1d]"
                              >
                                Relative / Friend
                              </option>
                              <option
                                value="Niece/Nephew"
                                className="bg-[#1f1e1d]"
                              >
                                Niece / Nephew
                              </option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Marital Status */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-200 flex items-center gap-1">
                            <span>Marital Status</span>
                            <span className="text-[#e5c384]">*</span>
                          </label>
                          <div className="relative">
                            <select
                              name="maritalStatus"
                              value={formData.maritalStatus}
                              onChange={handleInputChange}
                              required
                              className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-[#2c2a28] border border-white/15 hover:border-white/25 focus:border-[#e5c384] focus:ring-1 focus:ring-[#e5c384]/40 text-white text-xs sm:text-sm font-sans-modern outline-none transition-all cursor-pointer shadow-inner pr-10"
                            >
                              <option
                                value=""
                                className="bg-[#1f1e1d] text-stone-400"
                              >
                                Select Status...
                              </option>
                              <option
                                value="Never Married"
                                className="bg-[#1f1e1d]"
                              >
                                Never Married
                              </option>
                              <option value="Divorced" className="bg-[#1f1e1d]">
                                Divorced
                              </option>
                              <option value="Widowed" className="bg-[#1f1e1d]">
                                Widowed
                              </option>
                              <option
                                value="Awaiting Divorce"
                                className="bg-[#1f1e1d]"
                              >
                                Awaiting Divorce
                              </option>
                              <option
                                value="Separated"
                                className="bg-[#1f1e1d]"
                              >
                                Separated
                              </option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Current City & State */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-200 flex items-center gap-1">
                          <span>Current City &amp; State</span>
                          <span className="text-[#e5c384]">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#e5c384] transition-colors">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            name="currentCityState"
                            value={formData.currentCityState}
                            onChange={handleInputChange}
                            placeholder=""
                            required
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#2c2a28] border border-white/15 hover:border-white/25 focus:border-[#e5c384] focus:ring-1 focus:ring-[#e5c384]/40 text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-all shadow-inner"
                          />
                        </div>
                      </div>
                    </section>

                    {/* ============================================================== */}
                    {/* SECTION 2: Contact & Guardian Details */}
                    {/* ============================================================== */}
                    <section className="space-y-4 pt-2">
                      {/* Section Header */}
                      <div className="flex items-center gap-3 pb-1 border-b border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-[#c2794c]/20 border border-[#c2794c]/40 text-[#e5c384] flex items-center justify-center text-xs font-bold font-mono">
                          02
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#c2794c]" />
                          <h3 className="text-sm sm:text-base font-bold font-serif-luxury text-stone-100 tracking-wide">
                            Contact &amp; Guardian Details
                          </h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                        {/* Phone */}
                        <div className="space-y-1.5">
                          <div className="h-5 flex items-center">
                            <label className="text-xs font-semibold text-stone-200 flex items-center gap-1">
                              <span>Phone / Calling Number</span>
                              <span className="text-[#e5c384]">*</span>
                            </label>
                          </div>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#e5c384] transition-colors">
                              <Phone className="w-4 h-4" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder=""
                              required
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#2c2a28] border border-white/15 hover:border-white/25 focus:border-[#e5c384] focus:ring-1 focus:ring-[#e5c384]/40 text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-all shadow-inner"
                            />
                          </div>
                        </div>

                        {/* WhatsApp */}
                        <div className="space-y-1.5">
                          <div className="h-5 flex items-center justify-between">
                            <label className="text-xs font-semibold text-stone-200 flex items-center gap-1">
                              <span>WhatsApp Number</span>
                              <span className="text-[#e5c384]">*</span>
                            </label>
                            <label className="flex items-center gap-1.5 text-[11px] text-[#e5c384] hover:text-[#f3d99e] cursor-pointer select-none transition-colors">
                              <input
                                type="checkbox"
                                checked={sameAsPhone}
                                onChange={(e) =>
                                  handleSameAsPhoneToggle(e.target.checked)
                                }
                                className="w-3.5 h-3.5 rounded accent-[#c2794c] cursor-pointer"
                              />
                              <span>Same as Calling</span>
                            </label>
                          </div>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#e5c384] transition-colors">
                              <MessageCircle className="w-4 h-4" />
                            </div>
                            <input
                              type="tel"
                              name="whatsapp"
                              value={formData.whatsapp}
                              onChange={handleInputChange}
                              placeholder=""
                              required
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#2c2a28] border border-white/15 hover:border-white/25 focus:border-[#e5c384] focus:ring-1 focus:ring-[#e5c384]/40 text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-all shadow-inner"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-200 flex items-center gap-1">
                          <span>Email Address</span>
                          <span className="text-[#e5c384]">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#e5c384] transition-colors">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder=""
                            required
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#2c2a28] border border-white/15 hover:border-white/25 focus:border-[#e5c384] focus:ring-1 focus:ring-[#e5c384]/40 text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-all shadow-inner"
                          />
                        </div>
                      </div>
                    </section>

                    {/* ============================================================== */}
                    {/* SECTION 3: Additional Background Details */}
                    {/* ============================================================== */}
                    <section className="space-y-4 pt-2">
                      {/* Section Header */}
                      <div className="flex items-center gap-3 pb-1 border-b border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-[#c2794c]/20 border border-[#c2794c]/40 text-[#e5c384] flex items-center justify-center text-xs font-bold font-mono">
                          03
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-[#c2794c]" />
                          <h3 className="text-sm sm:text-base font-bold font-serif-luxury text-stone-100 tracking-wide">
                            Education &amp; Background Details
                          </h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Education */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-200">
                            Highest Education
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#e5c384] transition-colors">
                              <GraduationCap className="w-4 h-4" />
                            </div>
                            <input
                              type="text"
                              name="education"
                              value={formData.education}
                              onChange={handleInputChange}
                              placeholder=""
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#2c2a28] border border-white/15 hover:border-white/25 focus:border-[#e5c384] focus:ring-1 focus:ring-[#e5c384]/40 text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-all shadow-inner"
                            />
                          </div>
                        </div>

                        {/* Profession */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-200">
                            Profession / Job Title
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#e5c384] transition-colors">
                              <Briefcase className="w-4 h-4" />
                            </div>
                            <input
                              type="text"
                              name="profession"
                              value={formData.profession}
                              onChange={handleInputChange}
                              placeholder=""
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#2c2a28] border border-white/15 hover:border-white/25 focus:border-[#e5c384] focus:ring-1 focus:ring-[#e5c384]/40 text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-all shadow-inner"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Brief Introduction */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-stone-200">
                            Brief Introduction or Partner Expectations
                          </label>
                          <span className="text-[11px] text-stone-400">
                            Optional
                          </span>
                        </div>
                        <textarea
                          name="introduction"
                          rows={3}
                          value={formData.introduction}
                          onChange={handleInputChange}
                          placeholder="Share a few words about religious values, lifestyle, family background, or partner expectations..."
                          className="w-full p-3.5 rounded-xl bg-[#2c2a28] border border-white/15 hover:border-white/25 focus:border-[#e5c384] focus:ring-1 focus:ring-[#e5c384]/40 text-white text-xs sm:text-sm font-sans-modern placeholder:text-stone-400 outline-none transition-all resize-none shadow-inner leading-relaxed"
                        />
                      </div>
                    </section>

                    {/* ============================================================== */}
                    {/* SECTION 4: Upload Your Biodata Document (MOVED TO LAST POSITION) */}
                    {/* ============================================================== */}
                    <section className="space-y-4 pt-2">
                      {/* Section Header */}
                      <div className="flex items-center justify-between pb-1 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#c2794c]/20 border border-[#c2794c]/40 text-[#e5c384] flex items-center justify-center text-xs font-bold font-mono">
                            04
                          </div>
                          <div className="flex items-center gap-2">
                            <FileUp className="w-4 h-4 text-[#c2794c]" />
                            <h3 className="text-sm sm:text-base font-bold font-serif-luxury text-stone-100 tracking-wide">
                              Upload Your Biodata Document
                            </h3>
                          </div>
                        </div>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-stone-300 font-sans-modern">
                          Optional
                        </span>
                      </div>

                      {/* Upload Box Container */}
                      <div className="rounded-xl bg-gradient-to-b from-[#2a2826] to-[#222120] border border-[#e5c384]/25 p-4 sm:p-5 space-y-3.5 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-stone-200">
                              Attach existing biodata file or profile summary
                            </p>
                            <p className="text-[11px] text-stone-400 mt-0.5">
                              Supported formats:{" "}
                              <strong className="text-stone-300">
                                PDF, DOC, DOCX, JPG, PNG
                              </strong>{" "}
                              (Max 15MB)
                            </p>
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c2794c]/15 border border-[#e5c384]/30 text-[#e5c384] text-[10px] font-semibold uppercase tracking-wider shrink-0 self-start sm:self-center">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#e5c384]" />
                            <span>100% PRIVATE &amp; ENCRYPTED</span>
                          </div>
                        </div>

                        {/* Dropzone Area */}
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`relative border-2 border-dashed rounded-xl p-5 sm:p-7 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group ${
                            isDragging
                              ? "border-[#e5c384] bg-[#e5c384]/10 scale-[1.01]"
                              : "border-[#e5c384]/30 hover:border-[#e5c384]/70 bg-[#1e1d1c]/80 hover:bg-[#1e1d1c]"
                          }`}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="hidden"
                          />

                          {selectedFile ? (
                            /* File Attached State */
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-[#272523] border border-[#e5c384]/40 p-3.5 sm:p-4 rounded-xl">
                              <div className="flex items-center gap-3.5 min-w-0">
                                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                                  <FileCheck className="w-6 h-6" />
                                </div>
                                <div className="text-left min-w-0">
                                  <p className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                                    {selectedFile.name}
                                  </p>
                                  <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                                    <span>
                                      {(
                                        selectedFile.size /
                                        (1024 * 1024)
                                      ).toFixed(2)}{" "}
                                      MB
                                    </span>
                                    <span>•</span>
                                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> Ready
                                      to submit
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-medium border border-white/15 transition-all"
                                >
                                  Change
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFile();
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-medium border border-red-500/30 transition-all flex items-center gap-1"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* Empty Upload State */
                            <>
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c2794c]/20 to-[#e5c384]/20 border border-[#e5c384]/30 text-[#e5c384] flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                                <UploadCloud className="w-6 h-6" />
                              </div>
                              <div className="space-y-0.5">
                                <p className="text-xs sm:text-sm font-bold text-stone-200 group-hover:text-[#e5c384] transition-colors">
                                  Click to browse or drag &amp; drop your file
                                  here
                                </p>
                                <p className="text-[11px] text-stone-400">
                                  You can attach a PDF biodata, Word document,
                                  or image file
                                </p>
                              </div>
                              <div className="mt-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#c2794c]/25 hover:bg-[#c2794c]/40 text-[#e5c384] border border-[#e5c384]/40 text-xs font-semibold transition-all shadow-sm">
                                <FileText className="w-3.5 h-3.5" />
                                <span>Select Biodata File</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </section>

                    {/* ============================================================== */}
                    {/* SECTION 5: Terms & Privacy Consent */}
                    {/* ============================================================== */}
                    <div className="p-4 rounded-xl bg-[#2a2826]/80 border border-white/10 flex items-start gap-3.5 shadow-inner">
                      <input
                        type="checkbox"
                        id="consent-checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        required
                        className="mt-1 w-4 h-4 rounded accent-[#c2794c] shrink-0 cursor-pointer"
                      />
                      <label
                        htmlFor="consent-checkbox"
                        className="text-xs text-stone-300 font-sans-modern leading-relaxed cursor-pointer select-none"
                      >
                        <strong className="text-stone-100 font-semibold block sm:inline">
                          Terms &amp; Privacy Consent *
                        </strong>{" "}
                        <span>
                          I solemnly confirm that the information provided in
                          this biodata is genuine, truthful, and submitted with
                          the pure intention of marriage (Nikah). I agree to
                          Asaan Shaadi&apos;s confidential verification process.
                        </span>
                      </label>
                    </div>

                    {/* ============================================================== */}
                    {/* Submission Button */}
                    {/* ============================================================== */}
                    <div className="pt-2 text-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-[#c2794c] via-[#d4895c] to-[#c2794c] hover:from-[#d4895c] hover:to-[#e5c384] text-white font-sans-modern font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-[#c2794c]/30 hover:shadow-2xl hover:shadow-[#c2794c]/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 group w-full sm:w-auto min-w-[260px] overflow-hidden"
                      >
                        {/* Shimmer animation */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform" />

                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Submitting Biodata...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit My Biodata</span>
                            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                              <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Trust Badges Footer */}
                    <div className="pt-6 border-t border-white/10 space-y-4">
                      <p className="text-center text-[10px] sm:text-[11px] font-semibold text-stone-400 uppercase tracking-widest flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-white/10" />
                        <span>
                          SACRED TRUST • GUARDIAN APPROVED • 100% PRIVATE
                        </span>
                        <span className="w-8 h-[1px] bg-white/10" />
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-300 font-sans-modern">
                        <div className="flex items-center justify-center gap-2.5 p-2.5 rounded-xl bg-[#2a2826]/50 border border-white/5">
                          <Lock className="w-4 h-4 text-[#e5c384] shrink-0" />
                          <span className="font-medium text-[11px] sm:text-xs">
                            100% Confidential
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-2.5 p-2.5 rounded-xl bg-[#2a2826]/50 border border-white/5">
                          <ShieldCheck className="w-4 h-4 text-[#e5c384] shrink-0" />
                          <span className="font-medium text-[11px] sm:text-xs">
                            Direct Guardian Review
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-2.5 p-2.5 rounded-xl bg-[#2a2826]/50 border border-white/5">
                          <Zap className="w-4 h-4 text-[#e5c384] shrink-0" />
                          <span className="font-medium text-[11px] sm:text-xs">
                            Personal Match Assistant
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* ============================================================== */}
            {/* Right Decorative Sidebar (Desktop xl+) */}
            {/* ============================================================== */}
            <aside className="hidden xl:flex flex-col justify-between w-64 shrink-0 pl-4 select-none pt-6">
              <div className="space-y-6">
                {/* How It Works Mini Card */}
                <div className="rounded-2xl bg-[#252422]/90 border border-[#e5c384]/20 p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
                  <div className="flex items-center gap-2 text-[#e5c384] text-xs font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="w-4 h-4 text-[#c2794c]" />
                    <span>What Happens Next?</span>
                  </div>
                  <ol className="space-y-3 text-xs text-stone-300 font-sans-modern">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#c2794c]/20 border border-[#c2794c]/40 text-[#e5c384] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        1
                      </span>
                      <div>
                        <strong className="text-white block font-medium">
                          Biodata Review
                        </strong>
                        <span className="text-stone-400 text-[11px]">
                          Personal review within 24 hours.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#c2794c]/20 border border-[#c2794c]/40 text-[#e5c384] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        2
                      </span>
                      <div>
                        <strong className="text-white block font-medium">
                          Guardian Call
                        </strong>
                        <span className="text-stone-400 text-[11px]">
                          Quick verification &amp; preference check.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#c2794c]/20 border border-[#c2794c]/40 text-[#e5c384] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        3
                      </span>
                      <div>
                        <strong className="text-white block font-medium">
                          Compatible Matches
                        </strong>
                        <span className="text-stone-400 text-[11px]">
                          Direct introductions on WhatsApp.
                        </span>
                      </div>
                    </li>
                  </ol>
                </div>

                {/* Direct Contact / WhatsApp Support */}
                <div className="rounded-2xl bg-[#252422]/70 border border-white/10 p-5 space-y-3 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-stone-200 text-xs font-bold">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Direct WhatsApp Support</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Have questions before submitting? Reach out to our matrimony
                    advisor.
                  </p>
                  <a
                    href="https://wa.me/919936998858"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Bottom Quote */}
              <div className="pt-6 pb-8 text-right">
                <div className="space-y-1">
                  <p className="text-xs font-serif-luxury italic text-[#e5c384]">
                    &ldquo;Better Muslims, Brighter Tomorrows&rdquo;
                  </p>
                  <p className="text-[11px] text-stone-400 font-sans-modern">
                    Asaan Shaadi Matrimonial Network
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* ============================================================== */}
      {/* Interactive Success Modal */}
      {/* ============================================================== */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-md w-full bg-[#232220] border border-[#e5c384]/40 rounded-2xl p-6 sm:p-7 text-center shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient gold glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#e5c384]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Success Check Icon */}
            <div className="relative mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-[#e5c384]/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <span className="inline-block text-[11px] font-sans-modern font-bold uppercase tracking-widest text-[#e5c384]">
                Alhamdulillah • Registration Recorded
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white">
                Biodata Submitted Successfully!
              </h3>
              <p className="text-xs text-stone-300 font-sans-modern leading-relaxed pt-1">
                JazakAllah Khair,{" "}
                <strong className="text-white">{formData.fullName}</strong>.
                Your details have been securely received.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-[#1c1b1a] border border-[#e5c384]/20 text-left text-xs space-y-2.5 font-sans-modern shadow-inner">
              {/* Reference ID with Copy Button */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-stone-400 font-medium">
                  Reference Code:
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#c2794c]/20 hover:bg-[#c2794c]/30 text-[#e5c384] font-mono font-bold text-xs border border-[#e5c384]/30 transition-colors"
                  title="Click to copy Reference ID"
                >
                  <span>{submissionCode}</span>
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#e5c384]" />
                  )}
                </button>
              </div>

              <div className="flex justify-between text-stone-400">
                <span>Looking For:</span>
                <span className="text-stone-200 font-medium">
                  {formData.lookingFor} ({formData.gender})
                </span>
              </div>

              <div className="flex justify-between text-stone-400">
                <span>Phone / WhatsApp:</span>
                <span className="text-stone-200 font-medium">
                  {formData.phone}
                </span>
              </div>

              {selectedFile && (
                <div className="flex justify-between text-stone-400">
                  <span>Attached Document:</span>
                  <span className="text-emerald-400 font-medium truncate max-w-[170px]">
                    {selectedFile.name}
                  </span>
                </div>
              )}
            </div>

            {/* Next Steps Note */}
            <div className="p-3 rounded-lg bg-[#c2794c]/10 border border-[#c2794c]/20 text-stone-300 text-[11px] font-sans-modern leading-relaxed flex items-start gap-2 text-left">
              <Info className="w-4 h-4 text-[#e5c384] shrink-0 mt-0.5" />
              <span>
                Our match counselor will verify your details and connect with
                your registered guardian contact shortly Insha&apos;Allah.
              </span>
            </div>

            {/* Action button */}
            <button
              onClick={handleCloseModal}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c2794c] to-[#d4895c] hover:from-[#d4895c] hover:to-[#e5c384] text-white font-sans-modern font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#c2794c]/30"
            >
              Done &amp; Return to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
