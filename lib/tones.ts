import { gsap } from "./gsap";

export type Tone = "dark" | "paper" | "bright" | "dim" | "formal";

const tones: Record<Tone, { bg: string; ink: string; soft: string; accent: string; paper: number; leak: number }> = {
  dark: { bg: "#0d0c0b", ink: "#ece5d9", soft: "#9d958a", accent: "#b8a07a", paper: 0, leak: 0 },
  paper: { bg: "#f4efe6", ink: "#191816", soft: "#5f5850", accent: "#a48d68", paper: 0.5, leak: 0.7 },
  bright: { bg: "#faf7f1", ink: "#191816", soft: "#625b52", accent: "#a48d68", paper: 0.35, leak: 1 },
  dim: { bg: "#e6dfd2", ink: "#191816", soft: "#5a534a", accent: "#94805f", paper: 0.55, leak: 0.35 },
  // the counsellor days: cooler, cleaner, a little "official"
  formal: { bg: "#ecedeb", ink: "#1b1c1e", soft: "#67696d", accent: "#7c828a", paper: 0.12, leak: 0 },
};

let current: Tone | null = null;

/** Crossfade the whole page to a scene tone. */
export function applyTone(tone: Tone, immediate = false) {
  if (current === tone && !immediate) return;
  current = tone;
  const t = tones[tone];
  // GSAP runs callbacks inside the context that created them, so a tween made
  // from a scene's ScrollTrigger/timeline callback would be reverted when that
  // scene unmounts. A microtask runs after that context is released.
  queueMicrotask(() => {
    gsap.to(document.documentElement, {
      "--bg": t.bg,
      "--ink": t.ink,
      "--ink-soft": t.soft,
      "--accent": t.accent,
      "--paper-o": t.paper,
      "--leak-o": t.leak,
      duration: immediate ? 0 : 1.6,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  });
}
