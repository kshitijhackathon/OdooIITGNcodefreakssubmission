import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("employee"),
  currency: text("currency").notNull().default("USD"),
});

export const expenses = pgTable("expenses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  category: text("category").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  status: text("status").notNull().default("draft"),
  receiptUrl: text("receipt_url"),
  approverId: varchar("approver_id"),
  approverComment: text("approver_comment"),
  approvedAt: timestamp("approved_at"),
});

export const approvalRules = pgTable("approval_rules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(),
  threshold: decimal("threshold", { precision: 10, scale: 2 }),
  percentage: integer("percentage"),
  approverId: varchar("approver_id"),
  category: text("category"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertExpenseSchema = createInsertSchema(expenses).omit({
  id: true,
  approverId: true,
  approverComment: true,
  approvedAt: true,
});

export const insertApprovalRuleSchema = createInsertSchema(approvalRules).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertExpense = z.infer<typeof insertExpenseSchema>;
export type Expense = typeof expenses.$inferSelect;
export type InsertApprovalRule = z.infer<typeof insertApprovalRuleSchema>;
export type ApprovalRule = typeof approvalRules.$inferSelect;
