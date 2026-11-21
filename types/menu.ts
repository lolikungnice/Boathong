// Core domain types. Keep UI components reading from these types only —
// never re-declare menu or order shapes inline in a component.

export type MenuCategoryId =
  | "lunch"
  | "friedSnacks"
  | "salads"
  | "soup"
  | "singleDish"
  | "curry"
  | "otherDishes"
  | "drinks"
  | "desserts"
  | "streetFoodSet"
  | "kidsSet"
  | "courses";

export type SpicyLevel = 0 | 1 | 2 | 3;

export type MenuBadge = "おすすめ" | "人気";

export interface MenuItem {
  id: string;
  nameJP: string;
  nameTH: string;
  description: {
    jp: string;
    th: string;
  };
  courseDishes?: { jp: string[]; th: string[] };
  price: string; // pre-formatted, e.g. "¥1,408（税込）" or "S ¥1,518（2人前） / L ¥2,948（4人前）"
  image: string; // path under /public/images or remote URL
  imageFit?: "cover" | "contain";
  category: MenuCategoryId;
  spicyLevel: SpicyLevel;
  available: boolean;
  badge?: MenuBadge; // optional おすすめ/人気 ribbon, as shown on the printed menu
}

// --- Forward-looking types for the future QR order / kitchen system. ---
// Not wired up yet, but declared now so the data model doesn't have to
// change shape later: Customer -> QR Order -> Waiter -> Kitchen -> Payment.

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "cooking"
  | "ready"
  | "served"
  | "paid";

export interface OrderLineItem {
  menuId: string;
  quantity: number;
  spicyLevel: SpicyLevel;
  note?: string;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderLineItem[];
  status: OrderStatus;
  createdAt: string; // ISO timestamp
}
