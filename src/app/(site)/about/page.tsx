import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { PinnedStats } from "@/components/motion/PinnedStats";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "О компании — Digi Tech",
  description:
    "Digi Tech разрабатывает виртуальные тренажёры и VR-комплексы для технического образования.",
};

const VALUES = [
  {
    title: "Собственное производство",
    description: "Разрабатываем 3D-сцены, VR-сценарии и интерактивные атласы своей командой.",
  },
  {
    title: "Индивидуальная разработка",
    description: "Собираем модули под конкретные специальности и оборудование колледжа.",
  },
  {
    title: "Оборудование под ФП «Профессионалитет»",
    description: "Комплектуем кластеры под федеральную программу подготовки кадров.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <span className="label text-accent-2">О компании</span>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Делаем практическое обучение доступным без физических стендов
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-secondary">
          Digi Tech разрабатывает виртуальные тренажёры, интерактивные 3D-атласы и VR-комплексы
          для технического и профессионального образования — так, чтобы студент мог безопасно
          изучить устройство сложного оборудования до того, как встанет за реальный станок.
        </p>
      </Reveal>

      <PinnedStats
        className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-y border-line py-8"
        stats={[
          { value: 5000, suffix: "+", label: "студентов" },
          { value: 11, suffix: "", label: "направлений подготовки" },
          { value: 120, suffix: "+", label: "колледжей и техникумов" },
        ]}
      />

      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Как мы работаем</h2>
        </Reveal>
        <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-xl border border-line bg-bg-surface p-6">
              <h3 className="font-bold">{value.title}</h3>
              <p className="mt-2 text-sm text-fg-secondary">{value.description}</p>
            </div>
          ))}
        </StaggerGroup>
      </div>

      <Reveal className="mt-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-8 text-center text-white sm:p-14">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          Хотите узнать больше о наших модулях?
        </h2>
        <MagneticButton className="mt-6">
          <Link
            href="/contacts"
            className="group inline-flex items-center gap-2 rounded-pill bg-white px-6 py-3.5 text-sm font-semibold text-primary"
          >
            Связаться с нами
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </MagneticButton>
      </Reveal>
    </div>
  );
}
