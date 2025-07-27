import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pool from './db/pool.js';

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Logger for routes and methods
app.use((req, res, next) => {
    console.log(`Method ${req.method} has been used.\nROUTE:\n"${req.url}"`);
    next();
});

app.use('/', (req, res) => {
    res.render('login');
});
//Database check function: No Longer needed:
/* 
async function checkDb(){
try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected at:', result.rows[0].now);
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
}
checkDb();
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port http://localhost:${PORT}`));