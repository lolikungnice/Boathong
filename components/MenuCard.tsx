"use client";

import Image from "next/image";
import type { MenuItem } from "@/types/menu";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function SpiceLevel({ level, label }: { level: number; label: string }) {
  if (level === 0) return null;
  return (
    <div className="flex items-center gap-1" aria-label={`${label}: ${level}`}>
      {Array.from({ length: level }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className="text-lacquer-bright"
        >
          🌶
        </span>
      ))}
    </div>
  );
}

const badgeStyles: Record<string, string> = {
  おすすめ: "bg-gold text-charcoal",
  人気: "bg-lacquer text-cream",
};

export function MenuCard({ item }: { item: MenuItem }) {
  const { locale, t } = useLanguage();

  return (
    <article id={item.id} className="scroll-mt-24 group neon-border overflow-hidden rounded-sm bg-charcoal-soft/88 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1.5">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal/90">
        {item.image && (
          <Image
            src={item.image}
            alt={locale === "jp" ? item.nameJP : item.nameTH}
            fill
            sizes={item.category === "courses" ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"}
            className={`${item.imageFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-500 group-hover:scale-105`}
          />
        )}
        {item.badge && (
          <span
            className={`absolute left-2.5 top-2.5 rounded-sm px-2 py-1 text-[10px] font-medium tracking-signage ${badgeStyles[item.badge]}`}
          >
            {item.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-5">
        <div>
          <h3 className="font-display text-lg font-medium text-cream">
            {locale === "jp" ? item.nameJP : item.nameTH}
          </h3>
          <p className="text-sm text-cream/50">
            {locale === "jp" ? item.nameTH : item.nameJP}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-cream/70">
          {locale === "jp" ? item.description.jp : item.description.th}
        </p>

        {item.courseDishes && (
          <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-cream/80">
            {item.courseDishes[locale === "jp" ? "jp" : "th"].map((dish) => (
              <li key={dish}>{dish}</li>
            ))}
          </ol>
        )}

        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="font-display text-base leading-snug text-gold">{item.price}</p>
          <SpiceLevel level={item.spicyLevel} label={t.menuPage.spicy} />
        </div>
      </div>
    </article>
  );
}
