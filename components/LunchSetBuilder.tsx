"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { MenuItem } from "@/types/menu";
import {
  OVERSIZE_EXTRA_YEN,
  drinkVariants,
  lunchSets,
  setCategories,
  type SetCategoryId,
} from "@/data/lunchSet";
import {
  EMPTY_SELECTION,
  calcTotal,
  canPick,
  chooseDrinkVariant,
  getSetDef,
  isSelectionComplete,
  remainingPicks,
  selectSet,
  toggleCategory,
  type SetSelection,
} from "@/lib/lunchSetLogic";
import { formatYen, parseYen } from "@/lib/price";

interface MainOption {
  item: MenuItem;
  yen: number;
}

const selectedCls =
  "border-gold-light bg-gold/10 shadow-[0_0_18px_rgba(255,212,90,0.22)]";
const idleCls = "border-charcoal-line bg-charcoal-soft/88 hover:border-gold/60";

function SelectedBadge({ children = "選択中" }: { children?: string }) {
  return (
    <span className="absolute right-2 top-2 z-10 rounded-sm bg-gold px-2 py-0.5 text-[11px] font-medium text-charcoal">
      {children}
    </span>
  );
}

/**
 * Lunch Set price builder shown under the Lunch tab. There is no online
 * ordering system on this site, so this is a selection + live price helper
 * (it doesn't submit anything). Rules/pricing live in lib/lunchSetLogic.ts.
 */
