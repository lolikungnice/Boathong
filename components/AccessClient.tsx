"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ADDRESS = "〒231-0015 神奈川県横浜市中区上町五丁目 7-3番馬車道ビル地下1階";
const PHONE_DISPLAY = "045-307-1288";
const PHONE_HREF = "tel:0453071288";
const MAPS_QUERY = encodeURIComponent(
  "神奈川県横浜市中区上町五丁目 7-3番馬車道ビル地下1階"
);
const MAPS_VIEW_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

export function AccessClient() {
  const { t, locale } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 sm:pt-36">
          <div className="container-page">
            <h1 className="font-display text-4xl font-medium text-cream sm:text-5xl">
              {t.access.title}
            </h1>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="container-page grid gap-10 sm:grid-cols-2">
            <div>
              <div className="mb-6">
                <p className="eyebrow mb-1">{t.access.addressLabel}</p>
                <p className="text-[15px] leading-relaxed text-cream/80">{ADDRESS}</p>
              </div>
              <div className="mb-8">
                <p className="eyebrow mb-1">{t.access.phoneLabel}</p>
                <p className="text-[15px] text-cream/80">{PHONE_DISPLAY}</p>
              </div>

              <div className="mb-8">
                <p className="eyebrow mb-1">
                  {locale === "jp" ? "営業時間" : "เวลาเปิด-ปิด"}
                </p>
                <p className="text-[15px] leading-relaxed text-cream/80">
                  {locale === "jp" ? (
                    <>
                      ランチ 11:00 - 15:00（L.O. 14:30）
                      <br />
                      ディナー 15:00 - 23:00（L.O. 22:00）
                    </>
                  ) : (
                    <>
                      ช่วงเช้า 11:00 - 15:00 (L.O. 14:30)
                      <br />
                      ช่วงเย็น 15:00 - 23:00 (L.O. 22:00)
                    </>
                  )}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={MAPS_VIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-charcoal hover:bg-gold-light"
                >
                  {t.access.mapCta}
                </a>
                <a
                  href={PHONE_HREF}
                  className="rounded-full border border-cream/30 px-6 py-3 text-sm font-medium text-cream hover:border-gold hover:text-gold"
                >
                  {t.access.callCta}
                </a>
              </div>
            </div>

            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-charcoal-line">
              <iframe
                title="boathong location map"
                src={MAPS_EMBED_URL}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
