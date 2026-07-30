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
      <path d="M12 2 8 8a4 4 0 1 0 8 0z" />
      <path d="M5 22v-6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" />
      <path d="M9 22v-4M15 22v-4" />
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
      <rect x="4" y="9" width="16" height="11" rx="1" />
      <path d="M8 9V6a4 4 0 0 1 8 0v3" />
    </Base>
  ),
  press: (props) => (
    <Base {...props}>
      <path d="M4 4h16v6H4z" />
      <path d="M10 10v4h4v-4M8 20h8" />
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
  lab: (props) => (
    <Base {...props}>
      <path d="M9 3h6M10 3v6l-5 10a1.5 1.5 0 0 0 1.4 2h11.2a1.5 1.5 0 0 0 1.4-2l-5-10V3" />
      <path d="M7.5 14h9" />
    </Base>
  ),
  teaching: (props) => (
    <Base {...props}>
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <path d="M7 10v4M12 9v5M17 11v3" />
    </Base>
  ),
  interactive: (props) => (
    <Base {...props}>
      <path d="M4 20 20 6" />
      <rect x="9" y="3" width="10" height="14" rx="1" transform="rotate(20 14 10)" />
    </Base>
  ),
  workshop: (props) => (
    <Base {...props}>
      <path d="M3 21V9l9-6 9 6v12" />
      <path d="M9 21v-6h6v6M9 12h.01M15 12h.01" />
    </Base>
  ),
  software: (props) => (
    <Base {...props}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
      <path d="M9 8l3 2-3 2" />
    </Base>
  ),
  simulator: (props) => (
    <Base {...props}>
      <rect x="3" y="4" width="18" height="11" rx="1.5" />
      <path d="M7 20h10M9 15v5M15 15v5" />
      <circle cx="12" cy="9" r="2" />
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
