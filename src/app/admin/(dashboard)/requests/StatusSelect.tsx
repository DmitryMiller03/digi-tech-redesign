"use client";

import { updateRequestStatus } from "./actions";
import type { ContactRequestStatus } from "@/generated/prisma/enums";

const STATUS_LABEL: Record<string, string> = {
  NEW: "Новая",
  IN_PROGRESS: "В работе",
  DONE: "Обработана",
  SPAM: "Спам",
};

const STATUS_OPTIONS = ["NEW", "IN_PROGRESS", "DONE", "SPAM"] as const;

export function StatusSelect({ id, status }: { id: string; status: string }) {
  return (
    <select
      defaultValue={status}
      onChange={(e) => updateRequestStatus(id, e.target.value as ContactRequestStatus)}
      className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {STATUS_LABEL[option]}
        </option>
      ))}
    </select>
  );
}
