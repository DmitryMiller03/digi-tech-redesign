import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/catalog-content";
import { CategoryIcon, FormatIcon, ArrowRightIcon } from "@/components/icons";
import { FORMATS } from "@/lib/format-content";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroVideo } from "@/components/home/HeroVideo";
import { PinnedStats } from "@/components/motion/PinnedStats";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/motion/Marquee";
import { CardMarquee } from "@/components/motion/CardMarquee";
import { StepsSection } from "@/components/home/StepsSection";
import { GradientCta } from "@/components/ui/GradientCta";
import { ShowcaseSection, type ShowcaseItem } from "@/components/home/ShowcaseSection";

/** Categories with enough real trainers get a bigger, photo-backed tile
 * instead of the plain icon tile — the size difference tracks actual
 * catalog depth, not decoration. */
const FEATURED_MIN_PRODUCTS = 7;

/** Hand-picked so the three showcased screenshots read well together
 * (a real construction site, a wiring panel mid-task, a lathe close-up)
 * rather than three near-duplicate category thumbnails. */
const SHOWCASE_PRODUCT_SLUGS = [
  "opalubochnye-i-armaturnye-raboty",
  "elektromontazh",
  "obsluzhivanie-i-diagnostika-tokarnogo-stanka",
];

function accentWord(word: string) {
  return <span className="text-accent-2">{word}</span>;
}

const FORMATS_MARQUEE = [
  accentWord("VR-тренажёры"),
  "Учебные стенды",
  accentWord("3D-атласы"),
  "Симуляторы",
  accentWord("Лаборатории"),
  "Мастерские под ключ",
];

const INDUSTRIES_MARQUEE = [
  accentWord("Нефть и газ"),
  "Строительство",
  accentWord("Энергетика"),
  "Металлургия",
  accentWord("Машиностроение"),
  "Транспорт",
  accentWord("Сельское хозяйство"),
];

function FormatCard({ format }: { format: (typeof FORMATS)[number] }) {
  return (
    <Card as={Link} href={`/formats/${format.slug}`} interactive className="h-full">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
          <FormatIcon icon={format.icon} className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold">{format.title}</h3>
      </div>
      <p className="mt-3 text-sm text-fg-secondary">{format.teaser}</p>
    </Card>
  );
}

async function getShowcaseItems(): Promise<ShowcaseItem[]> {
  const products = await prisma.product.findMany({
    where: { slug: { in: SHOWCASE_PRODUCT_SLUGS }, isPublished: true },
    include: { category: { select: { slug: true, name: true } } },
  });
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  return SHOWCASE_PRODUCT_SLUGS.map((slug) => bySlug.get(slug))
    .filter((p): p is NonNullable<typeof p> => p != null && p.images.length > 0)
    .map((p) => ({
      categoryName: p.category.name,
      categorySlug: p.category.slug,
      productName: p.name,
      productSlug: p.slug,
      image: p.images[0],
    }));
}

async function getCategoryTiles() {
  const categories = await prisma.category.findMany({
    where: { isPublished: true, parentId: null },
    orderBy: { order: "asc" },
    include: {
      products: {
        where: { isPublished: true },
        orderBy: { order: "asc" },
        take: 1,
        select: { images: true },
      },
      _count: { select: { products: { where: { isPublished: true } } } },
    },
  });

  const iconBySlug = new Map(CATEGORIES.map((c) => [c.slug, c.icon]));

  const tiles = categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    description: category.description ?? "",
    icon: iconBySlug.get(category.slug) ?? "complex",
    productCount: category._count.products,
    coverImage: category.products[0]?.images[0] ?? null,
  }));

  // Exactly one 2x2 photo tile — the single deepest catalog by product
  // count — leads the grid, everything else is a plain tile. Letting
  // *every* category past FEATURED_MIN_PRODUCTS go big broke the grid the
  // moment two of them qualified: only the very first can actually get a
  // clean 2x2 slot, so the second one rendered squashed instead.
  let biggestIndex = -1;
  for (let i = 0; i < tiles.length; i++) {
    const candidate = tiles[i];
    if (candidate.productCount < FEATURED_MIN_PRODUCTS || !candidate.coverImage) continue;
    if (biggestIndex === -1 || candidate.productCount > tiles[biggestIndex].productCount) {
      biggestIndex = i;
    }
  }

  const featuredTiles = tiles.map((tile, i) => ({ ...tile, featured: i === biggestIndex }));
  if (biggestIndex <= 0) return featuredTiles;

  const [featured] = featuredTiles.splice(biggestIndex, 1);
  return [featured, ...featuredTiles];
}

