import UserModel from "../model/userModel.js";
import { User } from "../entities/User/user.js";
import { ErrorHandler } from "../helper/ErrorHandler.js";


export class AuthRepository {


    async findByEmail(email: string) {
        const user = await UserModel.findOne({ email });
        if(!user){
            throw new ErrorHandler('User Not found', 404)
        }
    }

    async create(userData: User) {
        const user = new UserModel(userData.toJSON()); 
        const savedUser = await user.save();
        return savedUser.toObject(); 
    }
}