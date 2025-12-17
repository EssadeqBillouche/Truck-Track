import { Router } from "express";
import { TrailerRepository } from "../repository/TrailerRepository.js";
import { TrailerService } from "../service/TrailerService.js";
import { TrailerController } from "../controller/TrailerController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createTrailerSchema, updateTrailerSchema } from "../dto/trailer/trailerDTO.js";

const router = Router();

const trailerRepository = new TrailerRepository();
const trailerService = new TrailerService(trailerRepository);
const trailerController = new TrailerController(trailerService);

router.post("/", validate(createTrailerSchema), trailerController.createTrailer);
router.get("/", trailerController.getAllTrailers);
router.get("/:id", trailerController.getTrailerById);
router.put("/:id", validate(updateTrailerSchema), trailerController.updateTrailer);
router.delete("/:id", trailerController.deleteTrailer);

export default router;