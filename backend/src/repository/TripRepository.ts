import TripModel from "../model/tripModel.js";
import UserModel from "../model/userModel.js";
import { Trip } from "../entities/trip/Trip.js";

export class TripRepository {
    async create(tripData: Trip) {
        const trip = new TripModel(tripData.toJSON());
        const savedTrip = await trip.save();
        return savedTrip.toObject();
    }

    async findAll(): Promise<any[]> {
        const trips = await TripModel.find()
            .populate("truckId", "matriculation brand")
            .populate("driverId", "name email");
        return trips.map(trip => trip.toObject());
    }

    async findById(id: string): Promise<any | null> {
        const trip = await TripModel.findById(id)
            .populate("truckId", "matriculation brand")
            .populate("driverId", "name email");
        if (trip) {
            return trip.toObject();
        }
        return null;
    }

    async findByDriver(driverEmailOrId: string): Promise<any[]> {
        // Check if it's an email or ObjectId
        let driverId = driverEmailOrId;
        
        // If it looks like an email, find the user first
        if (driverEmailOrId.includes('@')) {
            const user = await UserModel.findOne({ email: driverEmailOrId });
            if (!user) {
                return [];
            }
            driverId = user._id.toString();
        }
        
        const trips = await TripModel.find({ driverId })
            .populate("truckId", "matriculation brand")
            .populate("driverId", "name email");
        return trips.map(trip => trip.toObject());
    }

    async update(id: string, data: Partial<Trip>) {
        const trip = await TripModel.findByIdAndUpdate(id, data, { new: true })
            .populate("truckId", "matriculation brand")
            .populate("driverId", "name email");
        if (trip) {
            return trip.toObject();
        }
        return null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await TripModel.findByIdAndDelete(id);
        return !!result;
    }
}