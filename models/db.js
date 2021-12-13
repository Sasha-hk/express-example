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
            email VARCHAR(255),
            password VARCHAR(1000)
        );

        CREATE TABLE IF NOT EXISTS token(
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            refresh_token VARCHAR(1000),
            FOREIGN KEY (user_id) REFERENCES usermodel (id)
        );
    `)
}

await baseSet()


export default pool
