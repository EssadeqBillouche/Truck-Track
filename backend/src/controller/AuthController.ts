import type { Request, Response, NextFunction } from "express";
import type { registerDTO } from "../dto/auth/AuthDTO.js";
import { AuthService } from "../service/AuthService.js";

export class AuthController {
  
    constructor(private authService: AuthService) {}

    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, email, password, role } = req.body;

            if (!email || !password || !name) {
                res.status(400).json({ message: "Missing required fields" });
                return;
            }

            const user = await this.authService.register({ name, email, password, role } as registerDTO);

            res.status(201).json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    };
}