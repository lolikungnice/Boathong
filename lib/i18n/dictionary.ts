export type Locale = "jp" | "th";

export const locales: Locale[] = ["jp", "th"];
export const defaultLocale: Locale = "jp";

// Every user-facing string lives here. Components should never hard-code
// JP/TH text inline — pull from this dictionary via useLanguage().
export const dictionary = {
  jp: {
    nav: {
      home: "ホーム",
      menu: "メニュー",
      about: "お店について",
      access: "アクセス",
      reserve: "予約する",
    },
    hero: {
      title: "boathong",
      titleJP: "ボアトウン",
      tagline: "本場のタイの味を、横浜で。",
      description:
        "タイのストリートフードを、カジュアルに楽しめるタイ料理店。本場の味と屋台の雰囲気を横浜でお楽しみください。",
      ctaMenu: "メニューを見る",
      ctaReserve: "予約する",
    },
    home: {
      aboutEyebrow: "お店について",
      aboutTitle: "横浜で20年、変わらない屋台の味",
      aboutBody:
        "boathong / ボアトウンは、横浜・関内で長く愛されてきたタイ料理店です。現地の屋台で食べるような、香り高くスパイシーな一皿を、日本のお客様にも親しみやすい形でお届けしています。",
      aboutLink: "お店の詳細を見る",
      menuEyebrow: "メニュー",
      menuTitle: "人気の一皿",
      menuLink: "メニュー全体を見る",
      accessEyebrow: "アクセス",
      accessTitle: "関内駅からすぐ",
      accessLink: "地図とアクセス方法を見る",
      reserveEyebrow: "予約",
      reserveTitle: "お電話またはネットでご予約ください",
      reserveLink: "予約ページへ",
    },
    menuPage: {
      title: "メニュー",
      subtitle: "タイ屋台の味を、一皿ずつ。",
      spicy: "辛さ",
    },
    about: {
      title: "お店について",
      eyebrow: "boathong / ボアトウン",
      body1:
        "boathongは、横浜でタイのストリートフードを提供するタイ料理店です。開業から約20年、現地の屋台に着想を得たメニューと、気取らないカジュアルな雰囲気を大切にしてきました。",
      body2:
        "本場の香辛料とハーブを使った、驚くほど本格的な味わい。辛さの調整も可能なので、辛い物が苦手な方にも安心してお楽しみいただけます。タイ王国商務省より「Thai Select」認定を受けており、本場の味であることが公式に証明されています。",
      points: {
        authentic: "本場の味を追求",
        streetFood: "タイ屋台料理が中心",
        casual: "気軽に立ち寄れる雰囲気",
        culture: "タイの文化を感じる空間",
        friendly: "日本のお客様にも優しい接客",
      },
    },
    access: {
      title: "アクセス",
      addressLabel: "住所",
      phoneLabel: "電話番号",
      mapCta: "地図を見る",
      callCta: "電話する",
    },
    reservation: {
      title: "予約",
      byPhone: "お電話でのご予約",
      byPhoneBody: "下記の電話番号までお気軽にご連絡ください。",
      byTabelog: "ネット予約（食べログ）",
      byTabelogBody: "食べログから24時間ご予約いただけます。",
      tabelogCta: "食べログで予約する",
      callCta: "電話する",
    },
    footer: {
      hours: "ランチ 11:00-15:00（L.O.14:30）／ディナー 15:00-23:00（L.O.22:00）",
      rights: "All rights reserved.",
    },
  },
  th: {
    nav: {
      home: "หน้าแรก",
      menu: "เมนู",
      about: "เกี่ยวกับเรา",
      access: "แผนที่",
      reserve: "จองโต๊ะ",
    },
    hero: {
      title: "boathong",
      titleJP: "ボアトウン",
      tagline: "รสชาติไทยแท้ ที่โยโกฮาม่า",
      description:
        "ร้านอาหารไทยที่ให้คุณเพลิดเพลินกับ Thai Street Food แบบสบาย ๆ สัมผัสรสชาติต้นตำรับและบรรยากาศริมทางที่โยโกฮาม่า",
      ctaMenu: "ดูเมนู",
      ctaReserve: "จองโต๊ะ",
    },
    home: {
      aboutEyebrow: "เกี่ยวกับเรา",
      aboutTitle: "20 ปีแห่งรสชาติริมทางที่โยโกฮาม่า",
      aboutBody:
        "boathong / ボアトウン คือร้านอาหารไทยที่อยู่คู่ย่านคันไนมาอย่างยาวนาน มอบเมนูรสจัดจ้านหอมกรุ่นแบบร้านข้างทางในเมืองไทย ในรูปแบบที่ลูกค้าชาวญี่ปุ่นเข้าถึงง่าย",
      aboutLink: "อ่านเพิ่มเติมเกี่ยวกับร้าน",
      menuEyebrow: "เมนู",
      menuTitle: "เมนูแนะนำ",
      menuLink: "ดูเมนูทั้งหมด",
      accessEyebrow: "แผนที่",
      accessTitle: "ใกล้สถานีคันไน",
      accessLink: "ดูแผนที่และวิธีเดินทาง",
      reserveEyebrow: "จองโต๊ะ",
      reserveTitle: "จองผ่านโทรศัพท์หรือออนไลน์",
      reserveLink: "ไปหน้าจองโต๊ะ",
    },
    menuPage: {
      title: "เมนู",
      subtitle: "รสชาติร้านข้างทางไทย ทีละจาน",
      spicy: "ระดับความเผ็ด",
    },
    about: {
      title: "เกี่ยวกับเรา",
      eyebrow: "boathong / ボアトウン",
      body1:
        "boathong เป็นร้านอาหารไทยสไตล์ Street Food ในโยโกฮาม่า เปิดให้บริการมาเกือบ 20 ปี ด้วยเมนูที่ได้แรงบันดาลใจจากร้านข้างทางในเมืองไทย และบรรยากาศสบาย ๆ ไม่เป็นทางการ",
      body2:
        "ใช้เครื่องเทศและสมุนไพรแท้จากเมืองไทย รสชาติเข้มข้นต้นตำรับ ปรับระดับความเผ็ดได้ตามต้องการ เหมาะกับทุกคนแม้ไม่ถนัดอาหารเผ็ด ร้านได้รับการรับรอง \"Thai Select\" จากกระทรวงพาณิชย์ประเทศไทย ยืนยันความเป็นต้นตำรับ",
      points: {
        authentic: "รสชาติต้นตำรับ",
        streetFood: "เน้นอาหาร Street Food",
        casual: "บรรยากาศสบาย เป็นกันเอง",
        culture: "สัมผัสวัฒนธรรมไทย",
        friendly: "ต้อนรับลูกค้าชาวญี่ปุ่นเป็นอย่างดี",
      },
    },
    access: {
      title: "แผนที่และการเดินทาง",
      addressLabel: "ที่อยู่",
      phoneLabel: "โทรศัพท์",
      mapCta: "ดูแผนที่",
      callCta: "โทรหาเรา",
    },
    reservation: {
      title: "จองโต๊ะ",
      byPhone: "จองผ่านโทรศัพท์",
      byPhoneBody: "โทรจองได้โดยตรงที่เบอร์ด้านล่าง",
      byTabelog: "จองออนไลน์ (Tabelog)",
      byTabelogBody: "จองผ่าน Tabelog ได้ตลอด 24 ชั่วโมง",
      tabelogCta: "จองผ่าน Tabelog",
      callCta: "โทรหาเรา",
    },
    footer: {
      hours: "ช่วงเช้า 11:00-15:00 (L.O.14:30) / ช่วงเย็น 15:00-23:00 (L.O.22:00)",
      rights: "สงวนลิขสิทธิ์",
    },
  },
} as const;

export type Dictionary = typeof dictionary.jp;
