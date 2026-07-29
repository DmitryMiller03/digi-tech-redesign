"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function Logo({ animate = false }: { animate?: boolean }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!animate) return;
      const mm = gsap.matchMedia();

      mm.add({ reduceMotion: "(prefers-reduced-motion: reduce)" }, (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        if (reduceMotion) return;

        gsap.fromTo(
          ref.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1, delay: 0.15, ease: "power3.out" },
        );
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className="inline-block">
      <Image src="/logo.svg" alt="Digi Tech" width={134} height={40} priority />
    </span>
  );
}
