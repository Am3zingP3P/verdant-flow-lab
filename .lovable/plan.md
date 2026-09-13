# Szövegfrissítés: lábléc

## Cél
A lábléc jobb felső címkeje ("A gyökereink") és a nagy bal oldali tagline ("Valódi frissesség, általad termelve.") túl giccses, AI-szagú vagy klisés. Frissebb, emberibb, a márkához jobban illő szövegeket adok mindkét nyelven.

## Mit fogok módosítani
- `src/i18n/I18nProvider.tsx`: új `footer.originLabel` kulcs a helyszín fölötti címkéhez, és a `footer.tag` újragondolása HU-ban és SRB-ben.
- `src/components/site/Footer.tsx`: a helyszíncímkét kiveszem hardcoded szövegből, és `t("footer.originLabel")`-re cserélem.

## Választható változatok

### 1. Helyszín címke (Subotica, Srbija / Vojvodina fölé)

| # | HU | SRB | Hangulat |
|---|---|---|---|
| A | Innen növünk | Odavde rastemo | Cselekvés, növekedés |
| B | Kezdetek | Počeci | Egyszerű, történetmesélő |
| C | Termőföld | Zemlja za rast | Föld, mag, organikus |
| D | Otthon | Dom | Meleg, személyes |
| E | Honnan jövünk | Odakle dolazimo | Őszinte, nem giccses |

Javaslat: **A** vagy **C** — növekedés/teremtés metafora anélkül, hogy a "gyökerek" klisét használná.

### 2. Lábléc tagline (nagy bal oldali szöveg)

| # | HU | SRB | Hangulat |
|---|---|---|---|
| 1 | Termeld, ne csak vedd. | Uzgoji, ne samo kupi. | Cselekvés, önellátás |
| 2 | Élő étel a pultodon. | Živa hrana na tvojoj polici. | Konkrét, konyhai |
| 3 | Kis mag. Nagy frissesség. | Malo seme. Velika svežina. | Párhuzamos, emlékezetes |
| 4 | Saját magad termeled. | Sam uzgajaš. | Egyenes, ismétlődő szlogen |
| 5 | Friss, ahogy te termeled. | Sveže, kako ti uzgajaš. | Minőség + személyesség |

Javaslat: **3** (Kis mag. Nagy frissesség.) — rím nélküli, de ritmikus, és összekapcsolja a terméket az élménnyel. Vagy **1**, ha erősebben kell tolni az önellátást.

## Nyitott kérdés
Melyik párost választod? Ha megadod a számokat (például **A + 3**), implementálom és frissítem a buildet.

## Technikai részletek
- A `footer` szótárat kiegészítem `originLabel` kulccsal.
- A Footer jobb oldali dobozának fejlécét `t("footer.originLabel")` hívásra cserélem.
- A szerb fordításokat ugyanezzel a stílussal igazítom.
- Build után Playwrighttal leellenőrzöm a láblécet asztali és mobil nézetben.
