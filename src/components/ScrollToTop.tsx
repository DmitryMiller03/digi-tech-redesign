"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      autoAlpha: visible ? 1 : 0,
      y: visible ? 0 : 12,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
      // Once the entrance/exit settles, hand `transform` back to CSS —
      // otherwise GSAP's inline style lingers forever and outranks the
      // :hover scale from .btn-hover-key (inline always beats a
      // stylesheet rule), which read as the button "jumping" the moment
      // hover tried to kick in shortly after it appeared.
      clearProps: "transform",
    });
  }, [visible]);

  function handleClick() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      window.scrollTo(0, 0);
      return;
    }
    gsap.to(window, { duration: 0.8, scrollTo: { y: 0 }, ease: "power2.inOut" });
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label="Наверх"
      className="btn-hover-key invisible fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-white opacity-0 shadow-lg"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
