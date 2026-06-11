import { useI18n } from "@/i18n/I18nProvider";

export function Marquee() {
  const { t } = useI18n();
  const text = t("marquee");
  const parts = text.split(" · ");
  return (
    <div className="relative my-24 overflow-hidden border-y border-[color:var(--moss)]/10 bg-[color:var(--sand)]/40 py-6">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="font-display text-[clamp(1.6rem,4vw,3rem)] text-[color:var(--moss)]/85"
          >
            {parts.map((part, j) => (
              <span key={j}>
                {part}
                <span className="mx-4 text-[color:var(--cream)]/60">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}