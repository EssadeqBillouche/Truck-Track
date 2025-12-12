import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
import { AuthRepository } from "../repository/authRepository.js";
import { AuthService } from "../service/AuthService.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { loginSchema, registerSchema } from "../dto/auth/AuthDTO.js";

const router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

export default router;