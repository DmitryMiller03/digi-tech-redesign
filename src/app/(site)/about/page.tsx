import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { PinnedStats } from "@/components/motion/PinnedStats";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GradientCta } from "@/components/ui/GradientCta";

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
    <Container className="py-16">
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
            <Card key={value.title} className="bg-bg-surface">
              <h3 className="font-bold">{value.title}</h3>
              <p className="mt-2 text-sm text-fg-secondary">{value.description}</p>
            </Card>
          ))}
        </StaggerGroup>
      </div>

      <Reveal className="mt-16">
        <GradientCta className="p-8 text-center sm:p-14">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Хотите узнать больше о наших модулях?
          </h2>
          <MagneticButton className="mt-6">
            <Button href="/contacts" variant="inverted" arrow>
              Связаться с нами
            </Button>
          </MagneticButton>
        </GradientCta>
      </Reveal>
    </Container>
  );
}
