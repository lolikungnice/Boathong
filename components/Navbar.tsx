"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Nav labels are deliberately fixed English caps (HOME / MENU / ABOUT / ACCESS)
// to match the signage-style branding in the reference direction — the
// reservation button still localizes via the dictionary.
const links = [
  { href: "/", label: "HOME" },
  { href: "/menu", label: "MENU" },
  { href: "/about", label: "ABOUT" },
  { href: "/access", label: "ACCESS" },
];

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-charcoal-line/80 bg-charcoal/95 backdrop-blur"
          : "border-b border-transparent bg-gradient-to-b from-charcoal/70 to-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        {/* Real logo mark (circular Thai/JP badge with lotus pond + Mt. Fuji motif) */}
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="BOATHONG / ボアトウン"
            width={48}
            height={48}
            className="h-10 w-10 sm:h-12 sm:w-12"
            priority
          />
          <Image
            src="/images/logo-wordmark.png"
            alt="Boathong / ボアトウン"
            width={1115}
            height={602}
            className="h-8 w-auto sm:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] tracking-signage transition-colors ${
                  active ? "text-gold" : "text-cream/80 hover:text-gold-light"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/reservation"
            className="neon-border rounded-sm bg-lacquer px-5 py-2 text-sm font-medium tracking-signage text-cream transition-colors hover:bg-lacquer-bright"
          >
            {t.nav.reserve}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-cream transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-cream transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-charcoal-line/80 bg-charcoal md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-sm px-3 py-3 text-sm tracking-signage ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-cream/85 hover:bg-charcoal-soft"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reservation"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-sm bg-lacquer px-4 py-3 text-center text-sm font-medium tracking-signage text-cream"
            >
              {t.nav.reserve}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
