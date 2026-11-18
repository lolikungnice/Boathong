"use client";

import Link from "next/link";
import { MenuCategoryCard } from "./MenuCategoryCard";
import { Reveal } from "./Reveal";

const categories = [
  { href: "/menu", image: "/images/menu/tom-yum-kung.jpg", labelEn: "THAI FOOD", labelJp: "本格タイ料理" },
  { href: "/menu", image: "/images/menu/pad-thai.jpg", labelEn: "STREET FOOD", labelJp: "タイ屋台料理" },
  { href: "/menu", image: "/images/menu/fried-shrimp-spring-rolls.jpg", labelEn: "APPETIZER", labelJp: "前菜・おつまみ" },
  { href: "/menu", image: "/images/menu/thai-tea.jpg", labelEn: "DRINK", labelJp: "ドリンク・デザート" },
  { href: "/menu#khao-soi", image: "/images/menu/khao-soi.jpg", labelEn: "RECOMMENDED", labelJp: "カオソーイ" },
];

export function MenuSection() {
  return (
    <section className="bg-charcoal-soft/88 backdrop-blur-sm py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="flex items-center justify-center gap-5 text-center">
          <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-gold/50 sm:block" />
          <div>
            <p className="eyebrow mb-2">OUR MENU</p>
            <h2 className="font-display text-3xl font-medium text-cream sm:text-4xl">
              おすすめメニュー
            </h2>
          </div>
          <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-gold/50 sm:block" />
        </Reveal>

        <Reveal className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-5">
          {categories.map((category) => (
            <MenuCategoryCard key={category.labelEn} {...category} />
          ))}
        </Reveal>

        <Reveal className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-block text-sm tracking-signage text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-light"
          >
            すべてのメニューを見る →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