export function LunchSetBuilder({ items }: { items: MenuItem[] }) {
  const mains = useMemo<MainOption[]>(() => {
    const out: MainOption[] = [];
    for (const item of items) {
      const yen = parseYen(item.price);
      if (yen !== null) out.push({ item, yen });
    }
    return out;
  }, [items]);
  const [mainId, setMainId] = useState<string | null>(null);
  const [sel, setSel] = useState<SetSelection>(EMPTY_SELECTION);
  const [oversize, setOversize] = useState(false);

  const main = mains.find((m) => m.item.id === mainId) ?? null;
  const setDef = getSetDef(sel.setId);
  const price = calcTotal(main?.yen ?? 0, sel, oversize);
  const complete = isSelectionComplete(sel);
  const remaining = remainingPicks(sel);
  const drinkLabel = drinkVariants.find((v) => v.id === sel.drinkVariantId);

  const status = !setDef
    ? "セットなし"
    : remaining > 0
      ? `あと${remaining}つ選べます`
      : sel.picked.includes("drink") && !sel.drinkVariantId
        ? "ドリンクの種類を選んでください"
        : "選択完了";

  const reset = () => {
    setMainId(null);
    setSel(EMPTY_SELECTION);
    setOversize(false);
  };

  return (
    <section
      id="lunch-set"
      aria-labelledby="lunch-set-title"
      className="mt-12 rounded-sm border border-gold/30 bg-charcoal-soft/88 p-5 backdrop-blur-sm sm:p-8"
    >
      <p className="eyebrow mb-1">LUNCH SET</p>
      <h2 id="lunch-set-title" className="font-display text-2xl text-cream sm:text-3xl">
        ランチセットをつくる
      </h2>
      <p className="mt-2 text-sm text-cream/60">
        メインを選んで、サラダ・デザート・ドリンクのセットを追加できます（平日ランチ限定）。
      </p>

      {/* 1. main */}
      <h3 className="mt-8 text-sm tracking-signage text-gold">① メインを選ぶ</h3>
      <div role="radiogroup" aria-label="ランチメイン" className="mt-3 grid gap-2 sm:grid-cols-2">
        {mains.map(({ item, yen }: MainOption) => {
          const on = item.id === mainId;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setMainId(item.id)}
              className={`relative rounded-sm border px-4 py-3 pr-20 text-left transition-colors ${on ? selectedCls : idleCls}`}
            >
              {on && <SelectedBadge />}
              <span className="block text-sm leading-snug text-cream">{item.nameJP}</span>
              <span className="mt-1 block font-display text-gold">{formatYen(yen)}</span>
            </button>
          );
        })}
      </div>

      {/* 2. set */}
      <h3 className="mt-8 text-sm tracking-signage text-gold">② セットを選ぶ（任意）</h3>
      <div role="radiogroup" aria-label="セット" className="mt-3 grid gap-3 sm:grid-cols-3">
        {lunchSets.map((s) => {
          const on = sel.setId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setSel((prev) => selectSet(prev, prev.setId === s.id ? null : s.id))}
              className={`relative rounded-sm border p-4 text-left transition-colors ${on ? selectedCls : idleCls}`}
            >
              {on && <SelectedBadge />}
              <span className="block font-display text-xl tracking-wideish text-cream">{s.label}</span>
              <span className="mt-1 block font-display text-lg text-gold">+{formatYen(s.extraYen)}</span>
              <span className="mt-2 block text-xs leading-relaxed text-cream/65">{s.tagline}</span>
              <span className="mt-1 block text-[11px] text-cream/40">
                {on ? "もう一度タップで解除" : "サラダ・デザート・飲み物"}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. contents */}
      {setDef && (
        <>
          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm tracking-signage text-gold">③ 内容を選ぶ</h3>
            <p
              aria-live="polite"
              className={`text-sm ${complete ? "text-gold-light" : "text-lacquer-bright"}`}
            >
              {setDef.label}：{status}
            </p>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {setCategories.map((cat) => {
              const picked = sel.picked.includes(cat.id);
              const locked = setDef.pickCount === 3;
              const disabled = !picked && !canPick(sel, cat.id);
              const activate = () => setSel((prev) => toggleCategory(prev, cat.id as SetCategoryId));
              return (
                <div
                  key={cat.id}
                  className={`relative overflow-hidden rounded-sm border transition-colors ${
                    picked ? selectedCls : idleCls
                  } ${disabled ? "opacity-40" : ""}`}
                >
                  {picked && <SelectedBadge>{locked ? "含まれます" : "選択中"}</SelectedBadge>}
                  <button
                    type="button"
                    onClick={activate}
                    disabled={disabled || locked}
                    aria-pressed={picked}
                    className="block w-full text-left disabled:cursor-not-allowed"
                  >
                    <span className="relative block aspect-[4/3] w-full bg-charcoal">
                      <Image
                        src={cat.image}
                        alt={cat.nameJP}
                        fill
                        sizes="(min-width: 640px) 30vw, 100vw"
                        className="object-cover"
                      />
                    </span>
                    <span className="block px-4 pt-3">
                      <span className="block font-display text-lg text-cream">{cat.nameJP}</span>
                      <span className="block text-xs tracking-signage text-gold">{cat.nameEN}</span>
                    </span>
                  </button>

                  {cat.id === "drink" && (
                    <div className="grid grid-cols-2 gap-2 px-4 pb-4 pt-3">
                      {drinkVariants.map((v) => {
                        const on = picked && sel.drinkVariantId === v.id;
                        const vDisabled = !picked && !canPick(sel, "drink");
                        return (
                          <button
                            key={v.id}
                            type="button"
                            aria-pressed={on}
                            disabled={vDisabled}
                            onClick={() => setSel((prev) => chooseDrinkVariant(prev, v.id))}
                            className={`rounded-sm border px-2 py-2 text-xs leading-tight transition-colors disabled:cursor-not-allowed ${
                              on
                                ? "border-gold-light bg-gold text-charcoal"
                                : "border-charcoal-line text-cream/80 hover:border-gold/60"
                            }`}
                          >
                            {v.nameJP}
                            <span className="block text-[11px] tracking-signage">{v.temp}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {cat.id !== "drink" && <div className="pb-4" />}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* 4. oversize */}
      <h3 className="mt-8 text-sm tracking-signage text-gold">④ 大盛り</h3>
      <button
        type="button"
        role="switch"
        aria-checked={oversize}
        onClick={() => setOversize((v) => !v)}
        className={`relative mt-3 w-full rounded-sm border px-4 py-3 pr-20 text-left transition-colors sm:w-auto sm:min-w-[18rem] ${
          oversize ? selectedCls : idleCls
        }`}
      >
        {oversize && <SelectedBadge />}
        <span className="text-sm text-cream">大盛り</span>
        <span className="ml-3 font-display text-gold">+{formatYen(OVERSIZE_EXTRA_YEN)}</span>
      </button>

      {/* summary */}
      <div className="mt-8 rounded-sm border border-gold/40 bg-charcoal/60 p-5">
        <p className="text-xs tracking-signage text-gold">ご選択内容</p>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-cream/70">メイン</dt>
            <dd className="text-right text-cream">
              {main ? `${main.item.nameJP}　${formatYen(main.yen)}` : "未選択"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-cream/70">セット</dt>
            <dd className="text-right text-cream">
              {setDef ? `${setDef.label}　+${formatYen(price.setYen)}` : "なし"}
            </dd>
          </div>
          {setDef && (
            <div className="flex justify-between gap-4">
              <dt className="text-cream/70">内容</dt>
              <dd className="text-right text-cream">
                {sel.picked.length === 0
                  ? "未選択"
                  : setCategories
                      .filter((c) => sel.picked.includes(c.id))
                      .map((c) =>
                        c.id === "drink" && drinkLabel
                          ? `${drinkLabel.nameJP}（${drinkLabel.temp}）`
                          : c.nameJP
                      )
                      .join("・")}
              </dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-cream/70">大盛り</dt>
            <dd className="text-right text-cream">
              {oversize ? `あり　+${formatYen(price.oversizeYen)}` : "なし"}
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex items-end justify-between gap-4 border-t border-charcoal-line pt-4">
          <span className="text-sm text-cream/70">合計（税込）</span>
          <span aria-live="polite" className="font-display text-3xl text-gold-light">
            {main ? formatYen(price.total) : "—"}
          </span>
        </div>
        {!main && (
          <p className="mt-2 text-xs text-lacquer-bright">メインを選ぶと合計が表示されます。</p>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-md text-xs leading-relaxed text-cream/45">
            表示価格はすべて税込です。※ オンライン注文ではありません。内容をご確認のうえ、ご注文はスタッフまでお伝えください。
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-sm border border-gold/50 px-4 py-2 text-xs tracking-signage text-gold transition-colors hover:border-gold-light hover:text-gold-light"
          >
            リセット
          </button>
        </div>
      </div>
    </section>
  );
}
