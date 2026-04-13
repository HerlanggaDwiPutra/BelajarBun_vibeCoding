import { db } from "../config/db.js";
import { users } from "../schema/index.js";
import { eq } from "drizzle-orm";

// Create - POST /users
export const createUser = async ({ body }) => {
  try {
    const { name, email } = body;

    if (!name || !email) {
      return { success: false, message: "Name and email are required" };
    }

    const result = await db.insert(users).values({ name, email });

    return {
      success: true,
      message: "User created successfully",
      data: { id: Number(result[0].insertId), name, email },
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Read All - GET /users
export const getAllUsers = async () => {
  try {
    const allUsers = await db.select().from(users);
    return { success: true, data: allUsers };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Read One - GET /users/:id
export const getUserById = async ({ params }) => {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(params.id)));

    if (result.length === 0) {
      return { success: false, message: "User not found" };
    }

    return { success: true, data: result[0] };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Update - PUT /users/:id
export const updateUser = async ({ params, body }) => {
  try {
    const { name, email } = body;
    const id = Number(params.id);

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    if (existing.length === 0) {
      return { success: false, message: "User not found" };
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    await db.update(users).set(updateData).where(eq(users.id, id));

    const updated = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    return {
      success: true,
      message: "User updated successfully",
      data: updated[0],
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Delete - DELETE /users/:id
export const deleteUser = async ({ params }) => {
  try {
    const id = Number(params.id);

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    if (existing.length === 0) {
      return { success: false, message: "User not found" };
    }

    await db.delete(users).where(eq(users.id, id));

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
