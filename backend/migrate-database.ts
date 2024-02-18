import { migrate } from "drizzle-orm/postgres-js/migrator";
import { dbContext } from "./src/database";

async function applyMigrations(db: any) {
  try {
    await migrate(db, {
      migrationsFolder: "./migrations",
    });
  } catch (e) {
  }
}

applyMigrations(dbContext);
