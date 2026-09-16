"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Star, Heart, Quote, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export const HappyMarriagesSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const stories = [
    {
      id: "ayaan-saba",
      image: "/images/couple-ayaan-saba.jpg",
      alt: "Ayaan and Saba blessed marriage story",
      quote:
        "“Asaan Shaadi made our journey simple and blessed. We found not just a partner, but a true companion in faith and life. The wali verification gave both our families complete reassurance.”",
      author: "Ayaan & Saba",
      location: "Married 2024 • Bengaluru, Karnataka",
      badge: "Guardian Verified",
      rating: 5,
    },
    {
      id: "hamza-areeba",
      image: "/images/couple-hamza-areeba.jpg",
      alt: "Hamza and Areeba blessed marriage story",
      quote:
        "“A trusted platform with genuine profiles. Zero commercial exploitation and 100% family dignity. Alhamdulillah, we are happily married and grateful for this noble sunnah initiative.”",
      author: "Hamza & Areeba",
      location: "Married 2025 • Delhi NCR & Bengaluru",
      badge: "Verified Nikah",
      rating: 5,
    },
    {
      id: "zaid-hira",
      image: "/images/couple-zaid-hira.jpg",
      alt: "Zaid and Hira blessed marriage story",
      quote:
        "“It felt different here — more halal, more peaceful, and completely free from dowry culture. Strict photo privacy and respectful family interaction throughout the process.”",
      author: "Zaid & Hira",
      location: "Married 2024 • Lucknow, Uttar Pradesh",
      badge: "Zero Dowry Union",
      rating: 5,
    },
    {
      id: "bilal-zainab",
      image: "/images/muslim-wedding-couple.jpg",
      alt: "Bilal and Zainab blessed marriage story",
      quote:
        "“Finding a compatible practicing spouse with mutual family respect was seamless on Asaan Shaadi. The personalized guidance helped both our families coordinate with utmost ease.”",
      author: "Bilal & Zainab",
      location: "Married 2025 • Mumbai & Hyderabad",
      badge: "Family Harmony",
      rating: 5,
    },
    {
      id: "farhan-maryam",
      image: "/images/hero-wedding-couple.webp",
      alt: "Farhan and Maryam blessed marriage story",
      quote:
        "“What stood out most was the dignified approach. No superficial swiping or spam calls. Both families met with pure intentions, and Allah SWT blessed our marriage with barakah.”",
      author: "Farhan & Maryam",
      location: "Married 2024 • Hyderabad, Telangana",
      badge: "Family First",
      rating: 5,
    },
    {
      id: "usman-fatima",
      image: "/images/gallery-couple-sunset.jpg",
      alt: "Usman and Fatima blessed marriage story",
      quote:
        "“SubhanAllah, the entire process was seamless. From verified biodatas to clear communication, Asaan Shaadi brings back purity and honor to Muslim matrimonial matchmaking.”",
      author: "Usman & Fatima",
      location: "Married 2025 • Mumbai & Pune",
      badge: "Sunnah Inspired",
      rating: 5,
    },
  ];

  // Duplicate for smooth, continuous infinite sliding
  const infiniteStories = [...stories, ...stories];

  const handleManualScroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const scrollAmount = direction === "left" ? -380 : 380;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      id="happy-marriages"
      className="relative py-14 sm:py-16 lg:py-20 bg-[#1a1816] text-[#FAF7F2] overflow-hidden border-t border-white/10"
    >
      {/* Background Ambience & Warm Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#9a6a4f]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#b9965b]/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#b9965b 1.2px, transparent 1.2px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-12">
          {/* Left: Eyebrow + Main Title + Subtitle */}
          <div className="max-w-2xl">
            {/* Modern Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#c2794c]/20 border border-[#c2794c]/50 text-[#FFD78A] text-xs font-bold uppercase tracking-widest font-sans-modern mb-3.5">
              <Heart className="w-3.5 h-3.5 text-[#FFD78A] fill-[#FFD78A]" />
              <span>REAL STORIES</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight leading-[1.15] text-white">
              Happy{" "}
              <span className="text-[#FFD78A] font-medium italic font-serif-luxury">
                Marriages
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-stone-200 text-xs sm:text-sm lg:text-base font-sans-modern leading-relaxed mt-2 max-w-xl">
              Alhamdulillah, countless families have found their righteous companions through
              Asaan Shaadi. Read the authentic experiences of our blessed couples.
            </p>
          </div>

          {/* Right: Poetic Callout & Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-6 pt-2">
            <div className="hidden sm:block text-right pr-2">
              <p className="font-serif-luxury italic text-[#FFD78A] text-sm leading-snug">
                “When intentions are sincere,
                <br />
                Allah unites the hearts.”
              </p>
            </div>

            {/* Navigation Buttons for Manual Step */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleManualScroll("left")}
                aria-label="Previous stories"
                className="w-10 h-10 rounded-[6px] border border-white/20 hover:border-[#FFD78A] bg-[#25221f] hover:bg-[#302a24] text-[#FFD78A] flex items-center justify-center transition-all duration-200 shadow-md active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 text-[#FFD78A]" />
              </button>
              <button
                type="button"
                onClick={() => handleManualScroll("right")}
                aria-label="Next stories"
                className="w-10 h-10 rounded-[6px] btn-primary-glow text-white flex items-center justify-center transition-all duration-200 shadow-md active:scale-95"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Carousel Container with Left & Right Gradient Shadows */}
      <div className="relative w-full overflow-hidden">
        {/* Left Edge Gradient Shadow */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 lg:w-48 bg-gradient-to-r from-[#1a1816] via-[#1a1816]/90 to-transparent z-20" />

        {/* Right Edge Gradient Shadow */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 lg:w-48 bg-gradient-to-l from-[#1a1816] via-[#1a1816]/90 to-transparent z-20" />

        {/* Scrolling Track Wrapper with vertical padding so top & bottom borders NEVER get clipped on hover */}
        <div
          ref={trackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative flex items-center gap-5 sm:gap-6 py-4 sm:py-6 overflow-x-auto scrollbar-none select-none"
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {/* Animated Marquee Strip */}
          <div
            className={`flex items-center gap-5 sm:gap-6 shrink-0 ${
              isPaused ? "animation-paused" : "animation-running"
            } marquee-track`}
          >
            {infiniteStories.map((story, idx) => (
              <div
                key={`${story.id}-${idx}`}
                className="relative rounded-[6px] bg-[#221f1c]/95 border border-white/15 hover:border-[#FFD78A]/70 p-5 sm:p-6 w-[290px] sm:w-[350px] md:w-[390px] lg:w-[410px] shrink-0 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(229,195,132,0.22)] backdrop-blur-md group flex flex-col justify-between"
              >
                {/* Permanent Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD78A]/50 to-transparent group-hover:via-[#FFD78A] transition-all duration-300 rounded-t-[6px]" />

                {/* Card Top: Avatar, Names & Rating */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    {/* Couple Avatar with sharp rounded-[6px] */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-[6px] overflow-hidden shrink-0 border border-[#E5C384]/50 shadow-md">
                        <Image
                          src={story.image}
                          alt={story.alt}
                          fill
                          sizes="(max-width: 640px) 56px, 60px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-serif-luxury font-bold text-white group-hover:text-[#FFD78A] text-sm sm:text-base tracking-tight truncate transition-colors">
                          {story.author}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-[#FFD78A] font-semibold font-sans-modern truncate">
                          {story.location}
                        </p>
                      </div>
                    </div>

                    {/* 5 Stars */}
                    <div className="flex items-center gap-0.5 text-[#FFD78A] shrink-0">
                      {[...Array(story.rating)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-3.5 h-3.5 fill-[#FFD78A] text-[#FFD78A]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="relative pt-1">
                    <Quote className="w-5 h-5 text-[#FFD78A]/35 absolute -top-1 -left-1 pointer-events-none" />
                    <p className="text-stone-200 text-xs sm:text-sm font-sans-modern leading-relaxed italic pl-3 relative z-10">
                      {story.quote}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Verified Badge */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#c2794c]/20 border border-[#c2794c]/50 text-[#FFD78A] text-[11px] font-bold font-sans-modern">
                    <CheckCircle2 className="w-3 h-3 text-[#FFD78A]" />
                    <span>{story.badge}</span>
                  </span>

                  <span className="text-[11px] text-stone-300 font-sans-modern">
                    Verified Match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scoped CSS for Smooth Infinite Auto-Slide Animation */}
      <style jsx>{`
        @keyframes infiniteSlide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          animation: infiniteSlide 42s linear infinite;
          will-change: transform;
        }

        .animation-paused {
          animation-play-state: paused !important;
        }

        .animation-running {
          animation-play-state: running;
        }

        @media (max-width: 640px) {
          .marquee-track {
            animation-duration: 32s;
          }
        }
      `}</style>
    </section>
  );
};

export default HappyMarriagesSection;
