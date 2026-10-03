"use client";

import { useRef, type ReactNode } from "react";
import type { Memory } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HandStar } from "./ui/HandStar";
import { Lines } from "./ui/Lines";

/**
 * One chapter of the timeline, told in type alone: a large numeral, a dot on
 * the thread that fills as she reaches it, and a few honest words.
 */
export function MemoryCard({ memory, index, children }: { memory: Memory; index: number; children?: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const trigger = { trigger: ref.current, start: "top 72%", once: true };

      if (reduced) {
        gsap.fromTo(q(".mem-num, .mem-dot, .mem-text > *"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, scrollTrigger: trigger });
        return;
      }

      const tl = gsap.timeline({ scrollTrigger: trigger });
      const dot = q(".mem-dot");
      if (dot.length) {
        // GSAP can't tween to var(); read the live accent colour instead
        const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#a48d68";
        tl.fromTo(dot, { scale: 0.4, backgroundColor: "rgba(0,0,0,0)" }, { scale: 1, backgroundColor: accent, duration: 0.9, ease: "power2.out" });
      }
      // the closing entry has no numeral
      const numerals = q(".mem-num .mask-inner");
      if (numerals.length) tl.fromTo(numerals, { yPercent: 110 }, { yPercent: 0, duration: 1.6, ease: "expo.out" }, "<0.1");
      tl.fromTo(q(".mem-title .mask-inner"), { yPercent: 115 }, { yPercent: 0, duration: 1.4, ease: "expo.out" }, "<0.25").fromTo(
        q(".mem-text > :not(.mem-title):not(.mem-num)"),
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 1.3, stagger: 0.18 },
        "<0.5",
      );

      // the numeral drifts a little slower than the page, larger screens only
      if (!q(".mem-num-desk").length) return;
      gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap.fromTo(
          q(".mem-num-desk"),
          { yPercent: 12 },
          {
            yPercent: -12,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  if (memory.featured) {
    return (
      <article ref={ref} className="relative mx-auto flex max-w-2xl flex-col items-center pb-[12vh] pt-[16vh] text-center">
        <div className="mem-text">
          <HandStar className="mx-auto mb-6 h-7 w-7 text-accent" />
          <h3 className="mem-title t-display italic">
            <span className="mask-line">
              <span className="mask-inner">{memory.title}</span>
            </span>
          </h3>
          <p className="t-body mt-8 balance text-ink-soft">
            <Lines text={memory.description} />
          </p>
          {memory.aside && <p className="t-hand mt-5">{memory.aside}</p>}
          {children}
        </div>
      </article>
    );
  }

  return (
    <article ref={ref} className="relative flex py-[9vh] md:py-[13vh]">
      {/* numeral — beside the thread on desktop, above the title on phones */}
      <div className="hidden w-[32%] shrink-0 justify-end pr-10 md:flex" aria-hidden>
        <span className="mem-num mem-num-desk mask-line font-serif text-[clamp(5rem,9vw,8.5rem)] italic leading-[0.9] text-accent/45">
          <span className="mask-inner">{number}</span>
        </span>
      </div>

      <div className="relative w-4 shrink-0" aria-hidden>
        <span className="mem-dot absolute left-1/2 top-[0.9rem] block h-3 w-3 -translate-x-1/2 rounded-full border border-accent md:top-[2.6rem]" />
      </div>

      <div className="mem-text min-w-0 flex-1 pl-6 md:pl-10">
        {/* wrapper carries md:hidden — .mask-line sets display itself */}
        <div className="mem-num md:hidden" aria-hidden>
          <span className="mask-line font-serif text-[clamp(3.6rem,17vw,5rem)] italic leading-[0.9] text-accent/45">
            <span className="mask-inner">{number}</span>
          </span>
        </div>
        {memory.date && <p className="t-small mt-4 md:mt-3">{memory.date}</p>}
        <h3 className="mem-title mt-3 font-serif text-[clamp(2rem,7vw,3.4rem)] leading-[1.06]">
          <span className="mask-line">
            <span className="mask-inner">{memory.title}</span>
          </span>
        </h3>
        <p className="mt-5 font-serif text-[clamp(1.2rem,4.5vw,1.45rem)] leading-[1.42] text-ink-soft">
          <Lines text={memory.description} />
        </p>
        {memory.aside && <p className="t-hand mt-4">{memory.aside}</p>}
        {children}
      </div>
    </article>
  );
}
