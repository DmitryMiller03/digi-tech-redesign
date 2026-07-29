import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ArrowRightIcon } from "@/components/icons";

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
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
            <div key={step.title} className="rounded-xl border border-line bg-bg-surface p-5">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-extrabold text-transparent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-bold leading-snug">{step.title}</h3>
              <p className="mt-2 text-sm text-fg-secondary">{step.description}</p>
            </div>
          ))}
        </StaggerGroup>
      </div>

      <Reveal className="mt-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-8 text-center text-white sm:p-14">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          Готовите заявку на кластер «Профессионалитет»?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Пришлём подборку тренажёров под ваши специальности и поможем с расчётом сметы.
        </p>
        <MagneticButton className="mt-6">
          <Link
            href="/contacts"
            className="group inline-flex items-center gap-2 rounded-pill bg-white px-6 py-3.5 text-sm font-semibold text-primary"
          >
            Обсудить кластер
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </MagneticButton>
      </Reveal>
    </div>
  );
}
