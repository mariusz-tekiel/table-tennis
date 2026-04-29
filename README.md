# Table Tennis

Game written in JavaScript (ES Modules) and HTML5 Canvas.

## Uruchomienie lokalne

Gra używa ES Modules, dlatego wymaga lokalnego serwera HTTP — nie zadziała po otwarciu pliku bezpośrednio z dysku (`file://`).

### Opcja 1 — Live Server (VS Code)

Zainstaluj rozszerzenie [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), następnie kliknij prawym przyciskiem na `index.html` → **Open with Live Server**.

### Opcja 2 — Node.js (`serve`)

```bash
npx serve .
```

Następnie otwórz w przeglądarce adres wyświetlony w terminalu (domyślnie `http://localhost:3000`).

### Opcja 3 — Python

```bash
# Python 3
python -m http.server 8080
```

Następnie otwórz `http://localhost:8080`.

## Sterowanie

- **Mysz** — ruch rakietki gracza
- **Kliknięcie** — serwis / wznowienie gry po punkcie

## Demo

<http://devmariusz.pl/js-games/TABLE-TENNIS-NEW/tennis_index.html>
