"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Store for managing the active Lenis instance without triggering cascading renders in effects
let activeLenis: Lenis | null = null;
const listeners = new Set<() => void>();

const subscribeToLenis = (callback: () => void) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};

const getLenisSnapshot = () => activeLenis;
const getLenisServerSnapshot = () => null;

const setGlobalLenis = (instance: Lenis | null) => {
  activeLenis = instance;
  listeners.forEach((listener) => listener());
};

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useSmoothScroll = () => {
  const contextLenis = useContext(SmoothScrollContext);
  const storeLenis = useSyncExternalStore(
    subscribeToLenis,
    getLenisSnapshot,
    getLenisServerSnapshot
  );
  return contextLenis ?? storeLenis;
};

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const lenisInstance = useSyncExternalStore(
    subscribeToLenis,
    getLenisSnapshot,
    getLenisServerSnapshot
  );

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with refined luxury smooth momentum parameters
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    setGlobalLenis(lenis);

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Integrate Lenis's raf loop with GSAP's master ticker for 120hz/60hz frame-perfect smoothness
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    // lagSmoothing(0) prevents GSAP animations from stuttering or skipping during scroll
    gsap.ticker.lagSmoothing(0);

    // Intercept in-page hash links for silky smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      if (href.startsWith("#") && href.length > 1) {
        const id = href.replace("#", "");
        const element = document.getElementById(id) || document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
            offset: -75,
            duration: 1.2,
          });
          window.history.pushState(null, "", href);
        }
      } else if (
        href.startsWith("/#") &&
        href.length > 2 &&
        (pathname === "/" || window.location.pathname === "/")
      ) {
        const id = href.replace("/#", "");
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
            offset: -75,
            duration: 1.2,
          });
          window.history.pushState(null, "", `#${id}`);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Initial scroll to hash if present in URL on page mount
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      setTimeout(() => {
        const targetElement = document.getElementById(hashId);
        if (targetElement && lenisRef.current) {
          lenisRef.current.scrollTo(targetElement, {
            offset: -75,
            duration: 1.0,
          });
        }
      }, 400);
    }

    // Periodic refresh of ScrollTrigger when DOM content settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setGlobalLenis(null);
    };
  }, []);

  // On route change, handle scroll to top or scroll to hash
  useEffect(() => {
    if (lenisRef.current) {
      if (typeof window !== "undefined" && window.location.hash) {
        const hashId = window.location.hash.replace("#", "");
        const timer = setTimeout(() => {
          const targetElement = document.getElementById(hashId);
          if (targetElement && lenisRef.current) {
            lenisRef.current.scrollTo(targetElement, {
              offset: -75,
              duration: 1.0,
            });
          }
          ScrollTrigger.refresh();
        }, 300);
        return () => clearTimeout(timer);
      } else {
        lenisRef.current.scrollTo(0, { immediate: true });
        const timer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  return (
    <SmoothScrollContext.Provider value={lenisInstance}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScroll;
