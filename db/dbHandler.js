import pool from './pool.js';
import path from 'path';
import fs from 'fs';

export async function checkDb() {
    try {
        let result = await pool.query('SELECT NOW()');
        console.log('✅ Database connected at:', result.rows[0].now);
        result = await pool.query('SELECT current_database(), current_user;');
        console.log('Connected to DB:', result.rows[0]);
    } catch (err) {
        console.error('❌ Database connection error:', err);
    }
}

export async function initDb() {
    try {
        const migrationsDir = path.join(global.__dirname, 'db/migrations');
        const files = fs.readdirSync(migrationsDir);

        for (const file of files) {
            if (file.endsWith('.sql')) {
                const filePath = path.join(migrationsDir, file);
                const sql = fs.readFileSync(filePath, 'utf8');

                console.log(`Running migration: ${file}`);
                await pool.query(sql);
                console.log(`✅ Migration ${file} executed`);
            }
        }

        console.log('✅ All migrations completed!');
    } catch (err) {
        console.error('❌ Migration error:', err);
    }
}


export async function addPlayer(username, passwordHash) {
    const result = await pool.query(
        'INSERT INTO players (username, password_hash) VALUES ($1, $2) RETURNING *',
        [username, passwordHash]
    );
    return result.rows[0];
}

export async function getPlayerByUsername(username) {
    const result = await pool.query(
        'SELECT * FROM players WHERE username = $1',
        [username]
    );
    return result.rows[0];
}
