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
  const [revealed, setRevealed] = useState(true);
  // On every page but the home one, the header always has its solid
  // background. On the home page it starts fully transparent over the
  // hero video (just the logo/nav floating) and only picks up the
  // background/blur once scrolled past the hero-intro threshold.
  const [solid, setSolid] = useState(!isHome);

  useEffect(() => {
    setRevealed(true);
    setSolid(!isHome);

    // Anchor is the scroll position where we last committed to a
    // direction. Requiring some net movement past it before flipping
    // again (instead of reacting to every single scroll tick) avoids a
    // flicker: without it, a single continuous downward scroll that
    // crosses the "always show near top" threshold would immediately
    // continue past it and re-hide the header a tick later, which
    // reads as a jarring flash rather than a smooth appearance.
    const HYSTERESIS = 24;
    let anchorY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      if (y <= 80) {
        setRevealed(true);
        anchorY = y;
      } else if (y - anchorY > HYSTERESIS) {
        setRevealed(false);
        setOpen(false);
        anchorY = y;
      } else if (anchorY - y > HYSTERESIS) {
        setRevealed(true);
        anchorY = y;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    // The header stays transparent for as long as the hero itself is on
    // screen — tied to the hero's actual height via IntersectionObserver
    // rather than a fixed pixel threshold, so it works the same on a
    // short laptop viewport and a tall desktop one. A sentinel at the
    // very bottom edge of the (h-screen) hero section stands in for
    // "has the visitor scrolled past the whole hero yet".
    if (!isHome) return;

    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) {
      setSolid(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setSolid(!entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isHome]);

  const navLinkClass = `text-sm font-medium transition-colors ${
    solid ? "text-fg-secondary hover:text-fg-primary" : "text-white/90 hover:text-white"
  }`;

  return (
    <header
      className={`${isHome ? "fixed inset-x-0" : "sticky"} top-0 z-50 border-b transition-all duration-[350ms] ease-in-out ${
        solid ? "border-line bg-bg-page/80 backdrop-blur-md" : "border-transparent"
      } ${revealed ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Digi Tech">
          <Logo animate />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <Link href="/catalog" className={navLinkClass}>
            Каталог
          </Link>
          <AudienceDropdown light={!solid} />
          {NAV_LINKS.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
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
            className={`grid h-9 w-9 place-items-center rounded-lg border transition-colors lg:hidden ${
              solid ? "border-line text-fg-primary" : "border-white/30 text-white"
            }`}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Always mounted (not `{open && ...}`) so the open/close transition
          can animate — a plain conditional render has nothing to animate
          between. grid-template-rows 0fr -> 1fr avoids the usual
          max-height-guess jank: the row's height tracks the content's
          real height throughout, not a hardcoded ceiling. */}
      <nav
        id="mobile-nav"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden border-t border-line bg-bg-page/95 backdrop-blur-md">
          <div
            className={`flex flex-col gap-1 px-4 py-4 transition-opacity duration-200 ${
              open ? "opacity-100 delay-100" : "opacity-0"
            }`}
          >
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
        </div>
      </nav>
    </header>
  );
}
