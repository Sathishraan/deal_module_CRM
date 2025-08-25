// utils/runSeed.js
import fs from "fs";
import pool from "../config/db.js";
async function runSeed() {
    try {
        const seedSQL = fs.readFileSync("./utils/seed.sql", "utf-8");
        const statements = seedSQL.split(";").filter(stmt => stmt.trim()); // split multiple statements
        for (const stmt of statements) {
            await pool.query(stmt);
        }
        console.log("✅ Seed executed successfully");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error running seed:", err);
        process.exit(1);
    }
}

runSeed();
