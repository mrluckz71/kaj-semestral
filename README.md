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
- **Redux** (správa stavu aplikace)
- **Leaflet.js** (práce s mapou)
- **Firebase** (hosting a backend)

---

## Aplikace

Aplikace je vytvořena jako **SPA** (Single Page Application) s využitím knihovny **React**.  
Pro správu stavu aplikace je použit **Redux**.  
Pro práci s mapou je využita knihovna **Leaflet.js**.

Aplikace je hostována na **Firebase**.  
Odkaz: [https://travel-diary-a5aa1.web.app/](https://travel-diary-a5aa1.web.app/)

---

## Funkce aplikace
- Welcome, Register, Login - Uživatel se může registrovat a přihlašovat pomocí Firebase Authentication.
- AddTravel - Uživatel může přidávat nové cesty, které obsahují název, popis, obrázek a lokaci.
- TravelList - Uživatel může prohlížet své cesty, které jsou uloženy v databázi Firebase Firestore.
- Show Map - Uživatel může vidět své cesty na mapě pomocí knihovny Leaflet.js.
- Logout - Uživatel se může odhlásit z aplikace.
- Recommended Places - Uživatel si může prohlížet doporučená místa, u kterých jsou videa - custom controls pro přehrávání videí.

---

## Průchod aplikací:
1. Po spuštění aplikace se zobrazí úvodní obrazovka. - uživatel se může registrovat či přihlásit (údaje jsou uloženy do Firebase Authentication).
2. Po přihlášení se uživateli zobrazí jeho cesty, které si může prohlížet. Každá cesta obsahuje název, datum, popis a obrázek. Při kliknutí na cestu se zobrazí detail cesty.
3. Uživatel může přidat novou cestu kliknutím na tlačítko "Přidat cestu". Otevře se formulář, kde může zadat název, popis, přidat obrázek a lokaci. Po odeslání se cesta uloží do Firebase Firestore.
4. Uživatel se může odehlásit kliknutím na tlačítko "Odhlásit se".

---

> Pokud chcete aplikaci spustit lokálně, stáhněte si repozitář, nainstalujte závislosti `npm install` a spusťte aplikaci pomocí `npm run dev`.

