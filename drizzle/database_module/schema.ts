import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  username: text('username').unique(),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});