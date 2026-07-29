import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [categoryCount, productCount, newRequestCount, publishedPosts] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.contactRequest.count({ where: { status: "NEW" } }),
    prisma.blogPost.count({ where: { isPublished: true } }),
  ]);

  const stats = [
    { label: "Категорий", value: categoryCount },
    { label: "Товаров", value: productCount },
    { label: "Новых заявок", value: newRequestCount },
    { label: "Опубликовано постов", value: publishedPosts },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Обзор</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
            <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
