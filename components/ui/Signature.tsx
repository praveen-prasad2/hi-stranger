"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/*
 * "Praveen", drawn as real pen strokes (not a font, not a typewriter).
 * Each path is a separate stroke; they're written in order with the
 * rhythm of a hand: quick capital, a pause, the rest in one go, underline.
 */
const STROKES = [
  { d: "M 52 98 C 54 78, 58 46, 63 20", dur: 0.42 },
  { d: "M 46 30 C 66 14, 104 8, 108 28 C 111 46, 86 58, 60 56", dur: 0.62 },
  {
    d: "M 92 90 C 98 84, 104 72, 110 62 C 114 66, 120 67, 128 62 C 127 72, 128 82, 132 88 C 138 80, 146 68, 157 65 C 147 58, 133 68, 135 81 C 137 92, 152 89, 157 65 C 156 76, 156 86, 163 88 C 166 82, 168 72, 168 64 C 172 76, 176 86, 180 88 C 186 80, 190 70, 194 62 C 196 68, 202 72, 210 72 C 220 70, 222 60, 214 60 C 206 60, 202 72, 206 82 C 210 90, 222 88, 230 80 C 240 74, 246 62, 238 60 C 230 60, 226 72, 230 82 C 234 90, 246 88, 254 80 C 258 74, 260 68, 262 62 C 263 72, 263 80, 263 88 C 266 76, 272 64, 280 64 C 288 64, 287 80, 290 88 C 300 92, 316 82, 334 64",
    dur: 2.3,
  },
  { d: "M 74 108 C 140 101, 230 98, 318 94", dur: 0.55 },
];

export function Signature({
  name,
  play,
  onDone,
  className = "",
}: {
  name: string;
  play: boolean;
  onDone?: () => void;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll("path");
    if (!paths) return;
    gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
    if (!play) return;

    if (reduced) {
      gsap.to(paths, { strokeDashoffset: 0, duration: 0.6, onComplete: () => doneRef.current?.() });
      return;
    }

    const tl = gsap.timeline({ delay: 0.4, onComplete: () => doneRef.current?.() });
    paths.forEach((p, i) => {
      tl.to(p, { strokeDashoffset: 0, duration: STROKES[i].dur, ease: i === 2 ? "none" : "power1.inOut" }, i === 0 ? 0 : `+=${i === 2 ? 0.18 : 0.08}`);
    });
    return () => {
      tl.kill();
    };
  }, [play, reduced]);

  return (
    <svg ref={svgRef} viewBox="30 0 320 120" className={className} role="img" aria-label={name}>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {STROKES.map((s, i) => (
          <path key={i} d={s.d} pathLength={1} />
        ))}
      </g>
    </svg>
  );
}
