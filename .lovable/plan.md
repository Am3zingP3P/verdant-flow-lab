# Mobil görgetési szakasz javítása

## Mi okozza a problémát

A mobilos szakasz jelenleg egyszerre használ rögzített görgetést, dinamikus képernyőmagasságot, Lenis-simítást és minden képkockán React-frissítést. Ez három látható hibát tud okozni: az alsó jelző túl magasnak vagy túllógónak tűnik, a fejezetek mozgása szaggathat, a rögzített részből való kilépés pedig hirtelen lehet.

## Hat konkrét megoldási lehetőség

### 1. A jelenlegi rögzítés teljesítményének javítása
- A kör és a folyamatjelző mozgását közvetlenül frissíteni, nem az egész részt újrarajzolni minden görgetési képkockán.
- Fejezetváltáskor csak akkor frissülne a szöveg, amikor ténylegesen új fejezet következik.
- Előny: kis kockázat, érezhetően simább.
- Hátrány: a mobilböngészők változó alsó/felső sávja miatti kilépési hibát önmagában nem oldja meg teljesen.

### 2. Mobilon CSS `sticky` szakaszra váltás
- A jelenlegi mesterséges rögzítés helyett a teljes mobilos görgetési pálya kapna fix hosszúságot, a látható tartalom pedig természetesen tapadna a képernyőhöz.
- A fejezetek továbbra is a görgetéshez kötve váltanának.
- Előny: nincs pin-spacer ugrás; a be- és kilépés természetesebb; a böngészősáv változása kevésbé zavarja meg.
- Hátrány: közepes átalakítás, alapos mobilteszt kell.

### 3. Valós látható mobilmagasság rögzítése
- Belépéskor a böngésző ténylegesen látható magasságát mérnénk, és ezt használnánk a szakasz végéig.
- Előny: a Chrome/Brave címsáv mozgása nem változtatná menet közben a szakasz méretét.
- Hátrány: forgatásnál és osztott képernyőn külön újramérés kell; önmagában nem csökkenti az újrarajzolásokat.

### 4. Mobilos görgetés-normalizálás
- A görgető motor egységesítené a böngészősáv és az érintés okozta eltéréseket.
- Előny: erősen kontrollált, kiszámítható rögzített élmény.
- Hátrány: kevésbé natív érzetet adhat, és Xiaomi/Brave alatt túl „gumis” lehet; ezért csak tartalék irány.

### 5. Külön belépési és kilépési átmenet
- Az első és utolsó fejezet kapna rövid, görgetéshez kötött nyugalmi szakaszt.
- A kilépés utolsó 8–12%-ában a tartalom finoman elmozdulna és halványodna, miközben a következő rész már megjelenik.
- Előny: megszünteti a hirtelen „elengedést”, prémiumabb átmenet.
- Hátrány: a helytelen alapméretezést nem javítja, ezért más megoldással együtt jó.

### 6. Mobilos vizuális terhelés csökkentése
- Görgetés közben kikapcsolnánk a drága blur-átmenetet, a kettős scroll-triggerelt parallaxist és a kör késleltetett CSS-átmenetét.
- Előny: gyengébb telefonokon is simább, a megjelenés lényegében változatlan marad.
- Hátrány: önmagában nem oldja meg az alsó határ helyzetét.

## Javasolt megvalósítás

A legbiztosabb kombináció: **2 + 1 + 5 + 6**.

- Csak 767 px alatt CSS `sticky` mobilpálya váltja fel a jelenlegi rögzítést.
- A kör és az alsó folyamatjelző közvetlenül, újrarajzolás nélkül követi a görgetést.
- A fejezetszöveg csak valódi fejezetváltáskor frissül.
- Az alsó fejezetjelző mobilon 8–10 px-lel lejjebb kerül, a telefon biztonságos alsó területét megtartva.
- Az utolsó fejezet után rövid, finom kilépési átmenet vezet az „Interaktív” részbe.
- Mobilon megszűnik a párhuzamos parallax-trigger és a görgetéssel versengő késleltetett kör-animáció.
- Tablet és asztali nézet változatlan marad.

## Ellenőrzés

- 320×568, 392×716 és 430×932 mobilméreteken.
- Rövid és hosszú böngészősávval, gyors és lassú ujjgörgetéssel.
- Világos és sötét módban, magyar és szerb szöveggel.
- Ellenőrzés: az alsó jelző nem lóg ki, nincs ugrás a belépéskor/kilépéskor, minden fejezet elérhető, az utána következő rész természetesen jelenik meg.
