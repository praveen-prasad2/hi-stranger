"use client";

import { useRef, useState } from "react";
import { siteConfig, type SiblingCard } from "@/data/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MaskLines } from "./ui/MaskLines";

const TILT = ["-1.6deg", "1.2deg", "-0.8deg", "1.8deg", "-1.2deg", "0.9deg"];
const SHIFT = ["max-md:-translate-x-[2%]", "max-md:translate-x-[2.5%]", "max-md:-translate-x-[1%]", "max-md:translate-x-[1.5%]", "max-md:-translate-x-[2.5%]", "max-md:translate-x-[1%]"];

function Card({ card, index }: { card: SiblingCard; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`sib-card ${SHIFT[index % SHIFT.length]}`}>
      <button
        type="button"
        className="flip block aspect-[5/3] w-full text-left"
        style={{ rotate: TILT[index % TILT.length] }}
        aria-pressed={flipped}
        aria-label={flipped ? `${card.front} — ${card.back}` : card.front}
        onClick={() => setFlipped((f) => !f)}
      >
        <span className="flip-inner relative block h-full w-full">
          <span className="flip-face paper-sheet absolute inset-0 flex flex-col justify-between rounded-[3px] p-5 shadow-[0_18px_36px_-20px_rgb(50_35_15/0.45),0_1px_2px_rgb(50_35_15/0.08)]">
            <span className="font-sans text-[10px] tracking-[0.3em] text-[#8b8172]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-serif text-[clamp(1.35rem,5.2vw,1.7rem)] leading-[1.18] text-charcoal">{card.front}</span>
          </span>
          <span className="flip-face flip-back absolute inset-0 grid place-items-center rounded-[3px] bg-[#efe6d5] p-5 text-center shadow-[0_18px_36px_-20px_rgb(50_35_15/0.45)]">
            <span className="font-hand text-[clamp(1.7rem,6.4vw,2.2rem)] leading-tight text-graphite">{card.back}</span>
          </span>
        </span>
      </button>
    </div>
  );
}

/** Scene 07 — Being my unofficial sister apparently means… */
export function SiblingMoments() {
  const { sibling } = siteConfig;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useReveal(ref);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".sib-card");
      gsap.set(cards, { autoAlpha: 0, y: reduced ? 0 : 36 });
      ScrollTrigger.batch(cards, {
        start: "top 86%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: reduced ? 0.6 : 1.2, stagger: 0.18, ease: "power3.out" }),
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section ref={ref} data-tone="paper" className="relative px-6 pb-[18vh] pt-[22vh] md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <MaskLines text={sibling.heading} as="h2" className="t-large italic balance" />
        <p className="t-hand mt-5 text-xl" data-reveal="fade" data-delay="0.8">
          {sibling.hint}
        </p>
      </div>

      <div className="mx-auto mt-[10vh] grid max-w-[20.5rem] gap-9 sm:max-w-md md:max-w-5xl md:grid-cols-3 md:gap-x-10 md:gap-y-14">
        {sibling.cards.map((card, i) => (
          <Card key={card.front} card={card} index={i} />
        ))}
      </div>

      <p className="t-body mt-[14vh] text-center italic" data-reveal="up" data-start="top 88%" data-delay="0.6">
        {sibling.outro}
      </p>
    </section>
  );
}
