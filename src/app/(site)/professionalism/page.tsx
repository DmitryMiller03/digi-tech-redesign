import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GradientCta } from "@/components/ui/GradientCta";

export const metadata: Metadata = {
  title: "Профессионалитет — Digi Tech",
  description: "Оборудование под кластеры федерального проекта «Профессионалитет».",
};

const STEPS = [
  { title: "Заявка кластера", description: "Присылаете список специальностей и требуемое оборудование." },
  { title: "Подбор модулей", description: "Собираем комплект тренажёров под ФГОС и запрос предприятия-партнёра." },
  { title: "Поставка и монтаж", description: "Доставляем оборудование и настраиваем программные комплексы." },
  { title: "Обучение преподавателей", description: "Проводим инструктаж по работе с тренажёрами и дашбордом." },
  { title: "Сопровождение", description: "Техподдержка и обновление контента на весь срок эксплуатации." },
];

export default function ProfessionalismPage() {
  return (
    <Container className="py-16">
      <Reveal>
        <span className="label text-accent-2">Федеральный проект</span>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Оборудование под кластеры ФП «Профессионалитет»
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-secondary">
          Комплектуем образовательно-производственные кластеры виртуальными тренажёрами и
          лабораторными комплексами под конкретные специальности и партнёров-работодателей.
        </p>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Пять шагов внедрения
          </h2>
        </Reveal>
        <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, index) => (
            <Card key={step.title} padding="sm" className="bg-bg-surface">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-extrabold text-transparent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-bold leading-snug">{step.title}</h3>
              <p className="mt-2 text-sm text-fg-secondary">{step.description}</p>
            </Card>
          ))}
        </StaggerGroup>
      </div>

      <Reveal className="mt-16">
        <GradientCta className="p-8 text-center sm:p-14">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Готовите заявку на кластер «Профессионалитет»?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Пришлём подборку тренажёров под ваши специальности и поможем с расчётом сметы.
          </p>
          <MagneticButton className="mt-6">
            <Button href="/contacts" variant="inverted" arrow>
              Обсудить кластер
            </Button>
          </MagneticButton>
        </GradientCta>
      </Reveal>
    </Container>
  );
}
