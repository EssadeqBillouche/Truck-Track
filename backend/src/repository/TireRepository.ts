import TireModel from "../model/tireModel.js";
import { Tire } from "../entities/Tire/Tire.js";

export class TireRepository {
    async create(tireData: Tire) {
        const tire = new TireModel(tireData.toJSON());
        const savedTire = await tire.save();
        return savedTire.toObject();
    }

    async findAll(): Promise<Tire[]> {
        const tires = await TireModel.find();
        return tires.map(tire => new Tire(tire.toObject()));
    }

    async findById(id: string): Promise<Tire | null> {
        const tire = await TireModel.findById(id);
        if (tire) {
            return new Tire(tire.toObject());
        }
        return null;
    }

    async findByVehicle(vehicleId: string): Promise<Tire[]> {
        const tires = await TireModel.find({ vehicleId });
        return tires.map(tire => new Tire(tire.toObject()));
    }

    async update(id: string, data: Partial<Tire>) {
        const tire = await TireModel.findByIdAndUpdate(id, data, { new: true });
        if (tire) {
            return new Tire(tire.toObject());
        }
        return null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await TireModel.findByIdAndDelete(id);
        return !!result;
    }
}