import { Router } from "express";
import { DriverController } from "../controller/DriverController.js";
import { AuthRepository } from "../repository/authRepository.js";
import { AuthService } from "../service/AuthService.js";
import { authMiddleware, adminOnly } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createDriverSchema } from "../dto/auth/AuthDTO.js";

const router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const driverController = new DriverController(authService);

// All routes here require: valid JWT + admin role
router.use(authMiddleware);
router.use(adminOnly);

// POST /api-v1/admin/drivers - Create new driver
router.post("/drivers", validate(createDriverSchema), driverController.createDriver);

export default router;