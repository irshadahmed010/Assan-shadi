"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UserPlus, ShieldCheck, Search, Heart, ArrowRight } from "lucide-react";

export const JourneyToNikahSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinWrapperRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const mosqueImageRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const arrowsRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);

  const steps = [
    {
      num: "01",
      title: "Create Your Profile",
      desc: "Share your basic details and preferences.",
      icon: UserPlus,
    },
    {
      num: "02",
      title: "Get Verified",
      desc: "We manually verify profiles with phone verification.",
      icon: ShieldCheck,
    },
    {
      num: "03",
      title: "Find Compatible Matches",
      desc: "Explore genuine profiles that match your criteria.",
      icon: Search,
    },
    {
      num: "04",
      title: "Connect & Take It Forward",
      desc: "Start a conversation and move towards Nikah with your families.",
      icon: Heart,
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Cinematic Pinned Experience (min-width: 1024px)
      mm.add("(min-width: 1024px)", () => {
        if (prefersReducedMotion) {
          gsap.set(
            [
              headerRef.current,
              quoteRef.current,
              cardsRef.current?.children || [],
              arrowsRef.current?.children || [],
              bottomBarRef.current,
            ],
            { opacity: 1, y: 0 }
          );
          return;
        }

        // Floating ambient animation for Quran quote
        if (quoteRef.current) {
          gsap.to(quoteRef.current, {
            y: -6,
            duration: 3.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        // Main Storytelling Pinned Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Initial State
        gsap.set(headerRef.current, { opacity: 0.15, y: 35 });
        gsap.set(quoteRef.current, { opacity: 0, y: 25, scale: 0.96 });
        if (mosqueImageRef.current) {
          gsap.set(mosqueImageRef.current, { scale: 1.12, yPercent: -4 });
        }

        const stepCards = cardsRef.current?.querySelectorAll(".step-card") || [];
        const connectorArrows = arrowsRef.current?.querySelectorAll(".connector-arrow") || [];

        gsap.set(stepCards, {
          opacity: 0,
          y: 45,
          filter: "blur(6px)",
        });
        gsap.set(connectorArrows, {
          opacity: 0,
          scaleX: 0,
          transformOrigin: "left center",
        });
        gsap.set(bottomBarRef.current, { opacity: 0, y: 25 });

        // 2. Progressive Choreography
        tl.to(
          headerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        )
          .to(
            quoteRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "expo.out",
            },
            0.15
          )
          .to(
            mosqueImageRef.current,
            {
              scale: 1.0,
              yPercent: 4,
              duration: 2.2,
              ease: "none",
            },
            0
          );

        // Animate Step Cards & Connecting Arrows Sequentially
        stepCards.forEach((card, index) => {
          const startTime = 0.35 + index * 0.3;

          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.75,
              ease: "power3.out",
            },
            startTime
          );

          if (connectorArrows[index]) {
            tl.to(
              connectorArrows[index],
              {
                opacity: 1,
                scaleX: 1,
                duration: 0.5,
                ease: "power2.out",
              },
              startTime + 0.2
            );
          }
        });

        // Reveal Bottom Bar
        tl.to(
          bottomBarRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          1.7
        );
      });

      // Tablet / Medium Screens (768px - 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const stepCards = cardsRef.current?.querySelectorAll(".step-card") || [];

        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
            },
          }
        );

        if (quoteRef.current) {
          gsap.fromTo(
            quoteRef.current,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: quoteRef.current,
                start: "top 85%",
              },
            }
          );
        }

        gsap.fromTo(
          stepCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bottomBarRef.current,
              start: "top 90%",
            },
          }
        );
      });

      // Mobile Screens (< 768px)
      mm.add("(max-width: 767px)", () => {
        const stepCards = cardsRef.current?.querySelectorAll(".step-card") || [];

        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );

        gsap.fromTo(
          stepCards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          }
        );

        gsap.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomBarRef.current,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-[#171615]  text-[#FAF7F2] overflow-hidden"
    >
      <div
        ref={pinWrapperRef}
        className="relative min-h-screen lg:h-screen flex flex-col justify-between py-6 lg:py-6 lg:pb-[45px] px-4 sm:px-6 lg:px-12 max-w-[1536px] mx-auto z-10"
      >
        {/* Background Grand Mosque Arch Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div
            ref={mosqueImageRef}
            className="absolute right-0 top-0 w-full lg:w-[54%] h-[420px] lg:h-full opacity-35 lg:opacity-75 transition-transform will-change-transform"
          >
            <Image
              src="/images/mosque-arch-sunset.jpg"
              alt="Sheikh Zayed Grand Mosque sunset architecture"
              fill
              priority
              className="object-cover object-center lg:object-left"
            />
            {/* Smooth Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#171615] via-[#171615]/75 to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171615] via-[#171615]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#171615]/80 via-transparent to-[#171615]" />
          </div>

          {/* Ambient Warm Glow */}
          <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[#9a6a4f]/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-[#b9965b]/15 blur-3xl" />
        </div>

        {/* Top Region: Headline & Quran Callout */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pt-4 sm:pt-6">
          {/* Headline & Subtitle */}
          <div ref={headerRef} className="max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-3.5">
              <span className="w-9 h-[2px] bg-[#b9965b]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#b9965b] font-semibold font-sans-modern">
                How It Works
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.15] text-[#FAF7F2] mb-4">
              Your Journey{" "}
              <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                to Nikah
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-stone-300 text-sm sm:text-base lg:text-lg font-sans-modern leading-relaxed">
              A simple, secure and guided process to help you find a compatible life
              partner, the halal way.
            </p>
          </div>

          {/* Floating Quran Verse Callout */}
          <div
            ref={quoteRef}
            className="self-start lg:self-center bg-[#252320]/75 backdrop-blur-md border border-[#b9965b]/30 rounded-2xl px-6 py-4 shadow-xl shadow-black/25 max-w-xs lg:mr-28"
          >
            <p className="font-serif-luxury italic text-lg sm:text-xl text-[#FAF7F2] tracking-wide text-center">
              “And We created you in pairs”
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="w-5 h-[1px] bg-[#b9965b]" />
              <span className="text-xs tracking-widest text-[#b9965b] uppercase font-sans-modern">
                Qur'an 78:8
              </span>
            </div>
          </div>
        </div>

        {/* Middle Region: 4 Sequential Step Cards + Connector Arrows */}
        <div className="relative z-10 my-8 lg:my-0">
          {/* Connector Arrows Overlay (Desktop Only) */}
          <div
            ref={arrowsRef}
            className="hidden lg:grid grid-cols-4 gap-6 absolute inset-0 pointer-events-none z-20"
          >
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className="connector-arrow flex items-center justify-end pr-[-12px]"
                style={{ gridColumnStart: idx + 1 }}
              >
                <div className="translate-x-7 flex items-center text-[#b9965b]/80">
                  <span className="w-8 border-b-2 border-dashed border-[#b9965b]/60" />
                  <ArrowRight className="w-4 h-4 -ml-1 text-[#b9965b]" />
                </div>
              </div>
            ))}
          </div>

          {/* 4 Cards Grid */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 max-w-[1270px] mx-auto my-12"
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="step-card group relative bg-[#242220]/90 hover:bg-[#2c2926] border border-white/10 hover:border-[#b9965b]/60 rounded-[5px] p-6 sm:p-7 text-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#9a6a4f]/20 hover:-translate-y-2 flex flex-col items-center justify-between min-h-[230px] backdrop-blur-md"
                >
                  {/* Circular Icon with Brand Color */}
                  <div className="w-16 h-16 rounded-full bg-[#9a6a4f]/20 group-hover:bg-[#9a6a4f]/35 border border-[#9a6a4f]/40 flex items-center justify-center text-[#e8a379] group-hover:text-[#ffd6b8] group-hover:scale-110 transition-all duration-300 mb-4 shadow-md shadow-[#9a6a4f]/25">
                    <Icon className="w-7 h-7 stroke-[1.9]" />
                  </div>

                  {/* Step Number */}
                  <span className="text-xs font-semibold tracking-widest text-[#b9965b] uppercase font-sans-modern mb-1">
                    {step.num}
                  </span>

                  {/* Step Title */}
                  <h3 className="text-lg font-bold font-serif-luxury text-[#FAF7F2] tracking-wide mb-2">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-stone-300 text-xs sm:text-sm font-sans-modern leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Region: CTA Button + Slogan */}
        <div
          ref={bottomBarRef}
          className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 pt-4 border-t border-white/10"
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
              Halal connections for a brighter tomorrow
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyToNikahSection;
