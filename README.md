# boathong / ボアトウン — website

Next.js (App Router) + TypeScript + Tailwind CSS. Visual direction: a
premium Bangkok Chinatown / Yaowarat night-market aesthetic — black
background, neon red + gold signage, cinematic photography treatment.
Built so it can later grow into the QR-order / kitchen / payment system
described in the brief without restructuring the menu data or component
boundaries.

## 1. Install

Requires Node.js 18.18+ (20 LTS recommended).

```bash
cd boathong
npm install
```

## 2. Run (development)

```bash
npm run dev
```

Open http://localhost:3000 — the dev server hot-reloads on save.

## 3. Build & run (production)

```bash
npm run build
npm run start
```

## 4. How to test it manually

- **Pages**: visit `/`, `/menu`, `/about`, `/access`, `/reservation`, `/contact`.
- **Mobile menu**: shrink the browser below 768px width — the nav should
  collapse into a hamburger button.
- **Responsive check**: test at 375, 390, 430, 768, 1024, 1440px widths. No
  page should scroll horizontally or show overflowing text.
- **Reduced motion**: enable "reduce motion" in your OS accessibility
  settings and confirm the hero fade-in, neon pulse, parallax drift, and
  hover animations all stop.
- **Menu categories**: on `/menu`, click each category tab and confirm the
  grid filters correctly.
- **Navbar on scroll**: on the home page, scroll down and confirm the
  transparent navbar over the hero transitions to a solid dark bar.
- **Neon hover states**: hover the home menu category tiles and the
  reservation buttons — border should glow gold/red and the image should
  zoom slightly.
- **Dynamic Background**: navigate between `/`, `/menu`, `/about`, `/access`,
  `/contact` — the photo behind the page should crossfade to a different
  scene each time (floating market on `/menu`, temple dusk on `/about`,
  etc). Shrink below 640px width to confirm it swaps to the portrait
  `-mobile` image.

## 4b. Dynamic Background system

Every page has its own ambient photo behind the content — configured
centrally in `lib/backgroundConfig.ts` and rendered by the single
`components/PageBackground.tsx` component (mounted once in `app/layout.tsx`,
so no per-page code). See `public/images/background/README.md` for the
full explanation, the placeholder-vs-real-photo status, and how to add a
new page's scene. Short version: it crossfades on navigation, drifts
slowly, adds a light shimmer on the Menu page's water, respects
`prefers-reduced-motion`, and always keeps a dark overlay on top so text
stays readable regardless of the photo.

To support this, every full-width section background that used to be a
flat `bg-charcoal` / `bg-charcoal-soft` is now slightly translucent with a
light backdrop blur (e.g. `bg-charcoal-soft/88 backdrop-blur-sm`), so the
page photo shows through faintly — a subtle glassmorphism look, per the
brief. The Navbar and the background layer itself were deliberately left
untouched (the navbar already had its own bespoke translucency; the
background layer's own overlay must stay fully solid to guarantee
legibility as the fallback safety net).

## 4c. Thai language support — removed

The site used to have a JP/ไทย switcher in the navbar. That's gone now —
the site is Japanese-only. What changed:
- `components/LanguageSwitcher.tsx` deleted; its two usages removed from `Navbar.tsx`.
- `lib/i18n/LanguageContext.tsx` simplified to always provide the Japanese
  dictionary (no state, no `localStorage`, no switching).
- The Thai Google Fonts (`Noto Serif Thai`, `Noto Sans Thai`) were dropped
  from `app/layout.tsx` — one less font family to download, which also
  helps page weight.

**What's left on purpose:** the Thai strings themselves (`dictionary.ts`'s
`th` object, `nameTH`/`description.th` fields in `data/menu.ts`, and the
`locale === "jp" ? ... : ...` ternaries scattered through components) were
left in place rather than deleted. Since `locale` now always resolves to
`"jp"`, those `th` branches are simply dead code — never rendered, no
functional effect — but they're there if Thai support needs to come back
later. If you'd rather have them fully stripped out (smaller files, no
dead branches), that's a separate, larger cleanup touching most
components; ask and it can be done.

## 5. What's built vs. what's pending

Built now: Home, Menu, About, Access, Reservation, Contact, Navbar, Footer,
category-filtered menu grid, SEO metadata + sitemap +
robots.txt + generated favicon.

Not built yet (out of scope for this pass, but the data model already
supports it — see `types/menu.ts`): QR ordering, waiter/kitchen views, order
status tracking, payment, admin dashboard.

