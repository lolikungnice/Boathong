import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Yaowarat-night palette. Token names stay the same as before so every
        // existing page (about/access/reservation/contact) re-skins for free.
        charcoal: {
          DEFAULT: "#050505", // near-pure black street-at-night ground
          soft: "#0A0505",    // warm-black card/section surface
          line: "#2A1414",    // dark red-tinted hairline
        },
        gold: {
          DEFAULT: "#D6A52A", // warm gold — signage, labels, dividers
          light: "#FFD45A",   // bright gold — hover / glow state
          dim: "#8C6E1E",
        },
        cream: {
          DEFAULT: "#E8E8E8", // primary body text on black
          paper: "#FFFFFF",   // brightest text (headlines on dark)
        },
        lacquer: {
          DEFAULT: "#C40000", // deep neon-sign red
          bright: "#FF3030",  // hot neon red — glow, hover, accents
          hot: "#FF1E1E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],   // elegant serif headings (JP/EN)
        body: ["var(--font-body)", "sans-serif"],     // clean sans body copy
        neon: ["var(--font-neon)", "cursive"],        // hand-painted neon wordmark (BOATHONG)
      },
      letterSpacing: {
        wideish: "0.02em",
        signage: "0.12em",
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "neon-pulse": {
          "0%, 100%": {
            textShadow:
              "0 0 8px rgba(255,48,48,0.75), 0 0 22px rgba(255,48,48,0.55), 0 0 46px rgba(214,165,42,0.35)",
          },
          "50%": {
            textShadow:
              "0 0 14px rgba(255,48,48,0.95), 0 0 34px rgba(255,48,48,0.7), 0 0 64px rgba(214,165,42,0.5)",
          },
        },
        "drift": {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-2%, -1%, 0)" },
        },
        "bounce-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
        "bg-drift": {
          "0%": { transform: "scale(1.06) translate3d(0,0,0)" },
          "50%": { transform: "scale(1.1) translate3d(-1%,-0.6%,0)" },
          "100%": { transform: "scale(1.06) translate3d(0,0,0)" },
        },
        "bg-shimmer": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "-200% 0%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "neon-pulse": "neon-pulse 2.6s ease-in-out infinite",
        "drift-slow": "drift 24s ease-in-out infinite alternate",
        "bounce-y": "bounce-y 1.8s ease-in-out infinite",
        "bg-drift": "bg-drift 34s ease-in-out infinite",
        "bg-shimmer": "bg-shimmer 14s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
