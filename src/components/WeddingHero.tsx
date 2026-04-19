"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { WeddingCalendarSection } from "@/components/WeddingCalendarSection";
import { WeddingCountdown } from "@/components/WeddingCountdown";
import { WeddingHostsSection } from "@/components/WeddingHostsSection";
import { WeddingInvitationLetter } from "@/components/WeddingInvitationLetter";
import { WeddingRsvpSection } from "@/components/WeddingRsvpSection";

const UNSPLASH =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85";

const AUDIO_SRC =
  "https://dl.dropbox.com/scl/fi/x34vzvgqf5y43yojr6cuz/Algyt-Aq-Koilek.mp3?rlkey=zzmsqbgane5rs2xbohreq83k8&st=bu90qxfa&dl=1";

const soft = [0.25, 0.1, 0.25, 1] as const;

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: soft },
  },
};

function MusicEqualizer() {
  return (
    <span
      className="flex h-[22px] items-end justify-center gap-[3px]"
      aria-hidden
    >
      <span
        className="hero-eq-bar h-3.5 w-[3px] rounded-full bg-gold-brand"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="hero-eq-bar h-3.5 w-[3px] rounded-full bg-gold-brand"
        style={{ animationDelay: "110ms" }}
      />
      <span
        className="hero-eq-bar h-3.5 w-[3px] rounded-full bg-gold-brand"
        style={{ animationDelay: "220ms" }}
      />
    </span>
  );
}

type Props = {
  /** 1 — оверлей ещё есть, hero уже «приглашение»; 2 — оверлей снят */
  revealPhase: number;
};

