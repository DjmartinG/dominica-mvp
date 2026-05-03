import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Emaar adaptada para Dominica
        navy: {
          DEFAULT: "#1B2D5C",
          dark: "#0F1B3D",
          light: "#2A3F73",
        },
        rojo: {
          DEFAULT: "#C7141C",
          dark: "#A1100E",
          light: "#E62E2E",
        },
        beige: {
          DEFAULT: "#F5F2EC",
          dark: "#E8E2D5",
        },
        negro: {
          DEFAULT: "#1A1A1A",
          soft: "#2A2A2A",
        },
        gris: {
          DEFAULT: "#6E6E6E",
          claro: "#B8B8B8",
          muyclaro: "#E8E8E8",
        },
        // Mantenemos algunos para compatibilidad y semáforos
        ok: "#2E7D32",
        alert: "#C62828",
        warn: "#F9A825",
      },
      fontFamily: {
        display: ["var(--font-lora)", "Georgia", "serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
      },
      fontSize: {
        watermark: ["clamp(4rem, 12vw, 11rem)", { lineHeight: "0.9", letterSpacing: "0.05em" }],
        display: ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.2", letterSpacing: "0.02em" }],
        h1: ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.2" }],
        h2: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.3" }],
        eyebrow: ["11px", { letterSpacing: "0.3em", lineHeight: "1.5" }],
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.5em",
      },
      boxShadow: {
        'card': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'lift': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'navy': '0 8px 24px rgba(27, 45, 92, 0.2)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};

export default config;
