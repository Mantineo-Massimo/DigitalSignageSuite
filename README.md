# info-kiosk-display

![Python](https://img.shields.io/badge/python-3.11-blue)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![UI](https://img.shields.io/badge/interface-responsive-lightgrey)
![Docker](https://img.shields.io/badge/container-Docker--ready-blue)

# Info_Kiosk_Display

**EN:** A unified Docker‐ready system combining a Telegram feed bot and a real-time classroom/floor schedule display.  
**IT:** Sistema integrato e pronto per Docker che unisce un bot Telegram per feed e la visualizzazione in tempo reale degli orari di lezione per aula e piano.

---

## 🧩 Description / Descrizione

**EN:**  
Info_Kiosk_Display brings together two components:

1. **Telegram Feed Bot** (`telegram-kiosk-display`):  
   - Monitors a single Telegram chat (specified via URL parameter)  
   - Caches new messages into a JSON feed (`/feed.json?chat=<ID>`)  
   - Serves a minimal Flask+Telethon API to expose `feed.json` and static UI  

2. **Lesson Kiosk Display** (`lession-kiosk-display`):  
   - Flask/Gunicorn API exposing `/lessons` (classroom) and `/floor/<floor>` (floor overview)  
   - Responsive, bilingual (IT/EN) HTML/CSS/JS frontends for single‐classroom and full‐floor views  
   - Auto-rotating messages / auto-scroll tables  

**IT:**  
Info_Kiosk_Display mette insieme due componenti:

1. **Bot Telegram per Feed** (`telegram-kiosk-display`):  
   - Monitora una singola chat Telegram (specificata via parametro URL)  
   - Salva i nuovi messaggi in un feed JSON (`/feed.json?chat=<ID>`)  
   - Espone un’API minimale Flask+Telethon per `feed.json` e UI statica  

2. **Display Orari Lezioni** (`lession-kiosk-display`):  
   - API Flask/Gunicorn con endpoint `/lessons` (vista aula) e `/floor/<floor>` (vista piano)  
   - Frontend responsive e bilingue (IT/EN) in HTML/CSS/JS per aula singola e piano intero  
   - Rotazione automatica dei messaggi / scrolling automatico delle tabelle  

---

## 🏗️ Project Structure / Struttura del progetto

```
Info_Kiosk_Display/
├── telegram-kiosk-display/         # Bot Telegram + Feed API
│   ├── app/
│   │   ├── __init__.py              # Init Flask + Blueprint
│   │   ├── api/
│   │   │   └── routes.py            # /feed.json, /assets, ecc.
│   │   ├── services/
│   │   │   ├── author_utils.py      # Estrae autore del messaggio
│   │   │   ├── fetch.py             # Recupera messaggi Telegram
│   │   │   └── json_utils.py        # Scrive/appende JSON feed
│   │   ├── tools/
│   │   │   ├── get_chat_id.py       # Trova ID chat via username
│   │   │   └── get_session_string.py# Genera SESSION_STRING
│   │   ├── client.py                # Inizializza TelegramClient
│   │   ├── config.py                # Carica .env (API_ID, …)
│   │   └── listener.py              # Listener Telethon → salva feed
│   ├── data/                        # JSON feed persistente
│   ├── web/
│   │   ├── index.html               # Frontend statico (monitor)
│   │   ├── assets/
│   │   │   ├── favicon.ico
│   │   │   └── monitor_background.png
│   │   └── static/
│   │       ├── css/
│   │       │   └── style.css
│   │       └── js/
│   │           └── script.js
│   ├── .env                         # API_ID, API_HASH, SESSION_STRING, …
│   ├── .gitignore
│   ├── run.py                       # Avvio Flask + Telethon
│   ├── entrypoint.sh                # Script d’ingresso Docker
│   ├── requirements.txt
│   └── Dockerfile
│
├── lession-kiosk-display/          # API Lezioni + Frontend aule/piani
│   ├── app/
│   │   ├── __init__.py              # Init Flask + Blueprint
│   │   ├── config.py                # Carica .env (API, SESSION, DATA_DIR,…)
│   │   ├── constants.py             # Mappa ID aule/piani
│   │   ├── models.py                # Schemi Pydantic, cache
│   │   ├── routes.py                # /lessons POST, /floor/<n> GET
│   │   └── services.py              # Fetch e split delle lezioni
│   ├── web/
│   │   ├── assets/
│   │   │   ├── favicon.ico
│   │   │   └── monitor_background.png
│   │   ├── static/
│   │   │   ├── css/
│   │   │   │   ├── classroom_style.css
│   │   │   │   └── floor_style.css
│   │   │   └── js/
│   │   │       ├── classroom_script.js
│   │   │       └── floor_script.js
│   │   ├── classroom/
│   │   │   └── index.html           # Vista singola aula
│   │   └── floor/
│   │       ├── floor0.html          # Vista piano 0
│   │       ├── floor1.html          # Vista piano 1
│   │       └── floorM1.html         # Vista piano -1
│   ├── requirements.txt
│   └── Dockerfile
│
├── docker-compose.yml               # Orchestrazione bot + lezioni
└── .gitignore                       # Root: esclude .env, /data, ecc.                     
```

---

## 🚀 Quick Start / Avvio rapido

> **Prerequisite:** Docker & Docker Compose installati

```bash
# 1. Clona il repository
git clone https://github.com/TUO_ACCOUNT/Info_Kiosk_Display.git
cd Info_Kiosk_Display

# 2. Avvia entrambi i servizi con Docker Compose
docker compose up --build

# 3. Accedi:
#    • Bot Telegram + Feed UI  → http://localhost:8080
#    • Lesson Display          → http://localhost:5000/classroom/index.html?classroom=<ID>&building=<ID>&date=YYYY-MM-DD&period=all
#    • Floor Display           → http://localhost:5000/floor/floor1.html?date=YYYY-MM-DD
```

---

## 📦 Services & API Endpoints

| Service                   | Endpoint                          | Method | Description (EN/IT)                                    |
|---------------------------|-----------------------------------|--------|--------------------------------------------------------|
| **Telegram Feed Bot**     | `/feed.json?chat=<chat_id>`       | GET    | Returns latest messages JSON / Restituisce i messaggi |
|                           | `/`                               | GET    | Serves `web/index.html`                                |
|                           | `/assets/<filename>`              | GET    | Static assets (images/icons)                           |
| **Lesson Kiosk Display**  | `/lessons`                        | POST   | Classroom schedule (JSON) / Orario per aula           |
|                           | `/floor/<floor>?date=<YYYY-MM-DD>`| GET    | Floor schedule (JSON) / Orario per piano               |
|                           | `/assets/<filename>`              | GET    | Static assets                                          |

---

## 🌍 Configuration / Configurazione

Each service reads environment variables from its own `.env`.  
Common keys:

```dotenv
API_ID=...
API_HASH=...
SESSION_STRING=...
DATA_DIR=/app/data
PROFANITY=OFF|ON
```

---

## 🔗 Usage Examples / Esempi URL

- **Telegram Feed UI:**  
  `http://localhost:8080/?chat=<TELEGRAM_CHAT_ID>`
- **Classroom View:**  
  `http://localhost:5000/web/classroom/index.html?classroom=6144b4a006477900174b0ce3&building=5f6cb2c183c80e0018f4d46&date=2025-03-19&period=all`
- **Floor View:**  
  `http://localhost:5000/web/floor/floor1.html?date=2025-03-19`

---

## 📚 Technologies / Tecnologie

- **Backend:** Python 3.11, Flask, Gunicorn, Telethon, Pydantic, python-dotenv  
- **Frontend:** HTML5, CSS3, Vanilla JavaScript  
- **Deployment:** Docker, Docker Compose  

---

## 👥 Authors / Autori

- **Massimo Mantineo** – Università di Messina  

---

## 📄 License / Licenza

> This project is released under the [MIT License](LICENSE).  
> Questo progetto è distribuito sotto licenza [Licenza MIT](LICENSE).