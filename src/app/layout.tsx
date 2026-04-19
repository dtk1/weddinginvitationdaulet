import type { Metadata } from "next";
import {
  Great_Vibes,
  Lora,
  Manrope,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

/** Тёплая антиква — основной текст; хорошо дружит со скриптом Great Vibes */
const lora = Lora({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/** Мягкий гротеск для цифр и календаря — не «холодный», как чистый геометрический sans */
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
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
  title: "Дәулет & Гүлмира — Wedding Day",
  description: "24.08.2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="kk"
      className={`${lora.variable} ${greatVibes.variable} ${manrope.variable} ${playfair.variable}`}
    >
      <body className="font-serif">{children}</body>
    </html>
  );
}
