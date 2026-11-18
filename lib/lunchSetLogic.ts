// Pure selection + pricing rules for the Lunch Set builder (no React),
// so they can be unit-tested on their own.
import {
  lunchSets,
  setCategories,
  OVERSIZE_EXTRA_YEN,
  type LunchSetDef,
  type LunchSetId,
  type SetCategoryId,
} from "../data/lunchSet";

export interface SetSelection {
  setId: LunchSetId | null;
  picked: SetCategoryId[];
  drinkVariantId: string | null;
}

export const EMPTY_SELECTION: SetSelection = { setId: null, picked: [], drinkVariantId: null };

const ALL: SetCategoryId[] = setCategories.map((c) => c.id);

export function getSetDef(id: LunchSetId | null): LunchSetDef | null {
  return lunchSets.find((s) => s.id === id) ?? null;
}

/** Choose a set (or pass null to cancel). Trims picks to the new limit. */
export function selectSet(sel: SetSelection, setId: LunchSetId | null): SetSelection {
  const def = getSetDef(setId);
  if (!def) return EMPTY_SELECTION;
  const picked = def.pickCount === ALL.length ? [...ALL] : sel.picked.slice(0, def.pickCount);
  return {
    setId,
    picked,
    drinkVariantId: picked.includes("drink") ? sel.drinkVariantId : null,
  };
}

export function canPick(sel: SetSelection, cat: SetCategoryId): boolean {
  const def = getSetDef(sel.setId);
  if (!def) return false;
  if (sel.picked.includes(cat)) return true;
  return def.pickCount === 1 || sel.picked.length < def.pickCount;
}

/** Tap an option: toggles it off if picked; swaps when the limit is 1;
 *  ignored when it would exceed the limit; FULL SET is fixed. */
export function toggleCategory(sel: SetSelection, cat: SetCategoryId): SetSelection {
  const def = getSetDef(sel.setId);
  if (!def || def.pickCount === ALL.length) return sel;
  if (sel.picked.includes(cat)) {
    return {
      ...sel,
      picked: sel.picked.filter((c) => c !== cat),
      drinkVariantId: cat === "drink" ? null : sel.drinkVariantId,
    };
  }
  if (def.pickCount === 1) return { ...sel, picked: [cat], drinkVariantId: null };
  if (sel.picked.length >= def.pickCount) return sel;
  return { ...sel, picked: [...sel.picked, cat] };
}

/** Pick a drink type. Adds the drink to the set if there's room; tapping the
 *  active variant again clears the variant. */
export function chooseDrinkVariant(sel: SetSelection, variantId: string): SetSelection {
  if (!sel.picked.includes("drink")) {
    if (!canPick(sel, "drink")) return sel;
    const added = toggleCategory(sel, "drink");
    return { ...added, drinkVariantId: variantId };
  }
  return { ...sel, drinkVariantId: sel.drinkVariantId === variantId ? null : variantId };
}

export function remainingPicks(sel: SetSelection): number {
  const def = getSetDef(sel.setId);
  return def ? def.pickCount - sel.picked.length : 0;
}

export function isSelectionComplete(sel: SetSelection): boolean {
  if (!sel.setId) return true; // "no set" is a valid choice
  if (remainingPicks(sel) !== 0) return false;
  if (sel.picked.includes("drink") && !sel.drinkVariantId) return false;
  return true;
}

export interface PriceBreakdown {
  mainYen: number;
  setYen: number;
  oversizeYen: number;
  total: number;
}

export function calcTotal(mainYen: number, sel: SetSelection, oversize: boolean): PriceBreakdown {
  const setYen = getSetDef(sel.setId)?.extraYen ?? 0;
  const oversizeYen = oversize ? OVERSIZE_EXTRA_YEN : 0;
  return { mainYen, setYen, oversizeYen, total: mainYen + setYen + oversizeYen };
}
