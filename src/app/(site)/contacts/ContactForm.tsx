"use client";

import { useActionState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { submitContactRequest, type ContactFormState } from "./actions";

const initialState: ContactFormState = { ok: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactRequest, initialState);
  const successRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!state.ok || !successRef.current) return;
      gsap.fromTo(
        successRef.current,
        { autoAlpha: 0, y: -8 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    },
    { dependencies: [state.ok] },
  );

  if (state.ok) {
    return (
      <div
        ref={successRef}
        className="rounded-xl border border-accent/30 bg-accent/10 p-6 text-fg-primary"
      >
        <p className="font-semibold">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.message && !state.ok && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">{state.message}</p>
      )}
      <div>
        <label className="block text-sm font-medium text-fg-secondary">Имя</label>
        <input
          name="name"
          required
          className="mt-1 w-full rounded-lg border border-line-strong bg-bg-page px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-fg-secondary">Телефон</label>
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
      <div>
        <label className="block text-sm font-medium text-fg-secondary">Сообщение</label>
        <textarea
          name="message"
          rows={4}
          className="mt-1 w-full rounded-lg border border-line-strong bg-bg-page px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <MagneticButton strength={0.2}>
        <button
          type="submit"
          disabled={pending}
          className="rounded-pill bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Отправляем…" : "Отправить заявку"}
        </button>
      </MagneticButton>
    </form>
  );
}
