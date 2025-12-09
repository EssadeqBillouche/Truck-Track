import { AuthRepository } from "../repository/authRepository.js";
import { type registerDTO } from "../dto/auth/AuthDTO.js";

export class AuthService {
    constructor(private authRepository : AuthRepository){
        this.authRepository = new AuthRepository;
    }


    register(data : registerDTO){

    }
}