"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export type Stat = { value: number; suffix: string; label: string };

/**
 * Stats row that stays hidden on load and only reveals once the user has
 * actually scrolled a little (not just because the row happens to already
 * sit inside the initial viewport). No pin, no movement — the numbers
 * fade + sharpen into place exactly where they sit, already showing their
 * real value.
 */
export function PinnedStats({
  stats,
  scrollThreshold = 60,
  className,
}: {
  stats: Stat[];
  scrollThreshold?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDListElement | null>(null);
  const numberRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      // Counting up from zero reads as a slot-machine gimmick more than a
      // confident B2B stat — the numbers just fade/sharpen into place,
      // already showing their real value the instant they're legible.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(numberRefs.current, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.set(numberRefs.current, { autoAlpha: 0, y: 10, filter: "blur(4px)" });
      let revealed = false;

      function tryReveal() {
        if (revealed || !containerRef.current) return;
        if (window.scrollY < scrollThreshold) return;

        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.95) return;

        revealed = true;
        window.removeEventListener("scroll", tryReveal);

        gsap.to(numberRefs.current, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });
      }

      window.addEventListener("scroll", tryReveal, { passive: true });
      return () => window.removeEventListener("scroll", tryReveal);
    },
    { scope: containerRef, dependencies: [stats, scrollThreshold] },
  );

  return (
    <dl ref={containerRef} className={className}>
      {stats.map((stat, i) => (
        <div key={stat.label}>
          <dt
            ref={(el) => {
              numberRefs.current[i] = el;
            }}
            className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold text-transparent"
          >
            {stat.value.toLocaleString("ru-RU")}
            {stat.suffix}
          </dt>
          <dd className="mt-1 text-sm text-fg-muted">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}
