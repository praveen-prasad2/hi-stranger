"use client";

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/content";
import { HandStar } from "./ui/HandStar";

const ease = [0.2, 0.7, 0.1, 1] as const;

/** A tiny star in the corner after the ending. Never explained. */
export function EasterEgg() {
  const { easterEgg } = siteConfig;
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const starRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  // lines arrive one after another, with the pauses written into the timing
  const seq = [...easterEgg.lines, ...easterEgg.message, easterEgg.goBeHappy];
  const delays = [0.5, 1.1, 2.3, 3.4, 4.2, 5.4];

  return (
    <LazyMotion features={domAnimation} strict>
      <m.button
        ref={starRef}
        type="button"
        aria-label={easterEgg.label}
        onClick={() => setOpen(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        whileHover={{ opacity: 0.9 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="fixed z-[75] grid h-11 w-11 place-items-center text-[#8f7a57]"
        style={{ right: "calc(var(--safe-right) + 0.9rem)", bottom: "calc(var(--safe-bottom) + 0.9rem)" }}
      >
        <HandStar className="h-5 w-5" strokeWidth={1.7} />
      </m.button>

      <AnimatePresence onExitComplete={() => starRef.current?.focus({ preventScroll: true })}>
        {open && (
          <m.div
            key="egg"
            className="fixed inset-0 z-[85] grid place-items-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-[rgb(25_20_14/0.35)] backdrop-blur-[2px]" onClick={() => setOpen(false)} />
            <m.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="egg-heading"
              className="paper-sheet relative w-full max-w-sm -rotate-[0.8deg] rounded-[3px] px-8 py-10 text-center shadow-[0_30px_70px_-25px_rgb(40_28_12/0.55)]"
              initial={{ y: 30, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <h2 id="egg-heading" className="font-serif text-3xl italic">
                {easterEgg.heading}
              </h2>
              <div className="mt-6 space-y-2 font-serif text-[1.3rem] leading-snug">
                {seq.map((text, i) => (
                  <m.p
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: delays[i] ?? 0.5 + i, duration: 0.9, ease }}
                    className={i === 1 ? "pb-4 text-graphite" : i === seq.length - 1 ? "pt-4 italic" : ""}
                  >
                    {text}
                  </m.p>
                ))}
              </div>
              <m.p
                className="mt-6 font-hand text-xl text-graphite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6.3, duration: 1 }}
              >
                {easterEgg.signature}
              </m.p>
              <m.button
                ref={closeRef}
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="mt-6 min-h-11 min-w-11 text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6.8, duration: 0.8 }}
              >
                {easterEgg.button}
              </m.button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
