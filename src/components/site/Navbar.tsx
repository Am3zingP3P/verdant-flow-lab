import { motion } from "framer-motion";
import { useI18n, type Lang } from "@/i18n/I18nProvider";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

const langs: Lang[] = ["hu", "sr"];

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { key: "story", href: "#story" },
    { key: "explorer", href: "#explorer" },
    { key: "seeds", href: "#seeds" },
    { key: "journal", href: "#journal" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[color:var(--cream)]/75 backdrop-blur-xl border-b border-[color:var(--moss)]/8" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 sm:px-6 py-4 sm:py-5 md:px-10">
        <a href="#" className="flex items-center gap-2.5 group">
          <SproutMark className="h-7 w-7 text-[color:var(--moss)] transition-transform duration-700 group-hover:rotate-[8deg]" />
          <span className="font-display text-[1.35rem] tracking-tight text-[color:var(--moss)]">
            natursense<span className="text-[color:var(--sprout)]">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex lg:gap-9">
          {items.map((it) => (
            <a
              key={it.key}
              href={it.href}
              className="text-eyebrow text-[color:var(--moss)]/70 transition-colors hover:text-[color:var(--moss)]"
            >
              {t(`nav.${it.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>
    </motion.header>
  );
}

function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="relative flex items-center rounded-full border border-[color:var(--moss)]/15 bg-[color:var(--cream)]/60 p-1 backdrop-blur">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="relative z-10 px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em]"
        >
          <span className={`relative z-10 transition-colors ${lang === l ? "text-[color:var(--cream)]" : "text-[color:var(--moss)]/60"}`}>
            {l === "sr" ? "SRB" : "HU"}
          </span>
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="absolute inset-0 rounded-full bg-[color:var(--moss)]"
            />
          )}
        </button>
      ))}
    </div>
  );
}

function SproutMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M16 28 V14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16 16 C 9 16, 5 11, 5 6 C 11 6, 16 10, 16 16 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M16 18 C 22 18, 27 13, 27 8 C 21 8, 16 12, 16 18 Z"
        fill="currentColor"
      />
    </svg>
  );
}