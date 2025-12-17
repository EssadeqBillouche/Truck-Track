export enum TirePosition {
    FRONT_LEFT = "front-left",
    FRONT_RIGHT = "front-right",
    REAR_LEFT = "rear-left",
    REAR_RIGHT = "rear-right",
    SPARE = "spare",
}

export enum TireState {
    NEW = "new",
    GOOD = "good",
    WORN = "worn",
    NEEDS_REPLACEMENT = "needs-replacement",
    REPLACED = "replaced",
}

export interface createTireInterface {
    id?: string;
    brand: string;
    size: string;
    position: TirePosition;
    state: TireState;
    vehicleId: string; // truck or trailer ID
    vehicleType: "truck" | "trailer";
    installationDate: Date;
    installationMileage: string;
    replacementMileage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}