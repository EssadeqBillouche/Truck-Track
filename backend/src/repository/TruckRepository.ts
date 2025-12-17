import TruckModel from "../model/truckModel.js";
import { Truck } from "../entities/Truck/Truck.js";

export class TruckRepository {
    async findByMatriculation(matriculation: string): Promise<Truck | null> {
        const truck = await TruckModel.findOne({ matriculation });
        if (truck) {
            const truckObj = truck.toObject();
            return new Truck({ ...truckObj });
        }
        return null;
    }

    async create(truckData: Truck) {
        const truck = new TruckModel(truckData.toJSON());
        const savedTruck = await truck.save();
        return savedTruck.toObject();
    }

    async findAll(): Promise<Truck[]> {
        const trucks = await TruckModel.find();
        return trucks.map(truck => new Truck(truck.toObject()));
    }

    async findById(id: string): Promise<Truck | null> {
        const truck = await TruckModel.findById(id);
        if (truck) {
            return new Truck(truck.toObject());
        }
        return null;
    }

    async update(id: string, data: Partial<Truck>) {
        const truck = await TruckModel.findByIdAndUpdate(id, data, { new: true });
        if (truck) {
            return new Truck(truck.toObject());
        }
        return null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await TruckModel.findByIdAndDelete(id);
        return !!result;
    }
}