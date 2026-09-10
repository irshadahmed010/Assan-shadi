"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, ArrowRight } from "lucide-react";

// Binoculars Icon for Vision matching the design
const BinocularsIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="6.5" cy="15.5" r="3.5" />
    <circle cx="17.5" cy="15.5" r="3.5" />
    <path d="M14 15.5a3.5 3.5 0 0 0-4 0" />
    <path d="M7 12V7a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v5" />
    <path d="M14.5 12V7a1 1 0 0 1 1-1H17a1 1 0 0 1 1 1v5" />
    <path d="M10.5 8h3" />
  </svg>
);

// Mountain Peak with Flag Icon for Mission matching the design
const MountainFlagIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2.5v5" />
    <path d="M12 3l4.5 2L12 7" />
    <path d="M3.5 21l8.5-13.5 8.5 13.5H3.5z" />
    <path d="M9 14.5l3-2.5 3 2.5" />
  </svg>
);

export const OurMissionVisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mosqueContainerRef = useRef<HTMLDivElement | null>(null);
  const mosqueImageRef = useRef<HTMLDivElement | null>(null);
  const headingWrapperRef = useRef<HTMLDivElement | null>(null);
  const cardsWrapperRef = useRef<HTMLDivElement | null>(null);
  const ctaWrapperRef = useRef<HTMLDivElement | null>(null);

  const pillars = [
    {
      id: "intention",
      title: "Our Intention",
      icon: Target,
      desc: "From the first stages it's been our goal to assist you connect with somebody of your selection for a lasting relationship. Our approach is a fusion of modern matchmaking principles with integration of contemporary technology.",
      fromDirection: { x: -30, y: 35 },
    },
    {
      id: "vision",
      title: "Our Vision",
      icon: BinocularsIcon,
      desc: "To be the No.1 in our niche and introduce new options useful to members. To continue to grow with a loyal and increasing client network across the world.",
      fromDirection: { x: 0, y: 45 },
    },
    {
      id: "mission",
      title: "Our Mission",
      icon: MountainFlagIcon,
      desc: "To help you progress nearer to the desired outcome with convenience. To provide a secure and progressive matchmaking platform, supply new matchmaking options to fulfill member expectations, and ensure continuous growth in our membership base around the world.",
      fromDirection: { x: 30, y: 35 },
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Cinematic Experience (min-width: 1024px)
      mm.add("(min-width: 1024px)", () => {
        if (prefersReducedMotion) {
          gsap.set(
            [
              headingWrapperRef.current,
              cardsWrapperRef.current?.children || [],
              ctaWrapperRef.current,
              mosqueContainerRef.current,
            ],
            { opacity: 1, x: 0, y: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
          );
          return;
        }

        // 1. Cinematic Clip-path reveal of Mosque Image
        if (mosqueContainerRef.current) {
          gsap.fromTo(
            mosqueContainerRef.current,
            { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", opacity: 0.2 },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              opacity: 1,
              duration: 1.4,
              ease: "expo.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
              },
            }
          );
        }

        // 2. Scrub-based Parallax on Mosque Image
        if (mosqueImageRef.current) {
          gsap.fromTo(
            mosqueImageRef.current,
            { yPercent: -8, scale: 1.08 },
            {
              yPercent: 8,
              scale: 1.0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            }
          );
        }

        // 3. Staggered Heading Reveal by segments
        const headingSegments = headingWrapperRef.current?.querySelectorAll(".heading-segment") || [];
        gsap.fromTo(
          headingSegments,
          { opacity: 0, y: 35, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingWrapperRef.current,
              start: "top 80%",
            },
          }
        );

        // 4. Directional 3-Cards Reveal
        const cards = cardsWrapperRef.current?.querySelectorAll(".purpose-card") || [];
        cards.forEach((card, idx) => {
          const dir = pillars[idx]?.fromDirection || { x: 0, y: 40 };
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: dir.x,
              y: dir.y,
              scale: 0.96,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.9,
              delay: idx * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsWrapperRef.current,
                start: "top 78%",
              },
            }
          );
        });

        // 5. CTA + Slogan Bar Reveal
        if (ctaWrapperRef.current) {
          gsap.fromTo(
            ctaWrapperRef.current,
            { opacity: 0, scale: 0.94, y: 25 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.85,
              ease: "expo.out",
              scrollTrigger: {
                trigger: ctaWrapperRef.current,
                start: "top 90%",
              },
            }
          );
        }
      });

      // Tablet / Mobile Media (max-width: 1023px)
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          headingWrapperRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingWrapperRef.current,
              start: "top 85%",
            },
          }
        );

        const cards = cardsWrapperRef.current?.querySelectorAll(".purpose-card") || [];
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsWrapperRef.current,
              start: "top 85%",
            },
          }
        );

        if (ctaWrapperRef.current) {
          gsap.fromTo(
            ctaWrapperRef.current,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ctaWrapperRef.current,
                start: "top 90%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mission-vision"
      className="relative py-10 lg:py-14 bg-[#1f1d1b] text-[#FAF7F2] overflow-hidden border-t border-white/10"
    >
      {/* Background Left Mosque Arch Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          ref={mosqueContainerRef}
          className="absolute left-0 top-0 w-full lg:w-[48%] h-full opacity-35 lg:opacity-75"
        >
          <div
            ref={mosqueImageRef}
            className="relative w-full h-full will-change-transform"
          >
            <Image
              src="/images/mosque-arch-left.jpg"
              alt="Majestic Islamic Mosque Arch Architecture"
              fill
              className="object-cover object-top lg:object-center"
            />
            {/* Smooth Vignette to blend into dark background on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1f1d1b]/70 to-[#1f1d1b]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1f1d1b]/80 via-transparent to-[#1f1d1b]" />
          </div>
        </div>

        {/* Ambient Warm Golden Glows */}
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full bg-[#9a6a4f]/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-[#b9965b]/15 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Region */}
        <div ref={headingWrapperRef} className="max-w-2xl mb-14 lg:ml-auto">
          {/* Eyebrow */}
          <div className="heading-segment inline-flex items-center gap-3 mb-3.5">
            <span className="w-10 h-[2px] bg-[#b9965b]" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#b9965b] font-semibold font-sans-modern">
              Our Purpose
            </span>
          </div>

          {/* Heading */}
          <h2 className="heading-segment text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.15] text-[#FAF7F2] mb-4">
            Our Intention,{" "}
            <span className="text-[#c88a64] italic font-serif-luxury font-medium">
              Vision & Mission
            </span>
          </h2>

          {/* Subtitle */}
          <p className="heading-segment text-stone-300 text-sm sm:text-base lg:text-lg font-sans-modern leading-relaxed">
            Guided by faith, driven by purpose — for stronger families and a
            better Ummah.
          </p>
        </div>

        {/* Three Core Purpose Cards */}
        <div
          ref={cardsWrapperRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="purpose-card group relative bg-[#2a2825]/90 hover:bg-[#322f2b] border border-white/10 hover:border-[#b9965b]/60 rounded-[5px] p-7 lg:p-8 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#9a6a4f]/20 hover:-translate-y-2 flex flex-col justify-between backdrop-blur-md min-h-[300px]"
              >
                <div>
                  {/* Card Header: Icon + Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-[#9a6a4f]/20 group-hover:bg-[#9a6a4f]/35 border border-[#9a6a4f]/45 flex items-center justify-center text-[#e8a379] group-hover:text-[#ffd6b8] group-hover:scale-110 transition-all duration-300 shadow-md shadow-[#9a6a4f]/20 shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold font-serif-luxury text-[#FAF7F2] tracking-wide">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Body Text */}
                  <p className="text-stone-300 text-sm font-sans-modern leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Subtle Card Accent Line at Bottom */}
                <div className="w-10 h-[2px] bg-[#b9965b]/40 group-hover:bg-[#b9965b] group-hover:w-16 transition-all duration-300 mt-6" />
              </div>
            );
          })}
        </div>

        {/* Bottom Region: CTA Button + Slogan */}
        <div
          ref={ctaWrapperRef}
          className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-6 border-t border-white/10"
        >
          <Link
            href="#register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#9a6a4f] hover:bg-[#b17b5d] text-white font-sans-modern font-semibold px-8 py-3.5 rounded-[5px] transition-all duration-300 shadow-md shadow-[#9a6a4f]/30 hover:shadow-xl hover:shadow-[#9a6a4f]/50 group text-sm sm:text-base tracking-wide"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>

          <div className="inline-flex items-center gap-3 text-stone-400">
            <span className="w-10 h-[2px] bg-[#b9965b]" />
            <span className="text-xs sm:text-sm tracking-[0.22em] uppercase font-sans-modern font-semibold text-stone-300">
              Stronger families. A brighter tomorrow.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMissionVisionSection;
