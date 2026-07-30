"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const AUDIENCE_LINKS = [
  { href: "/vuzy", label: "Высшие учебные заведения" },
  { href: "/ssuzy", label: "Средне-специальные учебные заведения" },
  { href: "/predpriyatiya", label: "Предприятия" },
  { href: "/professionalism", label: "Профессионалитет" },
];

export function AudienceDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium text-fg-secondary transition-colors hover:text-fg-primary"
        onClick={() => setOpen((v) => !v)}
      >
        Клиентам
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-xl border border-line bg-bg-page p-2 shadow-lg">
          {AUDIENCE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-fg-secondary transition-colors hover:bg-bg-surface hover:text-fg-primary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
