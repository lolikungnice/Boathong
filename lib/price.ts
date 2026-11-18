/** Pulls the first yen amount out of a pre-formatted price string,
 *  e.g. "¥1,200（税込）" -> 1200. Returns null when there isn't one. */
export function parseYen(price: string): number | null {
  const m = price.match(/[¥￥]\s*([\d,]+)/);
  const amount = m?.[1];
  if (!amount) return null;
  const n = Number(amount.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

export function formatYen(n: number): string {
  return `¥${n.toLocaleString("ja-JP")}`;
}
