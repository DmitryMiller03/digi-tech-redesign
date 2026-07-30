"use server";

import { prisma } from "@/lib/prisma";

export type CartCheckoutState = {
  ok: boolean;
  message: string;
};

type CartItemPayload = {
  productId: string;
  name: string;
  quantity: number;
};

export async function submitCartCheckout(
  _prevState: CartCheckoutState,
  formData: FormData,
): Promise<CartCheckoutState> {
  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim() || null;
  const itemsRaw = String(formData.get("items") ?? "[]");

  if (!name || !phone) {
    return { ok: false, message: "Укажите имя и телефон." };
  }

  let items: CartItemPayload[] = [];
  try {
    items = JSON.parse(itemsRaw);
  } catch {
    items = [];
  }

  if (items.length === 0) {
    return { ok: false, message: "Корзина пуста." };
  }

  await prisma.contactRequest.create({
    data: {
      name,
      company,
      phone,
      email,
      message,
      sourcePage: "/cart",
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          productName: item.name,
          quantity: item.quantity,
        })),
      },
    },
  });

  return { ok: true, message: "Заявка отправлена! Свяжемся с вами в течение рабочего дня." };
}
