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

export async function createCategory(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const parentId = String(formData.get("parentId") ?? "") || null;
  const description = String(formData.get("description") ?? "") || null;
  const slugInput = String(formData.get("slug") ?? "").trim();

  if (!name) throw new Error("Название обязательно");

  await prisma.category.create({
    data: {
      name,
      slug: slugify(slugInput || name),
      parentId,
      description,
    },
  });

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const parentId = String(formData.get("parentId") ?? "") || null;
  const description = String(formData.get("description") ?? "") || null;
  const slugInput = String(formData.get("slug") ?? "").trim();
  const isPublished = formData.get("isPublished") === "on";

  if (!name) throw new Error("Название обязательно");
  if (parentId === id) throw new Error("Категория не может быть родителем самой себе");

  await prisma.category.update({
    where: { id },
    data: {
      name,
      slug: slugify(slugInput || name),
      parentId,
      description,
      isPublished,
    },
  });

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}
