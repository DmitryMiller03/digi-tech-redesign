import type { ElementType, ReactNode } from "react";

const SIZES = {
  "7xl": "max-w-7xl",
  "5xl": "max-w-5xl",
  "3xl": "max-w-3xl",
} as const;

export function Container({
  size = "7xl",
  as: Tag = "div",
  className = "",
  children,
}: {
  size?: keyof typeof SIZES;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`mx-auto ${SIZES[size]} px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
