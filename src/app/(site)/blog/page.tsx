import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Блог — Digi Tech",
  description: "Новости и статьи о виртуальных тренажёрах и цифровом образовании.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <Container className="py-16">
      <Reveal>
        <span className="label text-accent-2">Блог</span>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Новости и статьи
        </h1>
      </Reveal>

      {posts.length > 0 ? (
        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} as={Link} href={`/blog/${post.slug}`} interactive>
              <h2 className="font-bold leading-snug">{post.title}</h2>
              {post.excerpt && <p className="mt-2 text-sm text-fg-secondary">{post.excerpt}</p>}
              {post.publishedAt && (
                <p className="mt-4 text-xs text-fg-muted">
                  {new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(post.publishedAt)}
                </p>
              )}
            </Card>
          ))}
        </StaggerGroup>
      ) : (
        <Reveal className="mt-12 rounded-xl border border-dashed border-line-strong bg-bg-surface p-10 text-center text-fg-secondary">
          Первые статьи скоро появятся здесь.
        </Reveal>
      )}
    </Container>
  );
}
