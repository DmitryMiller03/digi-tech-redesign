import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog-content";
import { CategoryIcon, ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroModulesCard } from "@/components/home/HeroModulesCard";
import { HeroTypewriter } from "@/components/home/HeroTypewriter";
import { PinnedStats } from "@/components/motion/PinnedStats";

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

const DIRECTIONS = [
  { title: "Лабораторные стенды", description: "Физические комплексы для практикума по электротехнике и химии." },
  { title: "Учебные стенды", description: "Наглядные модели устройства оборудования для аудиторных занятий." },
  { title: "Интерактивные стенды", description: "Сенсорные панели с 3D-моделями узлов и агрегатов." },
  { title: "Мастерские", description: "Комплекты для практических работ по столярному и слесарному делу." },
  { title: "Программные комплексы", description: "3D-атласы устройства оборудования для изучения в браузере." },
  { title: "VR-тренажёры", description: "Полное погружение в виртуальную среду с реалистичной физикой." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--line-strong) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:pt-24">
          <div>
            <Reveal>
              <span className="label inline-flex items-center gap-2 text-accent-2">
                <span className="h-px w-6 bg-current" />
                VR &amp; 3D · Профессиональное образование
              </span>
            </Reveal>

            <SplitHeadline
              as="h1"
              className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Цифровое обучение для технических специальностей
            </SplitHeadline>

            <Reveal delay={0.15}>
              <p className="mt-3 text-xl font-bold sm:text-2xl">
                Решения для <HeroTypewriter />
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg text-fg-secondary">
                Интерактивные 3D-сцены и VR-тренажёры для колледжей и техникумов. Студенты
                изучают устройство оборудования в виртуальном пространстве — без риска и
                затрат на физические стенды.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Link
                    href="/contacts"
                    className="group inline-flex items-center gap-2 rounded-pill bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md"
                  >
                    Запросить демо
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.25}>
                  <Link
                    href="/catalog"
                    className="rounded-pill border border-line-strong px-6 py-3.5 text-sm font-semibold text-fg-primary transition-colors hover:bg-bg-surface"
                  >
                    Смотреть каталог
                  </Link>
                </MagneticButton>
              </div>
            </Reveal>

            <PinnedStats
              className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8"
              stats={[
                { value: 5000, suffix: "+", label: "студентов" },
                { value: 11, suffix: "", label: "направлений" },
                { value: 120, suffix: "+", label: "колледжей" },
              ]}
            />
          </div>

          <Reveal delay={0.2} className="lg:justify-self-end">
            <HeroModulesCard />
          </Reveal>
        </div>
      </section>

      <section id="how-it-works" className="border-t border-line bg-bg-surface/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="label text-accent-2">Как это работает</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Три шага до первого урока
            </h2>
            <p className="mt-4 text-fg-secondary">
              Внедрение занимает от одного рабочего дня. Никаких сложных установок — всё
              работает в браузере и VR-шлеме.
            </p>
          </Reveal>

          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-line bg-bg-page p-7 shadow-sm"
              >
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold text-transparent">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-fg-secondary">{step.description}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="label text-accent-2">Каталог</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                11 направлений подготовки
              </h2>
            </div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Весь каталог
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>

          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/catalog/${category.slug}`}
                className="group rounded-xl border border-line bg-bg-page p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                  <CategoryIcon icon={category.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold leading-snug">{category.name}</h3>
                <p className="mt-2 text-sm text-fg-secondary">{category.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Подробнее <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-t border-line bg-bg-surface/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="label text-accent-2">Форматы</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Шесть форматов обучения
            </h2>
          </Reveal>

          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIRECTIONS.map((direction) => (
              <div key={direction.title} className="rounded-xl border border-line bg-bg-page p-6">
                <h3 className="font-bold">{direction.title}</h3>
                <p className="mt-2 text-sm text-fg-secondary">{direction.description}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent px-8 py-16 text-center shadow-lg sm:px-16">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Готовы внедрить VR-обучение в вашем колледже?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/90">
                Оставьте заявку — покажем демо-версию под ваши специальности в течение
                одного рабочего дня.
              </p>
              <MagneticButton className="mt-8">
                <Link
                  href="/contacts"
                  className="group inline-flex items-center gap-2 rounded-pill bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-md"
                >
                  Запросить демо
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
