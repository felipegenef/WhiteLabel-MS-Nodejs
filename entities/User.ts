import { pgTable, uuid, varchar, timestamp, index } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    password: varchar("hashed_password", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (users) => {
    return {
      nameIndex: index("soft_delete_idx").on(users.deletedAt),
    };
  }
);
export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type
