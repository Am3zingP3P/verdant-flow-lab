import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "hu" | "sr";

type DictNode = string | boolean | DictNode[] | { [k: string]: DictNode };
type Dict = { [k: string]: DictNode };

const dictionaries: Record<Lang, Dict> = {
  hu: {
    nav: { story: "Miért?", explorer: "Interaktív", seeds: "Galéria", contact: "Kapcsolat" },
    cta: { shop: "Vásárlás", explore: "Fedezd fel előnyeit", learn: "Történetünk" },
    hero: {
      eyebrow: "Bio mag · Magyarország × Szerbia",
      titleA: "Saját magad",
      titleB: "termeled,",
      titleC: "öt nap múlva eheted.",
      lede: "Élő csírák, egyenesen a konyhapultodról. Kis magvakból, mindez általad termelve.",
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
    cookies: {
      eyebrow: "Adatvédelem",
      title: "Sütik — a te döntésed.",
      body: "Csak a működéshez szükséges sütiket használjuk alapból. A többihez a te hozzájárulásod kell — bármikor módosíthatod.",
      acceptAll: "Mindet elfogadom",
      rejectAll: "Csak a szükséges",
      customize: "Beállítások",
      save: "Mentés",
      settings: "Süti beállítások",
      thanks: "Köszi!",
      thanksBody: "A döntésed mentve van.",
      cat: {
        necessary: { name: "Szükséges", desc: "Az oldal alapműködéséhez. Mindig aktív." },
        preferences: { name: "Preferenciák", desc: "Nyelv és megjelenés megjegyzése." },
        analytics: { name: "Analitika", desc: "Névtelen látogatottsági statisztika." },
        marketing: { name: "Marketing", desc: "Személyre szabott hirdetések mérése." },
      },
    },
    theme: { light: "Világos mód", dark: "Sötét mód" },
    legal: {
      metaTitle: "Impresszum és jogi információk — Natursense",
      metaDesc: "A Natursense weboldal impresszuma, felhasználási feltételei és adatvédelmi tájékoztatója.",
      ogTitle: "Impresszum és jogi információk — Natursense",
      ogDesc: "A Natursense weboldal jogi, szerzői jogi és adatvédelmi információi.",
      eyebrow: "Jogi információk",
      title: "Impresszum & Jogi információk",
      intro: "Az alábbi információk a weboldal használatával, a tartalmak felhasználásával és a kapcsolatfelvétellel kapcsolatos legfontosabb tudnivalókat tartalmazzák.",
      backToHome: "Főoldal",
      lastUpdated: "Utolsó frissítés: 2026.09.12.",
      footerLink: "Impresszum & Jogi információk",
      sections: {
        impressum: { number: "01", title: "Impresszum" },
        about: { number: "02", title: "A weboldalról" },
        terms: { number: "03", title: "Felhasználási feltételek" },
        copyright: { number: "04", title: "Szerzői jogok" },
        external: { number: "05", title: "Külső oldalak" },
        privacy: { number: "06", title: "Adatvédelem és kapcsolatfelvétel", featured: true },
        cookies: { number: "07", title: "Sütik és technikai adatok" },
        disclaimer: { number: "08", title: "Felelősségkizárás" },
        changes: { number: "09", title: "A tájékoztató módosítása" },
      },
      impressumDetails: [
        { label: "Tulajdonos / üzemeltető", value: "[NAME / COMPANY]" },
        { label: "Székhely / cím", value: "[ADDRESS]" },
        { label: "E-mail", value: "[EMAIL]" },
        { label: "Tárhelyszolgáltató", value: "[HOSTING PROVIDER]" },
        { label: "Tárhelyszolgáltató címe", value: "[HOSTING PROVIDER ADDRESS]" },
      ],
      privacyDetails: [
        { label: "Adatkezelő / felelős szervezet", value: "Bacsó Tünde" },
        { label: "Kapcsolattartási e-mail", value: "natursense2026@gmail.com" },
        { label: "Adatkezelés célja", value: "Kapcsolatfelvétel és megkeresések megválaszolása." },
        { label: "Az érintett által megadott adatok", value: "Név, e-mail-cím, üzenet és az önkéntesen megadott további információk." },
      ],
      paragraphs: {
        about: [
          "A Natursense weboldala elsősorban a márka, annak tevékenységei, tartalmai, ötletei és a kapcsolódó témák bemutatását szolgálja. A weboldal nem webáruház, nem értékesít közvetlenül termékeket, és egyszerű böngészése nem hoz létre vásárlási szerződést.",
        ],
        terms: [
          "A weboldalon található tartalmak elsősorban tájékoztatási célt szolgálnak; nem minősülnek szerződéses ajánlatnak, és a weboldal nem online értékesítési felület. A látogatók a tartalmakat szabadon böngészhetik és olvashatják.",
          "Törekszünk arra, hogy az információk pontosak és naprakészek legyenek, ennek ellenére előfordulhat pontatlanság, hiány, elavult információ vagy félreérthető megfogalmazás. Az üzemeltető az alkalmazandó jog által megengedett mértékben nem vállal felelősséget a közzétett információkra való hagyatkozásból eredő károkért.",
          "A weboldal és annak tartalma előzetes értesítés nélkül bármikor módosítható, frissíthető, lecserélhető vagy eltávolítható.",
        ],
        copyright: [
          "Eltérő jelzés hiányában a weboldalon megjelenő szövegek, grafikák, fényképek, vizuális anyagok, logók és más eredeti tartalmak szerzői jogi védelem alatt állnak. Ezek előzetes engedély nélkül nem másolhatók, többszörözhetők, terjeszthetők, módosíthatók vagy használhatók kereskedelmi célra, kivéve, ha ezt az alkalmazandó jog kifejezetten lehetővé teszi.",
          "A harmadik féltől származó anyagok az adott jogosultak tulajdonában maradnak.",
        ],
        external: [
          "A weboldal külső webhelyekre, platformokra vagy közösségi oldalakra mutató hivatkozásokat tartalmazhat. Ezek jellemzően a Natursense közösségi oldalai (például Instagram vagy TikTok), de előfordulhat Google Forms vagy más külső szolgáltatás is.",
          "A Natursense nem ellenőrzi harmadik felek oldalainak tartalmát, elérhetőségét vagy adatvédelmi gyakorlatát. Ezekre az oldalakra saját feltételeik és adatvédelmi tájékoztatóik vonatkoznak; meglátogatásuk a felhasználó saját döntése alapján történik.",
        ],
        privacy: [
          "A kapcsolatfelvételi űrlapon a látogató önkéntesen adhat meg személyes adatokat, például nevét, e-mail-címét, üzenetének tartalmát és az üzenetben önkéntesen közölt további információkat.",
          "A kapcsolatfelvételi űrlapon megadott személyes adatokat kizárólag a megkeresés kezelése, a válaszadás és az ehhez kapcsolódó kommunikáció céljából kezeljük.",
          "A kapcsolatfelvételi űrlapon keresztül megadott adatokat a Natursense kezeli, bizalmasan. Az adatokat nem használjuk fel a megkereséstől eltérő célra, és nem adjuk tovább harmadik félnek.",
          "Kérjük, a kapcsolatfelvételi űrlapon csak a megkereséshez szükséges információkat add meg, és ne küldj érzékeny vagy különleges személyes adatokat.",
        ],
        cookies: [
          "A weboldal nem használ Google Analytics, Meta Pixel vagy más hirdetési követét, és nem célja a látogatók profilozása vagy szükségtelen marketingadatok gyűjtése. Az opcionális sütik használatáról a látogató a weboldalon elérhető sütibeállításokban dönthet.",
          "A tárhelyszolgáltató a weboldal biztonságos és megbízható működtetéséhez technikailag szükséges naplóadatokat kezelhet. Ennek részleteire a tárhelyszolgáltató mindenkori adatvédelmi feltételei vonatkoznak.",
          "A Natursense célja, hogy a weboldal használata során csak a szükséges információkat kezelje. A kapcsolatfelvételi űrlapon csak az ügyfél eléréséhez szükséges adatokat kérjük.",
        ],
        disclaimer: [
          "A weboldal tartalma tájékoztató jellegű. Az egészséggel, táplálkozással, életmóddal vagy más hasonló témákkal kapcsolatos általános információ nem helyettesíti az egyén szakmai tanácsadást.",
        ],
        changes: [
          "A Natursense fenntartja a jogot arra, hogy ezt a jogi és adatvédelmi tájékoztatót szükség esetén frissítse vagy módosítsa. Az aktuális változat mindig itt érhető el.",
        ],
      },
    },
  },
  sr: {
    nav: { story: "Zašto?", explorer: "Interaktivno", seeds: "Galerija", contact: "Kontakt" },
    cta: { shop: "Kupi", explore: "Istraži", learn: "Naša priča" },
    hero: {
      eyebrow: "Bio seme · Srbija × Mađarska",
      titleA: "Samo posadi,",
      titleB: "za pet dana",
      titleC: "jedeš.",
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
    cookies: {
      eyebrow: "Privatnost",
      title: "Kolačići — tvoj izbor.",
      body: "Podrazumevano koristimo samo neophodne kolačiće. Za sve ostalo nam treba tvoja saglasnost — možeš je promeniti bilo kada.",
      acceptAll: "Prihvati sve",
      rejectAll: "Samo neophodni",
      customize: "Podešavanja",
      save: "Sačuvaj",
      settings: "Podešavanja kolačića",
      thanks: "Hvala!",
      thanksBody: "Tvoj izbor je sačuvan.",
      cat: {
        necessary: { name: "Neophodni", desc: "Za osnovno funkcionisanje sajta. Uvek aktivni." },
        preferences: { name: "Preferencije", desc: "Pamćenje jezika i izgleda." },
        analytics: { name: "Analitika", desc: "Anonimna statistika poseta." },
        marketing: { name: "Marketing", desc: "Merenje personalizovanih oglasa." },
      },
    },
    theme: { light: "Svetla tema", dark: "Tamna tema" },
    legal: {
      metaTitle: "Impresum i pravne informacije — Natursense",
      metaDesc: "Impresum veb-sajta Natursense, uslovi korišćenja i izjava o privatnosti.",
      ogTitle: "Impresum i pravne informacije — Natursense",
      ogDesc: "Pravne, autorske i privatnosne informacije veb-sajta Natursense.",
      eyebrow: "Pravne informacije",
      title: "Impresum & Pravne informacije",
      intro: "Sledeće informacije sadrže najvažnije napomene o korišćenju veb-sajta, korišćenju sadržaja i kontaktu.",
      backToHome: "Početna",
      lastUpdated: "Poslednje ažuriranje: 12.09.2026.",
      footerLink: "Impresum & Pravne informacije",
      sections: {
        impressum: { number: "01", title: "Impresum" },
        about: { number: "02", title: "O sajtu" },
        terms: { number: "03", title: "Uslovi korišćenja" },
        copyright: { number: "04", title: "Autorska prava" },
        external: { number: "05", title: "Spoljni linkovi" },
        privacy: { number: "06", title: "Zaštita podataka i kontakt", featured: true },
        cookies: { number: "07", title: "Kolačići i tehnički podaci" },
        disclaimer: { number: "08", title: "Odricanje odgovornosti" },
        changes: { number: "09", title: "Izmene obaveštenja" },
      },
      impressumDetails: [
        { label: "Vlasnik / operater", value: "[NAME / COMPANY]" },
        { label: "Sedište / adresa", value: "[ADDRESS]" },
        { label: "E-mail", value: "[EMAIL]" },
        { label: "Hosting provajder", value: "[HOSTING PROVIDER]" },
        { label: "Adresa hosting provajdera", value: "[HOSTING PROVIDER ADDRESS]" },
      ],
      privacyDetails: [
        { label: "Rukovalac podataka / odgovorna organizacija", value: "Bacsó Tünde" },
        { label: "E-mail za kontakt", value: "natursense2026@gmail.com" },
        { label: "Svrha obrade podataka", value: "Kontakt i odgovaranje na upite." },
        { label: "Podaci koje dostavi korisnik", value: "Ime, adresa e-pošte, poruka i dodatne dobrovoljno navedene informacije." },
      ],
      paragraphs: {
        about: [
          "Veb-sajt Natursense prvenstveno sluzi za predstavljanje brenda, njegovih aktivnosti, sadržaja, ideja i povezanih tema. Veb-sajt nije onlajn prodavnica, ne prodaje direktno proizvode, i jednostavno pregledanje ne stvara ugovor o kupovini.",
        ],
        terms: [
          "Sadržaj na veb-sajtu sluzi prvenstveno informativne svrhe; ne predstavlja ugovornu ponudu, a veb-sajt nije onlajn prodajna platforma. Posetioci mogu slobodno da pretražuju i čitaju sadržaj.",
          "Trudimo se da informacije budu tačne i ažurne, ali ipak može doći do netačnosti, nedostataka, zastarelih informacija ili dvosmislenih formulacija. Operater ne preuzima odgovornost, u meri dozvoljenoj primenjivim pravom, za štetu nastalu oslanjanjem na objavljene informacije.",
          "Veb-sajt i njegov sadržaj mogu se u svakom trenutku izmeniti, ažurirati, zameniti ili ukloniti bez prethodnog obaveštenja.",
        ],
        copyright: [
          "Osnovno bez drugačije oznake, tekstovi, grafike, fotografije, vizuelni materijali, logotipi i drugi originalni sadržaji koji se pojavljuju na veb-sajtu uživaju autorsku zaštitu. Oni se ne mogu kopirati, umnožavati, distribuirati, menjati ili koristiti u komercijalne svrhe bez prethodne dozvole, osim ako to primenjivo pravo izričito dozvoljava.",
          "Materijali koji potiču od trećih lica ostaju u vlasništvu odgovarajućih nosilaca prava.",
        ],
        external: [
          "Veb-sajt može sadržati linkove ka spoljnim veb-sajtovima, platformama ili društvenim mrežama. To su obično društvene stranice Natursense (npr. Instagram ili TikTok), ali može se pojaviti i Google Forms ili druga spoljna usluga.",
          "Natursense ne proverava sadržaj, dostupnost ili praksu zaštite podataka sajtova trećih lica. Te sajtove uređuju sopstveni uslovi i izjave o privatnosti; njihovo posećivanje se odvija na sopstvenu odluku korisnika.",
        ],
        privacy: [
          "U kontakt formularu posetilac može dobrovoljno ostaviti lične podatke, kao što su ime, adresa e-pošte, sadržaj poruke i dodatne informacije koje dobrovoljno navede u poruci.",
          "Lični podaci navedeni u kontakt formularu obrađuju se isključivo u svrhu obrade upita, davanja odgovora i povezane komunikacije.",
          "Podatke prosleđene putem kontakt formulara upravlja Natursense, poverljivo. Podatke ne koristimo u svrhe različite od upita i ne prosleđujemo ih trećim licima.",
          "Molimo te da u kontakt formularu navedeš samo podatke neophodne za upit i da ne šalješ osetljive ili posebne lične podatke.",
        ],
        cookies: [
          "Veb-sajt ne koristi Google Analytics, Meta Pixel niti druga oglašavačka praćenja, i ne ima za cilj profilisanje posetilaca niti prikupljanje nepotrebnih marketing podataka. Posetilac odlučuje o korišćenju opcionih kolačića u podešavanjima kolačića dostupnim na veb-sajtu.",
          "Hosting provajder može obrađivati tehnički neophodne podatke dnevnika za bezbedan i pouzdan rad veb-sajta. Detalje uređuju važeći uslovi zaštite podataka hosting provajdera.",
          "Cilj Natursense je da obrađuje samo neophodne informacije tokom korišćenja veb-sajta. U kontakt formularu tražimo samo podatke neophodne za kontaktiranje klijenta.",
        ],
        disclaimer: [
          "Sadržaj veb-sajta je informativnog karaktera. Opšte informacije vezane za zdravlje, ishranu, životni stil ili slične teme ne zamenjuju stručno savetovanje prilagođeno pojedincu.",
        ],
        changes: [
          "Natursense zadržava pravo da po potrebi ažurira ili izmeni ovo pravno i privatnosno obaveštenje. Važeća verzija je uvek dostupna ovde.",
        ],
      },
    },
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => string;
  dict: Dict;
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

  return <I18nCtx.Provider value={{ lang, setLang, t, dict: dictionaries[lang] }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
