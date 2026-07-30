import { prisma } from "@/lib/prisma";
import { deleteRequest } from "./actions";
import { StatusSelect } from "./StatusSelect";

export default async function RequestsPage() {
  const requests = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Заявки с сайта</h1>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Имя / компания / контакты</th>
              <th className="px-4 py-3">Сообщение / товары</th>
              <th className="px-4 py-3">Источник</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{request.name}</div>
                  {request.company && <div className="text-slate-500">{request.company}</div>}
                  <div className="text-slate-500">{request.phone}</div>
                  {request.email && <div className="text-slate-500">{request.email}</div>}
                </td>
                <td className="max-w-xs px-4 py-3 text-slate-600">
                  {request.message}
                  {request.items.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-xs text-slate-500">
                      {request.items.map((item) => (
                        <li key={item.id}>
                          {item.quantity}× {item.productName}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-500">{request.sourcePage}</td>
                <td className="px-4 py-3">
                  <StatusSelect id={request.id} status={request.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteRequest.bind(null, request.id)}>
                    <button type="submit" className="font-medium text-red-500 hover:underline">
                      Удалить
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  Заявок пока нет.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
