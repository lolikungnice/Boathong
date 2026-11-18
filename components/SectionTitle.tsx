import Link from "next/link";
import type { ReactNode } from "react";

interface SectionTitleProps {
  eyebrow: string;
  title: ReactNode;
  linkHref?: string;
  linkLabel?: string;
}

export function SectionTitle({ eyebrow, title, linkHref, linkLabel }: SectionTitleProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h2 className="font-display text-3xl font-medium text-cream sm:text-4xl">
          {title}
        </h2>
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="text-sm text-cream/70 underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
