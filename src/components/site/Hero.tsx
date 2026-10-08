import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/context";

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
    // Measure once per hover instead of on every mousemove (avoids forced reflow).
    let rect: DOMRect | null = null;
    const measure = () => {
      rect = el.getBoundingClientRect();
    };
    const invalidate = () => {
      rect = null;
    };
    const handle = (e: MouseEvent) => {
      if (!rect) measure();
      const r = rect!;
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    el.addEventListener("mouseenter", measure);
    el.addEventListener("mousemove", handle);
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);
    return () => {
      el.removeEventListener("mouseenter", measure);
      el.removeEventListener("mousemove", handle);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
    };
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
      className="relative overflow-hidden pt-[5.5rem] sm:pt-[7.5rem] md:pt-[7.5rem] lg:pt-[9.5rem] pb-16 md:pb-0 md:min-h-[100svh]"
    >
      {/* Ambient blobs */}
      <motion.div
        style={{ x: tx, y: ty, willChange: "transform" }}
        className="pointer-events-none absolute -top-20 -left-24 h-[520px] w-[520px] rounded-full bg-[color:var(--sprout)]/15 blur-3xl"
      />
      <motion.div
        style={{ x: tx2, y: ty2, willChange: "transform" }}
        className="pointer-events-none absolute -right-32 top-20 h-[600px] w-[600px] rounded-full bg-[color:var(--moss)]/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-[1480px] grid-cols-12 gap-6 px-5 sm:px-6 md:px-10">
        <div className="col-span-12 lg:col-span-7">
          <h1 className="text-display text-[color:var(--moss)] text-wrap-normal max-w-none max-sm:text-[clamp(3.25rem,10vw,4rem)] max-sm:leading-[0.88]">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.14em] text-left">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block"
                >
                  {i === 0 ? (
                    <em className="italic font-light text-[color:var(--sprout)] -ml-[0.04em]">
                      {line}
                    </em>
                  ) : i === 1 ? (
                    <em className="italic font-light text-[color:var(--moss)]/80 text-[0.78em] sm:text-[0.82em] -ml-[0.05em]">
                      {line}
                    </em>
                  ) : (
                    <span className="block font-normal text-[color:var(--sprout)] whitespace-nowrap text-[clamp(1.75rem,6.5vw,5.5rem)] max-sm:text-[clamp(1.9rem,7.2vw,3.2rem)]">
                      {line}
                    </span>
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.9 }}
            className="text-lede mt-9 sm:mt-11 max-w-xl text-[color:var(--moss)]/75"
          >
            {t("hero.lede")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.05 }}
            className="mt-11 sm:mt-14 flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <a
              href="#benefits"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[color:var(--moss)] px-6 sm:px-8 py-3.5 sm:py-4 text-[0.72rem] sm:text-[0.78rem] font-medium tracking-[0.18em] text-[color:var(--cream)] uppercase shadow-[0_10px_30px_-12px_rgba(28,53,45,0.45)] transition-all duration-500 hover:shadow-[0_18px_40px_-12px_rgba(110,159,123,0.55)] hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[color:var(--sprout)] to-[color:var(--moss)] transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">{t("cta.explore")}</span>
              <span className="relative transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* SVG seed visual */}
        <motion.div
          style={{ x: tx2, y: ty2 }}
          className="col-span-12 lg:col-span-5 relative mt-6 sm:mt-12 md:mt-4 lg:mt-0 md:-translate-y-6 flex items-center justify-center lg:justify-end lg:pr-4 xl:pr-8"
        >
          <motion.div
            style={{ scale: seedScale }}
            className="animate-breathe w-full flex justify-center lg:justify-end"
          >
            <SeedVisual />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mt-10 sm:mt-14 lg:mt-0 lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center gap-3 text-eyebrow text-[color:var(--moss)]/60 text-center"
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
    <svg
      viewBox="0 0 320 360"
      preserveAspectRatio="xMidYMid meet"
      className="h-auto w-[min(78vw,240px)] sm:w-[300px] md:w-[280px] lg:w-[420px] max-w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="seedGrad" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#A8D4B2" />
          <stop offset="35%" stopColor="#6E9F7B" />
          <stop offset="75%" stopColor="#3D6B4B" />
          <stop offset="100%" stopColor="#16271F" />
        </radialGradient>
        {/* Subsurface scattering — warm inner translucency */}
        <radialGradient id="seedSSS" cx="38%" cy="32%" r="55%">
          <stop offset="0%" stopColor="#F4E9C4" stopOpacity="0.7" />
          <stop offset="45%" stopColor="#C9B97A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3D6B4B" stopOpacity="0" />
        </radialGradient>
        {/* Specular highlight */}
        <radialGradient id="seedSpec" cx="35%" cy="25%" r="22%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="leafGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7CB58A" />
          <stop offset="100%" stopColor="#4A7C59" />
        </linearGradient>
        {/* High-frequency organic noise */}
        <filter id="seedNoise" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="4" />
          <feColorMatrix
            values="0 0 0 0 0.09
                    0 0 0 0 0.18
                    0 0 0 0 0.13
                    0 0 0 0.55 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        {/* Soft shadow under seed */}
        <radialGradient id="seedShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1C352D" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1C352D" stopOpacity="0" />
        </radialGradient>
        <clipPath id="seedClip">
          <ellipse cx="160" cy="210" rx="58" ry="78" />
        </clipPath>
      </defs>

      {/* outer halo ring */}
      <circle
        cx="160"
        cy="180"
        r="148"
        fill="none"
        stroke="#1C352D"
        strokeOpacity="0.08"
        strokeDasharray="2 6"
      />
      <circle cx="160" cy="180" r="118" fill="none" stroke="#1C352D" strokeOpacity="0.12" />

      {/* contact shadow */}
      <ellipse cx="160" cy="295" rx="56" ry="10" fill="url(#seedShadow)" />

      {/* seed body */}
      <ellipse cx="160" cy="210" rx="58" ry="78" fill="url(#seedGrad)" />
      {/* SSS inner glow */}
      <ellipse cx="160" cy="210" rx="58" ry="78" fill="url(#seedSSS)" />
      {/* organic noise (clipped to seed body) */}
      <g clipPath="url(#seedClip)" opacity="0.85">
        <rect x="100" y="130" width="120" height="160" fill="#000" filter="url(#seedNoise)" />
      </g>
      {/* soft specular highlight */}
      <ellipse cx="142" cy="178" rx="22" ry="14" fill="url(#seedSpec)" />
      <path
        d="M160 138 C 145 165, 145 220, 160 285"
        stroke="#0F1F1A"
        strokeOpacity="0.25"
        fill="none"
      />

      {/* sprout stem */}
      <path
        d="M160 140 C 158 110, 168 95, 160 65"
        stroke="#4A7C59"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* leaves */}
      <path d="M160 82 C 140 72, 130 56, 132 40 C 150 44, 160 60, 160 82 Z" fill="url(#leafGrad)" />
      <path
        d="M160 78 C 188 66, 200 48, 196 28 C 174 32, 158 50, 160 78 Z"
        fill="url(#leafGrad)"
        opacity="0.92"
      />
    </svg>
  );
}
