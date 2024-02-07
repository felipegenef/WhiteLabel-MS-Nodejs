import "dotenv/config";
import { createCache } from "../data/db";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function runMigration() {
  const db = await createCache();
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: "./migrations" });
}
runMigration().then(() => console.log("Finished"));
