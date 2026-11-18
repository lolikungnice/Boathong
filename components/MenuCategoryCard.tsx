import Image from "next/image";
import Link from "next/link";

interface MenuCategoryCardProps {
  href: string;
  image: string;
  labelEn: string;
  labelJp: string;
}

export function MenuCategoryCard({ href, image, labelEn, labelJp }: MenuCategoryCardProps) {
  return (
    <Link
      href={href}
      className="group neon-border relative block overflow-hidden rounded-sm bg-charcoal-soft/88 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1.5"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={image}
          alt={labelEn}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div>
          <p className="text-xs tracking-signage text-gold">{labelEn}</p>
          <p className="mt-1 font-display text-lg text-cream">{labelJp}</p>
        </div>
        <span className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold transition-all duration-300 group-hover:translate-x-1 group-hover:border-gold-light group-hover:text-gold-light">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
