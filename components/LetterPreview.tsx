"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Envelope } from "./Envelope";
import { HandButton } from "./ui/HandButton";

/**
 * Her letter in its envelope. The card shows just "Hey Stranger," —
 * her words follow in the next scene.
 * Tap the envelope or "Open" — the flap lifts and the card slides out.
 */
export function LetterPreview({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  const { shirt } = siteConfig;
  const ref = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const reduced = useReducedMotion();
  const { contextSafe } = useGSAP({ scope: ref });

  const open = contextSafe(() => {
    if (opened || busy.current) return;
    busy.current = true;
    const q = gsap.utils.selector(ref);
    const shell = q(".env-back, .env-pocket, .env-flap");
    const card = q(".env-card");

    if (reduced) {
      gsap
        .timeline({ onComplete: onOpen })
        .to([q(".open-btn"), ...shell], { autoAlpha: 0, duration: 0.5 })
        .set(card, { zIndex: 5, yPercent: -60 })
        .fromTo(card, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 });
      return;
    }

    gsap
      .timeline({ onComplete: onOpen })
      .to(q(".open-btn"), { autoAlpha: 0, duration: 0.4 })
      .to(q(".env-flap"), { rotateX: 180, duration: 1, ease: "power2.inOut" })
      .set(q(".env-flap"), { zIndex: 0 }, "-=0.5")
      .to(card, { yPercent: -112, duration: 1.2, ease: "power2.inOut" }, "-=0.15")
      .set(card, { zIndex: 5 })
      .to(shell, { y: 70, autoAlpha: 0, duration: 1, ease: "power2.in" })
      .to(card, { yPercent: -60, scale: 1.05, rotate: -1.2, duration: 1.3, ease: "power3.inOut" }, "<0.15");
  });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[460px]">
      {/* room above for the card to slide into */}
      <div className="pt-[64%]" />
      <div
        role="button"
        tabIndex={opened ? -1 : 0}
        aria-label={opened ? "Her note" : `${shirt.openLabel} the letter`}
        onClick={open}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open())}
        className={opened ? "" : "cursor-pointer"}
        data-cursor={opened ? undefined : "hover"}
      >
        <Envelope
          card={
            <div className="paper-ruled relative h-full w-full overflow-hidden rounded-[3px] px-[7%] py-[6%] text-left text-[#2a2621] shadow-[0_18px_40px_-18px_rgb(40_28_12/0.45)] [--rule:8.2cqw] [container-type:inline-size]">
              <p className="font-hand leading-[8.2cqw]" style={{ fontSize: "6.4cqw" }}>
                {shirt.cardGreeting}
              </p>
            </div>
          }
        />
      </div>

      <div className="open-btn mt-8 flex justify-center" aria-hidden={opened}>
        {!opened && <HandButton label={shirt.openLabel} onClick={open} />}
      </div>
    </div>
  );
}
