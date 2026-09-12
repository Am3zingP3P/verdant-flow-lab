# Szlogencsere a Hero-ban

## Cél
A Hero főcímében a "Superfood, kompromisszumok nélkül." helyére az új szlogen kerül:  
**"Saját magad termeled, öt nap múlva eheted."**

## Változtatások

### 1. Szótár frissítése
Fájl: `src/i18n/I18nProvider.tsx`

A `hu.hero` blokkban cseréljük le a `titleA`, `titleB`, `titleC` értékeket a következő tagolásra:
- `titleA`: "Saját magad"
- `titleB`: "termeled,"
- `titleC`: "öt nap múlva eheted."

A `sr.hero` blokkban a szerb megfelelőre cseréljük a három sort. Javasolt, nem neme-zárt verzió:
- `titleA`: "Samo posadi,"
- `titleB`: "za pet dana"
- `titleC`: "jedeš."

A szótár többi kulcsa (`eyebrow`, `lede`, `scroll`, stb.) változatlan.

### 2. Megjelenítés ellenőrzése
Fájl: `src/components/site/Hero.tsx`

A komponens már a `hero.titleA/B/C` kulcsokat használja, és a 0. és 2. sort dőlt/zöldes árnyalattal jeleníti meg. Csak a szöveg változik, a komponensre nincs szükség módosítás.

## Ellenőrzés
- `bunx vite build` sikeres lefutása.
- Preview-n HU és SRB nyelven is ellenőrizni, hogy a szlogen szépen tördelődik a három sorba, és nem törik el középen mobil/tablet nézeten.
