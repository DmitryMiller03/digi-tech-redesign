/** Shown instead of a product screenshot when `images` is empty. */
export function ProductImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 via-accent/10 to-bg-surface ${className}`}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        preserveAspectRatio="none"
      >
        <pattern id="placeholder-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#placeholder-grid)" />
      </svg>

      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative h-10 w-10 text-primary/60"
        aria-hidden="true"
      >
        <rect x="4" y="8" width="40" height="26" rx="3" />
        <path d="M17 40h14M24 34v6" />
        <path d="M13 17l6 5-6 5" strokeOpacity="0.5" />
        <path d="M27 27h8" strokeOpacity="0.5" />
      </svg>
      <span className="sr-only">Скриншот появится позже</span>
    </div>
  );
}
