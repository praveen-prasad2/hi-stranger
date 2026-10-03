"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Background music that never autoplays.
 * - checks the file exists before offering it
 * - fades in/out instead of cutting
 * - pauses while the tab is hidden
 */
export function useAudio(src: string, targetVolume = 0.45) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const wantsPlayRef = useRef(false);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(src, { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") || "";
        if (!cancelled) setAvailable(r.ok && !type.includes("text/html"));
      })
      .catch(() => !cancelled && setAvailable(false));
    return () => {
      cancelled = true;
    };
  }, [src]);

  const fadeTo = useCallback((to: number, ms: number, done?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      const eased = p * p * (3 - 2 * p);
      audio.volume = Math.max(0, Math.min(1, from + (to - from) * eased));
      if (p < 1) fadeRef.current = requestAnimationFrame(step);
      else done?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  const play = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio(src);
      a.loop = true;
      a.preload = "auto";
      a.volume = 0;
      audioRef.current = a;
    }
    const audio = audioRef.current;
    wantsPlayRef.current = true;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        fadeTo(targetVolume, 2800);
      })
      .catch(() => {
        wantsPlayRef.current = false;
        setPlaying(false);
      });
  }, [src, targetVolume, fadeTo]);

  const pause = useCallback(() => {
    wantsPlayRef.current = false;
    setPlaying(false);
    fadeTo(0, 900, () => audioRef.current?.pause());
  }, [fadeTo]);

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play]);

  useEffect(() => {
    const onVis = () => {
      const audio = audioRef.current;
      if (!audio || !wantsPlayRef.current) return;
      if (document.hidden) audio.pause();
      else audio.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(
    () => () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
      audioRef.current?.pause();
    },
    [],
  );

  return { available, playing, play, pause, toggle };
}
