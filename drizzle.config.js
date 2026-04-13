import { defineConfig } from "drizzle-kit";

const password = process.env.DB_PASSWORD;

export default defineConfig({
  schema: "./src/schema/index.js",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: password ? password : undefined,
    database: process.env.DB_NAME || "belajar_bun_vibe_coding",
  },
});

