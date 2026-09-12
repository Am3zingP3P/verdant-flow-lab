import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

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

const details = [
  ["Tulajdonos / üzemeltető", "[NAME / COMPANY]"],
  ["Székhely / cím", "[ADDRESS]"],
  ["E-mail", "[EMAIL]"],
  ["Tárhelyszolgáltató", "[HOSTING PROVIDER]"],
  ["Tárhelyszolgáltató címe", "[HOSTING PROVIDER ADDRESS]"],
] as const;

const controllerDetails = [
  ["Adatkezelő / felelős szervezet", "[NATURSENSE LEGAL NAME]"],
  ["Kapcsolattartási e-mail", "[NATURSENSE EMAIL]"],
  ["Adatkezelés célja", "Kapcsolatfelvétel és megkeresések megválaszolása."],
  ["Az érintett által megadott adatok", "Név, e-mail-cím, üzenet és az önkéntesen megadott további információk."],
  ["Adatmegőrzési idő", "[RETENTION PERIOD — TO BE DETERMINED]"],
] as const;

function LegalInformationPage() {
  const year = new Date().getFullYear();

  return (
    <div className="grain min-h-screen overflow-x-clip bg-[color:var(--cream)] text-[color:var(--obsidian)]">
      <LegalHeader />

      <main className="relative px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40 lg:px-12">
        <BotanicalAccent />
        <div className="relative mx-auto max-w-[980px]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[760px] text-center"
          >
            <p className="text-eyebrow text-[color:var(--sprout)]">Jogi információk</p>
            <h1 className="mt-5 text-balance font-display text-[clamp(2.35rem,6vw,5rem)] leading-[1.02] text-[color:var(--moss)]">
              Impresszum &amp; Jogi információk
            </h1>
            <p className="mx-auto mt-6 max-w-[680px] text-[0.98rem] leading-7 text-[color:var(--moss)]/70 sm:text-[1.08rem] sm:leading-8">
              Az alábbi információk a weboldal használatával, a tartalmak felhasználásával és a kapcsolatfelvétellel kapcsolatos legfontosabb tudnivalókat tartalmazzák.
            </p>
          </motion.header>

          <div className="mt-14 grid gap-5 sm:mt-20 sm:gap-6">
            <LegalSection number="01" title="Impresszum">
              <DetailList items={details} />
            </LegalSection>

            <LegalSection number="02" title="A weboldalról">
              <p>
                A Natursense weboldala elsősorban a márka, annak tevékenységei, tartalmai, ötletei és a kapcsolódó témák bemutatását szolgálja. A weboldal nem webáruház, nem értékesít közvetlenül termékeket, és egyszerű böngészése nem hoz létre vásárlási szerződést.
              </p>
            </LegalSection>

            <LegalSection number="03" title="Felhasználási feltételek">
              <p>
                A weboldalon található tartalmak elsősorban tájékoztatási célt szolgálnak; nem minősülnek szerződéses ajánlatnak, és a weboldal nem online értékesítési felület. A látogatók a tartalmakat szabadon böngészhetik és olvashatják.
              </p>
              <p>
                Törekszünk arra, hogy az információk pontosak és naprakészek legyenek, ennek ellenére előfordulhat pontatlanság, hiány, elavult információ vagy félreérthető megfogalmazás. Az üzemeltető az alkalmazandó jog által megengedett mértékben nem vállal felelősséget a közzétett információkra való hagyatkozásból eredő károkért.
              </p>
              <p>
                A weboldal és annak tartalma előzetes értesítés nélkül bármikor módosítható, frissíthető, lecserélhető vagy eltávolítható.
              </p>
            </LegalSection>

            <LegalSection number="04" title="Szerzői jogok">
              <p>
                Eltérő jelzés hiányában a weboldalon megjelenő szövegek, grafikák, fényképek, vizuális anyagok, logók és más eredeti tartalmak szerzői jogi védelem alatt állnak. Ezek előzetes engedély nélkül nem másolhatók, többszörözhetők, terjeszthetők, módosíthatók vagy használhatók kereskedelmi célra, kivéve, ha ezt az alkalmazandó jog kifejezetten lehetővé teszi.
              </p>
              <p>A harmadik féltől származó anyagok az adott jogosultak tulajdonában maradnak.</p>
            </LegalSection>

            <LegalSection number="05" title="Külső oldalak">
              <p>
                A weboldal külső webhelyekre, platformokra vagy közösségi oldalakra mutató hivatkozásokat tartalmazhat. Ezek jellemzően a Natursense közösségi oldalai — például Instagram vagy TikTok —, de előfordulhat Google Forms vagy más külső szolgáltatás is.
              </p>
              <p>
                A Natursense nem ellenőrzi harmadik felek oldalainak tartalmát, elérhetőségét vagy adatvédelmi gyakorlatát. Ezekre az oldalakra saját feltételeik és adatvédelmi tájékoztatóik vonatkoznak; meglátogatásuk a felhasználó saját döntése alapján történik.
              </p>
            </LegalSection>

            <LegalSection number="06" title="Adatvédelem és kapcsolatfelvétel" featured>
              <p>
                A kapcsolatfelvételi űrlapon a látogató önkéntesen adhat meg személyes adatokat, például nevét, e-mail-címét, üzenetének tartalmát és az üzenetben önkéntesen közölt további információkat.
              </p>
              <p className="font-medium text-[color:var(--moss)]">
                A kapcsolatfelvételi űrlapon megadott személyes adatokat kizárólag a megkeresés kezelése, a válaszadás és az ehhez kapcsolódó kommunikáció céljából kezeljük.
              </p>
              <p>
                A kapcsolatfelvételi űrlapon keresztül megadott adatokat a Natursense kezeli, és azokat bizalmasan kezeli. Az adatokat nem használjuk fel a megkereséstől eltérő célra, és nem adjuk tovább harmadik félnek, kivéve, ha erre jogszabály kötelez bennünket, vagy az adott szolgáltatás teljesítéséhez ez szükséges.
              </p>
              <div className="rounded-2xl border border-[color:var(--sprout)]/20 bg-[color:var(--cream)]/65 p-5 sm:p-6">
                <p className="font-display text-lg text-[color:var(--moss)]">Egy apró, fontos kérés</p>
                <p className="mt-2">
                  Kérjük, a kapcsolatfelvételi űrlapon csak a megkereséshez szükséges információkat add meg, és lehetőség szerint ne küldj érzékeny vagy különleges személyes adatokat.
                </p>
              </div>
              <DetailList items={controllerDetails} />
            </LegalSection>

            <LegalSection number="07" title="Sütik és technikai adatok">
              <p>
                A weboldal nem kíván automatikusan Google Analytics, Meta Pixel vagy más hirdetési követőt használni, és nem célja a látogatók profilozása vagy szükségtelen marketingadatok gyűjtése. Az opcionális sütik használatáról a látogató a weboldalon elérhető sütibeállításokban dönthet.
              </p>
              <p>
                A tárhelyszolgáltató a weboldal biztonságos és megbízható működtetéséhez technikailag szükséges naplóadatokat kezelhet. Ennek részleteire a tárhelyszolgáltató mindenkori adatvédelmi feltételei vonatkoznak.
              </p>
              <p className="font-medium text-[color:var(--moss)]">
                A Natursense célja, hogy a weboldal használata során csak a szükséges információkat kezelje. A kapcsolatfelvételi űrlapon kívül nem kérünk a látogatóktól személyes adatokat.
              </p>
            </LegalSection>

            <LegalSection number="08" title="Felelősségkizárás">
              <p>
                A weboldal tartalma tájékoztató jellegű. Az egészséggel, táplálkozással, életmóddal vagy más hasonló témákkal kapcsolatos általános információ nem helyettesíti az egyéni helyzetre szabott szakmai tanácsadást, amennyiben arra szükség lehet.
              </p>
            </LegalSection>

            <LegalSection number="09" title="A tájékoztató módosítása">
              <p>
                A Natursense fenntartja a jogot arra, hogy ezt a jogi és adatvédelmi tájékoztatót szükség esetén frissítse vagy módosítsa. Az aktuális változat mindig ezen az oldalon érhető el.
              </p>
              <p className="mt-6 text-sm font-medium text-[color:var(--sprout)]">Utolsó frissítés: [DATE]</p>
            </LegalSection>
          </div>
        </div>
      </main>

      <footer className="border-t border-[color:var(--moss)]/10 px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-[980px] flex-col items-center justify-between gap-3 text-center text-[11px] tracking-[0.12em] text-[color:var(--moss)]/55 sm:flex-row sm:text-left">
          <span>© {year} Natursense</span>
          <span>Impresszum &amp; Jogi információk</span>
        </div>
      </footer>
    </div>
  );
}

