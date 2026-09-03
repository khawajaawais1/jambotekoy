import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        surface: "#141414",
        "surface-2": "#1c1c1c",
        brand: {
          DEFAULT: "#E11D2E",
          glow: "#FF3547",
          deep: "#8b0f1c"
        },
        gold: "#EAB308",
        ink: {
          DEFAULT: "#f5f5f4",
          dim: "#a3a3a3",
          mute: "#737373"
        }
      },
      fontFamily: {
        display: ["var(--font-anton)", "Bebas Neue", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "float": "float 8s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" }
        },
        "pulse-slow": {
          "0%,100%": { opacity: "0.45" },
          "50%": { opacity: "0.85" }
        }
      }
    }
  },
  plugins: []
};
export default config;
