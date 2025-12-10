import { AuthRepository } from "../repository/authRepository.js";
import { type registerDTO } from "../dto/auth/AuthDTO.js";
import bcrypt from "bcryptjs";

export class AuthService {
    constructor(private authRepository : AuthRepository){
        this.authRepository = new AuthRepository;
    }


    async register(data : registerDTO){

        const hashedPassword :string =  await bcrypt.hash(data.password, 10);

        const createdUser  = await this.authRepository.create()

    }
}