import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FORMATS } from "@/lib/format-content";
import { FormatIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { GradientCta } from "@/components/ui/GradientCta";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";

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

export default async function FormatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const format = FORMATS.find((f) => f.slug === slug);
  if (!format) notFound();

  const otherFormats = FORMATS.filter((f) => f.slug !== slug);

  return (
    <Container className="pb-24 pt-16 lg:py-16">
      <nav className="text-sm text-fg-muted">
        <Link href="/#formats" className="hover:text-fg-primary">
          Форматы обучения
        </Link>
        <span className="mx-2">/</span>
        <span className="text-fg-secondary">{format.title}</span>
      </nav>

      <Reveal className="mt-4 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
          <FormatIcon icon={format.icon} className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{format.title}</h1>
          <p className="mt-2 max-w-2xl text-fg-secondary">{format.summary}</p>
        </div>
      </Reveal>

      <div className="mt-12 space-y-12">
        {format.sections.map((section) => (
          <Reveal key={section.heading} className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p} className="mt-4 text-fg-secondary">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {section.list.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-fg-secondary">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </div>

      <section className="mt-16">
        <span className="label text-accent-2">Другие форматы</span>
        <StaggerGroup className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherFormats.map((other) => (
            <Card key={other.slug} as={Link} href={`/formats/${other.slug}`} interactive>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                <FormatIcon icon={other.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-bold">{other.title}</h3>
              <p className="mt-2 text-sm text-fg-secondary">{other.summary}</p>
            </Card>
          ))}
        </StaggerGroup>
      </section>

      <section className="mt-16">
        <Reveal>
          <GradientCta className="px-8 py-14 text-center shadow-lg sm:px-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Хотите такой формат для своего колледжа?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90">
              Оставьте заявку — подберём модули под ваши специальности и покажем демо в течение
              одного рабочего дня.
            </p>
            <MagneticButton className="mt-8">
              <Button href="/contacts" variant="inverted" arrow className="shadow-md">
                Запросить демо
              </Button>
            </MagneticButton>
          </GradientCta>
        </Reveal>
      </section>
    </Container>
  );
}
