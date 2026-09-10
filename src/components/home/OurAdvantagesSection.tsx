"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Users,
  Lock,
  MoonStar,
  Headset,
  Globe,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// Responsive Devices Icon for "Easy to Use" matching the design
const DevicesIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="4" width="11" height="16" rx="2" />
    <path d="M7 17h1" />
    <rect x="14" y="8" width="8" height="12" rx="1.5" />
    <path d="M18 17h.01" />
  </svg>
);

export const OurAdvantagesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const eyebrowLineRef = useRef<HTMLSpanElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const quoteLineRef = useRef<HTMLDivElement | null>(null);
  const verticalSloganRef = useRef<HTMLDivElement | null>(null);
  const mosqueImageRef = useRef<HTMLDivElement | null>(null);
  const cardsGridRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);
  const sloganLineRef = useRef<HTMLSpanElement | null>(null);
  const candleGlowRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);

  // Scroll-driven dynamic line draw references
  const scrollPathRef = useRef<SVGPathElement | null>(null);
  const gridLineRef = useRef<HTMLDivElement | null>(null);
  const gridLineOrbRef = useRef<HTMLDivElement | null>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const advantages = [
    {
      id: "verified-profiles",
      title: "Verified Profiles",
      desc: "Manually verified for your safety.",
      icon: ShieldCheck,
      badge: "01",
    },
    {
      id: "genuine-intentions",
      title: "Genuine Intentions",
      desc: "Serious members only.",
      icon: Users,
      badge: "02",
    },
    {
      id: "privacy-security",
      title: "Privacy & Security",
      desc: "Your information stays confidential.",
      icon: Lock,
      badge: "03",
    },
    {
      id: "islamic-values",
      title: "Islamic Values",
      desc: "Built on faith, respect and deen.",
      icon: MoonStar,
      badge: "04",
    },
    {
      id: "dedicated-support",
      title: "Dedicated Support",
      desc: "We're here to help you at every step.",
      icon: Headset,
      badge: "05",
    },
    {
      id: "easy-to-use",
      title: "Easy to Use",
      desc: "Simple, modern and accessible.",
      icon: DevicesIcon,
      badge: "06",
    },
    {
      id: "global-reach",
      title: "Global Reach",
      desc: "Find matches locally or worldwide.",
      icon: Globe,
      badge: "07",
    },
    {
      id: "meaningful-community",
      title: "A Meaningful Community",
      desc: "Real people, real stories.",
      icon: Heart,
      badge: "08",
    },
  ];

  // Interactive Spotlight tracking across the grid
  const handleGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardsGridRef.current) return;
    const rect = cardsGridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  // 3D Tilt micro-interaction per card
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / (rect.height / 2)) * 3.5;
    const ry = (x / (rect.width / 2)) * 3.5;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Living Candle Flame Flicker Animation
      if (candleGlowRef.current) {
        gsap.to(candleGlowRef.current, {
          scale: 1.18,
          opacity: 0.85,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Subtle Floating Particles
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll(".gold-dust");
        particles.forEach((p, idx) => {
          gsap.to(p, {
            y: -25 - idx * 6,
            x: idx % 2 === 0 ? 12 : -12,
            opacity: idx % 2 === 0 ? 0.9 : 0.4,
            duration: 3 + idx * 0.7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: idx * 0.3,
          });
        });
      }

      // ── SCROLL-DRIVEN LINE DRAWING ANIMATIONS ──
      // 1. Eyebrow gold line draws out on scroll
      if (eyebrowLineRef.current) {
        gsap.fromTo(
          eyebrowLineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 2. Quote underline draws out on scroll
      if (quoteLineRef.current) {
        gsap.fromTo(
          quoteLineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.85,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 3. Flowing SVG Golden Thread Line Draw across the section (Scrub-driven)
      if (scrollPathRef.current) {
        const path = scrollPathRef.current;
        const pathLength = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 1.3,
          },
        });
      }

      // 4. Horizontal Golden Laser Line Draw between Card Rows with Traveling Orb
      if (gridLineRef.current) {
        gsap.fromTo(
          gridLineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 75%",
              end: "center 45%",
              scrub: 1.2,
            },
          }
        );
      }

      if (gridLineOrbRef.current) {
        gsap.fromTo(
          gridLineOrbRef.current,
          { left: "0%", opacity: 0, scale: 0.5 },
          {
            left: "100%",
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 75%",
              end: "center 45%",
              scrub: 1.2,
            },
          }
        );
      }

      // 5. Bottom Slogan Line draws out on scroll
      if (sloganLineRef.current) {
        gsap.fromTo(
          sloganLineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomBarRef.current,
              start: "top 92%",
            },
          }
        );
      }

      // Desktop Cinematic Experience (min-width: 1024px)
      mm.add("(min-width: 1024px)", () => {
        if (prefersReducedMotion) {
          gsap.set(
            [
              headerRef.current,
              quoteRef.current,
              verticalSloganRef.current,
              cardsGridRef.current?.children || [],
              bottomBarRef.current,
            ],
            { opacity: 1, y: 0 }
          );
          return;
        }

        // Parallax on Mosque & Lantern Background
        if (mosqueImageRef.current) {
          gsap.fromTo(
            mosqueImageRef.current,
            { yPercent: -6, scale: 1.06 },
            {
              yPercent: 6,
              scale: 1.0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }

        // Header & Quote Entrance
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 82%",
            },
          }
        );

        if (quoteRef.current) {
          gsap.fromTo(
            quoteRef.current,
            { opacity: 0, y: 25, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              delay: 0.15,
              ease: "expo.out",
              scrollTrigger: {
                trigger: quoteRef.current,
                start: "top 82%",
              },
            }
          );
        }

        if (verticalSloganRef.current) {
          gsap.fromTo(
            verticalSloganRef.current,
            { opacity: 0, x: 20 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              delay: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: verticalSloganRef.current,
                start: "top 85%",
              },
            }
          );
        }

        // Staggered Wave Reveal of the 8 Advantage Cards with Blur Reduction
        const cards = cardsGridRef.current?.querySelectorAll(".advantage-card") || [];
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: {
              each: 0.08,
              from: "start",
            },
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 78%",
            },
          }
        );

        // Bottom CTA Bar Entrance
        if (bottomBarRef.current) {
          gsap.fromTo(
            bottomBarRef.current,
            { opacity: 0, y: 25, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              ease: "expo.out",
              scrollTrigger: {
                trigger: bottomBarRef.current,
                start: "top 90%",
              },
            }
          );
        }
      });

      // Tablet / Mobile Responsiveness (< 1024px)
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
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

        const cards = cardsGridRef.current?.querySelectorAll(".advantage-card") || [];
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 85%",
            },
          }
        );

        if (bottomBarRef.current) {
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
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="advantages"
      className="relative py-10 lg:py-14 bg-[#171615] text-[#FAF7F2] overflow-hidden border-t border-white/10"
    >
      {/* Background Sheikh Zayed Mosque & Lantern Backdrop on Right */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          ref={mosqueImageRef}
          className="absolute right-0 top-0 w-full lg:w-[54%] h-full opacity-35 lg:opacity-80 will-change-transform"
        >
          <Image
            src="/images/mosque-lantern-sunset.jpg"
            alt="Sheikh Zayed Grand Mosque sunset with glowing Arabic lantern"
            fill
            className="object-cover object-right"
          />
          {/* Seamless Luxury Vignette Blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#171615] via-[#171615]/75 to-transparent hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171615] via-[#171615]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#171615]/80 via-transparent to-[#171615]" />

          {/* Living Candlelight Flame Pulse Glow */}
          <div
            ref={candleGlowRef}
            className="absolute right-[12%] bottom-[16%] w-40 h-40 rounded-full bg-[#f59e0b]/25 blur-3xl pointer-events-none hidden lg:block"
          />
          <div className="absolute right-[14%] bottom-[20%] w-16 h-16 rounded-full bg-[#fbbf24]/40 blur-xl pointer-events-none hidden lg:block" />
        </div>

        {/* Ambient Warm Golden Glows */}
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full bg-[#9a6a4f]/12 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#b9965b]/15 blur-3xl" />

        {/* Floating Ethereal Gold Dust Particles */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none hidden lg:block">
          {[
            { top: "25%", left: "15%", size: 3 },
            { top: "45%", left: "35%", size: 4 },
            { top: "65%", left: "22%", size: 2.5 },
            { top: "35%", left: "55%", size: 3.5 },
            { top: "75%", left: "48%", size: 3 },
            { top: "20%", left: "70%", size: 4 },
          ].map((p, i) => (
            <span
              key={i}
              className="gold-dust absolute rounded-full bg-[#d4af37]/50 blur-[0.5px]"
              style={{
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          ))}
        </div>

        {/* ── INTERACTIVE SCROLL-DRAWN GOLDEN THREAD PATH ── */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="goldThreadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b9965b" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#ffd6b8" stopOpacity="1" />
                <stop offset="100%" stopColor="#9a6a4f" stopOpacity="0.4" />
              </linearGradient>
              <filter id="goldenLaserGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Faint Guide Line */}
            <path
              d="M 60 140 C 350 140, 200 480, 720 480 C 1100 480, 1050 780, 280 840"
              stroke="#b9965b"
              strokeOpacity="0.08"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />

            {/* Active Scroll-Drawn Golden Line */}
            <path
              ref={scrollPathRef}
              d="M 60 140 C 350 140, 200 480, 720 480 C 1100 480, 1050 780, 280 840"
              stroke="url(#goldThreadGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#goldenLaserGlow)"
              className="will-change-transform"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Region: Header & Poetic Callout */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-14">
          {/* Left: Eyebrow, Title & Subtitle */}
          <div ref={headerRef} className="max-w-xl">
            {/* Eyebrow with Animated Scroll-Drawn Line */}
            <div className="inline-flex items-center gap-3 mb-3.5">
              <span
                ref={eyebrowLineRef}
                className="w-12 h-[2px] bg-gradient-to-r from-[#b9965b] to-[#f59e0b] will-change-transform"
              />
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#b9965b] font-semibold font-sans-modern flex items-center gap-2">
                <span>Why Choose Asaan Shaadi</span>
                <Sparkles className="w-3.5 h-3.5 text-[#b9965b]" />
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.15] text-[#FAF7F2] mb-4">
              Our{" "}
              <span className="text-[#c88a64] italic font-serif-luxury font-medium">
                Advantages
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-stone-300 text-sm sm:text-base lg:text-lg font-sans-modern leading-relaxed">
              More than a platform — we're a community built on trust, faith and
              genuine intentions.
            </p>
          </div>

          {/* Right/Center: Floating Poetic Callout */}
          <div className="flex items-start gap-8 lg:mr-20">
            <div ref={quoteRef} className="self-start text-stone-200">
              <p className="font-serif-luxury italic text-base sm:text-lg leading-snug">
                “Trust
                <br />
                Today
                <br />
                Stronger Families
                <br />
                Tomorrow”
              </p>
              {/* Scroll-Drawn Underline */}
              <div
                ref={quoteLineRef}
                className="w-12 h-[2px] bg-gradient-to-r from-[#b9965b] to-[#f59e0b] mt-2.5 will-change-transform"
              />
            </div>

            {/* Ambient Vertical Slogan (visible on large screens) */}
            <div
              ref={verticalSloganRef}
              className="hidden xl:block text-stone-400/80 pl-6 border-l border-white/10"
            >
              <p className="font-serif-luxury italic text-sm text-stone-400 leading-tight">
                Same
                <br />
                Values
                <br />
                Brighter
                <br />
                Tomorrows
              </p>
              <div className="w-8 h-[1.5px] bg-[#b9965b]/50 mt-2" />
            </div>
          </div>
        </div>

        {/* 8 Advantage Cards (4 cols x 2 rows on desktop) with Spotlight Grid */}
        <div className="relative mb-14">
          {/* Scroll-Drawn Glowing Horizontal Divider Beam between Row 1 and Row 2 */}
          <div className="hidden lg:block absolute top-[50%] left-0 right-0 -translate-y-1/2 z-0 pointer-events-none px-2">
            <div className="relative w-full h-[2px] bg-white/5">
              {/* Active Golden Drawn Line */}
              <div
                ref={gridLineRef}
                className="absolute inset-0 bg-gradient-to-r from-[#b9965b]/40 via-[#f59e0b] to-[#c88a64]/80 shadow-[0_0_10px_rgba(245,158,11,0.5)] will-change-transform"
              />
              {/* Traveling Glowing Orb at the tip of the drawn line */}
              <div
                ref={gridLineOrbRef}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#ffd6b8] shadow-[0_0_14px_#f59e0b,0_0_24px_#ffd6b8] will-change-transform"
              />
            </div>
          </div>

          <div
            ref={cardsGridRef}
            onMouseMove={handleGridMouseMove}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 relative z-10"
            style={
              {
                "--mouse-x": `${mousePos.x}px`,
                "--mouse-y": `${mousePos.y}px`,
              } as React.CSSProperties
            }
          >
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="advantage-card group relative bg-[#242220]/90 hover:bg-[#2c2825] border border-white/10 hover:border-[#b9965b]/60 rounded-[5px] p-5 sm:p-6 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#9a6a4f]/25 flex items-center gap-4 backdrop-blur-md min-h-[114px] overflow-hidden will-change-transform cursor-pointer"
                >
                  {/* Modern Bento Spotlight Glow Following Cursor */}
                  <div
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[5px]"
                    style={{
                      background: `radial-gradient(280px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(185, 150, 91, 0.18), transparent 70%)`,
                    }}
                  />

                  {/* Subtle Numeric Badge in Top Right */}
                  <span className="absolute top-2.5 right-3 text-[10px] font-mono tracking-widest text-[#b9965b]/35 group-hover:text-[#b9965b]/90 transition-colors">
                    {item.badge}
                  </span>

                  {/* Circular Icon with Warm Brand Accent & Hover Ripple */}
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-full bg-[#9a6a4f]/20 group-hover:bg-[#9a6a4f]/35 border border-[#9a6a4f]/40 group-hover:border-[#b9965b]/60 flex items-center justify-center text-[#e8a379] group-hover:text-[#ffd6b8] transition-all duration-300 shadow-md shadow-[#9a6a4f]/20">
                      <Icon className="w-6 h-6 stroke-[1.9] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                    </div>
                    {/* Expanding Ripple on Hover */}
                    <div className="absolute inset-0 rounded-full border border-[#b9965b]/0 group-hover:border-[#b9965b]/40 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 z-10">
                    <h3 className="text-sm sm:text-base font-bold font-serif-luxury text-[#FAF7F2] tracking-wide group-hover:text-white transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm font-sans-modern leading-snug mt-1">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Edge Accent Glow Line on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b9965b]/0 to-transparent group-hover:via-[#b9965b] transition-all duration-500" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: CTA Button + Slogan */}
        <div
          ref={bottomBarRef}
          className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-6 border-t border-white/10"
        >
          {/* CTA Button with user's rounded-[5px] & Shimmer sweep */}
          <Link
            href="/submit-biodata"
            className="w-full sm:w-auto relative inline-flex items-center justify-center gap-3 bg-[#9a6a4f] hover:bg-[#b17b5d] text-white font-sans-modern font-semibold px-8 py-3.5 rounded-[5px] transition-all duration-300 shadow-md shadow-[#9a6a4f]/30 hover:shadow-xl hover:shadow-[#9a6a4f]/50 group text-sm sm:text-base tracking-wide overflow-hidden"
          >
            {/* Shimmer Sweep Animation */}
            <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-in-out pointer-events-none" />

            <span className="relative z-10">Join Asaan Shaadi Today</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10" />
          </Link>

          {/* Slogan with Scroll-Drawn Line */}
          <div className="inline-flex items-center gap-3 text-stone-400">
            <span
              ref={sloganLineRef}
              className="w-12 h-[2px] bg-gradient-to-r from-[#b9965b] to-[#f59e0b] will-change-transform"
            />
            <span className="text-xs sm:text-sm tracking-[0.22em] uppercase font-sans-modern font-semibold text-stone-300">
              Good people. Brighter tomorrows.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurAdvantagesSection;
