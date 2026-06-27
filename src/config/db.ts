import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); //Reads the .env file and loads the values into process.env (an object)

const { Pool } = pg;

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
});


