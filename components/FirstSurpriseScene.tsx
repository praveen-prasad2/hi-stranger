"use client";

import { useRef, type ReactNode } from "react";
import { siteConfig } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { Lines } from "./ui/Lines";
import { MaskLines } from "./ui/MaskLines";

function Beat({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex min-h-[62svh] items-center justify-center text-center ${className}`}>{children}</div>;
}

/**
 * The first surprise — the first time anyone had surprised him with a gift.
 * Told plainly. "I cried." gets a screen to itself and nothing moves around it.
 */
export function FirstSurpriseScene() {
  const { firstSurprise: s, again } = siteConfig;
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <div ref={ref}>
      <section data-tone="dim" className="relative px-7">
        <div className="flex min-h-[90svh] items-center justify-center pt-[10vh] text-center">
          <MaskLines text={s.heading} as="h2" className="t-large mx-auto max-w-3xl italic balance" start="top 72%" />
        </div>

        <Beat className="min-h-[50svh]">
          <p className="t-body" data-reveal="up" data-start="top 70%">
            {s.surprised}
          </p>
        </Beat>
        <Beat className="min-h-[45svh] items-start">
          <p className="t-large" data-reveal="up" data-start="top 75%">
            {s.gift}
          </p>
        </Beat>

        <Beat>
          <p className="t-body max-w-xl balance text-ink-soft" data-reveal="fade" data-start="top 68%">
            <Lines text={s.didntRealize} />
          </p>
        </Beat>

        {/* long pause */}
        <div className="h-[35vh]" aria-hidden />

        <Beat className="min-h-[75svh]">
          <p className="t-large mx-auto max-w-3xl balance" data-reveal="fade" data-start="top 65%" data-duration="2.6">
            <Lines text={s.first} />
          </p>
        </Beat>

        {/* nearly still: just the words */}
        <div className="relative h-[190svh]">
          <div className="sticky top-0 flex h-svh items-center justify-center text-center">
            <p className="t-display italic" data-reveal="fade" data-start="top 50%" data-duration="2.8">
              {s.cried}
            </p>
          </div>
        </div>

        <Beat className="min-h-[55svh]">
          <p className="t-body" data-reveal="fade" data-start="top 68%">
            {s.notTheGift}
          </p>
        </Beat>
        <div className="flex min-h-[70svh] flex-col items-center justify-center gap-4 text-center">
          <p className="t-body max-w-xl balance" data-reveal="fade" data-start="top 70%">
            <Lines text={s.someone} />
          </p>
          <p className="t-body italic" data-reveal="fade" data-start="top 70%" data-delay="1.6">
            {s.decided}
          </p>
        </div>
        <Beat className="min-h-[70svh] pb-[10vh]">
          <p className="t-quiet max-w-xl balance" data-reveal="fade" data-start="top 70%">
            <Lines text={s.neverTold} />
          </p>
        </Beat>
      </section>

      <section data-tone="paper" className="relative px-7 pb-[6vh]">
        <div className="flex min-h-[70svh] flex-col items-center justify-center gap-3 text-center">
          <p className="t-body text-ink-soft" data-reveal="fade" data-start="top 70%">
            {again.apparently}
          </p>
          <p className="t-body" data-reveal="fade" data-start="top 70%" data-delay="1.2">
            {again.notEnough} <span className="t-hand ml-1 text-accent">{again.smile}</span>
          </p>
        </div>
        <div className="flex min-h-[50svh] items-center justify-center text-center">
          <p className="t-large italic" data-reveal="up" data-start="top 72%">
            {again.didItAgain}
          </p>
        </div>
      </section>
    </div>
  );
}
