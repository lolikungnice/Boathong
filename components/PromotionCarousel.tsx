"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { promotions } from "@/data/promotions";

const AUTOPLAY_MS = 4500;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function PromotionCarousel() {
  const count = promotions.length;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const draggedRef = useRef(false);

  const scrollToIndex = useCallback((i: number) => {
    const wrapped = mod(i, count);
    const el = scrollerRef.current;
    const card = cardRefs.current[wrapped];
    if (el && card) {
      el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }
    setIndex(wrapped);
  }, [count]);

  const next = useCallback(() => scrollToIndex(index + 1), [index, scrollToIndex]);
  const prev = useCallback(() => scrollToIndex(index - 1), [index, scrollToIndex]);

  // Autoplay — restarts (i.e. "resets the timer") whenever `index` or
  // `paused` changes, which covers both autoplay ticks and manual nav.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const wrapped = mod(i + 1, count);
        const el = scrollerRef.current;
        const card = cardRefs.current[wrapped];
        if (el && card) el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
        return wrapped;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, index, count]);

  // Keep the active dot in sync when the user free-scrolls (touch swipe,
  // native momentum, or the drag handler below).
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let closest = 0;
        let closestDist = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const dist = Math.abs(card.offsetLeft - el.scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setIndex((prevIndex) => (prevIndex === closest ? prevIndex : closest));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Desktop mouse-drag-to-scroll.
  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDragging.current = true;
    draggedRef.current = false;
    dragStartX.current = e.clientX;
    dragStartScroll.current = el.scrollLeft;
    setPaused(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollerRef.current;
    if (!el) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 4) draggedRef.current = true;
    el.scrollLeft = dragStartScroll.current - delta;
  };
  const endDrag = () => {
    isDragging.current = false;
    setPaused(false);
  };

  // Prevent a drag from also firing the card's link click.
  const onCardClickCapture = (e: React.MouseEvent) => {
    if (draggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  return (
    <section className="bg-charcoal-soft/88 backdrop-blur-sm py-24 sm:py-32">
      <div className="container-page">
        <p className="eyebrow mb-2">PROMOTION / NEW</p>
        <h2 className="font-display text-4xl font-medium text-cream sm:text-5xl">
          プロモーション・新着情報
        </h2>
      </div>

      <div className="relative mt-14">
        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Promotions"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={() => {
            if (isDragging.current) endDrag();
            setPaused(false);
          }}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          className="scrollbar-none flex items-center cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-3 select-none active:cursor-grabbing sm:gap-8 sm:px-10"
          style={{ scrollPaddingLeft: "1.25rem" }}
        >
          {promotions.map((promo, i) => {
            const isActive = i === index;
            const aspectRatio = promo.layout === "poster" ? "aspect-video" : "aspect-[4/3]";
            return (
              <div
                key={promo.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="w-[94%] shrink-0 snap-center transition-all duration-500 sm:w-[80%] lg:w-[64%]"
                style={{
                  transform: isActive ? "scale(1)" : "scale(0.94)",
                  opacity: isActive ? 1 : 0.7,
                  filter: isActive ? "none" : "brightness(0.6)",
                }}
              >
                <Link
                  href={promo.link}
                  onClickCapture={onCardClickCapture}
                  aria-label={`${promo.title} — ${promo.price}`}
                  className={`group relative block ${aspectRatio} overflow-hidden rounded-md bg-charcoal/90 transition-shadow duration-500 ${
                    isActive
                      ? "neon-border shadow-[0_25px_70px_rgba(0,0,0,0.55)]"
                      : "border border-charcoal-line"
                  }`}
                >
                  {promo.layout === "full-poster" ? (
                    <Image
                      src={promo.image}
                      alt={`${promo.title} — ${promo.description}`}
                      fill
                      draggable={false}
                      sizes="(min-width: 1024px) 64vw, (min-width: 640px) 80vw, 94vw"
                      className="object-cover"
                    />
                  ) : promo.layout === "poster" ? (
                    <div className="grid h-full grid-cols-[42%_58%] bg-charcoal">
                      <div className="relative h-full min-w-0 bg-charcoal-soft">
                        <Image
                          src={promo.image}
                          alt={promo.title}
                          fill
                          draggable={false}
                          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 34vw, 40vw"
                          className="object-contain"
                        />
                      </div>
                      <div className="flex min-w-0 flex-col justify-center gap-1.5 p-3 sm:gap-3 sm:p-7">
                        <span className="w-fit rounded-sm bg-lacquer px-2 py-1 text-[9px] font-medium tracking-wide text-cream sm:px-3 sm:py-1.5 sm:text-xs">
                          {promo.tag}
                        </span>
                        <h3 className="font-display text-base leading-snug text-cream sm:text-2xl lg:text-3xl">
                          {promo.title}
                        </h3>
                        <p className="line-clamp-3 text-[10px] leading-relaxed text-cream/70 sm:line-clamp-4 sm:text-sm">
                          {promo.description}
                        </p>
                        <p className="font-display text-base leading-snug text-gold sm:text-2xl">
                          {promo.price}
                        </p>
                        <span className="inline-block w-fit rounded-sm border border-gold/60 px-3 py-1.5 text-[9px] tracking-wide text-gold transition-colors group-hover:border-gold-light group-hover:text-gold-light sm:px-5 sm:py-3 sm:text-xs">
                          詳しく見る
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={promo.image}
                        alt={promo.title}
                        fill
                        draggable={false}
                        sizes="(min-width: 1024px) 64vw, (min-width: 640px) 80vw, 94vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-transparent to-transparent" />

                      <span className="absolute left-4 top-4 rounded-sm bg-lacquer px-3 py-1.5 text-xs font-medium tracking-signage text-cream sm:left-6 sm:top-6 sm:text-sm">
                        {promo.tag}
                      </span>

                      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-3 sm:flex-row sm:gap-3 sm:items-end sm:justify-between sm:gap-4 sm:p-8">
                        <div className="min-w-0">
                          <h3 className="font-display text-base leading-snug text-cream sm:text-3xl lg:text-4xl">
                            {promo.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 max-w-md text-xs text-cream/85 sm:mt-2 sm:text-base">
                            {promo.description}
                          </p>
                          <p className="mt-1 font-display text-lg text-gold sm:mt-3 sm:text-3xl">
                            {promo.price}
                          </p>
                        </div>
                        <span className="inline-block w-fit shrink-0 rounded-sm border border-gold/60 px-3 py-1.5 text-xs tracking-signage text-gold transition-colors group-hover:border-gold-light group-hover:text-gold-light sm:px-5 sm:py-3 sm:text-sm">
                          詳しく見る
                        </span>
                      </div>
                    </>
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Prev / Next — desktop-oriented but always keyboard/click reachable */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous promotion"
          className="absolute left-2 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-charcoal/70 text-xl text-gold backdrop-blur transition-colors hover:border-gold-light hover:text-gold-light sm:flex"
        >
          ←
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next promotion"
          className="absolute right-2 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-charcoal/70 text-xl text-gold backdrop-blur transition-colors hover:border-gold-light hover:text-gold-light sm:flex"
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {promotions.map((promo, i) => (
          <button
            key={promo.id}
            type="button"
            aria-label={`Go to promotion ${i + 1}: ${promo.title}`}
            aria-current={i === index}
            onClick={() => scrollToIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-gold" : "w-2.5 bg-cream/25 hover:bg-cream/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
