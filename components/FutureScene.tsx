"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { Lines } from "./ui/Lines";
import { MaskLines } from "./ui/MaskLines";

/** Scene 08 — Life is changing. Brighter, lighter, hopeful. */
export function FutureScene() {
  const { future } = siteConfig;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} data-tone="bright" className="relative px-7 pb-[16vh] pt-[24vh] md:px-12">
      <div className="mx-auto max-w-6xl md:grid md:grid-cols-12 md:gap-10">
        {/* on desktop the heading stays with you while the list unfolds */}
        <div className="md:col-span-5">
          <div className="text-center md:sticky md:top-[32vh] md:text-left">
            <MaskLines text={future.heading} as="h2" className="t-display" />
            <p className="t-quiet mt-6" data-reveal="up" data-delay="0.6">
              {future.more}
            </p>
          </div>
        </div>

        <ul className="mt-[16vh] space-y-[7vh] text-center md:col-span-6 md:col-start-7 md:mt-[34vh] md:text-left">
          {future.list.map((item) => (
            <li key={item} className="t-large">
              <span className="block" data-reveal="up" data-start="top 80%">
                {item}
              </span>
            </li>
          ))}
          <li className="pt-[10vh]">
            <p className="t-body italic text-ink-soft" data-reveal="fade" data-start="top 75%">
              {future.beautiful}
            </p>
          </li>
        </ul>
      </div>

      <div className="mx-auto mt-[26vh] max-w-2xl space-y-[20vh] text-center">
        {future.lines.map((line, i) => (
          <p
            key={i}
            className={`balance ${i === 2 ? "t-large italic" : "t-body"} ${i === 4 ? "text-ink-soft" : ""}`}
            data-reveal="up"
            data-start="top 78%"
          >
            <Lines text={line} />
          </p>
        ))}
      </div>

      <div className="mx-auto mt-[28vh] max-w-2xl text-center">
        <p className="t-body" data-reveal="fade" data-start="top 75%">
          {future.somewhere}
        </p>
        <p className="mt-6 font-serif text-[clamp(1.05rem,3.8vw,1.3rem)] italic text-ink-soft" data-reveal="fade" data-start="top 80%" data-delay="1.8">
          {future.brother} <span className="ml-1 font-hand text-2xl not-italic text-accent">{future.smile}</span>
        </p>
      </div>
    </section>
  );
}
