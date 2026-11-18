"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function ContactClient() {
  const { locale } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 sm:pt-36">
          <div className="container-page">
            <h1 className="font-display text-4xl font-medium text-cream sm:text-5xl">
              {locale === "jp" ? "お問い合わせ" : "ติดต่อเรา"}
            </h1>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="container-page max-w-md space-y-6">
            <div>
              <p className="eyebrow mb-1">
                {locale === "jp" ? "電話番号" : "โทรศัพท์"}
              </p>
              <a href="tel:0453071288" className="text-cream/80 hover:text-gold">
                045-307-1288
              </a>
            </div>
            <div>
              <p className="eyebrow mb-1">
                {locale === "jp" ? "住所" : "ที่อยู่"}
              </p>
              <p className="text-[15px] leading-relaxed text-cream/80">
                〒231-0015 神奈川県横浜市中区上町五丁目 7-3番馬車道ビル地下1階
              </p>
            </div>
            <div>
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
            <div>
              <p className="eyebrow mb-1">SNS</p>
              <a
                href="https://www.facebook.com/@AdunChuenchon/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-cream/80 hover:text-gold"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/boathong.8631908?stkn=MzdpZjZ2dzRqOWM5"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-cream/80 hover:text-gold"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
