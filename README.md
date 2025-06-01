# Semestrální práce pro předmět Vývoj klientských aplikací v JavaScriptu - KAJ

Cílem mé práce bude vyvinout **cestovní deník**, kam si uživatel bude moci zaznamenávat své cesty. Ke kterým si bude moct přidávat a ukládat obrázky. Dále by mělo být možné vidět na mapě, kde všude už byl.

---

## TODO (plánované funkce, které nebyly povinné)
- [ ] Přidat možnost editace a mazání cest
- [ ] Implementovat filtrování cest podle data
- [ ] Přidat možnost přidávat komentáře k cestám - backend

---

## Technologie

- **HTML5**
- **CSS3**
- **JavaScript ES6**
- **React** (SPA – Single Page Application)
- **Leaflet.js** (práce s mapou)
- **Firebase** (hosting a backend)

---

## Aplikace

Aplikace je vytvořena jako **SPA** (Single Page Application) s využitím knihovny **React**.   
Pro práci s mapou je využita knihovna **Leaflet.js**.

Aplikace je hostována na **Firebase**.  
Odkaz: [https://travel-diary-a5aa1.web.app/](https://travel-diary-a5aa1.web.app/)

Proxy pro API Nominatim je hostována na **Netlify**, z důvodu CORS problémů s Nominatim API.

---

## Funkce aplikace

- Welcome, Register, Login - Uživatel se může registrovat a přihlašovat pomocí Firebase Authentication.
  (Animace globusu)

- AddTravel - Uživatel může přidávat nové cesty, které obsahují název, popis, obrázek a lokaci.
  (Drag & Drop API pro přidání obrázku, Nominatim API pro získání lokace - asynchronní)

- TravelDiary - Uživatel může prohlížet své cesty, které jsou uloženy v databázi Firebase Firestore.
  (Otáčení obrázků pomocí CSS, Offline cache pomocí VitePWA pro přístup k cestám i bez připojení k internetu)

- Show Map - Uživatel může vidět své cesty na mapě pomocí knihovny Leaflet.js.
  (Leaflet API pro zobrazení mapy, OpenStreetMap jako zdroj mapových dat)

- Logout - Uživatel se může odhlásit z aplikace.

- Recommended Places - Uživatel si může prohlížet doporučená místa, u kterých jsou videa.
  (Videa jsou uložena na Cloudinary, které je poskytuje jako .mp4 soubory, custom controls pro přehrávání videí, SVG eventy, video lze přehrát kliknutím na tlačítko nebo na video samotné)


---

## Průchod aplikací:
1. Po spuštění aplikace se zobrazí úvodní obrazovka. - uživatel se může registrovat či přihlásit (údaje jsou uloženy do Firebase Authentication).
2. Po přihlášení se uživateli zobrazí jeho cesty, které si může prohlížet. Každá cesta obsahuje název, datum, popis a obrázek. Při kliknutí na cestu se zobrazí detail cesty.
3. Uživatel může přidat novou cestu kliknutím na tlačítko "Add Travel". Otevře se formulář, kde může zadat název, popis, přidat obrázek a lokaci. Po odeslání se cesta uloží do Firebase Firestore.
4. Uživatel může vidět své cesty na mapě kliknutím na tlačítko "Show Map". Otevře se mapa, kde jsou zobrazeny všechny cesty uživatele.
5. Uživatel může prohlížet doporučená místa kliknutím na tlačítko "Recommended Places". Otevře se seznam míst s videi, která si může přehrát.
6. Uživatel se může odehlásit kliknutím na tlačítko "Odhlásit se".

---

> Pokud chcete aplikaci spustit lokálně, stáhněte si repozitář, nainstalujte závislosti `npm install` a spusťte aplikaci pomocí `npm run dev`.

