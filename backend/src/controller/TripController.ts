import type { Request, Response, NextFunction } from "express";
import { TripService } from "../service/TripService.js";

export class TripController {
    constructor(private tripService: TripService) {}

    // Admin creates trip
    createTrip = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const trip = await this.tripService.createTrip(req.body);
            res.status(201).json({ success: true, data: trip });
        } catch (error) {
            next(error);
        }
    };

    // Admin gets all trips
    getAllTrips = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const trips = await this.tripService.getAllTrips();
            res.status(200).json({ success: true, data: trips });
        } catch (error) {
            next(error);
        }
    };

    // Driver gets their trips
    getMyTrips = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const driverId = req.user?.email; // Get from JWT
            const trips = await this.tripService.getMyTrips(driverId as string);
            res.status(200).json({ success: true, data: trips });
        } catch (error) {
            next(error);
        }
    };

    // Driver updates trip status
    updateTripStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const trip = await this.tripService.updateTripStatus(id as string, req.body);
            res.status(200).json({ success: true, data: trip });
        } catch (error) {
            next(error);
        }
    };

    // Get single trip
    getTripById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const trip = await this.tripService.getTripById(id as string);
            res.status(200).json({ success: true, data: trip });
        } catch (error) {
            next(error);
        }
    };

    // Download trip PDF
    downloadTripPDF = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            await this.tripService.downloadTripPDF(id as string, res);
        } catch (error) {
            next(error);
        }
    };
}