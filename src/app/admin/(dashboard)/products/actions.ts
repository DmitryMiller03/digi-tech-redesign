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

/** Parses "Key: Value" lines (one per line) into a plain object. */
function parseSpecs(raw: string): Record<string, string> | undefined {
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 0) return undefined;

  const specs: Record<string, string> = {};
  for (const line of lines) {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) continue;
    specs[key.trim()] = rest.join(":").trim();
  }
  return specs;
}

function parseImages(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readProductFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    categoryId: String(formData.get("categoryId") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? "") || null,
    description: String(formData.get("description") ?? "") || null,
    images: parseImages(String(formData.get("images") ?? "")),
    specs: parseSpecs(String(formData.get("specs") ?? "")),
  };
}

export async function createProduct(formData: FormData) {
  const fields = readProductFields(formData);
  if (!fields.name) throw new Error("Название обязательно");
  if (!fields.categoryId) throw new Error("Категория обязательна");

  await prisma.product.create({
    data: {
      name: fields.name,
      slug: slugify(fields.slug || fields.name),
      categoryId: fields.categoryId,
      shortDescription: fields.shortDescription,
      description: fields.description,
      images: fields.images,
      specs: fields.specs,
    },
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const fields = readProductFields(formData);
  const isPublished = formData.get("isPublished") === "on";
  if (!fields.name) throw new Error("Название обязательно");
  if (!fields.categoryId) throw new Error("Категория обязательна");

  await prisma.product.update({
    where: { id },
    data: {
      name: fields.name,
      slug: slugify(fields.slug || fields.name),
      categoryId: fields.categoryId,
      shortDescription: fields.shortDescription,
      description: fields.description,
      images: fields.images,
      specs: fields.specs,
      isPublished,
    },
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}
