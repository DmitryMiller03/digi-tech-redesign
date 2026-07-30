import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ArrowRightIcon } from "@/components/icons";
import { ProcurementSupport } from "@/components/ProcurementSupport";

export const metadata: Metadata = {
  title: "Предприятиям — Digi Tech",
  description:
    "Тренажёры для обучения и переподготовки персонала — снижение риска травматизма и порчи оборудования при вводе новых сотрудников в должность.",
};

const ADVANTAGES = [
  {
    title: "Безопасный ввод в должность",
    description: "Новый сотрудник отрабатывает операции на тренажёре до допуска к реальному оборудованию.",
  },
  {
    title: "Снижение риска для техники",
    description: "Ошибки на этапе обучения не приводят к простою или порче дорогостоящего оборудования.",
  },
  {
    title: "Обучение по охране труда",
    description: "Отрабатываем аварийные и нештатные ситуации без реального риска для персонала.",
  },
  {
    title: "Партнёрство с колледжами",
    description: "Комплектуем учебные центры при дуальном обучении студентов-целевиков.",
  },
];

const STEPS = [
  { title: "Заявка предприятия", description: "Обсуждаем должности и оборудование, под которое нужно обучение." },
  { title: "Подбор модулей", description: "Предлагаем комплекс тренажёров под ваши производственные процессы." },
  { title: "Обучение сотрудников", description: "Персонал проходит практику в браузере или VR-шлеме под контролем наставника." },
  { title: "Отчётность", description: "HR и руководитель видят результаты обучения по каждому сотруднику." },
];

export default function PredpriyatiyaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <span className="label text-accent-2">Предприятия</span>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Обучение и переподготовка персонала без риска для оборудования
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-secondary">
          Тренажёры для корпоративных учебных центров: новые сотрудники отрабатывают операции в
          виртуальной среде до того, как встанут за реальный станок или пульт управления.
        </p>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Для предприятия</h2>
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
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Как проходит внедрение</h2>
        </Reveal>
        <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.title} className="rounded-xl border border-line bg-bg-page p-5 shadow-sm">
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
          Хотите обучать персонал без риска для оборудования?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Расскажем, какие тренажёры подойдут под ваши производственные процессы.
        </p>
        <MagneticButton className="mt-6">
          <Link
            href="/contacts"
            className="group inline-flex items-center gap-2 rounded-pill bg-white px-6 py-3.5 text-sm font-semibold text-primary"
          >
            Связаться с нами
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </MagneticButton>
      </Reveal>
    </div>
  );
}
