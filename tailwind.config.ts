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
        emerald: { brand: "#2F4F61" },
        gold: { brand: "#B3DCFD", hi: "#F4FBFF", deep: "#5D86A3" },
        cream: { paper: "#FBFEFF" },
        /** Бордо для акцентных заголовков (как на референсе календаря) */
        wine: { DEFAULT: "#6B2D35", muted: "#5c2830" },
      },
      fontFamily: {
        serif: ["'KazakhLettersFix'", "var(--font-lora)", "Georgia", "serif"],
        script: ["'KazakhLettersFixScript'", "'Great Vibes'", "cursive"],
        calendar: ["'KazakhLettersFix'", "var(--font-manrope)", "system-ui", "sans-serif"],
        logo: ["'KazakhLettersFix'", "var(--font-playfair)", "var(--font-lora)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
