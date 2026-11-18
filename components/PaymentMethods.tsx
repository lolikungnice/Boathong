"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal } from "./Reveal";

// The logo collage (public/images/payment/cashless.jpg) is a third-party
// industry chart supplied by the owner; the text chips below are the shop's
// own list of accepted brands. If the two ever disagree, edit the chips
// (or swap the image) so customers aren't shown brands the shop doesn't take.
const groups = [
  {
    jp: "カード決済",
    th: "บัตรเครดิต/เดบิต",
    items: ["VISA", "Mastercard", "JCB", "American Express", "Diners Club", "UnionPay", "タッチ決済"],
  },
  {
    jp: "電子マネー",
    th: "อีมันนี่",
    items: ["iD", "WAON", "QUICPay"],
  },
  {
    jp: "交通系電子マネー",
    th: "บัตร IC ระบบขนส่ง",
    items: ["Kitaca", "Suica", "PASMO", "TOICA", "manaca", "ICOCA", "SUGOCA", "nimoca", "はやかけん"],
  },
  {
    jp: "コード決済",
    th: "คิวอาร์โค้ด/แอปจ่ายเงิน",
    items: [
      "ゆうちょPay",
      "au PAY",
      "d払い",
      "J-Coin Pay",
      "PayPay",
      "メルペイ",
      "楽天ペイ",
      "LINE Pay",
      "Alipay",
      "WeChat Pay",
    ],
  },
];

export function PaymentMethods() {
  const { locale } = useLanguage();

  return (
    <section className="border-t border-charcoal-line bg-charcoal/90 py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-2">PAYMENT</p>
          <h2 className="font-display text-2xl font-medium text-cream sm:text-3xl">
            {locale === "jp" ? "ご利用いただける決済方法" : "ช่องทางการชำระเงินที่รองรับ"}
          </h2>
        </Reveal>

        <Reveal className="mt-10">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-sm border border-gold/30 bg-white">
            <Image
              src="/images/payment/cashless.jpg"
              alt="ご利用いただけるキャッシュレス決済のロゴ一覧（カード・QRコード・電子マネー・交通系電子マネー）"
              width={1400}
              height={934}
              sizes="(min-width: 768px) 768px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>

        <Reveal className="mt-10 grid gap-8 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.jp} className="rounded-sm border border-charcoal-line bg-charcoal-soft/88 backdrop-blur-sm p-6">
              <p className="text-sm tracking-signage text-gold">
                {locale === "jp" ? group.jp : group.th}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-gold/30 px-3 py-1.5 text-xs text-cream/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        <p className="mt-6 text-xs text-cream/40">
          {locale === "jp" ? "※ PiTaPaは除く" : "※ ไม่รองรับ PiTaPa"}
        </p>
      </div>
    </section>
  );
}
