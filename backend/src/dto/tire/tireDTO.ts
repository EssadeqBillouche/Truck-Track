import { z } from 'zod';
import { TirePosition, TireState } from '../../entities/Tire/TireTypes.js';

export const createTireSchema = z.object({
    brand: z.string().min(1, "Brand is required"),
    size: z.string().min(1, "Size is required"),
    position: z.nativeEnum(TirePosition),
    state: z.nativeEnum(TireState).optional(),
    vehicleId: z.string().min(1, "Vehicle ID is required"),
    vehicleType: z.enum(["truck", "trailer"]),
    installationDate: z.string().or(z.date()),
    installationMileage: z.string().min(1, "Installation mileage is required"),
    replacementMileage: z.string().optional(),
});

export const updateTireSchema = createTireSchema.partial();

export type createTireDTO = z.infer<typeof createTireSchema>;
export type updateTireDTO = z.infer<typeof updateTireSchema>;