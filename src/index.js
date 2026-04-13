import { Elysia } from "elysia";
import { userRoutes } from "./routes/userRoutes.js";

const app = new Elysia()
  .use(userRoutes)
  .get("/", () => ({
    message: "Belajar Bun + ElysiaJS + Drizzle + MySQL",
    status: "running",
  }))
  .listen(3000);

console.log(`🦊 Elysia server is running at http://localhost:${app.server.port}`);
