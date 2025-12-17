import { type createTruckInterface } from "./TruckTypes.js";

export class Truck {
    id?: string;
    matriculation: string;
    state: string;
    brand: string;
    mileage: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: Partial<createTruckInterface> & { matriculation: string; state: string; brand: string; mileage: string }) {
        if (data.id !== undefined) {
            this.id = data.id;
        }
        this.matriculation = data.matriculation;
        this.state = data.state;
        this.brand = data.brand;
        this.mileage = data.mileage;
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
            matriculation: this.matriculation,
            state: this.state,
            brand: this.brand,
            mileage: this.mileage,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}