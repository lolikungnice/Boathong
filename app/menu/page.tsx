import type { Metadata } from "next";
import { MenuPageClient } from "@/components/MenuPageClient";

export const metadata: Metadata = {
  title: "メニュー | boathong / ボアトウン",
  description:
    "タイ屋台料理、メイン料理、サラダ、デザート、ドリンクなど、boathongのメニュー一覧。",
};

export default function MenuPage() {
  return <MenuPageClient />;
}
