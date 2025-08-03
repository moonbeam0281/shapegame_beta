import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { checkDb, initDb } from './db/dbHandler.js';

dotenv.config();
const app = express();
global.__dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
await checkDb();
await initDb();

//Logger for routes and methods
app.use((req, res, next) => {
    console.log(`Method ${req.method} has been used.\nROUTE:\n"${req.url}"`);
    next();
});

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // TODO: validate user against database (or json for now)
  // For now, just redirect to main menu
  res.redirect('/mainmenu');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port http://localhost:${PORT}`));