import TrailerModel from "../model/trailerModel.js";
import { Trailer } from "../entities/Trailer/Trailer.js";

export class TrailerRepository {
    async findByMatriculation(matriculation: string): Promise<Trailer | null> {
        const trailer = await TrailerModel.findOne({ matriculation });
        if (trailer) {
            const trailerObj = trailer.toObject();
            return new Trailer({ ...trailerObj });
        }
        return null;
    }

    async create(trailerData: Trailer) {
        const trailer = new TrailerModel(trailerData.toJSON());
        const savedTrailer = await trailer.save();
        return savedTrailer.toObject();
    }

    async findAll(): Promise<Trailer[]> {
        const trailers = await TrailerModel.find();
        return trailers.map(trailer => new Trailer(trailer.toObject()));
    }

    async findById(id: string): Promise<Trailer | null> {
        const trailer = await TrailerModel.findById(id);
        if (trailer) {
            return new Trailer(trailer.toObject());
        }
        return null;
    }

    async update(id: string, data: Partial<Trailer>) {
        const trailer = await TrailerModel.findByIdAndUpdate(id, data, { new: true });
        if (trailer) {
            return new Trailer(trailer.toObject());
        }
        return null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await TrailerModel.findByIdAndDelete(id);
        return !!result;
    }
}