"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const soft = [0.25, 0.1, 0.25, 1] as const;

/** 24 тамыз 2026, 19:00 — Астана уақыты (Қазақстан, UTC+5) */
const WEDDING_UTC_MS = Date.parse("2026-08-24T19:00:00+05:00");

const COUNTDOWN_BG =
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=2000&q=85";

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function getParts(msLeft: number) {
  if (msLeft <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true as const };
  }
  const days = Math.floor(msLeft / 86_400_000);
  const hours = Math.floor((msLeft % 86_400_000) / 3_600_000);
  const minutes = Math.floor((msLeft % 3_600_000) / 60_000);
  const seconds = Math.floor((msLeft % 60_000) / 1000);
  return { days, hours, minutes, seconds, done: false as const };
}

type Props = {
  revealed: boolean;
};

/**
 * Тойға дейін — скрипт + санауыш (күн / сағат / минут / секунд), стиль сайтпен үйлесімді.
 */
export function WeddingCountdown({ revealed }: Props) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const parts = useMemo(() => getParts(WEDDING_UTC_MS - now), [now]);

  const cells = [
    { value: parts.days, label: "күн" },
    { value: parts.hours, label: "сағат" },
    { value: parts.minutes, label: "минут" },
    { value: parts.seconds, label: "секунд" },
  ] as const;

  return (
    <section
      className="relative isolate overflow-hidden border-y border-gold-brand/20"
      aria-labelledby="countdown-heading"
    >
      <div className="absolute inset-0">
        <Image
          src={COUNTDOWN_BG}
          alt=""
          fill
          className="object-cover object-[center_40%]"
          sizes="100vw"
          priority={false}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-emerald-brand/55 via-emerald-brand/35 to-emerald-brand/60"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
          aria-hidden
        />
      </div>

      <motion.div
        className="relative px-5 py-16 text-center sm:px-8 sm:py-20 md:py-24"
        initial={false}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.95, ease: soft, delay: revealed ? 0.05 : 0 }}
      >
        <h2
          id="countdown-heading"
          className="font-script text-[clamp(2.35rem,6.4vw,3.55rem)] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
        >
          Тойға дейін:
        </h2>

        {parts.done ? (
          <p
            className="mt-10 font-serif text-[1.65rem] font-medium text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.4)] sm:text-3xl md:text-[2rem]"
            role="status"
            aria-live="polite"
          >
            Бүгін — ұзақ күткен той кеші! Құттықтаймыз!
          </p>
        ) : (
          <div
            className="mx-auto mt-10 max-w-4xl"
            role="timer"
            aria-live="polite"
            aria-atomic="true"
            aria-label="Тойға дейінгі уақыт"
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 md:gap-x-10">
              {cells.map((c) => (
                <div key={c.label} className="flex flex-col items-center gap-2 sm:gap-3">
                  <span className="font-calendar text-[clamp(2.55rem,9vw,4.45rem)] font-semibold tabular-nums leading-none tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.45)]">
                    {c.label === "күн" ? c.value : pad2(c.value)}
                  </span>
                  <span className="font-script text-[clamp(1.2rem,3.7vw,1.65rem)] text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-10 font-serif text-lg font-medium text-cream-paper sm:text-xl [text-shadow:0_2px_14px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.65)]">
              24 тамыз 2026 · сағат 19:00 · Астана
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
