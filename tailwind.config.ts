import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        caribe: {
          DEFAULT: "#006D68",
          dark: "#004D49",
          light: "#0E8B85",
        },
        turquesa: {
          DEFAULT: "#7BDCB5",
          light: "#C8F0DC",
        },
        cielo: "#0089F7",
        carbon: "#222222",
        crema: "#FAFAFA",
        cg: {
          navy: "#0B2545",
          dorado: "#C9A961",
        },
        ok: "#2E7D32",
        alert: "#C62828",
        warn: "#F9A825",
      },
      fontFamily: {
        // Display elegante para hero y H1 (Playfair = serif premium)
        display: ["var(--font-lora)", "Aquawax", "Georgia", "serif"],
        // Serif decorativo
        serif: ["var(--font-lora)", "Georgia", "serif"],
        // Sans-serif moderno para body
        sans: ["var(--font-roboto)", "Arial", "sans-serif"],
        // Headers de sección
        heading: ["var(--font-lora)", "Georgia", "serif"],
        // Slab para subtítulos decorativos
        slab: ["var(--font-roboto-slab)", "Georgia", "serif"],
      },
      fontSize: {
        hero: ["clamp(3rem, 7vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        h2: ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.25" }],
        statement: ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        'caribe-gradient': 'linear-gradient(135deg, #006D68 0%, #004D49 100%)',
        'turquesa-fade': 'linear-gradient(180deg, #7BDCB5 0%, #C8F0DC 100%)',
      },
      boxShadow: {
        'caribe': '0 8px 24px rgba(0, 109, 104, 0.15)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'lift': '0 20px 40px -12px rgba(0, 109, 104, 0.25)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};

export default config;
