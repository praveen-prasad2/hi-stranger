"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/content";
import { gsap } from "@/lib/gsap";
import { HandStar } from "./ui/HandStar";

/**
 * Black. Then, after a breath, a tiny drawn star and "Something small…".
 * Waits for fonts + page load, then fades back into darkness.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const content = contentRef.current!;
    const star = content.querySelector(".hand-star-path");
    const text = content.querySelector("p");
    gsap.set(star, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(text, { autoAlpha: 0 });

    const intro = gsap.timeline({ delay: 0.5 });
    intro
      .to(star, { strokeDashoffset: 0, duration: 1.3, ease: "power1.inOut" })
      .to(text, { autoAlpha: 1, duration: 1.2, ease: "power1.out" }, "-=0.5");

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }));
    const minimum = new Promise((r) => setTimeout(r, 2900));
    // never hold her hostage to a slow asset
    const ceiling = new Promise((r) => setTimeout(r, 7000));

    let cancelled = false;
    let outro: gsap.core.Timeline | undefined;
    Promise.race([Promise.all([fontsReady, loaded, minimum]), ceiling]).then(() => {
      if (cancelled) return;
      outro = gsap.timeline({
        onComplete: () => {
          setGone(true);
          doneRef.current();
        },
      });
      outro.to(content, { autoAlpha: 0, duration: 1.1, ease: "power2.inOut" }).to({}, { duration: 0.5 });
    });

    return () => {
      cancelled = true;
      intro.kill();
      outro?.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-[95] grid place-items-center bg-night" role="status" aria-live="polite">
      <div ref={contentRef} className="flex flex-col items-center gap-4 text-[#9d958a]">
        <HandStar className="h-7 w-7 text-[#c9b48f]" strokeWidth={1.8} />
        <p className="font-hand text-xl tracking-wide">{siteConfig.loader.text}</p>
      </div>
    </div>
  );
}
