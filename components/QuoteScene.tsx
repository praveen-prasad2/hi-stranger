"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Lines } from "./ui/Lines";

/**
 * Her words, a few phrases at a time. It goes dark again, echoing the very first
 * screen. As she scrolls, the phrases arrive; then everything fades except
 * "Thank you for being there." (Sticky + scrub on native scroll — never hijacked.)
 */
export function QuoteScene() {
  const { herWords: w } = siteConfig;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useReveal(ref);

  useGSAP(
    () => {
      if (reduced) return; // everything simply stays visible
      const q = gsap.utils.selector(ref);
      const rise = (target: Element[], at: string, duration = 1) =>
        tl.fromTo(target, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration, ease: "power1.out" }, at);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: q(".hw-track")[0], start: "top top", end: "bottom bottom", scrub: 0.8 },
      });
      rise(q(".hw-greeting"), "+=0.2");
      q(".hw-phrase").forEach((el) => rise([el], "+=0.5"));
      tl.fromTo(q(".hw-thanks"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6 }, "+=0.7")
        .to({}, { duration: 1.4 }) // hold it
        .to(q(".hw-fade"), { autoAlpha: 0, duration: 1.4 })
        .to({}, { duration: 1.8 }); // just "Thank you for being there."
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref}>
      <section data-tone="dark" className="relative px-7">
        <div className="hw-track relative h-[480svh]">
          <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-7 text-center">
            <p className="hw-greeting hw-fade t-large italic">
              {w.greeting}
              <span aria-hidden className="type-cursor" />
            </p>
            {w.phrases.map((p) => (
              <p key={p} className="hw-phrase hw-fade t-body max-w-xl balance text-ink-soft">
                <Lines text={p} />
              </p>
            ))}
            <blockquote className="hw-thanks t-display mt-6 italic balance">{w.thankYou}</blockquote>
          </div>
        </div>

        <div className="flex min-h-[80svh] items-center justify-center pb-[8vh] text-center">
          <p className="t-body max-w-xl balance" data-reveal="fade" data-start="top 68%">
            {w.noIdea}
          </p>
        </div>
      </section>

      {/* relief: the light comes back */}
      <section data-tone="paper" className="relative px-7 pb-[14vh]">
        <div className="flex min-h-[80svh] flex-col items-center justify-center gap-4 text-center">
          <p className="t-body text-ink-soft" data-reveal="fade" data-start="top 70%">
            {w.yeah}
          </p>
          <p className="t-large italic" data-reveal="fade" data-start="top 70%" data-delay="1.3">
            {w.cryAgain} <span className="t-hand not-italic text-accent">{w.cryAgainSmile}</span>
          </p>
        </div>
        <div className="flex min-h-[55svh] flex-col items-center justify-center gap-3 text-center">
          <p className="t-body" data-reveal="up" data-start="top 72%">
            {w.iKnow}
          </p>
          <p className="t-body italic text-ink-soft" data-reveal="up" data-start="top 72%" data-delay="0.9">
            {w.embarrassing}
          </p>
          <p className="t-quiet mt-[10vh] text-[1.05rem]" data-reveal="fade" data-start="top 85%" data-delay="0.6">
            {w.keeping}
          </p>
        </div>
      </section>
    </div>
  );
}
