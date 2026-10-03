"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Lines } from "./ui/Lines";
import { MaskLines } from "./ui/MaskLines";

/**
 * The first conversation, shown like a message floating on the page —
 * an abstract chat card (no invented words, no screenshot needed).
 */
function FirstMessage() {
  const { firstMessageDate } = siteConfig;
  return (
    <div className="first-message mx-auto w-[min(76vw,320px)] rotate-[1.4deg] motion-safe:animate-[float_7s_ease-in-out_infinite]">
      <div className="overflow-hidden rounded-[18px] bg-[#f8f8f6] shadow-[0_30px_60px_-28px_rgb(20_24_30/0.45),0_2px_6px_rgb(20_24_30/0.08)] ring-1 ring-black/5">
        <div className="px-5 pb-7 pt-5" aria-hidden>
          <div className="flex items-center gap-3 border-b border-black/5 pb-4">
            <span className="h-8 w-8 rounded-full bg-[#d9dcdf]" />
            <span className="space-y-1.5">
              <span className="block h-2 w-24 rounded-full bg-[#cfd2d6]" />
              <span className="block h-1.5 w-14 rounded-full bg-[#e0e2e5]" />
            </span>
          </div>
          <p className="mt-4 text-center font-sans text-[10px] tracking-[0.25em] text-[#8a8e94] uppercase">
            {firstMessageDate}
          </p>
          <div className="mt-4 space-y-3">
            <div className="w-[72%] space-y-1.5 rounded-2xl rounded-bl-md bg-[#e6e8ea] p-3">
              <span className="block h-1.5 w-full rounded-full bg-[#cfd3d7]" />
              <span className="block h-1.5 w-2/3 rounded-full bg-[#cfd3d7]" />
            </div>
            <div className="ml-auto w-[58%] space-y-1.5 rounded-2xl rounded-br-md bg-[#dfe3e0] p-3">
              <span className="block h-1.5 w-full rounded-full bg-[#c4cbc6]" />
            </div>
            <div className="w-[64%] space-y-1.5 rounded-2xl rounded-bl-md bg-[#e6e8ea] p-3">
              <span className="block h-1.5 w-full rounded-full bg-[#cfd3d7]" />
              <span className="block h-1.5 w-1/2 rounded-full bg-[#cfd3d7]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** "This story didn't start with a shirt." — May 6, the counsellor days. */
export function BeginningScene() {
  const { beginning, firstMessageDate } = siteConfig;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useReveal(ref);

  // a hairline draws under the date while it holds
  useGSAP(
    () => {
      gsap.fromTo(
        ".date-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: reduced ? 0.4 : 2.2,
          ease: "power2.inOut",
          delay: reduced ? 0 : 0.8,
          scrollTrigger: { trigger: ".date-rule", start: "top 75%", once: true },
        },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref}>
      <section data-tone="paper" className="relative px-7">
        <div
          className="flex min-h-svh items-center justify-center text-center"
          style={{ paddingTop: "var(--safe-top)" }}
        >
          <p className="t-body max-w-xl balance" data-reveal="fade" data-delay="0.6" data-duration="1.8">
            {beginning.notTheShirt}
          </p>
        </div>
        <div className="flex min-h-[55svh] items-start justify-center text-center">
          <p className="t-quiet" data-reveal="fade" data-start="top 70%">
            {beginning.whileAgo}
          </p>
        </div>
      </section>

      <section data-tone="formal" className="relative px-7">
        {/* the date holds on screen while you scroll past */}
        <div className="relative h-[190svh]">
          <div className="sticky top-0 flex h-svh flex-col items-center justify-center text-center">
            <h2 className="t-display text-[clamp(3.2rem,14vw,9.5rem)] tabular-nums tracking-[-0.02em]" data-reveal="fade" data-start="top 80%" data-duration="2">
              {firstMessageDate}
            </h2>
            <span aria-hidden className="date-rule mt-7 block h-px w-28 origin-left bg-accent/60" />
            <p className="t-small mt-6" data-reveal="fade" data-start="top 80%" data-delay="1.2">
              {beginning.dateLabel}
            </p>
          </div>
        </div>

        <div className="flex min-h-[60svh] flex-col items-center justify-center gap-5 text-center">
          <p className="t-large" data-reveal="up" data-start="top 70%">
            {beginning.oneMessage}
          </p>
          <p className="t-large" data-reveal="up" data-start="top 70%" data-delay="1.1">
            {beginning.oneCounsellor}
          </p>
        </div>
        <div className="flex min-h-[60svh] items-center justify-center text-center">
          <p className="t-body max-w-xl balance text-ink-soft" data-reveal="fade" data-start="top 70%">
            <Lines text={beginning.noIdea} />
          </p>
        </div>

        <div className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-center justify-center gap-8 pt-[12vh] text-center">
          <p className="t-quiet" data-reveal="fade" data-start="top 72%">
            {beginning.backThen}
          </p>
          <MaskLines text={beginning.counsellor} className="t-large italic" start="top 72%" delay={0.6} />
        </div>
        <div className="flex min-h-[50svh] items-center justify-center text-center">
          <p className="t-body max-w-xl balance" data-reveal="up" data-start="top 72%">
            <Lines text={beginning.me} />
          </p>
        </div>

        <div className="pb-[8vh] pt-[6vh]" data-reveal="up" data-start="top 85%" data-duration="1.8">
          <FirstMessage />
        </div>

        <div className="flex min-h-[45svh] flex-col items-center justify-center gap-3 pb-[10vh] text-center">
          <p className="t-small" data-reveal="fade" data-start="top 78%">
            {beginning.professional}
          </p>
          <p className="t-hand" data-reveal="fade" data-start="top 78%" data-delay="1.4">
            {beginning.initially} <span className="ml-1 text-accent">{beginning.initiallySmile}</span>
          </p>
        </div>
      </section>
    </div>
  );
}
