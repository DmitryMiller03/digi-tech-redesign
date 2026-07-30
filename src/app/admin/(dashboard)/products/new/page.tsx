import { prisma } from "@/lib/prisma";
import { createProduct } from "../actions";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">Новый товар</h1>

      <form action={createProduct} className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700">Название</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Slug <span className="text-slate-400">(необязательно)</span>
          </label>
          <input
            name="slug"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Категория</label>
          <select
            name="categoryId"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="">— выберите —</option>
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
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Полное описание</label>
          <textarea
            name="description"
            rows={5}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Изображения <span className="text-slate-400">(по одной ссылке на строку)</span>
          </label>
          <textarea
            name="images"
            rows={3}
            placeholder="/uploads/product-1.jpg"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Характеристики <span className="text-slate-400">(формат «Название: значение», по одной на строку)</span>
          </label>
          <textarea
            name="specs"
            rows={4}
            placeholder={"Мощность: 5 кВт\nГабариты: 1200x800x900 мм"}
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
            placeholder={"Программное обеспечение на носителе\nРуководство по эксплуатации\nПаспорт"}
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
              placeholder="напр. tokarny-stanok"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <p className="mt-1 text-xs text-slate-400">
              Одинаковое значение у нескольких товаров группирует их как варианты одного изделия.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Название варианта</label>
            <input
              name="variantLabel"
              placeholder="Версия ПК / Версия VR"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Создать
        </button>
      </form>
    </div>
  );
}
