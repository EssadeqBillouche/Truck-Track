import { AuthRepository } from "../repository/authRepository.js";
import { type registerDTO } from "../dto/auth/AuthDTO.js";
import { User } from "../entities/User/user.js";
import bcrypt from "bcryptjs";

export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    async register(data: registerDTO) {
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
}