"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Scroll reveals for any element inside `scope` marked with data-reveal:
 *   data-reveal="up"    soft rise + fade (default)
 *   data-reveal="mask"  lines slide up from behind a mask (use <MaskLines>)
 *   data-reveal="fade"  opacity only — for the still, heavy moments
 * Optional: data-delay="0.4", data-start="top 70%", data-duration="2".
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope.current);
      els.forEach((el) => {
        const type = el.dataset.reveal || "up";
        const delay = parseFloat(el.dataset.delay || "0");
        const duration = el.dataset.duration ? parseFloat(el.dataset.duration) : undefined;
        const scrollTrigger = { trigger: el, start: el.dataset.start || "top 82%", once: true };

        if (reduced) {
          gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: delay * 0.3, scrollTrigger });
          return;
        }

        if (type === "mask") {
          gsap.set(el, { autoAlpha: 1 });
          gsap.fromTo(
            el.querySelectorAll(".mask-inner"),
            { yPercent: 115 },
            { yPercent: 0, duration: duration ?? 1.4, ease: "expo.out", stagger: 0.14, delay, scrollTrigger },
          );
        } else if (type === "fade") {
          gsap.fromTo(
            el,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: duration ?? 2.2, ease: "power1.inOut", delay, scrollTrigger },
          );
        } else {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: duration ?? 1.5, delay, scrollTrigger },
          );
        }
      });
    },
    { scope, dependencies: [reduced, ...deps], revertOnUpdate: true },
  );
}
