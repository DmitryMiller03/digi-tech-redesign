import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog-content";
import { CategoryIcon, FormatIcon, ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroVideo } from "@/components/home/HeroVideo";
import { PinnedStats } from "@/components/motion/PinnedStats";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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
  {
    icon: "lab",
    title: "Лабораторный стенд",
    description: "Имитирует реальные технические системы — студенты отрабатывают навыки, не рискуя дорогостоящим оборудованием.",
  },
  {
    icon: "teaching",
    title: "Учебный стенд",
    description: "Компактная модель оборудования: наглядно показывает устройство и принцип работы, от азов до сложных задач.",
  },
  {
    icon: "interactive",
    title: "Интерактивный стенд",
    description: "Сочетает физику с цифрой — система сама анализирует действия студента и указывает на ошибки.",
  },
  {
    icon: "workshop",
    title: "Мастерская",
    description: "Настоящие инструменты в обстановке, воссоздающей реальное рабочее место — навыки доводятся до автоматизма.",
  },
  {
    icon: "software",
    title: "Программный комплекс",
    description: "3D-среда, где можно смоделировать даже редкие и опасные производственные ситуации.",
  },
  {
    icon: "simulator",
    title: "Тренажёр-симулятор",
    description: "Органы управления, имитирующие рабочее место оператора спецтехники, — для отработки реальных сценариев.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroVideo />

      <section className="border-b border-line py-16">
        <Container>
          <PinnedStats
            className="flex flex-wrap justify-center gap-x-16 gap-y-6 text-center sm:justify-between sm:text-left"
            stats={[
              { value: 5000, suffix: "+", label: "студентов" },
              { value: 11, suffix: "", label: "направлений" },
              { value: 120, suffix: "+", label: "колледжей" },
            ]}
          />
        </Container>
      </section>

      <section id="how-it-works" className="border-t border-line bg-bg-surface/50 py-24">
        <Container>
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
              <Card key={step.number} padding="lg" className="shadow-sm">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold text-transparent">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-fg-secondary">{step.description}</p>
              </Card>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="py-24">
        <Container>
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
              <Card key={category.slug} as={Link} href={`/catalog/${category.slug}`} interactive>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                  <CategoryIcon icon={category.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold leading-snug">{category.name}</h3>
                <p className="mt-2 text-sm text-fg-secondary">{category.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Подробнее <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </Card>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="border-t border-line bg-bg-surface/50 py-24">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="label text-accent-2">Форматы</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Шесть форматов обучения
            </h2>
          </Reveal>

          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIRECTIONS.map((direction) => (
              <Card key={direction.title}>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                  <FormatIcon icon={direction.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold">{direction.title}</h3>
                <p className="mt-2 text-sm text-fg-secondary">{direction.description}</p>
              </Card>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="py-24">
        <Container size="5xl">
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
                <Button href="/contacts" variant="inverted" arrow className="shadow-md">
                  Запросить демо
                </Button>
              </MagneticButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
