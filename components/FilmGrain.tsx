"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Paper fibres, a soft vignette, warm light leaks and film grain.
 * Grain only animates on capable devices; everything is pointer-events: none.
 */
export function FilmGrain() {
  const reduced = useReducedMotion();
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency ?? 4;
    const memory = nav.deviceMemory ?? 4;
    setCapable(cores > 4 && memory >= 4);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none">
      <div className="atmo-paper fixed inset-0 z-[1]" />
      <div className="atmo-vignette fixed inset-0 z-[1]" />
      <div className="atmo-leak fixed inset-0 z-[1]" />
      <div className="fixed inset-0 z-[90] overflow-hidden">
        <div className={`atmo-grain absolute ${capable && !reduced ? "is-animated" : ""}`} />
      </div>
    </div>
  );
}
