import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

const CATEGORY_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  oil: (props) => (
    <Base {...props}>
      <path d="M9 2h6v3H9z" />
      <rect x="7" y="5" width="10" height="15" rx="1" />
      <path d="M7 10h10M7 14h10" />
      <path d="M4 20h16" />
    </Base>
  ),
  construction: (props) => (
    <Base {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V9l7-5 7 5v12" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 12h.01M15 12h.01" />
    </Base>
  ),
  electric: (props) => (
    <Base {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </Base>
  ),
  machinery: (props) => (
    <Base {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </Base>
  ),
  thermal: (props) => (
    <Base {...props}>
      <path d="M8 3v11a4 4 0 1 0 4 0V3z" />
      <path d="M8 8h4" />
    </Base>
  ),
  "metal-nonferrous": (props) => (
    <Base {...props}>
      <path d="M4 20 12 4l8 16z" />
      <path d="M8 16h8" />
    </Base>
  ),
  "metal-ferrous": (props) => (
    <Base {...props}>
      <path d="M10 2h4l1 4H9z" />
      <path d="M9 6h6l3 15H6z" />
      <path d="M9.5 13h5" />
    </Base>
  ),
  press: (props) => (
    <Base {...props}>
      <path d="M4 4h16" />
      <path d="M9 9l3 3 3-3" />
      <rect x="6" y="14" width="12" height="4" rx="0.5" />
      <path d="M4 21h16" />
    </Base>
  ),
  flask: (props) => (
    <Base {...props}>
      <path d="M9 2h6M10 2v6l-5 10a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V2" />
      <path d="M7.5 15h9" />
    </Base>
  ),
  complex: (props) => (
    <Base {...props}>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M8 20h8M12 16v4" />
    </Base>
  ),
  vehicle: (props) => (
    <Base {...props}>
      <path d="M3 16V9a2 2 0 0 1 2-2h5l5 4h4a1 1 0 0 1 1 1v4" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M9 17h6" />
    </Base>
  ),
};

export function CategoryIcon({ icon, ...props }: { icon: string } & IconProps) {
  const Icon = CATEGORY_ICONS[icon];
  if (!Icon) return null;
  return <Icon {...props} />;
}

const FORMAT_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  // These six are redrawn after the reference set on the old site
  // (digi-tech.dev) — a stand/cabinet-on-legs family rather than generic
  // tech icons, so the six read as one consistent product line. workshop
  // and simulator keep their own simpler marks instead: matching the
  // reference there would have made them read as near-duplicates of
  // interactive/teaching at this size.
  lab: (props) => (
    <Base {...props}>
      <path d="M6 8h12v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8z" />
      <path d="M6 8V5h12v3" />
      <path d="M9 11v5M12 11v5M15 11v5" />
      <path d="M8 19v2M16 19v2" />
    </Base>
  ),
  teaching: (props) => (
    <Base {...props}>
      <rect x="4" y="4" width="16" height="10" rx="1" />
      <path d="M8 4v10M12 4v10M16 4v10" />
      <path d="M8 18v2M16 18v2" />
    </Base>
  ),
  interactive: (props) => (
    <Base {...props}>
      <path d="M9 4h8l-1 6h-6z" />
      <path d="M11 10 8 20M15 10l3 10" />
      <path d="M6 20h12" />
    </Base>
  ),
  workshop: (props) => (
    <Base {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
    </Base>
  ),
  software: (props) => (
    <Base {...props}>
      <path d="M5 5h14v9H5z" />
      <path d="M3 19h18l-2-3H5z" />
      <path d="M10.2 7.7 12 6.8l1.8.9v2.4l-1.8.9-1.8-.9z" />
    </Base>
  ),
  simulator: (props) => (
    <Base {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.25" />
      <path d="M12 4v3.5M12 16.5V20M5.6 7.4l2.5 2M15.9 14.6l2.5 2M18.4 7.4l-2.5 2M8.1 14.6l-2.5 2" />
    </Base>
  ),
};

export function FormatIcon({ icon, ...props }: { icon: string } & IconProps) {
  const Icon = FORMAT_ICONS[icon];
  if (!Icon) return null;
  return <Icon {...props} />;
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Base>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  );
}
