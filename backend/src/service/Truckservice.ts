import { TruckRepository } from "../repository/TruckRepository.js";
import { Truck } from "../entities/Truck/Truck.js";
import { ErrorHandler } from "../helper/ErrorHandler.js";

export class TruckService {
    constructor(private truckRepository: TruckRepository) {}

    async createTruck(data: any) {
        const existingTruck = await this.truckRepository.findByMatriculation(data.matriculation);
        if (existingTruck) {
            throw new ErrorHandler("Matriculation already exists", 400);
        }
        const truck = new Truck(data);
        return await this.truckRepository.create(truck);
    }

    async getAllTrucks() {
        return await this.truckRepository.findAll();
    }

    async getTruckById(id: string) {
        const truck = await this.truckRepository.findById(id);
        if (!truck) {
            throw new ErrorHandler("Truck not found", 404);
        }
        return truck;
    }

    async updateTruck(id: string, data: any) {
        const truck = await this.truckRepository.findById(id);
        if (!truck) {
            throw new ErrorHandler("Truck not found", 404);
        }
        return await this.truckRepository.update(id, data);
    }

    async deleteTruck(id: string) {
        const truck = await this.truckRepository.findById(id);
        if (!truck) {
            throw new ErrorHandler("Truck not found", 404);
        }
        return await this.truckRepository.delete(id);
    }
}