export enum TripStatus {
    TODO = "todo",
    IN_PROGRESS = "in-progress",
    COMPLETED = "completed",
}

export interface createTripInterface {
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
}