"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { CategoryIcon } from "@/components/icons";

const MODULES = [
  { name: "Электроэнергетика", icon: "electric", progress: 72, status: "В процессе" },
  { name: "Нефтегазовая переработка", icon: "oil", progress: 100, status: "Завершено" },
  { name: "Машиностроение", icon: "machinery", progress: 45, status: "В процессе" },
  { name: "Автотренажёры", icon: "vehicle", progress: 0, status: "Не начато" },
] as const;

const STATUS_STYLE: Record<string, string> = {
  "В процессе": "bg-primary/10 text-primary",
  Завершено: "bg-accent/15 text-accent-2",
  "Не начато": "bg-fg-muted/10 text-fg-muted",
};

export function HeroModulesCard() {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const xTo = gsap.quickTo(ref.current, "x", { duration: 0.8, ease: "power3.out" });
      const yTo = gsap.quickTo(ref.current, "y", { duration: 0.8, ease: "power3.out" });
      const rotateTo = gsap.quickTo(ref.current, "rotate", { duration: 0.8, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const relX = e.clientX / window.innerWidth - 0.5;
        const relY = e.clientY / window.innerHeight - 0.5;
        xTo(relX * 16);
        yTo(relY * 16);
        rotateTo(relX * -1.5);
      };

      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="w-full max-w-md overflow-hidden rounded-2xl border border-line bg-bg-page shadow-lg will-change-transform"
    >
      <div className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent px-5 py-4 text-white">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-xs font-black">
          D
        </span>
        <span className="text-sm font-semibold">Digi Tech · Учебные модули</span>
      </div>

      <div className="space-y-4 p-5">
        {MODULES.map((module) => (
          <div key={module.name} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-surface text-primary">
              <CategoryIcon icon={module.icon} className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-semibold">{module.name}</span>
                <span
                  className={`shrink-0 rounded-pill px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[module.status]}`}
                >
                  {module.status}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-pill bg-bg-surface">
                <div
                  className="h-full rounded-pill bg-gradient-to-r from-primary to-accent"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
