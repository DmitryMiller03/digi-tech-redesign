"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRightIcon } from "@/components/icons";
import { submitCartCheckout, type CartCheckoutState } from "./actions";

const initialState: CartCheckoutState = { ok: false, message: "" };

function formatPrice(price: number) {
  return `${price.toLocaleString("ru-RU")} ₽`;
}

export function CartPageClient() {
  const { items, removeItem, setQuantity, clear } = useCart();
  const [state, formAction, pending] = useActionState(submitCartCheckout, initialState);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    if (state.ok) clear();
  }, [state.ok, clear]);

  const requestOnlyCount = items.filter((i) => i.price === null).length;
  const knownTotal = items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0);
  const hasKnownPrices = items.some((i) => i.price !== null);

  if (state.ok) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="rounded-xl border border-accent/30 bg-accent/10 p-8">
          <p className="text-lg font-semibold">{state.message}</p>
          <Link href="/catalog" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Корзина пуста</h1>
        <p className="mt-3 text-fg-secondary">
          Добавьте тренажёры из каталога, чтобы отправить единую заявку по нескольким позициям.
        </p>
        <MagneticButton className="mt-6">
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-2 rounded-pill bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-white"
          >
            Перейти в каталог
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </MagneticButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Корзина</h1>
        <p className="mt-2 text-fg-secondary">Товаров в корзине: {items.length} шт.</p>
      </Reveal>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-bg-page p-5"
          >
            <div className="min-w-0 flex-1">
              <Link
                href={`/catalog/${item.categorySlug}/${item.slug}`}
                className="font-semibold hover:text-primary"
              >
                {item.name}
              </Link>
              <p className="mt-1 text-sm text-fg-muted">
                {item.price !== null ? formatPrice(item.price) : "Цена по запросу"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity(item.productId, item.quantity - 1)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-line-strong text-lg leading-none hover:bg-bg-surface"
                aria-label="Уменьшить количество"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(item.productId, item.quantity + 1)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-line-strong text-lg leading-none hover:bg-bg-surface"
                aria-label="Увеличить количество"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.productId)}
              className="text-sm font-medium text-red-500 hover:underline"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-line bg-bg-surface p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold">
              {hasKnownPrices ? `Итого: ${formatPrice(knownTotal)}` : "Общая сумма по запросу"}
            </p>
            <p className="text-sm text-fg-muted">
              без учёта НДС
              {requestOnlyCount > 0 && ` · ${requestOnlyCount} позиции по запросу`}
            </p>
          </div>
          {!checkoutOpen && (
            <MagneticButton>
              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                className="rounded-pill bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-white"
              >
                Оформить заказ
              </button>
            </MagneticButton>
          )}
        </div>

        {checkoutOpen && (
          <form action={formAction} className="mt-6 space-y-4 border-t border-line pt-6">
            <input type="hidden" name="items" value={JSON.stringify(items.map((i) => ({ productId: i.productId, name: i.name, quantity: i.quantity })))} />

            {state.message && !state.ok && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">{state.message}</p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-fg-secondary">Ваше имя *</label>
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded-lg border border-line-strong bg-bg-page px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-fg-secondary">Компания</label>
                <input
                  name="company"
                  className="mt-1 w-full rounded-lg border border-line-strong bg-bg-page px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-fg-secondary">Телефон *</label>
                <input
                  name="phone"
                  required
                  type="tel"
                  className="mt-1 w-full rounded-lg border border-line-strong bg-bg-page px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-fg-secondary">Email</label>
                <input
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-lg border border-line-strong bg-bg-page px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-fg-secondary">Комментарий</label>
              <textarea
                name="message"
                rows={3}
                className="mt-1 w-full rounded-lg border border-line-strong bg-bg-page px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <p className="text-xs text-fg-muted">
              После отправки заявки менеджер свяжется с вами и подтвердит наличие товаров.
            </p>
            <MagneticButton strength={0.2}>
              <button
                type="submit"
                disabled={pending}
                className="rounded-pill bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {pending ? "Отправляем…" : "Отправить заявку"}
              </button>
            </MagneticButton>
          </form>
        )}
      </div>
    </div>
  );
}
