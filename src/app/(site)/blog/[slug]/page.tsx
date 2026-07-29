import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/motion/Reveal";

async function getPost(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug, isPublished: true } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Digi Tech`, description: post.excerpt ?? undefined };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-sm text-fg-muted">
        <Link href="/blog" className="hover:text-fg-primary">
          Блог
        </Link>
        <span className="mx-2">/</span>
        <span className="text-fg-secondary">{post.title}</span>
      </nav>

      <Reveal>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{post.title}</h1>
        {post.publishedAt && (
          <p className="mt-3 text-sm text-fg-muted">
            {new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(post.publishedAt)}
          </p>
        )}
      </Reveal>

      <Reveal delay={0.1}>
        <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-line leading-relaxed text-fg-secondary">
          {post.content}
        </div>
      </Reveal>
    </div>
  );
}
