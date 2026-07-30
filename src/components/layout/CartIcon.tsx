"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useCart } from "@/lib/cart-context";

export function CartIcon() {
  const { totalCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const badgeRef = useRef<HTMLSpanElement | null>(null);
  const prevCount = useRef(0);

  useEffect(() => setMounted(true), []);

  useGSAP(
    () => {
      if (!mounted || !badgeRef.current) return;
      if (totalCount > prevCount.current) {
        gsap.fromTo(badgeRef.current, { scale: 1.4 }, { scale: 1, duration: 0.35, ease: "back.out(3)" });
      }
      prevCount.current = totalCount;
    },
    { dependencies: [totalCount, mounted] },
  );

  const count = mounted ? totalCount : 0;

  return (
    <Link
      href="/cart"
      aria-label="Корзина"
      className="relative grid h-9 w-9 place-items-center rounded-lg text-fg-secondary transition-colors hover:bg-bg-surface hover:text-fg-primary"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="9" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.5 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6" />
      </svg>
      {count > 0 && (
        <span
          ref={badgeRef}
          className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-pill bg-gradient-to-r from-primary to-accent px-1 text-[10px] font-bold text-white"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
