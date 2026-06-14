import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "hu" | "sr";

type DictNode = string | { [k: string]: DictNode };
type Dict = { [k: string]: DictNode };

const dictionaries: Record<Lang, Dict> = {
  hu: {
    nav: { story: "Történet", explorer: "Növekedés", seeds: "Magvak", journal: "Napló", contact: "Kapcsolat" },
    cta: { shop: "Vásárlás", explore: "Fedezd fel", learn: "Történetünk" },
    hero: {
      eyebrow: "Bio mag · Magyarország × Szerbia",
      titleA: "Superfood,",
      titleB: "kompromisszumok",
      titleC: "nélkül.",
      lede: "Élő csírák és microgreenek, a konyhapultodon. Egyetlen magból — egy egész ökoszisztéma.",
      scroll: "Görgess a növekedéshez",
    },
    marquee: "Élő tápanyag · Otthoni farm · 100% bio mag · Természetes vitalitás",
    slowfast: {
      eyebrow: "Ritmus",
      titleSlow: "Lassú növekedés.",
      titleFast: "Gyors táplálás.",
      body: "A természet nem siet — mégis minden percben dolgozik. A magot napokig pihentetjük, csíráztatjuk, érleljük. Amit te kapsz: pillanatok alatt felszívódó, élő tápanyag.",
      caption: "7–10 nap a kertedtől a tányérodig.",
    },
    values: {
      eyebrow: "Miért Natursense",
      title: "Lassan nevelt. Gyorsan táplál.",
      one: { title: "Biohasznosulás", body: "A csírázás során a tápanyagok akár 40×-esre koncentrálódnak. Élő enzimek, valódi hatás." },
      two: { title: "Otthoni farm", body: "Néhány nap, egy üvegcse víz, és a konyhád egy mini-kerté válik. Föld nélkül." },
      three: { title: "Tiszta eredet", body: "Csak ellenőrzött, GMO-mentes, bio tanúsított magok Magyarország és Szerbia kis gazdaságaiból." },
    },
    explorer: {
      eyebrow: "Interaktív növekedés",
      title: "Egy mag élete, három mozdulatban.",
      lede: "Húzd az idővonalat. Lásd, ahogyan a sűrített csend zöld energiává robban.",
      stages: { seed: "Mag", germ: "Csírázás", micro: "Microgreen" },
      drag: "Húzd",
    },
    seeds: {
      alfalfa: { name: "Alfalfa", note: "Lágy, édes — a kapudrog a csírák világába." },
      broccoli: { name: "Brokkoli", note: "Szulforafán-bomba. Tiszta, friss, élénk." },
      radish: { name: "Retek", note: "Csípős, élénk rózsaszín, ébresztő íz." },
    },
    footer: {
      tag: "Élő energia. Magról. Magért.",
      rights: "Minden jog fenntartva",
    },
  },
  sr: {
    nav: { story: "Priča", explorer: "Rast", seeds: "Semenke", journal: "Dnevnik", contact: "Kontakt" },
    cta: { shop: "Kupi", explore: "Istraži", learn: "Naša priča" },
    hero: {
      eyebrow: "Bio seme · Srbija × Mađarska",
      titleA: "Najkoncentrovanija",
      titleB: "energija",
      titleC: "prirode.",
      lede: "Žive klice i mikrogriniji, na tvojoj kuhinjskoj radnoj površini. Iz jedne semenke — vitalnost čitavog ekosistema.",
      scroll: "Skroluj ka rastu",
    },
    marquee: "Žive hranljive · Kućna farma · 100% bio seme · Prirodna vitalnost",
    slowfast: {
      eyebrow: "Ritam",
      titleSlow: "Spor rast.",
      titleFast: "Brza ishrana.",
      body: "Priroda ne žuri — a ipak radi svakog trenutka. Seme miruje, klija, sazreva danima. Ono što ti dobijaš: živa hranljivost koja se upija u trenu.",
      caption: "7–10 dana od bašte do tanjira.",
    },
    values: {
      eyebrow: "Zašto Natursense",
      title: "Sporo gajeno. Brzo hrani.",
      one: { title: "Bioraspoloživost", body: "Tokom klijanja, hranljive materije se koncentrišu i do 40×. Živi enzimi, stvaran efekat." },
      two: { title: "Kućna farma", body: "Nekoliko dana, čaša vode, i tvoja kuhinja postaje mini-bašta. Bez zemlje." },
      three: { title: "Čisto poreklo", body: "Samo proverene, GMO-free, bio sertifikovane semenke iz malih gazdinstava Srbije i Mađarske." },
    },
    explorer: {
      eyebrow: "Interaktivni rast",
      title: "Život semenke u tri pokreta.",
      lede: "Povuci vremensku liniju. Gledaj kako koncentrisana tišina eksplodira u zelenu energiju.",
      stages: { seed: "Semenka", germ: "Klijanje", micro: "Mikrogrin" },
      drag: "Povuci",
    },
    seeds: {
      alfalfa: { name: "Lucerka", note: "Meka, slatka — ulaz u svet klica." },
      broccoli: { name: "Brokoli", note: "Sulforafan bomba. Čisto, sveže, živo." },
      radish: { name: "Rotkva", note: "Ljuto, jako roze, buđenje za nepca." },
    },
    footer: {
      tag: "Živa energija. Iz semenke. Za semenku.",
      rights: "Sva prava zadržana",
    },
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => string;
};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("hu");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && (localStorage.getItem("ns-lang") as Lang | null)) || null;
    if (stored === "hu" || stored === "sr") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("ns-lang", l);
  };

  const t = (path: string): string => {
    const parts = path.split(".");
    let cur: unknown = dictionaries[lang];
    for (const p of parts) {
      if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
        cur = (cur as Record<string, unknown>)[p];
      } else {
        return path;
      }
    }
    return typeof cur === "string" ? cur : path;
  };

  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}