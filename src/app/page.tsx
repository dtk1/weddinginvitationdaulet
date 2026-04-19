"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { LetterIntro } from "@/components/LetterIntro";
import { WeddingHero } from "@/components/WeddingHero";

/**
 * Длительность плавного ухода оверлея (должна покрывать анимации в LetterIntro).
 * Конверт сразу начинает открываться при монтировании — без ожидания и без клика.
 */
/** Снять оверлей сразу после короткой анимации — без «висящего» зелёного экрана */
/** Пружина клапана + поздний fade — нужен запас, иначе обрежется конец анимации */
const COVER_DURATION_MS = {
  full: 5600,
  reduced: 1300,
} as const;

export default function Home() {
  const [coverMounted, setCoverMounted] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const ms = mq.matches ? COVER_DURATION_MS.reduced : COVER_DURATION_MS.full;
    const unmount = window.setTimeout(() => setCoverMounted(false), ms);

    return () => {
      window.clearTimeout(unmount);
    };
  }, []);

  /** Пока оверлей есть — считаем приглашение уже «включённым» (hero под зелёным) */
  const revealPhase = useMemo(() => (coverMounted ? 1 : 2), [coverMounted]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cream-paper">
      {coverMounted && (
        <LetterIntro open prefersReducedMotion={prefersReducedMotion} />
      )}
      <WeddingHero revealPhase={revealPhase} />
    </main>
  );
}
