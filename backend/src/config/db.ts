import { log } from "console";
import mongoose from "mongoose";

export const connectionDB = async (): Promise<void> => {
    try{
        const dbURL = process.env.DB_URL;
        await mongoose.connect(dbURL as string) 
        console.log('<<<<< db Connected >>> ');
    }catch(error){
        console.log(` <<< error with db connection : ${error} >>` );
    }
}