"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

const STEPS = [
  {
    number: "01",
    title: "Колледж подключается",
    description: "Выбираете нужные модули по специальностям и добавляете студентов группами.",
  },
  {
    number: "02",
    title: "Студенты изучают",
    description: "Исследуют 3D-модели, выполняют задания и проходят проверку знаний.",
  },
  {
    number: "03",
    title: "Преподаватель видит прогресс",
    description: "Дашборд показывает успеваемость по каждому студенту и группе, с отчётами.",
  },
];

export function StepsSection() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const fill = gridRef.current?.querySelector<HTMLElement>("[data-progress-fill]");
      const dots = gridRef.current?.querySelectorAll<HTMLElement>("[data-step-dot]");
      if (!fill || !dots?.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        { reduceMotion: "(prefers-reduced-motion: reduce)", desktop: "(min-width: 1024px)" },
        (context) => {
          const { reduceMotion, desktop } = context.conditions as { reduceMotion: boolean; desktop: boolean };

          if (!desktop || reduceMotion) {
            gsap.set(fill, { scaleX: 1 });
            gsap.set(dots, { scale: 1, autoAlpha: 1 });
            return;
          }

          gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(dots, { scale: 0.4, autoAlpha: 0 });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: gridRef.current, start: "top 75%", toggleActions: "play none none reverse" },
          });

          tl.to(fill, { scaleX: 1, duration: 1.3, ease: "power1.inOut" });
          // Each dot "pops" — a springy overshoot as the fill line reaches
          // it — instead of a flat fade, so the line reads as physically
          // pushing each step into place rather than just a wipe.
          dots.forEach((el, i) => {
            tl.to(
              el,
              { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(3)" },
              i / dots.length,
            );
          });

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: gridRef },
  );

  return (
    <section id="how-it-works" className="border-t border-line bg-bg-surface/50 py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="label text-accent-2">Как это работает</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Три шага до первого урока
          </h2>
          <p className="mt-4 text-fg-secondary">
            Внедрение занимает от одного рабочего дня — никакой сложной установки, всё готово
            к работе сразу.
          </p>
        </Reveal>

        <div ref={gridRef} className="relative mt-20 lg:mt-16">
          {/* Connecting progress line — desktop only, threaded through the
              step dots rather than hidden behind the cards. */}
          <div
            aria-hidden="true"
            className="absolute left-[16.5%] right-[16.5%] top-0 hidden h-px bg-line lg:block"
          >
            <div
              data-progress-fill
              className="h-full w-full bg-gradient-to-r from-primary to-accent"
            />
          </div>

          <StaggerGroup className="relative grid gap-6 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.number} className="relative pt-6 lg:pt-0">
                {/* The number badge sits on the connecting line on desktop
                    (springs into place as the line reaches it) and simply
                    overlaps the card's top edge on mobile, where there's
                    no line to sit on. */}
                <div
                  data-step-dot
                  className="absolute left-1/2 top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-base font-extrabold text-white shadow-md lg:-top-6"
                >
                  {step.number}
                </div>
                <Card padding="lg" className="h-full pt-10 text-center shadow-sm lg:pt-8">
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-fg-secondary">{step.description}</p>
                </Card>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
