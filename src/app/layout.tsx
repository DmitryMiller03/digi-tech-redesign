import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Digi-Tech — цифровые тренажёры и VR-обучение для колледжей",
  description:
    "Виртуальные тренажёры, лабораторные стенды и VR-комплексы для практического обучения студентов техникумов и колледжей.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${montserrat.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false} storageKey="digitech-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
