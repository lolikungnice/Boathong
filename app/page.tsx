import type { Metadata } from "next";
import { HomeClient } from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "boathong | ボアトウン | 横浜のタイ料理・タイ屋台料理",
  description:
    "横浜で本場のタイ料理とタイ屋台料理を楽しめる「boathong / ボアトウン」。関内駅近くのタイストリートフードレストラン。",
};

export default function HomePage() {
  return <HomeClient />;
}
