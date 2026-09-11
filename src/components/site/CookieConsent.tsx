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
  const [decided, setDecided] = useState(false);
  const [prefs, setPrefs] = useState<Optional>({ ...NONE });

  useEffect(() => {
    initConsentMode();
    const stored = readConsent();
    if (stored) {
      setDecided(true);
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
      setDecided(true);
    }, 2200);
    return () => window.clearTimeout(id);
  };

  const reopenPanel = () => {
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

  const categories = [
    { key: "necessary", locked: true },
    { key: "preferences", locked: false },
    { key: "analytics", locked: false },
    { key: "marketing", locked: false },
  ] as const;

  return (
    <>
    <AnimatePresence>
      {decided && !open && (
        <motion.button
          key="cookie-badge"
          type="button"
          onClick={reopenPanel}
          aria-label={t("cookies.settings")}
          title={t("cookies.settings")}
          className="group fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] left-3 z-[115] flex items-center gap-0 overflow-hidden rounded-full border border-[color:var(--moss)]/12 bg-[color:var(--cream)]/85 py-2 pl-2 pr-2 text-[color:var(--moss)] opacity-55 backdrop-blur-md transition-[opacity,transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--sprout)]/50 sm:left-5 sm:bottom-5 md:left-6 md:bottom-6"
          style={{
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            boxShadow: "0 10px 30px -14px color-mix(in oklab, var(--moss) 40%, transparent)",
          }}
          initial={{ opacity: 0, scale: 1.35, filter: "blur(10px)", y: -6 }}
          animate={{ opacity: 0.55, scale: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[color:var(--sprout)]/12">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9.5" cy="9.5" r="1.15" fill="currentColor" />
              <circle cx="14.6" cy="12.4" r="1" fill="currentColor" />
              <circle cx="10.2" cy="15" r="0.9" fill="currentColor" />
            </svg>
          </span>
          <span className="max-w-0 whitespace-nowrap text-[0.72rem] font-semibold uppercase tracking-[0.16em] opacity-0 transition-all duration-500 group-hover:max-w-[14rem] group-hover:pl-2 group-hover:pr-1.5 group-hover:opacity-100 group-focus-visible:max-w-[14rem] group-focus-visible:pl-2 group-focus-visible:pr-1.5 group-focus-visible:opacity-100">
            {t("cookies.settings")}
          </span>
        </motion.button>
      )}
    </AnimatePresence>

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
            className="relative w-full max-w-[min(100%,34rem)] overflow-hidden rounded-[1.6rem] border border-[color:var(--moss)]/10 bg-[color:var(--cream)] p-5 backdrop-blur-md sm:rounded-[2rem] sm:p-6 md:p-7"
            style={{
              boxShadow:
                "0 28px 80px -24px color-mix(in oklab, var(--moss) 28%, transparent), inset 0 1px 0 color-mix(in oklab, #fff 60%, transparent)",
            }}
          >
            {/* ambient organic glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full opacity-50 blur-3xl"
              style={{ background: "color-mix(in oklab, var(--sprout) 30%, transparent)" }}
            />

            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                {showThanks ? (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, scale: 0.92, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -8 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex flex-col items-center justify-center py-8 text-center sm:py-10"
                  >
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--sprout)]/12 text-[color:var(--sprout)]">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                        <path d="M12 22a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-1.5v10.75c0 .414.336.75.75.75Z" />
                        <path d="M12 10.5c0-2.5-2-5-5-5S2 8 2 10.5c0 2.25 1.75 4 4 4h6v-4Z" />
                        <path d="M12 10.5c0-2.5 2-5 5-5s5 2.25 5 4.5c0 2.25-1.75 4-4 4h-6v-4Z" />
                      </svg>
                    </div>
                    <h3 className="font-display text-[1.35rem] tracking-tight text-[color:var(--moss)] sm:text-[1.55rem]">
                      {t("cookies.thanks")}
                    </h3>
                    <p className="mt-1 max-w-[16rem] text-[0.9rem] leading-relaxed text-[color:var(--moss)]/75">
                      {t("cookies.thanksBody")}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
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
