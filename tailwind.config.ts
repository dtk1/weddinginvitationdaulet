import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: { brand: "#1A4D3A" },
        gold: { brand: "#C4A77D", hi: "#f0e4d2", deep: "#9a7b58" },
        cream: { paper: "#FDFBF6" },
        /** Бордо для акцентных заголовков (как на референсе календаря) */
        wine: { DEFAULT: "#6B2D35", muted: "#5c2830" },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
        script: ["var(--font-great-vibes)", "cursive"],
        calendar: ["var(--font-manrope)", "system-ui", "sans-serif"],
        logo: ["var(--font-playfair)", "var(--font-lora)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
