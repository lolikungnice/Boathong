# Dynamic Background images

Each page gets its own ambient photo behind the content, configured in
`lib/backgroundConfig.ts` and rendered by `components/PageBackground.tsx`
(mounted once in `app/layout.tsx` — it survives route changes and
crossfades between scenes, so you never edit per-page files to change this).

**The 10 files below are placeholders** — procedurally generated abstract
scenes in the right mood/colors so the feature works and looks intentional
out of the box. Swap in real photos at these exact paths (same filenames)
and they'll appear automatically, no code changes needed.

| File | Page | Suggested real photo |
|---|---|---|
| `home.jpg` / `home-mobile.jpg` | `/` (Home) | Thai restaurant interior or a Thai street/neighborhood, warm lighting |
| `floating-market.jpg` / `floating-market-mobile.jpg` | `/menu` | Thai floating market: canal, boats, wooden stalls, lanterns |
| `about.jpg` / `about-mobile.jpg` | `/about` | Old Thai town, temple/traditional architecture, evening light |
| `access.jpg` / `access-mobile.jpg` | `/access` | A street in Thailand, street signs, city buildings |
| `contact.jpg` / `contact-mobile.jpg` | `/contact`, `/reservation` | Thai restaurant at night, warm storefront lighting |

Desktop images are used at 640px viewport width and up; the `-mobile`
version (portrait, ~900×1600) is used below that. Keep new files around
150–250KB (JPEG, quality ~60–70) so pages stay fast — the placeholders here
are all under 80KB each.

## How it behaves
- Crossfades (~650ms) between scenes when you navigate to a different page.
- Slow, continuous "ken burns" drift (30s+ loop) — very subtle, not a slideshow.
- The Menu page's scene also gets a faint moving light-shimmer layer (the
  "water" effect) — controlled by the `water: true` flag in `backgroundConfig.ts`.
- A gentle scroll parallax (image drifts slower than the page).
- A dark gradient overlay always sits on top so text stays readable no
  matter how busy the photo is — this is a fixed part of `PageBackground.tsx`,
  not something each page needs to add.
- Every animation respects `prefers-reduced-motion` and turns off.

## Adding a new page's background
1. Drop `yourpage.jpg` and `yourpage-mobile.jpg` in this folder.
2. Add an entry to `backgroundScenes` in `lib/backgroundConfig.ts` with a
   unique `id`, plus a line in `routeToScene` mapping the route prefix to
   that id.

No component files need to change — every page already renders whatever
`sceneForPath()` resolves to.
