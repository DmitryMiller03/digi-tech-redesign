"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export type Stat = { value: number; suffix: string; label: string };

/**
 * Stats row that stays hidden until scrolled into view, then briefly pins
 * the viewport (a short, tunable scroll distance) while the numbers reveal
 * and count up — so the moment doesn't fly by if the user keeps scrolling.
 */
export function PinnedStats({
  stats,
  holdDistance = 300,
  className,
}: {
  stats: Stat[];
  holdDistance?: number;
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

      gsap.set(numberRefs.current, { autoAlpha: 0, y: 16 });

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: `+=${holdDistance}`,
        pin: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(numberRefs.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
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
        },
      });

      return () => trigger.kill();
    },
    { scope: containerRef, dependencies: [stats, holdDistance] },
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
