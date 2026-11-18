export type SceneId = "home" | "menu" | "about" | "access" | "contact" | "default";

export interface BackgroundScene {
  id: SceneId;
  /** Desktop/tablet image, ~1920x1080. */
  desktop: string;
  /** Portrait image for phones, ~900x1600 — swapped in under 640px width. */
  mobile: string;
  /** Warm/cool tint used for the gradient overlay and page accent glow. */
  tint: string;
  /** Whether to layer the subtle animated water-ripple effect on top. */
  water?: boolean;
}

// One entry per route. Add a new page by adding a new key here and dropping
// two files in /public/images/background/ — nothing else needs to change.
export const backgroundScenes: Record<SceneId, BackgroundScene> = {
  home: {
    id: "home",
    desktop: "/images/background/home.jpg",
    mobile: "/images/background/home-mobile.jpg",
    tint: "rgba(120,60,20,0.35)",
  },
  menu: {
    id: "menu",
    desktop: "/images/background/floating-market.jpg",
    mobile: "/images/background/floating-market-mobile.jpg",
    tint: "rgba(20,60,70,0.35)",
    water: true,
  },
  about: {
    id: "about",
    desktop: "/images/background/about.jpg",
    mobile: "/images/background/about-mobile.jpg",
    tint: "rgba(90,40,70,0.32)",
  },
  access: {
    id: "access",
    desktop: "/images/background/access.jpg",
    mobile: "/images/background/access-mobile.jpg",
    tint: "rgba(40,40,80,0.32)",
  },
  contact: {
    id: "contact",
    desktop: "/images/background/contact.jpg",
    mobile: "/images/background/contact-mobile.jpg",
    tint: "rgba(90,45,15,0.35)",
  },
  default: {
    id: "default",
    desktop: "/images/background/home.jpg",
    mobile: "/images/background/home-mobile.jpg",
    tint: "rgba(120,60,20,0.35)",
  },
};

// Maps a pathname to a scene. Checked longest-prefix-first so nested routes
// (e.g. a future /menu/somchai) still resolve to the right scene.
const routeToScene: [prefix: string, scene: SceneId][] = [
  ["/menu", "menu"],
  ["/about", "about"],
  ["/access", "access"],
  ["/contact", "contact"],
  ["/reservation", "contact"],
  ["/", "home"],
];

export function sceneForPath(pathname: string): BackgroundScene {
  const match = routeToScene.find(([prefix]) =>
    prefix === "/" ? pathname === "/" : pathname.startsWith(prefix)
  );
  return backgroundScenes[match ? match[1] : "default"];
}
