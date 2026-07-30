import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ArrowRightIcon } from "@/components/icons";
import { ProcurementSupport } from "@/components/ProcurementSupport";

export const metadata: Metadata = {
  title: "Высшим учебным заведениям — Digi Tech",
  description:
    "VR-лаборатории и 3D-тренажёры для инженерных и технических кафедр вузов — интеграция в существующие курсы и совместная разработка с преподавателями.",
};

const ADVANTAGES = [
  {
    title: "Интеграция в учебный план",
    description: "Модули встраиваются в существующие курсы кафедры без пересмотра рабочих программ.",
  },
  {
    title: "Совместная разработка",
    description: "Дорабатываем сценарии тренажёров вместе с преподавателями под конкретную дисциплину.",
  },
  {
    title: "Поддержка курсовых и ВКР",
    description: "Студенты используют комплексы для исследовательских и проектных работ.",
  },
  {
    title: "Инженерная точность",
    description: "Физика и параметры процессов в тренажёрах соответствуют реальным промышленным режимам.",
  },
];

const STEPS = [
  { title: "Заявка кафедры", description: "Обсуждаем дисциплины и специальности, под которые нужны модули." },
  { title: "Подбор и доработка", description: "Предлагаем комплекс из каталога или дорабатываем сценарий под курс." },
  { title: "Пилотное занятие", description: "Проводим демо-занятие со студентами и преподавателем." },
  { title: "Внедрение", description: "Поставляем лицензии, обучаем преподавателей работе с дашбордом." },
];

export default function VuzyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <span className="label text-accent-2">Высшие учебные заведения</span>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          VR-лаборатории для инженерных и технических кафедр
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-secondary">
          Интерактивные 3D-модели и VR-тренажёры для курсов, где нужно показать устройство и
          принцип работы сложного промышленного оборудования — без доступа к реальному цеху.
        </p>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Для кафедры</h2>
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
          Хотите обсудить модуль для своей кафедры?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Пришлём подборку тренажёров под вашу специальность и предложим формат пилотного занятия.
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
