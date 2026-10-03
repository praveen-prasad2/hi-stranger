/** A small, slightly imperfect hand-drawn star — the site's quiet motif. */
export function HandStar({ className = "", strokeWidth = 1.6 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
      <path
        className="hand-star-path"
        pathLength={1}
        d="M24.4 5.5c1.3 3.8 2.7 8.4 3.8 11.5 3.9.2 9.1.1 12.9.5-3 2.5-6.9 5.3-9.8 7.8 1 3.8 2.6 8.9 3.3 12.5-3.3-2.3-6.9-5-10.2-7.1-3.3 2.2-7.1 5-10.2 7.2 1.1-3.6 2.6-8.6 3.6-12.3-2.9-2.5-6.8-5.4-9.6-7.9 3.7-.3 8.8-.4 12.8-.6 1.2-3.5 2.5-7.6 3.6-11.2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
