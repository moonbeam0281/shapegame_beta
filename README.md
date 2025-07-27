# 🎮 Shape Game

A Node.js + Express + EJS project using PostgreSQL (Docker) as the database.  

---

## **1. Prerequisites**
Make sure you have:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker & Docker Compose](https://www.docker.com/)
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

---

## **2. Clone the Repository**
```bash
git clone <your-repo-url>
cd shape-game
```

---

## **3. Install Dependencies**
```bash
npm install
```
This installs:
- **express** (server)
- **ejs** (templating engine)
- **pg** (PostgreSQL driver)
- **dotenv** (for .env config)
- **nodemon** (for dev auto-restart)

---

## **4. Set Up Environment Variables**
Create a `.env` file in the project root:
```
DATABASE_URL=postgres://USERNAME:PASS@localhost:5432/shape_game_db
PORT=3000
```
> 🔒 `.env` is **not committed** to Git. If you're collaborating, copy from `.env.example` and fill in real values.

---

## **5. Start PostgreSQL (Docker)**
```bash
docker-compose up -d
```

> **First time?** This creates the container `shape_game_db` and exposes it at `localhost:5432`.

Check if it's running:
```bash
docker ps
```

---

## **6. Create the Database (if not already)**
Connect to the running container:
```bash
docker exec -it shape_game_db psql -U YOURUSERNAME shape_game_db
```
Inside `psql`, create the tables:
```sql
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    state TEXT DEFAULT 'offline',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE lobbies (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    owner_id INT REFERENCES players(id) ON DELETE CASCADE,
    max_players INT NOT NULL,
    allow_spectators BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE lobby_players (
    lobby_id INT REFERENCES lobbies(id) ON DELETE CASCADE,
    player_id INT REFERENCES players(id) ON DELETE CASCADE,
    PRIMARY KEY (lobby_id, player_id)
);
```
Exit `psql`:
```
\q
```

---

## **7. Run the Dev Server**
```bash
npm run dev
```
- Runs with **nodemon** (auto-restarts on save)
- App is available at:  
  👉 http://localhost:3000

---

## **8. Production Run**
```bash
npm start
```
- Runs with plain Node.js (no auto-restart)

---

## **9. Optional: DBeaver / Database GUI**
You can connect to the PostgreSQL database using [DBeaver](https://dbeaver.io/):
- Host: `localhost`
- Port: `5432`
- Database: `shape_game_db`
- Username: `YOURUSERNAME`
- Password: `YOURPASS`

---

## **Project Structure**
```
db/              # DB connection and queries
handlers/        # Business logic (players, lobbies, etc.)
public/          # Static assets (css, js)
routes/          # Express routes
views/           # EJS templates (pages)
server.js        # Entry point
```

---

## **10. Contributing**
1. Fork the repo  
2. Create a new branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit and push your changes  
4. Open a pull request 🚀

---