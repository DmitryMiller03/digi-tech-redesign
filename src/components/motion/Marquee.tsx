import type { CSSProperties, ReactNode } from "react";

/**
 * Seamless infinite marquee, pure CSS (no GSAP/JS ticking needed for a
 * constant-speed loop). The item list is rendered twice back-to-back and
 * the track animates exactly half its own width, so the loop point is
 * invisible. `prefers-reduced-motion` is handled in globals.css: the
 * animation is dropped and the duplicate copy hidden, leaving a plain
 * wrapped list.
 */
export function Marquee({
  items,
  direction = "left",
  speedSeconds = 32,
  pauseOnHover = true,
  variant = "solid",
  ariaLabel,
  decorative = false,
  className = "",
}: {
  items: ReactNode[];
  direction?: "left" | "right";
  speedSeconds?: number;
  pauseOnHover?: boolean;
  variant?: "solid" | "outline" | "muted";
  /** Required unless `decorative` — a screen reader still needs to know what this group is. */
  ariaLabel?: string;
  /** Purely visual transition with no unique content (e.g. it restates the
   * catalog) — hides the whole thing from assistive tech instead of labeling it. */
  decorative?: boolean;
  className?: string;
}) {
  const trackStyle = { "--marquee-duration": `${speedSeconds}s` } as CSSProperties;

  return (
    <div
      {...(decorative ? { "aria-hidden": true } : { role: "group", "aria-label": ariaLabel })}
      className={`group/marquee overflow-hidden ${className}`}
    >
      <div
        className={`marquee-track flex w-max items-center ${direction === "right" ? "marquee-reverse" : ""} ${
          pauseOnHover ? "group-hover/marquee:[animation-play-state:paused]" : ""
        }`}
        style={trackStyle}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <li
                key={i}
                className={`marquee-item shrink-0 whitespace-nowrap font-bold uppercase tracking-tight ${
                  variant === "outline"
                    ? "marquee-item-outline"
                    : variant === "muted"
                      ? "text-fg-muted"
                      : "text-fg-primary"
                }`}
              >
                {item}
                <span className="marquee-dot mx-[clamp(1rem,3vw,2.5rem)] inline-block align-middle" aria-hidden="true">
                  •
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
