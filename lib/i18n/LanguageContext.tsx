"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { dictionary, type Locale } from "./dictionary";

interface LanguageContextValue {
  locale: Locale;
  t: (typeof dictionary)[Locale];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// Thai language support was removed — the site is Japanese-only now.
// Kept as a Context (rather than ripping out every `t.xxx` call site) so
// every existing component keeps working unchanged; this just always
// resolves to the Japanese dictionary.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const value = useMemo<LanguageContextValue>(() => ({ locale: "jp", t: dictionary.jp }), []);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
