import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "../../actions";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  const specsText = product.specs
    ? Object.entries(product.specs as Record<string, string>)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")
    : "";

  const updateWithId = updateProduct.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">Изменить товар</h1>

      <form action={updateWithId} className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700">Название</label>
          <input
            name="name"
            required
            defaultValue={product.name}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Slug</label>
          <input
            name="slug"
            defaultValue={product.slug}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Категория</label>
          <select
            name="categoryId"
            required
            defaultValue={product.categoryId}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Краткое описание</label>
          <input
            name="shortDescription"
            defaultValue={product.shortDescription ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Полное описание</label>
          <textarea
            name="description"
            rows={5}
            defaultValue={product.description ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Изображения</label>
          <div className="mt-1">
            <ImageUploader name="images" defaultUrls={product.images} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Характеристики <span className="text-slate-400">(формат «Название: значение»)</span>
          </label>
          <textarea
            name="specs"
            rows={4}
            defaultValue={specsText}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Комплектация <span className="text-slate-400">(что входит в поставку, по одному пункту на строку)</span>
          </label>
          <textarea
            name="kitContents"
            rows={3}
            defaultValue={product.kitContents.join("\n")}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Цена, ₽ <span className="text-slate-400">(оставьте пустым для «цена по запросу»)</span>
          </label>
          <input
            name="price"
            type="number"
            min={0}
            defaultValue={product.price ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Группа вариантов <span className="text-slate-400">(ID)</span>
            </label>
            <input
              name="variantGroupId"
              defaultValue={product.variantGroupId ?? ""}
              placeholder="напр. tokarny-stanok"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Название варианта</label>
            <input
              name="variantLabel"
              defaultValue={product.variantLabel ?? ""}
              placeholder="Версия ПК / Версия VR"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={product.isPublished}
            className="rounded border-slate-300"
          />
          Показывать на сайте
        </label>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}
