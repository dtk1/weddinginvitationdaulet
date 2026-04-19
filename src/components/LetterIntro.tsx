"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { WaxSeal } from "@/components/WaxSeal";

type Props = {
  open: boolean;
  prefersReducedMotion: boolean;
};

/** Один тон на все части: без вертикального градиента на каждой половине — иначе на сгибе цвет «ломается». */
const greenTexture: CSSProperties = {
  backgroundColor: "#1A4D3A",
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.065'/%3E%3C/svg%3E")`,
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
export function LetterIntro({ open, prefersReducedMotion }: Props) {
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

  /** Область только под треугольный клапан (верх 50%) */
  const halfShell = "absolute inset-x-0 top-0 bottom-1/2" as const;

  const shellShade = "inset 0 0 72px rgba(0,0,0,0.04)" as const;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden bg-transparent"
      aria-hidden
    >
      <div className="relative h-full min-h-[100dvh] w-full">
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
            className="absolute bottom-0 left-1/2 z-10 flex h-[min(40vw,196px)] w-[min(40vw,196px)] -translate-x-1/2 translate-y-[44%] items-center justify-center sm:h-[214px] sm:w-[214px]"
          >
            <WaxSeal className="h-full w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
