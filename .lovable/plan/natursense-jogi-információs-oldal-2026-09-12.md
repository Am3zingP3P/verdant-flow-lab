# Natursense jogi információs oldal

## Cél
Külön, visszafogott és könnyen olvasható jogi oldalt készítünk a Natursense számára. A főoldal változatlan marad, a láblécben csak egy kis „Impresszum & Jogi információk” hivatkozás jelenik meg.

## Megvalósítás
- Létrehozom a `/jogi-informaciok` oldalt saját címmel és kereső-/megosztási leírással.
- Az oldal a meglévő krém, homok, moha és zöld arculatot, betűket és sötét módot használja.
- Középre rendezett, jól tagolt elrendezést kap rövid bekezdésekkel, puha kártyákkal és nagyon finom növényi díszítéssel.
- Felveszem az összes kért részt: impresszum, weboldal célja, feltételek, szerzői jog, külső oldalak, kapcsolatfelvételi adatkezelés, sütik/technikai naplók, felelősségkizárás és módosítások.
- Minden ismeretlen céges, kapcsolati, tárhely- és megőrzési adat egyértelmű, könnyen cserélhető helykitöltő marad.
- Nem kerül be új követés, elemzés, felugró jogi ablak vagy adatgyűjtés; a meglévő sütibeállítás változatlan marad.
- A lábléc kis másodlagos linket kap, az új oldal pedig jól látható visszalépést biztosít a Natursense főoldalára.
- Telefonon, tableten és asztali képernyőn ellenőrzöm az olvashatóságot, a tördelést és a vízszintes túlcsordulás hiányát.

## Technikai részletek
- Új TanStack útvonal: `src/routes/jogi-informaciok.tsx`.
- A főoldali láblécben típusbiztos belső navigáció.
- Az oldal önálló HU jogi tartalmat kap; nem változtatja meg a főoldal felépítését vagy működését.
