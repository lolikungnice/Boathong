# Promotion images (none of these exist yet)

`components/PromotionCarousel.tsx` reads image paths from
`data/promotions.ts`. Drop real photos here with these exact filenames and
they'll show up automatically — no code changes needed:

| Path | Promotion |
|---|---|
| `promotion-01.jpg` | タイ屋台フードスペシャル (Thai Street Food Special) |
| `promotion-03.jpg` | フレッシュココナッツウォーター (Fresh Coconut Water) |
| `promotion-04.jpg` | ランチセット (Lunch Set) |

Recommended aspect ratio: **16:9** (matches the card's `aspect-video`).
Until real photos are added, each card still renders correctly — you'll
just see the dark background with no photo underneath the gradient/text.

## How to change a promotion's photo
Replace the file at that path, keeping the same filename — done.
If you want a different filename, update the matching `image` field in
`data/promotions.ts` to match.

## How to add a new promotion
1. Add a new photo here, e.g. `promotion-05.jpg`.
2. In `data/promotions.ts`, copy one of the existing objects in the
   `promotions` array, give it a unique `id`, and point `image` at your
   new file.
3. Save — `PromotionCarousel` renders whatever is in that array, so no
   other file needs to change.
