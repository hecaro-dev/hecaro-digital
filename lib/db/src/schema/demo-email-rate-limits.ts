import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const demoEmailRateLimitsTable = pgTable("demo_email_rate_limits", {
  key: text("key").primaryKey(),
  attempts: integer("attempts").notNull(),
  windowStartedAt: timestamp("window_started_at", { withTimezone: true }).notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});