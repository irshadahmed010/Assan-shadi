"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";


function TransitionLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(76);

  // Measure navbar height dynamically so loader always starts right beneath the header
  const updateHeaderHeight = useCallback(() => {
    const navbar = document.getElementById("main-navbar");
    if (navbar) {
      setHeaderHeight(navbar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, [updateHeaderHeight]);

  // Turn off loading once pathname or searchParams change
  useEffect(() => {
    // Add small buffer so the animation completes gracefully and doesn't abruptly vanish
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Intercept internal link clicks to trigger loader immediately
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      // Find closest anchor tag
      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore if user opened in new tab, mailto, tel, anchor/hash jumps
      if (
        anchor.target === "_blank" ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      try {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(href, window.location.href);

        // Check if internal domain
        if (currentUrl.origin === targetUrl.origin) {
          // If clicking link to same path and query, skip
          if (
            currentUrl.pathname === targetUrl.pathname &&
            currentUrl.search === targetUrl.search
          ) {
            return;
          }

          // Trigger page redirect loader
          updateHeaderHeight();
          setIsLoading(true);
        }
      } catch {
        // Invalid URL, do nothing
      }
    };

    const handlePopState = () => {
      updateHeaderHeight();
      setIsLoading(true);
    };

    const handleCustomStart = () => {
      updateHeaderHeight();
      setIsLoading(true);
    };

    const handleCustomStop = () => {
      setIsLoading(false);
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("start-page-loader", handleCustomStart);
    window.addEventListener("stop-page-loader", handleCustomStop);

    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("start-page-loader", handleCustomStart);
      window.removeEventListener("stop-page-loader", handleCustomStop);
    };
  }, [updateHeaderHeight]);

  // Fallback safety timeout so loader never gets stuck indefinitely
  useEffect(() => {
    if (!isLoading) return;
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);
    return () => clearTimeout(safetyTimer);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="route-loader-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          style={{ top: `${headerHeight}px` }}
          className="fixed inset-x-0 bottom-0 z-40 bg-[#252525] flex flex-col items-center justify-center select-none overflow-hidden"
          aria-live="polite"
          role="status"
        >
          {/* Center Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
            {/* Center Modern Circle with Animated Rings (Compact & Responsive) */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-3 sm:mb-4">
              
              {/* Ring 1: Outer glowing orbit ring (Clockwise) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-[1.5px] border-transparent border-t-[#B9965B] border-r-[#9a6a4f]/70"
              />

              {/* Ring 2: Outer orbital dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
              >
                <div className="w-2 h-2 rounded-full bg-[#D8BE8D] absolute -top-1 left-1/2 -translate-x-1/2 shadow-[0_0_6px_#D8BE8D]" />
              </motion.div>

              {/* Ring 3: Middle counter-rotating dashed ring (Counter-Clockwise) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 sm:inset-2.5 rounded-full border border-dashed border-[#B9965B]/40"
              />

              {/* Inner Center Luxury Circle Badge */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1c1c1c] border border-[#B9965B]/60 shadow-md flex items-center justify-center p-2.5"
              >
                {/* Pure Heart Logo with Gold Gradient */}
                <svg
                  viewBox="0 0 24 24"
                  fill="url(#heartGoldGrad)"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_2px_8px_rgba(185,150,91,0.45)]"
                >
                  <defs>
                    <linearGradient id="heartGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E5D2B0" />
                      <stop offset="45%" stopColor="#B9965B" />
                      <stop offset="100%" stopColor="#9a6a4f" />
                    </linearGradient>
                  </defs>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            </div>

            {/* Website Name */}
            <motion.div
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury tracking-wide text-[#FAF7F2]">
                Asaan Shaadi
              </h2>
            </motion.div>

            {/* Loading... Indicator */}
            <motion.div
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.25 }}
              className="mt-3 sm:mt-3.5 flex flex-col items-center gap-1.5"
            >
              {/* Text with animated dots */}
              <div className="flex items-center gap-1 text-[11px] sm:text-xs font-medium tracking-widest text-[#FAF7F2]/80 uppercase">
                <span>Loading</span>
                <span className="inline-flex gap-1 ml-0.5">
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#B9965B]"
                  />
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#B9965B]"
                  />
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#B9965B]"
                  />
                </span>
              </div>

              {/* Sleek Golden Progress Shimmer Bar */}
              <div className="w-20 sm:w-24 h-0.5 sm:h-1 rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-[#B9965B] to-transparent rounded-full shadow-[0_0_6px_#B9965B]"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const PageTransitionLoader: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <TransitionLoaderInner />
    </Suspense>
  );
};
