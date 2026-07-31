import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProductImagePlaceholder } from "@/components/ui/ProductImagePlaceholder";
import { GradientCta } from "@/components/ui/GradientCta";
import { StickyMobileCta } from "@/components/ui/StickyMobileCta";
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
    <>
    <Container size="5xl" className="pb-24 pt-16 lg:py-16">
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
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl border border-line">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <ProductImagePlaceholder className="absolute inset-0" />
          )}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <div className="space-y-8 md:col-span-2">
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
            <Reveal>
              <Card className="bg-bg-surface">
                <h2 className="label mb-4 text-accent-2">Характеристики</h2>
                <dl className="space-y-3 text-sm">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-4 border-b border-line pb-2">
                      <dt className="text-fg-muted">{key}</dt>
                      <dd className="text-right font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </Reveal>
          )}

          <Reveal>
            <GradientCta className="p-6">
              <h2 className="font-bold">Хотите демо этого тренажёра?</h2>
              <p className="mt-2 text-sm text-white/90">
                Покажем в формате видеозвонка и ответим на вопросы по внедрению.
              </p>
              <MagneticButton className="mt-4">
                <Button href="/contacts" variant="inverted" arrow>
                  Оставить заявку
                </Button>
              </MagneticButton>
            </GradientCta>
          </Reveal>
        </div>
      </div>
    </Container>
    <StickyMobileCta label="Оставить заявку на демо" />
    </>
  );
}
