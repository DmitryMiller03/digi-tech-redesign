import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FORMATS, type FormatSection } from "@/lib/format-content";
import { FormatIcon, ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GradientCta } from "@/components/ui/GradientCta";

export function generateStaticParams() {
  return FORMATS.map((format) => ({ slug: format.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const format = FORMATS.find((f) => f.slug === slug);
  if (!format) return {};
  return {
    title: `${format.title} — форматы обучения Digi Tech`,
    description: format.summary,
  };
}

async function getTopCategories() {
  const categories = await prisma.category.findMany({
    where: { isPublished: true, parentId: null },
    include: { _count: { select: { products: { where: { isPublished: true } } } } },
  });
  return categories
    .map((c) => ({ slug: c.slug, name: c.name, count: c._count.products }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
}

function SectionList({ list }: { list: string[] }) {
  return (
    <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {list.map((item) => (
        <li key={item} className="flex items-start gap-2 text-fg-secondary">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function SectionBlock({ section }: { section: FormatSection }) {
  return (
    <Reveal className="mt-12 max-w-3xl">
      <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
      {section.paragraphs?.map((p) => (
        <p key={p} className="mt-4 text-fg-secondary">
          {p}
        </p>
      ))}
      {section.list && <SectionList list={section.list} />}
    </Reveal>
  );
}

export default async function FormatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const format = FORMATS.find((f) => f.slug === slug);
  if (!format) notFound();

  const [heroSection, ...restSections] = format.sections;
  const topCategories = await getTopCategories();

  return (
    <Container className="py-16">
      <nav className="text-sm text-fg-muted">
        <Link href="/#formats" className="hover:text-fg-primary">
          Форматы обучения
        </Link>
        <span className="mx-2">/</span>
        <span className="text-fg-secondary">{format.title}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[15rem_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {FORMATS.map((f) => {
              const active = f.slug === format.slug;
              return (
                <Link
                  key={f.slug}
                  href={`/formats/${f.slug}`}
                  className={`flex shrink-0 items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-fg-secondary hover:bg-bg-surface hover:text-fg-primary"
                  }`}
                >
                  {f.title}
                  <ArrowRightIcon className="h-3.5 w-3.5 shrink-0" />
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0">
          <Reveal>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{format.title}</h1>
            <p className="mt-3 max-w-2xl text-lg text-fg-secondary">{format.summary}</p>
          </Reveal>

          {heroSection && (
            <Reveal className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
                <FormatIcon icon={format.icon} className="h-20 w-20 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{heroSection.heading}</h2>
                {heroSection.paragraphs?.map((p) => (
                  <p key={p} className="mt-4 text-fg-secondary">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          )}
          {heroSection?.list && (
            <Reveal className="mt-8">
              <SectionList list={heroSection.list} />
            </Reveal>
          )}

          {restSections.map((section) => (
            <SectionBlock key={section.heading} section={section} />
          ))}

          <Reveal className="mt-16 rounded-2xl bg-bg-surface p-8 sm:p-10">
            <h2 className="text-xl font-bold">Каталог образовательных решений Digi Tech</h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
              <p className="max-w-md text-fg-secondary">
                В каталоге — готовые решения для технического образования по 11 направлениям
                подготовки, включая:
              </p>
              <ul className="space-y-2 text-sm">
                {topCategories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/catalog/${c.slug}`} className="font-semibold text-primary hover:underline">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Button href="/catalog" arrow className="mt-8">
              В каталог
            </Button>
          </Reveal>

          <section className="mt-16">
            <Reveal>
              <GradientCta className="px-8 py-14 text-center shadow-lg sm:px-16">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Хотите такой формат для своего колледжа?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/90">
                  Оставьте заявку — подберём модули под ваши специальности и покажем демо в
                  течение одного рабочего дня.
                </p>
                <Button href="/contacts" variant="inverted" emphasis="key" arrow className="mt-8 shadow-md">
                  Запросить демо
                </Button>
              </GradientCta>
            </Reveal>
          </section>
        </div>
      </div>
    </Container>
  );
}
