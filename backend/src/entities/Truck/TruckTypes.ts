export enum TruckState {
    ACTIVE = "active",
    INACTIVE = "inactive",
    IN_REPAIR = "in-repair",
}

export interface createTruckInterface {
    id?: string;
    matriculation : string;
    state : TruckState;
    brand : string;
    mileage : string;
    createdAt? : Date;
    updatedAt? : Date;
}


    