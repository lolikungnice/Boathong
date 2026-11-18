"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Hero() {
  const { t, locale } = useLanguage();
  const bgRef = useRef<HTMLDivElement>(null);

  // Cheap scroll-parallax: shift the background layer slower than the page.
  // Skipped entirely under prefers-reduced-motion via the media query below.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (bgRef.current) {
          const y = Math.min(window.scrollY, 800) * 0.18;
          bgRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex h-[100svh] min-h-[640px] items-end justify-center overflow-hidden pb-20 sm:pb-24">
      {/* Background: real photo of the restaurant entrance — the brand
          wordmark ("Boathong / ボアトウン") is already baked into this
          photo, so we don't render a second HTML title on top of it. */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-20 scale-105 bg-[linear-gradient(180deg,#0a0505,#050505_55%,#0a0505)]"
      >
        <Image
          src="/images/hero.jpg"
          alt="Boathong / ボアトウン — restaurant entrance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Faint drifting glow blobs — the "moving light particles" cue, done
          with pure CSS instead of a particle library. */}
      <div className="light-drift absolute -left-24 top-1/3 -z-10 h-72 w-72 animate-drift-slow rounded-full" />
      <div className="light-drift absolute -right-16 bottom-1/4 -z-10 h-96 w-96 animate-drift-slow rounded-full [animation-delay:6s]" />

      <div className="cinematic-overlay absolute inset-0 -z-10" />

      <div className="container-page relative flex flex-col items-center text-center">
        <p className="animate-fade-up inline-block rounded-full border border-lacquer-bright/70 bg-lacquer/10 px-4 py-1.5 font-display text-base text-gold [animation-delay:0.05s] sm:text-lg">
          ร้านอาหารไทย
        </p>

        <p className="animate-fade-up mt-5 max-w-md text-sm tracking-signage text-cream/80 [animation-delay:0.35s] sm:text-base">
          {locale === "jp"
            ? "AUTHENTIC THAI RESTAURANT IN YOKOHAMA"
            : "ร้านอาหารไทยแท้ ใจกลางโยโกฮาม่า"}
        </p>

        <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-4 [animation-delay:0.45s]">
          <Link
            href="/menu"
            className="neon-border flex items-center gap-2 rounded-sm bg-lacquer px-8 py-3 text-sm font-medium tracking-signage text-cream transition-all hover:bg-lacquer-bright"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 3v7a2 2 0 0 0 2 2v9M6 3v18M10 3v7M18 3c-1.5 0-3 2-3 5s1.5 5 3 5v9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.hero.ctaMenu}
          </Link>
          <Link
            href="/access"
            className="flex items-center gap-2 rounded-sm border border-gold/60 px-8 py-3 text-sm font-medium tracking-signage text-gold transition-colors hover:border-gold-light hover:bg-gold/10 hover:text-gold-light"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="9.5" r="2.3" />
            </svg>
            {locale === "jp" ? "アクセス" : "แผนที่"}
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/60">
        <span className="text-[11px] tracking-signage">SCROLL</span>
        <span className="animate-bounce-y text-gold">↓</span>
      </div>
    </section>
  );
}
