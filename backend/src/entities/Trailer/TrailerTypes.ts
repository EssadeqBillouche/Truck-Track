export enum TrailerState {
    ACTIVE = "active",
    INACTIVE = "inactive",
    IN_REPAIR = "in-repair",
}

export interface createTrailerInterface {
    id?: string;
    matriculation: string;
    state: TrailerState;
    brand: string;
    capacity: number; // in tons
    mileage: string;
    createdAt?: Date;
    updatedAt?: Date;
}