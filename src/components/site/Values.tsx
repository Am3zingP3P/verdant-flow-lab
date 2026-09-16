import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import heroImage from "@/assets/IMG_3117.jpg.asset.json";


export function Values() {
  const { t } = useI18n();
  const cards = ["one", "two", "three"] as const;

  return (
    <section id="story" className="relative mx-auto max-w-[1480px] px-5 sm:px-6 py-20 sm:py-28 md:py-32 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[40ch] mb-12 sm:mb-16"
      >
        <p className="text-eyebrow text-[color:var(--sprout)]">{t("values.eyebrow")}</p>
        <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.95] text-[color:var(--moss)] [text-wrap:balance] max-w-[14ch]">
          {t("values.title")}
        </h2>
      </motion.div>

      <div className="grid grid-cols-12 gap-6 sm:gap-8 items-stretch">
        <div className="col-span-12 lg:col-span-5 flex">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full overflow-hidden border border-[color:var(--moss)]/10 bg-[color:var(--sand)]"
            style={{ aspectRatio: "4 / 5", borderRadius: 24 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--sand)] via-[color:var(--cream)] to-[color:var(--sprout)]/15" />
            <div className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-[color:var(--sprout)]/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-[260px] w-[260px] rounded-full bg-[color:var(--moss)]/10 blur-[100px]" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <svg viewBox="0 0 120 120" className="h-20 w-20 opacity-40" aria-hidden>
                <defs>
                  <linearGradient id="v-leaf" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#7CB58A" />
                    <stop offset="100%" stopColor="#4A7C59" />
                  </linearGradient>
                </defs>
                <path d="M60 105 C 59 85, 65 72, 60 50" stroke="#1C352D" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
                <path d="M60 72 C 46 66, 40 56, 44 44 C 56 48, 62 58, 60 72 Z" fill="url(#v-leaf)" />
                <path d="M60 64 C 74 58, 80 48, 76 36 C 64 40, 58 50, 60 64 Z" fill="url(#v-leaf)" opacity="0.9" />
              </svg>
              <span className="text-eyebrow text-[color:var(--moss)]/40">IMG</span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-eyebrow text-[color:var(--moss)]/40">
              <span>1200 × 1500</span>
              <span className="font-display italic text-sm normal-case tracking-normal">placeholder</span>
            </div>
          </motion.div>
        </div>
        <div className="col-span-12 lg:col-span-7 grid grid-rows-3 gap-px bg-[color:var(--moss)]/10 rounded-[24px] overflow-hidden">
          {cards.map((k, i) => (
            <motion.article
              key={k}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group flex items-start gap-4 sm:gap-6 bg-[color:var(--cream)] p-6 sm:p-8 md:p-10 transition-colors hover:bg-[color:var(--sand)]/40"
            >
              <span className="font-display text-[color:var(--sprout)] text-3xl tabular-nums">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-display text-2xl text-[color:var(--moss)]">
                  {t(`values.${k}.title`)}
                </h3>
                <p className="mt-3 text-[color:var(--moss)]/70 leading-relaxed">
                  {t(`values.${k}.body`)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}