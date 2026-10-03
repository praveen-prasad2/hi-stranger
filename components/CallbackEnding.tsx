"use client";

import { useRef, useState } from "react";
import { siteConfig } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HandButton } from "./ui/HandButton";
import { Lines } from "./ui/Lines";

/** A few warm specks of light drifting up. Explicitly not confetti. */
function Glow({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const dots = gsap.utils.toArray<HTMLElement>(".glow-dot", ref.current);
      if (reduced) {
        gsap.fromTo(ref.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5 });
        return;
      }
      dots.forEach((dot) => {
        const angle = gsap.utils.random(0, Math.PI * 2);
        const dist = gsap.utils.random(60, 220);
        gsap
          .timeline({ delay: gsap.utils.random(0, 0.5) })
          .fromTo(dot, { x: 0, y: 0, scale: 0.2, autoAlpha: 0 }, {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist * 0.6 - gsap.utils.random(40, 120),
            scale: gsap.utils.random(0.6, 1.3),
            autoAlpha: gsap.utils.random(0.5, 0.95),
            duration: gsap.utils.random(1.6, 2.4),
            ease: "power2.out",
          })
          .to(dot, { y: "-=60", autoAlpha: 0, duration: gsap.utils.random(2, 3.2), ease: "sine.in" });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0">
      {reduced ? (
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(230_190_120/0.35),transparent_65%)]" />
      ) : (
        Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className="glow-dot invisible absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[#f3d9a4]"
            style={{ boxShadow: "0 0 10px 3px rgb(236 196 120 / 0.55)" }}
          />
        ))
      )}
    </div>
  );
}

/** Scene 11 — P.S. The nuts callback, a little banter, then goodbye. */
export function CallbackEnding({ onComplete }: { onComplete: () => void }) {
  const { callback } = siteConfig;
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<0 | 1>(0);
  const [glow, setGlow] = useState(false);
  const reduced = useReducedMotion();

  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      if (step === 0) gsap.fromTo(q(".cb-cover"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 1.8, ease: "power1.inOut" });

      // each item waits for its own pause (data-gap, in seconds) before appearing
      const items = q(`.cb-step-${step} [data-gap]`) as HTMLElement[];
      const tl = gsap.timeline({ delay: step === 0 ? 1.2 : 0.4 });
      items.forEach((el) => {
        const gap = parseFloat(el.dataset.gap || "0");
        tl.fromTo(
          el,
          { autoAlpha: 0, y: reduced ? 0 : 14 },
          { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" },
          `+=${gap}`,
        );
      });
      // the glow rises with "Take care, sister", not after it
      if (step === 1) tl.call(() => setGlow(true), [], "<0.3");
      tl.call(() => {
        const btn = ref.current?.querySelector<HTMLButtonElement>(`.cb-step-${step} button`);
        btn?.focus({ preventScroll: true });
        if (step === 1) setTimeout(onComplete, 2600);
      });
    },
    { scope: ref, dependencies: [step] },
  );

  const advance = contextSafe(() => {
    gsap.to(ref.current!.querySelector(".cb-step-0"), {
      autoAlpha: 0,
      y: reduced ? 0 : -10,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => setStep(1),
    });
  });

  const line = "font-serif text-[clamp(1.4rem,5.4vw,2.1rem)] leading-snug";

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[70] grid place-items-center overflow-hidden bg-paper px-8 text-center text-charcoal"
      style={{ paddingTop: "var(--safe-top)", paddingBottom: "var(--safe-bottom)" }}
      aria-live="polite"
    >
      <div aria-hidden className="atmo-leak absolute inset-0 [--leak-o:0.8]" />

      {step === 0 && (
        <div className="cb-step-0 relative max-w-xl">
          <p className="t-display invisible italic" data-gap="0">
            {callback.ps}
          </p>
          <p className={`${line} invisible mt-8`} data-gap="1.2">
            {callback.nuts}
          </p>
          <p className={`${line} invisible mt-10 text-graphite`} data-gap="1.8">
            {callback.andYes}
          </p>
          <p className={`${line} invisible mt-3 balance`} data-gap="0.6">
            <Lines text={callback.website} />
          </p>
          <p className={`${line} invisible mt-10 text-graphite`} data-gap="1.4">
            {callback.technically}
          </p>
          <p className={`${line} invisible mt-2 italic`} data-gap="0.8">
            {callback.yourFault} <span className="not-italic">{callback.laugh}</span>
          </p>
          <div className="invisible mt-12" data-gap="1">
            <HandButton label={callback.button} tone="dark" onClick={advance} />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="cb-step-1 relative max-w-xl">
          <p className="t-large invisible" data-gap="0">
            {callback.better}
          </p>
          <p className={`${line} invisible mt-5 italic text-graphite`} data-gap="0.9">
            {callback.knowYou} <span className="font-hand not-italic text-gold">{callback.knowYouSmile}</span>
          </p>
          <div className="relative invisible mt-14" data-gap="1.6">
            {glow && <Glow reduced={reduced} />}
            <p className="t-large relative italic">{callback.final}</p>
          </div>
        </div>
      )}

      <div aria-hidden className="cb-cover pointer-events-none absolute inset-0 bg-night" />
    </div>
  );
}
