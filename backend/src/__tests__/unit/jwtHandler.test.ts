import { describe, it, expect } from "@jest/globals";
import jwtHandeler from "../../config/jwt.js";

describe("jwtHandeler", () => {
    const payload = {
        email: "test@test.com",
        name: "Test User",
        role: "driver"
    };

    describe("createToken", () => {
        it("should create a valid JWT token", () => {
            const token = jwtHandeler.createToken(payload);

            expect(token).toBeDefined();
            expect(typeof token).toBe("string");
            expect(token.split(".")).toHaveLength(3);
        });
    });

    describe("verfyToken", () => {
        it("should verify and decode a valid token", () => {
            const token = jwtHandeler.createToken(payload);
            const decoded = jwtHandeler.verfyToken(token);

            expect(decoded.email).toBe(payload.email);
            expect(decoded.name).toBe(payload.name);
            expect(decoded.role).toBe(payload.role);
        });

        it("should throw error for invalid token", () => {
            expect(() => {
                jwtHandeler.verfyToken("invalid.token.here");
            }).toThrow();
        });
    });

    describe("decodeToken", () => {
        it("should decode token without verification", () => {
            const token = jwtHandeler.createToken(payload);
            const decoded = jwtHandeler.decodeToken(token);

            expect(decoded?.email).toBe(payload.email);
        });

        it("should return null for invalid token", () => {
            const decoded = jwtHandeler.decodeToken("invalid");
            expect(decoded).toBeNull();
        });
    });
});