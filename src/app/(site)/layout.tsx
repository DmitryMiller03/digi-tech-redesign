import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionOverlay } from "@/components/PageTransitionOverlay";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageTransitionOverlay />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
