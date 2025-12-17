import { AuthRepository } from "../repository/AuthRepository.js";
import { type registerDTO, type loginDTO } from "../dto/auth/AuthDTO.js";
import { User } from "../entities/User/user.js";
import { ErrorHandler } from "../helper/ErrorHandler.js";
import jwtHandeler from "../config/jwt.js";
import bcrypt from "bcryptjs";

export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    async register(data: registerDTO) {
        const existingUser = await this.authRepository.findByEmail(data.email);
        if (existingUser) {
            throw new ErrorHandler("Email already exists", 400);
        }

        const hashedPassword: string = await bcrypt.hash(data.password, 10);

        const user = new User({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role
        });

        const savedUser = await this.authRepository.create(user);
        return savedUser;
    }

    async login(data: loginDTO) {
        const user = await this.authRepository.findByEmail(data.email);
        if (!user) {
            throw new ErrorHandler("Invalid email", 401);
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new ErrorHandler("Invalid password", 401);
        }
        
        const token = jwtHandeler.createToken({
            email: user.email,
            name: user.name,
            role: user.role
        });

        return token;
    }

    async getAllDrivers() {
        return await this.authRepository.findAllDrivers();
    }
}