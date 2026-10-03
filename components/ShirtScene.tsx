"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LetterPreview } from "./LetterPreview";
import { MaskLines } from "./ui/MaskLines";

/** A collared shirt, drawn as if with a fine pen. */
function ShirtArt() {
  const stroke = { pathLength: 1, fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 240 230" className="h-full w-full" aria-hidden>
      <path {...stroke} d="M88 30 L60 38 Q40 46 30 60 L14 106 L40 117 L52 92 L54 212 Q120 218 186 212 L188 92 L200 117 L226 106 L210 60 Q200 46 180 38 L152 30" />
      <path {...stroke} d="M96 26 Q120 34 144 26" />
      <path {...stroke} d="M88 30 L99 63 L120 56 L141 63 L152 30" />
      <path {...stroke} d="M120 56 L120 211" />
      <path {...stroke} d="M137 98 L163 98 L163 124 Q150 129 137 124 Z" />
      {[82, 112, 142, 172, 200].map((y) => (
        <circle key={y} {...stroke} cx="126" cy={y} r="2" />
      ))}
    </svg>
  );
}

/** After the envelope opens: "The letter. Handwritten." */
function Reflection() {
  const { shirt } = siteConfig;
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <div ref={ref} className="mx-auto max-w-3xl px-7 pb-[16vh] pt-[12vh] text-center">
      <p className="t-large" data-reveal="up" data-delay="0.3">
        {shirt.theLetter}
      </p>
      <p className="t-body mt-[14vh] italic" data-reveal="up">
        {shirt.handwritten}
      </p>
      <p className="t-hand mt-[16vh]" data-reveal="fade" data-start="top 80%">
        {shirt.worse} <span className="ml-1 text-accent">{shirt.worseSmile}</span>
      </p>
    </div>
  );
}

/** The second surprise — this time, a shirt. */
export function ShirtScene({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  const { shirt } = siteConfig;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useReveal(ref);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const scrollTrigger = { trigger: q(".shirt-art")[0], start: "top 75%", once: true };
      const lines = q(".shirt-art path, .shirt-art circle");
      gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.to(lines, {
        strokeDashoffset: 0,
        duration: reduced ? 0.6 : 2.6,
        ease: "power1.inOut",
        stagger: reduced ? 0 : 0.18,
        delay: 0.4,
        scrollTrigger,
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section ref={ref} data-tone="paper" className="relative">
      <div className="flex min-h-svh flex-col items-center justify-center px-7 py-[10vh] text-center">
        <p className="t-body text-ink-soft" data-reveal="fade" data-start="top 75%">
          {shirt.thisTime}
        </p>
        <p className="t-large mt-4 italic" data-reveal="fade" data-start="top 75%" data-delay="1.2">
          {shirt.wasAShirt}
        </p>
        <div className="shirt-art mt-12 aspect-[24/23] w-[min(62vw,300px)] text-ink/80">
          <ShirtArt />
        </div>
      </div>

      <div className="px-7 pb-[10vh] pt-[6vh] text-center">
        <p className="t-body text-ink-soft" data-reveal="up">
          {shirt.honestly}
        </p>
        <p className="t-body mt-5 balance" data-reveal="up" data-delay="0.9">
          {shirt.happy}
        </p>
      </div>

      <div className="px-6 pt-[18vh] text-center">
        <MaskLines text={shirt.somethingElse} className="t-large mx-auto max-w-2xl balance" />
        <div className="mt-4" data-reveal="up" data-delay="0.3">
          <LetterPreview opened={opened} onOpen={onOpen} />
        </div>
      </div>

      {opened && <Reflection />}
      {!opened && <div className="h-[20vh]" />}
    </section>
  );
}
