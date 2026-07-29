"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export type Stat = { value: number; suffix: string; label: string };

/**
 * Stats row that stays hidden on load and only reveals + counts up once the
 * user has actually scrolled a little (not just because the row happens to
 * already sit inside the initial viewport). No pin, no movement — the
 * numbers fade in exactly where they sit and count up in place.
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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        numberRefs.current.forEach((el, i) => {
          if (el) el.textContent = `${stats[i].value.toLocaleString("ru-RU")}${stats[i].suffix}`;
        });
        return;
      }

      gsap.set(numberRefs.current, { autoAlpha: 0 });
      let revealed = false;

      function tryReveal() {
        if (revealed || !containerRef.current) return;
        if (window.scrollY < scrollThreshold) return;

        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.95) return;

        revealed = true;
        window.removeEventListener("scroll", tryReveal);

        const tl = gsap.timeline();
        tl.to(numberRefs.current, {
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power1.out",
        });

        stats.forEach((stat, i) => {
          const proxy = { count: 0 };
          const el = numberRefs.current[i];
          tl.to(
            proxy,
            {
              count: stat.value,
              duration: 1,
              ease: "power2.out",
              onUpdate: () => {
                if (el) {
                  el.textContent = `${Math.round(proxy.count).toLocaleString("ru-RU")}${stat.suffix}`;
                }
              },
            },
            "<",
          );
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
            0{stat.suffix}
          </dt>
          <dd className="mt-1 text-sm text-fg-muted">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}
