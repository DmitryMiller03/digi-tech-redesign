import type { ReactNode } from "react";

/**
 * Shared brand-gradient CTA panel (rounded-2xl, from-primary to-accent,
 * white text) — was hand-duplicated across 7 pages. Adds a slow, subtle
 * background-position pan (see .gradient-cta-animated in globals.css);
 * everything else about layout/spacing is left to the caller via
 * `className`, same as before.
 */
export function GradientCta({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`gradient-cta-animated relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent text-white ${className}`}
    >
      {children}
    </div>
  );
}
