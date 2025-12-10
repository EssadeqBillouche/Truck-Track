export interface CreateUserInterface {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface UserInterface extends CreateUserInterface {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum UserRole {
    ADMIN = "admin",
    DRIVER = "driver"
}

