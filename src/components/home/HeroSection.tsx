"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Users,
  Gem,
  Star,
  Shield,
  ShieldCheck,
  Lock,
  UserCheck,
  Headset,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ==========================================
// AUTHENTIC INSTITUTION LOGOS (VECTOR SVGs)
// ==========================================

const HarvardLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <svg className="h-7 w-auto" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 1C8 1 1 5 1 15C1 26 11 34 16 37C21 34 31 26 31 15C31 5 24 1 16 1Z"
        fill="#A51C30"
        stroke="#7A1523"
        strokeWidth="1.2"
      />
      {/* 3 Open Books */}
      <rect x="7" y="8" width="8" height="6.5" rx="0.8" fill="#FFFDF9" />
      <rect x="17" y="8" width="8" height="6.5" rx="0.8" fill="#FFFDF9" />
      <rect x="12" y="19" width="8" height="6.5" rx="0.8" fill="#FFFDF9" />
      {/* Book details */}
      <text x="8.5" y="13" fill="#A51C30" fontSize="4" fontWeight="bold" fontFamily="serif">VE</text>
      <text x="18.5" y="13" fill="#A51C30" fontSize="4" fontWeight="bold" fontFamily="serif">RI</text>
      <text x="13" y="24" fill="#A51C30" fontSize="3.8" fontWeight="bold" fontFamily="serif">TAS</text>
    </svg>
    <div className="flex flex-col text-left leading-none">
      <span className="font-serif-luxury font-bold text-[12px] tracking-[0.14em] text-[#1E1B18]">HARVARD</span>
      <span className="text-[7.5px] font-sans-modern tracking-[0.22em] text-[#756D65] uppercase font-medium mt-0.5">UNIVERSITY</span>
    </div>
  </div>
);

const StanfordLogo: React.FC = () => (
  <div className="flex items-center gap-1.5">
    <div className="flex flex-col text-left leading-none">
      <span className="font-serif-luxury font-bold text-[15px] text-[#8C1515] tracking-tight">Stanford</span>
      <span className="text-[8.5px] font-serif-luxury text-[#8C1515] tracking-[0.12em] uppercase font-medium">University</span>
    </div>
  </div>
);

const MitLogo: React.FC = () => (
  <div className="flex items-center">
    <svg className="h-6 w-auto" viewBox="0 0 54 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* M */}
      <rect x="0" y="0" width="6" height="28" fill="#A31F34" />
      <rect x="10" y="0" width="6" height="18" fill="#A31F34" />
      <rect x="20" y="0" width="6" height="28" fill="#A31F34" />
      {/* I */}
      <rect x="30" y="0" width="6" height="28" fill="#A31F34" />
      {/* T */}
      <rect x="40" y="0" width="14" height="6.5" fill="#A31F34" />
      <rect x="44" y="9.5" width="6" height="18.5" fill="#A31F34" />
    </svg>
  </div>
);

const OxfordLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <svg className="h-7 w-auto" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 1C8 1 1 5 1 15C1 26 11 34 16 37C21 34 31 26 31 15C31 5 24 1 16 1Z"
        fill="#002147"
        stroke="#001633"
        strokeWidth="1.2"
      />
      {/* Crown top left */}
      <path d="M7 8 L9 13 L11 9 L13 13 L15 8 L13 15 L9 15 Z" fill="#D4AF37" />
      {/* Crown top right */}
      <path d="M17 8 L19 13 L21 9 L23 13 L25 8 L23 15 L19 15 Z" fill="#D4AF37" />
      {/* Open Book */}
      <rect x="10" y="18" width="12" height="9" rx="1" fill="#FFFDF9" />
      <line x1="16" y1="18" x2="16" y2="27" stroke="#002147" strokeWidth="0.8" />
      <text x="11.2" y="23" fill="#002147" fontSize="2.8" fontWeight="bold" fontFamily="serif">DOMI</text>
      <text x="17" y="23" fill="#002147" fontSize="2.8" fontWeight="bold" fontFamily="serif">MINA</text>
      {/* Crown bottom */}
      <path d="M12 29 L14 33 L16 30 L18 33 L20 29 L18 35 L14 35 Z" fill="#D4AF37" />
    </svg>
    <span className="font-serif-luxury font-bold text-[14px] tracking-wide text-[#002147]">Oxford</span>
  </div>
);

