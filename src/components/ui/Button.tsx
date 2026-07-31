import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";

const VARIANTS = {
  /** Main brand gradient CTA — the site's primary action. */
  primary: "bg-gradient-to-r from-primary to-accent text-white shadow-md",
  /** White pill for use inside a gradient/dark CTA block. */
  inverted: "bg-white text-primary",
  /** Bordered, translucent — for use over the dark hero video. */
  ghost: "border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15",
} as const;

const SIZES = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3.5 text-sm",
} as const;

type SharedProps = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/** Shared pill button. Pass `href` for a link, omit it for a `<button>`. */
export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  ...rest
}: ButtonAsLink | ButtonAsButton) {
  // No hover:scale here on purpose — call sites are wrapped in
  // MagneticButton, which already drives hover/press feedback via GSAP
  // transform; a competing CSS transform would fight it. Brightness is a
  // transform-free way to still signal hover.
  const classes = `group inline-flex items-center gap-2 rounded-pill font-semibold transition-[filter,background-color,color] hover:brightness-105 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      )}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonAsButton)}>
      {content}
    </button>
  );
}
