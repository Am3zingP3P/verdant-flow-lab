import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer id="contact" className="border-t border-[color:var(--moss)]/10 bg-[color:var(--sand)]/60">
      <div className="mx-auto grid max-w-[1480px] grid-cols-12 gap-8 px-6 py-20 md:px-10">
        <div className="col-span-12 md:col-span-6">
          <h3 className="font-display text-[clamp(2rem,5vw,4.2rem)] leading-[0.95] text-[color:var(--moss)] max-w-[14ch]">
            {t("footer.tag")}
          </h3>
        </div>
        <div className="col-span-6 md:col-span-3 space-y-2 text-sm text-[color:var(--moss)]/70">
          <p className="text-eyebrow text-[color:var(--moss)]">Natursense</p>
          <p>Budapest · Novi Sad</p>
          <p>hello@natursense.bio</p>
        </div>
        <div className="col-span-6 md:col-span-3 space-y-2 text-sm text-[color:var(--moss)]/70">
          <p className="text-eyebrow text-[color:var(--moss)]">Follow</p>
          <p>Instagram</p>
          <p>Facebook</p>
        </div>
        <div className="col-span-12 mt-10 flex items-center justify-between border-t border-[color:var(--moss)]/10 pt-6 text-xs text-[color:var(--moss)]/55">
          <span>© {new Date().getFullYear()} Natursense — {t("footer.rights")}.</span>
          <span>HU × SRB</span>
        </div>
      </div>
    </footer>
  );
}