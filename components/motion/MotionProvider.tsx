"use client";

import * as React from "react";
import { lenisConfig } from "@/lib/motion";

interface MotionContextValue {
  isReducedMotion: boolean;
  isMobile: boolean;
  lenis: LenisInstance | null;
}

interface LenisInstance {
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
  destroy: () => void;
  on: (event: string, callback: (e: { scroll: number; progress: number }) => void) => void;
  off: (event: string, callback: (e: { scroll: number; progress: number }) => void) => void;
  raf: (time: number) => void;
  scroll: number;
  progress: number;
}

const MotionContext = React.createContext<MotionContextValue>({
  isReducedMotion: false,
  isMobile: false,
  lenis: null,
});

export function useMotion() {
  return React.useContext(MotionContext);
}

export function useReducedMotion() {
  const { isReducedMotion } = useMotion();
  return isReducedMotion;
}

export interface MotionProviderProps {
  children: React.ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const [isReducedMotion, setIsReducedMotion] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const lenisRef = React.useRef<LenisInstance | null>(null);
  const rafRef = React.useRef<number | null>(null);

  // Detect reduced motion and mobile
  React.useEffect(() => {
    // Guard for SSR
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setIsReducedMotion(mediaQuery.matches);
    updateReducedMotion();
    mediaQuery.addEventListener("change", updateReducedMotion);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateReducedMotion);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Initialize Lenis - client only, single instance
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Don't init Lenis if reduced motion is enabled - preserve accessibility
    if (isReducedMotion) {
      return;
    }

    // Don't init on mobile touch for performance (configurable)
    // But keep it for desktop

    let lenis: LenisInstance | null = null;
    let rafId: number | null = null;

    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        
        lenis = new Lenis({
          ...lenisConfig,
          // Ensure anchor links work with header offset
          // Lenis handles anchor scrolling internally
        }) as unknown as LenisInstance;

        lenisRef.current = lenis;

        // RAF loop - efficient, single instance
        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
          rafRef.current = rafId;
        };
        rafId = requestAnimationFrame(raf);

        // Handle anchor links with header offset
        const handleAnchorClick = (e: Event) => {
          const target = e.target as HTMLElement;
          const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
          if (!anchor) return;

          const href = anchor.getAttribute("href");
          if (!href || href === "#") return;

          const id = href.slice(1);
          if (!id) return;

          const element = document.getElementById(id);
          if (!element) return;

          e.preventDefault();
          
          // Calculate offset for sticky header
          const headerHeight = 64; // var(--header-height)
          const offset = -headerHeight - 16;

          lenis?.scrollTo(element, {
            offset,
            duration: 1.2,
          });

          // Update URL hash without jump
          if (history.pushState) {
            history.pushState(null, "", href);
          }
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
          document.removeEventListener("click", handleAnchorClick);
        };
      } catch (error) {
        console.warn("Lenis failed to initialize, falling back to native scroll:", error);
        return undefined;
      }
    };

    const cleanupPromise = initLenis();

    return () => {
      // Cleanup RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      // Cleanup Lenis
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      lenisRef.current = null;
      
      // Cleanup async
      cleanupPromise.then((cleanup) => {
        if (typeof cleanup === "function") {
          cleanup();
        }
      });
    };
  }, [isReducedMotion]);

  const contextValue = React.useMemo(
    () => ({
      isReducedMotion,
      isMobile,
      lenis: lenisRef.current,
    }),
    [isReducedMotion, isMobile]
  );

  return (
    <MotionContext.Provider value={contextValue}>
      {children}
    </MotionContext.Provider>
  );
}

// Hook for scroll progress - centralized, not dozens of listeners
export function useScrollProgress() {
  const [progress, setProgress] = React.useState(0);
  const { isReducedMotion } = useMotion();

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (isReducedMotion) return;

    let rafId: number | null = null;
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(scrollProgress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    // Use passive for performance
    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress(); // Initial

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  return progress;
}

// Hook for active section detection - performant via IntersectionObserver
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = React.useState<string>(sectionIds[0] || "");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (sectionIds.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        // Find most visible section
        let maxRatio = 0;
        let mostVisible = activeSection;
        visibleSections.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = id;
          }
        });

        if (mostVisible && mostVisible !== activeSection) {
          setActiveSection(mostVisible);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Trigger when 20% from top
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      visibleSections.clear();
    };
  }, [sectionIds, activeSection]);

  return activeSection;
}
