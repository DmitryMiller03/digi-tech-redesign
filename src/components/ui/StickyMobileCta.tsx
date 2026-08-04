import Link from "next/link";

/**
 * Fixed bottom action bar, mobile only (lg:hidden) — on catalog/product
 * pages the in-page CTA cards scroll far out of reach once the visitor
 * has read a couple of screens, so the primary action needs a fixed
 * anchor rather than living only in the header/footer.
 */
export function StickyMobileCta({ label }: { label: string }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg-page/95 px-4 py-3 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/contacts"
        className="btn-hover-key relative flex items-center justify-center rounded-pill bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-white shadow-md"
      >
        {label}
      </Link>
    </div>
  );
}
