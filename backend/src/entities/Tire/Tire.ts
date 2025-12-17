import { type createTireInterface, TirePosition, TireState } from "./TireTypes.js";

export class Tire {
    id?: string;
    brand: string;
    size: string;
    position: string;
    state: string;
    vehicleId: string;
    vehicleType: string;
    installationDate: Date;
    installationMileage: string;
    replacementMileage?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: Partial<createTireInterface> & { 
        brand: string; 
        size: string; 
        position: string; 
        state: string; 
        vehicleId: string; 
        vehicleType: string;
        installationDate: Date;
        installationMileage: string;
    }) {
        if (data.id !== undefined) {
            this.id = data.id;
        }
        this.brand = data.brand;
        this.size = data.size;
        this.position = data.position;
        this.state = data.state;
        this.vehicleId = data.vehicleId;
        this.vehicleType = data.vehicleType;
        this.installationDate = data.installationDate;
        this.installationMileage = data.installationMileage;
        if (data.replacementMileage !== undefined) {
            this.replacementMileage = data.replacementMileage;
        }
        if (data.createdAt !== undefined) {
            this.createdAt = data.createdAt;
        }
        if (data.updatedAt !== undefined) {
            this.updatedAt = data.updatedAt;
        }
    }

    toJSON() {
        return {
            id: this.id,
            brand: this.brand,
            size: this.size,
            position: this.position,
            state: this.state,
            vehicleId: this.vehicleId,
            vehicleType: this.vehicleType,
            installationDate: this.installationDate,
            installationMileage: this.installationMileage,
            replacementMileage: this.replacementMileage,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}