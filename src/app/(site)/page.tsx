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
import { Marquee } from "@/components/motion/Marquee";
import { StepsSection } from "@/components/home/StepsSection";

function gradientWord(word: string) {
  return <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{word}</span>;
}

function outlineWord(word: string) {
  return <span className="marquee-item-outline">{word}</span>;
}

const FORMATS_MARQUEE = [
  gradientWord("VR-тренажёры"),
  "Учебные стенды",
  outlineWord("3D-атласы"),
  "Симуляторы",
  gradientWord("Лаборатории"),
  "Мастерские под ключ",
];

const INDUSTRIES_MARQUEE = [
  "Нефть и газ",
  "Строительство",
  "Энергетика",
  "Металлургия",
  "Машиностроение",
  "Транспорт",
  "Сельское хозяйство",
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

      <div className="flex h-[72px] items-center border-y border-line bg-bg-surface md:h-24">
        <Marquee
          items={FORMATS_MARQUEE}
          direction="left"
          speedSeconds={34}
          ariaLabel="Форматы обучения: VR-тренажёры, учебные стенды, 3D-атласы, симуляторы, лаборатории, мастерские под ключ"
        />
      </div>

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

      <StepsSection />

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

      <div className="flex h-16 items-center overflow-hidden border-y border-line md:h-20">
        <Marquee
          items={INDUSTRIES_MARQUEE}
          direction="right"
          speedSeconds={52}
          variant="outline"
          decorative
          pauseOnHover={false}
        />
      </div>

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
