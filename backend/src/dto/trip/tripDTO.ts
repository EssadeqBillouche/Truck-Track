import { z } from 'zod';

export const createTripSchema = z.object({
    truckId: z.string().min(1, "Truck ID is required"),
    driverId: z.string().min(1, "Driver ID is required"),
    origin: z.string().min(1, "Origin is required"),
    destination: z.string().min(1, "Destination is required"),
    departureDate: z.string().or(z.date()),
});

export const updateTripStatusSchema = z.object({
    status: z.enum(["todo", "in-progress", "completed"]),
    departureMileage: z.string().optional(),
    arrivalMileage: z.string().optional(),
    fuelVolume: z.number().optional(),
    notes: z.string().optional(),
});

export type createTripDTO = z.infer<typeof createTripSchema>;
export type updateTripStatusDTO = z.infer<typeof updateTripStatusSchema>;