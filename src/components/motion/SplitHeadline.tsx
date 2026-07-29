"use client";

import { useRef, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

/** Word-by-word reveal for hero/section headlines. */
export function SplitHeadline({
  children,
  as: Tag = "h1",
  className,
  delay = 0,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = gsap.matchMedia();

      mm.add({ reduceMotion: "(prefers-reduced-motion: reduce)" }, (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };

        if (reduceMotion) return;

        const split = SplitText.create(ref.current, { type: "words", mask: "words" });
        gsap.from(split.words, {
          yPercent: 110,
          duration: 0.8,
          delay,
          stagger: 0.06,
          ease: "power3.out",
        });

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [children] },
  );

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
