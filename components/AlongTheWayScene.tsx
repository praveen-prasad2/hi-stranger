"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { MaskLines } from "./ui/MaskLines";

/**
 * From France paperwork to friendship. The formal part keeps the cool
 * "document" tone; then the page warms as the conversations change.
 */
export function AlongTheWayScene() {
  const { alongTheWay } = siteConfig;
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <div ref={ref}>
      <section data-tone="formal" className="relative px-7 pb-[14vh] pt-[16vh]">
        <div className="mx-auto max-w-md text-center">
          <p className="t-body" data-reveal="up" data-start="top 75%">
            {alongTheWay.france}
          </p>

          {/* like the index of a very serious file */}
          <ul className="mx-auto mt-[10vh] max-w-[16rem] border-t border-ink/10 text-left">
            {alongTheWay.serious.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline justify-between border-b border-ink/10 py-4"
                data-reveal="up"
                data-start="top 82%"
                data-delay={String(i * 0.25)}
              >
                <span className="font-sans text-[0.8rem] uppercase tracking-[0.22em] text-ink">{item}</span>
                <span className="font-sans text-[10px] tracking-[0.2em] text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>

          <p className="t-quiet mt-[10vh]" data-reveal="fade" data-start="top 80%">
            {alongTheWay.seriousStuff}
          </p>
        </div>
      </section>

      <section data-tone="paper" className="relative px-7">
        <div className="flex min-h-[80svh] items-center justify-center text-center">
          <p className="t-body italic" data-reveal="fade" data-start="top 65%">
            {alongTheWay.somewhere}
          </p>
        </div>
        <div className="flex min-h-[55svh] items-center justify-center text-center">
          <p className="t-large" data-reveal="up" data-start="top 70%">
            {alongTheWay.changed}
          </p>
        </div>
        <div className="flex min-h-[60svh] flex-col items-center justify-center gap-6 text-center">
          {alongTheWay.more.map((line, i) => (
            <p key={line} className="t-body" data-reveal="up" data-start="top 72%" data-delay={String(i * 1)}>
              {line}
            </p>
          ))}
        </div>
        <div className="flex min-h-[50svh] items-center justify-center text-center">
          <p className="t-body max-w-xl balance text-ink-soft" data-reveal="fade" data-start="top 70%">
            {alongTheWay.without}
          </p>
        </div>

        <div className="relative h-[170svh]">
          <div className="sticky top-0 flex h-svh items-center justify-center text-center">
            <MaskLines text={alongTheWay.friend} as="h2" className="t-display mx-auto max-w-4xl italic balance" start="top 80%" />
          </div>
        </div>

        <div className="flex min-h-[70svh] flex-col items-center justify-center gap-4 pb-[12vh] text-center">
          <p className="t-body text-ink-soft" data-reveal="fade" data-start="top 72%">
            {alongTheWay.somehow}
          </p>
          <p className="t-large italic" data-reveal="fade" data-start="top 72%" data-delay="1.2">
            {alongTheWay.growing}
          </p>
        </div>
      </section>
    </div>
  );
}
