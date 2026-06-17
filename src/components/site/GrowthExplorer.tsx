import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

type Stage = 0 | 1 | 2;

const seeds = [
  { key: "alfalfa", hue: "#A7C796" },
  { key: "broccoli", hue: "#4A7C59" },
  { key: "radish", hue: "#C97283" },
] as const;

export function GrowthExplorer() {
  const { t } = useI18n();
  const [stage, setStage] = useState<Stage>(0);
  const [seedIdx, setSeedIdx] = useState(0);
  const seed = seeds[seedIdx];

  const drag = useMotionValue(0);
  const trackPct = useTransform(drag, [0, 1, 2], [0, 50, 100]);

  useEffect(() => {
    drag.set(stage);
  }, [stage, drag]);

  const stages: Stage[] = [0, 1, 2];
  const labels = [t("explorer.stages.seed"), t("explorer.stages.germ"), t("explorer.stages.micro")];

  return (
    <section id="explorer" className="relative mx-auto max-w-[1480px] px-5 sm:px-6 py-20 sm:py-28 md:py-32 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-12 items-end gap-8"
      >
        <div className="col-span-12 lg:col-span-6">
          <p className="text-eyebrow text-[color:var(--sprout)]">{t("explorer.eyebrow")}</p>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5.4vw,4.8rem)] leading-[1.08] text-[color:var(--moss)]">
            {t("explorer.title")}
          </h2>
        </div>
        <p className="col-span-12 lg:col-span-5 lg:col-start-8 text-lede text-[color:var(--moss)]/70">
          {t("explorer.lede")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        data-cursor="grow"
        className="relative mt-10 sm:mt-16 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[color:var(--moss)]/10 bg-gradient-to-b from-[color:var(--sand)] to-[color:var(--cream)]"
      >
        {/* Stage scene */}
        <div className="relative flex h-[420px] sm:h-[460px] md:h-[560px] items-end justify-center overflow-hidden">
          {/* sun glow */}
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-[color:var(--sprout)]/20 blur-3xl" />
          {/* soil */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-[color:var(--moss)]/5 to-[color:var(--moss)]/15" />
          <AnimatePresence mode="wait">
            <motion.div
              key={`${stage}-${seedIdx}`}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center"
            >
              <StageSvg stage={stage} hue={seed.hue} />
            </motion.div>
          </AnimatePresence>

          {/* stage label */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2 sm:gap-3 text-eyebrow text-[color:var(--moss)]/70">
            <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--sprout)] animate-breathe" />
            {labels[stage]}
          </div>

          {/* seed name */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-right max-w-[45%]">
            <p className="text-eyebrow text-[color:var(--moss)]/60">
              {(t(`seeds.${seed.key}.name`) as string)}
            </p>
            <p className="mt-1 max-w-[220px] text-xs text-[color:var(--moss)]/55 leading-snug hidden sm:block">
              {t(`seeds.${seed.key}.note`)}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="border-t border-[color:var(--moss)]/10 bg-[color:var(--cream)]/70 backdrop-blur p-5 sm:p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Stage slider */}
            <div className="flex-1">
              <div className="relative h-12">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[color:var(--moss)]/15" />
                <motion.div
                  style={{ width: useTransform(trackPct, (v) => `${v}%`) }}
                  className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-[color:var(--sprout)]"
                />
                <div className="absolute inset-0 flex items-center justify-between">
                  {stages.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStage(s)}
                      className="group relative flex flex-col items-center gap-3"
                    >
                      <motion.span
                        animate={{
                          scale: stage === s ? 1.4 : 1,
                          backgroundColor: stage >= s ? "var(--sprout)" : "rgba(28,53,45,0.2)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                        className="block h-3 w-3 rounded-full"
                      />
                      <span
                        className={`text-[0.68rem] uppercase tracking-[0.2em] transition-colors ${
                          stage === s ? "text-[color:var(--moss)]" : "text-[color:var(--moss)]/45"
                        }`}
                      >
                        {labels[s]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Seed picker */}
            <div className="flex flex-wrap items-center gap-2">
              {seeds.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setSeedIdx(i)}
                  className="group relative flex items-center gap-2 rounded-full border border-[color:var(--moss)]/10 bg-[color:var(--cream)] px-4 py-2 transition-all hover:border-[color:var(--sprout)]/40"
                >
                  <span
                    className="inline-block h-3 w-3 rounded-full transition-transform group-hover:scale-110"
                    style={{ backgroundColor: s.hue }}
                  />
                  <span
                    className={`text-[0.72rem] uppercase tracking-[0.18em] ${
                      seedIdx === i ? "text-[color:var(--moss)]" : "text-[color:var(--moss)]/50"
                    }`}
                  >
                    {(t(`seeds.${s.key}.name`) as string)}
                  </span>
                  {seedIdx === i && (
                    <motion.span
                      layoutId="seed-active"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full ring-1 ring-[color:var(--sprout)]/50"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StageSvg({ stage, hue }: { stage: Stage; hue: string }) {
  return (
    <svg viewBox="0 0 200 320" className="h-[340px] md:h-[440px]" aria-hidden>
      <defs>
        <linearGradient id="stemG" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="#1C352D" />
          <stop offset="100%" stopColor="#4A7C59" />
        </linearGradient>
      </defs>

      {/* Seed (always visible, shrinks as it grows) */}
      <motion.ellipse
        cx="100"
        cy={stage === 0 ? 260 : 290}
        rx={stage === 0 ? 22 : 10}
        ry={stage === 0 ? 30 : 12}
        fill={hue}
        initial={false}
        animate={{ cy: stage === 0 ? 260 : 290, rx: stage === 0 ? 22 : 10, ry: stage === 0 ? 30 : 12, opacity: stage === 2 ? 0.4 : 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Stem */}
      <motion.path
        d="M100 290 C 96 230, 104 200, 100 150"
        stroke="url(#stemG)"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: stage === 0 ? 0 : stage === 1 ? 0.55 : 1, opacity: stage === 0 ? 0 : 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Cotyledons (germination) */}
      <motion.g
        initial={false}
        animate={{ opacity: stage >= 1 ? 1 : 0, scale: stage >= 1 ? 1 : 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ transformOrigin: "100px 220px" }}
      >
        <path d="M100 220 C 80 215, 70 205, 72 192 C 90 196, 100 208, 100 220 Z" fill="#7CB58A" />
        <path d="M100 220 C 120 215, 130 205, 128 192 C 110 196, 100 208, 100 220 Z" fill="#7CB58A" />
      </motion.g>

      {/* Microgreen leaves */}
      <motion.g
        initial={false}
        animate={{ opacity: stage === 2 ? 1 : 0, scale: stage === 2 ? 1 : 0.4, y: stage === 2 ? 0 : 30 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{ transformOrigin: "100px 150px" }}
      >
        <path d="M100 160 C 70 140, 50 110, 58 78 C 90 86, 102 124, 100 160 Z" fill={hue} opacity="0.95" />
        <path d="M100 150 C 130 130, 152 100, 144 70 C 112 78, 100 116, 100 150 Z" fill={hue} />
        <path d="M100 140 C 100 110, 108 80, 100 50 C 92 80, 100 110, 100 140 Z" fill="#4A7C59" />
      </motion.g>
    </svg>
  );
}