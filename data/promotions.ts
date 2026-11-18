export interface Promotion {
  id: string;
  image: string; // path under /public/promotions/
  tag: string;
  title: string;
  description: string;
  price: string;
  link: string;
  layout?: "poster" | "full-poster";
}

// To swap a promo photo: replace the file at the given path under
// /public/promotions/ (keep the same filename) — no code changes needed.
// To add a new promotion: copy one of the objects below, give it a unique
// `id`, and drop a new image in /public/promotions/.
export const promotions: Promotion[] = [
  {
    id: "street-food-special",
    image: "/promotions/street-food-set.jpg",
    tag: "屋台の人気メニュー",
    title: "タイ屋台フードスペシャル",
    description: "パッタイ、ソムタム、トムヤムクンS、ガイヤーン、シンハービール。各単品価格を掲載しています。",
    price: "単品合計 ¥6,732（税込）",
    link: "/menu",
    layout: "poster",
  },
  {
    id: "kids-menu",
    image: "/promotions/kids-menu.jpg",
    tag: "お子様メニュー",
    title: "お子様セット",
    description: "エビチャーハンと、半分にカットしたエビのすり身揚げ1個をソースと一緒に。サラダ、スープ、ミニオレンジジュース付き。",
    price: "¥1,200",
    link: "/menu#kids-set",
  },
  {
    id: "fresh-coconut-water",
    image: "/promotions/promotion-03.jpg",
    tag: "おすすめ",
    title: "フレッシュココナッツウォーター",
    description: "獲れたてのココナッツをその場でカット、南国の爽やかな一杯。",
    price: "¥700（税込¥770）",
    link: "/menu",
  },
  {
    id: "lunch-set",
    image: "/promotions/promotion-04.jpg",
    tag: "ランチ限定",
    title: "ランチセット",
    description: "月〜金限定。サラダ・デザート・ドリンクは各＋100円で追加できます。",
    price: "¥1,100〜¥1,200",
    link: "/menu",
    layout: "full-poster",
  },
];
