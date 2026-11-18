"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MenuGrid } from "@/components/MenuGrid";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function MenuPageClient() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <section className="pb-6 pt-28 sm:pt-36">
          <div className="container-page">
            <p className="eyebrow mb-2">{t.nav.menu}</p>
            <h1 className="font-display text-4xl font-medium text-cream sm:text-5xl">
              {t.menuPage.title}
            </h1>
            <p className="mt-3 text-cream/60">{t.menuPage.subtitle}</p>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="container-page">
            <MenuGrid />
          </div>
        </section>

        {/* Standing notices repeated on every page of the client's printed
            menu — shown once here instead of per category. */}
        <section className="border-t border-charcoal-line bg-charcoal-soft/88 backdrop-blur-sm py-10">
          <div className="container-page space-y-2 text-center text-sm text-cream/60">
            <p>大盛り ＋200円　／　お持ち帰りの場合は箱代200円かかります。</p>
            <p>パクチー（香草、コリアンダー）苦手な方は「抜き」または「別皿」でお持ちしております。</p>
            <p>※ コース料理をご注文のお客様は、＋3,000円で飲み放題をお付けできます。</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
