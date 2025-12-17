import { type createTripInterface, TripStatus } from "./TripTypes.js";

export class Trip {
    id?: string;
    truckId: string;
    driverId: string;
    origin: string;
    destination: string;
    departureDate: Date;
    status: TripStatus;
    departureMileage?: string;
    arrivalMileage?: string;
    fuelVolume?: number;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: createTripInterface) {
        if (data.id !== undefined) {
            this.id = data.id;
        }
        this.truckId = data.truckId;
        this.driverId = data.driverId;
        this.origin = data.origin;
        this.destination = data.destination;
        this.departureDate = data.departureDate;
        this.status = data.status;
        if (data.departureMileage !== undefined) {
            this.departureMileage = data.departureMileage;
        }
        if (data.arrivalMileage !== undefined) {
            this.arrivalMileage = data.arrivalMileage;
        }
        if (data.fuelVolume !== undefined) {
            this.fuelVolume = data.fuelVolume;
        }
        if (data.notes !== undefined) {
            this.notes = data.notes;
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
            truckId: this.truckId,
            driverId: this.driverId,
            origin: this.origin,
            destination: this.destination,
            departureDate: this.departureDate,
            status: this.status,
            departureMileage: this.departureMileage,
            arrivalMileage: this.arrivalMileage,
            fuelVolume: this.fuelVolume,
            notes: this.notes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
