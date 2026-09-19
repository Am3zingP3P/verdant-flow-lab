import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useI18n, type Lang } from "@/i18n/I18nProvider";
import { LangSwitcher, ThemeToggle } from "@/components/site/Navbar";

export const Route = createFileRoute("/jogi-informaciok")({
  head: () => ({
    meta: [
      { title: "Impresszum és jogi információk — Natursense" },
      {
        name: "description",
        content: "A Natursense weboldal impresszuma, felhasználási feltételei és adatvédelmi tájékoztatója.",
      },
      { property: "og:title", content: "Impresszum és jogi információk — Natursense" },
      {
        property: "og:description",
        content: "A Natursense weboldal jogi, szerzői jogi és adatvédelmi információi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LegalInformationPage,
});

interface LegalSectionData {
  number: string;
  title: string;
  featured?: boolean;
}

interface DetailItem {
  label: string;
  value: string;
}

interface LegalParagraphs {
  about: string[];
  terms: string[];
  copyright: string[];
  external: string[];
  privacy: string[];
  cookies: string[];
  disclaimer: string[];
  changes: string[];
}

interface LegalContent {
  eyebrow: string;
  title: string;
  intro: string;
  backToHome: string;
  lastUpdated: string;
  sections: {
    impressum: LegalSectionData;
    about: LegalSectionData;
    terms: LegalSectionData;
    copyright: LegalSectionData;
    external: LegalSectionData;
    privacy: LegalSectionData;
    cookies: LegalSectionData;
    disclaimer: LegalSectionData;
    changes: LegalSectionData;
  };
  impressumDetails: DetailItem[];
  privacyDetails: DetailItem[];
  paragraphs: LegalParagraphs;
}

function LegalInformationPage() {
  const { lang, setLang, dict } = useI18n();
  const l = (dict.legal as unknown) as LegalContent;
  const year = new Date().getFullYear();

  return (
    <div className="grain min-h-screen overflow-x-clip bg-[color:var(--cream)] text-[color:var(--obsidian)]">
      <LegalHeader backToHome={l.backToHome} lang={lang} setLang={setLang} />

      <main className="relative px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-40 lg:px-12">
        <BotanicalAccent />
        <div className="relative mx-auto max-w-[980px]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[760px] text-center"
          >
            <p className="text-eyebrow text-[color:var(--sprout)]">{l.eyebrow}</p>
            <h1 className="mt-5 text-balance font-display text-[clamp(2.35rem,6vw,5rem)] leading-[1.02] text-[color:var(--moss)]">
              <AmpersandTitle text={l.title} />
            </h1>
            <p className="mx-auto mt-6 max-w-[680px] text-[0.98rem] leading-7 text-[color:var(--moss)]/70 sm:text-[1.08rem] sm:leading-8">
              {l.intro}
            </p>
          </motion.header>

          <div className="mt-14 grid gap-5 sm:mt-20 sm:gap-6">
            <LegalSection {...l.sections.impressum}>
              <DetailList items={l.impressumDetails} />
            </LegalSection>

            <LegalSection {...l.sections.about}>
              {l.paragraphs.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </LegalSection>

            <LegalSection {...l.sections.terms}>
              {l.paragraphs.terms.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </LegalSection>

            <LegalSection {...l.sections.copyright}>
              {l.paragraphs.copyright.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </LegalSection>

            <LegalSection {...l.sections.external}>
              {l.paragraphs.external.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </LegalSection>

            <LegalSection {...l.sections.privacy} featured>
              {l.paragraphs.privacy.map((p, i) => {
                const isBold = i === 3;
                const isMedium = i === 1;
                const className = isBold
                  ? "font-bold text-[color:var(--moss)]"
                  : isMedium
                    ? "font-medium text-[color:var(--moss)]"
                    : "";
                return (
                  <p key={i} className={className}>
                    {p}
                  </p>
                );
              })}
              <DetailList items={l.privacyDetails} />
            </LegalSection>

            <LegalSection {...l.sections.cookies}>
              {l.paragraphs.cookies.map((p, i) => {
                const isMedium = i === 2;
                return (
                  <p key={i} className={isMedium ? "font-medium text-[color:var(--moss)]" : ""}>
                    {p}
                  </p>
                );
              })}
            </LegalSection>

            <LegalSection {...l.sections.disclaimer}>
              {l.paragraphs.disclaimer.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </LegalSection>

            <LegalSection {...l.sections.changes}>
              {l.paragraphs.changes.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="mt-6 text-sm font-medium text-[color:var(--sprout)]">{l.lastUpdated}</p>
            </LegalSection>
          </div>
        </div>
      </main>

      <footer className="border-t border-[color:var(--moss)]/10 px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-[980px] flex-col items-center justify-between gap-3 text-center text-[11px] tracking-[0.12em] text-[color:var(--moss)]/55 sm:flex-row sm:text-left">
          <span>© {year} Natursense</span>
          <span>{l.title}</span>
        </div>
      </footer>
    </div>
  );
}

function LegalHeader({
  backToHome,
  lang,
  setLang,
}: {
  backToHome: string;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--moss)]/8 bg-[color:var(--cream)]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-y-3 px-5 py-4 sm:px-8 sm:py-5">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 text-[color:var(--moss)]">
          <SproutMark />
          <span className="truncate font-display text-xl">natursense<span className="text-[color:var(--sprout)]">.</span></span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <ThemeToggle />
          <LangSwitcher lang={lang} setLang={setLang} />
          <Link
            to="/"
            className="inline-flex min-h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[color:var(--moss)]/15 px-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--moss)] transition-colors hover:bg-[color:var(--moss)] hover:text-[color:var(--cream)] sm:px-4"
          >
            <span aria-hidden>←</span>
            <span>{backToHome}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function LegalSection({
  number,
  title,
  children,
  featured = false,
}: LegalSectionData & { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-3xl border p-6 sm:p-9 lg:p-11 ${
        featured
          ? "border-[color:var(--sprout)]/20 bg-[color:var(--sand)]"
          : "border-[color:var(--moss)]/10 bg-[color:var(--sand)]/55"
      }`}
    >
      <div aria-hidden className="absolute right-6 top-6 flex items-center gap-1.5 opacity-35">
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--sprout)]" />
        <span className="h-px w-7 bg-[color:var(--sprout)]" />
      </div>
      <div className="grid gap-5 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-7">
        <span className="text-[0.68rem] font-semibold tracking-[0.2em] text-[color:var(--sprout)]">{number}</span>
        <div>
          <h2 className="pr-12 font-display text-[clamp(1.65rem,3vw,2.35rem)] leading-tight text-[color:var(--moss)]">{title}</h2>
          <div className="mt-5 space-y-5 text-[0.94rem] leading-7 text-[color:var(--moss)]/72 sm:text-[1rem] sm:leading-8">
            {children}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function DetailList({ items }: { items: ReadonlyArray<DetailItem> }) {
  return (
    <dl className="overflow-hidden rounded-2xl border border-[color:var(--moss)]/10 bg-[color:var(--cream)]/70">
      {items.map((item, i) => (
        <div key={i} className="grid gap-1 border-b border-[color:var(--moss)]/8 px-4 py-4 last:border-b-0 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-6 sm:px-5">
          <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--moss)]/55">{item.label}</dt>
          <dd className="min-w-0 break-words font-medium text-[color:var(--moss)]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function AmpersandTitle({ text }: { text: string }) {
  const parts = text.split("&");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="font-sans">&</span>}
        </span>
      ))}
    </>
  );
}

function BotanicalAccent() {
  return (
    <svg aria-hidden viewBox="0 0 180 220" fill="none" className="pointer-events-none absolute right-[-2rem] top-32 h-52 w-44 text-[color:var(--sprout)] opacity-[0.09] sm:right-4 sm:h-64 sm:w-52 lg:right-[5vw]">
      <path d="M89 208C85 155 94 103 137 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M105 116C133 111 151 93 156 70C128 70 109 87 105 116Z" fill="currentColor" />
      <path d="M91 157C62 153 42 134 36 109C66 109 87 127 91 157Z" fill="currentColor" />
      <circle cx="41" cy="56" r="3" fill="currentColor" />
      <circle cx="151" cy="143" r="2" fill="currentColor" />
    </svg>
  );
}

function SproutMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7 transition-transform duration-500 group-hover:rotate-[8deg]" aria-hidden>
      <path d="M16 28V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 16C9 16 5 11 5 6C11 6 16 10 16 16Z" fill="currentColor" opacity=".85" />
      <path d="M16 18C22 18 27 13 27 8C21 8 16 12 16 18Z" fill="currentColor" />
    </svg>
  );
}
