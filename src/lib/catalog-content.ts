export type CategorySeed = {
  slug: string;
  name: string;
  shortDescription: string;
  icon: string;
};

/**
 * Real top-level catalog categories, taken from the production tracker
 * (internal spreadsheet listing every simulator by industry group).
 */
export const CATEGORIES: CategorySeed[] = [
  {
    slug: "neftegazovaya-pererabotka",
    name: "Нефтегазовая переработка",
    shortDescription: "Ректификационные колонны, риформинг, гидрокрекинг и КИПиА в 3D.",
    icon: "oil",
  },
  {
    slug: "stroitelstvo",
    name: "Строительство",
    shortDescription: "От опалубочных работ до монтажа железобетонных конструкций — в VR.",
    icon: "construction",
  },
  {
    slug: "elektroenergetika",
    name: "Электроэнергетика",
    shortDescription: "Электромонтаж, наладка автоматики и лабораторные работы по электротехнике.",
    icon: "electric",
  },
  {
    slug: "mashinostroenie-i-mehanoobrabotka",
    name: "Машиностроение и механообработка",
    shortDescription: "Электродвигатели, токарные станки, гидронасосы и редукторы.",
    icon: "machinery",
  },
  {
    slug: "teploenergetika",
    name: "Теплоэнергетика",
    shortDescription: "Диагностика теплотехнического оборудования, устройство ТЭС и котельных агрегатов.",
    icon: "thermal",
  },
  {
    slug: "cvetnaya-metallurgiya",
    name: "Цветная металлургия",
    shortDescription: "Электролизёры и плавка на штейн в интерактивном 3D-атласе.",
    icon: "metal-nonferrous",
  },
  {
    slug: "chernaya-metallurgiya",
    name: "Чёрная металлургия",
    shortDescription: "Кислородный конвертер и шахтная печь — устройство и принцип работы.",
    icon: "metal-ferrous",
  },
  {
    slug: "obrabotka-metallov-davleniem",
    name: "Обработка металлов давлением",
    shortDescription: "Прессование, ковочное оборудование, станы холодной прокатки.",
    icon: "press",
  },
  {
    slug: "obshchie-professionalnye-discipliny",
    name: "Общие профессиональные дисциплины",
    shortDescription: "Лаборатории материаловедения, физической химии и неорганической химии.",
    icon: "flask",
  },
  {
    slug: "elektronnye-uchebno-metodicheskie-kompleksy",
    name: "Электронные учебно-методические комплексы",
    shortDescription: "Комплексные программы для преподавателя и студента, например «Мастер КИПиА».",
    icon: "complex",
  },
  {
    slug: "avtotrenazhery",
    name: "Автотренажёры",
    shortDescription: "Симуляторы горной техники, автогрейдеров, экскаваторов и спецтехники.",
    icon: "vehicle",
  },
];
