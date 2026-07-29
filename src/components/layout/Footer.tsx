import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog-content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-lg font-extrabold">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent text-sm font-black text-white">
                D
              </span>
              Digi Tech
            </div>
            <p className="mt-3 max-w-xs text-sm text-fg-muted">
              Виртуальные тренажёры и лабораторные комплексы для практического обучения
              студентов техникумов и колледжей.
            </p>
          </div>

          <div>
            <div className="label mb-3">Каталог</div>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/catalog/${category.slug}`}
                    className="text-fg-secondary hover:text-fg-primary"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label mb-3">Компания</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-fg-secondary hover:text-fg-primary">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/professionalism" className="text-fg-secondary hover:text-fg-primary">
                  Профессионалитет
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-fg-secondary hover:text-fg-primary">
                  Блог
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-fg-secondary hover:text-fg-primary">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="label mb-3">Контакты</div>
            <ul className="space-y-2 text-sm text-fg-secondary">
              <li>
                <a href="tel:+73512101540" className="hover:text-fg-primary">
                  +7 (351) 210-15-40
                </a>
              </li>
              <li>
                <a href="mailto:zakaz@digi-tech.dev" className="hover:text-fg-primary">
                  zakaz@digi-tech.dev
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-fg-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Digi Tech. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
}
