import express from "express";
import { AuthController } from "../../controllers";
import { AuthService } from "../../services";
import { UserRepository } from "../../repositories";

const router = express.Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/logIn", authController.logIn.bind(authController));
router.get("/profile", authController.getProfile.bind(authController));

export default router;