function LegalHeader() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--moss)]/8 bg-[color:var(--cream)]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link to="/" className="group flex items-center gap-2.5 text-[color:var(--moss)]">
          <SproutMark />
          <span className="font-display text-xl">natursense<span className="text-[color:var(--sprout)]">.</span></span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? "Világos mód" : "Sötét mód"}
            title={isDark ? "Világos mód" : "Sötét mód"}
            className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--moss)]/15 text-[color:var(--moss)] transition-colors hover:bg-[color:var(--moss)]/8"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link
            to="/"
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[color:var(--moss)]/15 px-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--moss)] transition-colors hover:bg-[color:var(--moss)] hover:text-[color:var(--cream)] sm:px-4"
          >
            <span aria-hidden>←</span>
            <span>Főoldal</span>
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
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  featured?: boolean;
}) {
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

function DetailList({ items }: { items: ReadonlyArray<readonly [string, string]> }) {
  return (
    <dl className="overflow-hidden rounded-2xl border border-[color:var(--moss)]/10 bg-[color:var(--cream)]/70">
      {items.map(([label, value]) => (
        <div key={label} className="grid gap-1 border-b border-[color:var(--moss)]/8 px-4 py-4 last:border-b-0 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-6 sm:px-5">
          <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--moss)]/55">{label}</dt>
          <dd className="min-w-0 break-words font-medium text-[color:var(--moss)]">{value}</dd>
        </div>
      ))}
    </dl>
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

function SunIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
}

function MoonIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z"/></svg>;
}