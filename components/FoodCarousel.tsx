"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { featuredFoods } from "@/data/featuredFoods";

const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 40;

const tagStyles: Record<string, string> = {
  おすすめ: "bg-gold text-charcoal",
  人気: "bg-lacquer text-cream",
  NEW: "border border-gold text-gold",
};

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function FoodCarousel() {
  const count = featuredFoods.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((i: number) => setActive(mod(i, count)), [count]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Autoplay — pauses on hover/touch, resumes when the pointer leaves.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => mod(a + 1, count));
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    resetTouch();
    const touch = e.changedTouches[0];
    if (startX === null || !touch) return;
    const delta = touch.clientX - startX;
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
  };
  const resetTouch = () => {
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    <section
      className="relative overflow-hidden bg-charcoal/90 py-24 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Subtle decorative lattice, matching the About section treatment */}
      <div className="thai-pattern pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="container-page relative text-center">
        <p className="eyebrow mb-2">TODAY&rsquo;S SPECIAL</p>
        <h2 className="font-display text-3xl font-medium text-cream sm:text-4xl">
          おすすめ料理
        </h2>
      </div>

      {/* Track */}
      <div
        className="relative mt-14 h-[440px] sm:h-[460px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={resetTouch}
      >
        {featuredFoods.map((food, i) => {
          const offset = (() => {
            // Shortest signed distance from `active`, wrapping around.
            const raw = i - active;
            if (raw > count / 2) return raw - count;
            if (raw < -count / 2) return raw + count;
            return raw;
          })();

          const isActive = offset === 0;
          const visible = Math.abs(offset) <= 1; // center + one on each side (desktop)
          const mobileVisible = offset === 0;

          return (
            <div
              key={food.id}
              aria-hidden={!isActive}
              className={`absolute left-1/2 top-0 w-[86%] max-w-[300px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:w-[320px] ${
                mobileVisible ? "opacity-100" : "pointer-events-none opacity-0 sm:pointer-events-auto"
              } ${visible ? "sm:opacity-100" : "sm:opacity-0"}`}
              style={{
                transform: `translate(-50%, 0) translateX(${offset * 78}%) scale(${
                  isActive ? 1 : 0.82
                })`,
                zIndex: isActive ? 20 : 10 - Math.abs(offset),
                filter: isActive ? "none" : "brightness(0.55)",
              }}
            >
              <div
                className={`overflow-hidden rounded-sm bg-charcoal-soft/88 backdrop-blur-sm transition-shadow duration-700 ${
                  isActive
                    ? "neon-border shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                    : "border border-charcoal-line"
                }`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={food.image}
                    alt={food.englishName}
                    fill
                    sizes="(min-width: 640px) 320px, 86vw"
                    className={`object-cover transition-transform duration-700 ${
                      isActive ? "scale-100" : "scale-105"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" />
                  <span
                    className={`absolute left-3 top-3 rounded-sm px-2.5 py-1 text-[11px] font-medium tracking-signage ${tagStyles[food.tag]}`}
                  >
                    {food.tag}
                  </span>
                </div>

                <div
                  className={`p-5 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0 sm:opacity-70"
                  }`}
                >
                  <p className="text-xs tracking-signage text-gold">{food.category}</p>
                  <h3 className="mt-1 font-display text-lg text-cream">{food.name}</h3>
                  <p className="text-sm italic text-cream/50">{food.englishName}</p>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-cream/65">
                    {food.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-lg text-gold">{food.price}</span>
                    <Link
                      href="/menu"
                      className="text-xs tracking-signage text-gold transition-colors hover:text-gold-light"
                    >
                      VIEW MENU →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop arrow controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous dish"
        className="absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:border-gold-light hover:text-gold-light sm:flex"
      >
        ←
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next dish"
        className="absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:border-gold-light hover:text-gold-light sm:flex"
      >
        →
      </button>

      {/* Pagination dots */}
      <div className="relative mt-8 flex items-center justify-center gap-2">
        {featuredFoods.map((food, i) => (
          <button
            key={food.id}
            type="button"
            aria-label={`Go to ${food.englishName}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-gold" : "w-2 bg-cream/25 hover:bg-cream/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
