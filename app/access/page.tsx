import type { Metadata } from "next";
import { AccessClient } from "@/components/AccessClient";

export const metadata: Metadata = {
  title: "アクセス | boathong / ボアトウン",
  description: "boathong / ボアトウンへの地図とアクセス方法、電話番号のご案内。",
};

export default function AccessPage() {
  return <AccessClient />;
}
