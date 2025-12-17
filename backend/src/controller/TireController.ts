import type { Request, Response, NextFunction } from "express";
import { TireService } from "../service/TireService.js";

export class TireController {
    constructor(private tireService: TireService) {}

    createTire = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const savedTire = await this.tireService.createTire(req.body);
            res.status(201).json({ success: true, data: savedTire });
        } catch (error) {
            next(error);
        }
    };

    getAllTires = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tires = await this.tireService.getAllTires();
            res.status(200).json({ success: true, data: tires });
        } catch (error) {
            next(error);
        }
    };

    getTireById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const tire = await this.tireService.getTireById(id as string);
            res.status(200).json({ success: true, data: tire });
        } catch (error) {
            next(error);
        }
    };

    getTiresByVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { vehicleId } = req.params;
            const tires = await this.tireService.getTiresByVehicle(vehicleId as string);
            res.status(200).json({ success: true, data: tires });
        } catch (error) {
            next(error);
        }
    };

    updateTire = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const tire = await this.tireService.updateTire(id as string, req.body);
            res.status(200).json({ success: true, data: tire });
        } catch (error) {
            next(error);
        }
    };

    deleteTire = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            await this.tireService.deleteTire(id as string);
            res.status(200).json({ success: true, message: "Tire deleted successfully" });
        } catch (error) {
            next(error);
        }
    };
}