import { Router } from "express";
import { TireRepository } from "../repository/TireRepository.js";
import { TireService } from "../service/TireService.js";
import { TireController } from "../controller/TireController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createTireSchema, updateTireSchema } from "../dto/tire/tireDTO.js";

const router = Router();

const tireRepository = new TireRepository();
const tireService = new TireService(tireRepository);
const tireController = new TireController(tireService);

router.post("/", validate(createTireSchema), tireController.createTire);
router.get("/", tireController.getAllTires);
router.get("/:id", tireController.getTireById);
router.get("/vehicle/:vehicleId", tireController.getTiresByVehicle);
router.put("/:id", validate(updateTireSchema),  tireController.updateTire);
router.delete("/:id", tireController.deleteTire);

export default router;