import { Reveal } from "@/components/motion/Reveal";

const ITEMS = [
  {
    title: "Техническое задание",
    description: "Разрабатываем ТЗ под требования вашего центра закупок и специфику направления подготовки.",
  },
  {
    title: "Обоснование НМЦК",
    description: "Готовим расчёт и обоснование начальной максимальной цены контракта.",
  },
  {
    title: "Коды ОКПД2",
    description: "Подбираем корректные коды для формирования извещения о закупке.",
  },
  {
    title: "44-ФЗ и 223-ФЗ",
    description: "Комплект документов оформляем с учётом требований обоих законов о закупках.",
  },
];

export function ProcurementSupport() {
  return (
    <div className="rounded-2xl border border-line bg-bg-surface p-8 sm:p-10">
      <Reveal>
        <span className="label text-accent-2">Для закупок</span>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Сопровождение по 44-ФЗ и 223-ФЗ
        </h2>
        <p className="mt-3 max-w-2xl text-fg-secondary">
          Помогаем оформить закупку по всем требованиям — от технического задания до кодов
          ОКПД2, чтобы у центра закупок не было вопросов к документам.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title}>
            <h3 className="font-bold">{item.title}</h3>
            <p className="mt-1.5 text-sm text-fg-secondary">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
