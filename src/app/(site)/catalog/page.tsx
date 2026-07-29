import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CategoryIcon, ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { CATEGORIES } from "@/lib/catalog-content";

export const metadata: Metadata = {
  title: "Каталог виртуальных тренажёров — Digi Tech",
  description: "11 направлений подготовки: от нефтегазовой переработки до автотренажёров.",
};

export default async function CatalogPage() {
  const categories = await prisma.category.findMany({
    where: { isPublished: true, parentId: null },
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  });

  const iconBySlug = new Map(CATEGORIES.map((c) => [c.slug, c.icon]));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <span className="label text-accent-2">Каталог</span>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Виртуальные тренажёры по 11 направлениям
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-fg-secondary">
          Программные комплексы, VR-тренажёры и лабораторные работы для техникумов и
          колледжей — сгруппированы по отраслям подготовки.
        </p>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/catalog/${category.slug}`}
            className="group rounded-xl border border-line bg-bg-page p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
              <CategoryIcon icon={iconBySlug.get(category.slug) ?? "complex"} className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-bold leading-snug">{category.name}</h2>
            <p className="mt-2 text-sm text-fg-secondary">{category.description}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-fg-muted">{category._count.products} тренажёров</span>
              <span className="inline-flex items-center gap-1 font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Подробнее <ArrowRightIcon className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </StaggerGroup>
    </div>
  );
}
