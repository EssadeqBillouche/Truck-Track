import type { Request, Response, NextFunction } from "express";
import { TrailerService } from "../service/TrailerService.js";
import { TrailerState } from "../entities/Trailer/TrailerTypes.js";

export class TrailerController {
    constructor(private trailerService: TrailerService) {}

    createTrailer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { matriculation, state, brand, capacity, mileage } = req.body;
            const trailerData = {
                matriculation,
                state: state ?? TrailerState.ACTIVE,
                brand,
                capacity,
                mileage
            };
            const savedTrailer = await this.trailerService.createTrailer(trailerData);
            res.status(201).json({ success: true, data: savedTrailer });
        } catch (error) {
            next(error);
        }
    };

    getAllTrailers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const trailers = await this.trailerService.getAllTrailers();
            res.status(200).json({ success: true, data: trailers });
        } catch (error) {
            next(error);
        }
    };

    getTrailerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const trailer = await this.trailerService.getTrailerById(id as string);
            res.status(200).json({ success: true, data: trailer });
        } catch (error) {
            next(error);
        }
    };

    updateTrailer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const trailer = await this.trailerService.updateTrailer(id as string, req.body);
            res.status(200).json({ success: true, data: trailer });
        } catch (error) {
            next(error);
        }
    };

    deleteTrailer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            await this.trailerService.deleteTrailer(id as string);
            res.status(200).json({ success: true, message: "Trailer deleted successfully" });
        } catch (error) {
            next(error);
        }
    };
}