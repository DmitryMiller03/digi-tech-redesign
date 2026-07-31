import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type CardProps<T extends ElementType> = {
  as?: T;
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

const PADDING = {
  none: "",
  sm: "p-5",
  md: "p-6",
  lg: "p-7",
} as const;

/**
 * Shared card surface used for direction/product/blog tiles and info
 * cards. Pass `as={Link}` + `href` for a clickable tile — `interactive`
 * adds the hover lift/border/shadow used across catalog-style grids.
 */
export function Card<T extends ElementType = "div">({
  as,
  interactive = false,
  padding = "md",
  className = "",
  children,
  ...rest
}: CardProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      className={`overflow-hidden rounded-xl border border-line bg-bg-page ${PADDING[padding]} ${
        interactive
          ? "group shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-lg"
          : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
