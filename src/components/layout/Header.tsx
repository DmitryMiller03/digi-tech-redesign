"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { AudienceDropdown } from "@/components/layout/AudienceDropdown";

const NAV_LINKS = [
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "О компании" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
];

const AUDIENCE_LINKS_MOBILE = [
  { href: "/vuzy", label: "Высшие учебные заведения" },
  { href: "/ssuzy", label: "Средне-специальные учебные заведения" },
  { href: "/predpriyatiya", label: "Предприятия" },
  { href: "/professionalism", label: "Профессионалитет" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [revealed, setRevealed] = useState(!isHome);

  useEffect(() => {
    setRevealed(!isHome);
    // On the home page the header starts hidden over the hero video and
    // only appears once the visitor scrolls past the intro threshold;
    // every other page skips straight to the direction-aware behavior
    // below (hide on scroll down, show on scroll up or near the top).
    let introDone = !isHome;
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      if (!introDone) {
        if (y > 40) {
          introDone = true;
          setRevealed(true);
        }
        lastY = y;
        return;
      }

      if (y <= 80 || y < lastY) {
        setRevealed(true);
      } else if (y > lastY) {
        setRevealed(false);
        setOpen(false);
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={`${isHome ? "fixed inset-x-0" : "sticky"} top-0 z-50 border-b border-line bg-bg-page/80 backdrop-blur-md transition-all duration-300 ease-out ${
        revealed ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Digi Tech">
          <Logo animate />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <Link
            href="/catalog"
            className="text-sm font-medium text-fg-secondary transition-colors hover:text-fg-primary"
          >
            Каталог
          </Link>
          <AudienceDropdown />
          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-fg-secondary transition-colors hover:text-fg-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contacts"
            className="hidden rounded-pill bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] lg:block"
          >
            Оставить заявку
          </Link>
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/catalog"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-fg-secondary hover:bg-bg-surface hover:text-fg-primary"
            >
              Каталог
            </Link>

            <div className="label mt-2 px-3 text-accent-2">Клиентам</div>
            {AUDIENCE_LINKS_MOBILE.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-fg-secondary hover:bg-bg-surface hover:text-fg-primary"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 border-t border-line pt-2" />
            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-fg-secondary hover:bg-bg-surface hover:text-fg-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacts"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-pill bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Оставить заявку
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