const NyuLogo: React.FC = () => (
  <div className="flex items-center gap-1.5">
    <div className="w-6 h-6 bg-[#57068C] rounded flex items-center justify-center shadow-xs">
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L9 8H15L12 2ZM11 10H13V18H11V10ZM8 20H16V22H8V20Z" />
      </svg>
    </div>
    <span className="font-sans-modern font-black text-[15px] tracking-wider text-[#57068C]">NYU</span>
  </div>
);

const NusLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <svg className="h-7 w-auto" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 1C8 1 1 5 1 15C1 26 12 34 17 37C22 34 33 26 33 15C33 5 26 1 17 1Z"
        fill="#003D7C"
      />
      {/* Orange crest upper bar */}
      <path d="M4 11 C4 7 10 4 17 4 C24 4 30 7 30 11 L30 14 L4 14 Z" fill="#EF7C00" />
      {/* Lion emblem silhouette */}
      <circle cx="17" cy="9" r="3.5" fill="#FFFDF9" />
      {/* Open book */}
      <rect x="8" y="19" width="18" height="11" rx="1" fill="#FFFDF9" />
      <line x1="17" y1="19" x2="17" y2="30" stroke="#003D7C" strokeWidth="1" />
    </svg>
    <div className="flex flex-col text-left leading-none">
      <span className="font-sans-modern font-black text-[14px] tracking-wide text-[#003D7C]">NUS</span>
      <span className="text-[6.5px] font-sans-modern text-[#756D65] tracking-wider font-semibold uppercase mt-0.5">
        National University<br />of Singapore
      </span>
    </div>
  </div>
);

