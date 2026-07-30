"use server";

import { prisma } from "@/lib/prisma";

export type ContactFormState = {
  ok: boolean;
  message: string;
};

export async function submitContactRequest(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim() || null;

  if (!name || !phone) {
    return { ok: false, message: "Укажите имя и телефон." };
  }

  await prisma.contactRequest.create({
    data: { name, company, phone, email, message, sourcePage: "/contacts" },
  });

  return { ok: true, message: "Заявка отправлена! Свяжемся с вами в течение рабочего дня." };
}