export function WeddingHero({ revealPhase }: Props) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const revealed = revealPhase >= 1;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) void a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing]);

  return (
    <>
    <motion.section
      className="relative flex min-h-screen min-h-[100dvh] flex-col paper-grain"
      initial={false}
    >
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="metadata"
        playsInline
        onEnded={() => setPlaying(false)}
      />

      <div className="relative h-[42vh] max-h-[480px] min-h-[220px] w-full shrink-0 overflow-hidden sm:h-[48vh] sm:max-h-[560px] sm:min-h-[260px]">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            scale: revealed ? 1 : 0.991,
            opacity: revealed ? 1 : 0.94,
          }}
          transition={{
            duration: 1.2,
            ease: soft,
          }}
        >
          <Image
            src={UNSPLASH}
            alt=""
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(120px,18vw)] bg-gradient-to-b from-transparent via-cream-paper/40 to-cream-paper"
            style={{
              maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 80' preserveAspectRatio='none'%3E%3Cpath fill='black' d='M0,40 Q75,52 150,38 T300,42 T450,35 T600,44 T750,36 T900,43 T1050,38 T1200,45 L1200,80 L0,80 Z'/%3E%3C/svg%3E")`,
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 80' preserveAspectRatio='none'%3E%3Cpath fill='black' d='M0,40 Q75,52 150,38 T300,42 T450,35 T600,44 T750,36 T900,43 T1050,38 T1200,45 L1200,80 L0,80 Z'/%3E%3C/svg%3E")`,
              maskSize: "100% 100%",
              maskRepeat: "no-repeat",
              maskPosition: "bottom",
            }}
          />
        </motion.div>

        <motion.button
          type="button"
          className="absolute right-4 top-4 z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white shadow-sm backdrop-blur-[2px] transition hover:bg-white/20"
          aria-label="Төменге"
          initial={false}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ delay: 0.25, duration: 0.85, ease: soft }}
          onClick={() =>
            document.getElementById("rsvp-heading")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
            className="h-[18px] w-[18px]"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.button>
      </div>

      <motion.div
        className="relative flex min-h-0 flex-1 flex-col items-center px-5 pb-16 pt-7 text-center sm:px-10 sm:pb-14 sm:pt-9"
        initial={false}
        animate={{ scale: revealed ? 1 : 0.993 }}
        transition={{ duration: 1.15, ease: soft }}
      >
        <motion.div
          className="flex w-full flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate={revealed ? "show" : "hidden"}
        >
          <motion.p
            variants={itemFade}
            className="mb-5 font-serif text-[1.02rem] font-medium uppercase tracking-[0.24em] text-emerald-brand sm:text-[1.15rem] md:text-[1.3rem]"
          >
            WEDDING DAY
          </motion.p>

          <motion.div
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.14, delayChildren: 0.05 },
              },
            }}
            className="mb-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
          >
          <motion.span
            className="gold-metallic-text font-script text-[clamp(3.55rem,12.5vw,6rem)] leading-none"
            variants={{
              hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 1.05, ease: soft },
              },
            }}
          >
            Дәулет
          </motion.span>
          <motion.span
            className="mx-1 inline-flex h-9 w-9 items-center justify-center sm:h-12 sm:w-12"
            variants={{
              hidden: { opacity: 0, scale: 0.85 },
              show: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, ease: soft },
              },
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="h-full w-full drop-shadow-sm">
              <path
                fill="#FFFCF7"
                stroke="#C4A77D"
                strokeWidth={0.9}
                d="M16 28s-9.2-5.4-12-11.8C2.8 13.2 4.6 8 9.2 8c2.4 0 4.4 1.2 5.6 3 1.2-1.8 3.2-3 5.6-3 4.6 0 6.4 5.2 5.2 8.2C23.2 22.6 16 28 16 28z"
              />
            </svg>
          </motion.span>
          <motion.span
            className="gold-metallic-text font-script text-[clamp(3.55rem,12.5vw,6rem)] leading-none"
            variants={{
              hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 1.05, ease: soft },
              },
            }}
          >
            Гүлмира
          </motion.span>
        </motion.div>

          <motion.p
            variants={itemFade}
            className="text-[clamp(1.45rem,4.2vw,2rem)] font-medium tracking-[0.2em] text-emerald-brand"
          >
            24 &nbsp;|&nbsp; 08 &nbsp;|&nbsp; 2026
          </motion.p>
        </motion.div>
      </motion.div>

      <WeddingInvitationLetter revealed={revealed} />

      <WeddingCalendarSection revealed={revealed} />

      <WeddingHostsSection revealed={revealed} />

      <WeddingCountdown revealed={revealed} />

      <WeddingRsvpSection revealed={revealed} />
    </motion.section>

    {/**
     * Вне motion.section и без Framer transform: иначе fixed «ломается» и кнопка уезжает при скролле.
     * z-[9998] — ниже LetterIntro (9999), выше контента страницы.
     */}
    <div
      className={`group fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-[max(0.75rem,env(safe-area-inset-right))] z-[9998] flex flex-row-reverse items-center gap-2 transition-opacity duration-500 ease-out sm:bottom-6 sm:right-6 sm:gap-2.5 ${revealed ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden={!revealed}
    >
      <button
        type="button"
        aria-label={playing ? "Музыканы тоқтату" : "Музыканы қосу"}
        onClick={() => setPlaying((p) => !p)}
        className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border border-gold-brand bg-[#1A4D3A] text-gold-brand shadow-[0_6px_24px_rgba(26,77,58,0.28)] transition duration-300 hover:shadow-[0_8px_28px_rgba(26,77,58,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-brand/45 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-paper active:scale-[0.97]"
      >
        {playing ? (
          <MusicEqualizer />
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="ml-0.5 h-[22px] w-[22px]"
            fill="currentColor"
            aria-hidden
          >
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        )}
      </button>
      <span
        className="pointer-events-none select-none font-serif text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-emerald-brand/50 opacity-50 transition duration-300 ease-out max-sm:max-w-[5rem] max-sm:leading-tight max-sm:opacity-45 sm:translate-x-1 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-[0.72] sm:group-focus-within:translate-x-0 sm:group-focus-within:opacity-[0.72]"
        aria-hidden
      >
        МУЗЫКА
      </span>
    </div>
    </>
  );
}