**Missing content you need to supply:**
- Real photography for every dish/drink — see `public/images/README.md`
  for the full generated list of 117 expected file paths. The menu *data*
  (names, prices, descriptions) is now real, transcribed from your printed
  menu posters — only the photos are still placeholders. Also still
  needed: `hero.jpg`, `banner.jpg`, the 4 home menu-category tiles, and
  `og-image.jpg`.
- The 10 Dynamic Background files (`public/images/background/`) are
  currently procedurally-generated placeholder art in the right mood/colors
  per page — see that folder's README.md for what real photo each one
  wants and exactly which filename to replace.
- The `streetFoodSet` and `kidsSet` categories now include the supplied
  posters, descriptions, and prices in `data/menu.ts`. The Street Food
  total is labeled as the sum of separately ordered items; it does not
  imply a discounted set price. The `lunch` category has the owner's 8
  real Mon–Fri set meals.
- Spice levels (🌶): every dish that shows a chili is set to 1 (ピリ辛) on purpose;
  dishes without a chili (drinks, desserts, mild dishes) stay at 0. Change per dish in `data/menu.ts`.
- A real production domain — `metadataBase` in `app/layout.tsx` and the
  URLs in `app/sitemap.ts` / `app/robots.ts` currently point at
  `boathong.example.com`.

**Now using real assets:** the logo (`public/logo.png`, wired into the
navbar, footer, and favicon), the About-page interior photo
(`public/images/about.jpg` / `about/interior.jpg`), and the Thai Select
certificate scan (`public/images/awards/thai-select-certificate.png`) —
all supplied by the client, no longer placeholders.

## 6. Project structure

```
boathong/
├── app/
│   ├── layout.tsx        # fonts, <html>/<body>, global metadata, LanguageProvider
│   ├── globals.css       # Tailwind layers, brand tokens, focus/motion rules
│   ├── page.tsx          # / (Home) — server component, exports metadata
│   ├── icon.png          # favicon, generated from the real logo
│   ├── apple-icon.png    # apple-touch-icon, generated from the real logo
│   ├── robots.ts         # /robots.txt
│   ├── sitemap.ts        # /sitemap.xml
│   ├── menu/page.tsx
│   ├── about/page.tsx
│   ├── access/page.tsx
│   ├── reservation/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── PageBackground.tsx    # global Dynamic Background — crossfade/parallax/water shimmer
│   ├── Navbar.tsx            # fixed, transparent over hero → dark on scroll
│   ├── Hero.tsx              # 100vh neon hero, parallax bg, scroll cue
│   ├── PromotionCarousel.tsx # home-page horizontal promo carousel (swipe/drag)
│   ├── FoodCarousel.tsx      # home-page "TODAY'S SPECIAL" promo carousel
│   ├── About.tsx             # home-page About section (vertical JP type + photo)
│   ├── MenuSection.tsx       # home-page 4-category premium grid
│   ├── MenuCategoryCard.tsx  # large-photo category tile used by MenuSection
│   ├── NeonBanner.tsx        # full-width cinematic banner with glowing wordmark
│   ├── Access.tsx            # home-page 3-column access section (info/map/photo)
│   ├── Footer.tsx            # centered neon-brand footer with social icons
│   ├── Reveal.tsx            # scroll-triggered fade/slide-up wrapper for section entrances
│   ├── SectionTitle.tsx
│   ├── MenuCard.tsx          # single dish card, used on the full /menu page
│   ├── MenuGrid.tsx          # category tabs + MenuCard grid for /menu
│   ├── HomeClient.tsx        # client-side content rendered by app/page.tsx
│   ├── MenuPageClient.tsx    # client-side content rendered by app/menu/page.tsx
│   ├── AboutClient.tsx       # full /about page (distinct from About.tsx home section)
│   ├── AccessClient.tsx      # full /access page (distinct from Access.tsx home section)
│   ├── ReservationClient.tsx
│   └── ContactClient.tsx
├── data/
│   ├── menu.ts             # REAL menu, transcribed from client posters + owner's lunch list (124 items)
│   ├── featuredFoods.ts    # home-page food carousel dishes — add/remove entries freely
│   └── promotions.ts       # home-page promotion carousel entries — add/remove freely
├── lib/
│   ├── backgroundConfig.ts # per-page Dynamic Background scene config (see public/images/background/README.md)
│   └── i18n/
│       ├── dictionary.ts       # Japanese strings (Thai removed — see note below)
│       └── LanguageContext.tsx # thin context that always resolves to the JP dictionary
├── types/
│   └── menu.ts             # MenuItem, plus forward-looking Order/OrderStatus types
├── public/images/          # empty — see README.md inside for the required files
├── tailwind.config.ts      # brand color tokens (charcoal/gold/cream/lacquer)
├── next.config.js
├── tsconfig.json
└── package.json
```

