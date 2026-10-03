"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  arrow?: boolean;
  tone?: "light" | "dark";
};

/** Not a "web button": handwritten words, a pencil underline, a tiny arrow. */
export const HandButton = forwardRef<HTMLButtonElement, Props>(function HandButton(
  { label, arrow = true, tone, className = "", ...rest },
  ref,
) {
  const color = tone === "light" ? "text-cream" : tone === "dark" ? "text-charcoal" : "text-ink";
  return (
    <button
      ref={ref}
      type="button"
      className={`group relative inline-flex min-h-11 min-w-11 items-center gap-2 px-3 py-2 font-hand text-[1.7rem] leading-none ${color} ${className}`}
      {...rest}
    >
      <span className="relative">
        {label}
        <svg
          className="absolute -bottom-1.5 left-[-4%] h-2.5 w-[108%] overflow-visible"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M1 6.5C18 4.2 40 3.6 62 4.4 75 4.9 88 5.6 99 4.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          />
        </svg>
      </span>
      {arrow && (
        <span
          aria-hidden
          className="inline-block translate-y-[1px] text-[0.8em] opacity-70 transition-transform duration-500 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </button>
  );
});
