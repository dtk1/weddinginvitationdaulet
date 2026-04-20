"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const soft = [0.25, 0.1, 0.25, 1] as const;

const SEAL_LETTER_FILL = "#5c4033" as const;

/**
 * Монограмма D / G — те же сдвиги и повороты, что на WaxSeal (сургуч).
 */
function SealStyleMonogram() {
  return (
    <div className="mt-10 flex flex-col items-center sm:mt-12">
      <span className="sr-only">Дәулет, Гүлмира</span>
      <svg
        viewBox="0 0 220 130"
        className="mx-auto h-[clamp(5.5rem,24vw,8.75rem)] w-auto max-w-[min(100%,320px)]"
        aria-hidden
      >
        <g transform="translate(110 72)">
          <g
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: "62px",
            }}
          >
            <g
              transform="translate(-16 -1) rotate(-9) translate(1.2 1.8)"
              opacity={0.42}
            >
              <text
                fill="#1a0f08"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                D
              </text>
            </g>
            <g
              transform="translate(6 22) rotate(6) translate(1.2 1.8)"
              opacity={0.42}
            >
              <text
                fill="#1a0f08"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                G
              </text>
            </g>
            <g transform="translate(-16 -1) rotate(-9)">
              <text
                fill={SEAL_LETTER_FILL}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                D
              </text>
            </g>
            <g transform="translate(6 22) rotate(6)">
              <text
                fill={SEAL_LETTER_FILL}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                G
              </text>
            </g>
            <g
              fill="none"
              stroke="rgba(255,252,247,0.35)"
              strokeWidth={0.35}
            >
              <text
                transform="translate(-16 -1) rotate(-9)"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                D
              </text>
              <text
                transform="translate(6 22) rotate(6)"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                G
              </text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

/** Қол сақинасы — жұмсақ жиек (референстегідей) */
const HANDS_IMAGE =
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=88";

const featherMask = {
  maskImage:
    "radial-gradient(ellipse 72% 78% at 50% 45%, #000 22%, rgba(0,0,0,0.65) 48%, transparent 72%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 72% 78% at 50% 45%, #000 22%, rgba(0,0,0,0.65) 48%, transparent 72%)",
} as const;

type Props = {
  revealed: boolean;
};

/**
 * Қолхат тәрізді ресми шақыру: крем қағаз, капс антиква, скрипт аты, фото жұмсақ маска.
 * Мәтін — той иелері (ата-ана) тұрғысынан, сайттағы Дәулет пен Гүлмираға сәйкес.
 */
export function WeddingInvitationLetter({ revealed }: Props) {
  return (
    <section
      className="relative overflow-hidden border-t border-emerald-brand/[0.07] bg-cream-paper px-5 py-16 sm:px-8 sm:py-20 md:py-24"
      aria-labelledby="invitation-letter-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 paper-grain opacity-[0.92]"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto max-w-xl text-center md:max-w-2xl md:text-[1.14em]"
        initial={false}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: soft, delay: revealed ? 0.05 : 0 }}
      >
        <h2 id="invitation-letter-heading" className="sr-only">
          Шақыру хаты
        </h2>

        <p className="font-serif text-[0.98rem] font-semibold uppercase leading-[1.85] tracking-[0.12em] text-emerald-brand sm:text-[1.08rem] sm:tracking-[0.14em] md:text-[1.16rem]">
          Құрметті ағайын-туыс, бауырлар, құда-жекжат, 
          нағашы-жиен, аға-жеңгелер, апа-жезделер, бөлелер, дос-жарандар!
        </p>

        <div className="relative mx-auto my-12 w-full max-w-[min(100%,360px)] sm:my-14 md:max-w-md">
          <div className="relative aspect-[5/4] w-full sm:aspect-[4/3]">
            <Image
              src={HANDS_IMAGE}
              alt=""
              fill
              className="object-cover object-[center_42%]"
              sizes="(max-width: 768px) 90vw, 420px"
              style={featherMask}
            />
          </div>
        </div>

        <p className="font-serif text-[0.98rem] font-semibold uppercase leading-[1.85] tracking-[0.12em] text-emerald-brand sm:text-[1.08rem] sm:tracking-[0.14em] md:text-[1.16rem]">
          Сіздерді асылдарымыз{" "}
          <span className="seal-monogram-text whitespace-nowrap normal-case font-serif text-[1.18rem] font-semibold tracking-normal sm:text-[1.34rem] md:text-[1.48rem]">
            Дәулет пен Гүлмираның
          </span>{" "}
          үйлену тойына қонақ болуға шақырамыз.
        </p>

        <SealStyleMonogram />

        <p className="mx-auto mt-10 max-w-lg font-serif text-[0.98rem] font-semibold uppercase leading-[1.85] tracking-[0.12em] text-emerald-brand sm:mt-12 sm:text-[1.08rem] sm:tracking-[0.14em] md:text-[1.16rem]">
          Тойымыздың құрметті қонағы болуыңызды шын жүректен күтеміз - сіздердің
          қуанышымызбен бөлісер сәтті бірге өткізгіміз келеді.
        </p>
      </motion.div>
    </section>
  );
}
