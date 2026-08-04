import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { ArrowRightIcon } from "@/components/icons";

export type ShowcaseItem = {
  categoryName: string;
  categorySlug: string;
  productName: string;
  productSlug: string;
  image: string;
};

/**
 * Real product screenshots, not icons — the "Три шага"/каталог sections
 * above and below this one describe the product; this one shows it. The
 * first item runs 2x2 (bigger, since it's the visitor's first close look
 * at an actual trainer), the rest are single tiles.
 */
export function ShowcaseSection({ items }: { items: ShowcaseItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-line py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="label text-accent-2">Как это выглядит</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Не иллюстрация — интерфейс реального тренажёра
          </h2>
          <p className="mt-4 text-fg-secondary">
            Каждый модуль — интерактивная VR- или 3D-сцена с пошаговыми сценариями,
            подсказками и проверкой правильности действий, а не статичная 3D-модель.
          </p>
        </Reveal>

        {/* A/B/C test, one hover treatment per card — pick a winner and
            we'll make it the one true style everywhere: 0 = current
            scan-line sweep, 1 = plain zoom only (no overlay), 2 = soft
            radial glow fade-in. */}
        <StaggerGroup className="mt-10 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {items.map((item, i) => (
            <Link
              key={item.productSlug}
              href={`/catalog/${item.categorySlug}/${item.productSlug}`}
              className={`group relative isolate aspect-[4/3] overflow-hidden rounded-2xl border border-line ${
                i === 0 ? "lg:col-span-2 lg:row-span-2 lg:aspect-auto" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.productName}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 62vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              {i === 0 && <span className="scan-line" aria-hidden="true" />}
              {i === 2 && <span className="card-glow" aria-hidden="true" />}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
                  {item.categoryName}
                </span>
                <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">{item.productName}</h3>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-white/90 opacity-0 transition-opacity group-hover:opacity-100">
                  Смотреть тренажёр <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
