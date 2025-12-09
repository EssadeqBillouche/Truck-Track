export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;    
}

export enum UserRole {
    ADMIN = "admin",
    USER = "driver"
}

