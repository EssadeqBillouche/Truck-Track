import type { Request, Response } from "express";
import type { registerDTO } from "../dto/auth/AuthDTO.js";
import { AuthService } from "../service/AuthService.js";
export
class authController {
  
    constructor(private authService : AuthService){
    }
    async register(req: Request, res: Response){
        const {name , email, password, role} = req.body;

        if(!email || !password){
            res.status(400).json({message : "missing info "})
            return
        }
        const user = await this.authService.register({name , email, password, role} as registerDTO);

    }

}