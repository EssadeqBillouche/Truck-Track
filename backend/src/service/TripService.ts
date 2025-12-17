import { TripRepository } from "../repository/TripRepository.js";
import { Trip } from "../entities/trip/Trip.js";
import { ErrorHandler } from "../helper/ErrorHandler.js";
import { PdfService } from "./PdfService.js";
import type { Response } from "express";

export class TripService {
    constructor(private tripRepository: TripRepository) {}

    async createTrip(data: any) {
        const trip = new Trip({
            truckId: data.truckId,
            driverId: data.driverId,
            origin: data.origin,
            destination: data.destination,
            departureDate: new Date(data.departureDate),
            status: data.status ?? "todo"
        });
        return await this.tripRepository.create(trip);
    }

    async getAllTrips() {
        return await this.tripRepository.findAll();
    }

    async getTripById(id: string) {
        const trip = await this.tripRepository.findById(id);
        if (!trip) {
            throw new ErrorHandler("Trip not found", 404);
        }
        return trip;
    }

    async getMyTrips(driverId: string) {
        return await this.tripRepository.findByDriver(driverId);
    }

    async updateTripStatus(id: string, data: any) {
        const trip = await this.tripRepository.findById(id);
        if (!trip) {
            throw new ErrorHandler("Trip not found", 404);
        }
        return await this.tripRepository.update(id, data);
    }

    async downloadTripPDF(id: string, res: Response) {
        const trip = await this.tripRepository.findById(id);
        if (!trip) {
            throw new ErrorHandler("Trip not found", 404);
        }
        PdfService.generateTripPDF(trip, res);
    }
}