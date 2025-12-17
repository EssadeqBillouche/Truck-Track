import { TireRepository } from "../repository/TireRepository.js";
import { Tire } from "../entities/Tire/Tire.js";
import { ErrorHandler } from "../helper/ErrorHandler.js";
import { TireState } from "../entities/Tire/TireTypes.js";

export class TireService {
    constructor(private tireRepository: TireRepository) {}

    async createTire(data: any) {
        const tire = new Tire({
            ...data,
            state: data.state ?? TireState.NEW,
            installationDate: new Date(data.installationDate)
        });
        return await this.tireRepository.create(tire);
    }

    async getAllTires() {
        return await this.tireRepository.findAll();
    }

    async getTireById(id: string) {
        const tire = await this.tireRepository.findById(id);
        if (!tire) {
            throw new ErrorHandler("Tire not found", 404);
        }
        return tire;
    }

    async getTiresByVehicle(vehicleId: string) {
        return await this.tireRepository.findByVehicle(vehicleId);
    }

    async updateTire(id: string, data: any) {
        const tire = await this.tireRepository.findById(id);
        if (!tire) {
            throw new ErrorHandler("Tire not found", 404);
        }
        if (data.installationDate) {
            data.installationDate = new Date(data.installationDate);
        }
        return await this.tireRepository.update(id, data);
    }

    async deleteTire(id: string) {
        const tire = await this.tireRepository.findById(id);
        if (!tire) {
            throw new ErrorHandler("Tire not found", 404);
        }
        return await this.tireRepository.delete(id);
    }
}