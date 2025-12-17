import { Router } from "express";
import { DriverController } from "../controller/DriverController.js";
import { TruckController } from "../controller/TruckController.js";
import { TripController } from "../controller/TripController.js";
import { AuthRepository } from "../repository/AuthRepository.js";
import { TruckRepository } from "../repository/TruckRepository.js";
import { TripRepository } from "../repository/TripRepository.js";
import { AuthService } from "../service/AuthService.js";
import { TruckService } from "../service/Truckservice.js";
import { TripService } from "../service/TripService.js";
import { authMiddleware, adminOnly } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createDriverSchema } from "../dto/auth/AuthDTO.js";
import { createTruckSchema, updateTruckSchema } from "../dto/truck/truckDTO.js";
import { createTripSchema } from "../dto/trip/tripDTO.js";

const router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const driverController = new DriverController(authService);

const truckRepository = new TruckRepository();
const truckService = new TruckService(truckRepository);
const truckController = new TruckController(truckService);

const tripRepository = new TripRepository();
const tripService = new TripService(tripRepository);
const tripController = new TripController(tripService);

// All routes here require: valid JWT + admin role
router.use(authMiddleware);
router.use(adminOnly);

// Driver routes
router.get("/drivers", driverController.getAllDrivers);
router.post("/drivers", validate(createDriverSchema), driverController.createDriver);

// Truck routes
router.post("/trucks", validate(createTruckSchema), truckController.createTruck);
router.get("/trucks", truckController.getAllTrucks);
router.get("/trucks/:id", truckController.getTruckById);
router.put("/trucks/:id", validate(updateTruckSchema), truckController.updateTruck);
router.delete("/trucks/:id", truckController.deleteTruck);


router.post("/trips", validate(createTripSchema), tripController.createTrip);
router.get("/trips", tripController.getAllTrips);
router.get("/trips/:id", tripController.getTripById);

export default router;