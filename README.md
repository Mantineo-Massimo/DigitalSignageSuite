
# Digital Signage Suite

Una suite di microservizi basata su Docker per creare un sistema di digital signage universitario completo, modulare e dinamico, interamente controllabile tramite URL e API.

---

## Indice

- Filosofia del Progetto
- Panoramica dei Servizi
- Struttura Completa del Progetto
- Guida Introduttiva (Getting Started)
- Utilizzo e Configurazione degli URL
- Stack Tecnologico
- Autori

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

| Servizio                 | Porta | Descrizione                                             |
|--------------------------|-------|---------------------------------------------------------|
| Telegram Feed Service    | 8080  | Si collega a Telegram, cattura messaggi e li serve via JSON. |
| Schedule Display Service | 8081  | Mostra gli orari delle lezioni collegandosi a fonti esterne. |
| Floor Plan Display       | 8082  | Mostra planimetrie statiche.                            |
| Wayfinding Service       | 8083  | Mostra frecce, indicazioni e info ascensori.            |

Ogni servizio ha un proprio `README.md` dedicato per approfondimenti.

---

## Struttura Completa del Progetto

```

DigitalSignageSuite/
├── 📂 docs/
│   └── 📄 suite-showcase.png
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
│   │   ├── 📄 config.py
│   │   ├── 📄 constants.py
│   │   ├── 📄 init.py
│   │   ├── 📄 models.py
│   │   ├── 📄 routes.py
│   │   └── 📄 services.py
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
│   │   └── 📄 (.gitkeep)
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
└── 📂 wayfinding-service/
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

### Telegram Feed (Porta 8080)

```
http://localhost:8080/?chat=<ID_CHAT>&classroom=<NOME_AULA>
```

### Schedule Display (Porta 8081)

- Aula: 
``` 
http://localhost:8081/views/classroom_view.html?classroom=<ID_AULA>&building=<ID_EDIFICIO>
```
- Piano:
``` 
http://localhost:8081/views/floor_view.html?floor=<N_PIANO>&building=<NOME_EDIFICIO>
```

### Floor Plan Display (Porta 8082)

```
http://localhost:8082/<EDIFICIO>/floor<PIANO>/<IMMAGINE>
```

### Wayfinding (Porta 8083)

- Frecce:
``` 
arrow_view.html?left=<TESTO>&leftDirection=<DIREZIONE>
```
- Ascensore:
``` 
elevator_view.html?floor=<PIANO>&content=<CONTENUTO>
```

---

## Stack Tecnologico

- **Backend:** Python 3.11, Flask, Gunicorn, Telethon, Pydantic
- **Frontend:** HTML5, CSS3, Vanilla JS
- **Animazioni:** Lottie
- **Orchestrazione:** Docker, Docker Compose

---

## Autori

Massimo Mantineo – Università degli Studi di Messina
