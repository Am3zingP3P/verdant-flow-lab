# Szerb galéria és Messenger-kompatibilis mobilnézet

## Galéria teljes kétnyelvűsítése
- A galéria fejlécét, bevezetőjét, mind a hét kép címét, kategóriáját és meglévő leírását HU/SRB fordítási kulcsokra cserélem.
- A nagyított kép nézetének feliratai és akadálymentes címkéi is az aktív nyelvet követik.
- A szerb szöveg természetes, rövid és kizárólag a képen ténylegesen látható tartalmat írja le; a két szándékosan leírás nélküli kép leírás nélkül marad.
- A hosszabb szerb címeknél tördelhető, zsugorodó szövegterületet használok, hogy a felirat és a megnyitó ikon keskeny képernyőn se ütközzön vagy lógjon ki.

## Messengerben levágott előnyszakasz javítása
- Megtartom a jelenlegi rögzített, fejezetenként görgethető élményt normál telefonon, tableten és számítógépen.
- Alacsony látható magasságú mobil webview-kban — például Messenger beépített böngészőjében — a kördiagram, a függőleges térközök és a szövegközök finoman kisebbek lesznek, hogy a cím, törzsszöveg, képaláírás és alsó fejezetjelző egyszerre biztonságosan elférjen.
- A rész a ténylegesen látható dinamikus képernyőmagassághoz igazodik, és figyelembe veszi a felső/alsó biztonsági területet; nem egy feltételezett teljes telefonmagassághoz.
- A szöveget nem rejtem el és nem teszem belső görgetésűvé, így a mostani folyamatos élmény és animáció megmarad.

## Ellenőrzés
- Ellenőrzöm HU és SRB nyelven a galériát mobilon, tableten és asztali nézetben, beleértve a nagyított képet is.
- Külön tesztelem egy alacsony Messenger-szerű mobilnézetben mind a négy előny-fejezetet, világos és sötét módban.
- Ellenőrzöm, hogy nincs vízszintes túlcsordulás, szövegütközés vagy alsó kezelősáv alá kerülő tartalom.

## Technikai részletek
- A fordítások a meglévő nyelvi rendszerbe kerülnek, nem külön galéria-logikába.
- A magasságkezelés dinamikus viewport egységeket és célzott, alacsony magasságú mobil media queryt használ; az asztali elrendezés változatlan marad.
