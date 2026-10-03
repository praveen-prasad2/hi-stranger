"use client";

import { useRef, type ReactNode } from "react";
import { siteConfig } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Lines } from "./ui/Lines";

function Beat({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex min-h-[64svh] items-center justify-center text-center ${className}`}>{children}</div>;
}

/** May 6 ———— Today. A life timeline, not a love story: two points and a line. */
function SinceMay6() {
  const { timeline } = siteConfig.family;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 70%", once: true } });
      if (reduced) {
        tl.fromTo(q(".tl-from, .tl-line, .tl-to"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 });
        return;
      }
      tl.fromTo(q(".tl-from"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: "power1.out" })
        .fromTo(q(".tl-line"), { scaleX: 0 }, { scaleX: 1, duration: 2.8, ease: "power1.inOut" }, "+=0.2")
        .fromTo(q(".tl-to"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: "power1.out" }, "-=0.3");
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} className="mx-auto w-full max-w-2xl" role="img" aria-label={`${timeline.from}: ${timeline.fromLabel} Today: ${timeline.toLabel}`}>
      <div className="flex items-center gap-3" aria-hidden>
        <span className="tl-from h-2 w-2 shrink-0 rounded-full bg-accent" />
        <span className="tl-line h-px flex-1 origin-left bg-accent/50" />
        <span className="tl-to h-2 w-2 shrink-0 rounded-full bg-accent" />
      </div>
      <div className="mt-5 flex justify-between gap-6" aria-hidden>
        <div className="tl-from text-left">
          <p className="t-small">{timeline.from}</p>
          <p className="mt-2 font-serif text-[clamp(1.2rem,4.6vw,1.7rem)] italic text-ink-soft">{timeline.fromLabel}</p>
        </div>
        <div className="tl-to text-right">
          <p className="t-small">{timeline.to}</p>
          <p className="mt-2 font-serif text-[clamp(1.2rem,4.6vw,1.7rem)] italic">{timeline.toLabel}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Counsellor → friend → closest friend → family.
 * Dark, only words. The two big statements hold on screen (CSS sticky)
 * and nothing moves around them.
 */
export function FamilyReveal() {
  const { family } = siteConfig;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const [whenWeSpoke, counsellor, friend, closest, alongTheWay] = family.lines;

  return (
    <section ref={ref} data-tone="dark" className="relative px-7" aria-label="Family">
      <div className="h-[30vh]" aria-hidden />

      <Beat>
        <p className="t-body italic text-ink-soft" data-reveal="fade" data-start="top 65%">
          {whenWeSpoke}
        </p>
      </Beat>
      <Beat className="min-h-[52svh]">
        <p className="t-large" data-reveal="fade" data-start="top 65%">
          {counsellor}
        </p>
      </Beat>
      <Beat className="min-h-[52svh]">
        <p className="t-large" data-reveal="fade" data-start="top 65%">
          {friend}
        </p>
      </Beat>
      <Beat className="min-h-[52svh]">
        <p className="t-large" data-reveal="fade" data-start="top 65%">
          {closest}
        </p>
      </Beat>
      <div className="flex min-h-[50svh] items-end justify-center pb-[6vh] text-center">
        <p className="t-body italic text-ink-soft" data-reveal="fade" data-start="top 70%">
          {alongTheWay}
        </p>
      </div>

      {/* long stillness */}
      <div className="relative h-[200svh]">
        <div className="sticky top-0 flex h-svh items-center justify-center text-center">
          <h2 className="t-display" data-reveal="fade" data-start="top 85%" data-duration="2.2">
            {family.reveal}
          </h2>
        </div>
      </div>

      <Beat>
        <p className="t-body max-w-xl balance text-ink-soft" data-reveal="fade" data-start="top 65%">
          <Lines text={family.neverSaid} />
        </p>
      </Beat>
      <Beat className="min-h-[56svh]">
        <p className="t-body max-w-xl balance" data-reveal="fade" data-start="top 65%">
          {family.notJustFriend}
        </p>
      </Beat>

      {/* the biggest moment on the site: nothing but the words */}
      <div className="relative h-[230svh]">
        <div className="sticky top-0 flex h-svh items-center justify-center text-center">
          <h2 className="t-display mx-auto max-w-5xl balance" data-reveal="fade" data-start="top 55%" data-duration="3.2">
            {family.sister}
          </h2>
        </div>
      </div>

      <div className="mx-auto flex min-h-[90svh] max-w-2xl flex-col items-center justify-center gap-[7vh] text-center">
        {family.reasons.map((line, i) => (
          <p
            key={line}
            className={`t-body balance ${i === family.reasons.length - 1 ? "" : "text-ink-soft"}`}
            data-reveal="fade"
            data-start="top 72%"
          >
            <Lines text={line} />
          </p>
        ))}
      </div>

      <div className="flex min-h-[70svh] items-center justify-center py-[10vh]">
        <SinceMay6 />
      </div>

      <div className="flex min-h-[70svh] flex-col items-center justify-center gap-4 pb-[18vh] text-center">
        <p className="t-body text-ink-soft" data-reveal="fade" data-start="top 72%">
          {family.unfortunately}
        </p>
        <p className="t-hand" data-reveal="fade" data-start="top 72%" data-delay="1.4">
          {family.stuck} <span className="ml-1 text-accent">{family.smile}</span>
        </p>
      </div>
    </section>
  );
}
