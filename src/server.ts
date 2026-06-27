import app from "./app.js";
import { pool } from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await pool.query("SELECT NOW()");

        console.log("PostgreSQL Database Connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} successfully`);
        })
    } catch (err) {
        console.error("Failed to connect to PostgreSQL");
        console.error(err);

    }
};

startServer();
