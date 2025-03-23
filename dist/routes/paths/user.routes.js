"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers/");
const services_1 = require("../../services/");
const repositories_1 = require("../../repositories");
const router = express_1.default.Router();
const userService = new services_1.UserService(new repositories_1.UserRepository());
const userController = new controllers_1.UserController(userService);
router.get("/", userController.getUsers.bind(userController));
router.get("/:id", userController.getUser.bind(userController));
router.post("/", userController.createUser.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));
exports.default = router;
