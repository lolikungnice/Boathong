import type { Metadata } from "next";
import { Noto_Serif_JP, Noto_Sans_JP, Monoton } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { PageBackground } from "@/components/PageBackground";

const displayJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display-jp",
  display: "swap",
});

const bodyJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-jp",
  display: "swap",
});

// Hand-painted neon-tube look for the BOATHONG wordmark specifically.
// Used sparingly (hero + neon banner), never for body copy.
const neonDisplay = Monoton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-neon",
  display: "swap",
});

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
    <html
      lang="ja"
      className={`${displayJP.variable} ${bodyJP.variable} ${neonDisplay.variable}`}
    >
      <body>
        <PageBackground />
        <LanguageProvider>
          <div className="relative z-10">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
