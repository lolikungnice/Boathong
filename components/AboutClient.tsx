"use client";

import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { PaymentMethods } from "@/components/PaymentMethods";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function AboutClient() {
  const { t, locale } = useLanguage();
  const points = Object.values(t.about.points);

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 sm:pt-36">
          <div className="container-page">
            <p className="eyebrow mb-2">{t.about.eyebrow}</p>
            <h1 className="font-display text-4xl font-medium text-cream sm:text-5xl">
              {t.about.title}
            </h1>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <Reveal className="container-page grid gap-10 sm:grid-cols-2 sm:items-center">
            {/* Two real photos side by side: the previous shop interior and the building exterior */}
            <div className="grid grid-cols-2 gap-3 sm:order-2">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-charcoal-soft/88 backdrop-blur-sm">
                <Image
                  src="/images/about/interior.jpg"
                  alt={locale === "jp" ? "以前の店舗の様子" : "บรรยากาศร้านเดิม"}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-charcoal-soft/88 backdrop-blur-sm">
                <Image
                  src="/images/about/building.jpg"
                  alt={locale === "jp" ? "ビルの外観" : "ภาพอาคารภายนอก"}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="sm:order-1">
              <p className="max-w-prose text-[15px] leading-relaxed text-cream/75">
                {t.about.body1}
              </p>
              <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-cream/75">
                {t.about.body2}
              </p>
            </div>
          </Reveal>
        </section>

        <section className="border-t border-charcoal-line bg-charcoal-soft/88 backdrop-blur-sm py-14">
          <Reveal className="container-page grid grid-cols-2 gap-6 sm:grid-cols-5">
            {points.map((point) => (
              <div
                key={point}
                className="rounded-xl border border-charcoal-line px-4 py-5 text-center text-sm text-cream/75"
              >
                {point}
              </div>
            ))}
          </Reveal>
        </section>

        {/* Awards & Recognition — Thai Select certification from Thailand's
            Ministry of Commerce (Department of International Trade Promotion) */}
        <section className="py-16 sm:py-20">
          <Reveal className="container-page">
            <p className="eyebrow mb-2">AWARDS &amp; RECOGNITION</p>
            <h2 className="font-display text-2xl font-medium text-cream sm:text-3xl">
              {locale === "jp" ? "「Thai Select」認定レストラン" : 'ร้านที่ได้รับการรับรอง "Thai Select"'}
            </h2>
            <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-cream/75">
              {locale === "jp" ? (
                <>
                  boathongは、タイ王国商務省 国際貿易促進局（DITP）より、本場の味と品質を証明する
                  「Thai Select」の認定を受けています（認定期間：2024年9月〜2027年8月）。
                </>
              ) : (
                <>
                  boathong ได้รับการรับรองมาตรฐาน "Thai Select" จากกรมส่งเสริมการค้าระหว่างประเทศ
                  (DITP) กระทรวงพาณิชย์ ประเทศไทย ซึ่งรับประกันรสชาติและคุณภาพต้นตำรับ
                  (ระยะเวลารับรอง: กันยายน 2024 - สิงหาคม 2027)
                </>
              )}
            </p>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-cream/50">
              {locale === "jp"
                ? "※ 過去にも2011〜2012年に同賞を受賞した実績があります（店舗資料より）。"
                : "※ เคยได้รับรางวัลเดียวกันนี้มาแล้วในช่วงปี 2011-2012 เช่นกัน (อ้างอิงจากเอกสารของร้าน)"}
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="relative aspect-[10/9] overflow-hidden rounded-sm neon-border bg-charcoal-soft/88 backdrop-blur-sm">
                <Image
                  src="/images/awards/thai-select-award-photo.jpg"
                  alt={locale === "jp" ? "Thai Select認定証を手にする様子" : "ภาพถ่ายคู่กับใบรับรอง Thai Select"}
                  fill
                  sizes="(min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[10/9] overflow-hidden rounded-sm neon-border bg-charcoal-soft/88 backdrop-blur-sm">
                <Image
                  src="/images/awards/thai-select-certificate.png"
                  alt="Thai Select certificate awarded to boathong by the Royal Thai Government Ministry of Commerce"
                  fill
                  sizes="(min-width: 640px) 45vw, 100vw"
                  className="object-contain p-4"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <PaymentMethods />
      </main>
      <Footer />
    </>
  );
}
