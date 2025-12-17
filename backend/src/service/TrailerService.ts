import { TrailerRepository } from "../repository/TrailerRepository.js";
import { Trailer } from "../entities/Trailer/Trailer.js";
import { ErrorHandler } from "../helper/ErrorHandler.js";

export class TrailerService {
    constructor(private trailerRepository: TrailerRepository) {}

    async createTrailer(data: any) {
        const existingTrailer = await this.trailerRepository.findByMatriculation(data.matriculation);
        if (existingTrailer) {
            throw new ErrorHandler("Matriculation already exists", 400);
        }
        const trailer = new Trailer(data);
        return await this.trailerRepository.create(trailer);
    }

    async getAllTrailers() {
        return await this.trailerRepository.findAll();
    }

    async getTrailerById(id: string) {
        const trailer = await this.trailerRepository.findById(id);
        if (!trailer) {
            throw new ErrorHandler("Trailer not found", 404);
        }
        return trailer;
    }

    async updateTrailer(id: string, data: any) {
        const trailer = await this.trailerRepository.findById(id);
        if (!trailer) {
            throw new ErrorHandler("Trailer not found", 404);
        }
        return await this.trailerRepository.update(id, data);
    }

    async deleteTrailer(id: string) {
        const trailer = await this.trailerRepository.findById(id);
        if (!trailer) {
            throw new ErrorHandler("Trailer not found", 404);
        }
        return await this.trailerRepository.delete(id);
    }
}