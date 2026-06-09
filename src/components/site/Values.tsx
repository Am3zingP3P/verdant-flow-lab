import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

export function Values() {
  const { t } = useI18n();
  const cards = ["one", "two", "three"] as const;

  return (
    <section id="story" className="relative mx-auto max-w-[1480px] px-6 py-32 md:px-10">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5">
          <p className="text-eyebrow text-[color:var(--sprout)]">{t("values.eyebrow")}</p>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.95] text-[color:var(--moss)]">
            {t("values.title")}
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-7 grid gap-px bg-[color:var(--moss)]/10">
          {cards.map((k, i) => (
            <motion.article
              key={k}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-start gap-6 bg-[color:var(--cream)] p-8 md:p-10"
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