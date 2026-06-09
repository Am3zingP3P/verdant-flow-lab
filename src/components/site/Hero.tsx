import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 80, damping: 22, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 80, damping: 22, mass: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, [mx, my]);

  const tx = useTransform(smx, [0, 1], [-20, 20]);
  const ty = useTransform(smy, [0, 1], [-20, 20]);
  const tx2 = useTransform(smx, [0, 1], [25, -25]);
  const ty2 = useTransform(smy, [0, 1], [25, -25]);
  const seedScale = useTransform(smy, [0, 1], [1.05, 0.95]);

  const lines = [t("hero.titleA"), t("hero.titleB"), t("hero.titleC")];

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden pt-32 md:pt-40"
    >
      {/* Ambient blobs */}
      <motion.div
        style={{ x: tx, y: ty }}
        className="pointer-events-none absolute -top-20 -left-24 h-[520px] w-[520px] rounded-full bg-[color:var(--sprout)]/15 blur-3xl"
      />
      <motion.div
        style={{ x: tx2, y: ty2 }}
        className="pointer-events-none absolute -right-32 top-20 h-[600px] w-[600px] rounded-full bg-[color:var(--moss)]/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-[1480px] grid-cols-12 gap-6 px-6 md:px-10">
        <div className="col-span-12 lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-eyebrow flex items-center gap-3 text-[color:var(--moss)]/70"
          >
            <span className="inline-block h-px w-10 bg-[color:var(--moss)]/40" />
            {t("hero.eyebrow")}
          </motion.p>

          <h1 className="mt-8 text-display text-[color:var(--moss)]">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {i === 1 ? (
                    <em className="italic font-light text-[color:var(--sprout)]">{line}</em>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.9 }}
            className="text-lede mt-10 max-w-xl text-[color:var(--moss)]/75"
          >
            {t("hero.lede")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#explorer"
              className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--moss)] px-7 py-4 text-[0.82rem] font-medium tracking-wider text-[color:var(--cream)] uppercase transition-all hover:bg-[color:var(--sprout)]"
            >
              {t("cta.explore")}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#seeds"
              className="text-[0.82rem] tracking-wider uppercase text-[color:var(--moss)] underline-offset-8 decoration-[color:var(--sprout)]/60 decoration-1 hover:underline"
            >
              {t("cta.shop")}
            </a>
          </motion.div>
        </div>

        {/* SVG seed visual */}
        <motion.div
          style={{ x: tx2, y: ty2 }}
          className="col-span-12 lg:col-span-4 relative mt-16 lg:mt-0 flex items-center justify-center"
        >
          <motion.div style={{ scale: seedScale }} className="animate-breathe">
            <SeedVisual />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-eyebrow text-[color:var(--moss)]/60"
      >
        {t("hero.scroll")}
        <span className="relative block h-10 w-px overflow-hidden bg-[color:var(--moss)]/15">
          <motion.span
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-full bg-[color:var(--sprout)]"
          />
        </span>
      </motion.div>
    </section>
  );
}

function SeedVisual() {
  return (
    <svg viewBox="0 0 320 360" className="h-[300px] w-[300px] md:h-[380px] md:w-[380px]" aria-hidden>
      <defs>
        <radialGradient id="seedGrad" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#6E9F7B" />
          <stop offset="60%" stopColor="#4A7C59" />
          <stop offset="100%" stopColor="#1C352D" />
        </radialGradient>
        <linearGradient id="leafGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7CB58A" />
          <stop offset="100%" stopColor="#4A7C59" />
        </linearGradient>
      </defs>

      {/* outer halo ring */}
      <circle cx="160" cy="180" r="148" fill="none" stroke="#1C352D" strokeOpacity="0.08" strokeDasharray="2 6" />
      <circle cx="160" cy="180" r="118" fill="none" stroke="#1C352D" strokeOpacity="0.12" />

      {/* seed body */}
      <ellipse cx="160" cy="210" rx="58" ry="78" fill="url(#seedGrad)" />
      <path d="M160 138 C 145 165, 145 220, 160 285" stroke="#0F1F1A" strokeOpacity="0.25" fill="none" />

      {/* sprout stem */}
      <path
        d="M160 140 C 158 110, 168 95, 160 65"
        stroke="#4A7C59"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* leaves */}
      <path d="M160 90 C 130 78, 118 60, 122 40 C 144 44, 160 62, 160 90 Z" fill="url(#leafGrad)" />
      <path d="M160 78 C 188 66, 200 48, 196 28 C 174 32, 158 50, 160 78 Z" fill="url(#leafGrad)" opacity="0.92" />
    </svg>
  );
}