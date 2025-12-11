import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { AuthService } from "../../service/AuthService.js";
import { AuthRepository } from "../../repository/authRepository.js";
import { UserRole } from "../../entities/User/userTypes.js";
import { User } from "../../entities/User/user.js";
import { ErrorHandler } from "../../helper/ErrorHandler.js";

describe("AuthService", () => {
    let authService: AuthService;
    let mockAuthRepository: jest.Mocked<AuthRepository>;

    beforeEach(() => {
        mockAuthRepository = {
            findByEmail: jest.fn(),
            create: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;

        authService = new AuthService(mockAuthRepository);
    });

    describe("register", () => {
        it("should register a new user successfully", async () => {
            const userData = {
                name: "Test User",
                email: "test@test.com",
                password: "password123",
                role: UserRole.DRIVER
            };

            mockAuthRepository.findByEmail.mockResolvedValue(null);
            mockAuthRepository.create.mockResolvedValue({
                _id: "123",
                name: userData.name,
                email: userData.email,
                role: userData.role
            } as any);

            const result = await authService.register(userData);

            expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith(userData.email);
            expect(mockAuthRepository.create).toHaveBeenCalled();
            expect(result.email).toBe(userData.email);
        });

        it("should throw error if email already exists", async () => {
            const userData = {
                name: "Test User",
                email: "existing@test.com",
                password: "password123",
                role: UserRole.DRIVER
            };

            mockAuthRepository.findByEmail.mockResolvedValue(
                new User({ name: "Existing", email: userData.email, password: "hash" })
            );

            await expect(authService.register(userData))
                .rejects
                .toThrow("Email already exists");
        });

        it("should hash password before saving", async () => {
            const userData = {
                name: "Test User",
                email: "test@test.com",
                password: "password123",
                role: UserRole.DRIVER
            };

            mockAuthRepository.findByEmail.mockResolvedValue(null);
            mockAuthRepository.create.mockResolvedValue({ _id: "123", ...userData } as any);

            await authService.register(userData);

            const createCall = mockAuthRepository.create.mock.calls[0][0];
            expect(createCall.password).not.toBe(userData.password);
        });
    });

    describe("login", () => {
        it("should return token on valid credentials", async () => {
            const bcrypt = await import("bcryptjs");
            const hashedPassword = await bcrypt.hash("password123", 10);

            mockAuthRepository.findByEmail.mockResolvedValue(
                new User({
                    name: "Test User",
                    email: "test@test.com",
                    password: hashedPassword,
                    role: UserRole.DRIVER
                })
            );

            const result = await authService.login({
                email: "test@test.com",
                password: "password123"
            });

            expect(result).toBeDefined();
            expect(typeof result).toBe("string");
        });

        it("should throw error if user not found", async () => {
            mockAuthRepository.findByEmail.mockResolvedValue(null);

            await expect(authService.login({
                email: "notfound@test.com",
                password: "password123"
            })).rejects.toThrow("Invalid email");
        });

        it("should throw error if password is wrong", async () => {
            const bcrypt = await import("bcryptjs");
            const hashedPassword = await bcrypt.hash("correctpassword", 10);

            mockAuthRepository.findByEmail.mockResolvedValue(
                new User({
                    name: "Test User",
                    email: "test@test.com",
                    password: hashedPassword,
                    role: UserRole.DRIVER
                })
            );

            await expect(authService.login({
                email: "test@test.com",
                password: "wrongpassword"
            })).rejects.toThrow("Invalid password");
        });
    });
});