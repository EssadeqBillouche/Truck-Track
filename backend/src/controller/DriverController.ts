import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/AuthService.js";
import type { createDriverDTO } from "../dto/auth/AuthDTO.js";
import { UserRole } from "../entities/User/userTypes.js";

export class DriverController {

    constructor(private authService: AuthService) { }

    createDriver = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as createDriverDTO;

            const driver = await this.authService.register({
                ...data,
                role: UserRole.DRIVER
            });

            res.status(201).json({
                success: true,
                message: "Driver created successfully",
                data: {
                    driver: {
                        id: driver._id,
                        name: driver.name,
                        email: driver.email,
                        role: driver.role
                    }
                }
            });
        } catch (error) {
            next(error);
        }
    };

    getAllDrivers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const drivers = await this.authService.getAllDrivers();
            
            res.status(200).json({
                success: true,
                data: drivers
            });
        } catch (error) {
            next(error);
        }
    };
}