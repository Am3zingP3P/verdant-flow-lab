import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";


import imgJarBroccoli from "@/assets/gallery/01-jar-broccoli.jpg";
import imgSeedBox from "@/assets/gallery/02-seed-box.jpg";
import imgRadish from "@/assets/gallery/03-radish.jpg";
import imgMung from "@/assets/gallery/04-mung.jpg";
import imgHands from "@/assets/gallery/05-hands.jpg";
import imgFamily from "@/assets/gallery/06-family.jpg";
import imgAlfalfa from "@/assets/gallery/07-alfalfa.jpg";

type Item = {
  name: string;
  day: string;
  desc?: string;
  src: string;
  position: string;
  span: string;
  ratio: string;
};

const items: Item[] = [
  {
    name: "Csíráztató üveg és brokkolimag",
    day: "Az eszköz",
    desc: "A sárga csíráztató üveg egy fatönkön, mellette brokkoli csíramag.",
    src: imgJarBroccoli,
    position: "object-center",
    span: "md:col-span-5 md:row-span-2",
    ratio: "aspect-[4/5]",
  },
  {
    name: "Magvak rekeszekben",
    day: "A választék",
    desc: "Magtároló doboz felülnézetből, tele magvakkal.",
    src: imgSeedBox,
    position: "object-center",
    span: "md:col-span-4",
    ratio: "aspect-[4/3]",
  },
  {
    name: "Retek csíramag",
    day: "Rotkvica",
    desc: "Retek csíramag a csíráztató üveg mellett.",
    src: imgRadish,
    position: "object-center",
    span: "md:col-span-3",
    ratio: "aspect-square",
  },
  {
    name: "Mungóbab a tönkön",
    day: "Mungo pasulj",
    src: imgMung,
    position: "object-center",
    span: "md:col-span-3",
    ratio: "aspect-square",
  },
  {
    name: "Egy marék csíramag",
    day: "Kézzel mérve",
    src: imgHands,
    position: "object-center",
    span: "md:col-span-4",
    ratio: "aspect-[4/3]",
  },
  {
    name: "A teljes kínálat",
    day: "Öt fajta",
    desc: "Mind az öt csíramag egymás mellett: retek, lucerna, brokkoli, mungóbab és görögszéna.",
    src: imgFamily,
    position: "object-center",
    span: "md:col-span-7",
    ratio: "aspect-[16/9]",
  },
  {
    name: "Lucerna csíramag",
    day: "Lucerka",
    desc: "A lucerna csíramag zacskója a napsütötte fatönkön, körülötte apró aranyszínű magvak.",
    src: imgAlfalfa,
    position: "object-[center_48%]",
    span: "md:col-span-5",
    ratio: "aspect-[5/4]",
  },
];

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex === null ? null : items[openIndex];

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close]);

  return (
    <section id="gallery" className="bg-[color:var(--cream)] px-4 py-24 sm:px-6 sm:py-32 md:px-10">
      <div className="mx-auto max-w-[1380px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col items-start justify-between gap-6 sm:mb-24 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-[color:var(--sprout)]" />
              <span className="text-eyebrow italic text-[color:var(--sprout)]">Galéria</span>
            </div>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-[color:var(--moss)]">
              A növekedés <em className="italic text-[color:var(--sprout)]">pillanatai</em>.
            </h2>
          </div>
          <p className="max-w-sm text-[color:var(--moss)]/65 sm:text-right">
            A magtól egészen a tányerodig. Napok alatt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-12 md:gap-7">
          {items.map((it, i) => (
            <motion.figure
              key={it.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setOpenIndex(i)}
              className={`group relative isolate cursor-pointer overflow-hidden rounded-2xl [transform:translateZ(0)] [backface-visibility:hidden] ${it.span} ${it.ratio}`}
            >
              {/* Photo */}
              <img
                src={it.src}
                alt={it.desc ?? it.name}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full rounded-2xl object-cover ${it.position} transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]`}
              />
              {/* Constant soft bottom shade so captions stay legible */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-[color:var(--moss)]/45 via-transparent to-transparent dark:from-[color:var(--cream)]/58 dark:via-[color:var(--cream)]/10" />
              {/* Hover gradient veil */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-[color:var(--moss)]/85 via-[color:var(--moss)]/20 to-transparent opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 dark:from-[color:var(--cream)]/78 dark:via-[color:var(--sand)]/28" />

              {/* Index marker */}
              <span className="pointer-events-none absolute left-5 top-5 z-10 text-[10px] uppercase tracking-[0.25em] text-white/80 opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Caption */}
              <figcaption className="absolute inset-x-0 bottom-0 z-10 translate-y-0 p-5 opacity-100 transition-all duration-500 ease-out md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--cream)]/70 dark:text-[color:var(--obsidian)]/70">
                      {it.day}
                    </p>
                    <h3 className="mt-1 font-sans text-base font-medium tracking-tight text-[color:var(--cream)] dark:text-[color:var(--obsidian)] sm:text-lg">
                      {it.name}
                    </h3>
                    {it.desc && (
                      <p className="mt-1.5 text-[13px] leading-snug text-[color:var(--cream)]/80 dark:text-[color:var(--obsidian)]/85">
                        {it.desc}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenIndex(i);
                    }}
                    aria-label={`${it.name} megnyitása nagyban`}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[color:var(--cream)]/35 bg-[color:var(--cream)]/10 text-[color:var(--cream)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 hover:bg-[color:var(--cream)]/25 dark:border-[color:var(--obsidian)]/25 dark:bg-[color:var(--obsidian)]/10 dark:text-[color:var(--obsidian)] dark:hover:bg-[color:var(--obsidian)]/20"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </button>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
            className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-[color:var(--moss)]/55 p-4 backdrop-blur-xl sm:p-8 dark:bg-[color:var(--sand)]/94"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto w-full max-w-3xl rounded-[28px] border border-[color:var(--cream)]/20 bg-[color:var(--cream)]/95 p-3 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] sm:p-4"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Bezárás"
                className="absolute -top-3 right-2 z-10 grid h-11 w-11 place-items-center rounded-full border border-[color:var(--cream)]/30 bg-[color:var(--moss)] text-[color:var(--cream)] shadow-lg transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 sm:-top-4 sm:-right-4"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>

              <img
                src={active.src}
                alt={active.desc ?? active.name}
                className="max-h-[62vh] w-full rounded-[20px] object-contain"
              />

              <div className="px-2 pb-2 pt-5 sm:px-4 sm:pb-3">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--sprout)]">{active.day}</p>
                <h3 className="mt-2 font-display text-2xl font-light tracking-[-0.01em] text-[color:var(--moss)] sm:text-3xl">
                  {active.name}
                </h3>
                {active.desc && (
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[color:var(--moss)]/70">{active.desc}</p>
                )}
                <div className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[color:var(--moss)]/45">
                  <span className="h-px w-8 bg-[color:var(--sprout)]/50" />
                  {String((openIndex ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}