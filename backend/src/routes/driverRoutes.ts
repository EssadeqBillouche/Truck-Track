import { Router } from "express";
import { TripController } from "../controller/TripController.js";
import { TripRepository } from "../repository/TripRepository.js";
import { TripService } from "../service/TripService.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { updateTripStatusSchema } from "../dto/trip/tripDTO.js";

const router = Router();

const tripRepository = new TripRepository();
const tripService = new TripService(tripRepository);
const tripController = new TripController(tripService);

// All routes require authentication
router.use(authMiddleware);

// Driver can see their trips
router.get("/trips", tripController.getMyTrips);
router.get("/trips/:id", tripController.getTripById);

// Driver can update trip status
router.put("/trips/:id/status", validate(updateTripStatusSchema), tripController.updateTripStatus);

// Driver can download trip PDF
router.get("/trips/:id/pdf", tripController.downloadTripPDF);

export default router;