"use client";

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MemoryCard } from "./MemoryCard";
import { MaskLines } from "./ui/MaskLines";

/** "don't tap this" — she will. */
function DontTapThis() {
  const egg = siteConfig.memoryEgg;
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    if (stage !== 1) return;
    const t = setTimeout(() => setShowSecond(true), 1100);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="mt-6 min-h-11">
        {stage === 0 ? (
          <button
            type="button"
            onClick={() => setStage(1)}
            className="min-h-11 font-sans text-[11px] tracking-[0.18em] text-ink-soft/70 underline decoration-dotted underline-offset-4 transition-colors hover:text-ink-soft"
          >
            {egg.trigger}
          </button>
        ) : (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block max-w-xs -rotate-1 bg-[#fdfaf3] px-5 py-4 text-left text-charcoal shadow-[0_14px_30px_-16px_rgb(50_35_15/0.45)]"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              {stage === 1 ? (
                <m.div key="told" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <p className="font-hand text-2xl leading-tight">{egg.first}</p>
                  {showSecond && (
                    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                      <p className="mt-2 font-hand text-2xl leading-tight text-graphite">
                        {egg.second} {egg.secondEmoji}
                      </p>
                      <button
                        type="button"
                        onClick={() => setStage(2)}
                        className="mt-2 min-h-11 font-hand text-xl underline decoration-1 underline-offset-4"
                      >
                        {egg.button}
                      </button>
                    </m.div>
                  )}
                </m.div>
              ) : (
                <m.p
                  key="reply"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="font-hand text-2xl"
                >
                  {egg.reply}
                </m.p>
              )}
            </AnimatePresence>
          </m.div>
        )}
      </div>
    </LazyMotion>
  );
}

/** Scene 04 — Somewhere between strangers and now… */
export function MemoryTimeline() {
  const { memories, memoriesHeading, memoryEgg } = siteConfig;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useReveal(ref);

  // a thin thread that draws itself down the timeline as you go
  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".timeline-thread",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".timeline-body", start: "top 60%", end: "bottom 60%", scrub: 0.6 },
        },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section ref={ref} data-tone="paper" className="relative px-6 pt-[16vh] md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <MaskLines text={memoriesHeading} as="h2" className="t-large italic balance" />
      </div>

      <div className="mx-auto mt-[10vh] max-w-5xl">
        {/* the thread runs through the chapters; the closing entry stands on its own */}
        <div className="timeline-body relative">
          <div
            aria-hidden
            className="timeline-thread absolute bottom-[6vh] left-[7.5px] top-[10vh] w-px origin-top bg-accent/35 md:left-[calc(32%+7.5px)]"
          />
          {memories.map(
            (memory, i) =>
              !memory.featured && (
                <MemoryCard key={memory.title} memory={memory} index={i}>
                  {i === memoryEgg.afterMemory && <DontTapThis />}
                </MemoryCard>
              ),
          )}
        </div>
        {memories.map(
          (memory, i) =>
            memory.featured && (
              <MemoryCard key={memory.title} memory={memory} index={i}>
                {i === memoryEgg.afterMemory && <DontTapThis />}
              </MemoryCard>
            ),
        )}
      </div>
      <div className="h-[16vh]" />
    </section>
  );
}
