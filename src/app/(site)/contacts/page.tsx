import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Контакты — Digi Tech",
  description: "Свяжитесь с нами: телефон, email и форма заявки на демонстрацию тренажёров.",
};

export default function ContactsPage() {
  return (
    <Container size="5xl" className="py-16">
      <Reveal>
        <span className="label text-accent-2">Контакты</span>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Свяжитесь с нами
        </h1>
        <p className="mt-4 max-w-xl text-lg text-fg-secondary">
          Ответим на вопросы, подберём модули под ваши специальности и покажем демо в
          течение одного рабочего дня.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Reveal delay={0.1}>
          <div className="space-y-6">
            <div>
              <div className="label mb-1 text-accent-2">Телефон</div>
              <a href="tel:+73512101540" className="text-xl font-bold hover:text-primary">
                +7 (351) 210-15-40
              </a>
            </div>
            <div>
              <div className="label mb-1 text-accent-2">Email</div>
              <a
                href="mailto:zakaz@digi-tech.dev"
                className="text-xl font-bold hover:text-primary"
              >
                zakaz@digi-tech.dev
              </a>
            </div>
            <div>
              <div className="label mb-1 text-accent-2">Для колледжей и техникумов</div>
              <p className="text-fg-secondary">
                Работаем с образовательными учреждениями по всей России — от заявки до
                внедрения первого модуля обычно проходит не больше одного рабочего дня.
              </p>
            </div>
            <div>
              <div className="label mb-1 text-accent-2">Для оформления закупки</div>
              <a
                href="/documents/rekvizity.pdf"
                download
                className="inline-flex items-center gap-2 text-fg-secondary hover:text-primary"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </svg>
                Скачать реквизиты компании (PDF)
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="rounded-2xl border border-line bg-bg-surface p-6 sm:p-8">
          <ContactForm />
        </Reveal>
      </div>
    </Container>
  );
}
