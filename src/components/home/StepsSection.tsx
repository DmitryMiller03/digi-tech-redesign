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
    description: "В браузере или VR-шлеме исследуют 3D-модели, выполняют задания и проходят проверку знаний.",
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
      const numbers = gridRef.current?.querySelectorAll<HTMLElement>("[data-step-number]");
      if (!fill || !numbers?.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        { reduceMotion: "(prefers-reduced-motion: reduce)", desktop: "(min-width: 1024px)" },
        (context) => {
          const { reduceMotion, desktop } = context.conditions as { reduceMotion: boolean; desktop: boolean };

          if (!desktop || reduceMotion) {
            gsap.set(fill, { scaleX: 1 });
            gsap.set(numbers, { opacity: 1 });
            return;
          }

          gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(numbers, { opacity: 0.35 });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: gridRef.current, start: "top 75%", toggleActions: "play none none reverse" },
          });

          tl.to(fill, { scaleX: 1, duration: 1.2, ease: "power1.inOut" });
          numbers.forEach((el, i) => {
            tl.to(el, { opacity: 1, duration: 0.2 }, i / numbers.length);
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
            Внедрение занимает от одного рабочего дня. Никаких сложных установок — всё работает
            в браузере и VR-шлеме.
          </p>
        </Reveal>

        <div ref={gridRef} className="relative mt-14">
          {/* Connecting progress line — desktop only, sits behind the cards
              and is only visible in the gaps between them. Purely
              decorative, so it's not in the StaggerGroup's item selector. */}
          <div
            aria-hidden="true"
            className="absolute left-[16.5%] right-[16.5%] top-[52px] hidden h-px bg-line lg:block"
          >
            <div
              data-progress-fill
              className="h-full w-full bg-gradient-to-r from-primary to-accent"
            />
          </div>

          <StaggerGroup className="relative grid gap-6 sm:grid-cols-3">
            {STEPS.map((step) => (
              <Card key={step.number} padding="lg" className="shadow-sm">
                <span
                  data-step-number
                  className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold text-transparent"
                >
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-fg-secondary">{step.description}</p>
              </Card>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
