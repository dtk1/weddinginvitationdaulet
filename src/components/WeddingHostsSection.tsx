"use client";

import { motion } from "framer-motion";

const soft = [0.25, 0.1, 0.25, 1] as const;

type Props = {
  revealed: boolean;
};

/**
 * Құрметпен, той иелері — скрипт + антиква «логотипная», в палитре сайта.
 */
export function WeddingHostsSection({ revealed }: Props) {
  return (
    <section
      className="relative border-t border-emerald-brand/[0.08] px-5 py-16 sm:px-8 sm:py-20"
      aria-labelledby="hosts-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream-paper via-cream-paper to-cream-paper/92"
        aria-hidden
      />
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.97]" aria-hidden />

      <div className="relative mx-auto max-w-2xl">
        <motion.div
          initial={false}
          animate={
            revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
          }
          transition={{ duration: 0.95, ease: soft, delay: revealed ? 0.06 : 0 }}
          className="relative overflow-hidden rounded-2xl border border-gold-brand/30 bg-cream-paper/95 px-8 py-12 shadow-[0_22px_55px_rgba(26,77,58,0.09)] sm:px-12 sm:py-14"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/55 to-transparent"
            aria-hidden
          />
          <h2
            id="hosts-heading"
            className="gold-metallic-text text-center font-script text-[clamp(2.35rem,6.5vw,3.55rem)] leading-snug"
          >
            Құрметпен, той иелері:
          </h2>
          <div className="mt-8 text-center sm:mt-10">
            <div className="mx-auto mb-5 h-px w-28 bg-gradient-to-r from-transparent via-gold-brand/55 to-transparent sm:mb-6" aria-hidden />
            <p className="font-script text-[clamp(2.4rem,7vw,3.25rem)] leading-none text-emerald-brand">
              Полат
            </p>
            <p className="mt-3 font-serif text-[0.95rem] font-semibold uppercase tracking-[0.22em] text-gold-deep/85 sm:text-[1rem]">
              &
            </p>
            <p className="mt-2 font-script text-[clamp(2.4rem,7vw,3.25rem)] leading-none text-emerald-brand">
              Умида
            </p>
            <div className="mx-auto mt-6 h-px w-28 bg-gradient-to-r from-transparent via-gold-brand/55 to-transparent" aria-hidden />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
