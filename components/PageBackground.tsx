"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { sceneForPath, type BackgroundScene } from "@/lib/backgroundConfig";

const TRANSITION_MS = 650;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/**
 * Renders the ambient photo behind every page (mounted once in the root
 * layout so it survives route changes) and crossfades to a new scene
 * whenever the pathname's scene changes — see lib/backgroundConfig.ts for
 * the path to scene mapping. Purely decorative: aria-hidden, never receives
 * focus or blocks clicks.
 */
export function PageBackground() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const scene = sceneForPath(pathname);

  const [layers, setLayers] = useState<{ scene: BackgroundScene; visible: boolean }[]>([
    { scene, visible: true },
  ]);
  const offsetRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    setLayers((prev) => {
      const top = prev[prev.length - 1];
      if (top?.scene.id === scene.id) return prev;
      return [...prev, { scene, visible: false }];
    });
    const raf = requestAnimationFrame(() => {
      setLayers((prev) => prev.map((l, i) => (i === prev.length - 1 ? { ...l, visible: true } : l)));
    });
    const cleanup = setTimeout(() => {
      setLayers((prev) => (prev.length > 1 ? prev.slice(-1) : prev));
    }, TRANSITION_MS + 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(cleanup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.id]);

  useEffect(() => {
    if (reducedMotion.current) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (offsetRef.current) {
          const y = Math.min(window.scrollY, 1200) * 0.04;
          offsetRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-charcoal">
      <div ref={offsetRef} className="absolute inset-0 -top-6 -bottom-6">
        {layers.map((layer, i) => (
          <div
            key={layer.scene.id + i}
            className="absolute inset-0 transition-opacity ease-in-out motion-reduce:transition-none"
            style={{ opacity: layer.visible ? 1 : 0, transitionDuration: `${TRANSITION_MS}ms` }}
          >
            <div className="absolute inset-0 animate-bg-drift motion-reduce:animate-none">
              <Image
                src={isMobile ? layer.scene.mobile : layer.scene.desktop}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {layer.scene.water && (
              <div className="absolute inset-0 animate-bg-shimmer opacity-[0.15] motion-reduce:hidden [background:repeating-linear-gradient(100deg,transparent_0,transparent_40px,rgba(255,255,255,0.5)_60px,transparent_80px)] [background-size:200%_100%]" />
            )}
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(circle at 50% 30%, ${layer.scene.tint}, transparent 60%)` }}
            />
          </div>
        ))}
      </div>

      {/* Single overlay — keeps text readable without crushing the photo
          to near-black. Section-level cards (bg-charcoal-soft/88 etc.)
          handle extra contrast locally where real text sits. */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/35 to-charcoal/68" />
    </div>
  );
}
