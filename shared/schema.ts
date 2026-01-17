import { pgTable, text, varchar, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Generated Projects Schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  prompt: text("prompt").notNull(),
  language: text("language").notNull(),
  generatedCode: text("generated_code").notNull(),
  url: text("url").notNull(),
  status: text("status").notNull().default("generating"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Supported languages list
export const SUPPORTED_LANGUAGES = [
  { id: "nodejs", name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
  { id: "python", name: "Python", icon: "SiPython", color: "#3776AB" },
  { id: "typescript", name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
  { id: "javascript", name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
  { id: "react", name: "React", icon: "SiReact", color: "#61DAFB" },
  { id: "html", name: "HTML/CSS", icon: "SiHtml5", color: "#E34F26" },
  { id: "java", name: "Java", icon: "SiOpenjdk", color: "#ED8B00" },
  { id: "cpp", name: "C++", icon: "SiCplusplus", color: "#00599C" },
  { id: "csharp", name: "C#", icon: "SiDotnet", color: "#512BD4" },
  { id: "go", name: "Go", icon: "SiGo", color: "#00ADD8" },
  { id: "rust", name: "Rust", icon: "SiRust", color: "#000000" },
  { id: "ruby", name: "Ruby", icon: "SiRuby", color: "#CC342D" },
  { id: "php", name: "PHP", icon: "SiPhp", color: "#777BB4" },
  { id: "swift", name: "Swift", icon: "SiSwift", color: "#FA7343" },
  { id: "kotlin", name: "Kotlin", icon: "SiKotlin", color: "#7F52FF" },
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];
