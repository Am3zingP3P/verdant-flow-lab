import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

export function SlowFast() {
  const { t } = useI18n();

  return (
    <section className="relative mx-auto max-w-[1480px] px-6 py-32 md:px-10">
      <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Copy column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 lg:col-span-5"
        >
          <p className="text-eyebrow text-[color:var(--sprout)]">
            {t("slowfast.eyebrow")}
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.95] text-[color:var(--moss)] [text-wrap:balance] max-w-[14ch]">
            <span className="block">{t("slowfast.titleSlow")}</span>
            <span className="block italic font-light text-[color:var(--sprout)]">
              {t("slowfast.titleFast")}
            </span>
          </h2>
          <p className="mt-8 max-w-md text-[color:var(--moss)]/70 leading-relaxed text-lede">
            {t("slowfast.body")}
          </p>
          <div className="mt-10 flex items-center gap-4 text-eyebrow text-[color:var(--moss)]/60">
            <span className="inline-block h-px w-10 bg-[color:var(--moss)]/40" />
            {t("slowfast.caption")}
          </div>
        </motion.div>

        {/* Visual placeholder column */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 lg:col-span-7"
        >
          <div
            className="relative w-full overflow-hidden border border-[color:var(--moss)]/10 bg-[color:var(--sand)]"
            style={{ aspectRatio: "16 / 9", borderRadius: 24 }}
          >
            {/* Soft organic gradient field */}
            <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--sand)] via-[color:var(--cream)] to-[color:var(--sprout)]/15" />
            <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-[color:var(--sprout)]/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-[360px] w-[360px] rounded-full bg-[color:var(--moss)]/10 blur-[100px]" />

            {/* Centered minimal placeholder mark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <SproutMark />
            </div>

            {/* Bottom-left meta */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-eyebrow text-[color:var(--moss)]/60">
              <span>Day 01 → Day 08</span>
              <span className="font-display italic text-base normal-case tracking-normal text-[color:var(--moss)]/80">
                in vivo
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SproutMark() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-40 w-40 md:h-56 md:w-56 opacity-90"
      aria-hidden
    >
      <defs>
        <radialGradient id="sf-soft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7CB58A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4A7C59" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sf-leaf" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7CB58A" />
          <stop offset="100%" stopColor="#4A7C59" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#sf-soft)" />
      <circle
        cx="100"
        cy="100"
        r="78"
        fill="none"
        stroke="#1C352D"
        strokeOpacity="0.12"
        strokeDasharray="1 5"
      />
      <path
        d="M100 150 C 99 120, 108 100, 100 70"
        stroke="#4A7C59"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M100 92 C 78 84, 70 70, 74 54 C 92 58, 102 72, 100 92 Z"
        fill="url(#sf-leaf)"
      />
      <path
        d="M100 82 C 122 74, 130 60, 126 44 C 108 48, 98 62, 100 82 Z"
        fill="url(#sf-leaf)"
        opacity="0.92"
      />
    </svg>
  );
}