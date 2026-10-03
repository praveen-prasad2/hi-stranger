"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HandButton } from "./ui/HandButton";
import { Lines } from "./ui/Lines";
import { Signature } from "./ui/Signature";

type Para = { lines: string[]; emphasis: boolean };

/** Paragraphs split on blank lines; a paragraph written with "> " is emphasised. */
function parseLetter(text: string): Para[] {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const raw = block.split("\n");
      const emphasis = raw.every((l) => l.trimStart().startsWith(">"));
      return { emphasis, lines: raw.map((l) => (emphasis ? l.replace(/^\s*>\s?/, "") : l)) };
    });
}

/**
 * The letter, in its own reading space: the page behind dims, scrolling
 * happens inside the letter, and it ends with a signature written by hand.
 */
export function FinalLetter({ onClosed }: { onClosed: () => void }) {
  const { letter, lastLetter, sender } = siteConfig;
  const paras = useMemo(() => parseLetter(letter), [letter]);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sigRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);
  const closing = useRef(false);

  // entrance: dim the world, bring the letter up into reading position
  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const tl = gsap.timeline({ onComplete: () => scrollRef.current?.focus({ preventScroll: true }) });
      tl.fromTo(q(".fl-backdrop"), { autoAlpha: 0 }, { autoAlpha: 1, duration: reduced ? 0.4 : 1.2, ease: "power2.inOut" });
      if (reduced) tl.fromTo(q(".fl-sheet"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
      else
        tl.fromTo(
          q(".fl-sheet"),
          { autoAlpha: 0, y: "22vh", scale: 0.84 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.6, ease: "expo.out" },
          "-=0.6",
        );
    },
    { scope: rootRef },
  );

  // paragraphs settle in as she reads; the signature starts when it comes into view
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>(".fl-p");
    if (reduced) items.forEach((el) => el.classList.add("is-in"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (e.target === sigRef.current) setSigning(true);
          else e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      },
      { root, rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    items.forEach((el) => io.observe(el));
    if (sigRef.current) io.observe(sigRef.current);
    return () => io.disconnect();
  }, [reduced]);

  const close = contextSafe(() => {
    if (closing.current) return;
    closing.current = true;
    const q = gsap.utils.selector(rootRef);
    gsap
      .timeline({ onComplete: onClosed })
      .to(q(".fl-sheet"), { autoAlpha: 0, y: reduced ? 0 : 40, scale: reduced ? 1 : 0.97, duration: 1, ease: "power2.inOut" })
      .to(q(".fl-backdrop"), { backgroundColor: "#0b0a09", duration: 1.2, ease: "power1.inOut" }, "<0.3")
      .to({}, { duration: 0.4 });
  });

  return (
    <div ref={rootRef} className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="A letter for you">
      <div className="fl-backdrop invisible absolute inset-0 bg-[rgb(12_10_8/0.88)] backdrop-blur-[2px]" />

      <div
        ref={scrollRef}
        tabIndex={-1}
        data-lenis-prevent
        className="absolute inset-0 overflow-y-auto overscroll-contain outline-none"
        style={{ paddingTop: "calc(var(--safe-top) + 6vh)", paddingBottom: "calc(var(--safe-bottom) + 10vh)" }}
      >
        <article className="fl-sheet paper-sheet invisible relative mx-auto w-[min(94vw,640px)] rounded-[3px] px-[clamp(1.3rem,6vw,4.5rem)] py-[clamp(2.6rem,9vw,5.5rem)] shadow-[0_40px_100px_-30px_rgb(0_0_0/0.7)]">
          <div className="font-serif text-[clamp(1.08rem,4.4vw,1.5rem)] leading-[1.6] text-[#24211d]">
            {paras.map((p, i) =>
              p.emphasis ? (
                <p
                  key={i}
                  className="fl-p my-[2.2em] text-center text-[1.3em] italic leading-[1.3] text-charcoal balance sm:text-[1.45em]"
                >
                  {/* authored breaks only where there's room; phones wrap naturally */}
                  <Lines text={p.lines.join("\n")} />
                </p>
              ) : (
                <p key={i} className={`fl-p ${i === 0 ? "mb-[1.6em] font-hand text-[1.5em] leading-none text-graphite" : "mb-[1.15em]"}`}>
                  {p.lines.map((l, j) => (
                    <span key={j} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              ),
            )}

            <div className="mt-[2.2em] flex items-center gap-3">
              {lastLetter.signOff && (
                <span className="fl-p shrink-0 text-graphite" aria-hidden>
                  {lastLetter.signOff}
                </span>
              )}
              <div ref={sigRef} className="w-[min(62%,260px)] text-charcoal">
                <Signature name={sender} play={signing} onDone={() => setSigned(true)} />
              </div>
            </div>
          </div>

          <div
            className={`mt-14 flex justify-center transition-opacity duration-[1400ms] ${signed ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <HandButton label={lastLetter.closeLabel} tone="dark" onClick={close} tabIndex={signed ? 0 : -1} />
          </div>
        </article>
      </div>

      <style>{`
        .fl-p { opacity: 0; transform: translateY(10px); transition: opacity 1.2s ease, transform 1.2s cubic-bezier(.2,.7,.1,1); }
        .fl-p.is-in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .fl-p { transform: none; transition: opacity .4s ease; } }
      `}</style>
    </div>
  );
}
