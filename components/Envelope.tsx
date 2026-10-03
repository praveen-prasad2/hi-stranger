import type { ReactNode } from "react";
import { HandStar } from "./ui/HandStar";

/**
 * A paper envelope, seen from the back (flap side).
 * Purely presentational — scenes animate its parts with GSAP:
 *   .env-flap  (rotateX to open)   .env-card  (slides out)
 *   .env-back / .env-pocket        (the shell)
 */
export function Envelope({
  card,
  label,
  variant = "kraft",
  seal = false,
  className = "",
}: {
  card: ReactNode;
  label?: string;
  variant?: "kraft" | "ivory";
  seal?: boolean;
  className?: string;
}) {
  return (
    <div className={`envelope relative aspect-[3/2] w-full [container-type:inline-size] ${className}`} data-variant={variant}>
      <div className="env-back absolute inset-0" />
      <div className="env-card absolute inset-x-[5%] bottom-[6%] top-[6%] z-[1] will-change-transform">{card}</div>
      <div className="env-pocket absolute inset-0 z-[2]">
        <div className="env-left" />
        <div className="env-right" />
        <div className="env-bottom" />
        {label && (
          <p
            className="absolute inset-x-0 bottom-[13%] text-center font-hand text-[#3b342b]/80"
            style={{ fontSize: "clamp(1.25rem, 7.2cqw, 2.1rem)" }}
          >
            {label}
          </p>
        )}
      </div>
      <div className="env-flap absolute inset-x-0 top-0 z-[3] h-[56%]">
        <div className="env-flap-shape" />
        {seal && (
          <HandStar className="absolute bottom-[-7%] left-1/2 h-[9cqw] max-h-9 w-[9cqw] max-w-9 -translate-x-1/2 text-[#8f7a57]" />
        )}
      </div>
    </div>
  );
}
