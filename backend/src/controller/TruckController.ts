import type { Request, Response, NextFunction } from "express";
import { TruckService } from "../service/Truckservice.js";
import { TruckState } from "../entities/Truck/TruckTypes.js";

export class TruckController {
    constructor(private truckService: TruckService) {}

    // Create a new truck
    createTruck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { matriculation, state, brand, mileage } = req.body;
            const truckData = {
                matriculation,
                state: state ?? TruckState.ACTIVE,
                brand,
                mileage
            };
            const savedTruck = await this.truckService.createTruck(truckData);
            res.status(201).json({ success: true, data: savedTruck });
        } catch (error) {
            next(error);
        }
    };

    // Get all trucks
    getAllTrucks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const trucks = await this.truckService.getAllTrucks();
            res.status(200).json({ success: true, data: trucks });
        } catch (error) {
            next(error);
        }
    };

    // Get a single truck by ID
    getTruckById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const truck = await this.truckService.getTruckById(id as string);
            res.status(200).json({ success: true, data: truck });
        } catch (error) {
            next(error);
        }
    };

    updateTruck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const truck = await this.truckService.updateTruck(id as string, req.body);
            res.status(200).json({ success: true, data: truck });
        } catch (error) {
            next(error);
        }
    };

    deleteTruck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            await this.truckService.deleteTruck(id as string);
            res.status(200).json({ success: true, message: "Truck deleted successfully" });
        } catch (error) {
            next(error);
        }
    };
}