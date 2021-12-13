import pg from 'pg'
import dotenv from 'dotenv'


dotenv.config()

const { Pool } = pg

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DB,
})

async function baseSet() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS usermodel(
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES UserModel (id)
        );

        CREATE TABLE IF NOT EXISTS token(
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES UserModel (id)
        );
    `)
}

await baseSet()


export default pool
