# Required images

`logo.png` (real, in `public/`), `about.jpg`, `about/interior.jpg`, and
`awards/thai-select-certificate.png` are now the client's own real photos —
already in place, nothing to do there. Everything else below is still a
placeholder; add real photos at these exact paths under `public/images/`
and they'll show up automatically.

| Path | Used on | Suggested shot |
|---|---|---|
| `hero.jpg` | Home hero background | Busy Yaowarat/Bangkok-Chinatown-style night street: neon signs, light trails, warm red/orange tone |
| `banner.jpg` | Home → full-width Neon Banner | Similar night-street mood, can be a tighter crop / different angle than the hero |
| `menu-1.jpg` | Home menu grid — "THAI FOOD" category tile | A signature main dish |
| `menu-2.jpg` | Home menu grid — "STREET FOOD" category tile | Street-stall style dish |
| `menu-3.jpg` | Home menu grid — "APPETIZER" category tile | Starter / small plate |
| `menu-4.jpg` | Home menu grid — "DRINK" category tile | Thai tea, cocktail, or dessert |
| `menu/*.jpg` (117 files, some shared by several items) | Full Menu page (`/menu`) item cards | Generated list below — matches the real menu, see `data/menu.ts` for the `image` field of each entry |
| `og-image.jpg` | Social share preview (1200×630) | Hero-style shot for link previews |

Until real photos are added, nothing breaks — the hero and banner fall back
to a red/gold gradient that still reads as "neon night street," and photo
tiles elsewhere render as empty panels inside their gold/red border.

**Note on `about.jpg` / `about/interior.jpg`:** the photo currently in
place is a real shot of the restaurant, but it's a fairly small file
(640×480) that came from an older photo — it works but may look a little
soft when displayed large on big screens. Swap in a higher-resolution shot
of the same space if one becomes available.

**Note on the logo (`public/logo.png`):** this is the client's real
circular badge logo (already wired into `Navbar.tsx`, `Footer.tsx`, and the
site favicon) — no placeholder here.

## Menu item photos (`public/images/menu/`)

`data/menu.ts` now holds the real menu (transcribed from the client's
printed menu posters), so every dish/drink name below is real — only the
**photo file** is still a placeholder. The client's posters are illustrated
menu boards (with borders, price text, decorative graphics baked in), not
standalone product photos, so they can't be cropped and reused directly as
clean web images. Real photography is still needed for each of these 117
files:

```
menu/pad-thai.jpg
menu/khao-man-gai.jpg
menu/talay-pad-pong-curry.jpg
menu/green-curry-rice.jpg
menu/massaman-curry-rice.jpg
menu/lunch-nam-prik-pao.jpg
menu/kuay-teow-tom-yum-kung.jpg
menu/kuay-teow-moo.jpg
menu/fried-shrimp-spring-rolls.jpg
menu/fried-spring-rolls.jpg
menu/fried-shrimp-cakes.jpg
menu/fresh-spring-roll.jpg
menu/fried-fish-cakes.jpg
menu/fried-chicken-wings.jpg
menu/fried-pork.jpg
menu/fried-chicken-cartilage.jpg
menu/fried-shrimp-chips.jpg
menu/fried-wontons.jpg
menu/fried-wonton-egg.jpg
menu/yam-talay.jpg
menu/yam-woonsen.jpg
menu/yam-makua.jpg
menu/yam-pla-muek.jpg
menu/tam-tard.jpg
menu/tam-khao-pod.jpg
menu/som-tam.jpg
menu/moo-yang-namtok.jpg
menu/larb-moo.jpg
menu/tom-yum-gai.jpg
menu/tom-yum-kung.jpg
menu/tofu-soup.jpg
menu/tom-kha-gai.jpg
menu/khao-soi.jpg
menu/kuay-teow-neua.jpg
menu/kuay-teow-gai.jpg
menu/pad-kaprao-rice.jpg
menu/boathong-fried-rice.jpg
menu/pork-fried-rice.jpg
menu/shrimp-fried-rice.jpg
menu/rad-na.jpg
menu/rad-na-talay.jpg
menu/pad-see-ew.jpg
menu/bami-kiew.jpg
menu/red-curry-beef-rice.jpg
menu/panang-beef-curry-rice.jpg
menu/lychee-green-curry-rice.jpg
menu/jasmine-rice.jpg
menu/sticky-rice.jpg
menu/coriander-side.jpg
menu/grilled-chicken.jpg
menu/grilled-pork-neck.jpg
menu/grilled-shrimps.jpg
menu/thai-omelet-minted-pork.jpg
menu/grilled-scallops.jpg
menu/grilled-squids.jpg
menu/pad-pak-boong.jpg
menu/pad-woonsen-veg.jpg
menu/pad-pak-ruammit.jpg
menu/soft-shell-crab-pong-curry.jpg
menu/pad-kaprao-gai.jpg
menu/gai-pad-med-mamuang.jpg
menu/pad-kaprao-talay.jpg
menu/talay-pad-prik.jpg
menu/soft-shell-crab-pad-prik.jpg
menu/moo-pad-prik.jpg
menu/neua-gratiam.jpg
menu/pla-pad-khuenchai.jpg
menu/pad-makua.jpg
menu/coconut-ice-cream.jpg
menu/mango-ice-cream.jpg
menu/kanom-chan.jpg
menu/kanom-mor-kaeng.jpg
menu/draft-beer.jpg
menu/singha-beer.jpg
menu/chang-beer.jpg
menu/spy-classic.jpg
menu/spy-red.jpg
menu/spy-white.jpg
menu/soda.jpg
menu/ice.jpg
menu/monsiam.jpg
menu/sangsom-whisky.jpg
menu/highball.jpg
menu/jinro.jpg
menu/monsoon-valley-red.jpg
menu/monsoon-valley-white.jpg
menu/khao-yai-red.jpg
menu/khao-yai-white.jpg
menu/lemon-sour.jpg
menu/grape-sour.jpg
menu/lime-sour.jpg
menu/lychee-sour.jpg
menu/plum-sour.jpg
menu/oolong-hi.jpg
menu/cassis-orange.jpg
menu/cassis-mango.jpg
menu/cassis-oolong.jpg
menu/cassis-soda.jpg
menu/oolong-tea.jpg
menu/jasmine-tea-drink.jpg
menu/coke.jpg
menu/orange-juice-soft.jpg
menu/melon-soda.jpg
menu/lychee-juice.jpg
menu/guava-juice.jpg
menu/chrysanthemum-juice.jpg
menu/tamarind-juice.jpg
menu/pomegranate-juice.jpg
menu/mango-juice.jpg
menu/coconut-juice.jpg
menu/coconut-shake.jpg
menu/mango-shake.jpg
menu/salak-milk.jpg
menu/melon-milk.jpg
menu/thai-coffee.jpg
menu/thai-tea.jpg
menu/kids-plate.jpg
```


## Lunch Set images (`public/images/lunch-set/`)

`salad.jpg`, `dessert.jpg`, `drink.jpg` — real photos supplied by the owner
(salad bowl, coconut-milk dessert, and a Thai tea / coffee HOT & ICE shot —
the drink photo was cropped to its content),
each padded to 4:3 (960x720) so nothing is cropped in the option cards.

## Payment logos (`public/images/payment/cashless.jpg`)

Logo collage of cashless payment brands (cards, QR codes, e-money, transit
IC cards) shown at the top of the "ご利用いただける決済方法" section on `/about`.
Supplied by the owner; it is an industry chart with its own title.
