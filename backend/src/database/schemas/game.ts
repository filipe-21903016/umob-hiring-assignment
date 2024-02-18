import { numeric, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";

export const games = pgTable("Game", {
  score: numeric("Score").notNull(),
  username: varchar("Username", { length: 256 })
    .references(() => users.username)
    .notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
});
