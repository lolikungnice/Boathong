export interface FeaturedFood {
  id: string;
  name: string; // Japanese dish name
  englishName: string;
  description: string;
  category: string;
  price: string; // pre-formatted, e.g. "¥1,200"
  image: string;
  tag: "おすすめ" | "人気" | "NEW";
}

// Share image paths with the full menu when the featured dish matches a menu item.
export const featuredFoods: FeaturedFood[] = [
  {
    id: "gapao-rice",
    name: "ガパオライス",
    englishName: "Thai Basil Chicken",
    description: "香り豊かなバジルと鶏ひき肉、目玉焼きをのせた本格タイ料理。",
    category: "本格タイ料理",
    price: "¥1,408",
    image: "/images/menu/gapao-rice.jpg",
    tag: "おすすめ",
  },
  {
    id: "tom-yum-kung",
    name: "トムヤムクン",
    englishName: "Tom Yum Goong",
    description: "酸味と辛味が効いた、タイを代表する海老の名物スープ。",
    category: "本格タイ料理",
    price: "¥1,738",
    image: "/images/menu/tom-yum-kung.jpg",
    tag: "人気",
  },
  {
    id: "pad-thai",
    name: "パッタイ",
    englishName: "Pad Thai",
    description: "海老入りの米麺を甘酸っぱいタレで炒めた、タイ屋台の定番。",
    category: "タイ屋台料理",
    price: "¥1,518",
    image: "/images/menu/pad-thai.jpg",
    tag: "人気",
  },
  {
    id: "khao-soi",
    name: "カオソーイ",
    englishName: "Khao Soi",
    description: "北タイ風ココナッツカレー麺、揚げ麺をトッピング。",
    category: "本格タイ料理",
    price: "¥1,628",
    image: "/images/menu/khao-soi.jpg",
    tag: "NEW",
  },
];
