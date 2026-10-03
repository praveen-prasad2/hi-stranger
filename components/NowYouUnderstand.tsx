"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { Lines } from "./ui/Lines";

/** Why this website exists. Plain words, no performance. */
export function NowYouUnderstand() {
  const { understand: u } = siteConfig;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} data-tone="bright" className="relative px-7">
      <div className="flex min-h-[85svh] flex-col items-center justify-center gap-4 pt-[8vh] text-center">
        <p className="t-body text-ink-soft" data-reveal="fade" data-start="top 70%">
          {u.so}
        </p>
        <p className="t-large max-w-3xl italic balance" data-reveal="fade" data-start="top 70%" data-delay="1.1">
          {u.why}
        </p>
      </div>

      <div className="mx-auto flex min-h-[70svh] max-w-2xl flex-col items-center justify-center gap-[9vh] text-center">
        <p className="t-body balance" data-reveal="up" data-start="top 74%">
          {u.notReturn}
        </p>
        <p className="t-body balance text-ink-soft" data-reveal="up" data-start="top 74%">
          <Lines text={u.notOwed} />
        </p>
      </div>

      <div className="flex min-h-[55svh] items-center justify-center text-center">
        <p className="t-body" data-reveal="fade" data-start="top 70%">
          {u.justWanted}
        </p>
      </div>
      <div className="flex min-h-[90svh] flex-col items-center justify-center gap-6 pb-[12vh] text-center">
        <p className="t-large max-w-3xl italic balance" data-reveal="fade" data-start="top 70%">
          {u.matter}
        </p>
        <p className="t-large max-w-3xl balance" data-reveal="fade" data-start="top 70%" data-delay="1.6">
          {u.youMatter}
        </p>
        {/* follows right away — so there's no room to misread the line above */}
        <p className="t-body italic text-ink-soft" data-reveal="fade" data-start="top 70%" data-delay="2.6">
          {u.moreThan}
        </p>
      </div>
    </section>
  );
}
