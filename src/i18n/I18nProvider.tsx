import { useCallback, useEffect, useState, type ReactNode } from "react";
import { I18nContext, type Dict, type Lang } from "@/i18n/context";

export type { Lang } from "@/i18n/context";

const dictionaries: Record<Lang, Dict> = {
  hu: {
    meta: {
      title: "Natursense - Saját magad termeled, öt nap múlva eheted.",
      description: "Bio csíramagok Szerbiából. Termessz friss csírákat otthon!",
      ogTitle: "Natursense - Saját magad termeled, öt nap múlva eheted.",
      ogDescription: "Bio csíramagok Szerbiából. Termessz friss csírákat otthon!",
    },
    nav: { story: "Miért?", explorer: "Interaktív", seeds: "Galéria", contact: "Kapcsolat" },
    cta: { shop: "Vásárlás", explore: "Fedezd fel előnyeit", learn: "Történetünk" },
    hero: {
      eyebrow: "Bio mag · Magyarország × Szerbia",
      titleA: "Saját magad",
      titleB: "termeled,",
      titleC: "öt nap múlva eheted.",
      lede: "Élő csírák, egyenesen a konyhapultodról. Otthon termesztve, általad.",
      scroll: "Görgess tovább",
    },
    marquee: "Fenntartható · Otthoni farm · 100% bio · Természetes",
    values: {
      eyebrow: "Miért csíráztass?",
      title: "A csíramagok előnyei",
      imageAlt: "Natursense — bio csírák és magvak",
      one: {
        title: "Természetes vitaminok",
        body: "A csírázás során egyes tápanyagok és vitaminok mennyisége megnő, mások pedig könnyebben hozzáférhetővé válnak a szervezet számára.",
      },
      two: {
        title: "Önellátás (kicsiben)",
        body: "Néhány nap, egy üvegcse víz, és a konyhád egy mini-kertté válik. Föld nélkül.",
      },
      three: {
        title: "Tiszta eredet",
        body: "Megbízható bio magvak, amelyek tökéletesek a sikeres csíráztatáshoz.",
      },
    },
    benefits: {
      aria: "Egészségügyi előnyök",
      progressAria: "Haladás",
      chapters: {
        c1: {
          name: "Vitaminsűrűség",
          kicker: "Vitaminsűrűség",
          title: "Negyvenszer több vitamin, mint az érett zöldségben.",
          body: "A csírázás pillanatában a mag felszabadítja tartalék tápanyagait, ezáltal C-, E-, K-vitaminhoz juthatsz, valamint B-komplexhez. Mindezt természetes formában, tabletták nélkül.",
          caption: "Csírázó brokkoli vs. érett brokkoli",
        },
        c2: {
          name: "Élő enzimek",
          kicker: "Élő enzimek",
          title: "Aktív enzimek, egyenesen a konyhapultodról.",
          body: "Nyersen fogyasztva a csíra minden enzime dolgozik: emészti a fehérjéket, felszabadítja az ásványi anyagokat, tehermentesíti a testet.",
          caption: "Amiláz, proteáz, lipáz — hőkezelés nélkül",
        },
        c3: {
          name: "Növényi fehérje",
          kicker: "Fehérje / 100g",
          title: "Növényi fehérje, teljes aminosav-profillal.",
          body: "A lucerna-, retek- és brokkolicsíra értékes növényi fehérjeforrás, és esszenciális aminosavakat is tartalmaz, amelyek könnyen felszívódó formában vannak jelen.",
          caption: "Átlagos fehérjetartalom friss csírában",
        },
        c4: {
          name: "Magtól a tányérig",
          kicker: "Magtól a tányérig",
          title: "Öt nap. Nulla szállítás. Nulla veszteség.",
          body: "A konyhapulton nőnek, és nem a kamionban öregednek. Amit termelsz, azt eszed: a frissesség garantált.",
          caption: "Átlagos ciklus a konyhádban",
        },
      },
    },

    explorer: {
      eyebrow: "Interaktív növekedés",
      title: "Egy mag élete, három szakaszban.",
      lede: "Kattints a szakaszokra, és kövesd végig a mag fejlődését, egészen a csírázás első lépéseitől a friss csíráig.",
      stages: { seed: "Mag", germ: "Csírázás", micro: "Mikrozöld" },
      drag: "Húzd",
    },
    seeds: {
      alfalfa: { name: "Lucerna", note: "Lágy, édes" },
      broccoli: { name: "Brokkoli", note: "Szulforafán-bomba. Tiszta, friss, élénk." },
      radish: { name: "Retek", note: "Csípős, élénk rózsaszín, ébresztő íz." },
    },
    gallery: {
      eyebrow: "Galéria",
      title: "A növekedés",
      titleAccent: "pillanatai",
      intro: "A magtól egészen a tányérodig. Napok alatt.",
      open: "megnyitása nagyban",
      close: "Bezárás",
      items: {
        jar: {
          name: "Csíráztató üveg és brokkolimag",
          category: "Az eszköz",
          desc: "A sárga csíráztató üveg egy fatönkön, mellette brokkoli csíramag.",
        },
        box: {
          name: "Magvak rekeszekben",
          category: "A választék",
          desc: "Magtároló doboz felülnézetből, tele magvakkal.",
        },
        radish: {
          name: "Retek csíramag",
          category: "Retek",
          desc: "Retek csíramag a csíráztató üveg mellett.",
        },
        mung: { name: "Mungóbab a tönkön", category: "Mungóbab", desc: "" },
        hands: { name: "Egy marék csíramag", category: "Kézzel mérve", desc: "" },
        family: {
          name: "A teljes kínálat",
          category: "Öt fajta",
          desc: "Mind az öt csíramag egymás mellett: retek, lucerna, brokkoli, mungóbab és görögszéna.",
        },
        alfalfa: {
          name: "Lucerna csíramag",
          category: "Lucerna",
          desc: "A lucerna csíramag zacskója a napsütötte fatönkön, körülötte apró aranyszínű magvak.",
        },
      },
    },
    footer: {
      tag: "Valódi frissesség, általad termelve.",
      rights: "Minden jog fenntartva",
      locationLabel: "Székhelyünk",
      locationLine1: "Szabadka, Szerbia",
      locationLine2: "Vajdaság",
      emailLabel: "E-mail",
      writeUs: "Írj nekünk",
      followUs: "Kövess minket",
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
      metaDesc:
        "A Natursense weboldal impresszuma, felhasználási feltételei és adatvédelmi tájékoztatója.",
      ogTitle: "Impresszum és jogi információk — Natursense",
      ogDesc: "A Natursense weboldal jogi, szerzői jogi és adatvédelmi információi.",
      eyebrow: "Jogi információk",
      title: "Impresszum & Jogi információk",
      intro:
        "Az alábbi információk a weboldal használatával, a tartalmak felhasználásával és a kapcsolatfelvétellel kapcsolatos legfontosabb tudnivalókat tartalmazzák.",
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
        { label: "Tulajdonos / üzemeltető", value: "Natursense, Bacsó Tünde" },
        { label: "Székhely / cím", value: "ĐERI FERENCA 28, 24000, Subotica" },
        { label: "E-mail", value: "natursense2026@gmail.com" },
        { label: "Tárhelyszolgáltató", value: "Lovable Cloud" },
      ],
      privacyDetails: [
        { label: "Adatkezelő / felelős szervezet", value: "Bacsó Tünde" },
        { label: "Kapcsolattartási e-mail", value: "natursense2026@gmail.com" },
        { label: "Adatkezelés célja", value: "Kapcsolatfelvétel és megkeresések megválaszolása." },
        {
          label: "Az érintett által megadott adatok",
          value: "Név, e-mail-cím, üzenet és az önkéntesen megadott további információk.",
        },
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
          "A látogató e-mailben önkéntesen adhat meg személyes adatokat, például nevét, e-mail-címét, üzenetének tartalmát és az üzenetben közölt további információkat.",
          "Az e-mailben megadott személyes adatokat kizárólag a megkeresés kezelése, a válaszadás és az ehhez kapcsolódó kommunikáció céljából kezeljük.",
          "A Natursense bizalmasan kezeli az e-mailben megadott adatokat. Az adatokat nem használjuk fel a megkereséstől eltérő célra, és nem adjuk tovább harmadik félnek.",
          "Kérjük, e-mailben csak a megkereséshez szükséges információkat add meg, és ne küldj érzékeny vagy különleges személyes adatokat.",
        ],
        cookies: [
          "A weboldal nem használ Google Analytics, Meta Pixel vagy más hirdetési követést, és nem célja a látogatók profilozása vagy szükségtelen marketingadatok gyűjtése. Az opcionális sütik használatáról a látogató a weboldalon elérhető sütibeállításokban dönthet.",
          "A tárhelyszolgáltató a weboldal biztonságos és megbízható működtetéséhez technikailag szükséges naplóadatokat kezelhet. Ennek részleteire a tárhelyszolgáltató mindenkori adatvédelmi feltételei vonatkoznak.",
          "A Natursense célja, hogy a weboldal használata során csak a szükséges információkat kezelje. E-mailes megkereséskor csak az ügyfél eléréséhez szükséges adatokat kérjük.",
        ],
        disclaimer: [
          "A weboldal tartalma tájékoztató jellegű. Az egészséggel, táplálkozással, életmóddal vagy más hasonló témákkal kapcsolatos általános információ nem helyettesíti az egyéni szakmai tanácsadást.",
        ],
        changes: [
          "A Natursense fenntartja a jogot arra, hogy ezt a jogi és adatvédelmi tájékoztatót szükség esetén frissítse vagy módosítsa. Az aktuális változat mindig itt érhető el.",
        ],
      },
    },
  },
  sr: {
    meta: {
      title: "Natursense - Sam uzgajaš. Za 5 dana bereš.",
      description: "Organsko seme za klijanje iz Srbije. Uzgoji sveže klice kod kuće!",
      ogTitle: "Natursense - Sam uzgajaš. Za 5 dana bereš.",
      ogDescription: "Organsko seme za klijanje iz Srbije. Uzgoji sveže klice kod kuće!",
    },
    nav: { story: "Zašto?", explorer: "Interaktivno", seeds: "Galerija", contact: "Kontakt" },
    cta: { shop: "Kupi", explore: "Istraži", learn: "Naša priča" },
    hero: {
      eyebrow: "Bio seme · Srbija × Mađarska",
      titleA: "Sam uzgajaš.",
      titleB: "Za 5 dana",
      titleC: "bereš.",
      lede: "Žive klice i mikrozeleni, na tvojoj kuhinjskoj radnoj površini. Iz malih semenki, sve to ti uzgajaš.",
      scroll: "Skroluj ka rastu",
    },
    marquee: "Održivo · Kućna farma · 100% bio · Prirodna",
    values: {
      eyebrow: "Zašto Natursense?",
      title: "Prednosti klica",
      imageAlt: "Natursense — bio klice i semenke",
      one: {
        title: "Bioraspoloživost",
        body: "Tokom klijanja, hranljive materije se koncentrišu i do 40×. Živi enzimi, stvaran efekat.",
      },
      two: {
        title: "Kućna farma",
        body: "Nekoliko dana, čaša vode, i tvoja kuhinja postaje mini-bašta. Bez zemlje.",
      },
      three: {
        title: "Čisto poreklo",
        body: "Samo proverene, GMO-free, bio sertifikovane semenke iz malih gazdinstava Srbije i Mađarske.",
      },
    },
    benefits: {
      aria: "Zdravstvene prednosti",
      progressAria: "Napredak",
      chapters: {
        c1: {
          name: "Gustina vitamina",
          kicker: "Gustina vitamina",
          title: "Četrdeset puta više vitamina nego u zrelom povrću.",
          body: "U trenutku klijanja semenka oslobađa svoje rezerve. Vitamini C, E, K i B-kompleks — u koncentrovanom, živom obliku.",
          caption: "Klica brokolija u odnosu na zreli brokoli · sadržaj sulforafana",
        },
        c2: {
          name: "Živi enzimi",
          kicker: "Živi enzimi",
          title: "Sto posto aktivnih enzima iz tvoje kuhinje.",
          body: "Kada se jedu sirove, enzimi klica aktivno rade: razgrađuju proteine, oslobađaju minerale i rasterećuju telo.",
          caption: "Amilaza, proteaza, lipaza — bez toplotne obrade",
        },
        c3: {
          name: "Biljni protein",
          kicker: "Protein / 100g",
          title: "Biljni protein sa kompletnim aminokiselinama.",
          body: "Klice lucerke, rotkvice i brokolija daju kompletan protein — sve esencijalne aminokiseline, lako svarljive.",
          caption: "Prosečan sadržaj proteina u svežoj klici",
        },
        c4: {
          name: "Od semenke do tanjira",
          kicker: "Od semenke do tanjira",
          title: "Pet dana. Bez transporta. Bez gubitka.",
          body: "Rastu na tvom pultu — ne stare u kamionu. Ono što isečeš, to jedeš: svež kiseonik, svež hlorofil.",
          caption: "Prosečan ciklus u tvojoj kuhinji",
        },
      },
    },

    explorer: {
      eyebrow: "Interaktivni rast",
      title: "Život semenke u tri pokreta.",
      lede: "Klikni na date faze i gledaj kako semenka iznenada eksplodira u zelenu energiju.",
      stages: { seed: "Semenka", germ: "Klijanje", micro: "Mikrozeleni" },
      drag: "Povuci",
    },
    seeds: {
      alfalfa: { name: "Lucerka", note: "Meka, slatka — ulaz u svet klica." },
      broccoli: { name: "Brokoli", note: "Sulforafan bomba. Čisto, sveže, živo." },
      radish: { name: "Rotkva", note: "Ljuto, jako roze, buđenje za nepca." },
    },
    gallery: {
      eyebrow: "Galerija",
      title: "Trenuci",
      titleAccent: "rasta",
      intro: "Od semenke do tvog tanjira. Za samo nekoliko dana.",
      open: "otvori u velikom prikazu",
      close: "Zatvori",
      items: {
        jar: {
          name: "Tegla za klijanje i seme brokolija",
          category: "Oprema",
          desc: "Žuta tegla za klijanje na panju, pored nje seme brokolija.",
        },
        box: {
          name: "Semenke u pregradama",
          category: "Izbor",
          desc: "Kutija sa pregradama, fotografisana odozgo i ispunjena semenkama.",
        },
        radish: {
          name: "Seme rotkvice",
          category: "Rotkvica",
          desc: "Seme rotkvice pored tegle za klijanje.",
        },
        mung: { name: "Mungo pasulj na panju", category: "Mungo pasulj", desc: "" },
        hands: { name: "Šaka semenki za klijanje", category: "U rukama", desc: "" },
        family: {
          name: "Celokupan izbor",
          category: "Pet vrsta",
          desc: "Pet vrsta semenki za klijanje jedna pored druge: rotkvica, lucerka, brokoli, mungo pasulj i piskavica.",
        },
        alfalfa: {
          name: "Seme lucerke",
          category: "Lucerka",
          desc: "Pakovanje semena lucerke na osunčanom panju, okruženo sitnim zlatnim semenkama.",
        },
      },
    },
    footer: {
      tag: "Živa energija. Iz semenke. Za semenku.",
      rights: "Sva prava zadržana",
      locationLabel: "Naše sedište",
      locationLine1: "Subotica, Srbija",
      locationLine2: "Vojvodina",
      emailLabel: "E-pošta",
      writeUs: "Piši nam",
      followUs: "Prati nas",
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
      intro:
        "Sledeće informacije sadrže najvažnije napomene o korišćenju veb-sajta, korišćenju sadržaja i kontaktu.",
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
        { label: "Vlasnik / operater", value: "Natursense, Bacsó Tünde" },
        { label: "Sedište / adresa", value: "ĐERI FERENCA 28, 24000, Subotica" },
        { label: "E-mail", value: "natursense2026@gmail.com" },
        { label: "Hosting provajder", value: "Lovable Cloud" },
      ],
      privacyDetails: [
        { label: "Rukovalac podataka / odgovorna organizacija", value: "Bacsó Tünde" },
        { label: "E-mail za kontakt", value: "natursense2026@gmail.com" },
        { label: "Svrha obrade podataka", value: "Kontakt i odgovaranje na upite." },
        {
          label: "Podaci koje dostavi korisnik",
          value: "Ime, adresa e-pošte, poruka i dodatne dobrovoljno navedene informacije.",
        },
      ],
      paragraphs: {
        about: [
          "Veb-sajt Natursense prvenstveno služi za predstavljanje brenda, njegovih aktivnosti, sadržaja, ideja i povezanih tema. Veb-sajt nije onlajn prodavnica, ne prodaje direktno proizvode, i jednostavno pregledanje ne stvara ugovor o kupovini.",
        ],
        terms: [
          "Sadržaj na veb-sajtu služi prvenstveno u informativne svrhe; ne predstavlja ugovornu ponudu, a veb-sajt nije onlajn prodajna platforma. Posetioci mogu slobodno da pretražuju i čitaju sadržaj.",
          "Trudimo se da informacije budu tačne i ažurne, ali ipak može doći do netačnosti, nedostataka, zastarelih informacija ili dvosmislenih formulacija. Operater ne preuzima odgovornost, u meri dozvoljenoj primenjivim pravom, za štetu nastalu oslanjanjem na objavljene informacije.",
          "Veb-sajt i njegov sadržaj mogu se u svakom trenutku izmeniti, ažurirati, zameniti ili ukloniti bez prethodnog obaveštenja.",
        ],
        copyright: [
          "Osim ako nije drugačije navedeno, tekstovi, grafike, fotografije, vizuelni materijali, logotipi i drugi originalni sadržaji koji se pojavljuju na veb-sajtu uživaju autorsku zaštitu. Oni se ne mogu kopirati, umnožavati, distribuirati, menjati ili koristiti u komercijalne svrhe bez prethodne dozvole, osim ako to primenjivo pravo izričito dozvoljava.",
          "Materijali koji potiču od trećih lica ostaju u vlasništvu odgovarajućih nosilaca prava.",
        ],
        external: [
          "Veb-sajt može sadržati linkove ka spoljnim veb-sajtovima, platformama ili društvenim mrežama. To su obično društvene stranice Natursense (npr. Instagram ili TikTok), ali može se pojaviti i Google Forms ili druga spoljna usluga.",
          "Natursense ne proverava sadržaj, dostupnost ili praksu zaštite podataka sajtova trećih lica. Te sajtove uređuju sopstveni uslovi i izjave o privatnosti; njihovo posećivanje se odvija na sopstvenu odluku korisnika.",
        ],
        privacy: [
          "Posetilac može dobrovoljno ostaviti lične podatke putem e-pošte, kao što su ime, adresa e-pošte, sadržaj poruke i dodatne informacije koje navede u poruci.",
          "Lični podaci navedeni u e-pošti obrađuju se isključivo u svrhu obrade upita, davanja odgovora i povezane komunikacije.",
          "Natursense poverljivo obrađuje podatke prosleđene putem e-pošte. Podatke ne koristimo u svrhe različite od upita i ne prosleđujemo ih trećim licima.",
          "Molimo te da putem e-pošte navedeš samo podatke neophodne za upit i da ne šalješ osetljive ili posebne lične podatke.",
        ],
        cookies: [
          "Veb-sajt ne koristi Google Analytics, Meta Pixel niti druga oglašavačka praćenja i nema za cilj profilisanje posetilaca niti prikupljanje nepotrebnih marketinških podataka. Posetilac odlučuje o korišćenju opcionih kolačića u podešavanjima kolačića dostupnim na veb-sajtu.",
          "Hosting provajder može obrađivati tehnički neophodne podatke dnevnika za bezbedan i pouzdan rad veb-sajta. Detalje uređuju važeći uslovi zaštite podataka hosting provajdera.",
          "Cilj Natursense je da obrađuje samo neophodne informacije tokom korišćenja veb-sajta. U e-pošti tražimo samo podatke neophodne za kontaktiranje klijenta.",
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

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("hu");

  const t = useCallback(
    (path: string): string => {
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
    },
    [lang],
  );

  useEffect(() => {
    const stored =
      (typeof window !== "undefined" && (localStorage.getItem("ns-lang") as Lang | null)) || null;
    if (stored === "hu" || stored === "sr") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const isLegal = window.location.pathname === "/jogi-informaciok";
    const key = (name: string) => t(`${isLegal ? "legal" : "meta"}.${name}`);
    const title = key(isLegal ? "metaTitle" : "title");
    const description = key(isLegal ? "metaDesc" : "description");
    const ogTitle = key("ogTitle");
    const ogDescription = key(isLegal ? "ogDesc" : "ogDescription");

    document.title = title;
    const setMeta = (selector: string, content: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    };
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', ogTitle);
    setMeta('meta[property="og:description"]', ogDescription);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
  }, [lang, t]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("ns-lang", l);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dict: dictionaries[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}
