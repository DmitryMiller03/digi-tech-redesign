import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBlogPost, togglePublish } from "./actions";

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Блог</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Новый пост
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Заголовок</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-3 font-medium text-slate-900">{post.title}</td>
                <td className="px-4 py-3">
                  {post.isPublished ? (
                    <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-700">
                      опубликован
                    </span>
                  ) : (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">
                      черновик
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <form action={togglePublish.bind(null, post.id, !post.isPublished)}>
                      <button type="submit" className="font-medium text-blue-600 hover:underline">
                        {post.isPublished ? "Снять с публикации" : "Опубликовать"}
                      </button>
                    </form>
                    <form action={deleteBlogPost.bind(null, post.id)}>
                      <button type="submit" className="font-medium text-red-500 hover:underline">
                        Удалить
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-slate-500">
                  Пока нет ни одного поста.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
