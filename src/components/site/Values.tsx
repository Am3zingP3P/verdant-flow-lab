import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import heroImage from "@/assets/IMG_3117.jpg";


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
            <img
              src={heroImage}
              alt={t("values.imageAlt")}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
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