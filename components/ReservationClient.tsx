"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const PHONE_DISPLAY = "045-307-1288";
const PHONE_HREF = "tel:0453071288";
const TABELOG_URL =
  "https://s.tabelog.com/th/kanagawa/A1401/A140104/14102019/";

export function ReservationClient() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 sm:pt-36">
          <div className="container-page">
            <h1 className="font-display text-4xl font-medium text-cream sm:text-5xl">
              {t.reservation.title}
            </h1>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="container-page grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-charcoal-line bg-charcoal-soft/88 backdrop-blur-sm p-8">
              <h2 className="font-display text-xl text-cream">
                {t.reservation.byPhone}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                {t.reservation.byPhoneBody}
              </p>
              <a
                href={PHONE_HREF}
                className="mt-6 inline-block rounded-full bg-gold px-6 py-3 text-sm font-medium text-charcoal hover:bg-gold-light"
              >
                {t.reservation.callCta} · {PHONE_DISPLAY}
              </a>
            </div>

            <div className="rounded-2xl border border-charcoal-line bg-charcoal-soft/88 backdrop-blur-sm p-8">
              <h2 className="font-display text-xl text-cream">
                {t.reservation.byTabelog}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                {t.reservation.byTabelogBody}
              </p>
              <a
                href={TABELOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full border border-cream/30 px-6 py-3 text-sm font-medium text-cream hover:border-gold hover:text-gold"
              >
                {t.reservation.tabelogCta}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
