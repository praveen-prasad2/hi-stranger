"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ScrollApi = {
  lock: () => void;
  unlock: () => void;
};

const ScrollContext = createContext<ScrollApi>({ lock: () => {}, unlock: () => {} });

export const useSmoothScroll = () => useContext(ScrollContext);

/**
 * Lenis for gentle, still user-controlled scrolling (wheel only — touch stays
 * native on phones, which is smoother and cheaper). Drives ScrollTrigger.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const lockedRef = useRef(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    if (lockedRef.current) lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const lock = useCallback(() => {
    lockedRef.current = true;
    lenisRef.current?.stop();
    document.documentElement.classList.add("is-locked");
  }, []);

  const unlock = useCallback(() => {
    lockedRef.current = false;
    document.documentElement.classList.remove("is-locked");
    lenisRef.current?.start();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const api = useMemo(() => ({ lock, unlock }), [lock, unlock]);

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}
