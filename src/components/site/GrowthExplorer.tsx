import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

type Stage = 0 | 1 | 2;

const seeds = [
  { key: "alfalfa", hue: "#A7C796" },
  { key: "broccoli", hue: "#4A7C59" },
  { key: "radish", hue: "#C97283" },
] as const;

const AUTOPLAY_MS = 5200;

export function GrowthExplorer() {
  const { t } = useI18n();
  const [stage, setStage] = useState<Stage>(0);
  const [seedIdx, setSeedIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const seed = seeds[seedIdx];

  // Autoplay cycle — pauses on hover/touch. Restart timer whenever stage changes manually.
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = window.setTimeout(() => {
      setStage((s) => (((s + 1) % 3) as Stage));
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [stage, isPaused, seedIdx]);

  // Bump the progress-ring key so the SVG stroke re-animates from 0 on every stage change.
  useEffect(() => {
    setProgressKey((k) => k + 1);
  }, [stage, seedIdx, isPaused]);

  const stages: Stage[] = [0, 1, 2];
  const labels = [t("explorer.stages.seed"), t("explorer.stages.germ"), t("explorer.stages.micro")];

  const handleStageClick = (s: Stage) => {
    setStage(s);
  };

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
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        className="relative mt-10 sm:mt-16 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[color:var(--moss)]/10 bg-gradient-to-b from-[color:var(--sand)] to-[color:var(--cream)]"
      >
        {/* Stage scene */}
        <div className="relative flex h-[420px] sm:h-[460px] md:h-[560px] items-end justify-center overflow-hidden">
          {/* sun glow */}
          <motion.div
            aria-hidden
            animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -top-32 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-[color:var(--sprout)]/20 blur-3xl"
          />
          {/* concentric decorative rings */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] rounded-full border border-[color:var(--moss)]/10" />
          </div>
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[380px] w-[380px] sm:h-[480px] sm:w-[480px] rounded-full border border-[color:var(--moss)]/[0.06]" />
          </div>
          {/* floating pollen particles */}
          <Pollen />
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

          {/* stage number + label (crossfades on stage change) */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-eyebrow text-[color:var(--moss)]/70">
              <span className="relative inline-flex h-2 w-2">
                <span className={`absolute inset-0 rounded-full bg-[color:var(--sprout)] ${isPaused ? "" : "animate-ping opacity-60"}`} />
                <span className="relative inline-block h-2 w-2 rounded-full bg-[color:var(--sprout)]" />
              </span>
              <span className="tabular-nums">{String(stage + 1).padStart(2, "0")} / 03</span>
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`label-${stage}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-eyebrow text-[color:var(--moss)]"
              >
                {labels[stage]}
              </motion.span>
            </AnimatePresence>
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
            {/* Stage timeline with per-stage progress rings */}
            <div className="flex-1">
              <div className="relative h-14">
                <div className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-[color:var(--moss)]/15" />
                <motion.div
                  aria-hidden
                  initial={false}
                  animate={{ width: `${(stage / 2) * 100}%` }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-3 top-1/2 h-px -translate-y-1/2 bg-[color:var(--sprout)]"
                />
                <div className="absolute inset-0 flex items-center justify-between">
                  {stages.map((s) => {
                    const active = stage === s;
                    const passed = stage >= s;
                    return (
                      <button
                        key={s}
                        onClick={() => handleStageClick(s)}
                        className="group relative flex flex-col items-center gap-3"
                        aria-label={labels[s]}
                      >
                        <span className="relative block h-7 w-7">
                          {/* progress ring — animates only around the active dot */}
                          {active && !isPaused && (
                            <svg
                              key={`ring-${progressKey}`}
                              viewBox="0 0 32 32"
                              className="absolute inset-0 h-full w-full -rotate-90"
                              aria-hidden
                            >
                              <circle
                                cx="16"
                                cy="16"
                                r="14"
                                fill="none"
                                stroke="var(--sprout)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeDasharray="87.96"
                                style={{
                                  strokeDashoffset: 87.96,
                                  animation: `ns-ring ${AUTOPLAY_MS}ms linear forwards`,
                                }}
                              />
                            </svg>
                          )}
                          <motion.span
                            animate={{
                              scale: active ? 1 : 0.7,
                              backgroundColor: passed ? "var(--sprout)" : "rgba(28,53,45,0.2)",
                            }}
                            transition={{ type: "spring", stiffness: 380, damping: 26 }}
                            className="absolute left-1/2 top-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                          />
                        </span>
                        <span
                          className={`text-[0.68rem] uppercase tracking-[0.2em] transition-colors ${
                            active ? "text-[color:var(--moss)]" : "text-[color:var(--moss)]/45"
                          }`}
                        >
                          {labels[s]}
                        </span>
                      </button>
                    );
                  })}
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
      <style>{`@keyframes ns-ring { to { stroke-dashoffset: 0; } }`}</style>
    </section>
  );
}

function Pollen() {
  // Deterministic pseudo-random offsets so SSR + client match.
  const dots = [
    { l: 12, t: 30, d: 6.2, delay: 0 },
    { l: 78, t: 22, d: 7.8, delay: 1.4 },
    { l: 30, t: 62, d: 5.6, delay: 0.6 },
    { l: 88, t: 58, d: 8.4, delay: 2.1 },
    { l: 55, t: 18, d: 7.1, delay: 3.2 },
    { l: 20, t: 80, d: 6.9, delay: 0.9 },
    { l: 70, t: 82, d: 5.4, delay: 2.6 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: [-8, -60, -110] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          className="absolute h-1 w-1 rounded-full bg-[color:var(--sprout)]/60 blur-[0.5px]"
          style={{ left: `${p.l}%`, top: `${p.t}%` }}
        />
      ))}
    </div>
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