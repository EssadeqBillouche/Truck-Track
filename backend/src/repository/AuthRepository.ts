import UserModel from "../model/userModel.js";
import { User } from "../entities/User/user.js";
import { ErrorHandler } from "../helper/ErrorHandler.js";


export class AuthRepository {


    async findByEmail(email: string) : Promise<User| null> {
        const user = await UserModel.findOne({ email });
        if(user){
            const userObj = user.toObject();
        return new User({ ...userObj, role: userObj.role as any });
        }
        return null
        
    }

    async create(userData: User) {
        const user = new UserModel(userData.toJSON()); 
        const savedUser = await user.save();
        return savedUser.toObject(); 
    }

    async findAllDrivers() {
        const drivers = await UserModel.find({ role: 'driver' }).select('-password');
        return drivers.map(driver => driver.toObject());
    }
}