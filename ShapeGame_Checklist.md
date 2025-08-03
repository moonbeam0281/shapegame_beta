# **ShapeGame To-Do Checklist**

## **1. EJS Files & Layout**
- [ ] **Generate EJS files**  
  - [ ] Build `layout.ejs` (main layout)  
  - [ ] Add partials:  
    - [ ] `header.ejs`  
    - [ ] `footer.ejs`  
    - [ ] `lobbyCard.ejs`  
    - [ ] `playerCard.ejs`  
  - [ ] Refactor existing views (`login.ejs`, `register.ejs`, `mainmenu.ejs`, etc.) to use the layout & partials  

### **Folder Structure**
```
views/
├── layout.ejs
├── partials/
│   ├── header.ejs
│   ├── footer.ejs
│   ├── lobbyCard.ejs
│   └── playerCard.ejs
├── login.ejs
├── register.ejs
├── mainmenu.ejs
└── lobby.ejs
```

---

## **2. Database Structure**
- [ ] Design **PostgreSQL schema**  
  - [ ] `Players` table (id, username, password_hash, state, created_at)  
  - [ ] `Lobbies` table (id, name, owner_id, max_players, spectators_allowed, created_at)  
  - [ ] `Lobby_Players` table (id, lobby_id, player_id, role)  
- [ ] Create **migration scripts** in `db/migrations`  
- [ ] Test schema with sample data  

### **Folder Structure**
```
db/
├── migrations/
│   ├── create_players_table.sql
│   ├── create_lobbies_table.sql
│   └── create_lobby_players_table.sql
└── pool.js
```

---

## **3. Handlers**
- [ ] **Game Engine Handler**  
  - [ ] Set up core logic  
  - [ ] Implement rendering using **THREE.js**  
    - Suggestion: Consider **Babylon.js** or **PlayCanvas** as alternative 3D engines (better built-in scene management)  
- [ ] **Map Handlers**  
  - [ ] Define map classes  
  - [ ] Manage map generation/loading  
- [ ] **Player Handlers**  
  - [ ] Manage player state (online, offline, in-lobby, in-game)  
  - [ ] Handle login/logout logic  
- [ ] **Lobby Handlers**  
  - [ ] Create/update/delete lobbies  
  - [ ] Manage players inside lobbies  

### **Folder Structure**
```
handlers/
├── GameEngineHandler.js
├── MapHandler.js
├── PlayerHandler.js
└── LobbyHandler.js
```

---

## **4. Memory & Database Handling**
- [ ] **JSON-based cache**  
  - [ ] Keep `players.json` & `lobbies.json` in memory for active sessions  
  - [ ] Update JSON cache on player/lobby changes  
- [ ] **Database persistence**  
  - [ ] Save **players** in the database (on registration/login)  
  - [ ] Sync active players (online) with JSON cache  
  - [ ] Optionally save lobbies to DB for long-term persistence  

### **Folder Structure**
```
data/
├── players.json
└── lobbies.json
```

---

## **5. System Additions**
- [ ] **Page reload handling**  
  - [ ] Preserve session state on refresh (routes + cache)  
  - [ ] Redirect to appropriate page if not authenticated  
- [ ] **Security improvements**  
  - [ ] Sanitize user input (prevent SQL injection & XSS)  
  - [ ] Use `bcrypt` for password hashing  
  - [ ] Implement CSRF tokens for login/register  
  - [ ] Lock down database with proper user privileges  

---

## **6. Testing**
- [ ] Create mock players/lobbies for testing  
- [ ] Ensure all routes handle invalid sessions gracefully  
- [ ] Verify 3D engine integration  
