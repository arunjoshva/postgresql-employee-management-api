import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); //Reads the .env file and loads the values into process.env (an object)

const { Pool } = pg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on("connect", () => {
  console.log("PostgreSQL Database Connected");
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error:", err);
});


