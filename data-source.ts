import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  // host: "./data.db",
  // port: Number(process.env.DB_PORT),
  // username: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  database: "./db.sqlite",
  synchronize: false,
  logging: false,
  entities: [__dirname + "/entities/*.{js,ts}"],
  migrations: [__dirname + "/migrations/*.{js,ts}"],
});
