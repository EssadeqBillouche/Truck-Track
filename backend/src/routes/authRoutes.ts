import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
import { AuthRepository } from "../repository/authRepository.js";
import { AuthService } from "../service/AuthService.js";

const router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post("/register", authController.register);

export default router;