# Audit értékelése és javítási terv

## Rövid válasz

Nem, **nem mindegyik pont azonos súlyú vagy feltétlenül hibás**, de a jelentés nagy része valós, és technikailag javítható.

### Biztosan valós, közvetlenül javítható

- A felsorolt magyar és szerb nyelvtani, helyesírási és lokalizációs hibák jelenleg is szerepelnek a szövegekben.
- A magyar galéria három kategóriája szerbül maradt.
- A „Microgreen / Mikrogrin” megnevezés nem illik a termékhez, és korábban is nyitott tartalmi kérdés volt.
- A jogi szöveg nem létező kapcsolatfelvételi űrlapra hivatkozik.
- Mobilon és tableten nincs főmenü.
- A nyelvváltó, valamint az interaktív szakasz állapotválasztói nem közlik akadálymentesen az aktív állapotot.
- A galériakártya egésze egérrel kattintható, billentyűzettel viszont nem; a nagyított nézet fókuszkezelése hiányos.
- A dokumentum nyelve fixen angol, miközben az alapértelmezett tartalom magyar.
- A csökkentett mozgás beállítását csak az előnyszakasz kezeli; több más animáció nem.
- Az Instagram/Facebook linkek csak a szolgáltatók főoldalára mutatnak, a Viber-szám pedig láthatóan helyőrző.
- A lint ellenőrzés valóban hibával áll le; jelenleg 570 jelzést ad, ebből 563 hiba és 7 figyelmeztetés.

### Jogos, de részben mérlegelési kérdés

- A hero `whitespace-nowrap` sora kockázatos, de a jelenlegi méretezés miatt nem bizonyított, hogy minden támogatott mobilon ténylegesen túlcsordul.
- A nagyon kicsi, áttetsző feliratok és a hover-only nyíl olvashatósági/használhatósági kockázatok; pontos kontraszt- és képernyőteszt után érdemes módosítani.
- A Lenis és az overscroll tiltása nem önmagában hiba, de akadálymentességi és natív böngészési kompromisszum.
- A Google Fonts külső betöltése teljesítmény- és adatvédelmi döntés; önállóan nem bizonyít trackinget vagy jogsértést.
- A statikus jogi frissítési dátum helyes, ha valóban a dokumentum utolsó tartalmi felülvizsgálatát jelzi; nem kell automatikusan az aktuális évhez igazítani.
- A jogi oldal tartalomjegyzéke és belső hivatkozásai hasznosak lehetnek, de hiányuk nem szerkezeti vagy akadálymentességi hiba.
- A rövid láblécbeli helyszín és a teljes impresszumcím nem ellentmondás, ha a rövidítés szándékos.
- Az üres képleírásoknál a címre visszaeső `alt` technikailag elfogadható, csak kevésbé részletes.

### Pontatlan vagy túlzó állítás

- A jogi oldalnak van egyetlen főcíme, utána szabályos második szintű fejezetcímek következnek; a címsorhierarchia rendben van.
- A generált útvonalfa követett fájl, de jelenleg nem módosult. A build utáni automatikus újragenerálás önmagában nem hiba; csak akkor gond, ha nem determinisztikus eltérést hagy.
- A 564-es lintszám már nem pontos: a jelenlegi eredmény 570. A lényegi állítás — hogy a lintkapu nem tiszta — viszont igaz.
- A Fast Refresh figyelmeztetések fejlesztői karbantarthatósági jelzések, nem felhasználói vagy éles működési hibák.
- A metadata nyelvváltás közbeni azonnali frissítése nem egyszerűen egy szövegcsere: a jelenlegi kliensoldali nyelvállapot mellett ehhez külön SEO/útvonal-stratégia kell. Javítható, de architekturális döntés.

### Tulajdonosi vagy szakértői adat nélkül nem zárható le helyesen

- A táplálkozási állítások (`40×`, enzimek, teljes aminosavprofil, garantált frissesség) nem pusztán nyelvi hibák. Forrás vagy jóváhagyott, óvatosabb megfogalmazás szükséges; egészségügyi állításokat nem szabad találomra átírni.
- A valódi Instagram-, Facebook- és Viber-célcímeket a márkának kell megadnia. Addig a félrevezető sorok eltávolíthatók vagy letilthatók, de valódi link nem található ki.
- A kapcsolatfelvételi űrlapra utaló jogi részt az e-mailes kapcsolatfelvételhez kell igazítani, majd jogi szempontból is jóváhagyni.

## Javasolt javítási sorrend

1. **Szöveg és jogi konzisztencia**
   - Magyar és szerb nyelvi hibák javítása.
   - Magyar galériacímkék honosítása.
   - A harmadik növekedési fázis átnevezése csírára utaló HU/SRB megnevezésre.
   - A nem létező űrlapra vonatkozó részek átírása e-mailes kapcsolatfelvételre.
   - A táplálkozási állítások óvatosítása vagy forrásolása külön jóváhagyással.

2. **Kritikus használhatóság és akadálymentesség**
   - Mobil/tablet menü hozzáadása meglévő megjelenéshez illesztve.
   - Aktív nyelv, szakasz és mag `aria-pressed`/megfelelő kiválasztott állapotának jelzése.
   - Galériakártyák egységes billentyűzetes működése.
   - A képnagyító szabványos, fókuszt kezelő párbeszédablakká alakítása; biztonságos bezárógomb-elhelyezéssel.
   - Csökkentett mozgás következetes alkalmazása az automatikus és folyamatos animációkra.

3. **Nyelvi és keresési metadata**
   - A dokumentum `lang` értékének szinkronizálása a választott nyelvvel.
   - A főoldal és jogi oldal címének/leírásának nyelvi stratégiája: külön nyelvi URL-ek vagy dokumentált kliensoldali frissítés.

4. **Vizuális és görgetési finomhangolás**
   - Hero tördelés tesztelése 320 px-től, szükség esetén a csak mobilos `nowrap` feloldása.
   - Kis feliratok, jogi sáv és mérőszám-magyarázatok kontraszt- és méretellenőrzése.
   - Touch-kijelzőn állandó külsőlink-jelzés.
   - Lenis és overscroll viselkedés megtartása mellett billentyűzetes, hash-linkes és csökkentett mozgásos teszt.

5. **Kódminőség**
   - Prettier hibák külön, funkcióváltozás nélküli formázási körben.
   - A 7 Fast Refresh figyelmeztetés szétválasztása kis, célzott fájlokra.
   - Build, lint, billentyűzetes és több képernyőméretes végellenőrzés.

## Még szükséges adatok

- Valódi Instagram profil URL.
- Valódi Facebook oldal URL.
- Valódi Viber telefonszám vagy közvetlen Viber-hivatkozás.
- Döntés a harmadik fázis nevéről: javaslat **„Friss csíra” / „Sveža klica”**.
- Források a konkrét táplálkozási állításokhoz, vagy engedély azok óvatosabb, nem számszerű megfogalmazására.

## Technikai megjegyzés

A javításokat célszerű több, ellenőrizhető körben elvégezni. A teljes lista egyetlen változtatáscsomagban túl nagy regressziós kockázatot jelentene, különösen a görgetős animáció, a képnagyító és a nyelvi metadata esetében.
