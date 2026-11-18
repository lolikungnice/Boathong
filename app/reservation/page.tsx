import type { Metadata } from "next";
import { ReservationClient } from "@/components/ReservationClient";

export const metadata: Metadata = {
  title: "予約 | boathong / ボアトウン",
  description: "boathong / ボアトウンのご予約はお電話またはTabelogから。",
};

export default function ReservationPage() {
  return <ReservationClient />;
}
