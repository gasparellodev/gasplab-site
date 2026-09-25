import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const diagnostics = pgTable("diagnostics", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  contact: text("contact").notNull(),
  segment: text("segment").notNull(),
  interest: text("interest").notNull(),
  challenge: text("challenge").notNull(),
  url: text("url"),
  consent: boolean("consent").notNull(),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
