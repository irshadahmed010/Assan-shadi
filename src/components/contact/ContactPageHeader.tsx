"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight, PhoneCall, Sparkles, MapPin } from "lucide-react";

export const ContactPageHeader: React.FC = () => {
  return (
    <section
      id="contact-page-header"
      className="relative h-[130px] min-h-[130px] max-h-[130px] w-full bg-[#1e1e1e] border-b border-[#9a6a4f]/30 flex items-center overflow-hidden z-20"
      aria-label="Contact Page Header Banner"
    >
      {/* Ambient background glow & subtle geometric pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#9a6a4f]/20 rounded-full blur-3xl" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#b9965b]/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #b9965b 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4">
        {/* Left: Breadcrumbs + Title + Subtitle */}
        <div className="flex flex-col justify-center space-y-1.5 min-w-0">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-stone-400 font-sans-modern"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-stone-300 hover:text-[#b9965b] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-500 shrink-0" />
            <span className="text-[#e8a379] font-medium truncate">Contact Us</span>
          </nav>

          {/* Heading */}
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold font-serif-luxury text-[#FAF7F2] tracking-tight leading-tight truncate">
            Get In Touch With Asaan Shaadi
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-stone-300 font-sans-modern truncate max-w-xl">
            Trusted relationship & guardian support.
          </p>
        </div>

        {/* Right: Quick Verification & Trust Badge */}
        <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#9a6a4f]/20 border border-[#9a6a4f]/40 text-[#FAF7F2] text-xs font-sans-modern">
            <MapPin className="w-3.5 h-3.5 text-[#e8a379] shrink-0" />
            <span className="font-semibold text-white">Bangalore Head Office</span>
          </div>

          <div className="inline-flex items-center gap-1 text-[11px] text-[#e8c078] font-sans-modern">
            <Sparkles className="w-3 h-3 text-[#b9965b]" />
            <span>Active Mon – Sat (10am – 7pm IST)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPageHeader;
