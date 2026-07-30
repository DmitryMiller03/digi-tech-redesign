import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ArrowRightIcon } from "@/components/icons";
import { AddToCartButton } from "./AddToCartButton";
import { VariantTabs } from "./VariantTabs";

async function getProduct(categorySlug: string, productSlug: string) {
  const product = await prisma.product.findUnique({
    where: { slug: productSlug, isPublished: true },
    include: { category: true },
  });
  if (!product || product.category.slug !== categorySlug) return null;
  return product;
}

async function getVariants(variantGroupId: string | null) {
  if (!variantGroupId) return [];
  return prisma.product.findMany({
    where: { variantGroupId, isPublished: true },
    select: { slug: true, variantLabel: true, order: true },
    orderBy: { order: "asc" },
  });
}

function formatPrice(price: number) {
  return `${price.toLocaleString("ru-RU")} ₽`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}): Promise<Metadata> {
  const { slug, productSlug } = await params;
  const product = await getProduct(slug, productSlug);
  if (!product) return {};
  return {
    title: `${product.name} — Digi Tech`,
    description: product.shortDescription ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}) {
  const { slug, productSlug } = await params;
  const product = await getProduct(slug, productSlug);
  if (!product) notFound();

  const [specs, variants] = [
    (product.specs as Record<string, string> | null) ?? null,
    await getVariants(product.variantGroupId),
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-sm text-fg-muted">
        <Link href="/catalog" className="hover:text-fg-primary">
          Каталог
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/catalog/${product.category.slug}`} className="hover:text-fg-primary">
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-fg-secondary">{product.name}</span>
      </nav>

      <Reveal className="mt-4">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{product.name}</h1>
        {product.shortDescription && (
          <p className="mt-3 max-w-2xl text-lg text-fg-secondary">{product.shortDescription}</p>
        )}
      </Reveal>

      {variants.length > 1 && (
        <Reveal className="mt-6">
          <VariantTabs categorySlug={product.category.slug} activeSlug={product.slug} variants={variants} />
        </Reveal>
      )}

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-line py-4">
          <span className="text-xl font-bold">
            {product.price !== null ? formatPrice(product.price) : "Цена по запросу"}
          </span>
          <AddToCartButton
            productId={product.id}
            slug={product.slug}
            categorySlug={product.category.slug}
            name={product.name}
            price={product.price}
          />
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {product.description && (
            <Reveal>
              <div className="whitespace-pre-line leading-relaxed text-fg-secondary">
                {product.description}
              </div>
            </Reveal>
          )}

          {product.kitContents.length > 0 && (
            <Reveal>
              <h2 className="text-lg font-bold">Комплектация</h2>
              <ul className="mt-3 space-y-2 text-fg-secondary">
                {product.kitContents.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <div className="space-y-6">
          {specs && Object.keys(specs).length > 0 && (
            <Reveal className="rounded-xl border border-line bg-bg-surface p-6">
              <h2 className="label mb-4 text-accent-2">Характеристики</h2>
              <dl className="space-y-3 text-sm">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 border-b border-line pb-2">
                    <dt className="text-fg-muted">{key}</dt>
                    <dd className="text-right font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}

          <Reveal>
            <div className="rounded-xl bg-gradient-to-br from-primary to-accent p-6 text-white">
              <h2 className="font-bold">Хотите демо этого тренажёра?</h2>
              <p className="mt-2 text-sm text-white/90">
                Покажем в формате видеозвонка и ответим на вопросы по внедрению.
              </p>
              <MagneticButton className="mt-4">
                <Link
                  href="/contacts"
                  className="group inline-flex items-center gap-2 rounded-pill bg-white px-5 py-3 text-sm font-semibold text-primary"
                >
                  Оставить заявку
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
