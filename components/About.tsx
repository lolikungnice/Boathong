"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal } from "./Reveal";

export function About() {
  const { locale } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-charcoal/90 py-24 sm:py-32">
      {/* Faint decorative lattice — kept subtle, never competes with the text. */}
      <div className="thai-pattern pointer-events-none absolute inset-0 opacity-[0.06]" />

      <div className="container-page relative grid gap-10 lg:grid-cols-[auto_1fr_1.15fr] lg:items-center lg:gap-8">
        {/* Large vertical Japanese/Thai-inspired typography */}
        <Reveal className="hidden lg:block">
          <p
            className="font-display text-4xl font-medium leading-[1.4] text-gold/80"
            style={{ writingMode: "vertical-rl" }}
          >
            {locale === "jp" ? "タイの夜を、横浜で。" : "ค่ำคืนแบบไทย ที่โยโกฮาม่า"}
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          <div className="relative aspect-square overflow-hidden rounded-sm neon-border lg:aspect-[4/3]">
            <Image
              src="/images/about.jpg"
              alt={locale === "jp" ? "以前の店舗の様子" : "บรรยากาศร้านเดิม"}
              fill
              sizes="(min-width: 1024px) 26vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-sm neon-border lg:aspect-[4/3]">
            <Image
              src="/images/about/building.jpg"
              alt={locale === "jp" ? "ビルの外観" : "ภาพอาคารภายนอก"}
              fill
              sizes="(min-width: 1024px) 26vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal>
          <p className="eyebrow mb-2">ABOUT US</p>
          <h2 className="flex items-center gap-4 font-display text-3xl font-medium text-cream sm:text-4xl">
            私たちについて
            <span className="hidden h-px flex-1 bg-gradient-to-r from-gold/50 to-transparent sm:block" />
          </h2>
          <p className="mt-6 max-w-prose text-[15px] leading-loose text-cream/75">
            {locale === "jp" ? (
              <>
                ボアトウンは、横浜・馬車道にある
                本格的なタイ料理レストランです。開業から約20年、
                変わらない味を守り続けています。
                <br />
                <br />
                タイ王国商務省より「Thai Select」認定を受けた、
                本場の味をお楽しみください。
              </>
            ) : (
              <>
                boathong เป็นร้านอาหารไทยแท้ ตั้งอยู่ที่ย่านบาชามิจิ
                เมืองโยโกฮาม่า เปิดให้บริการมาเกือบ 20 ปี
                <br />
                <br />
                ได้รับการรับรอง "Thai Select" จากกระทรวงพาณิชย์ประเทศไทย
                รับประกันรสชาติต้นตำรับ
              </>
            )}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-sm border border-gold/40 bg-gold/5 px-3 py-2 text-xs text-gold">
            <span aria-hidden="true">🏅</span>
            <span>Thai Select Certified — Ministry of Commerce, Thailand</span>
          </div>
          <Link
            href="/about"
            className="mt-8 inline-block rounded-sm border border-gold/70 px-7 py-3 text-sm tracking-signage text-gold transition-colors hover:border-gold-light hover:bg-gold/10 hover:text-gold-light"
          >
            {locale === "jp" ? "詳しく見る →" : "อ่านเพิ่มเติม →"}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
