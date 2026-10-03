"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { HandButton } from "./ui/HandButton";

/** Scene 10 — "That's it." (It isn't.) */
export function FakeEnding({ onNext }: { onNext: () => void }) {
  const { fakeEnding } = siteConfig;
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      gsap
        .timeline({ delay: 0.8, onComplete: () => btnRef.current?.focus({ preventScroll: true }) })
        .fromTo(q(".fe-1"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: "power1.inOut" })
        .to({}, { duration: 2.2 })
        .to(q(".fe-1"), { autoAlpha: 0, duration: 1, ease: "power1.inOut" })
        .fromTo(q(".fe-2"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: "power1.inOut" })
        .to({}, { duration: 2 })
        .to(q(".fe-2"), { autoAlpha: 0, duration: 1, ease: "power1.inOut" })
        .to({}, { duration: 2.1 }) // nothing happens
        .fromTo(q(".fe-3"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 })
        .to({}, { duration: 1.6 })
        .fromTo(q(".fe-4"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 1.1 })
        .fromTo(q(".fe-5"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 1.1 }, "+=0.9")
        .fromTo(q(".fe-6"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 1.1 }, "+=1.2")
        .fromTo(q(".fe-btn"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, "+=1");
    },
    { scope: ref },
  );

  const next = contextSafe(() => {
    gsap.to(ref.current!.children, { autoAlpha: 0, duration: 0.8, onComplete: onNext });
  });

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[70] grid place-items-center bg-night px-8 text-center text-cream"
      aria-live="polite"
    >
      <p className="fe-1 t-large invisible col-start-1 row-start-1">{fakeEnding.thatsIt}</p>
      <p className="fe-2 t-large invisible col-start-1 row-start-1 italic">{fakeEnding.seriously}</p>
      <div className="col-start-1 row-start-1 flex flex-col items-center">
        <p className="fe-3 invisible font-serif text-2xl text-[#9d958a]">{fakeEnding.dots}</p>
        <p className="fe-4 invisible mt-8 font-serif text-[clamp(1.4rem,5vw,1.9rem)]">{fakeEnding.okay}</p>
        <p className="fe-5 invisible mt-3 font-serif text-[clamp(1.4rem,5vw,1.9rem)] italic text-[#cfc6b8]">
          {fakeEnding.enough}
        </p>
        <p className="fe-6 invisible mt-6 font-serif text-[clamp(1.4rem,5vw,1.9rem)]">{fakeEnding.backToNormal}</p>
        <div className="fe-btn invisible mt-12">
          <HandButton ref={btnRef} label={fakeEnding.button} tone="light" onClick={next} />
        </div>
      </div>
    </div>
  );
}
