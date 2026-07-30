import Link from "next/link";

export function VariantTabs({
  categorySlug,
  activeSlug,
  variants,
}: {
  categorySlug: string;
  activeSlug: string;
  variants: { slug: string; variantLabel: string | null }[];
}) {
  if (variants.length < 2) return null;

  return (
    <div>
      <div className="label mb-2 text-accent-2">Вариант изготовления</div>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isActive = variant.slug === activeSlug;
          return (
            <Link
              key={variant.slug}
              href={`/catalog/${categorySlug}/${variant.slug}`}
              className={`rounded-pill border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-line-strong text-fg-secondary hover:bg-bg-surface"
              }`}
            >
              {variant.variantLabel ?? "Вариант"}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