// ==========================================
// HERO COMPONENT
// ==========================================

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const betterTogetherRef = useRef<HTMLDivElement | null>(null);
  const storyCardRef = useRef<HTMLDivElement | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Render instantly for users who prefer reduced motion
        gsap.set(
          [
            "#main-navbar",
            "#hero-eyebrow",
            "#hero-title-line-1",
            "#hero-title-line-2",
            "#hero-desc",
            "#hero-cta",
            ".stat-item",
            imageRef.current,
            betterTogetherRef.current,
            storyCardRef.current,
            ".partner-item",
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }
        );
        return;
      }

      // 1. Initial State Setup (Avoid visual jumps / layout shifts)
      gsap.set("#main-navbar", { y: -30, opacity: 0, filter: "blur(8px)" });
      gsap.set("#hero-eyebrow", { y: 22, opacity: 0, filter: "blur(4px)" });
      gsap.set("#hero-title-line-1", { y: 35, opacity: 0, filter: "blur(6px)" });
      gsap.set("#hero-title-line-2", { y: 35, opacity: 0, filter: "blur(6px)" });
      gsap.set("#hero-desc", { y: 25, opacity: 0, filter: "blur(4px)" });
      gsap.set("#hero-cta", { y: 20, opacity: 0 });
      gsap.set(".stat-item", { y: 25, opacity: 0, scale: 0.95 });

      if (imageRef.current) {
        gsap.set(imageRef.current, { scale: 1.08, opacity: 0 });
      }
      if (betterTogetherRef.current) {
        gsap.set(betterTogetherRef.current, {
          opacity: 0,
          scale: 0.92,
          y: 15,
          filter: "blur(4px)",
        });
      }
      if (storyCardRef.current) {
        gsap.set(storyCardRef.current, { opacity: 0, y: 30, scale: 0.92 });
      }

      // 2. Cinematic Entrance Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Step 1: Navbar slides in smoothly with blur-to-sharp transition
      tl.to("#main-navbar", {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power3.out",
      })

        // Step 2: Wedding couple image slow scale-in (1.08 to 1.0) and opacity fade
        .to(
          imageRef.current,
          {
            scale: 1.0,
            opacity: 1,
            duration: 1.6,
            ease: "power2.out",
          },
          "-=0.6"
        )

        // Step 3: Left eyebrow text reveals
        .to(
          "#hero-eyebrow",
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
          },
          "-=1.3"
        )

        // Step 4: Headline Line 1: 'A Partnership'
        .to(
          "#hero-title-line-1",
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.6"
        )

        // Step 5: Headline Line 2: 'For Life'
        .to(
          "#hero-title-line-2",
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.7"
        )

        // Step 6: Description text
        .to(
          "#hero-desc",
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.85,
          },
          "-=0.6"
        )

        // Step 7: CTA Buttons
        .to(
          "#hero-cta",
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
          },
          "-=0.5"
        )

        // Step 8: Statistics sequentially
        .to(
          ".stat-item",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
          },
          "-=0.5"
        )

        // Step 9: 'Better Together' handwritten script gently draws/fades in after image
        .to(
          betterTogetherRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.4"
        )

        // Step 10: Floating 'Our Story' video card entrance
        .to(
          storyCardRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "expo.out",
            onComplete: () => {
              // Add subtle continuous floating effect
              if (storyCardRef.current) {
                gsap.to(storyCardRef.current, {
                  y: "-=8",
                  duration: 3.2,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                });
              }
            },
          },
          "-=0.7"
        );

      // 3. Staggered fade-up for University / Institution logos with ScrollTrigger
      gsap.fromTo(
        ".partner-item",
        {
          y: 22,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#trusted-institutions-bar",
            start: "top 94%",
            toggleActions: "play none none none",
          },
        }
      );

      // 4. Subtle scroll-based parallax to hero image and ambient lighting
      if (imageRef.current && sectionRef.current) {
        gsap.to(imageRef.current, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      gsap.to(".hero-ambient-glow", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 5. Subtle horizontal parallax on mouse movement for right-side wedding couple
      const handleMouseMove = (e: MouseEvent) => {
        if (!sectionRef.current || !imageRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(imageRef.current, {
          x: x * 14,
          y: y * 10,
          duration: 1.4,
          ease: "power1.out",
          overwrite: "auto",
        });

        if (betterTogetherRef.current) {
          gsap.to(betterTogetherRef.current, {
            x: -x * 12,
            y: -y * 8,
            duration: 1.6,
            ease: "power1.out",
            overwrite: "auto",
          });
        }
      };

      const sectionElement = sectionRef.current;
      if (sectionElement) {
        sectionElement.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        if (sectionElement) {
          sectionElement.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="hero-section"
        className="relative overflow-hidden bg-[#252525] pt-4 sm:pt-6 lg:pt-8 pb-10 sm:pb-12 text-[#FAF7F2] max-w-[1450px] mx-auto"
      >
        {/* Soft Ambient Palace Glow & Lighting */}
        <div className="hero-ambient-glow absolute top-0 left-0 w-[550px] h-[550px] bg-gradient-to-br from-[#9a6a4f]/25 via-[#b9965b]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="hero-ambient-glow absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-gradient-to-tl from-[#b9965b]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Hero Grid: Left Content & Right Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[580px] lg:min-h-[640px]">
            {/* ========================================================= */}
            {/* LEFT COLUMN: Eyebrow, Luxury Headline, CTA, Statistics */}
            {/* ========================================================= */}
            <div className="lg:col-span-7 xl:col-span-7 z-10 pt-2 sm:pt-4 lg:pt-0">
              {/* Eyebrow Text */}
              <div id="hero-eyebrow" className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#B9965B] uppercase font-sans-modern">
                  More Than A Match
                </span>
                <span className="w-12 sm:w-16 h-[1.5px] bg-[#B9965B]/60 rounded-full" />
              </div>

              {/* Main Headline */}
              <h1 className="font-serif-luxury tracking-tight leading-[1.08] sm:leading-[1.04] text-[#FAF7F2] text-4xl sm:text-5xl lg:text-[68px] xl:text-[76px] mb-6">
                <span
                  id="hero-title-line-1"
                  className="block font-normal font-serif-luxury text-[#FAF7F2]"
                >
                  A Partnership
                </span>
                <span
                  id="hero-title-line-2"
                  className="block font-serif-luxury italic font-normal text-[#B9965B]"
                >
                  For Life
                </span>
              </h1>

              {/* Description */}
              <p
                id="hero-desc"
                className="text-base sm:text-lg text-[#FAF7F2]/80 max-w-xl leading-relaxed mb-8 sm:mb-10 font-sans-modern font-normal"
              >
                Where intentional commitment meets deep companionship. Verified profiles, family involvement, and a sunnah-centric approach designed to make honorable matrimony simple and beautiful.
              </p>

              {/* CTA Action Buttons */}
              <div id="hero-cta" className="flex flex-wrap items-center gap-4 mb-6 sm:mb-8">
                <Link
                  href="/submit-biodata"
                  className="inline-flex items-center gap-2.5 bg-[#9a6a4f] hover:bg-[#b17b5d] text-white text-sm sm:text-[15px] font-medium px-7 sm:px-8 py-3.5 sm:py-4 rounded-[5px] shadow-[0_4px_20px_rgba(154,106,79,0.35)] hover:shadow-[0_8px_28px_rgba(154,106,79,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Statistics Row */}
              <div
                id="hero-stats"
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/10"
              >
                {/* 1. Complete Privacy Protected */}
                <div className="stat-item flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#B9965B] mb-2.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="text-sm sm:text-base font-bold font-serif-luxury text-[#FAF7F2] leading-snug mb-0.5">
                    Complete Privacy
                  </div>
                  <div className="text-xs text-stone-400 font-sans-modern font-normal">
                    Protected
                  </div>
                </div>

                {/* 2. Trusted & Genuine Profiles */}
                <div className="stat-item flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#B9965B] mb-2.5">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="text-sm sm:text-base font-bold font-serif-luxury text-[#FAF7F2] leading-snug mb-0.5">
                    Trusted &amp; Genuine
                  </div>
                  <div className="text-xs text-stone-400 font-sans-modern font-normal">
                    Profiles
                  </div>
                </div>

                {/* 3. Safe & Trusted Platform */}
                <div className="stat-item flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#B9965B] mb-2.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-sm sm:text-base font-bold font-serif-luxury text-[#FAF7F2] leading-snug mb-0.5">
                    Safe &amp; Trusted
                  </div>
                  <div className="text-xs text-stone-400 font-sans-modern font-normal">
                    Platform
                  </div>
                </div>

                {/* 4. 24/7 Dedicated Support */}
                <div className="stat-item flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#B9965B] mb-2.5">
                    <Headset className="w-4 h-4" />
                  </div>
                  <div className="text-sm sm:text-base font-bold font-serif-luxury text-[#FAF7F2] leading-snug mb-0.5">
                    24/7 Dedicated
                  </div>
                  <div className="text-xs text-stone-400 font-sans-modern font-normal">
                    Support
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: Wedding Couple Photo + Better Together + Video */}
            {/* ========================================================= */}
            <div className="lg:col-span-5 xl:col-span-5 relative w-full h-[450px] sm:h-[520px] lg:h-[630px] flex items-center justify-center">
              {/* Couple Image with Seamless Background Edge Mask */}
              <div
                ref={imageContainerRef}
                className="relative w-full h-full overflow-hidden rounded-3xl lg:rounded-none select-none"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.7) 12%, black 28%, black 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.7) 12%, black 28%, black 100%)",
                }}
              >
                <img
                  ref={imageRef}
                  src="/images/muslim-wedding-couple.jpg"
                  alt="A Partnership For Life - Dignified Matrimony"
                  className="w-full h-full object-cover object-[62%_24%] scale-[1.08] will-change-transform"
                />
                {/* Subtle warm golden palace tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* 'Better Together' Handwritten Script (Top Right) */}
              <div
                ref={betterTogetherRef}
                className="absolute top-3 sm:top-2 right-5 sm:-right-6 z-20 pointer-events-none select-none text-right p-3 rounded-[5px] bg-white"
                style={{ transform: "rotate(-10deg)" }}
              >
                <div className="font-script text-[#9a6a4f] text-2xl sm:text-4xl lg:text-[35px] leading-[0.88] drop-shadow-xs">
                  Better<br />
                  <span className="pl-4">Together</span>
                </div>
                {/* Ornamental Gold Divider Dash */}
                <div className="flex items-center justify-end gap-1.5 mt-2 mr-2">
                  <span className="w-5 h-[1.5px] bg-[#B9965B]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B9965B]" />
                  <span className="w-5 h-[1.5px] bg-[#B9965B]" />
                </div>
              </div>

              {/* Floating 'Our Story' Video Card (Bottom Right) */}
              <div
                ref={storyCardRef}
                onClick={() => setIsVideoOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsVideoOpen(true);
                  }
                }}
                aria-label="Watch Our Story Video"
                className="absolute bottom-4 sm:bottom-8 right-2 sm:right-6 z-20 cursor-pointer group bg-[#1e1e1e]/90 hover:bg-[#282828] backdrop-blur-md border border-white/15 rounded-[5px] p-2.5 sm:p-3 pr-5 sm:pr-6 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.5)] hover:shadow-[0_18px_40px_-8px_rgba(154,106,79,0.3)] transition-all duration-300 flex items-center gap-3.5 select-none"
              >
                {/* Play Button Icon */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 shadow-sm flex items-center justify-center flex-shrink-0 text-[#B9965B] group-hover:scale-105 transition-transform duration-300 border border-white/15">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-[#B9965B] text-[#B9965B] translate-x-0.5" />
                </div>
                {/* Text Labels */}
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-[13.5px] font-semibold text-[#FAF7F2] tracking-tight group-hover:text-[#B9965B] transition-colors">
                    Our Story
                  </span>
                  <span className="text-[10.5px] sm:text-[11px] font-medium text-stone-400 font-sans-modern">
                    Watch Video
                  </span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ========================================================= */}
      {/* VIDEO MODAL (WHEN 'OUR STORY' IS CLICKED) */}
      {/* ========================================================= */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#1e1e1e] rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden text-[#FAF7F2]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="text-left mb-5">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#B9965B] uppercase font-sans-modern">
                Our Story • Assan Shadi
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF7F2] mt-1">
                Celebrating Pure Unions & Dignified Companionship
              </h3>
              <p className="text-sm text-stone-300 mt-1.5">
                A documentary look into how verified, guardian-supported marriages bring lasting happiness.
              </p>
            </div>

            {/* Cinematic Video Showcase Container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 border border-[#E7DDD0]/80 shadow-inner flex items-center justify-center group">
              <img
                src="/images/muslim-wedding-couple.jpg"
                alt="Our Story Video Preview"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#9a6a4f] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-[#9a6a4f] translate-x-0.5" />
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-[#756D65]">
                100% Guardian-Verified Matrimony
              </span>
              <Link
                href="/submit-biodata"
                onClick={() => setIsVideoOpen(false)}
                className="inline-flex items-center gap-2 bg-[#9a6a4f] hover:bg-[#b17b5d] text-white text-xs font-medium px-4 py-2 rounded-full transition-all"
              >
                <span>Browse Verified Profiles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
