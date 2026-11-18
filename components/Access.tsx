"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";

const MAPS_QUERY = encodeURIComponent(
  "神奈川県横浜市中区上町五丁目 7-3番馬車道ビル地下1階"
);
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

export function Access() {
  return (
    <section className="bg-charcoal/90 py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="flex items-center justify-center gap-5 text-center">
          <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-gold/50 sm:block" />
          <div>
            <p className="eyebrow mb-2">ACCESS</p>
            <h2 className="font-display text-3xl font-medium text-cream sm:text-4xl">
              店舗情報
            </h2>
          </div>
          <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-gold/50 sm:block" />
        </Reveal>

        <Reveal className="mt-14 grid gap-8 lg:grid-cols-3">
          {/* 1. Restaurant information */}
          <div className="rounded-sm border-t-2 border-gold bg-charcoal-soft/88 backdrop-blur-sm p-8">
            <p className="font-display text-xl text-cream">BOATHONG</p>
            <p className="text-sm text-gold">ボアトウン</p>
            <div className="my-5 h-px bg-gradient-to-r from-gold/60 via-gold/10 to-transparent" />

            <div className="flex gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="mt-0.5 shrink-0 text-gold" aria-hidden="true">
                <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="9.5" r="2.3" />
              </svg>
              <p className="text-sm leading-relaxed text-cream/75">
                〒231-0015
                <br />
                神奈川県横浜市中区上町五丁目
                <br />
                7-3番馬車道ビル地下1階
              </p>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0 text-gold" aria-hidden="true">
                <path d="M4 5c0-1 1-2 2-2h2l2 5-2 1.5a11 11 0 0 0 6 6L15.5 14l5 2v2c0 1-1 2-2 2C10.5 20 4 13.5 4 5Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <a
                href="tel:0453071288"
                className="text-cream/85 transition-colors hover:text-lacquer-bright"
              >
                045-307-1288
              </a>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="mt-0.5 shrink-0 text-gold" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="text-sm leading-relaxed text-cream/75">
                  ランチ 11:00 - 15:00（L.O. 14:30）
                  <br />
                  ディナー 15:00 - 23:00（L.O. 22:00）
                </p>
              </div>
            </div>
          </div>

          {/* 2. Map */}
          <div className="overflow-hidden rounded-sm border-t-2 border-lacquer">
            <iframe
              title="boathong location map"
              src={MAPS_EMBED_URL}
              className="h-full min-h-[260px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* 3. Restaurant interior photo */}
          <div className="relative min-h-[260px] overflow-hidden rounded-sm border-t-2 border-gold bg-charcoal-soft/88 backdrop-blur-sm">
            <Image
              src="/images/about.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="mt-10 text-center">
          <Link
            href="/access"
            className="inline-block text-sm tracking-signage text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-light"
          >
            地図とアクセス方法を見る →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
