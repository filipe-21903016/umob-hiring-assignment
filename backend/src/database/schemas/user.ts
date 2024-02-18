import { pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("User", {
  username: varchar("Username", { length: 256 }).primaryKey().notNull(),
  password: varchar("Password", { length: 256 }).notNull(),
});