export default async function HomePage() {
  const [showcaseItems, categoryTiles] = await Promise.all([getShowcaseItems(), getCategoryTiles()]);

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

      <section className="border-b border-line py-20">
        <Container>
          <PinnedStats
            className="grid grid-cols-1 divide-y divide-line text-center sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            stats={[
              { value: 5000, suffix: "+", label: "студентов" },
              { value: 11, suffix: "", label: "направлений" },
              { value: 120, suffix: "+", label: "колледжей" },
            ]}
          />
        </Container>
      </section>

      <StepsSection />

      <ShowcaseSection items={showcaseItems} />

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
            {categoryTiles.map((category) =>
              category.featured && category.coverImage ? (
                <Card
                  key={category.slug}
                  as={Link}
                  href={`/catalog/${category.slug}`}
                  interactive
                  padding="none"
                  className="relative isolate overflow-hidden sm:col-span-2 lg:col-span-2 lg:row-span-2"
                >
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full">
                    <Image
                      src={category.coverImage}
                      alt={category.name}
                      fill
                      sizes="(min-width: 1024px) 62vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
                        {category.productCount} тренажёров
                      </span>
                      <h3 className="mt-1 text-xl font-bold text-white">{category.name}</h3>
                      <p className="mt-2 max-w-md text-sm text-white/80">{category.description}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                        Подробнее <ArrowRightIcon className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card key={category.slug} as={Link} href={`/catalog/${category.slug}`} interactive>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                      <CategoryIcon icon={category.icon} className="h-6 w-6" />
                    </div>
                    {category.productCount === 0 ? (
                      <span className="rounded-pill bg-bg-surface px-2.5 py-1 text-xs font-semibold text-fg-muted">
                        Скоро
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-fg-muted">
                        {category.productCount} тренажёров
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-bold leading-snug">{category.name}</h3>
                  <p className="mt-2 text-sm text-fg-secondary">{category.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Подробнее <ArrowRightIcon className="h-3.5 w-3.5" />
                  </span>
                </Card>
              ),
            )}
          </StaggerGroup>
        </Container>
      </section>

      <section id="formats" className="border-t border-line bg-bg-surface/50 py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <span className="label text-accent-2">Форматы обучения</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Один тренажёр —{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                шесть форматов
              </span>{" "}
              поставки
            </h2>
            <p className="mt-4 text-fg-secondary">
              От компактного лабораторного стенда до VR-тренажёра — подбираем формат под бюджет
              и площадку колледжа.
            </p>
          </Reveal>
        </Container>

        {/* One continuous two-line scroll: industry keywords on top moving
            right, format cards below moving left — opposing directions read
            as two distinct, intentional lines rather than one drifting
            block. Hovering a format card pauses just that row so it can be
            clicked through; the industries line is decorative and keeps
            going. Extra top padding + overflow-x-only clipping on the card
            row (see CardMarquee) so a card's hover lift doesn't get sheared
            off by the row above. */}
        <div className="mt-10 space-y-8">
          <div className="flex h-20 items-center overflow-hidden border-y border-line md:h-28">
            <Marquee
              items={INDUSTRIES_MARQUEE}
              direction="right"
              speedSeconds={52}
              decorative
              pauseOnHover={false}
            />
          </div>
          <div
            className="pt-2"
            style={{
              maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
            }}
          >
            <CardMarquee ariaLabel="Форматы обучения" direction="left" speedSeconds={52}>
              {FORMATS.map((format) => (
                <FormatCard key={format.slug} format={format} />
              ))}
            </CardMarquee>
          </div>
        </div>
      </section>

      <section className="py-24">
        <Container size="5xl">
          <Reveal>
            <GradientCta className="px-8 py-16 text-center shadow-lg sm:px-16">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Готовы внедрить VR-обучение в вашем колледже?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/90">
                Оставьте заявку — покажем демо-версию под ваши специальности в течение
                одного рабочего дня.
              </p>
              <MagneticButton className="mt-8">
                <Button href="/contacts" variant="inverted" emphasis="key" arrow className="shadow-md">
                  Запросить демо
                </Button>
              </MagneticButton>
            </GradientCta>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
