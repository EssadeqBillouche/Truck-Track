import UserModel from "../model/userModel.js";
import { User } from "../entities/User/user.js";


export class AuthRepository {


    async findByEmail(email: string) {
        return await UserModel.findOne({ email });
    }

    async create(userData: User) {
        const user = new UserModel(userData.toJSON()); 
        const savedUser = await user.save();
        return savedUser.toObject(); 
    }
}