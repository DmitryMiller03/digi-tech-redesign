"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const WORDS = [
  "нефтегазовой переработки",
  "строительства",
  "электроэнергетики",
  "машиностроения",
  "металлургии",
  "автотренажёров",
];

export function HeroTypewriter() {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (textRef.current) textRef.current.textContent = WORDS[0];
      return;
    }

    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0.1,
        duration: 0.25,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
    }

    const el = textRef.current;
    if (!el) return;

    const proxy = { chars: 0 };
    let wordIndex = 0;
    let cancelled = false;

    function cycle() {
      if (cancelled) return;
      const word = WORDS[wordIndex % WORDS.length];
      proxy.chars = 0;

      gsap.to(proxy, {
        chars: word.length,
        duration: word.length * 0.055,
        ease: "none",
        onUpdate: () => {
          if (el) el.textContent = word.slice(0, Math.round(proxy.chars));
        },
        onComplete: () => {
          if (cancelled) return;
          gsap.delayedCall(1.1, () => {
            if (cancelled) return;
            gsap.to(proxy, {
              chars: 0,
              duration: word.length * 0.03,
              ease: "none",
              onUpdate: () => {
                if (el) el.textContent = word.slice(0, Math.round(proxy.chars));
              },
              onComplete: () => {
                wordIndex += 1;
                cycle();
              },
            });
          });
        },
      });
    }

    cycle();

    return () => {
      cancelled = true;
    };
  }, { scope: textRef });

  return (
    <span className="inline-flex items-baseline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
      <span ref={textRef} />
      <span
        ref={cursorRef}
        className="ml-1.5 inline-block h-[0.85em] w-[5px] translate-y-[0.1em] rounded-full bg-accent-2 shadow-[0_0_12px_rgba(57,235,184,0.7)]"
      />
    </span>
  );
}
