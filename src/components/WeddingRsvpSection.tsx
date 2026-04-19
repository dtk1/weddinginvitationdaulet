"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const soft = [0.25, 0.1, 0.25, 1] as const;

const RSVP_EMAIL = process.env.NEXT_PUBLIC_RSVP_EMAIL ?? "";

type Party = "alone" | "spouse" | "";

type Props = {
  revealed: boolean;
};

/**
 * Тойға қатысуды растау — палитра крем / изумруд / алтын; шақыру ең көбі екі адамға.
 */
export function WeddingRsvpSection({ revealed }: Props) {
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<"yes" | "no" | "">("");
  const [party, setParty] = useState<Party>("");
  const [spouseName, setSpouseName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (!successModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSuccessModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [successModalOpen]);

  function handleAttendChange(next: "yes" | "no") {
    setAttend(next);
    if (next === "no") {
      setParty("");
      setSpouseName("");
    }
  }

  function handlePartyChange(next: Party) {
    setParty(next);
    if (next === "alone") setSpouseName("");
  }

  function canSubmit() {
    if (!name.trim() || !attend) return false;
    if (attend === "no") return true;
    if (!party) return false;
    if (party === "spouse" && !spouseName.trim()) return false;
    return true;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit()) return;

    const attendanceText =
      attend === "yes" ? "Қатысамын" : "Қатыса алмаймын";

    const lines = [`Аты-жөні: ${name.trim()}`, `Қатысу: ${attendanceText}`];

    if (attend === "yes" && party) {
      const partyLabel =
        party === "alone" ? "Жалғыз келемін" : "Жұбайымен келемін";
      lines.push(`Келу түрі: ${partyLabel}`);
      if (party === "spouse") {
        lines.push(`Жұбайыңыздың есімі: ${spouseName.trim()}`);
      }
    }

    const body = lines.join("\n");

    if (RSVP_EMAIL) {
      const subject = encodeURIComponent("Тойға қатысу — растау");
      const mailBody = encodeURIComponent(body);
      window.location.href = `mailto:${RSVP_EMAIL}?subject=${subject}&body=${mailBody}`;
    }

    setSubmitted(true);
    setSuccessModalOpen(true);
  }

  function closeSuccessModal() {
    setSuccessModalOpen(false);
  }

  return (
    <section
      className="relative overflow-hidden border-t border-emerald-brand/[0.08] bg-[#f7f5f0] px-5 py-16 sm:px-8 sm:py-20"
      aria-labelledby="rsvp-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 paper-grain opacity-[0.55]"
        aria-hidden
      />
      <AnimatePresence>
        {successModalOpen && submitted ? (
          <motion.div
            key="rsvp-success-modal"
            className="fixed inset-0 z-[10050] flex items-center justify-center p-5"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: soft }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-emerald-brand/45 backdrop-blur-[3px]"
              aria-label="Хабарламаны жабу"
              onClick={closeSuccessModal}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="rsvp-success-title"
              className="relative z-[1] w-full max-w-md rounded-2xl border-2 border-gold-brand/35 bg-cream-paper px-8 py-10 shadow-[0_24px_60px_rgba(26,77,58,0.2)] sm:px-10 sm:py-12"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.32, ease: soft }}
            >
              <div
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-brand bg-emerald-brand/10 text-emerald-brand"
                aria-hidden
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3
                id="rsvp-success-title"
                className="font-serif text-2xl font-semibold leading-snug text-emerald-brand sm:text-[1.65rem]"
              >
                Тіркелу сәтті аяқталды!
              </h3>
              <p className="mt-4 font-serif text-lg leading-relaxed text-emerald-brand/80 sm:text-xl">
                {RSVP_EMAIL
                  ? "Пошта қолданбасы ашылса, хатты жіберуді растаңыз."
                  : "Деректеріңіз қабылданды. Тойда кездескенше!"}
              </p>
              <button
                type="button"
                onClick={closeSuccessModal}
                className="mt-8 w-full rounded-full border-2 border-gold-brand bg-emerald-brand px-6 py-3.5 font-serif text-base font-semibold uppercase tracking-[0.14em] text-cream-paper shadow-sm transition hover:border-gold-hi hover:bg-emerald-brand/95 sm:text-lg"
              >
                Түсіндім
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="relative mx-auto max-w-xl text-center md:max-w-2xl"
        initial={false}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.95, ease: soft, delay: revealed ? 0.06 : 0 }}
      >
        <h2
          id="rsvp-heading"
          className="font-serif text-[clamp(1.15rem,4vw,1.45rem)] font-semibold uppercase leading-snug tracking-[0.1em] text-emerald-brand sm:tracking-[0.12em]"
        >
          Тойға қатысуыңызды растауыңызды сұраймыз!
        </h2>

        {!submitted ? (
          <p className="mx-auto mt-6 max-w-2xl font-calendar text-[0.92rem] font-medium uppercase leading-relaxed tracking-[0.08em] text-emerald-brand/85 sm:mt-7 sm:text-[1.02rem] sm:tracking-[0.08em]">
            Өз есіміңізді жазыңыз; қатысатын болсаңыз, келу түрін таңдаңыз.
          </p>
        ) : null}

        {submitted && !successModalOpen ? (
          <p
            className="mt-10 font-serif text-xl text-emerald-brand sm:text-2xl"
            role="status"
          >
            Рақмет! Жауабыңыз сақталды.
          </p>
        ) : !submitted ? (
          <form
            className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-8"
            onSubmit={handleSubmit}
            noValidate
          >
            <label className="sr-only" htmlFor="rsvp-name">
              Аты-жөніңіз
            </label>
            <input
              id="rsvp-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Есіміңіз"
              className="w-full rounded-full border-2 border-emerald-brand/35 bg-cream-paper/95 px-6 py-4 text-center font-serif text-xl text-emerald-brand placeholder:text-center placeholder:font-script placeholder:text-[1.4rem] placeholder:text-emerald-brand/40 focus:border-gold-brand focus:outline-none focus:ring-2 focus:ring-gold-brand/25 sm:py-5 sm:text-2xl"
            />

            <fieldset className="w-full space-y-4 text-left sm:mx-auto sm:max-w-sm">
              <legend className="sr-only">Қатысу</legend>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl px-1 py-2 font-serif text-xl text-emerald-brand transition hover:bg-emerald-brand/[0.04] sm:text-2xl">
                <input
                  type="radio"
                  name="attend"
                  value="yes"
                  checked={attend === "yes"}
                  onChange={() => handleAttendChange("yes")}
                  className="h-5 w-5 shrink-0 border-emerald-brand text-emerald-brand focus:ring-gold-brand/40"
                  style={{ accentColor: "#1A4D3A" }}
                />
                Қатысамын
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl px-1 py-2 font-serif text-xl text-emerald-brand transition hover:bg-emerald-brand/[0.04] sm:text-2xl">
                <input
                  type="radio"
                  name="attend"
                  value="no"
                  checked={attend === "no"}
                  onChange={() => handleAttendChange("no")}
                  className="h-5 w-5 shrink-0 border-emerald-brand text-emerald-brand focus:ring-gold-brand/40"
                  style={{ accentColor: "#1A4D3A" }}
                />
                Қатыса алмаймын
              </label>
            </fieldset>

            {attend === "yes" ? (
              <div className="w-full space-y-4">
                <fieldset className="w-full space-y-3">
                  <legend className="mb-1 w-full text-center font-serif text-[0.82rem] font-semibold uppercase tracking-[0.13em] text-emerald-brand/75 sm:text-[0.9rem]">
                    Келуіңіз
                  </legend>
                  <div
                    className="flex gap-1.5 rounded-full border-2 border-emerald-brand/30 bg-cream-paper/90 p-1.5 shadow-sm sm:gap-2"
                    role="radiogroup"
                    aria-label="Келу түрі"
                  >
                    <label
                      className={`flex min-h-[3.25rem] flex-1 cursor-pointer items-center justify-center rounded-full px-2 py-3 text-center font-serif text-[0.9rem] font-medium leading-snug text-emerald-brand transition sm:min-h-0 sm:px-3 sm:text-[0.98rem] ${
                        party === "alone"
                          ? "bg-emerald-brand text-cream-paper shadow-sm"
                          : "hover:bg-emerald-brand/[0.07]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="party"
                        value="alone"
                        checked={party === "alone"}
                        onChange={() => handlePartyChange("alone")}
                        className="sr-only"
                      />
                      Жалғыз келемін
                    </label>
                    <label
                      className={`flex min-h-[3.25rem] flex-1 cursor-pointer items-center justify-center rounded-full px-2 py-3 text-center font-serif text-[0.9rem] font-medium leading-snug text-emerald-brand transition sm:min-h-0 sm:px-3 sm:text-[0.98rem] ${
                        party === "spouse"
                          ? "bg-emerald-brand text-cream-paper shadow-sm"
                          : "hover:bg-emerald-brand/[0.07]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="party"
                        value="spouse"
                        checked={party === "spouse"}
                        onChange={() => handlePartyChange("spouse")}
                        className="sr-only"
                      />
                      Жұбайымен келемін
                    </label>
                  </div>
                </fieldset>

                <p className="mx-auto max-w-[28rem] text-center font-serif text-[0.84rem] italic leading-relaxed text-emerald-brand/72 sm:text-[0.92rem]">
                  Орын саны шектеулі болғандықтан, түсіністік танытқаныңызға рақмет!
                </p>

                {party === "spouse" ? (
                  <div className="w-full text-left">
                    <label
                      htmlFor="rsvp-spouse-name"
                      className="mb-2 block text-center font-serif text-[0.82rem] font-semibold uppercase tracking-[0.11em] text-emerald-brand/80 sm:text-[0.9rem]"
                    >
                      Жұбайыңыздың есімі
                    </label>
                    <input
                      id="rsvp-spouse-name"
                      name="spouseName"
                      type="text"
                      autoComplete="name"
                      value={spouseName}
                      onChange={(e) => setSpouseName(e.target.value)}
                      placeholder="Есімі міндетті"
                      required
                      aria-required="true"
                      className="w-full rounded-full border-2 border-emerald-brand/35 bg-cream-paper/95 px-6 py-4 text-center font-serif text-xl text-emerald-brand placeholder:text-center placeholder:font-script placeholder:text-[1.25rem] placeholder:text-emerald-brand/40 focus:border-gold-brand focus:outline-none focus:ring-2 focus:ring-gold-brand/25 sm:py-5 sm:text-2xl"
                    />
                  </div>
                ) : null}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!canSubmit()}
              className="w-full max-w-sm rounded-full border-2 border-gold-brand bg-emerald-brand px-8 py-4 font-serif text-lg font-semibold uppercase tracking-[0.16em] text-cream-paper shadow-sm transition hover:border-gold-hi hover:bg-emerald-brand/95 disabled:cursor-not-allowed disabled:opacity-45 sm:text-xl"
            >
              Жіберу
            </button>

            {!RSVP_EMAIL ? (
              <p className="font-serif text-base leading-relaxed text-emerald-brand/55 sm:text-lg">
                Пошта арқылы жіберу үшін жобаға{" "}
                <code className="rounded bg-emerald-brand/10 px-1 py-0.5 text-[0.88rem] sm:text-[0.95rem]">
                  NEXT_PUBLIC_RSVP_EMAIL
                </code>{" "}
                орнатыңыз.
              </p>
            ) : null}
          </form>
        ) : null}
      </motion.div>
    </section>
  );
}
