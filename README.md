
# Digital Signage Suite

Una suite di microservizi basata su Docker per creare un sistema di digital signage universitario completo, modulare e dinamico, interamente controllabile tramite URL e API.

---

## Indice

1.  [Filosofia del Progetto](#-filosofia-del-progetto-un-approccio-a-microservizi)
2.  [Panoramica dei Servizi](#-panoramica-dei-servizi)
3.  [Struttura Completa del Progetto](#-struttura-completa-del-progetto)
4.  [Guida Introduttiva (Getting Started)](#-guida-introduttiva-getting-started)
5.  [Utilizzo e Configurazione degli URL](#-utilizzo-e-configurazione-degli-url)
6.  [Tecnologie Utilizzate](#-tecnologie-utilizzate)
7.  [Autori](#️-autori)

---

## Filosofia del Progetto: Un Approccio a Microservizi

Questo progetto è stato volutamente progettato utilizzando un'architettura a microservizi. Invece di un'unica, monolitica applicazione, la suite è suddivisa in servizi più piccoli e indipendenti, ognuno con una singola responsabilità.

### Vantaggi

- **Modularità e Manutenibilità:** È facile aggiornare o correggere un servizio (es. `telegram-feed-service`) senza influenzare gli altri.
- **Resilienza:** Un errore in un servizio non compromette l'intera suite.
- **Scalabilità Indipendente:** Ogni servizio può essere scalato in modo indipendente.
- **Flessibilità Tecnologica:** Ogni servizio può usare la tecnologia più adatta al suo scopo.

---

## Panoramica dei Servizi


| Servizio                      | Prefisso URL      | Descrizione                                                              | Dettagli                                               |
| :---------------------------- | :---------------- | :------------------------------------------------------------------------ | :----------------------------------------------------------- |
| **Telegram Feed Service** | `/telegram/`      | Cattura messaggi da una chat Telegram e li mostra come feed.              | [Leggi il README](./telegram-service/README.md)         |
| **Schedule Display Service** | `/schedule/`      | Mostra gli orari delle lezioni per aula e per piano.                      | [Leggi il README](./schedule-service/README.md)      |
| **Floor Plan Display Service**| `/floorplan/`     | Visualizza planimetrie di edifici e piani.                                | [Leggi il README](./floorplan-service/README.md)     |
| **Wayfinding Service** | `/wayfinding/`    | Mostra indicazioni direzionali (frecce) e info per ascensori.             | [Leggi il README](./wayfinding-service/README.md)            |


---

## Struttura Completa del Progetto

```

DigitalSignageSuite/
├── 📂 docs/
│   |── 📄 floorplan-showcase.png
│   |── 📄 schedule-classroom-showcase.png
│   |── 📄 schedule-floor-showcase.png
│   |── 📄 telegram-showcase.png
│   |── 📄 wayfinding-arrow-showcase.png
│   └── 📄 wayfinding-elevator-showcase.png
├── 📂 floorplan-service/
│   ├── 📂 ui/
│   │   ├── 📂 assets/
│   │   │   └── 📂 building_a/
│   │   │       └── 📂 floor1/
│   │   │           └── 📄 blockA.jpg
│   │   ├── 📂 static/
│   │   │   ├── 📂 css/
│   │   │   │   └── 📄 style.css
│   │   │   └── 📂 js/
│   │   │       └── 📄 script.js
│   │   ├── 📄 favicon.ico
│   │   └── 📄 index.html
│   ├── 📄 Dockerfile
│   ├── 📄 README.md
│   ├── 📄 requirements.txt
│   └── 📄 run.py
├── 📂 schedule-service/
│   ├── 📂 app/
│   │   ├── 📂 api/
│   │   │   └── 📄 routes.py
│   │   ├── 📂 services/
│   │   │   ├── 📄 constants.py
│   │   │   ├── 📄 models.py
│   │   │   └── 📄 services.py
│   │   ├── 📄 config.py
│   │   └── 📄 __init__.py
│   ├── 📂 ui/
│   │   ├── 📂 assets/
│   │   │   └── 📄 monitor_background.png
│   │   ├── 📂 static/
│   │   │   ├── 📂 css/
│   │   │   │   ├── 📄 classroom_style.css
│   │   │   │   └── 📄 floor_style.css
│   │   │   └── 📂 js/
│   │   │       ├── 📄 classroom_script.js
│   │   │       └── 📄 floor_script.js
│   │   ├── 📄 classroom_view.html
│   │   └── 📄 floor_view.html
│   ├── 📄 .env.example
│   ├── 📄 Dockerfile
│   ├── 📄 README.md
│   ├── 📄 requirements.txt
│   └── 📄 run.py
├── 📂 telegram-service/
│   ├── 📂 app/
│   │   ├── 📂 api/
│   │   │   └── 📄 routes.py
│   │   ├── 📂 services/
│   │   │   ├── 📄 author_resolver.py
│   │   │   └── 📄 feed_handler.py
│   │   ├── 📄 config.py
│   │   ├── 📄 init.py
│   │   ├── 📄 telegram_client.py
│   │   └── 📄 telegram_listener.py
│   ├── 📂 data/
│   │   └── 📄 feed-CHATID.json
│   ├── 📂 tools/
│   │   ├── 📄 get_chat_id.py
│   │   └── 📄 get_session_string.py
│   ├── 📂 ui/
│   │   ├── 📂 assets/
│   │   │   └── 📄 monitor_background.png
│   │   ├── 📂 static/
│   │   │   ├── 📂 css/
│   │   │   │   └── 📄 style.css
│   │   │   └── 📂 js/
│   │   │       └── 📄 script.js
│   │   └── 📄 index.html
│   ├── 📄 .env.example
│   ├── 📄 Dockerfile
│   ├── 📄 README.md
│   └── 📄 requirements.txt
├── 📂 wayfinding-service/
    ├── 📂 ui/
    │   ├── 📂 assets/
    │   │   ├── 📄 arrow.json
    │   │   └── 📄 logo.png
    │   ├── 📂 static/
    │   │   ├── 📂 css/
    │   │   │   ├── 📄 arrow_style.css
    │   │   │   └── 📄 elevator_style.css
    │   │   └── 📂 js/
    │   │       ├── 📄 arrow_script.js
    │   │       └── 📄 elevator_script.js
    │   ├── 📄 arrow_view.html
    │   └── 📄 elevator_view.html
    ├── 📄 Dockerfile
    ├── 📄 README.md
    └── 📄 requirements.txt
```

---

## Guida Introduttiva (Getting Started)

### Prerequisiti

- Git
- Docker
- Docker Compose

### 1. Clona il Repository

```bash
git clone https://github.com/Mantineo-Massimo/DigitalSignageSuite
cd DigitalSignageSuite
```

### 2. Configura il Servizio Telegram

- Vai su `my.telegram.org`, genera `api_id` e `api_hash`
- Crea `.env` da `.env.example` e compila i dati
- Genera la `SESSION_STRING`:

```bash
docker compose run --rm telegram_feed python tools/get_session_string.py
```

### 3. Avvia la Suite

```bash
docker compose up --build -d
```

---

## Utilizzo e Configurazione degli URL

### Telegram Feed

```
http://localhost/telegram/?chat=<ID_CHAT>&classroom=<NOME_AULA>
```

### Schedule Display

- Aula: 
``` 
http://localhost/schedule/classroom_view.html?classroom=<ID_AULA>&building=<ID_EDIFICIO>
```
- Piano:
``` 
http://localhost/schedule/floor_view.html?floor=<N_PIANO>&building=<CHIAVE_EDIFICIO>
```

### Floor Plan Display

```
http://localhost/floorplan/<EDIFICIO>/<PIANO>/<IMMAGINE>
```

### Wayfinding

- Frecce:
``` 
http://localhost/wayfinding/arrow_view.html?left=<TESTO>&leftDirection=<DIREZIONE>
```
- Ascensore:
``` 
http://localhost/wayfinding/elevator_view.html?floor=<PIANO>&content=<CONTENUTO>
```

---

## Tecnologie Utilizzate

- **Backend:** Python 3.11, Flask, Gunicorn, Telethon, Pydantic
- **Frontend:** HTML5, CSS3, Vanilla JS
- **Animazioni:** Lottie
- **Orchestrazione:** Docker, Docker Compose

---

## Autori

Massimo Mantineo – Università degli Studi di Messina
