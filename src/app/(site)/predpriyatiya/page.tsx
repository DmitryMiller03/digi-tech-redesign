import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ProcurementSupport } from "@/components/ProcurementSupport";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GradientCta } from "@/components/ui/GradientCta";

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
    <Container className="py-16">
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
            <Card key={item.title} padding="sm" className="bg-bg-surface">
              <h3 className="font-bold leading-snug">{item.title}</h3>
              <p className="mt-2 text-sm text-fg-secondary">{item.description}</p>
            </Card>
          ))}
        </StaggerGroup>
      </div>

      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Как проходит внедрение</h2>
        </Reveal>
        <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Card key={step.title} padding="sm" className="shadow-sm">
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
        <ProcurementSupport />
      </Reveal>

      <Reveal className="mt-16">
        <GradientCta className="p-8 text-center sm:p-14">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Хотите обучать персонал без риска для оборудования?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Расскажем, какие тренажёры подойдут под ваши производственные процессы.
          </p>
          <MagneticButton className="mt-6">
            <Button href="/contacts" variant="inverted" arrow>
              Связаться с нами
            </Button>
          </MagneticButton>
        </GradientCta>
      </Reveal>
    </Container>
  );
}
