"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Animates a number counting up once it scrolls into view. Renders prefix/value/suffix as-is otherwise. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = `${value}${suffix}`;
        return;
      }

      const proxy = { count: 0 };
      gsap.to(proxy, {
        count: value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(proxy.count).toLocaleString("ru-RU")}${suffix}`;
        },
      });
    },
    { scope: ref, dependencies: [value, suffix] },
  );

  return <span ref={ref}>0{suffix}</span>;
}
