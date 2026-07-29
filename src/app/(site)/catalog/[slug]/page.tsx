import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CategoryIcon, ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { CATEGORIES } from "@/lib/catalog-content";

async function getCategory(slug: string) {
  return prisma.category.findUnique({
    where: { slug, isPublished: true },
    include: {
      products: { where: { isPublished: true }, orderBy: { order: "asc" } },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name} — каталог Digi Tech`,
    description: category.description ?? undefined,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const icon = CATEGORIES.find((c) => c.slug === slug)?.icon ?? "complex";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-sm text-fg-muted">
        <Link href="/catalog" className="hover:text-fg-primary">
          Каталог
        </Link>
        <span className="mx-2">/</span>
        <span className="text-fg-secondary">{category.name}</span>
      </nav>

      <Reveal className="mt-4 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
          <CategoryIcon icon={icon} className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{category.name}</h1>
          <p className="mt-2 max-w-2xl text-fg-secondary">{category.description}</p>
        </div>
      </Reveal>

      {category.products.length > 0 ? (
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {category.products.map((product) => (
            <Link
              key={product.id}
              href={`/catalog/${category.slug}/${product.slug}`}
              className="group rounded-xl border border-line bg-bg-page p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-lg"
            >
              <h2 className="font-bold leading-snug">{product.name}</h2>
              {product.shortDescription && (
                <p className="mt-2 text-sm text-fg-secondary">{product.shortDescription}</p>
              )}
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Подробнее <ArrowRightIcon className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </StaggerGroup>
      ) : (
        <Reveal className="mt-12 rounded-xl border border-dashed border-line-strong bg-bg-surface p-10 text-center text-fg-secondary">
          Тренажёры этого направления скоро появятся в каталоге. Оставьте заявку — пришлём
          презентацию по доступным сейчас модулям.
          <div className="mt-4">
            <Link href="/contacts" className="font-semibold text-primary hover:underline">
              Связаться с нами →
            </Link>
          </div>
        </Reveal>
      )}
    </div>
  );
}
