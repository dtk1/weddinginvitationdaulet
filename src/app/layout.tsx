import type { Metadata } from "next";
import {
  Lora,
  Manrope,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

/** Тёплая антиква — основной текст; хорошо дружит со скриптом Great Vibes */
const lora = Lora({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/** Мягкий гротеск для цифр и календаря — не «холодный», как чистый геометрический sans */
const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/** Изящный высококонтрастный serif для имён / капса — в одной «венчальной» гамме с Great Vibes */
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Қыз ұзату — Korkem Hall",
  description: "18.08.2026 · 18:00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="kk"
      className={`${lora.variable} ${manrope.variable} ${playfair.variable}`}
    >
      <body className="font-serif">{children}</body>
    </html>
  );
}
