// Lunch Set options (Mon–Fri lunch only). Change prices/labels here —
// the builder component and the pricing logic both read from this file.

export const OVERSIZE_EXTRA_YEN = 200; // 大盛り

export type LunchSetId = "A" | "B" | "FULL";
export type SetCategoryId = "salad" | "dessert" | "drink";

export interface LunchSetDef {
  id: LunchSetId;
  label: string; // "SET A"
  extraYen: number;
  pickCount: 1 | 2 | 3; // how many of salad / dessert / drink are included
  tagline: string;
}

export const lunchSets: LunchSetDef[] = [
  { id: "A", label: "SET A", extraYen: 100, pickCount: 1, tagline: "3つの中から1つ選べる" },
  { id: "B", label: "SET B", extraYen: 200, pickCount: 2, tagline: "3つの中から2つ選べる" },
  { id: "FULL", label: "FULL SET", extraYen: 300, pickCount: 3, tagline: "3つすべて付く" },
];

export interface SetCategory {
  id: SetCategoryId;
  nameJP: string;
  nameEN: string;
  image: string;
}

export const setCategories: SetCategory[] = [
  { id: "salad", nameJP: "サラダ", nameEN: "Salad", image: "/images/lunch-set/salad.jpg" },
  { id: "dessert", nameJP: "デザート", nameEN: "Dessert", image: "/images/lunch-set/dessert.jpg" },
  { id: "drink", nameJP: "飲み物", nameEN: "Drink", image: "/images/lunch-set/drink.jpg" },
];

export interface DrinkVariant {
  id: string;
  nameJP: string;
  temp: "HOT" | "ICE";
}

export const drinkVariants: DrinkVariant[] = [
  { id: "coffee-hot", nameJP: "コーヒー", temp: "HOT" },
  { id: "coffee-ice", nameJP: "コーヒー", temp: "ICE" },
  { id: "thai-tea-hot", nameJP: "タイティー", temp: "HOT" },
  { id: "thai-tea-ice", nameJP: "タイティー", temp: "ICE" },
];
