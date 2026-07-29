"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroTypewriter } from "@/components/home/HeroTypewriter";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Some browsers leave the element stuck at readyState 0 if loading isn't
    // kicked off explicitly — an unreliable auto-start for a src set in JSX.
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute left-1/2 top-0 h-[128%] w-auto max-w-none -translate-x-1/2"
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 flex h-full flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <span className="label inline-flex items-center gap-2 text-accent-2">
              <span className="h-px w-6 bg-current" />
              VR &amp; 3D · Профессиональное образование
            </span>
          </Reveal>

          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Цифровое обучение для
            <br />
            <HeroTypewriter />
          </h1>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Интерактивные 3D-сцены и VR-тренажёры для колледжей и техникумов — без риска и
              затрат на физические стенды.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Link
                  href="/contacts"
                  className="group inline-flex items-center gap-2 rounded-pill bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-white shadow-md"
                >
                  Запросить демо
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <Link
                  href="/catalog"
                  className="rounded-pill border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
                >
                  Смотреть каталог
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
