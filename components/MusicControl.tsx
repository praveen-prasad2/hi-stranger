"use client";

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/content";
import { useAudio } from "@/hooks/useAudio";

/**
 * A tiny ♫ on the opening screen. On her first tap anywhere, a small
 * "Music?" question appears. After she answers, a quiet toggle stays.
 */
export function MusicControl({ ready }: { ready: boolean }) {
  const { music } = siteConfig;
  const audio = useAudio(music.src, music.volume);
  const [decided, setDecided] = useState(false);
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    if (!ready || !audio.available || decided) return;
    const ask = () => setAsking(true);
    window.addEventListener("pointerdown", ask, { once: true });
    window.addEventListener("keydown", ask, { once: true });
    return () => {
      window.removeEventListener("pointerdown", ask);
      window.removeEventListener("keydown", ask);
    };
  }, [ready, audio.available, decided]);

  if (!audio.available) return null;

  const answer = (yes: boolean) => {
    setDecided(true);
    setAsking(false);
    if (yes) audio.play();
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div
        className="fixed z-[80]"
        style={{ top: "calc(var(--safe-top) + 0.75rem)", right: "calc(var(--safe-right) + 0.75rem)" }}
      >
        <AnimatePresence mode="wait">
          {ready && !decided && (
            <m.button
              key="note"
              type="button"
              aria-label="Background music"
              onClick={() => setAsking(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="grid h-11 w-11 place-items-center font-serif text-xl text-[#b8ad9c] mix-blend-difference"
            >
              ♫
            </m.button>
          )}
          {decided && (
            <m.button
              key="toggle"
              type="button"
              aria-label={audio.playing ? "Mute music" : "Play music"}
              aria-pressed={audio.playing}
              onClick={audio.toggle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid h-11 w-11 place-items-center text-[#b8ad9c] mix-blend-difference"
            >
              {audio.playing ? <Volume2 size={17} strokeWidth={1.4} /> : <VolumeX size={17} strokeWidth={1.4} />}
            </m.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {asking && !decided && (
          <m.div
            role="dialog"
            aria-label="Background music"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
            className="fixed inset-x-0 z-[80] mx-auto flex w-max items-center gap-1 rounded-full border border-[#8a7f70]/30 bg-[#1a1816]/85 py-1 pl-5 pr-2 text-cream shadow-[0_10px_40px_-10px_rgb(0_0_0/0.5)] backdrop-blur-md"
            style={{ bottom: "calc(var(--safe-bottom) + 1.25rem)" }}
          >
            <span className="mr-1 font-serif text-lg italic">{music.prompt}</span>
            <button type="button" onClick={() => answer(true)} className="min-h-11 rounded-full px-4 text-sm">
              {music.yes}
            </button>
            <button
              type="button"
              onClick={() => answer(false)}
              className="min-h-11 rounded-full px-3 text-sm text-[#9d958a]"
            >
              {music.no}
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
