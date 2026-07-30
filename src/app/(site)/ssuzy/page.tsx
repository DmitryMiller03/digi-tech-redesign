import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ArrowRightIcon } from "@/components/icons";
import { ProcurementSupport } from "@/components/ProcurementSupport";

export const metadata: Metadata = {
  title: "Техникумам и колледжам — Digi Tech",
  description:
    "Виртуальные тренажёры и лабораторные комплексы для практической подготовки студентов СПО по ФГОС — без риска и затрат на физические стенды.",
};

const ADVANTAGES = [
  {
    title: "Соответствие ФГОС СПО",
    description: "Модули покрывают практические компетенции рабочих программ по вашим специальностям.",
  },
  {
    title: "Подготовка к демоэкзамену",
    description: "Студенты отрабатывают операции в безопасной среде перед допуском к реальному оборудованию.",
  },
  {
    title: "Групповые занятия",
    description: "Один комплект тренажёров позволяет вести практику сразу с целой группой.",
  },
  {
    title: "Прогресс по каждому студенту",
    description: "Преподаватель видит успеваемость и может скорректировать программу занятия.",
  },
];

const STEPS = [
  { title: "Колледж подключается", description: "Выбираете нужные модули по специальностям и добавляете студентов группами." },
  { title: "Студенты изучают", description: "В браузере или VR-шлеме исследуют 3D-модели, выполняют задания и проходят проверку знаний." },
  { title: "Преподаватель видит прогресс", description: "Дашборд показывает успеваемость по каждому студенту и группе, с отчётами." },
];

export default function SsuzyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <span className="label text-accent-2">Средне-специальные учебные заведения</span>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Практическая подготовка студентов техникумов и колледжей
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-secondary">
          Виртуальные тренажёры и лабораторные комплексы, которые дают студентам реальный опыт
          работы с оборудованием — без риска для здоровья и затрат на физические стенды.
        </p>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Для колледжа</h2>
        </Reveal>
        <StaggerGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((item) => (
            <div key={item.title} className="rounded-xl border border-line bg-bg-surface p-5">
              <h3 className="font-bold leading-snug">{item.title}</h3>
              <p className="mt-2 text-sm text-fg-secondary">{item.description}</p>
            </div>
          ))}
        </StaggerGroup>
      </div>

      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Три шага до первого урока</h2>
        </Reveal>
        <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title} className="rounded-xl border border-line bg-bg-page p-6 shadow-sm">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-extrabold text-transparent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-bold leading-snug">{step.title}</h3>
              <p className="mt-2 text-sm text-fg-secondary">{step.description}</p>
            </div>
          ))}
        </StaggerGroup>
      </div>

      <Reveal className="mt-16">
        <ProcurementSupport />
      </Reveal>

      <Reveal className="mt-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-8 text-center text-white sm:p-14">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          Готовы внедрить VR-обучение в вашем колледже?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Оставьте заявку — покажем демо-версию под ваши специальности в течение одного рабочего дня.
        </p>
        <MagneticButton className="mt-6">
          <Link
            href="/contacts"
            className="group inline-flex items-center gap-2 rounded-pill bg-white px-6 py-3.5 text-sm font-semibold text-primary"
          >
            Запросить демо
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </MagneticButton>
      </Reveal>
    </div>
  );
}
