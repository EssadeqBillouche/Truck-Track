import { describe, it, expect } from "@jest/globals";
import { loginSchema, registerSchema, createDriverSchema } from "../../dto/auth/AuthDTO.js";
import { UserRole } from "../../entities/User/userTypes.js";

describe("Zod Validation Schemas", () => {

    describe("loginSchema", () => {
        it("should pass with valid data", () => {
            const result = loginSchema.safeParse({
                email: "test@test.com",
                password: "password123"
            });

            expect(result.success).toBe(true);
        });

        it("should fail with invalid email", () => {
            const result = loginSchema.safeParse({
                email: "invalid-email",
                password: "password123"
            });

            expect(result.success).toBe(false);
        });

        it("should fail with empty password", () => {
            const result = loginSchema.safeParse({
                email: "test@test.com",
                password: ""
            });

            expect(result.success).toBe(false);
        });

        it("should fail with missing fields", () => {
            const result = loginSchema.safeParse({});

            expect(result.success).toBe(false);
        });
    });

    describe("registerSchema", () => {
        it("should pass with valid data", () => {
            const result = registerSchema.safeParse({
                email: "test@test.com",
                password: "password123",
                name: "Test User",
                role: UserRole.DRIVER
            });

            expect(result.success).toBe(true);
        });

        it("should fail with password less than 6 characters", () => {
            const result = registerSchema.safeParse({
                email: "test@test.com",
                password: "12345",
                name: "Test User",
                role: UserRole.DRIVER
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].message).toBe("Password must be at least 6 characters");
            }
        });

        it("should fail with invalid role", () => {
            const result = registerSchema.safeParse({
                email: "test@test.com",
                password: "password123",
                name: "Test User",
                role: "invalid_role"
            });

            expect(result.success).toBe(false);
        });

        it("should fail with empty name", () => {
            const result = registerSchema.safeParse({
                email: "test@test.com",
                password: "password123",
                name: "",
                role: UserRole.DRIVER
            });

            expect(result.success).toBe(false);
        });
    });

    describe("createDriverSchema", () => {
        it("should pass with valid data (no role required)", () => {
            const result = createDriverSchema.safeParse({
                email: "driver@test.com",
                password: "password123",
                name: "New Driver"
            });

            expect(result.success).toBe(true);
        });

        it("should fail with invalid email", () => {
            const result = createDriverSchema.safeParse({
                email: "invalid",
                password: "password123",
                name: "New Driver"
            });

            expect(result.success).toBe(false);
        });
    });
});