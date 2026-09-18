# Menüugrás javítása a görgetős előnyszakasznál

## Cél

A felső menü valamelyik pontjára kattintva az oldal közvetlenül a kiválasztott részhez kerüljön, ne játssza végig láthatóan a közbeeső „Vitaminsűrűség” fejezeteket.

## Mit változtatunk

1. **A felső menü külön navigációs viselkedést kap**
   - A „Miért?”, „Interaktív”, „Magok” és „Kapcsolat” menüpontok közvetlenül a célrészhez ugranak.
   - A címsorban továbbra is megmarad az adott rész azonosítója, így a linkek vissza- és megoszthatók maradnak.

2. **A fejezetes görgetés érintetlen marad**
   - A „Vitaminsűrűség” szakasz rögzítése, négy fejezete, köríve és kézi görgetési animációja nem változik.
   - A főoldali, előnyökhöz vezető gomb továbbra is finoman a szakasz elejére görget, tehát a látogató onnan rendesen végignézheti a fejezeteket.

3. **Stabil célpozíció**
   - Ugrás előtt frissülnek a rögzített részek pozíciói, majd a cél azonnal kerül beállításra.
   - Ez mind felfelé, mind lefelé navigáláskor elkerüli a köztes fejezetek felvillanását és a téves érkezési pontot.

4. **Ellenőrzés**
   - Kipróbáljuk a menüpontokat a fejezetes rész fölül és alul is.
   - Ellenőrizzük gépen és telefonméretben, hogy a kézi fejezetes görgetés változatlanul működik, a menüugrás pedig nem pörgeti át láthatóan a fejezeteket.

## Technikai részletek

- `Navbar.tsx`: a felső menü hivatkozásai egy külön jelölést kapnak a közvetlen navigációhoz.
- `useLenis.ts`: a jelölt menühivatkozásoknál a meglévő animált `scrollTo` helyett frissítés utáni azonnali célugrás fut; a többi oldalon belüli link megtartja a jelenlegi sima görgetést.
