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
        display: ["Aquawax", "var(--font-montserrat)", "Arial", "sans-serif"],
        sans: ["var(--font-roboto)", "Arial", "sans-serif"],
        heading: ["var(--font-montserrat)", "Arial", "sans-serif"],
        slab: ["var(--font-roboto-slab)", "Georgia", "serif"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h1: ["clamp(1.75rem, 3.5vw, 2.5rem)", { lineHeight: "1.2" }],
        h2: ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.3" }],
      },
      backgroundImage: {
        'caribe-gradient': 'linear-gradient(135deg, #006D68 0%, #004D49 100%)',
        'turquesa-fade': 'linear-gradient(180deg, #7BDCB5 0%, #C8F0DC 100%)',
      },
      boxShadow: {
        'caribe': '0 8px 24px rgba(0, 109, 104, 0.15)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
