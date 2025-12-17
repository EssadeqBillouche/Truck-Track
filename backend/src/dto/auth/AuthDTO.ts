import { z } from "zod";
import { UserRole } from "../../entities/User/userTypes.js";

// Login Schema
export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
});

// Register Schema
export const registerSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().min(1, "Name is required"),
    role: z.nativeEnum(UserRole)
});

// Create Driver Schema (no role - forced to DRIVER)
export const createDriverSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().min(1, "Name is required")
});

// Infer types from schemas
export type loginDTO = z.infer<typeof loginSchema>;
export type registerDTO = z.infer<typeof registerSchema>;
export type createDriverDTO = z.infer<typeof createDriverSchema>;