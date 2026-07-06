import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "hu" | "sr";

type DictNode = string | { [k: string]: DictNode };
type Dict = { [k: string]: DictNode };

const dictionaries: Record<Lang, Dict> = {
  hu: {
    nav: { story: "Miért?", explorer: "Növekedés", seeds: "Galéria", contact: "Kapcsolat" },
    cta: { shop: "Vásárlás", explore: "Fedezd fel előnyeit", learn: "Történetünk" },
    hero: {
      eyebrow: "Bio mag · Magyarország × Szerbia",
      titleA: "Superfood,",
      titleB: "kompromisszumok",
      titleC: "nélkül.",
      lede: "Élő csírák, egyenesen a konyhapultodról. Kis magvakból: egy egész ökoszisztéma, általad termelve.",
      scroll: "Görgess tovább",
    },
    marquee: "Fenntartható · Otthoni farm · 100% bio · Természetes",
    values: {
      eyebrow: "Miért Natursense?",
      title: "A csíramagok előnyei",
      one: { title: "Természetes vitaminok", body: "A csírázás során a tápanyagok akár 40×-esre koncentrálódnak. Élő enzimek, valódi hatás." },
      two: { title: "Önellátás (kicsiben)", body: "Néhány nap, egy üvegcse víz, és a konyhád egy mini-kerté válik. Föld nélkül." },
      three: { title: "Tiszta eredet", body: "Ellenőrzött, valamint bio tanúsított." },
    },
    explorer: {
      eyebrow: "Interaktív növekedés",
      title: "Egy mag élete, három szakaszban.",
      lede: "Kattints a megadott szakaszokra, és lásd, ahogyan a mag hirtelen zöld energiává robban.",
      stages: { seed: "Mag", germ: "Csírázás", micro: "Microgreen" },
      drag: "Húzd",
    },
    seeds: {
      alfalfa: { name: "Alfalfa", note: "Lágy, édes" },
      broccoli: { name: "Brokkoli", note: "Szulforafán-bomba. Tiszta, friss, élénk." },
      radish: { name: "Retek", note: "Csípős, élénk rózsaszín, ébresztő íz." },
    },
    footer: {
      tag: "Valódi frissesség, általad termelve.",
      rights: "Minden jog fenntartva",
    },
  },
  sr: {
    nav: { story: "Zašto?", explorer: "Rast", seeds: "Galerija", contact: "Kontakt" },
    cta: { shop: "Kupi", explore: "Istraži", learn: "Naša priča" },
    hero: {
      eyebrow: "Bio seme · Srbija × Mađarska",
      titleA: "Najkoncentrovanija",
      titleB: "energija",
      titleC: "prirode.",
      lede: "Žive klice i mikrogriniji, na tvojoj kuhinjskoj radnoj površini. Iz jedne semenke — vitalnost čitavog ekosistema.",
      scroll: "Skroluj ka rastu",
    },
    marquee: "Održivo · Kućna farma · 100% bio · Prirodna",
    values: {
      eyebrow: "Zašto Natursense?",
      title: "Prednosti klica",
      one: { title: "Bioraspoloživost", body: "Tokom klijanja, hranljive materije se koncentrišu i do 40×. Živi enzimi, stvaran efekat." },
      two: { title: "Kućna farma", body: "Nekoliko dana, čaša vode, i tvoja kuhinja postaje mini-bašta. Bez zemlje." },
      three: { title: "Čisto poreklo", body: "Samo proverene, GMO-free, bio sertifikovane semenke iz malih gazdinstava Srbije i Mađarske." },
    },
    explorer: {
      eyebrow: "Interaktivni rast",
      title: "Život semenke u tri pokreta.",
      lede: "Klikni na date faze i gledaj kako semenka iznenada eksplodira u zelenu energiju.",
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
