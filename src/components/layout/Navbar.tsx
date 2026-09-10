"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ArrowRight,
  Phone,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      id="main-navbar"
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled
          ? "py-2 bg-[#252525]/100 backdrop-blur-md border-b border-white/10 shadow-lg pointer-events-auto"
          : "py-3.5 sm:py-4 bg-[#252525]/100 backdrop-blur-sm border-b border-transparent pointer-events-auto"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between gap-4 py-1 sm:py-2">
            {/* Brand Logo & Tagline */}
            <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group flex-shrink-0">
              {/* Interlocking Double Knot & Heart Logo */}
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-sm"
                >
                  <defs>
                    <linearGradient id="goldKnotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#816235" />
                      <stop offset="35%" stopColor="#B9965B" />
                      <stop offset="65%" stopColor="#D8BE8D" />
                      <stop offset="100%" stopColor="#9D7B47" />
                    </linearGradient>
                  </defs>
                  
                  {/* Interlocking double wedding rings forming pretzel/knot and heart on top */}
                  {/* Left Ring */}
                  <ellipse
                    cx="25"
                    cy="38"
                    rx="13"
                    ry="11"
                    stroke="url(#goldKnotGrad)"
                    strokeWidth="3.2"
                    fill="none"
                    transform="rotate(-20 25 38)"
                  />
                  {/* Right Ring */}
                  <ellipse
                    cx="39"
                    cy="38"
                    rx="13"
                    ry="11"
                    stroke="url(#goldKnotGrad)"
                    strokeWidth="3.2"
                    fill="none"
                    transform="rotate(20 39 38)"
                  />
                  {/* Top Heart Crest / Knot Arch */}
                  <path
                    d="M21 27 C 21 17, 32 16, 32 23 C 32 16, 43 17, 43 27 C 43 32, 32 37, 32 37 C 32 37, 21 32, 21 27 Z"
                    stroke="url(#goldKnotGrad)"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Little inner love droplet */}
                  <circle cx="32" cy="24" r="2.2" fill="url(#goldKnotGrad)" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-serif-luxury tracking-tight text-[#9a6a4f] group-hover:text-[#b17b5d] transition-colors leading-none">
                  Assan Shadi
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium tracking-wider text-[#756D65] mt-1">
                  Trusted. Personal. For Life.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-sans-modern">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative py-1 text-[14px] font-medium transition-colors duration-200",
                      isActive
                        ? "text-[#B9965B] font-semibold"
                        : "text-[#FAF7F2] hover:text-[#B9965B]"
                    )}
                  >
                    {link.label}
                    {/* Active Bottom Red Underline matching reference */}
                    {isActive && (
                      <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-[#B9965B] rounded-full animate-in fade-in" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Side CTA */}
            <div className="hidden md:flex items-center gap-3 sm:gap-4 font-sans-modern">
              {/* Warm Brown Pill CTA Button with Arrow */}
              <Link
                href="/submit-biodata"
                className="inline-flex items-center gap-2 bg-[#9a6a4f] hover:bg-[#b17b5d] text-white text-[13.5px] font-medium px-5 py-2.5 rounded-[5px] shadow-sm transition-all duration-200 hover:shadow hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Create Your Profile</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile Menu Actions */}
            <div className="flex md:hidden items-center gap-1">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-[#FAF7F2] hover:bg-white/5 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 rounded-2xl bg-[#1e1e1e]/95 backdrop-blur-xl border border-white/10 p-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 font-sans-modern">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-white/10 text-[#B9965B] font-semibold"
                        : "text-[#FAF7F2] hover:bg-white/5 hover:text-[#B9965B]"
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#B9965B]" />}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 mt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/submit-biodata"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#9a6a4f] text-white text-sm font-medium py-2.5 rounded-[5px] shadow-sm"
              >
                <span>Create Your Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+919620078691"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2.5 bg-[#252525] hover:bg-[#2e2e2e] text-[#FAF7F2] hover:text-[#e8c078] border border-white/10 hover:border-[#b9965b]/50 py-2.5 px-4 rounded-[5px] text-sm font-medium transition-all shadow-sm group"
              >
                <div className="w-6 h-6 rounded-full bg-[#b9965b]/20 flex items-center justify-center text-[#e8c078] group-hover:scale-110 transition-transform">
                  <Phone className="w-3.5 h-3.5 text-[#e8c078]" />
                </div>
                <span className="font-semibold tracking-wide">Call: +91 96200 78691</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

