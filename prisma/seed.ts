import "dotenv/config";
import { readFileSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { CATEGORIES } from "../src/lib/catalog-content";

type CatalogExtract = {
  categories: {
    name: string;
    products: {
      title: string;
      description: string;
      imageFile: string;
    }[];
  }[];
};

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "i", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .split("")
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** First sentence of a description paragraph, used as the card-level teaser. */
function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return (match?.[0] ?? text).trim();
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set to seed the first admin user.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log(`Seeded admin user: ${admin.email}`);
}

async function seedCategories() {
  for (const [index, category] of CATEGORIES.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.shortDescription,
        order: index,
      },
      create: {
        slug: category.slug,
        name: category.name,
        description: category.shortDescription,
        order: index,
      },
    });
  }

  console.log(`Seeded ${CATEGORIES.length} real catalog categories.`);
}

/**
 * Real product data extracted from the production trainer catalog PDF
 * (name, description, screenshot per item) — see scripts/catalog-extract.json.
 */
async function seedProducts() {
  const raw = readFileSync(join(__dirname, "..", "scripts", "catalog-extract.json"), "utf-8");
  const data = JSON.parse(raw) as CatalogExtract;

  let seeded = 0;
  for (const categoryData of data.categories) {
    const category = await prisma.category.findFirst({ where: { name: categoryData.name } });
    if (!category) {
      console.warn(`No matching category for "${categoryData.name}" — skipping ${categoryData.products.length} products.`);
      continue;
    }

    for (const [index, product] of categoryData.products.entries()) {
      const slug = slugify(product.title);
      const imagePath = `/${product.imageFile}`;

      await prisma.product.upsert({
        where: { slug },
        update: {
          name: product.title,
          shortDescription: firstSentence(product.description),
          description: product.description,
          images: [imagePath],
          categoryId: category.id,
          order: index,
        },
        create: {
          slug,
          name: product.title,
          shortDescription: firstSentence(product.description),
          description: product.description,
          images: [imagePath],
          categoryId: category.id,
          order: index,
        },
      });
      seeded += 1;
    }
  }

  console.log(`Seeded ${seeded} real products.`);
}

async function main() {
  await seedAdmin();
  await seedCategories();
  await seedProducts();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
