import { Elysia } from "elysia";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

export const userRoutes = new Elysia({ prefix: "/users" })
  .post("/", createUser)
  .get("/", getAllUsers)
  .get("/:id", getUserById)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);
