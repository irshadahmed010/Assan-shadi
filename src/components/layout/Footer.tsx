"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Heart,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#1d1d1d] text-[#FAF7F2] border-t border-[#B9965B]/20 pt-14 sm:pt-16 lg:pt-20 pb-10 font-sans-modern overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 lg:pb-16 border-b border-[#3d3d3d]/60">
          
          {/* Col 1: Brand & Badges & Socials (Span 5 on LG) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Logo Lockup */}
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4a362a] via-[#33241b] to-[#1e1511] border border-[#B9965B]/40 flex items-center justify-center text-[#B9965B] shadow-lg group-hover:border-[#B9965B] group-hover:scale-105 transition-all duration-300">
                {/* Handshake Heart Icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-7 text-[#B9965B]"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
                  <path d="m18 15-2-2" />
                  <path d="m15 18-2-2" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl sm:text-[28px] font-bold font-serif-luxury tracking-tight text-[#FAF7F2] group-hover:text-[#FFD78A] transition-colors leading-none">
                  Assan Shadi
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#FFD78A] uppercase mt-1.5 font-sans-modern">
                  FAITH • FAMILIES • FOREVER
                </span>
              </div>
            </Link>

            {/* Platform Description */}
            <p className="text-sm text-stone-200 leading-relaxed max-w-md font-normal">
              Empowering families with a dignified, transparent, and sunnah-inspired matrimonial platform. No commercial exploitation, no dowry culture, and 100% guardian-verified biodatas.
            </p>

            {/* Verification & Privacy Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E5C384]/40 bg-[#28211b] text-xs font-semibold text-stone-100 shadow-sm hover:border-[#FFD78A] transition-colors">
                <ShieldCheck className="w-4 h-4 text-[#FFD78A] shrink-0" />
                <span>100% Guardian Verified</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E5C384]/40 bg-[#28211b] text-xs font-semibold text-stone-100 shadow-sm hover:border-[#FFD78A] transition-colors">
                <Lock className="w-4 h-4 text-[#FFD78A] shrink-0" />
                <span>Strict Photo Privacy</span>
              </div>
            </div>

            {/* Social / Contact Quick Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {/* WhatsApp (Green Button) */}
              <a
                href="https://wa.me/919620078691"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.83 7.35C8.63 7.35 8.44 7.36 8.27 7.63C8.07 7.95 7.42 8.56 7.42 9.8C7.42 11.04 8.33 12.23 8.45 12.4C8.58 12.57 10.22 15.1 12.75 16.19C14.86 17.1 15.29 16.92 15.75 16.88C16.21 16.84 17.23 16.28 17.44 15.69C17.65 15.1 17.65 14.6 17.59 14.49C17.53 14.38 17.37 14.32 17.13 14.2C16.89 14.08 15.7 13.5 15.48 13.42C15.26 13.34 15.1 13.3 14.94 13.54C14.78 13.78 14.31 14.33 14.17 14.49C14.03 14.65 13.89 14.67 13.65 14.55C13.41 14.43 12.64 14.18 11.72 13.36C11 12.72 10.51 11.93 10.39 11.69C10.27 11.45 10.38 11.32 10.5 11.2C10.61 11.09 10.75 10.91 10.87 10.77C10.99 10.63 11.03 10.53 11.11 10.37C11.19 10.21 11.15 10.07 11.09 9.95C11.03 9.83 10.56 8.67 10.36 8.19C10.16 7.71 9.96 7.78 9.81 7.77C9.67 7.76 9.51 7.76 9.35 7.76C9.19 7.76 8.95 7.82 8.83 7.35Z" />
                </svg>
              </a>

              {/* Phone Direct */}
              <a
                href="tel:+919620078691"
                aria-label="Call Us"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:border-[#B9965B] hover:bg-[#B9965B]/15 text-[#FAF7F2]/80 hover:text-[#B9965B] flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:border-[#B9965B] hover:bg-[#B9965B]/15 text-[#FAF7F2]/80 hover:text-[#B9965B] flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:border-[#B9965B] hover:bg-[#B9965B]/15 text-[#FAF7F2]/80 hover:text-[#B9965B] flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (Span 2 on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative inline-block pb-2">
              <h4 className="text-[#FAF7F2] font-bold text-lg sm:text-xl font-serif-luxury tracking-wide">
                Quick Links
              </h4>
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#FFD78A] rounded-full" />
            </div>

            <ul className="space-y-2.5 text-sm pt-1">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/gallery", label: "Gallery" },
                { href: "/blog", label: "Nikah Blog" },
                { href: "/submit-biodata", label: "Submit Biodata" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between text-stone-300 hover:text-[#FFD78A] transition-all duration-200 group py-1"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#FFD78A]/70 group-hover:text-[#FFD78A] group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal & Support (Span 2 on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative inline-block pb-2">
              <h4 className="text-[#FAF7F2] font-bold text-lg sm:text-xl font-serif-luxury tracking-wide">
                Legal & Support
              </h4>
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#FFD78A] rounded-full" />
            </div>

            <ul className="space-y-2.5 text-sm pt-1">
              {[
                { href: "/about#privacy", label: "Privacy Policy" },
                { href: "/about#terms", label: "Terms & Conditions" },
                { href: "/how-it-works#faq", label: "FAQ" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between text-stone-300 hover:text-[#FFD78A] transition-all duration-200 group py-1"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#FFD78A]/70 group-hover:text-[#FFD78A] group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Support (Span 3 on LG) */}
          <div className="lg:col-span-3 space-y-4 lg:pl-8">
            <div className="relative inline-block pb-2">
              <h4 className="text-[#FAF7F2] font-semibold text-lg sm:text-xl font-serif-luxury tracking-wide">
                Contact Support
              </h4>
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#B9965B] rounded-full" />
            </div>

            <div className="space-y-4 text-sm pt-1">
              {/* Address */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-full border border-[#B9965B]/40 bg-[#B9965B]/10 flex items-center justify-center shrink-0 text-[#B9965B] group-hover:border-[#B9965B] group-hover:bg-[#B9965B]/20 transition-all duration-200 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-[#B9965B] tracking-wide uppercase">
                    Address
                  </p>
                  <p className="text-xs sm:text-sm text-[#FAF7F2]/75 leading-relaxed">
                    B &apos;Surya Enclave Apartment, 8th Main, BTM Layout 1st Stage, Banglore-560029 Karnataka, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-full border border-[#B9965B]/40 bg-[#B9965B]/10 flex items-center justify-center shrink-0 text-[#B9965B] group-hover:border-[#B9965B] group-hover:bg-[#B9965B]/20 transition-all duration-200 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-[#B9965B] tracking-wide uppercase">
                    Phone
                  </p>
                  <a
                    href="tel:+919620078691"
                    className="text-xs sm:text-sm text-[#FAF7F2]/75 hover:text-[#B9965B] transition-colors block leading-relaxed"
                  >
                    + 91 96200 78691
                  </a>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-full border border-[#B9965B]/40 bg-[#B9965B]/10 flex items-center justify-center shrink-0 text-[#B9965B] group-hover:border-[#B9965B] group-hover:bg-[#B9965B]/20 transition-all duration-200 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-[#B9965B] tracking-wide uppercase">
                    Email Us
                  </p>
                  <a
                    href="mailto:info@assanshadi.com"
                    className="text-xs sm:text-sm text-[#FAF7F2]/75 hover:text-[#B9965B] transition-colors block leading-relaxed break-all"
                  >
                    info@assanshadi.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Purity Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#FAF7F2]/60">
          <p className="text-center sm:text-left">
            © 2026 Assan Shadi. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1.5 text-center sm:text-right">
            <span>Built with purity &amp; dignity for simple marriages</span>
            <Heart className="w-3.5 h-3.5 text-[#B9965B] fill-[#B9965B] inline shrink-0" />
          </div>
        </div>
      </div>
    </footer>
  );
};
