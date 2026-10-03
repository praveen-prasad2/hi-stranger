import type { ElementType } from "react";

/** Each authored line slides up from behind its own mask (see useReveal "mask"). */
export function MaskLines({
  text,
  as: Tag = "p",
  className = "",
  delay,
  start,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  start?: string;
}) {
  return (
    <Tag className={className} data-reveal="mask" data-delay={delay} data-start={start}>
      {text.split("\n").map((line, i) => (
        <span key={i} className="mask-line">
          <span className="mask-inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
