import type { CSSProperties, ReactNode } from "react";

/**
 * Same seamless pure-CSS loop as Marquee (track rendered twice, animates
 * exactly -50% of its own width), styled for cards instead of running
 * text: fixed-width tiles with a gap instead of bullet-separated words.
 * Hover pauses this row only — a second row using its own CardMarquee
 * instance keeps moving.
 */
export function CardMarquee({
  children,
  direction = "left",
  speedSeconds = 50,
  ariaLabel,
  className = "",
}: {
  children: ReactNode[];
  direction?: "left" | "right";
  speedSeconds?: number;
  ariaLabel: string;
  className?: string;
}) {
  const items = children;
  const trackStyle = { "--marquee-duration": `${speedSeconds}s` } as CSSProperties;

  return (
    <div role="group" aria-label={ariaLabel} className={`group/marquee overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max items-stretch gap-5 ${direction === "right" ? "marquee-reverse" : ""} group-hover/marquee:[animation-play-state:paused]`}
        style={trackStyle}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-stretch gap-5">
            {items.map((item, i) => (
              <div key={i} className="w-[19rem] shrink-0 sm:w-96">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
