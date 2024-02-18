import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";

dotenv.config();

function connectToDatabase() {
  try {
    const pool = new Pool({
      connectionString: process.env.CONNECTION_STRING!,
      ssl: true,
    });
    return pool;
  } catch (e) {
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  if (pool) {
    await pool.end();
  }
}

export const pool = connectToDatabase();
export const dbContext = drizzle(pool);
