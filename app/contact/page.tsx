import type { Metadata } from "next";
import { ContactClient } from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "お問い合わせ | boathong / ボアトウン",
  description: "boathong / ボアトウンへのお問い合わせ先。",
};

export default function ContactPage() {
  return <ContactClient />;
}
