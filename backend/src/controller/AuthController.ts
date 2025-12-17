import type { Request, Response, NextFunction } from "express";
import type { registerDTO, loginDTO } from "../dto/auth/AuthDTO.js";
import { AuthService } from "../service/AuthService.js";
import { ErrorHandler } from "../helper/ErrorHandler.js";

export class AuthController {

    constructor(private authService: AuthService) { }

    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as registerDTO;

            const user = await this.authService.register(data);

            res.status(201).json({
                success: true,
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                }
            });
        } catch (error) {
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as loginDTO;

            const token = await this.authService.login(data);

            res.status(200).json({
                success: true,
                data: { token }
            });
        } catch (error) {
            next(error);
        }
    };
}