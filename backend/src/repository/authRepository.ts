import UserModel from "../model/userModel.js";
import { type registerDTO } from "../dto/auth/AuthDTO.js";


export class AuthRepository {


    async findByEmail(Email : string){
        return await UserModel.findOne({email : Email});
    }

    async create(data :registerDTO){

        const user = new UserModel({email: data.email,
            password : data.password,
            role : data.role
        })
        const savedUser = await user.save();
    }



}