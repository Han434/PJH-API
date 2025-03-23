import express from "express";
import { UserController } from "../../controllers/";
import { UserService } from "../../services/";
import { UserRepository } from "../../repositories";

const router = express.Router();
const userService = new UserService(new UserRepository());
const userController = new UserController(userService);

router.get("/", userController.getUsers.bind(userController));
router.get("/:id", userController.getUser.bind(userController));
router.post("/", userController.createUser.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));

export default router;