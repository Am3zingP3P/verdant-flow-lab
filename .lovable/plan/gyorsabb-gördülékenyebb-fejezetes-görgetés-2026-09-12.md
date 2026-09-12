# Gyorsabb, gördülékenyebb fejezetes görgetés

A "Hét nap. Nulla szállítás. Nulla veszteség." rész jelenleg nagyon hosszú görgetést kér: a szakasz a képernyőhöz rögzül, és a négy fejezet végigpörgetéséhez kb. 3,4 képernyőnyi görgetés kell. Telefonon ez különösen vontatott, mert ott egy húzás kevesebb utat tesz meg.

## Mit változtatunk

1. **Rövidebb görgetési út**
   - Gépen: kb. 3,4 képernyő helyett kb. 2 képernyő.
   - Telefonon: kb. 1,4 képernyő — így egy-két hüvelykujj-húzással végig lehet menni a négy fejezeten.
   - A hossz a képernyőméret alapján automatikusan áll be, és ablakátméretezéskor újraszámolódik.

2. **Azonnalibb reakció**
   - A fejezetváltás követése "késleltetett" helyett szinte azonnali lesz, így a mozgás pontosan követi az ujjat/görgőt.
   - A háttér-fény elmozdulása is visszafogottabb, hogy ne tűnjön lomhának.

3. **Simább görgetésérzet telefonon**
   - Az érintéses görgetés érzékenységét megnöveljük, a simító animáció idejét kicsit rövidítjük — az egész oldal fürgébb lesz, nemcsak ez a rész.

4. **Akadálymentesség**
   - Ha a készüléken be van kapcsolva a "csökkentett mozgás", a rész rögzítés nélkül, egyszerű egymás utáni fejezetekként jelenik meg.

## Amit nem érintünk

A látvány, a szövegek, a fejezetnevek, a körív és a színátmenetek változatlanok maradnak — csak a görgetés tempója és hossza módosul.

## Technikai részletek

- `src/components/site/HealthBenefits.tsx`: a `ScrollTrigger` `end: "+=340%"` értéke helyett képernyőméret-függő érték (mobil ~140%, asztali ~200%), `invalidateOnRefresh: true` és `ScrollTrigger.refresh()` átméretezéskor; `scrub: 0.8` → `scrub: 0.25`; az orb-parallax `yPercent: -30` → `-14`, azonos `end` értékkel.
- `prefers-reduced-motion` esetén a pin/scrub trigger nem jön létre, helyette a fejezetek statikusan jelennek meg.
- `src/hooks/useLenis.ts`: `duration` 1.35 → ~1.05, `touchMultiplier` 1.4 → ~2.0.
