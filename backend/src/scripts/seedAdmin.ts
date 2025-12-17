import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserModel from "../model/userModel.js";
import { UserRole } from "../entities/User/userTypes.js";

const seedAdmin = async () => {
    try {
        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error("DB_URL is not defined");
        }

        await mongoose.connect(dbURL);
        console.log("Database connected");

        const existingAdmin = await UserModel.findOne({ role: UserRole.ADMIN });
        if (existingAdmin) {
            console.log("Admin already exists:", existingAdmin.email);
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("Admin@123", 10);
        
        const admin = new UserModel({
            name: "Admin",
            email: "admin@trucktrack.com",
            password: hashedPassword,
            role: UserRole.ADMIN
        });

        await admin.save();
        console.log("Admin created successfully!");
        console.log("Email: admin@trucktrack.com");
        console.log(" <<<< Change this password after first login! >>>>");
        console.log("<<<<Password: Admin@123>>>>");
        console.log("<<<< Change this password after first login! >>>>");

    } catch (error) {
        console.error("Error seeding admin:", error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

seedAdmin();