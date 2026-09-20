import { useI18n } from "@/i18n/I18nProvider";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { openConsentSettings } from "@/lib/consent";

const socials = [
  {
    name: "Instagram",
    handle: "@natursense",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "/natursense",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4V14h2.7v8h3.4z" />
      </svg>
    ),
  },
  {
    name: "Viber",
    handle: "+381 60 000 0000",
    href: "viber://chat?number=%2B381600000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12.1 2c-2.4 0-5.5.3-7 1.7C4 4.8 3.6 6.5 3.5 8.6c0 2.1-.1 6 3.7 7.1v1.7c0 .6.1 1 .4 1.1.3.1.6 0 1-.4.3-.3 1.4-1.6 1.9-2.2h1.6c2.4 0 3.8-.1 5.3-1.4 1.1-1.1 1.6-2.7 1.6-4.9 0-2.2-.4-3.8-1.6-4.9C16 2.3 14.5 2 12.1 2Zm0 1.5c2.1 0 3.4.2 4.3 1.1.9.9 1.2 2.1 1.2 3.9 0 1.8-.3 3.1-1.2 3.9-.9.9-2.2 1-4.3 1h-1.9c-.2 0-.4.1-.6.3-.4.5-1 1.2-1.4 1.6v-1.2c0-.3-.2-.6-.6-.7-3-.7-3.1-3.6-3-5 0-1.8.3-3 1.2-3.9.9-.8 2.2-1 4.3-1Zm-2.7 2.1c-.2 0-.4.1-.7.2-.5.3-1 .8-1 1.6 0 .4.1.8.3 1.3.5 1 1.8 2.7 3.6 3.5.8.4 1.4.5 1.9.5.7 0 1.3-.4 1.6-.9.2-.3.2-.6.2-.8 0-.1 0-.2-.2-.3-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.1-.4.1-.2-.1-.9-.4-1.6-1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4l.4-.4c.1-.1.1-.2.2-.4v-.3c0-.1-.5-1.1-.6-1.5-.1-.3-.2-.3-.4-.3h-.3Z" />
      </svg>
    ),
  },
] as const;

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="bg-[color:var(--cream)] px-4 py-12 sm:px-6 sm:py-20 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(24px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-[1380px] overflow-hidden rounded-3xl border border-[color:var(--moss)]/10 bg-[color:var(--sand)] shadow-[0_30px_80px_-50px_rgba(28,53,45,0.35)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left — tagline + email */}
          <div className="flex flex-col justify-between gap-12 border-b border-[color:var(--moss)]/10 p-8 sm:p-12 md:col-span-7 md:border-b-0 md:border-r md:p-16 lg:p-20">
            <div>
              <h3 className="font-display text-[clamp(2rem,4.6vw,4rem)] font-light leading-[1.05] tracking-[-0.02em] text-[color:var(--moss)]">
                {t("footer.tag")}
              </h3>
              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-12 bg-[color:var(--sprout)]" />
                <span className="text-eyebrow italic text-[color:var(--sprout)]">{t("footer.writeUs")}</span>
              </div>
            </div>
            <div>
              <p className="text-eyebrow mb-3 text-[color:var(--moss)]/60">{t("footer.emailLabel")}</p>
              <a
                href="mailto:natursense2026@gmail.com"
                className="font-display text-xl text-[color:var(--moss)] underline decoration-[color:var(--sprout)]/40 underline-offset-[10px] transition-colors hover:text-[color:var(--sprout)] sm:text-2xl"
              >
                natursense2026@gmail.com
              </a>
            </div>
          </div>

          {/* Right — contact + social */}
          <div className="flex flex-col justify-between gap-12 bg-[color:var(--cream)]/50 p-8 sm:p-12 md:col-span-5 md:p-16 lg:p-20">
            <div className="space-y-10">
              <div>
                <p className="text-eyebrow mb-3 text-[color:var(--sprout)]">{t("footer.locationLabel")}</p>
                <address className="font-display text-lg not-italic leading-relaxed text-[color:var(--moss)]">
                  {t("footer.locationLine1")}
                  <br />
                  {t("footer.locationLine2")}
                </address>
              </div>

              <div>
                <p className="text-eyebrow mb-5 text-[color:var(--sprout)]">{t("footer.followUs")}</p>
                <ul className="flex flex-col">
                  {socials.map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between border-b border-[color:var(--moss)]/10 py-4 transition-colors hover:border-[color:var(--sprout)]"
                      >
                        <span className="flex items-center gap-4">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--moss)]/15 text-[color:var(--moss)] transition-all duration-500 group-hover:border-transparent group-hover:bg-[color:var(--sprout)] group-hover:text-[color:var(--cream)]">
                            {s.icon}
                          </span>
                          <span className="flex flex-col">
                            <span className="font-display text-base text-[color:var(--moss)] transition-transform duration-500 group-hover:translate-x-1">
                              {s.name}
                            </span>
                            <span className="text-[11px] tracking-wide text-[color:var(--moss)]/50">
                              {s.handle}
                            </span>
                          </span>
                        </span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-4 w-4 -translate-x-2 text-[color:var(--sprout)] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--sprout)]/25">
                  <span className="h-6 w-3 rounded-full bg-[color:var(--sprout)]/50" />
                </div>
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[color:var(--sprout)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[color:var(--moss)]/10 px-6 py-5 text-[10px] uppercase tracking-[0.25em] text-[color:var(--moss)]/50 sm:flex-row sm:px-10">
          <span>© {year} Natursense — {t("footer.rights")}</span>
        </div>

      </motion.div>

      {/* Standalone legal strip below the glass footer */}
      <div className="mx-auto mt-8 flex w-full max-w-[1380px] flex-col items-center justify-center gap-3 border-t border-[color:var(--moss)]/10 py-3 pt-6 text-[11px] leading-relaxed text-[color:var(--moss)]/50 sm:flex-row sm:gap-6">
        <Link
          to="/jogi-informaciok"
          className="normal-case tracking-[0.08em] transition-colors hover:text-[color:var(--sprout)]"
        >
          {t("legal.footerLink")}
        </Link>
        <span aria-hidden className="hidden h-3 w-px bg-[color:var(--moss)]/15 sm:block" />
        <button
          onClick={openConsentSettings}
          className="uppercase tracking-[0.22em] transition-colors hover:text-[color:var(--sprout)]"
        >
          {t("cookies.settings")}
        </button>
      </div>
    </footer>
  );
}