### Why routes are split into `page.tsx` + `*Client.tsx`

Each `app/**/page.tsx` is a server component so it can export page-specific
`metadata` (SEO titles/descriptions per page). The actual interactive
content (language switching, hooks) lives in the matching `components/*Client.tsx`
file, which is a client component. Keep this pattern for any new page you add.

### Home page vs. full pages — two components can share a topic

`About.tsx` / `Access.tsx` are compact **home-page sections**.
`AboutClient.tsx` / `AccessClient.tsx` are the **full standalone pages** at
`/about` and `/access`. They're intentionally separate components — the
home versions are teasers, the full pages have more detail (map embed,
tap-to-call, etc). Edit the one that matches where you saw the content.

### Adding a new menu item

Edit `data/menu.ts` — add an object to the `menuItems` array with a unique
`id`. The `/menu` page's category tabs (`MenuGrid`) read from this file
automatically. The home page's menu section (`MenuSection.tsx`) shows four
fixed category tiles (Thai Food / Street Food / Appetizer / Drink) linking
to `/menu`, not individual dishes — edit `categories` in that file if you
want different photos or labels there.

### Editing the home-page food carousel

Edit `data/featuredFoods.ts` — add, remove, or reorder objects in the
`featuredFoods` array (each needs a unique `id`). `FoodCarousel.tsx` renders
whatever is there; no component changes needed. It currently reuses four
photos already used on `/menu` (`data/menu.ts`) so you don't need extra
image files beyond what's listed in `public/images/README.md`.

### Editing the home-page promotion carousel

Edit `data/promotions.ts` — add, remove, or reorder objects in the
`promotions` array (each needs a unique `id`). Photos live in
`public/promotions/` (see the README in that folder for the exact
filenames expected) — separate from `public/images/` since this carousel
was requested with its own image folder. To swap a photo, replace the file
at the same path; to add a new promotion, add a new photo and a matching
object in the array.

**Known limitation:** the promotion carousel combines native touch-swipe
(CSS scroll-snap) with a custom mouse-drag handler for desktop, since no
carousel library was added to the project. This works well but isn't as
polished as a dedicated carousel library — if you later install one (e.g.
Embla), it'd be a reasonable drop-in replacement for the scroller internals
without touching `data/promotions.ts`.

### Lunch Set builder (Lunch tab on `/menu`)

Under the Lunch cards, `components/LunchSetBuilder.tsx` lets a visitor pick
a lunch main, add SET A (+¥100, pick 1 of salad/dessert/drink), SET B
(+¥200, pick 2) or FULL SET (+¥300, all 3), choose a drink (コーヒー / タイティー,
HOT / ICE) and toggle 大盛り (+¥200), with the total updating live.

- Prices, labels and drink options: `data/lunchSet.ts`.
- Selection + pricing rules (no React, unit-testable): `lib/lunchSetLogic.ts`.
- Lunch main prices are read from the existing `price` strings in
  `data/menu.ts` via `lib/price.ts` — those strings were not changed.
- There is no online ordering on this site, so the builder is a
  selection/price helper only; it says so on screen and doesn't submit anything.
- Photos: `public/images/lunch-set/{salad,dessert,drink}.jpg` (real photos supplied by the owner,
  padded to 4:3; swap with the same filenames if needed).
- Behaviour notes: SET A swaps the pick when you tap another option; SET B
  blocks a 3rd pick (deselect one first); FULL SET includes all three, but a
  drink type still has to be chosen. Tap the selected set again to cancel it.

### Design tokens

The neon palette lives in `tailwind.config.ts` (`charcoal`, `gold`, `cream`,
`lacquer`) and `app/globals.css` (`.neon-text`, `.neon-border`,
`.cinematic-overlay`, `.thai-pattern` utility classes). Reuse these classes
for any new section instead of hand-rolling new glow/shadow values, so the
whole site stays visually consistent.

### Adding a new language string

Add the key to **both** `jp` and `th` objects in `lib/i18n/dictionary.ts`,
then read it via `const { t } = useLanguage()` in any client component.
