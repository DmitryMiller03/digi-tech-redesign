import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateCategory } from "../../actions";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [category, otherCategories] = await Promise.all([
    prisma.category.findUnique({ where: { id } }),
    prisma.category.findMany({ where: { id: { not: id } }, orderBy: { name: "asc" } }),
  ]);

  if (!category) notFound();

  const updateWithId = updateCategory.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-slate-900">Изменить категорию</h1>

      <form action={updateWithId} className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700">Название</label>
          <input
            name="name"
            required
            defaultValue={category.name}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Slug</label>
          <input
            name="slug"
            defaultValue={category.slug}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Родительская категория</label>
          <select
            name="parentId"
            defaultValue={category.parentId ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="">— нет (категория верхнего уровня) —</option>
            {otherCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Описание</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={category.description ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={category.isPublished}
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
