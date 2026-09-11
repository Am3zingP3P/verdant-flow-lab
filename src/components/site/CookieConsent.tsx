import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import {
  CONSENT_EVENT,
  initConsentMode,
  readConsent,
  saveConsent,
} from "@/lib/consent";

type Optional = { analytics: boolean; marketing: boolean; preferences: boolean };

const ALL: Optional = { analytics: true, marketing: true, preferences: true };
const NONE: Optional = { analytics: false, marketing: false, preferences: false };

const EASE = [0.16, 1, 0.3, 1] as const;

export function CookieConsent() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [prefs, setPrefs] = useState<Optional>({ ...NONE });

  useEffect(() => {
    initConsentMode();
    const stored = readConsent();
    if (stored) {
      setPrefs({
        analytics: stored.analytics,
        marketing: stored.marketing,
        preferences: stored.preferences,
      });
    } else {
      const id = window.setTimeout(() => setOpen(true), 900);
      return () => window.clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    const reopen = () => {
      const stored = readConsent();
      if (stored) {
        setPrefs({
          analytics: stored.analytics,
          marketing: stored.marketing,
          preferences: stored.preferences,
        });
      }
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(`${CONSENT_EVENT}:open`, reopen);
    return () => window.removeEventListener(`${CONSENT_EVENT}:open`, reopen);
  }, []);

  const commit = (value: Optional) => {
    saveConsent(value);
    setPrefs(value);
    setShowThanks(true);
    const id = window.setTimeout(() => {
      setShowThanks(false);
      setOpen(false);
      setDetails(false);
    }, 2200);
    return () => window.clearTimeout(id);
  };

  const categories = [
    { key: "necessary", locked: true },
    { key: "preferences", locked: false },
    { key: "analytics", locked: false },
    { key: "marketing", locked: false },
  ] as const;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cookie-consent"
          className="fixed inset-x-0 bottom-0 z-[120] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6 md:justify-start md:pl-8 lg:pl-10"
          initial={{ opacity: 0, y: 48, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: EASE }}
          role="dialog"
          aria-modal="false"
          aria-label={t("cookies.title")}
        >
          <div
            className="relative w-full max-w-[min(100%,34rem)] overflow-hidden rounded-[1.6rem] border border-[color:var(--moss)]/12 bg-[color:var(--cream)]/70 p-5 backdrop-blur-2xl sm:rounded-[2rem] sm:p-6 md:p-7"
            style={{
              boxShadow:
                "0 24px 70px -28px color-mix(in oklab, var(--moss) 45%, transparent), inset 0 1px 0 color-mix(in oklab, #fff 40%, transparent)",
            }}
          >
            {/* ambient organic glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full opacity-50 blur-3xl"
              style={{ background: "color-mix(in oklab, var(--sprout) 30%, transparent)" }}
            />

            <div className="relative">
              <p className="text-eyebrow text-[color:var(--sprout)]">{t("cookies.eyebrow")}</p>
              <h2 className="mt-2 font-display text-[1.5rem] leading-tight tracking-tight text-[color:var(--moss)] sm:text-[1.75rem]">
                {t("cookies.title")}
              </h2>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-[color:var(--moss)]/75 sm:text-[0.95rem]">
                {t("cookies.body")}
              </p>

              <AnimatePresence initial={false}>
                {details && (
                  <motion.div
                    key="details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-5 grid gap-2.5">
                      {categories.map((c) => (
                        <li
                          key={c.key}
                          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-[color:var(--moss)]/10 bg-[color:var(--sand)]/45 px-3.5 py-3 backdrop-blur-sm"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-[0.85rem] font-semibold text-[color:var(--moss)]">
                              {t(`cookies.cat.${c.key}.name`)}
                            </p>
                            <p className="mt-0.5 text-[0.76rem] leading-snug text-[color:var(--moss)]/60">
                              {t(`cookies.cat.${c.key}.desc`)}
                            </p>
                          </div>
                          <Switch
                            checked={c.locked ? true : prefs[c.key as keyof Optional]}
                            disabled={c.locked}
                            label={t(`cookies.cat.${c.key}.name`)}
                            onChange={(v) =>
                              setPrefs((p) => ({ ...p, [c.key]: v }) as Optional)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  onClick={() => commit({ ...ALL })}
                  className="group relative w-full overflow-hidden rounded-full bg-[color:var(--moss)] px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--cream)] transition-transform duration-500 hover:-translate-y-0.5 sm:w-auto"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                >
                  <span className="relative z-10">{t("cookies.acceptAll")}</span>
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-[color:var(--sprout)] transition-transform duration-700 group-hover:translate-x-0"
                    style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                  />
                </button>

                <button
                  onClick={() => commit({ ...NONE })}
                  className="w-full rounded-full border border-[color:var(--moss)]/20 px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--moss)] transition-colors duration-300 hover:bg-[color:var(--moss)]/8 sm:w-auto"
                >
                  {t("cookies.rejectAll")}
                </button>

                {details ? (
                  <button
                    onClick={() => commit(prefs)}
                    className="w-full rounded-full px-4 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--sprout)] underline-offset-4 transition-opacity hover:opacity-70 sm:ml-auto sm:w-auto"
                  >
                    {t("cookies.save")}
                  </button>
                ) : (
                  <button
                    onClick={() => setDetails(true)}
                    className="w-full rounded-full px-4 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--moss)]/60 transition-colors hover:text-[color:var(--moss)] sm:ml-auto sm:w-auto"
                  >
                    {t("cookies.customize")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Switch({
  checked,
  disabled,
  label,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-500 ${
        checked
          ? "border-transparent bg-[color:var(--sprout)]"
          : "border-[color:var(--moss)]/20 bg-[color:var(--moss)]/10"
      } ${disabled ? "opacity-55" : "cursor-pointer"}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
        className="absolute top-1/2 h-4.5 w-4.5 -translate-y-1/2 rounded-full bg-[color:var(--cream)] shadow-sm"
        style={{ left: checked ? "calc(100% - 1.25rem)" : "0.2rem", height: "1.1rem", width: "1.1rem" }}
      />
    </button>
  );
}
