import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./entities",
  out: "./migrations",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: process.env.DB_HOST ?? "",
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ?? "",
  },
} satisfies Config;
