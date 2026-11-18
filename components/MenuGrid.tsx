"use client";

import { useEffect, useState } from "react";
import { menuCategories, menuItems } from "@/data/menu";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MenuCard } from "./MenuCard";
import { LunchSetBuilder } from "./LunchSetBuilder";
import type { MenuCategoryId } from "@/types/menu";

export function MenuGrid() {
  const { locale } = useLanguage();
  const [active, setActive] = useState<MenuCategoryId | undefined>(menuCategories[0]?.id);

  useEffect(() => {
    function openLinkedItem() {
      const id = window.location.hash.slice(1);
      const item = menuItems.find((entry) => entry.available && entry.id === id);
      if (item) setActive(item.category);
    }
    openLinkedItem();
    window.addEventListener("hashchange", openLinkedItem);
    return () => window.removeEventListener("hashchange", openLinkedItem);
  }, []);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (menuItems.some((item) => item.id === id && item.category === active)) {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }
  }, [active]);

  const visibleItems = menuItems.filter(
    (item) => item.category === active && item.available
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Menu categories"
        className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {menuCategories.map((category) => {
          const isActive = category.id === active;
          return (
            <button
              key={category.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(category.id)}
              className={`shrink-0 rounded-sm border px-4 py-2 text-sm tracking-signage transition-colors ${
                isActive
                  ? "border-gold bg-gold text-charcoal"
                  : "border-charcoal-line text-cream/70 hover:border-gold/60 hover:text-cream"
              }`}
            >
              {locale === "jp" ? category.nameJP : category.nameTH}
            </button>
          );
        })}
      </div>

      {active === "lunch" && (
        <p className="mt-6 text-sm text-cream/60">
          ランチは平日（月〜金）限定です。
          <a href="#lunch-set" className="ml-2 text-gold underline underline-offset-4 hover:text-gold-light">
            セットを追加する（サラダ・デザート・ドリンク） ↓
          </a>
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {active === "lunch" && <LunchSetBuilder items={visibleItems} />}
    </div>
  );
}
