"use client";

import { motion } from "framer-motion";

const soft = [0.25, 0.1, 0.25, 1] as const;

/** Дүйсенбіден басталады: ДС … ЖБ */
const WEEKDAYS_KK = ["ДС", "СС", "СР", "БС", "ЖМ", "СБ", "ЖБ"] as const;

const GIS_ROYAL_BALLROOM =
  "https://2gis.kz/astana/geo/70000001089235215" as const;

function mondayOffsetFromSundayJs(day: number) {
  return (day + 6) % 7;
}

function buildMonthGrid(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1);
  const lead = mondayOffsetFromSundayJs(first.getDay());
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  while (cells.length < 42) cells.push(null);
  return cells;
}

function HeartOutline({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M16 26.5c-5.2-3.4-9.5-6.8-11.2-10.6C3.4 12.6 4.2 9.2 6.8 7.6c1.3-.8 2.8-1 4.2-.6 1.3.4 2.4 1.3 3 2.4.6-1.1 1.7-2 3-2.4 1.4-.4 2.9-.2 4.2.6 2.6 1.6 3.4 5 2 8.3-1.7 3.8-6 7.2-11.2 10.6Z"
        stroke="currentColor"
        strokeWidth={1.15}
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  revealed: boolean;
};

/**
 * Тамыз 2026, 24 — дүйсенбі; палитра изумруд / золото как на hero.
 */
export function WeddingCalendarSection({ revealed }: Props) {
  const cells = buildMonthGrid(2026, 7);
  const highlightDay = 24;

  return (
    <section
      className="paper-grain border-t border-emerald-brand/[0.08] px-5 py-14 sm:px-8 sm:py-20"
      aria-labelledby="ceremony-calendar-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={false}
          animate={
            revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          transition={{ duration: 0.95, ease: soft, delay: revealed ? 0.08 : 0 }}
        >
          <h2
            id="ceremony-calendar-heading"
            className="gold-metallic-text font-script text-[clamp(2.85rem,8vw,4.1rem)] leading-tight"
          >
            Той салтанаты:
          </h2>

          <p className="mt-6 font-serif text-[1.12rem] font-semibold uppercase leading-relaxed tracking-[0.19em] text-emerald-brand sm:mt-7 sm:text-[1.28rem] sm:tracking-[0.2em] md:text-[1.38rem]">
            24 ТАМЫЗ 2026 ЖЫЛ
          </p>
          <p className="mt-3 font-serif text-[1.12rem] font-semibold uppercase tracking-[0.19em] text-emerald-brand sm:text-[1.28rem] sm:tracking-[0.2em] md:text-[1.38rem]">
            САҒАТ 18:00-ДЕ
          </p>

          <div className="mx-auto mt-12 w-full max-w-[min(100%,560px)] sm:mt-14">
            <p className="mb-4 font-serif text-[1rem] font-semibold uppercase tracking-[0.24em] text-gold-deep sm:mb-5 sm:text-[1.1rem] md:text-[1.18rem]">
              ТАМЫЗ 2026
            </p>
            <div
              className="grid grid-cols-7 gap-x-0.5 gap-y-2.5 text-emerald-brand sm:gap-y-3"
              role="grid"
              aria-label="Тамыз 2026 күнтізбесі"
            >
              {WEEKDAYS_KK.map((d) => (
                <div
                  key={d}
                  className="font-serif text-[1rem] font-semibold uppercase tracking-[0.06em] text-emerald-brand/85 sm:text-[1.12rem] md:text-[1.22rem]"
                  role="columnheader"
                >
                  {d}
                </div>
              ))}
              {cells.map((day, i) => (
                <div
                  key={i}
                  className="relative flex h-[3.65rem] items-center justify-center sm:h-[4.4rem] md:h-[4.95rem]"
                  role="gridcell"
                  aria-selected={day === highlightDay ? true : undefined}
                >
                  {day !== null ? (
                    <>
                      <span
                        className={`font-calendar text-[1.28rem] font-medium tabular-nums sm:text-[1.42rem] md:text-[1.58rem] ${
                          day === highlightDay
                            ? "relative z-[1] font-semibold text-emerald-brand"
                            : "text-emerald-brand/72"
                        }`}
                      >
                        {day}
                      </span>
                      {day === highlightDay ? (
                        <HeartOutline className="pointer-events-none absolute inset-0 m-auto h-[3.85rem] w-[3.85rem] text-gold-brand sm:h-[4.55rem] sm:w-[4.55rem] md:h-[5.35rem] md:w-[5.35rem]" />
                      ) : null}
                    </>
                  ) : (
                    <span className="block min-h-[1em]" aria-hidden />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-14 w-full max-w-2xl sm:mt-16">
            <div className="rounded-2xl border border-gold-brand/28 bg-cream-paper/95 p-8 shadow-[0_20px_48px_rgba(26,77,58,0.08)] sm:p-10 md:p-12">
              <p className="text-center font-serif text-xl font-semibold uppercase tracking-[0.24em] text-gold-deep sm:text-2xl md:text-[1.75rem]">
                Той өтетін орын
              </p>
              <h3 className="mt-6 text-center font-script text-[clamp(2.75rem,9vw,4.15rem)] font-normal leading-[1.05] sm:mt-7 sm:text-[3.35rem] md:text-[3.85rem]">
                Royal Ballroom
              </h3>
              <p className="mt-3 text-center font-serif text-xl text-emerald-brand/75 sm:text-2xl">
                Банкет залы
              </p>

              <div
                className="mt-9 rounded-xl border border-emerald-brand/10 bg-emerald-brand/[0.04] px-6 py-7 text-left sm:px-8 sm:py-8"
                role="group"
                aria-label="Мекенжай"
              >
                <p className="font-calendar text-[0.96rem] font-semibold uppercase tracking-[0.14em] text-emerald-brand/55 sm:text-[1.05rem]">
                  Мекенжай
                </p>
                <address className="mt-4 font-serif text-[1.38rem] font-medium not-italic leading-relaxed text-emerald-brand sm:text-[1.52rem] md:text-[1.65rem]">
                  Туран даңғылы, 25
                  <br />
                  Астана қаласы, Нура ауданы
                </address>
              </div>

              <div className="mt-9 flex flex-col items-center sm:mt-10">
                <a
                  href={GIS_ROYAL_BALLROOM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full max-w-md items-center justify-center gap-2.5 rounded-full border-2 border-gold-brand bg-emerald-brand px-6 py-4 text-center font-serif text-[1.12rem] font-semibold uppercase tracking-[0.12em] text-cream-paper shadow-sm transition hover:border-gold-hi hover:bg-emerald-brand/95 sm:gap-3 sm:px-7 sm:text-xl md:py-[1.25rem] md:text-[1.22rem]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    stroke="currentColor"
                    className="h-6 w-6 shrink-0 opacity-95 sm:h-7 sm:w-7"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span>2GIS-тен ашу</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
