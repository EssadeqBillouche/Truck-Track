import { z } from 'zod';
import { TrailerState } from '../../entities/Trailer/TrailerTypes.js';

export const createTrailerSchema = z.object({
    matriculation: z.string().min(6, "Matriculation must be at least 6 characters"),
    brand: z.string().min(1, "Brand is required"),
    capacity: z.number().positive("Capacity must be positive"),
    mileage: z.string().min(1, "Mileage is required"),
    state: z.nativeEnum(TrailerState).optional(),
});

export const updateTrailerSchema = createTrailerSchema.partial();

export type createTrailerDTO = z.infer<typeof createTrailerSchema>;
export type updateTrailerDTO = z.infer<typeof updateTrailerSchema>;