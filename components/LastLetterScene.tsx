"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Envelope } from "./Envelope";
import { HandButton } from "./ui/HandButton";

/** Scene 09 — One last thing. An envelope that only opens when she's ready. */
export function LastLetterScene({ onOpen }: { onOpen: () => void }) {
  const { lastLetter } = siteConfig;
  const ref = useRef<HTMLElement>(null);
  const busy = useRef(false);
  const reduced = useReducedMotion();
  useReveal(ref);
  const { contextSafe } = useGSAP({ scope: ref });

  const open = contextSafe(() => {
    if (busy.current) return;
    busy.current = true;
    const q = gsap.utils.selector(ref);

    if (reduced) {
      gsap.to(q(".last-btn"), { autoAlpha: 0, duration: 0.3, onComplete: onOpen });
      return;
    }

    gsap
      .timeline()
      .to(q(".last-btn"), { autoAlpha: 0, duration: 0.5 })
      // 1. lifts slightly
      .to(q(".last-env"), { y: -16, scale: 1.02, duration: 1.1, ease: "power2.inOut" }, "<0.1")
      // 2. flap opens
      .to(q(".env-flap"), { rotateX: 180, duration: 1.1, ease: "power2.inOut" })
      .set(q(".env-flap"), { zIndex: 0 }, "-=0.55")
      // 3. paper begins sliding upward
      .to(q(".env-card"), { yPercent: -78, duration: 1.4, ease: "power2.inOut" }, "-=0.2")
      // 4–5. hand over to the reader (it dims the page and expands the letter)
      .call(onOpen, [], "-=0.45");
  });

  return (
    <section ref={ref} data-tone="dim" className="relative px-6 pb-[24vh] pt-[24vh]">
      <div className="flex min-h-[40svh] items-center justify-center text-center">
        <p className="t-large italic" data-reveal="fade" data-start="top 70%">
          {lastLetter.intro}
        </p>
      </div>

      <div className="mx-auto mt-[22vh] w-full max-w-[440px]" data-reveal="up" data-start="top 85%" data-duration="1.8">
        <div className="pt-[40%]" />
        <div
          className="last-env cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label={`${lastLetter.envelopeLabel} ${lastLetter.openLabel}`}
          onClick={open}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open())}
        >
          <Envelope
            variant="ivory"
            seal
            label={lastLetter.envelopeLabel}
            card={
              <div className="paper-sheet h-full w-full rounded-[3px] px-[8%] text-left py-[7%] [container-type:inline-size]">
                <p className="font-hand text-[#3b342b]" style={{ fontSize: "6cqw" }}>
                  {siteConfig.letter.trim().split("\n")[0]}
                </p>
                <div className="mt-[5cqw] space-y-[3.4cqw]" aria-hidden>
                  {[92, 80, 88, 60].map((w) => (
                    <div key={w} className="h-px bg-[#8c7a5a]/25" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
            }
          />
        </div>
        <div className="last-btn mt-10 flex justify-center">
          <HandButton label={lastLetter.openLabel} onClick={open} />
        </div>
      </div>
    </section>
  );
}
