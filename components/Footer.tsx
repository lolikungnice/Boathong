"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t, locale } = useLanguage();

  return (
    // The section itself (bg-charcoal) stays solid — see the note on
    // PageBackground overlay compounding below — but a food photo now
    // sits inside it as its own layer, with its own dedicated dark
    // overlay so the logo/text on top stay fully legible either way.
    <footer className="relative overflow-hidden border-t border-charcoal-line bg-charcoal">
      <Image
        src="/images/footer-food.jpg"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/80 to-charcoal/95" />

      <div className="container-page relative flex flex-col items-center py-16 text-center">
        <Image
          src="/logo.png"
          alt="BOATHONG / ボアトウン"
          width={88}
          height={88}
          className="h-20 w-20 sm:h-24 sm:w-24"
        />
        <Image
          src="/images/logo-wordmark.png"
          alt="Boathong / ボアトウン"
          width={1115}
          height={602}
          className="mt-4 h-10 w-auto sm:h-12"
        />
        <p className="mt-4 text-sm text-cream/60">
          {locale === "jp" ? "本場のタイ料理を、横浜で。" : "รสชาติไทยแท้ ที่โยโกฮาม่า"}
        </p>

        {/* Social icons */}
        <div className="mt-7 flex items-center gap-5">
          <a
            href="https://www.facebook.com/@AdunChuenchon/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:border-gold-light hover:text-gold-light"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/boathong.8631908?stkn=MzdpZjZ2dzRqOWM5"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:border-gold-light hover:text-gold-light"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0Zm0 5.35A6.65 6.65 0 1 0 12 18.65 6.65 6.65 0 0 0 12 5.35Zm0 10.97A4.32 4.32 0 1 1 12 7.68a4.32 4.32 0 0 1 0 8.64Zm6.9-11.2a1.56 1.56 0 1 1-3.12 0 1.56 1.56 0 0 1 3.12 0Z" />
            </svg>
          </a>
        </div>

        {/* Sitemap */}
        <nav className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs tracking-signage text-cream/60">
          <Link href="/" className="hover:text-gold">
            HOME
          </Link>
          <Link href="/menu" className="hover:text-gold">
            MENU
          </Link>
          <Link href="/about" className="hover:text-gold">
            ABOUT
          </Link>
          <Link href="/access" className="hover:text-gold">
            ACCESS
          </Link>
          <Link href="/reservation" className="hover:text-gold">
            {t.nav.reserve}
          </Link>
          <Link href="/contact" className="hover:text-gold">
            CONTACT
          </Link>
        </nav>

        <div className="mt-10 w-full max-w-xs border-t border-charcoal-line pt-6 text-xs text-cream/40">
          © {new Date().getFullYear()} BOATHONG Thai Restaurant.
          <br />
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}
