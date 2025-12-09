import { UserRole } from "../../entities/User/userTypes.js";

export type loginDTO = {
    email : string;
    password : string;
}

export type registerDTO = {
    email: string;
    password : string;
    name : string;
    role : UserRole;
}