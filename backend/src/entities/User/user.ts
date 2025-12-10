import { type UserInterface, UserRole } from "./userTypes.js";

export class User {
    id?: string;  
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: UserInterface) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role ?? UserRole.DRIVER; // Default role as driver
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    validateEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    validatePassword(): boolean {
        return this.password.length >= 6;
    }

    isAdmin(): boolean {
        return this.role === UserRole.ADMIN;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}