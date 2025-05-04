"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const services_1 = require("../../services");
const repositories_1 = require("../../repositories");
const router = express_1.default.Router();
const userRepository = new repositories_1.UserRepository();
const authService = new services_1.AuthService(userRepository);
const authController = new controllers_1.AuthController(authService);
router.post("/logIn", authController.logIn.bind(authController));
router.get("/profile", authController.getProfile.bind(authController));
exports.default = router;
