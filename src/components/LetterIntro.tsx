"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { WaxSeal } from "@/components/WaxSeal";

type Props = {
  open: boolean;
  prefersReducedMotion: boolean;
  onOpen: () => void;
};

/** Один тон на все части: без вертикального градиента на каждой половине — иначе на сгибе цвет «ломается». */
const greenTexture: CSSProperties = {
  backgroundColor: "#c6e6fb",
  backgroundImage: [
    `url("data:image/svg+xml,%3Csvg viewBox='0 0 280 280' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.075'/%3E%3C/svg%3E")`,
    "repeating-linear-gradient(8deg, rgba(255,255,255,0.08) 0 1px, rgba(138,169,192,0.05) 1px 3px, rgba(255,255,255,0.03) 3px 6px)",
    "linear-gradient(175deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 38%, rgba(125,161,187,0.1) 72%, rgba(255,255,255,0.14) 100%)",
  ].join(", "),
  backgroundBlendMode: "soft-light, multiply, normal",
};

const flapClip = "polygon(0 0, 100% 0, 50% 100%)";

/** Общий «бумажный» ease — без резкого старта */
const paperEase = [0.33, 0, 0.2, 1] as const;
/** Плавное замедление в конце (клапан «доскальзывает») */
const paperEaseOut = [0.16, 1, 0.3, 1] as const;
const paperEaseSoft = [0.22, 1, 0.5, 1] as const;

/**
 * Верхний клапан ускользает вверх (2D), без 3D-разворота; под ним — сайт.
 */
export function LetterIntro({ open, prefersReducedMotion, onOpen }: Props) {
  const isOpen = open;
  const instant = prefersReducedMotion;

  const lift = isOpen ? 1.028 : 1;

  /** Один слой на весь экран — без стыка верх/низ и рассинхрона в конце */
  const bodyOpacity = instant
    ? { duration: 0.4, ease: paperEaseOut, delay: 0.24 }
    : { duration: 1.92, ease: paperEaseSoft, delay: 0.82 };

  const bodyScale = instant
    ? { duration: 0.58, ease: paperEaseOut, delay: 0.16 }
    : { duration: 2.68, ease: paperEase, delay: 0.38 };

  const flapTransition = instant
    ? {
        y: { duration: 0.74, ease: paperEaseOut },
        opacity: { duration: 0.52, ease: paperEaseSoft, delay: 0.19 },
        scale: { duration: 0.72, ease: paperEaseOut, delay: 0.06 },
      }
    : {
        y: { duration: 2.88, ease: paperEaseOut },
        opacity: {
          duration: 1.72,
          ease: paperEaseSoft,
          delay: 1.18,
        },
        scale: { duration: 2.88, ease: paperEase, delay: 0.1 },
      };

  /** На мобильном делаем клапан выше, чтобы крышка не выглядела узкой */
  const halfShell = "absolute inset-x-0 top-0 bottom-[42%] sm:bottom-1/2" as const;

  const shellShade =
    "inset 0 0 74px rgba(59,92,117,0.08), inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(93,125,147,0.14)" as const;

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden bg-transparent"
      aria-hidden
    >
      <div className="relative h-full min-h-[100dvh] w-full">
        {!isOpen ? (
          <button
            type="button"
            onClick={onOpen}
            className="absolute left-1/2 top-[78%] z-[20] -translate-x-1/2 rounded-full border border-gold-brand/60 bg-gradient-to-b from-[#fffaf0] to-[#f7eedf] px-6 py-2.5 font-serif text-[0.8rem] font-medium italic tracking-[0.08em] text-emerald-brand/95 shadow-[0_10px_26px_rgba(0,0,0,0.16)] ring-1 ring-[#fff7ea]/80 transition duration-300 hover:-translate-y-0.5 hover:border-gold-brand hover:from-[#fffdf7] hover:to-[#f8f0e2] hover:shadow-[0_12px_28px_rgba(0,0,0,0.2)] sm:top-[74%] sm:px-7 sm:text-[0.86rem]"
          >
            Ашу
          </button>
        ) : null}

        <motion.div
          className="absolute inset-0 z-[1]"
          style={{
            ...greenTexture,
            boxShadow: shellShade,
            willChange: "transform, opacity",
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: lift, opacity: isOpen ? 0 : 1 }}
          transition={{
            opacity: bodyOpacity,
            scale: bodyScale,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            backgroundImage: [
              "linear-gradient(135deg, rgba(88,121,145,0.2) 0, rgba(88,121,145,0.2) 1px, transparent 1px)",
              "linear-gradient(45deg, rgba(88,121,145,0.2) 0, rgba(88,121,145,0.2) 1px, transparent 1px)",
              "linear-gradient(225deg, rgba(255,255,255,0.22) 0, rgba(255,255,255,0.22) 1px, transparent 1px)",
              "linear-gradient(315deg, rgba(255,255,255,0.22) 0, rgba(255,255,255,0.22) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "50% 50%, 50% 50%, 50% 50%, 50% 50%",
            backgroundPosition: "0 0, 100% 0, 0 100%, 100% 100%",
            backgroundRepeat: "no-repeat",
            opacity: isOpen ? 0 : 0.38,
            transition: "opacity 280ms ease",
          }}
          aria-hidden
        />

        {/* Клапан + печать: уезжают вверх за экран */}
        <motion.div
          className={`${halfShell} z-[3] will-change-transform`}
          style={{
            filter:
              "drop-shadow(0 12px 24px rgba(0,0,0,0.18)) drop-shadow(0 4px 10px rgba(0,0,0,0.1))",
          }}
          initial={{ y: 0, scale: 1, opacity: 1 }}
          animate={
            isOpen
              ? { y: "-125vh", scale: lift, opacity: 0 }
              : { y: 0, scale: 1, opacity: 1 }
          }
          transition={flapTransition}
        >
          <div className="relative h-full w-full">
            <div
              className="absolute inset-0"
              style={{
                ...greenTexture,
                clipPath: flapClip,
                WebkitClipPath: flapClip,
                boxShadow: "inset 0 -6px 20px rgba(0,0,0,0.12)",
              }}
            />
          </div>

          <div
            className="absolute bottom-0 left-1/2 z-10 flex h-[min(40vw,196px)] w-[min(40vw,196px)] -translate-x-1/2 translate-y-[38%] items-center justify-center sm:translate-y-[44%] sm:h-[214px] sm:w-[214px]"
          >
            <WaxSeal className="h-full w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
