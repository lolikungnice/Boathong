import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { PageBackground } from "@/components/PageBackground";

export const metadata: Metadata = {
  metadataBase: new URL("https://boathong.example.com"),
  title: "boathong | ボアトウン | 横浜のタイ料理・タイ屋台料理",
  description:
    "横浜で本場のタイ料理とタイ屋台料理を楽しめる「boathong / ボアトウン」。",
  openGraph: {
    title: "boathong | ボアトウン",
    description:
      "横浜で本場のタイ料理とタイ屋台料理を楽しめる「boathong / ボアトウン」。",
    url: "https://boathong.example.com",
    siteName: "boathong",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "boathong / ボアトウン",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <PageBackground />
        <LanguageProvider>
          <div className="relative z-10">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
