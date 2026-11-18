import type { Metadata } from "next";
import { AboutClient } from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "お店について | boathong / ボアトウン",
  description:
    "横浜でタイのストリートフードを20年提供してきたboathong / ボアトウンについて。",
};

export default function AboutPage() {
  return <AboutClient />;
}
