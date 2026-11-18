"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PromotionCarousel } from "@/components/PromotionCarousel";
import { FoodCarousel } from "@/components/FoodCarousel";
import { About } from "@/components/About";
import { MenuSection } from "@/components/MenuSection";
import { NeonBanner } from "@/components/NeonBanner";
import { Access } from "@/components/Access";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function HomeClient() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PromotionCarousel />
        <FoodCarousel />
        <About />
        <MenuSection />
        <NeonBanner />
        <Access />

        {/* Reservation CTA strip */}
        <section className="border-t border-charcoal-line bg-charcoal-soft/88 backdrop-blur-sm py-16">
          <Reveal className="container-page flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="eyebrow mb-2">{t.home.reserveEyebrow}</p>
              <h2 className="font-display text-2xl font-medium text-cream sm:text-3xl">
                {t.home.reserveTitle}
              </h2>
            </div>
            <Link
              href="/reservation"
              className="neon-border shrink-0 rounded-sm bg-lacquer px-8 py-3 text-sm font-medium tracking-signage text-cream transition-colors hover:bg-lacquer-bright"
            >
              {t.home.reserveLink}
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
