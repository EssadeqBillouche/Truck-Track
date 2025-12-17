import { type createTrailerInterface, TrailerState } from "./TrailerTypes.js";

export class Trailer {
    id?: string;
    matriculation: string;
    state: string;
    brand: string;
    capacity: number;
    mileage: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: Partial<createTrailerInterface> & { matriculation: string; state: string; brand: string; capacity: number; mileage: string }) {
        if (data.id !== undefined) {
            this.id = data.id;
        }
        this.matriculation = data.matriculation;
        this.state = data.state;
        this.brand = data.brand;
        this.capacity = data.capacity;
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
            capacity: this.capacity,
            mileage: this.mileage,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}