import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCategory } from "./actions";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ parentId: "asc" }, { order: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: true, children: true } } },
  });

  const topLevel = categories.filter((c) => !c.parentId);
  const childrenByParent = new Map<string, typeof categories>();
  for (const c of categories) {
    if (!c.parentId) continue;
    const list = childrenByParent.get(c.parentId) ?? [];
    list.push(c);
    childrenByParent.set(c.parentId, list);
  }

  function renderRow(category: (typeof categories)[number], depth: number) {
    const children = childrenByParent.get(category.id) ?? [];
    return (
      <div key={category.id}>
        <div
          className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-slate-50"
          style={{ paddingLeft: `${12 + depth * 24}px` }}
        >
          <div>
            <span className="font-medium text-slate-900">{category.name}</span>
            <span className="ml-2 text-xs text-slate-400">/{category.slug}</span>
            {!category.isPublished && (
              <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">
                скрыта
              </span>
            )}
            <span className="ml-2 text-xs text-slate-400">
              {category._count.products} товаров · {category._count.children} подкатегорий
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/categories/${category.id}/edit`}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Изменить
            </Link>
            <form action={deleteCategory.bind(null, category.id)}>
              <button type="submit" className="text-sm font-medium text-red-500 hover:underline">
                Удалить
              </button>
            </form>
          </div>
        </div>
        {children.map((child) => renderRow(child, depth + 1))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Категории</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Новая категория
        </Link>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-2 shadow-sm">
        {topLevel.length === 0 && (
          <p className="px-3 py-6 text-sm text-slate-500">Пока нет ни одной категории.</p>
        )}
        {topLevel.map((category) => renderRow(category, 0))}
      </div>
    </div>
  );
}
