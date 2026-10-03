"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HandButton } from "./ui/HandButton";
import { Lines } from "./ui/Lines";

/**
 * Scene 01 — Hey Stranger.
 * Nothing on screen says what this is. Just darkness, then typing.
 * On Continue, warm light opens from the centre and becomes paper.
 */
export function IntroScene({
  active,
  onReveal,
  onDone,
}: {
  active: boolean;
  /** called when the screen is fully covered in warm light — mount the story underneath */
  onReveal: () => void;
  /** called when the intro has fully faded away */
  onDone: () => void;
}) {
  const { opening } = siteConfig;
  const rootRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const { contextSafe } = useGSAP(
    () => {
      if (!active) return;
      const q = gsap.utils.selector(rootRef);
      gsap.set(q(".intro-cursor"), { autoAlpha: 1 });

      const tl = gsap.timeline({ delay: 1 });

      // Type the greeting, with a hand-like rhythm and slow dots.
      const typed = typedRef.current!;
      const chars = Array.from(opening.greeting);
      let t = 0;
      let text = "";
      chars.forEach((ch, i) => {
        if (ch === "…") {
          [".", ".", "."].forEach((dot, d) => {
            t += d === 0 ? 0.35 : 0.32;
            const snapshot = text + ".".repeat(d + 1);
            tl.call(() => void (typed.textContent = snapshot), [], t);
          });
          text += "…";
          tl.call(() => void (typed.textContent = text.slice()), [], t + 0.01);
          return;
        }
        t += i === 0 ? 0 : ch === " " ? 0.16 : reduced ? 0.03 : 0.075 + Math.random() * 0.07;
        text += ch;
        const snapshot = text;
        tl.call(() => void (typed.textContent = snapshot), [], t);
      });

      const rise = reduced ? { autoAlpha: 1, duration: 0.8 } : { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out" };
      const from = reduced ? { autoAlpha: 0 } : { autoAlpha: 0, y: 14 };

      tl.to({}, { duration: 1.5 }) // pause
        .fromTo(q(".intro-tease"), from, rise)
        .fromTo(q(".intro-smile"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9 }, "+=0.7")
        .to({}, { duration: 2.4 })
        .to(q(".intro-tease-group"), { autoAlpha: 0, duration: 1.1, ease: "power2.inOut" })
        .fromTo(q(".intro-setup"), from, rise, "+=0.3")
        .to({}, { duration: 2.6 }) // long pause
        .fromTo(q(".intro-payoff"), from, rise)
        .fromTo(q(".intro-continue"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: "power1.inOut" }, "+=1.3");
    },
    { scope: rootRef, dependencies: [active, reduced], revertOnUpdate: true },
  );

  const handleContinue = contextSafe(() => {
    const q = gsap.utils.selector(rootRef);
    const tl = gsap.timeline();
    tl.to(q(".intro-continue"), { autoAlpha: 0, duration: 0.5 })
      .to(q(".intro-copy"), { autoAlpha: 0, duration: 1.1, ease: "power2.inOut" }, "<0.1")
      .fromTo(
        q(".intro-light"),
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: reduced ? 0.8 : 2.4, ease: "power2.inOut" },
        "-=0.3",
      )
      .call(onReveal)
      .to(rootRef.current, { autoAlpha: 0, duration: 0.9, ease: "power1.inOut" }, "+=0.15")
      .call(onDone);
  });

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-night px-7 text-cream"
      style={{ paddingTop: "var(--safe-top)", paddingBottom: "var(--safe-bottom)" }}
    >
      {/* warm light that becomes the paper */}
      <div
        aria-hidden
        className="intro-light invisible absolute left-1/2 top-1/2 h-[300vmax] w-[300vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #f4efe6 0%, #f4efe6 40%, rgb(236 210 170 / 0.9) 46%, rgb(200 160 110 / 0.25) 53%, transparent 60%)",
        }}
      />

      <div className="intro-copy relative w-full max-w-[38rem] text-center">
        <h1 className="t-large min-h-[1.2em] italic" aria-label={opening.greeting}>
          <span ref={typedRef} aria-hidden />
          <span aria-hidden className="type-cursor intro-cursor invisible" />
        </h1>

        <div className="mt-10 grid min-h-[9rem] place-items-center sm:mt-14">
          <div className="intro-tease-group col-start-1 row-start-1">
            <p className="intro-tease invisible font-serif text-[clamp(1.35rem,5vw,1.9rem)] leading-snug text-[#cfc6b8] balance">
              <Lines text={opening.tease} />
            </p>
            <p className="intro-smile invisible mt-3 font-hand text-3xl text-[#b8a07a]">{opening.teaseSmile}</p>
          </div>

          <div className="col-start-1 row-start-1 space-y-5">
            <p className="intro-setup invisible font-serif text-[clamp(1.35rem,5vw,1.9rem)] text-[#cfc6b8]">
              {opening.setup}
            </p>
            <p className="intro-payoff invisible font-serif text-[clamp(1.35rem,5vw,1.9rem)] italic text-cream balance">
              {opening.payoff}
            </p>
          </div>
        </div>

        <div className="intro-continue invisible mt-12">
          <HandButton label={opening.continueLabel} tone="light" onClick={handleContinue} />
        </div>
      </div>
    </div>
  );
}
