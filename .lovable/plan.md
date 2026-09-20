# Viber ikon javítása a lábléc kapcsolat részén

## Mi a gond

A Viber ikon jelenleg egy külső, Lovable-kiszolgálón tárolt képfájl. A Vercelre kitett oldalon ez a cím nem létezik, ezért az ikon helye üresen marad. Ráadásul képfájl lévén nem tudja követni a világos/sötét módot, mint a másik két ikon.

## A megoldás

A Viber ikont ugyanolyan beépített, rajzolt ikonná alakítom, mint az Instagram és a Facebook:

- Az ikon a szöveg színét veszi fel, tehát világos módban sötét, sötét módban világos — pontosan úgy, mint a másik kettő.
- Ugyanaz a méret, vonalvastagság és hover viselkedés (zöld körben világos ikon).
- Nincs többé külső fájlbetöltés, így a Vercelre kitett oldalon és bárhol máshol is azonnal látszik.

A régi képfájlra mutató hivatkozást eltávolítom, a fájlt magát meghagyom, hogy semmi ne törjön el.

## Érintett fájl

- `src/components/site/Footer.tsx` — a `viberIcon` import és `<img>` cseréje inline SVG-re (`fill="currentColor"`, `h-4 w-4`), a Facebook ikonnal azonos felépítésben.

## Ellenőrzés

Világos és sötét módban, telefon- és asztali nézetben megnézem, hogy mindhárom ikon egységesen néz ki.
