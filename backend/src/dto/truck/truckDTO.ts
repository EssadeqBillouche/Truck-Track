import { z } from 'zod';
import { TruckState } from '../../entities/Truck/TruckTypes.js';

// Create Truck Schema
export const createTruckSchema = z.object({
    matriculation: z.string().min(6, "Matriculation must be at least 6 characters"),
    brand: z.string().min(1, "Brand is required"),
    mileage: z.string().min(1, "Mileage is required"),
    state: z.nativeEnum(TruckState).optional(),
});

// Update Truck Schema (all fields optional)
export const updateTruckSchema = z.object({
    matriculation: z.string().min(6, "Matriculation must be at least 6 characters").optional(),
    brand: z.string().min(1, "Brand is required").optional(),
    mileage: z.string().min(1, "Mileage is required").optional(),
    state: z.nativeEnum(TruckState).optional(),
});

// Infer types from schemas
export type createTruckDTO = z.infer<typeof createTruckSchema>;
export type updateTruckDTO = z.infer<typeof updateTruckSchema>;