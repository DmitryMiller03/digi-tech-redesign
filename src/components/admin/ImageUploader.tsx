"use client";

import { useRef, useState, type DragEvent } from "react";

/**
 * Drag-and-drop image upload for the admin product form. Uploads go to
 * /api/admin/upload, which writes into public/uploads (backed by a
 * persistent Docker volume in production — see docker-compose.yml).
 *
 * The parent form still just reads a single `name="images"` field on
 * submit, same as when it was a raw textarea: this renders a hidden input
 * with the uploaded URLs newline-joined, so `actions.ts` didn't need to
 * change at all.
 */
export function ImageUploader({ name, defaultUrls = [] }: { name: string; defaultUrls?: string[] }) {
  const [urls, setUrls] = useState<string[]>(defaultUrls);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function uploadFiles(files: FileList | File[]) {
    const list = Array.from(files);
    if (list.length === 0) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      for (const file of list) formData.append("files", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Не удалось загрузить файл");

      setUrls((prev) => [...prev, ...data.urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить файл");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) uploadFiles(e.dataTransfer.files);
  }

  function removeUrl(url: string) {
    setUrls((prev) => prev.filter((u) => u !== url));
  }

  return (
    <div>
      <input type="hidden" name={name} value={urls.join("\n")} />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-6 text-center text-sm transition-colors ${
          dragOver ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400"
        }`}
      >
        <span className="font-medium text-slate-700">
          {uploading ? "Загрузка…" : "Перетащите изображения сюда или нажмите, чтобы выбрать"}
        </span>
        <span className="mt-1 text-xs text-slate-400">JPG, PNG, WEBP, GIF, SVG — до 8 МБ каждое</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) uploadFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {urls.length > 0 && (
        <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {urls.map((url) => (
            <li key={url} className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element -- admin-only preview of a locally uploaded file, not a page asset */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeUrl(url)}
                aria-label="Удалить изображение"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
