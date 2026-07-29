"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createBlogPost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "") || null;
  const content = String(formData.get("content") ?? "");
  const coverImage = String(formData.get("coverImage") ?? "") || null;

  if (!title) throw new Error("Заголовок обязателен");

  await prisma.blogPost.create({
    data: {
      title,
      slug: slugify(slugInput || title),
      excerpt,
      content,
      coverImage,
    },
  });

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function togglePublish(id: string, publish: boolean) {
  await prisma.blogPost.update({
    where: { id },
    data: { isPublished: publish, publishedAt: publish ? new Date() : null },
  });
  revalidatePath("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
}
