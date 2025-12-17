import { Router } from "express";
import { TruckRepository } from "../repository/TruckRepository.js";
import { TruckService } from "../service/Truckservice.js";
import { TruckController } from "../controller/TruckController.js";


const router = Router();

const truckRepository = new TruckRepository();
const truckService = new TruckService(truckRepository);
const truckController = new TruckController(truckService);

router.post("/", /* validate(createTruckSchema), */ truckController.createTruck);
router.get("/", truckController.getAllTrucks);
router.get("/:id", truckController.getTruckById);
router.put("/:id", /* validate(updateTruckSchema), */ truckController.updateTruck);
router.delete("/:id", truckController.deleteTruck);

export default router;