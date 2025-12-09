import { type UserInterface, UserRole } from "./userTypes.js";

export class User {
    id : number;
    name : string;
    email : string;
    password : string;
    role : UserRole;

    constructor(data: UserInterface) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role;
    }

    validateEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    validatePassword(): boolean {
        return this.password.length >= 6;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role
        };
    }
}