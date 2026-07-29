"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";

/** Full-screen gradient curtain that sweeps down before a route change and lifts away after. */
export function PageTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isFirstRender = useRef(true);
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!overlayRef.current || !isTransitioning.current) return;

    gsap.to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: "bottom",
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");
      if (!href || href.startsWith("#") || href.startsWith("http") || targetAttr === "_blank") return;
      if (anchor.hasAttribute("download") || href === pathname) return;
      if (isTransitioning.current || !overlayRef.current) return;

      e.preventDefault();
      isTransitioning.current = true;

      gsap.set(overlayRef.current, { transformOrigin: "top" });
      gsap.to(overlayRef.current, {
        scaleY: 1,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => router.push(href),
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, router]);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] origin-top scale-y-0 bg-gradient-to-br from-primary to-accent"
    />
  );
}
